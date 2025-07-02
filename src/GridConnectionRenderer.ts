/**
 * GridConnectionRenderer - Handles creation and styling of SVG connection elements for the grid-based renderer.
 * Implements glowing path effect for the shortest unlock path to a hovered node, using smooth Bézier curves, color-sync, arrowheads, and depth fading/tapering.
 */
import type { TalentConnection, TalentNode } from './types/talent.types';

/**
 * Handles creation and styling of SVG connection elements with animated glow effects.
 */
export class GridConnectionRenderer {
  private svgContainer: SVGSVGElement | null = null;
  private nodeMap: Map<string, HTMLElement> = new Map();
  private allConnections: TalentConnection[] = [];
  private allNodes: TalentNode[] = [];
  private currentAccent: string | null = null;

  /**
   * Initialize the SVG container for rendering edges.
   * Creates a full-size SVG overlay positioned behind the nodes.
   *
   * @param container - The HTML element to append the SVG to
   */
  initializeSVGContainer(container: HTMLElement): void {
    // Remove existing SVG if present
    const existingSVG = container.querySelector('.talent-edges');
    if (existingSVG) {
      existingSVG.remove();
    }

    // Create new SVG container
    this.svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgContainer.setAttribute('class', 'talent-edges');
    this.svgContainer.style.position = 'absolute';
    this.svgContainer.style.top = '0';
    this.svgContainer.style.left = '0';
    this.svgContainer.style.width = '100%';
    this.svgContainer.style.height = '100%';
    this.svgContainer.style.pointerEvents = 'none';
    this.svgContainer.style.zIndex = '1';

    // Add arrowhead marker definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refX', '5');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'strokeWidth');
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowPath.setAttribute('d', 'M0,0 L6,3 L0,6 Z');
    arrowPath.setAttribute('fill', 'currentColor');
    arrowPath.setAttribute('stroke', 'none');
    arrowPath.setAttribute('stroke-linejoin', 'round');
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    this.svgContainer.appendChild(defs);

    // Insert SVG at the beginning so it renders behind nodes
    container.insertBefore(this.svgContainer, container.firstChild);
  }

  /**
   * Store the node map and all connections for later use.
   */
  setNodeMapAndConnections(nodeMap: Map<string, HTMLElement>, allConnections: TalentConnection[], allNodes: TalentNode[]): void {
    this.nodeMap = nodeMap;
    this.allConnections = allConnections;
    this.allNodes = allNodes;
  }

  /**
   * On hover, find the shortest unlock path from any genesis node to the hovered node.
   * Draw only that path as a glowing SVG Bézier curve in the node's accent color, with arrowhead, fading, and tapering.
   */
  highlightUnlockPathToNode(targetNodeId: string): void {
    console.log(`highlightUnlockPathToNode called for: ${targetNodeId}`);
    
    if (!this.svgContainer) {
      console.warn('SVG container not initialized');
      return;
    }
    
    console.log(`SVG container found, allNodes: ${this.allNodes.length}, allConnections: ${this.allConnections.length}`);
    
    // Remove all but <defs>
    Array.from(this.svgContainer.childNodes).forEach(node => {
      if (node.nodeName !== 'defs') this.svgContainer.removeChild(node);
    });
    
    const path = this.getShortestUnlockPath(targetNodeId);
    console.log(`Path found:`, path);
    
    if (path.length < 2) {
      console.log(`Path too short, returning`);
      return;
    }
    
    // Get accent color from the target node
    const targetEl = this.nodeMap.get(targetNodeId);
    let accent = '#a5b4fc'; // fallback
    if (targetEl) {
      const style = getComputedStyle(targetEl);
      accent = style.getPropertyValue('--tier-accent').trim() || accent;
    }
    console.log(`Using accent color: ${accent}`);
    this.currentAccent = accent;
    const length = path.length - 1;
    
    for (let i = 1; i < path.length; ++i) {
      const from = path[i - 1];
      const to = path[i];
      const fromElement = this.nodeMap.get(from);
      const toElement = this.nodeMap.get(to);
      
      if (!fromElement || !toElement) {
        console.warn(`Missing element for path segment ${from} -> ${to}`);
        continue;
      }
      
      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();
      const containerRect = this.svgContainer.getBoundingClientRect();
      const fromCenter = {
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top
      };
      const toCenter = {
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top
      };
      
      console.log(`Drawing path from ${from} to ${to}: (${fromCenter.x}, ${fromCenter.y}) -> (${toCenter.x}, ${toCenter.y})`);
      
      const d = this.makeCurvePath(fromCenter.x, fromCenter.y, toCenter.x, toCenter.y);
      const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      svgPath.setAttribute('class', 'edge glow-edge');
      svgPath.setAttribute('d', d);
      svgPath.setAttribute('marker-end', 'url(#arrowhead)');
      svgPath.style.stroke = accent;
      svgPath.style.filter = `drop-shadow(0 0 8px ${accent})`;
      // Depth fading & thickness
      const factor = i / length;
      svgPath.style.strokeOpacity = String(0.3 + 0.7 * factor);
      svgPath.style.strokeWidth = String(2 + 6 * factor);
      this.svgContainer.appendChild(svgPath);
      console.log(`Added SVG path element`);
    }
  }

  /**
   * Remove all SVG edges (called on mouse leave).
   */
  clearGlowEffects(): void {
    if (this.svgContainer) {
      // Remove all but <defs>
      Array.from(this.svgContainer.childNodes).forEach(node => {
        if (node.nodeName !== 'defs') this.svgContainer.removeChild(node);
      });
    }
    this.currentAccent = null;
  }

  /**
   * Generate a smooth cubic Bézier curve between two points.
   * Control points are offset perpendicular to the line for a gentle arc.
   */
  private makeCurvePath(x1: number, y1: number, x2: number, y2: number): string {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const perpX = -dy * 0.2;
    const perpY = dx * 0.2;
    const cx1 = mx + perpX;
    const cy1 = my + perpY;
    const cx2 = cx1;
    const cy2 = cy1;
    return `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
  }

  /**
   * Find the shortest unlock path from any genesis node to the target node using BFS.
   * Traverses the full node graph (including minors), but only returns the sequence of major nodes for the visual path.
   * Returns an array of node IDs in order from genesis to target, only including major nodes.
   */
  private getShortestUnlockPath(targetNodeId: string): string[] {
    const nodeById = new Map(this.allNodes.map(n => [n.id, n]));
    const MAJOR_TYPES = new Set([
      'Genesis', 'Keystone', 'Manifestation', 'Axiom', 'Capstone', 'Synthesis', 'Schism'
    ]);
    // Find all genesis node IDs
    const genesisIds = this.allNodes.filter(n => n.type === 'Genesis').map(n => n.id);
    // BFS to find shortest path (including minors)
    const queue: { path: string[]; node: string }[] = genesisIds.map(id => ({ path: [id], node: id }));
    const visited = new Set<string>(genesisIds);
    let foundPath: string[] | null = null;
    while (queue.length > 0) {
      const { path, node } = queue.shift()!;
      if (node === targetNodeId) {
        foundPath = path;
        break;
      }
      // Get all children
      const children = this.allConnections.filter(conn => conn.from === node).map(conn => conn.to);
      for (const child of children) {
        if (!visited.has(child)) {
          visited.add(child);
          queue.push({ path: [...path, child], node: child });
        }
      }
    }
    if (!foundPath) return [];
    // Only keep major nodes in the returned path (skip minors visually)
    return foundPath.filter(id => {
      const n = nodeById.get(id);
      return n && MAJOR_TYPES.has(n.type);
    });
  }
} 