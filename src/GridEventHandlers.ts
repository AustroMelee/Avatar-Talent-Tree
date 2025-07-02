/**
 * GridEventHandlers - Handles event listeners and dispatch logic for the grid-based renderer.
 * Extracted from gridRenderer.ts for SRP and .cursorcontext compliance.
 */
import type { TalentNode, TalentConnection } from './types/talent.types';
import type { GridConnectionRenderer } from './GridConnectionRenderer';

/**
 * Handles event listeners and dispatch logic for talent nodes.
 */
export class GridEventHandlers {
  private connectionRenderer: GridConnectionRenderer | null = null;
  private allConnections: TalentConnection[] = [];

  /**
   * Set the connection renderer for edge highlighting functionality.
   * @param connectionRenderer - The connection renderer instance
   */
  setConnectionRenderer(connectionRenderer: GridConnectionRenderer): void {
    this.connectionRenderer = connectionRenderer;
  }

  /**
   * Set the available connections for prerequisite chain calculation.
   * @param connections - Array of all talent connections
   */
  setConnections(connections: TalentConnection[]): void {
    this.allConnections = connections;
  }

  /**
   * Attach event listeners to a node element.
   * @param nodeElement - The HTML element for the node
   * @param node - The talent node data
   * @param onClick - Callback for click events
   * @param onMouseEnter - Callback for mouse enter events
   * @param onMouseLeave - Callback for mouse leave events
   */
  attachNodeEvents(
    nodeElement: HTMLElement,
    node: TalentNode,
    onClick: (node: TalentNode) => void,
    onMouseEnter: (node: TalentNode, nodeElement: HTMLElement) => void,
    onMouseLeave: (node: TalentNode, nodeElement: HTMLElement) => void
  ): void {
    nodeElement.addEventListener('click', () => onClick(node));
    
    nodeElement.addEventListener('mouseenter', () => {
      console.log(`Mouse enter on node: ${node.id}, allocated: ${node.isAllocated}`);
      // Show glowing unlock path for any unallocated node
      if (this.connectionRenderer && !node.isAllocated) {
        console.log(`Calling highlightUnlockPathToNode for ${node.id}`);
        this.connectionRenderer.highlightUnlockPathToNode(node.id);
      } else {
        console.log(`Not calling highlightUnlockPathToNode - connectionRenderer: ${!!this.connectionRenderer}, isAllocated: ${node.isAllocated}`);
      }
      onMouseEnter(node, nodeElement);
    });
    
    nodeElement.addEventListener('mouseleave', () => {
      console.log(`Mouse leave on node: ${node.id}`);
      // Clear glowing edge effects
      if (this.connectionRenderer) {
        this.connectionRenderer.clearGlowEffects();
      }
      onMouseLeave(node, nodeElement);
    });
  }
} 