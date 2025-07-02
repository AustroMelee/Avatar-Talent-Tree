/**
 * GridNodeRenderer - Handles creation and styling of talent node elements for the grid-based renderer.
 * Extracted from gridRenderer.ts for SRP and .cursorcontext compliance.
 */
import type { TalentNode } from './types/talent.types';
import { UI_STYLES, NODE_COLORS, NODE_SHADOWS } from './core/constants';

/**
 * Handles creation and styling of talent node elements.
 */
export class GridNodeRenderer {
  /**
   * Create a single node element with proper styling.
   * Applies visual styling based on node type and state.
   *
   * @param node - The talent node to create an element for
   * @returns The configured HTML element for the node
   */
  createNodeElement(node: TalentNode): HTMLElement {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'talent-node node';
    if (node.isAllocated) {
      nodeElement.classList.add('node--allocated');
    } else if (node.isAllocatable) {
      nodeElement.classList.add('node--available');
    } else if (node.isLocked) {
      nodeElement.classList.add('node--locked');
    }
    nodeElement.dataset.nodeId = node.id;
    nodeElement.setAttribute('data-type', node.type);
    // Node sizing: 64px for Genesis/Keystone/Axiom, 48px for others
    let nodeSize = 48;
    let iconFontSize = 24;
    if (node.type === 'Genesis' || node.type === 'Keystone' || node.type === 'Axiom' || node.type === 'Manifestation') {
      nodeSize = 64;
      iconFontSize = 32;
    }
    nodeElement.style.width = nodeSize + 'px';
    nodeElement.style.height = nodeSize + 'px';
    nodeElement.style.borderRadius = UI_STYLES.BORDER_RADIUS_CIRCULAR;
    nodeElement.style.display = 'flex';
    nodeElement.style.alignItems = 'center';
    nodeElement.style.justifyContent = 'center';
    nodeElement.style.cursor = 'pointer';
    nodeElement.style.transition = 'all 0.2s ease';
    nodeElement.style.position = 'relative';
    nodeElement.style.border = `${UI_STYLES.NODE_BORDER_WIDTH} solid ${UI_STYLES.NODE_BORDER_COLOR}`;
    nodeElement.style.margin = 'auto';
    nodeElement.style.fontSize = iconFontSize + 'px';
    // Node type styling
    this.applyNodeTypeStyling(nodeElement, node);
    // State styling
    this.applyNodeStateStyling(nodeElement, node);
    // Content
    const iconElement = document.createElement('div');
    iconElement.className = 'node-icon';
    iconElement.textContent = this.getNodeIcon(node);
    iconElement.style.fontSize = `${iconFontSize}px`;
    iconElement.style.color = '#fff';
    nodeElement.appendChild(iconElement);
    return nodeElement;
  }

  /**
   * Apply styling based on node type (Genesis, Keystone, etc.).
   * Sets appropriate colors, borders, and shadow effects for each node type.
   *
   * @param element - The HTML element to style
   * @param node - The talent node containing type information
   */
  applyNodeTypeStyling(element: HTMLElement, node: TalentNode): void {
    const baseColor = node.visual.color;
    switch (node.type) {
      case 'Genesis':
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.GENESIS_BORDER;
        element.style.borderWidth = '3px';
        element.style.boxShadow = NODE_SHADOWS.GENESIS;
        break;
      case 'Keystone':
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.KEYSTONE_BORDER;
        element.style.borderWidth = '3px';
        element.style.boxShadow = NODE_SHADOWS.KEYSTONE;
        break;
      case 'Manifestation':
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.MANIFESTATION_BORDER;
        element.style.borderWidth = '3px';
        element.style.boxShadow = NODE_SHADOWS.MANIFESTATION;
        break;
      case 'Axiom':
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.AXIOM_BORDER;
        element.style.borderWidth = '3px';
        element.style.boxShadow = NODE_SHADOWS.AXIOM;
        break;
      case 'Capstone':
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.CAPSTONE_BORDER;
        element.style.borderWidth = '4px';
        element.style.boxShadow = NODE_SHADOWS.CAPSTONE;
        break;
      case 'Synthesis':
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.SYNTHESIS_BORDER;
        element.style.borderWidth = '3px';
        element.style.boxShadow = NODE_SHADOWS.SYNTHESIS;
        break;
      default:
        element.style.backgroundColor = baseColor;
        element.style.borderColor = NODE_COLORS.DEFAULT_BORDER;
        break;
    }
  }

  /**
   * Apply styling based on node state (allocated, allocatable, locked).
   * Controls opacity and visual effects based on current node state.
   *
   * @param element - The HTML element to style
   * @param node - The talent node containing state information
   */
  applyNodeStateStyling(element: HTMLElement, node: TalentNode): void {
    if (node.isAllocated) {
      element.style.opacity = '1';
      element.style.filter = 'brightness(1.2)';
    } else if (node.isAllocatable) {
      element.style.opacity = '0.8';
      element.style.filter = 'brightness(1)';
    } else if (node.isLocked) {
      element.style.opacity = '0.3';
      element.style.filter = 'grayscale(0.8)';
    } else {
      element.style.opacity = '0.5';
      element.style.filter = 'grayscale(0.5)';
    }
  }

  /**
   * Get the appropriate icon for a node based on its type.
   * Returns the icon string from the node's visual properties.
   *
   * @param node - The talent node to get an icon for
   * @returns The icon string to display
   */
  getNodeIcon(node: TalentNode): string {
    return node.visual.icon || '🔸';
  }
} 