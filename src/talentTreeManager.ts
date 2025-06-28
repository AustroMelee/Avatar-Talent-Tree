/**
 * Talent Tree Manager
 * Handles application state, talent interactions, and business logic according to the Argent Codex
 */

import type { 
  TalentTree, 
  TalentNode, 
  AppState, 
  Point,
} from './types';
import { ARGENT_CODEX_CONSTANTS } from './types';
import { 
  AIR_TALENT_NODES, 
  FIRE_TALENT_NODES, 
  WATER_TALENT_NODES, 
  generateAirConnections,
  generateFireConnections,
  generateWaterConnections,
  generateAllEarthNodes,
  generateAllEarthConnections,
  generateAllSteelNodes,
  generateAllSteelConnections,
  CONSTELLATIONS,
  getConstellation
} from './elements';

/**
 * Visual events for enhanced UI feedback
 */
export type VisualEvent = {
  type: 'bridge_allocated' | 'synthesis_revealed' | 'bridge_locked';
  nodeId: string;
  timestamp: number;
  data?: any;
};

/**
 * Manages the talent tree application state and interactions according to the Argent Codex
 */
export class TalentTreeManager {
  private state: AppState;
  private subscribers: ((state: AppState) => void)[] = [];
  private visualEvents: VisualEvent[] = [];

  constructor(initialCallback?: (state: AppState) => void) {
    this.state = this.createInitialState();
    // Initialize node states
    this.updateAllNodeStates();
    if(initialCallback) this.subscribe(initialCallback);
  }
  
  subscribe(callback: (state: AppState) => void): void {
      this.subscribers.push(callback);
  }

  private notify(): void {
      this.subscribers.forEach(cb => cb(this.state));
  }

  /**
   * Gets recent visual events for UI feedback
   */
  getVisualEvents(): VisualEvent[] {
    return this.visualEvents;
  }

  /**
   * Clears old visual events
   */
  clearOldVisualEvents(): void {
    const now = Date.now();
    this.visualEvents = this.visualEvents.filter(event => now - event.timestamp < 5000); // Keep events for 5 seconds
  }

  /**
   * Adds a visual event for UI feedback
   */
  private addVisualEvent(event: VisualEvent): void {
    this.visualEvents.push(event);
    this.clearOldVisualEvents();
  }

  /**
   * Creates the initial application state
   */
  private createInitialState(): AppState {
    return {
      talentTree: this.createAirTalentTree(),
      zoom: 0.8,
      pan: { x: 0, y: 0 },
      isDragging: false,
      selectedNode: null,
      hoveredNode: null,
      isLoading: false
    };
  }

