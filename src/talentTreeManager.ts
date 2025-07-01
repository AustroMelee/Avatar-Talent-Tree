/**
 * Talent Tree Manager
 * Handles application state, talent interactions, and business logic according to the Argent Codex
 */

import type { 
  TalentTree, 
  TalentNode, 
  AppState, 
  Point,
  VisualEvent
} from './types';
import { ARGENT_CODEX_CONSTANTS } from './types';
import { 
  AIR_TALENT_NODES, 
  generateAirConnections,
  generateAllEarthNodes,
  generateAllEarthConnections,
  EARTH_CONSTELLATION
} from './elements';
import { NodeStateCalculator } from './core/nodeStateCalculator';
import { StateFactory } from './core/stateFactory';

/**
 * Manages the talent tree application state. It holds the state and delegates
 * the complex business logic for state updates to specialized calculators.
 */
export class TalentTreeManager {
  private state: AppState;
  private subscribers: ((state: AppState) => void)[] = [];
  private nodeStateCalculator: NodeStateCalculator;
  private visualEvents: VisualEvent[] = [];

  constructor(initialCallback?: (state: AppState) => void) {
    this.nodeStateCalculator = new NodeStateCalculator();
    this.state = StateFactory.createInitialState();
    
    // Initial calculation of node states
    this.nodeStateCalculator.updateAllNodeStates(this.state.talentTree);
    
    if (initialCallback) this.subscribe(initialCallback);
  }

  public subscribe(callback: (state: AppState) => void): void {
    this.subscribers.push(callback);
  }

  private notify(): void {
    this.subscribers.forEach(cb => cb(this.state));
  }
  
  public getState(): AppState {
    return this.state;
  }
  
  private addVisualEvent(event: VisualEvent): void {
      const now = Date.now();
      // Clear old events before adding a new one
      this.visualEvents = this.visualEvents.filter(e => now - e.timestamp < 5000);
      this.visualEvents.push(event);
  }

  public getVisualEvents(): VisualEvent[] {
    return this.visualEvents;
  }
  
  // --- STATE MUTATION METHODS ---

  public loadTalentTree(talentTree: TalentTree): void {
    this.state.talentTree = talentTree;
    this.nodeStateCalculator.updateAllNodeStates(this.state.talentTree);
    this.notify();
  }

  public resetPoints(): void {
    // We can use the StateFactory to get a clean tree of the current element type
    // For now, it defaults to 'air' as per original logic.
    // A more advanced version could pass the current element to the factory.
    this.state.talentTree = StateFactory.createInitialState().talentTree;
    this.nodeStateCalculator.updateAllNodeStates(this.state.talentTree);
    this.notify();
  }

  public allocatePoint(nodeId: string): void {
    const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocatable) return;
    
    // Allocate the point
    this.state.talentTree.allocatedNodes.add(nodeId);
    this.state.talentTree.spentPK += node.pkCost;
    
    // Handle side effects like philosophical wounds
    if (node.type === 'Schism') {
      this.state.talentTree.philosophicalWounds.push(`Wound from ${node.name}`);
    }
    
    this.nodeStateCalculator.updateAllNodeStates(this.state.talentTree);
    this.notify();
  }

  public removePoint(nodeId: string): void {
    const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocated) return;

    // Check if any other allocated node requires this one
    const isPrerequisite = this.state.talentTree.nodes.some(
      other => other.isAllocated && other.prerequisites.includes(nodeId)
    );

    if (isPrerequisite) {
      this.addVisualEvent({ type: 'deallocate_denied', nodeId, timestamp: Date.now() });
      this.notify(); // Notify to trigger render for flash effect
      return;
    }
    
    this.state.talentTree.allocatedNodes.delete(nodeId);
    this.state.talentTree.spentPK -= node.pkCost;

    if (node.type === 'Schism') {
        this.state.talentTree.philosophicalWounds = this.state.talentTree.philosophicalWounds.filter(w => w !== `Wound from ${node.name}`);
    }
    
    this.nodeStateCalculator.updateAllNodeStates(this.state.talentTree);
    this.notify();
  }
  
  public applyPresetBuild(endpointNodeIds: string[]): void {
    // 1. Reset the tree state
    this.state.talentTree.allocatedNodes.clear();
    this.state.talentTree.spentPK = 0;
    this.state.talentTree.philosophicalWounds = [];
    this.state.talentTree.covenant = null;

    // 2. Build the set of all nodes to allocate
    const allNodesMap = new Map(this.state.talentTree.nodes.map(n => [n.id, n]));
    const nodesToAllocate = new Set<string>();

    const findAllPrerequisites = (nodeId: string) => {
        if (nodesToAllocate.has(nodeId)) return;
        const node = allNodesMap.get(nodeId);
        if (node) {
            nodesToAllocate.add(node.id);
            node.prerequisites.forEach(findAllPrerequisites);
        }
    };
    endpointNodeIds.forEach(findAllPrerequisites);

    // 3. Apply the new state
    this.state.talentTree.allocatedNodes = nodesToAllocate;
    this.state.talentTree.spentPK = Array.from(nodesToAllocate).reduce((total, nodeId) => {
        const node = allNodesMap.get(nodeId);
        return total + (node ? node.pkCost : 0);
    }, 0);

    // 4. Recalculate all states and notify UI
    this.nodeStateCalculator.updateAllNodeStates(this.state.talentTree);
    this.notify();
  }
  
  // --- Simple State Setters ---

  public handleNodeClick(nodeId: string): void {
    const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
    if (!node) return;
    if (node.isAllocated) {
      this.removePoint(nodeId);
    } else if (node.isAllocatable) {
      this.allocatePoint(nodeId);
    }
  }

  public setZoom(zoom: number): void {
    this.state.zoom = Math.max(0.2, Math.min(2.0, zoom));
    this.notify();
  }

  public setZoomAtPosition(newZoom: number, mousePosition: Point): void {
    const oldZoom = this.state.zoom;
    newZoom = Math.max(0.2, Math.min(2.0, newZoom));
    if (oldZoom === newZoom) return;
    
    const pan = this.state.pan;
    const worldX = (mousePosition.x - pan.x) / oldZoom;
    const worldY = (mousePosition.y - pan.y) / oldZoom;
    
    this.state.zoom = newZoom;
    this.state.pan.x = mousePosition.x - worldX * newZoom;
    this.state.pan.y = mousePosition.y - worldY * newZoom;
    this.notify();
  }

  public panBy(delta: Point): void {
    this.state.pan.x += delta.x;
    this.state.pan.y += delta.y;
    this.notify();
  }

  public setPan(pan: Point): void {
    this.state.pan = pan;
    this.notify();
  }

  public setHoveredNode(nodeId: string | null): void {
    if (this.state.hoveredNode !== nodeId) {
      this.state.hoveredNode = nodeId;
      // No need to notify for hover, as it's handled by the render loop
    }
  }
} 