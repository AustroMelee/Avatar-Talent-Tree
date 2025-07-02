/**
 * GridStateManager - Handles node state recalculation and updates for the grid-based renderer.
 * Extracted from gridRenderer.ts for SRP and .cursorcontext compliance.
 */
import type { TalentNode } from './types/talent.types';

/**
 * Handles recalculation and update of node states (allocatable, allocated, locked, etc.).
 */
export class GridStateManager {
  /**
   * Update the visual state of all nodes in the grid.
   * @param nodes - Array of talent nodes to update
   * @param updateFn - Function to apply state styling to each node element
   */
  updateNodeStates(nodes: TalentNode[], updateFn: (node: TalentNode) => void): void {
    nodes.forEach(node => {
      updateFn(node);
    });
  }
} 