  /**
   * Creates the Air constellation talent tree
   */
  private createAirTalentTree(): TalentTree {
    const nodes = AIR_TALENT_NODES.map(node => ({...node}));

    // Use the pre-generated connections from the path modules
    const connections = generateAirConnections();

    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: 'The Four Winds',
        description: 'The constellation of balance, freedom, adaptation, and transcendence',
        background: 'air'
      }
    };
  }

  /**
   * Creates the Earth constellation talent tree
   */
  private createEarthTalentTree(): TalentTree {
    const nodes = generateAllEarthNodes().map(node => ({...node}));
    const connections = generateAllEarthConnections();

    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: CONSTELLATIONS.earth.name,
        description: CONSTELLATIONS.earth.description,
        background: 'earth'
      }
    };
  }

  /**
   * Creates the Fire constellation talent tree
   */
  private createFireTalentTree(): TalentTree {
    const nodes = FIRE_TALENT_NODES.map(node => ({...node}));
    const connections = generateFireConnections();

    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: CONSTELLATIONS.fire.name,
        description: CONSTELLATIONS.fire.description,
        background: 'fire'
      }
    };
  }

  /**
   * Creates the Water constellation talent tree
   */
  private createWaterTalentTree(): TalentTree {
    const nodes = WATER_TALENT_NODES.map(node => ({...node}));
    const connections = generateWaterConnections();

    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: CONSTELLATIONS.water.name,
        description: CONSTELLATIONS.water.description,
        background: 'water'
      }
    };
  }

  /**
   * Creates the Steel constellation talent tree
   */
  private createSteelTalentTree(): TalentTree {
    const nodes = generateAllSteelNodes().map(node => ({...node}));
    const connections = generateAllSteelConnections();

    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: 'The Forged Steel',
        description: 'The triumph of mortal will over supernatural power, achieved through dedication, training, and ingenuity.',
        background: 'steel'
      }
    };
  }

  /**
   * Updates the state of all nodes (allocated, allocatable, locked)
   */
  private updateAllNodeStates(): void {
    // A set of all allocated nodes that are part of an exclusive choice (Rites and Schisms)
    const allocatedChoiceNodes = new Set<string>();
    this.state.talentTree.allocatedNodes.forEach(nodeId => {
        const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
        if (node && (node.type === 'GnosticRite' || node.type === 'Schism')) {
            allocatedChoiceNodes.add(node.id);
        }
    });

    this.state.talentTree.nodes.forEach(node => {
        // Determine if this node is permanently locked by a choice
        let isPermanentlyLocked = false;
        if (node.exclusiveWith && node.exclusiveWith.length > 0) {
            // This node is locked if ANY of the nodes it's exclusive with have been allocated.
            for (const exclusiveId of node.exclusiveWith) {
                if (allocatedChoiceNodes.has(exclusiveId)) {
                    isPermanentlyLocked = true;
                    break;
                }
            }
        }
        
        // Propagate lock status to children (e.g., lock Capstone if its Rite is locked)
        if (!isPermanentlyLocked && node.prerequisites.length > 0) {
             const prereq = this.state.talentTree.nodes.find(n => n.id === node.prerequisites[0]);
             if (prereq && prereq.isPermanentlyLocked) {
                 isPermanentlyLocked = true;
             }
        }

        node.isPermanentlyLocked = isPermanentlyLocked;
        node.isAllocated = this.state.talentTree.allocatedNodes.has(node.id);
        node.isLocked = this.isNodeLocked(node) || this.isBridgeLocked(node);
        node.isAllocatable = this.isNodeAllocatable(node);
        node.isVisible = true; // All nodes are visible for theorycrafting
    });
    
    this.state.talentTree.connections.forEach(conn => {
      conn.isActive = this.state.talentTree.allocatedNodes.has(conn.from) && this.state.talentTree.allocatedNodes.has(conn.to);
      conn.isLocked = !this.state.talentTree.allocatedNodes.has(conn.from);
    });
  }

  /**
   * Resets all allocated points
   */
  resetPoints(): void {
    this.state.talentTree = this.createAirTalentTree();
    this.updateAllNodeStates();
    this.notify();
  }

  /**
   * Loads a new talent tree with the specified data
   */
  loadTalentTree(nodes: TalentNode[], connections: any[], metadata: any): void {
    this.state.talentTree = {
      nodes: nodes.map(node => ({...node})),
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata
    };
    this.updateAllNodeStates();
    this.notify();
  }

  /**
   * Sets the zoom level
   */
  setZoom(zoom: number): void {
    this.state.zoom = Math.max(0.2, Math.min(2.0, zoom));
    this.notify();
  }

  /**
   * Sets the zoom level centered on a specific position (mouse cursor)
   */
  setZoomAtPosition(newZoom: number, mousePosition: Point): void {
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

  /**
   * Pans the view by a delta amount
   */
  panBy(delta: Point): void {
    this.state.pan.x += delta.x;
    this.state.pan.y += delta.y;
    this.notify();
  }

  /**
   * Sets the pan offset
   */
  setPan(pan: Point): void {
    this.state.pan = pan;
    this.notify();
  }

  /**
   * Sets the dragging state
   */
  setDragging(isDragging: boolean): void {
    this.state.isDragging = isDragging;
    this.notify();
  }

  /**
   * Sets the selected node
   */
  setSelectedNode(nodeId: string | null): void {
    this.state.selectedNode = nodeId;
    this.notify();
  }

  /**
   * Sets the hovered node
   */
  setHoveredNode(nodeId: string | null): void {
    if (this.state.hoveredNode !== nodeId) {
      this.state.hoveredNode = nodeId;
    }
  }

  /**
   * Handles clicking on a specific node by ID
   */
  handleNodeClick(nodeId: string): void {
    const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
    if (!node) return;
    if (node.isAllocated) {
      this.removePoint(nodeId);
    } else if (this.isNodeAllocatable(node)) {
      this.allocatePoint(nodeId);
    }
  }

  /**
   * Gets a summary of the current build
   */
  getBuildSummary(): any {
    return {
      spentPK: this.state.talentTree.spentPK,
      totalPK: this.state.talentTree.totalPK,
      chosenPaths: [],
      pathInvestments: [],
      covenant: null,
      philosophicalWounds: [],
    };
  }

  /**
   * Gets the current application state
   */
  getState(): AppState {
    return this.state;
  }

  /**
   * Calculates the PK cost for a talent node according to the Argent Codex
   * This now directly uses the cost defined in the node's data.
   */
  private calculatePKCost(node: TalentNode): number {
    return node.pkCost;
  }

  /**
   * Checks if a node is locked due to diametric opposition
   */
  private isNodeLocked(node: TalentNode): boolean {
    // Genesis nodes are never locked at the start
    if (node.type === 'Genesis') return false;
    
    // Check if this node belongs to a path that's diametrically opposed to the chosen path
    const chosenPathForConstellation = this.state.talentTree.chosenPaths.get(node.constellation);
    if (chosenPathForConstellation && chosenPathForConstellation !== node.path) {
      return true; // This path is diametrically opposed to the chosen path
    }
    
    // If any prerequisite is not allocated, this node is locked
    return !node.prerequisites.every(prereqId => this.state.talentTree.allocatedNodes.has(prereqId));
  }

  /**
   * Checks if a Schism node should be visible
   */
  private isSchismVisible(node: TalentNode): boolean {
    if (node.type !== 'Schism') return true;
    
    // Schism nodes only become visible after 25 PK invested in the path
    const nodesInPath = Array.from(this.state.talentTree.allocatedNodes).filter(id => {
      const allocatedNode = this.state.talentTree.nodes.find(n => n.id === id);
      return allocatedNode && allocatedNode.path === node.path;
    }).length;
    
    return nodesInPath >= 25;
  }

  /**
   * Checks if a Bridge node should be visible (only when Capstone is allocated)
   */
  private isBridgeVisible(node: TalentNode): boolean {
    if (node.type !== 'Bridge') return true;
    
    // Bridge nodes only become visible after their corresponding Capstone is allocated
    const capstoneId = this.getCapstoneForBridge(node.id);
    return this.state.talentTree.allocatedNodes.has(capstoneId);
  }

  /**
   * Gets the Capstone node ID that corresponds to a Bridge node
   */
  private getCapstoneForBridge(bridgeId: string): string {
    const bridgeToCapstone: { [key: string]: string } = {
      'air_leaf_bridge_hurricane': 'air_leaf_capstone',
      'air_leaf_bridge_sky': 'air_leaf_capstone',
      'air_hurricane_bridge_leaf': 'air_hurricane_capstone',
      'air_hurricane_bridge_sky': 'air_hurricane_capstone',
      'air_sky_bridge_leaf': 'air_sky_capstone',
      'air_sky_bridge_hurricane': 'air_sky_capstone'
    };
    return bridgeToCapstone[bridgeId] || '';
  }

  /**
   * Checks if a Bridge node is locked due to another Bridge being allocated
   */
  private isBridgeLocked(node: TalentNode): boolean {
    if (node.type !== 'Bridge') return false;
    
    // If any Bridge is allocated, all other Bridges are locked
    const allocatedBridges = Array.from(this.state.talentTree.allocatedNodes).filter(id => {
      const allocatedNode = this.state.talentTree.nodes.find(n => n.id === id);
      return allocatedNode && allocatedNode.type === 'Bridge';
    });
    
    return allocatedBridges.length > 0 && !allocatedBridges.includes(node.id);
  }

  /**
   * Checks if a node is allocatable (can be clicked to allocate a point)
   */
  private isNodeAllocatable(node: TalentNode): boolean {
    // Can't allocate if already allocated
    if (node.isAllocated) return false;
    
    // Can't allocate if locked
    if (node.isLocked) return false;
    
    // Can't allocate if permanently locked
    if (node.isPermanentlyLocked) return false;
    
    // Can't allocate if we don't have enough PK
    const cost = this.calculatePKCost(node);
    if (this.state.talentTree.spentPK + cost > this.state.talentTree.totalPK) return false;
    
    return true;
  }

  /**
   * Allocates a point to a specific node
   */
  allocatePoint(nodeId: string): void {
    const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
    if (!node || !this.isNodeAllocatable(node)) return;
    
    const cost = this.calculatePKCost(node);
    if (this.state.talentTree.spentPK + cost > this.state.talentTree.totalPK) return;
    
    // Allocate the point
    this.state.talentTree.allocatedNodes.add(nodeId);
    this.state.talentTree.spentPK += cost;
    
    // Update chosen paths if this is a Genesis node
    if (node.type === 'Genesis') {
      this.state.talentTree.chosenPaths.set(node.constellation, node.path);
    }
    
    // Add philosophical wounds for Schism nodes
    if (node.type === 'Schism' && node.hasPenalty) {
      // Add the wound to the list
      this.state.talentTree.philosophicalWounds.push(`Wound from ${node.name}`);
    }
    
    // Update all node states
    this.updateAllNodeStates();
    this.notify();
  }

  /**
   * Removes a point from a specific node
   */
  removePoint(nodeId: string): void {
    const node = this.state.talentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocated) return;
    
    const cost = this.calculatePKCost(node);
    
    // Remove the point
    this.state.talentTree.allocatedNodes.delete(nodeId);
    this.state.talentTree.spentPK -= cost;
    
    // Update all node states
    this.updateAllNodeStates();
    this.notify();
  }

  /**
   * Creates a talent tree for the specified element
   */
  createElementalTalentTree(elementId: string): TalentTree {
    switch (elementId) {
      case 'air':
        return this.createAirTalentTree();
      case 'fire':
        return this.createFireTalentTree();
      case 'water':
        return this.createWaterTalentTree();
      case 'earth':
        return this.createEarthTalentTree();
      case 'steel':
        return this.createSteelTalentTree();
      default:
        console.error(`Unknown element: ${elementId}`);
        return this.createAirTalentTree();
    }
  }
} 