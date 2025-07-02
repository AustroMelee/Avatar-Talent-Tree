/**
 * Simplified Talent Tree Manager
 * Handles core talent tree logic without complex rendering dependencies.
 * Manages node allocation, deallocation, state calculation, and event dispatching.
 */

import type { TalentNode, TalentConnection, TalentTree } from './types/talent.types';
import { GridRenderer } from './gridRenderer';

/**
 * Simplified talent tree manager for grid-based UI.
 * Provides a clean interface for managing talent tree state and interactions.
 */
export class SimpleTalentManager {
  private talentTree: TalentTree;
  private renderer: GridRenderer;
  private container: HTMLElement;

  /**
   * Initialize the talent tree manager with a container and initial tree data.
   * Sets up event listeners and renders the initial state.
   * 
   * @param container - The HTML element to render the talent tree in
   * @param initialTree - The initial talent tree data structure
   */
  constructor(container: HTMLElement, initialTree: TalentTree) {
    this.container = container;
    this.talentTree = initialTree;
    this.renderer = new GridRenderer(container);
    
    this.setupEventListeners();
    this.renderTalentTree();
  }

  /**
   * Set up event listeners for the talent tree interactions.
   * Listens for node click events and delegates to appropriate handlers.
   */
  private setupEventListeners(): void {
    this.container.addEventListener('nodeClick', (event: CustomEvent) => {
      this.handleNodeClick(event.detail.node);
    });
  }

  /**
   * Handle node click events by attempting allocation or deallocation.
   * 
   * @param node - The talent node that was clicked
   */
  private handleNodeClick(node: TalentNode): void {
    if (node.isAllocatable) {
      this.allocateNode(node.id);
    } else if (node.isAllocated) {
      this.deallocateNode(node.id);
    }
  }

  /**
   * Allocate a talent node if prerequisites are met and sufficient PK is available.
   * Updates the talent tree state and triggers re-rendering.
   * 
   * @param nodeId - The unique identifier of the node to allocate
   */
  allocateNode(nodeId: string): void {
    const node = this.talentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocatable) {
      console.warn(`Cannot allocate node "${nodeId}" - node not found or not allocatable`);
      return;
    }

    // Check if we have enough PK
    if (this.talentTree.spentPK + node.pkCost > this.talentTree.totalPK) {
      console.warn(`Cannot allocate node "${nodeId}" - insufficient PK. Required: ${node.pkCost}, Available: ${this.talentTree.totalPK - this.talentTree.spentPK}`);
      return;
    }

    // Allocate the node
    node.isAllocated = true;
    node.isAllocatable = false;
    this.talentTree.spentPK += node.pkCost;
    this.talentTree.allocatedNodes.add(nodeId);

    // Update connections
    this.updateConnections();

    // Recalculate node states
    this.recalculateNodeStates();

    // Re-render
    this.renderTalentTree();

