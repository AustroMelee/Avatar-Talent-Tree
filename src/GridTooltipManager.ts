/**
 * GridTooltipManager - Handles tooltip display, positioning, and hiding for the grid-based renderer.
 * Extracted from gridRenderer.ts for SRP and .cursorcontext compliance.
 */
import type { TalentNode } from './types/talent.types';

/**
 * Handles tooltip display and positioning for talent nodes.
 */
export class GridTooltipManager {
  private currentTooltip: HTMLElement | null = null;
  private nodeNameMap: Map<string, string> = new Map();

  /**
   * Initialize the node name mapping for human-readable prerequisite names.
   * @param nodes - Array of all talent nodes to build the mapping
   */
  initializeNodeMapping(nodes: TalentNode[]): void {
    this.nodeNameMap.clear();
    nodes.forEach(node => {
      this.nodeNameMap.set(node.id, node.name);
    });
  }

  /**
   * Convert prerequisite IDs to human-readable names.
   * Filters out minor nodes - only shows major progression prerequisites.
   * @param prerequisiteIds - Array of prerequisite node IDs
   * @param allNodes - Array of all talent nodes to check node types
   * @returns Array of human-readable prerequisite names (excluding minor nodes)
   */
  private getHumanReadablePrerequisites(prerequisiteIds: string[], allNodes: TalentNode[]): string[] {
    // Filter prerequisites to exclude minor nodes
    const progressionPrerequisites = prerequisiteIds.filter(prereqId => {
      const prereqNode = allNodes.find(n => n.id === prereqId);
      return prereqNode && prereqNode.type !== 'Minor';
    });

    return progressionPrerequisites.map(id => {
      const name = this.nodeNameMap.get(id);
      return name || id; // Fallback to ID if name not found
    });
  }

  /**
   * Convert title to sentence case for better readability.
   * @param title - The title to convert
   * @returns Title in sentence case
   */
  private toSentenceCase(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  }

  /**
   * Show a tooltip for a node at the given element.
   * @param node - The talent node to show a tooltip for
   * @param nodeElement - The HTML element to anchor the tooltip to
   * @param allNodes - Array of all talent nodes (needed for prerequisite filtering)
   */
  showTooltip(node: TalentNode, nodeElement: HTMLElement, allNodes: TalentNode[]): void {
    this.hideTooltip();
    const tooltip = document.createElement('div');
    tooltip.className = 'talent-tooltip arrow-top visible';
    tooltip.setAttribute('data-tier', node.type);
    tooltip.setAttribute('data-element', node.constellation);
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-describedby', `tooltip-${node.id}`);
    
    // Get human-readable prerequisite names (excluding minor nodes)
    const humanPrerequisites = this.getHumanReadablePrerequisites(node.prerequisites, allNodes);
    const sentenceCaseTitle = this.toSentenceCase(node.name);
    
    // Advanced grid layout and content with improved labeling
    tooltip.innerHTML = `
      <div class="talent-tooltip__header">
        <span class="talent-tooltip__title">${node.name}</span>
        <span class="talent-tooltip__type">${node.type}</span>
      </div>
      <div class="tt-icon">${node.visual.icon || ''}</div>
      <div class="tt-body">${node.description}</div>
      ${node.flavor ? `<div class="tt-flavor">${node.flavor}</div>` : ''}
      <div class="tt-meta">
        <span class="tt-tag tt-cost">Cost: ${node.pkCost} PK</span>
        ${humanPrerequisites.length > 0 ? `<span class="tt-tag tt-missing">Missing Prerequisite: ${humanPrerequisites.join(', ')}</span>` : ''}
      </div>
    `;
    
    document.body.appendChild(tooltip);
    this.positionTooltip(tooltip, nodeElement);
    this.currentTooltip = tooltip;
  }

  /**
   * Position the tooltip relative to the node element.
   * @param tooltip - The tooltip element
   * @param nodeElement - The node element to anchor to
   */
  positionTooltip(tooltip: HTMLElement, nodeElement: HTMLElement): void {
    const rect = nodeElement.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${rect.right + 8}px`;
    tooltip.style.top = `${rect.top}px`;
    tooltip.style.zIndex = '1000';
  }

  /**
   * Hide the currently displayed tooltip, if any.
   */
  hideTooltip(): void {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }
} 