/**
 * Simple Grid-Based Talent Tree Renderer
 * Replaces the complex canvas system with a straightforward HTML grid layout.
 * Provides clean, responsive rendering of talent trees with interactive elements.
 */

import type { TalentNode, TalentConnection, TalentTree } from './types/talent.types';
import { GRID_CONFIG, UI_STYLES, NODE_COLORS, NODE_SHADOWS, ANIMATION_TIMING } from './core/constants';
import { GridNodeRenderer } from './GridNodeRenderer';
import { GridConnectionRenderer } from './GridConnectionRenderer';
import { GridTooltipManager } from './GridTooltipManager';
import { GridStateManager } from './GridStateManager';
import { GridEventHandlers } from './GridEventHandlers';

/**
 * Configuration for the grid layout with default values.
 * Controls the visual appearance and behavior of the grid-based talent tree.
 */
type GridConfig = {
  /** Number of columns in the grid */
  columns: number;
  /** Number of rows in the grid */
  rows: number;
  /** Size of each grid cell in pixels */
  cellSize: number;
  /** Gap between grid cells in pixels */
  gap: number;
};

/**
 * GridRenderer - Orchestrates the grid-based talent tree rendering system.
 * Delegates node, connection, tooltip, state, and event logic to domain modules.
 */
export class GridRenderer {
  private container: HTMLElement;
  private config: GridConfig;
  private nodeRenderer: GridNodeRenderer;
  private connectionRenderer: GridConnectionRenderer;
  private tooltipManager: GridTooltipManager;
  private stateManager: GridStateManager;
  private eventHandlers: GridEventHandlers;
  private nodes: Map<string, HTMLElement> = new Map();
  private connections: Map<string, HTMLElement> = new Map();
  // Store the last rendered nodes for node map lookups
  private lastRenderedNodes: TalentNode[] = [];
  // Store the last rendered connections for connection map lookups
  private lastRenderedConnections: TalentConnection[] = [];

  /**
   * Initialize the grid renderer with a container and optional configuration.
   * Sets up the grid layout and prepares for rendering.
   * 
   * @param container - The HTML element to render the talent tree in
   * @param config - Optional grid configuration, uses defaults if not provided
   */
  constructor(container: HTMLElement, config: GridConfig = {
    columns: GRID_CONFIG.DEFAULT_COLUMNS,
    rows: GRID_CONFIG.DEFAULT_ROWS,
    cellSize: GRID_CONFIG.DEFAULT_CELL_SIZE,
    gap: GRID_CONFIG.DEFAULT_GAP
  }) {
    this.container = container;
    this.config = config;
    this.nodeRenderer = new GridNodeRenderer();
    this.connectionRenderer = new GridConnectionRenderer();
    this.tooltipManager = new GridTooltipManager();
    this.stateManager = new GridStateManager();
    this.eventHandlers = new GridEventHandlers();
    this.initializeGrid();
  }