    // Dispatch allocation event
    this.dispatchAllocationEvent(nodeId, true);
  }

  /**
   * Deallocate a talent node if no dependencies would be broken.
   * Recursively deallocates all allocated nodes that no longer meet prerequisites (not just direct children).
   * Updates the talent tree state and triggers re-rendering.
   * 
   * @param nodeId - The unique identifier of the node to deallocate
   */
  deallocateNode(nodeId: string): void {
    const node = this.talentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocated) {
      console.warn(`Cannot deallocate node "${nodeId}" - node not found or not allocated`);
      return;
    }

    // Check if deallocation would break dependencies
    if (this.wouldBreakDependencies(nodeId)) {
      console.warn(`Cannot deallocate node "${nodeId}" - would break dependencies for allocated child nodes`);
      return;
    }

    // Deallocate the node
    node.isAllocated = false;
    this.talentTree.spentPK -= node.pkCost;
    this.talentTree.allocatedNodes.delete(nodeId);

    // Recursively deallocate all allocated nodes that no longer meet prerequisites
    this.deallocateAllInvalidNodes();

    // Update connections
    this.updateConnections();

    // Recalculate node states
    this.recalculateNodeStates();

    // Re-render
    this.renderTalentTree();

    // Dispatch allocation event
    this.dispatchAllocationEvent(nodeId, false);
  }

  /**
   * Scan all nodes and recursively deallocate any allocated node whose progression prerequisites are not met.
   */
  private deallocateAllInvalidNodes(): void {
    let changed = true;
    while (changed) {
      changed = false;
      this.talentTree.nodes.forEach(node => {
        if (!node.isAllocated) return;
        const progressionPrereqs = this.getProgressionPrerequisites(node.prerequisites);
        const prereqsMet = progressionPrereqs.every(prereqId => {
          const prereqNode = this.talentTree.nodes.find(n => n.id === prereqId);
          return prereqNode?.isAllocated;
        });
        if (!prereqsMet) {
          node.isAllocated = false;
          this.talentTree.spentPK -= node.pkCost;
          this.talentTree.allocatedNodes.delete(node.id);
          changed = true;
        }
      });
    }
  }

  /**
   * Check if deallocating a node would break dependencies for other allocated nodes.
   * Minor nodes are excluded from dependency checking - only major progression nodes can block deallocation.
   * 
   * @param nodeId - The unique identifier of the node to check
   * @returns True if deallocation would break dependencies, false otherwise
   */
  private wouldBreakDependencies(nodeId: string): boolean {
    const allocatedNodes = Array.from(this.talentTree.allocatedNodes);
    
    for (const allocatedId of allocatedNodes) {
      if (allocatedId === nodeId) continue;
      
      const allocatedNode = this.talentTree.nodes.find(n => n.id === allocatedId);
      if (!allocatedNode) continue;

      // Filter prerequisites to exclude minor nodes - only major progression nodes can block deallocation
      const progressionPrerequisites = this.getProgressionPrerequisites(allocatedNode.prerequisites);

      // Check if this allocated node depends on the node we want to deallocate
      if (progressionPrerequisites.includes(nodeId)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Update connection states based on node allocations.
   * Marks connections as active when both nodes are allocated, or locked when dependencies are missing.
   */
  private updateConnections(): void {
    this.talentTree.connections.forEach(connection => {
      const fromNode = this.talentTree.nodes.find(n => n.id === connection.from);
      const toNode = this.talentTree.nodes.find(n => n.id === connection.to);
      
      if (fromNode && toNode) {
        connection.isActive = fromNode.isAllocated && toNode.isAllocated;
        connection.isLocked = !fromNode.isAllocated && toNode.isAllocated;
      }
    });
  }

  /**
   * Recalculate which nodes are allocatable based on prerequisites and PK availability.
   * Updates the isAllocatable and isLocked states for all nodes.
   * Minor nodes are excluded from progression requirements - only Genesis, Keystone, Manifestation, Axiom, Capstone, and Synthesis nodes count as prerequisites.
   */
  private recalculateNodeStates(): void {
    this.talentTree.nodes.forEach(node => {
      // Reset allocatable state
      node.isAllocatable = false;
      node.isLocked = false;

      // Skip if already allocated
      if (node.isAllocated) {
        return;
      }

      // Filter prerequisites to exclude minor nodes - only major progression nodes count
      const progressionPrerequisites = this.getProgressionPrerequisites(node.prerequisites);

      // Check if progression prerequisites are met (excluding minor nodes)
      const prerequisitesMet = progressionPrerequisites.every(prereqId => {
        const prereqNode = this.talentTree.nodes.find(n => n.id === prereqId);
        return prereqNode?.isAllocated;
      });

      // Check if exclusive nodes are allocated
      const exclusiveConflict = node.exclusiveWith?.some(exclusiveId => {
        const exclusiveNode = this.talentTree.nodes.find(n => n.id === exclusiveId);
        return exclusiveNode?.isAllocated;
      });

      // Check if we have enough PK
      const hasEnoughPK = this.talentTree.spentPK + node.pkCost <= this.talentTree.totalPK;

      // Set allocatable state
      if (prerequisitesMet && !exclusiveConflict && hasEnoughPK) {
        node.isAllocatable = true;
        node.isLocked = false;
      } else {
        node.isLocked = true;
      }
    });
  }

  /**
   * Filter prerequisites to only include major progression nodes.
   * Minor nodes are excluded from progression requirements.
   * 
   * @param prerequisiteIds - Array of prerequisite node IDs
   * @returns Array of prerequisite IDs that are major progression nodes
   */
  private getProgressionPrerequisites(prerequisiteIds: string[]): string[] {
    return prerequisiteIds.filter(prereqId => {
      const prereqNode = this.talentTree.nodes.find(n => n.id === prereqId);
      if (!prereqNode) return false;
      
      // Only include non-minor nodes as progression prerequisites
      return prereqNode.type !== 'Minor';
    });
  }

  /**
   * Render the talent tree using the grid renderer.
   * Delegates rendering to the specialized renderer component.
   */
  private renderTalentTree(): void {
    this.renderer.renderTalentTree(this.talentTree);
  }

  /**
   * Dispatch a custom event when a node is allocated or deallocated.
   * Allows other components to react to talent tree state changes.
   * 
   * @param nodeId - The unique identifier of the affected node
   * @param allocated - True if the node was allocated, false if deallocated
   */
  private dispatchAllocationEvent(nodeId: string, allocated: boolean): void {
    const event = new CustomEvent('talentAllocation', {
      detail: {
        nodeId,
        allocated,
        talentTree: this.talentTree
      }
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Get the current talent tree state.
   * 
   * @returns The complete talent tree data structure
   */
  getTalentTree(): TalentTree {
    return this.talentTree;
  }

  /**
   * Reset the talent tree to its initial state.
   * Clears all allocations and resets PK spending to zero.
   */
  resetTalentTree(): void {
    this.talentTree.nodes.forEach(node => {
      node.isAllocated = false;
      node.isAllocatable = false;
      node.isLocked = false;
    });
    
    this.talentTree.spentPK = 0;
    this.talentTree.allocatedNodes.clear();
    
    this.recalculateNodeStates();
    this.updateConnections();
    this.renderTalentTree();
  }

  /**
   * Set the total PK available for talent allocation.
   * Recalculates node states to reflect the new PK limit.
   * 
   * @param totalPK - The new total PK value
   */
  setTotalPK(totalPK: number): void {
    this.talentTree.totalPK = totalPK;
    this.recalculateNodeStates();
    this.renderTalentTree();
  }

  /**
   * Get a summary of the current allocation state.
   * Provides spent PK, total PK, and lists of allocated and available nodes.
   * 
   * @returns Object containing allocation summary information
   */
  getAllocationSummary(): {
    spentPK: number;
    totalPK: number;
    allocatedNodes: string[];
    availableNodes: string[];
  } {
    return {
      spentPK: this.talentTree.spentPK,
      totalPK: this.talentTree.totalPK,
      allocatedNodes: Array.from(this.talentTree.allocatedNodes),
      availableNodes: this.talentTree.nodes
        .filter(node => node.isAllocatable)
        .map(node => node.id)
    };
  }
} 