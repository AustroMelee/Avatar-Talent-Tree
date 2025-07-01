import type { TalentNode, TalentTree } from '../types';

/**
 * Calculates the derived states of all talent nodes (isLocked, isAllocatable, etc.)
 * based on the core state of the talent tree (which nodes are allocated).
 */
export class NodeStateCalculator {

  /**
   * Updates the states of all nodes in the given talent tree object in-place.
   * @param tree The TalentTree object to update.
   */
  public updateAllNodeStates(tree: TalentTree): void {
    const allocatedChoiceNodes = this.getAllocatedChoiceNodes(tree);

    tree.nodes.forEach(node => {
      node.isPermanentlyLocked = this.isNodePermanentlyLocked(node, tree, allocatedChoiceNodes);
      node.isAllocated = tree.allocatedNodes.has(node.id);
      node.isLocked = this.isNodeLocked(node, tree);
      node.isAllocatable = this.isNodeAllocatable(node);
      node.isVisible = true; // All nodes are currently visible by default
    });

    tree.connections.forEach(conn => {
      conn.isActive = tree.allocatedNodes.has(conn.from) && tree.allocatedNodes.has(conn.to);
      conn.isLocked = !tree.allocatedNodes.has(conn.from);
    });
  }

  private getAllocatedChoiceNodes(tree: TalentTree): Set<string> {
    const choiceNodes = new Set<string>();
    tree.allocatedNodes.forEach(nodeId => {
      const node = tree.nodes.find(n => n.id === nodeId);
      if (node && (node.type === 'GnosticRite' || node.type === 'Schism')) {
        choiceNodes.add(node.id);
      }
    });
    return choiceNodes;
  }

  private isNodePermanentlyLocked(node: TalentNode, tree: TalentTree, allocatedChoiceNodes: Set<string>): boolean {
    // Check if this node is locked by an exclusive choice.
    if (node.exclusiveWith?.some(exclusiveId => allocatedChoiceNodes.has(exclusiveId))) {
      return true;
    }
    
    // Check if any prerequisite is permanently locked (cascading lock).
    for (const prereqId of node.prerequisites) {
        const prereqNode = tree.nodes.find(n => n.id === prereqId);
        // This check needs to be recursive, but a simple one-level check covers most cases.
        // For deep permanent locking, this would need a recursive helper.
        if (prereqNode?.isPermanentlyLocked) {
            return true;
        }
    }

    return false;
  }

  private isNodeLocked(node: TalentNode, tree: TalentTree): boolean {
    if (node.isPermanentlyLocked) return true;

    // A node is locked if any of its prerequisites are not allocated.
    return node.prerequisites.length > 0 && !node.prerequisites.every(prereqId => tree.allocatedNodes.has(prereqId));
  }

  private isNodeAllocatable(node: TalentNode): boolean {
    // Cannot allocate if already allocated, locked, or permanently locked.
    if (node.isAllocated || node.isLocked || node.isPermanentlyLocked) {
      return false;
    }
    return true;
  }
} 