  /**
   * Initialize the grid container with CSS Grid styling.
   * Sets up the visual layout and appearance of the grid container.
   */
  private initializeGrid(): void {
    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(${this.config.columns}, ${this.config.cellSize}px)`;
    this.container.style.gridTemplateRows = `repeat(${this.config.rows}, ${this.config.cellSize}px)`;
    this.container.style.gap = `${this.config.gap}px`;
    this.container.style.padding = `${GRID_CONFIG.CONTAINER_PADDING}px`;
    this.container.style.backgroundColor = '#1a1a1a';
    this.container.style.borderRadius = '8px';
    this.container.style.overflow = 'auto';
    this.container.style.position = 'relative'; // Required for SVG overlay positioning
  }

  /**
   * Render the complete talent tree with all nodes and connections.
   * Clears previous content and creates new visual elements.
   * 
   * @param talentTree - The talent tree data to render
   */
  renderTalentTree(talentTree: TalentTree): void {
    this.clear();
    this.lastRenderedNodes = talentTree.nodes;
    this.lastRenderedConnections = talentTree.connections;
    
    // Initialize tooltip manager with node mapping for human-readable prerequisites
    this.tooltipManager.initializeNodeMapping(talentTree.nodes);
    
    // Set up event handlers with connection renderer for glowing edge effects
    this.eventHandlers.setConnectionRenderer(this.connectionRenderer);
    this.eventHandlers.setConnections(talentTree.connections);
    
    // Render nodes first
    this.renderNodes(talentTree.nodes);
    
    // Initialize SVG container and set node map/connections for dynamic edge drawing
    this.connectionRenderer.initializeSVGContainer(this.container);
    // Re-append SVG overlay to ensure correct stacking order
    const svg = this.container.querySelector('.talent-edges');
    if (svg) this.container.appendChild(svg);
    this.connectionRenderer.setNodeMapAndConnections(this.nodes, talentTree.connections, talentTree.nodes);
  }

  /**
   * Render all talent nodes in the grid layout.
   * Creates visual elements for each node and positions them correctly.
   * 
   * @param nodes - Array of talent nodes to render
   */
  private renderNodes(nodes: TalentNode[]): void {
    nodes.forEach(node => {
      const nodeElement = this.nodeRenderer.createNodeElement(node);
      this.nodes.set(node.id, nodeElement);
      nodeElement.style.gridColumn = `${node.position.x + 1}`;
      nodeElement.style.gridRow = `${node.position.y + 1}`;
      nodeElement.setAttribute('data-type', node.type);
      this.container.appendChild(nodeElement);
      this.eventHandlers.attachNodeEvents(
        nodeElement,
        node,
        (n) => this.handleNodeClick(n),
        (n, el) => this.tooltipManager.showTooltip(n, el, nodes),
        (n, el) => this.tooltipManager.hideTooltip()
      );
    });
    this.stateManager.updateNodeStates(nodes, (node) => {
      const el = this.nodes.get(node.id);
      if (el) this.nodeRenderer.applyNodeStateStyling(el, node);
    });
  }

  /**
   * Create a single node element with proper styling and event handlers.
   * Applies visual styling based on node type and state.
   * 
   * @param node - The talent node to create an element for
   * @returns The configured HTML element for the node
   */
  private createNodeElement(node: TalentNode): HTMLElement {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'talent-node node';
    nodeElement.dataset.nodeId = node.id;
    nodeElement.setAttribute('data-type', node.type);
    // Node sizing: 64px for Genesis/Keystone/Axiom, 48px for others
    let nodeSize = 48;
    let iconFontSize = 24;
    if (node.type === 'Genesis' || node.type === 'Keystone' || node.type === 'Axiom') {
      nodeSize = 64;
      iconFontSize = 32;
    }
    nodeElement.style.width = `${nodeSize}px`;
    nodeElement.style.height = `${nodeSize}px`;
    nodeElement.style.borderRadius = UI_STYLES.BORDER_RADIUS_CIRCULAR;
    nodeElement.style.display = 'flex';
    nodeElement.style.alignItems = 'center';
    nodeElement.style.justifyContent = 'center';
    nodeElement.style.cursor = 'pointer';
    nodeElement.style.transition = 'all 0.2s ease';
    nodeElement.style.position = 'relative';
    nodeElement.style.border = `${UI_STYLES.NODE_BORDER_WIDTH} solid ${UI_STYLES.NODE_BORDER_COLOR}`;
    nodeElement.style.margin = 'auto';
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
    // Event listeners are now handled by GridEventHandlers in renderNodes()
    return nodeElement;
  }

  /**
   * Apply styling based on node type (Genesis, Keystone, etc.).
   * Sets appropriate colors, borders, and shadow effects for each node type.
   * 
   * @param element - The HTML element to style
   * @param node - The talent node containing type information
   */
  private applyNodeTypeStyling(element: HTMLElement, node: TalentNode): void {
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
  private applyNodeStateStyling(element: HTMLElement, node: TalentNode): void {
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
  private getNodeIcon(node: TalentNode): string {
    return node.visual.icon || '🔸';
  }

  /**
   * Handle node click events by dispatching custom events.
   * Allows the talent manager to handle allocation logic.
   * 
   * @param node - The talent node that was clicked
   */
  private handleNodeClick(node: TalentNode): void {
    const event = new CustomEvent('nodeClick', {
      detail: { node }
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Show a tooltip for a talent node with detailed information.
   * Displays node description, prerequisites, and allocation status.
   * 
   * @param node - The talent node to show tooltip for
   * @param nodeElement - The HTML element of the node
   */
  private showTooltipGlobal(node: TalentNode, nodeElement: HTMLElement): void {
    // Remove existing tooltip
    this.hideTooltipGlobal();
    const tooltip = document.createElement('div');
    tooltip.className = 'talent-tooltip visible';
    // Set accent color based on node type/tier
    let accent = '#6fcf97';
    switch (node.type) {
      case 'Genesis': accent = '#a3e635'; break;
      case 'Keystone': accent = '#fbbf24'; break;
      case 'Axiom': accent = '#f38ba8'; break;
      case 'Manifestation': accent = '#cba6f7'; break;
      case 'Capstone': accent = '#f9e2af'; break;
      case 'Schism': accent = '#e64553'; break;
      default: accent = '#6fcf97';
    }
    tooltip.style.setProperty('--tier-accent', accent);
    // Build tooltip content
    let content = `<div class="tt-title">`;
    if (node.visual.icon) {
      content += `<img src="${node.visual.icon}" class="tt-icon" alt="" />`;
    }
    content += `${node.name}</div>`;
    content += `<div class="tt-body">${node.description}</div>`;
    if (node.flavor) {
      content += `<div class="tt-flavor">${node.flavor}</div>`;
    }
    content += `<div class="tt-meta">`;
    content += `<span class="tt-tag tt-cost">Cost: ${node.pkCost} PK</span>`;
    if (node.prerequisites.length > 0) {
      const prereqNames = node.prerequisites.map(id => {
        const prereq = this.lastRenderedNodes.find(n => n.id === id);
        return prereq ? prereq.name : id;
      });
      content += `<span class="tt-tag tt-missing">Missing: ${prereqNames.join(', ')}</span>`;
    }
    content += `</div>`;
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);
    // Position tooltip
    this.positionTooltip(tooltip, nodeElement);
    // Store reference for removal
    this.currentTooltip = tooltip;
  }

  /**
   * Position the tooltip relative to the node element.
   * Ensures the tooltip stays within viewport bounds and never covers the node itself.
   * Default order: above → below → right → left.
   * Adds a pointer/arrow visually connecting the tooltip to the node.
   * Uses CSS transforms for smooth slide-in animation.
   *
   * @param tooltip - The tooltip element to position
   * @param nodeElement - The node element to position relative to
   */
  private positionTooltip(tooltip: HTMLElement, nodeElement: HTMLElement): void {
    const rect = nodeElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const offset = UI_STYLES.TOOLTIP_OFFSET; // 12px
    const margin = UI_STYLES.TOOLTIP_MARGIN; // 16px

    // Get bounding rects for all prerequisite nodes
    const nodeMap = this.getNodeMap();
    const prereqRects = [rect]; // include hovered node
    const prereqs = this.getAllPrereqs(nodeMap.get(nodeElement.dataset.nodeId!), nodeMap);
    prereqs.forEach(prereq => {
      const el = this.nodes.get(prereq.id);
      if (el) prereqRects.push(el.getBoundingClientRect());
    });
    // Helper to check if tooltip overlaps any important node
    const overlapsAny = (left: number, top: number) => {
      const tLeft = left, tRight = left + tooltipRect.width, tTop = top, tBottom = top + tooltipRect.height;
      return prereqRects.some(r =>
        tRight > r.left - 4 && tLeft < r.right + 4 && tBottom > r.top - 4 && tTop < r.bottom + 4
      );
    };
    // Remove any previous arrow
    const oldArrow = tooltip.querySelector('.tooltip-arrow');
    if (oldArrow) oldArrow.remove();
    // Helper to set position and arrow
    const setPosition = (left: number, top: number, arrowDir: 'top'|'bottom'|'left'|'right', arrowX: number, arrowY: number) => {
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.transform = 'translateY(0)';
      tooltip.style.zIndex = UI_STYLES.TOOLTIP_Z_INDEX;
      // Add arrow
      const arrow = document.createElement('div');
      arrow.className = `tooltip-arrow tooltip-arrow--${arrowDir}`;
      arrow.style.position = 'absolute';
      arrow.style.width = '16px';
      arrow.style.height = '8px';
      arrow.style.pointerEvents = 'none';
      arrow.style.left = `${arrowX}px`;
      arrow.style.top = `${arrowY}px`;
      tooltip.appendChild(arrow);
    };
    // Try above
    let left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top + window.scrollY - tooltipRect.height - offset;
    if (top > margin && left > margin && left + tooltipRect.width < viewportWidth - margin && !overlapsAny(left, top)) {
      setPosition(left, top, 'bottom', tooltipRect.width / 2 - 8, tooltipRect.height - 2);
      tooltip.style.transform = 'translateY(-8px)';
      return;
    }
    // Try below
    top = rect.bottom + window.scrollY + offset;
    if (top + tooltipRect.height < viewportHeight - margin && left > margin && left + tooltipRect.width < viewportWidth - margin && !overlapsAny(left, top)) {
      setPosition(left, top, 'top', tooltipRect.width / 2 - 8, -6);
      tooltip.style.transform = 'translateY(8px)';
      return;
    }
    // Try right
    left = rect.right + window.scrollX + offset;
    top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
    if (left + tooltipRect.width < viewportWidth - margin && top > margin && top + tooltipRect.height < viewportHeight - margin && !overlapsAny(left, top)) {
      setPosition(left, top, 'left', -10, tooltipRect.height / 2 - 4);
      tooltip.style.transform = 'translateX(8px)';
      return;
    }
    // Try left
    left = rect.left + window.scrollX - tooltipRect.width - offset;
    if (left > margin && top > margin && top + tooltipRect.height < viewportHeight - margin && !overlapsAny(left, top)) {
      setPosition(left, top, 'right', tooltipRect.width - 6, tooltipRect.height / 2 - 4);
      tooltip.style.transform = 'translateX(-8px)';
      return;
    }
    // Fallback: center in viewport, or offset further if still overlapping
    left = Math.max(margin, (viewportWidth - tooltipRect.width) / 2);
    top = Math.max(margin, (viewportHeight - tooltipRect.height) / 2);
    let tries = 0;
    while (overlapsAny(left, top) && tries < 5) {
      top += tooltipRect.height + 24;
      tries++;
    }
    setPosition(left, top, 'bottom', tooltipRect.width / 2 - 8, tooltipRect.height - 2);
    tooltip.style.transform = 'translateY(0)';
  }

  /**
   * Hide the currently displayed tooltip.
   * Removes the tooltip element from the DOM.
   */
  private hideTooltipGlobal(): void {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }

  /**
   * Clear all rendered content from the container.
   * Removes all nodes and connections from the display.
   */
  clear(): void {
    this.nodes.forEach(element => element.remove());
    this.connections.forEach(element => element.remove());
    this.nodes.clear();
    this.connections.clear();
    this.hideTooltipGlobal();
  }

  /**
   * Update the visual state of nodes based on new data.
   * Recalculates styling without recreating elements.
   * 
   * @param nodes - Array of updated talent nodes
   */
  updateNodeStates(nodes: TalentNode[]): void {
    nodes.forEach(node => {
      const element = this.nodes.get(node.id);
      if (element) {
        // Always dim unselectable nodes
        if (!node.isAllocatable && !node.isAllocated) {
          element.style.opacity = '0.3';
        } else {
          element.style.opacity = '1';
        }
        this.applyNodeStateStyling(element, node);
      }
    });
  }

  /**
   * Get all prerequisite nodes for a given node.
   * Recursively traverses the prerequisite chain.
   * 
   * @param node - The talent node to find prerequisites for
   * @param nodeMap - Map of all nodes for efficient lookup
   * @returns Array of prerequisite nodes
   */
  private getAllPrereqs(node: TalentNode, nodeMap: Map<string, TalentNode>): TalentNode[] {
    const prereqs: TalentNode[] = [];
    const visit = (n: TalentNode) => {
      n.prerequisites.forEach(prereqId => {
        const prereq = nodeMap.get(prereqId);
        if (prereq && !prereqs.includes(prereq)) {
          prereqs.push(prereq);
          visit(prereq);
        }
      });
    };
    visit(node);
    return prereqs;
  }

  /**
   * Get direct child nodes that depend on a given node.
   * Finds nodes that have the given node as a prerequisite.
   * 
   * @param node - The talent node to find children for
   * @param nodeMap - Map of all nodes for efficient lookup
   * @returns Array of child nodes
   */
  private getDirectChildren(node: TalentNode, nodeMap: Map<string, TalentNode>): TalentNode[] {
    return Array.from(nodeMap.values()).filter(n => n.prerequisites.includes(node.id));
  }

  /**
   * Get all node elements except those in the exclude set.
   * Used for highlighting related nodes during interactions.
   * 
   * @param exclude - Set of node IDs to exclude
   * @returns Array of node elements
   */
  private getOtherNodeElements(exclude: Set<string>): HTMLElement[] {
    return Array.from(this.nodes.values()).filter(element => {
      const nodeId = element.dataset.nodeId;
      return nodeId && !exclude.has(nodeId);
    });
  }

  /**
   * Get all connection elements for highlighting.
   * Returns all visual connection elements.
   * 
   * @returns Array of connection elements
   */
  private getAllEdgeElements(): HTMLElement[] {
    return Array.from(this.connections.values());
  }

  /**
   * Handle mouse enter events for nodes.
   * Shows tooltip and highlights related nodes and connections.
   * 
   * @param node - The talent node being hovered
   * @param nodeElement - The HTML element of the node
   * @param nodeMap - Map of all nodes for efficient lookup
   * @param connectionMap - Map of all connections for efficient lookup
   */
  private handleNodeMouseEnter(node: TalentNode, nodeElement: HTMLElement, nodeMap: Map<string, TalentNode>, connectionMap: Map<string, TalentConnection>): void {
    // Show tooltip
    this.showTooltipGlobal(node, nodeElement);

    // Step 1: Dim all nodes and set red outline
    this.lastRenderedNodes.forEach(n => {
      const el = this.nodes.get(n.id);
      if (!el) return;
      el.style.opacity = '0.3';
      el.style.outline = '2px solid #e64553';
      el.style.outlineOffset = '2px';
      el.classList.remove('prereq-glow');
    });
    // Step 2: Highlight selectable nodes
    this.lastRenderedNodes.forEach(n => {
      if (n.isAllocatable) {
        const el = this.nodes.get(n.id);
        if (el) {
          el.style.opacity = '1';
          el.style.outline = '3px solid #ffd700';
          el.style.outlineOffset = '2px';
        }
      }
    });
    // Step 3: Highlight hovered node
    nodeElement.style.opacity = '1';
    nodeElement.style.outline = '4px solid #ffd700';
    nodeElement.style.outlineOffset = '2px';
    // Step 4: Highlight all prerequisites with a blue glow
    const prereqs = this.getAllPrereqs(node, nodeMap);
    prereqs.forEach(prereq => {
      const el = this.nodes.get(prereq.id);
      if (el) {
        el.classList.add('prereq-glow');
      }
    });
  }

  /**
   * Handle mouse leave events for nodes.
   * Hides tooltip and removes highlighting from nodes and connections.
   * 
   * @param node - The talent node being unhovered
   * @param nodeElement - The HTML element of the node
   */
  private handleNodeMouseLeave(node: TalentNode, nodeElement: HTMLElement): void {
    // Hide tooltip
    this.hideTooltipGlobal();
    // Reset all outlines, opacity, and prerequisite glow
    this.lastRenderedNodes.forEach(n => {
      const el = this.nodes.get(n.id);
      if (el) {
        el.style.outline = '';
        el.style.outlineOffset = '';
        el.classList.remove('prereq-glow');
      }
    });
    // Reset connection styling
    this.getAllEdgeElements().forEach(element => {
      element.style.backgroundColor = '';
      element.style.boxShadow = '';
      element.style.opacity = '';
    });
    // Re-apply node state styling to ensure correct dimming/brightness
    this.updateNodeStates(this.lastRenderedNodes);
  }

  /**
   * Mark connection state for visual feedback.
   * Updates the visual appearance of connections based on their state.
   * 
   * @param fromId - The ID of the source node
   * @param toId - The ID of the target node
   * @param className - CSS class to apply for styling
   */
  private markEdgeState(fromId: string, toId: string, className: string): void {
    const connectionId = `${fromId}-${toId}`;
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.className = `talent-connection ${className}`;
    }
  }

  /**
   * Get a map of all rendered nodes for efficient lookup.
   * 
   * @returns Map of node ID to TalentNode
   */
  private getNodeMap(): Map<string, TalentNode> {
    return new Map(this.lastRenderedNodes.map(node => [node.id, node]));
  }

  /**
   * Get a map of all rendered connections for efficient lookup.
   * 
   * @returns Map of connection ID to TalentConnection
   */
  private getConnectionMap(): Map<string, TalentConnection> {
    return new Map(this.lastRenderedConnections.map(conn => [`${conn.from}-${conn.to}`, conn]));
  }

  // Private property to track current tooltip
  private currentTooltip: HTMLElement | null = null;
} 