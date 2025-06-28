// FILE: C:\Users\rohai\Desktop\WEBSITE PAGES\AVATAR\TALENT TREES\talent tree project\src\main.ts

import '/style.css';
import { TalentTreeRenderer } from './talentTreeRenderer';
import { TalentTreeManager, type VisualEvent } from './talentTreeManager';
import { assetManager } from './assetManager';
import type { AppState, Point, RenderConfig, TalentNode } from './types';
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

class TalentTreeApp {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: TalentTreeRenderer;
  private manager: TalentTreeManager;
  private isDragging = false;
  private lastMousePos: Point = { x: 0, y: 0 };
  private tooltip: HTMLElement;
  private buildSummary: HTMLElement;
  private summaryTooltip: HTMLElement;
  private animationFrameId: number | null = null;
  private lastDebugLog: number | null = null;
  private visualEffects: Map<string, { type: string; startTime: number; duration: number }> = new Map();
  private currentElement: string = 'air';

  constructor() {
    this.initializeCanvas();
    this.initializeComponents().then(() => {
      this.setupEventListeners();
      this.startRenderLoop();
      // Defer centering to ensure all layout calculations are complete
      requestAnimationFrame(() => this.centerViewOnLoad());
    }).catch(console.error);
  }

  private initializeCanvas(): void {
    this.canvas = document.getElementById('talent-tree-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.resizeCanvas();
  }

  private async initializeComponents(): Promise<void> {
    await assetManager.initialize();
    const renderConfig: RenderConfig = {
      canvas: this.canvas,
      ctx: this.ctx,
      viewport: { x: 0, y: 0, width: this.canvas.clientWidth, height: this.canvas.clientHeight },
      debug: false
    };
    this.renderer = new TalentTreeRenderer(renderConfig);
    this.manager = new TalentTreeManager();
    this.manager.subscribe(this.updateUI.bind(this));
    this.tooltip = document.getElementById('tooltip') as HTMLElement;
    this.buildSummary = document.getElementById('build-summary') as HTMLElement;
    this.summaryTooltip = document.getElementById('summary-tooltip') as HTMLElement;
    
    // Initialize with Air constellation
    this.switchToElement('air');
    this.updateUI(this.manager.getState());
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.canvas.addEventListener('contextmenu', this.handleContextMenu.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));

    // Elemental selector event listeners
    const elementalSelector = document.getElementById('elemental-selector');
    if (elementalSelector) {
      elementalSelector.addEventListener('click', (event) => {
        const elementBtn = (event.target as HTMLElement).closest('.element-btn');
        if (elementBtn) {
          const elementId = elementBtn.getAttribute('data-element');
          if (elementId && elementId !== this.currentElement) {
            this.switchToElement(elementId);
          }
        }
      });
    }

    document.getElementById('reset-btn')?.addEventListener('click', () => {
        this.manager.resetPoints();
        this.centerViewOnLoad();
    });
    document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
      const center = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
      this.manager.setZoomAtPosition(this.manager.getState().zoom * 1.2, center);
    });
    document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
      const center = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
      this.manager.setZoomAtPosition(this.manager.getState().zoom * 0.8, center);
    });

    // Delegated Event Listeners for the Build Summary Panel
    
    // CLICK: Focus the node on the canvas
    this.buildSummary.addEventListener('click', (event) => {
        const listItem = (event.target as HTMLElement).closest('li[data-node-id]');
        if (listItem) {
            const nodeId = listItem.getAttribute('data-node-id');
            if (nodeId) this.focusOnNode(nodeId);
        }
    });

    // MOUSEOVER: Show the tooltip
    this.buildSummary.addEventListener('mouseover', (event) => {
        const listItem = (event.target as HTMLElement).closest('li[data-node-id]');
        if (listItem) {
            const nodeId = listItem.getAttribute('data-node-id');
            const node = nodeId ? this.manager.getState().talentTree.nodes.find(n => n.id === nodeId) : null;
            if (node) {
                this.showSummaryTooltip(node, listItem as HTMLElement);
            }
        }
    });

    // MOUSEOUT: Hide the tooltip ONLY when leaving the entire list container
    this.buildSummary.addEventListener('mouseout', (event: MouseEvent) => {
        // The `relatedTarget` is the element the mouse is moving TO.
        // If the relatedTarget is null (mouse left the window) or is NOT inside the buildSummary div,
        // then we can safely hide the tooltip.
        if (!this.buildSummary.contains(event.relatedTarget as Node)) {
            this.hideSummaryTooltip();
        }
    });
  }

  /**
   * Switch to a different elemental constellation
   */
  private switchToElement(elementId: string): void {
    if (!getConstellation(elementId)) {
      console.error(`Invalid element ID: ${elementId}`);
      return;
    }

    this.currentElement = elementId;
    
    // Update canvas background class
    const canvasContainer = document.getElementById('talent-tree-container') as HTMLElement;
    if (canvasContainer) {
      canvasContainer.className = 'talent-tree-container'; // Reset previous classes
      canvasContainer.classList.add(`${elementId}-bg`);
    }
    
    // Update UI to reflect the new element
    this.updateElementalUI();
    
    // Load the appropriate talent data
    this.loadElementalData(elementId);
    
    // Reset view and center on new tree
    this.centerViewOnLoad();
  }

  /**
   * Load talent data for the specified element
   */
  private loadElementalData(elementId: string): void {
    let talentNodes: TalentNode[] = [];
    let connections: any[] = [];

    switch (elementId) {
      case 'air':
        talentNodes = AIR_TALENT_NODES;
        connections = generateAirConnections();
        break;
      case 'fire':
        talentNodes = FIRE_TALENT_NODES;
        connections = generateFireConnections();
        break;
      case 'water':
        talentNodes = WATER_TALENT_NODES;
        connections = generateWaterConnections();
        break;
      case 'earth':
        talentNodes = generateAllEarthNodes();
        connections = generateAllEarthConnections();
        break;
      case 'steel':
        talentNodes = generateAllSteelNodes();
        connections = generateAllSteelConnections();
        break;
      default:
        console.error(`Unknown element: ${elementId}`);
        return;
    }

    // Debug logging for Earth
    if (elementId === 'earth') {
      console.log(`Earth nodes generated: ${talentNodes.length}`);
      console.log(`Earth connections generated: ${connections.length}`);
      
      // Log the first few nodes to see their structure
      talentNodes.slice(0, 10).forEach((node, index) => {
        console.log(`Node ${index}: ${node.name} (${node.path}) at (${node.position.x}, ${node.position.y})`);
      });
      
      // Check if all paths are represented
      const paths = new Set(talentNodes.map(n => n.path));
      console.log(`Earth paths found:`, Array.from(paths));
    }

    // Update the talent tree manager with new data
    this.manager.loadTalentTree({
      nodes: talentNodes,
      connections: connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: getConstellation(elementId)?.name || 'Unknown Constellation',
        description: getConstellation(elementId)?.description || '',
        background: elementId
      }
    });
  }

  /**
   * Update the elemental selector UI to reflect the current element
   */
  private updateElementalUI(): void {
    // Update active button state
    const elementBtns = document.querySelectorAll('.element-btn');
    elementBtns.forEach(btn => {
      const btnElement = btn as HTMLElement;
      const elementId = btnElement.getAttribute('data-element');
      if (elementId === this.currentElement) {
        btnElement.classList.add('active');
      } else {
        btnElement.classList.remove('active');
      }
    });

    // Update constellation info
    const constellation = getConstellation(this.currentElement);
    if (constellation) {
      const nameElement = document.getElementById('constellation-name');
      const descElement = document.getElementById('constellation-description');
      
      if (nameElement) nameElement.textContent = constellation.name;
      if (descElement) descElement.textContent = constellation.description;
    }
  }

  private centerViewOnLoad(): void {
      const state = this.manager.getState();
      const nodes = state.talentTree.nodes.filter(node => node.isVisible);
      
      if (nodes.length === 0) {
          // Fallback to hardcoded center if no nodes
          const treeCenter = { x: 800, y: 450 };
          const canvasCenter = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
          const initialZoom = 0.5;
          this.manager.setZoom(initialZoom);
          const initialPan = {
              x: canvasCenter.x - treeCenter.x * initialZoom,
              y: canvasCenter.y - treeCenter.y * initialZoom
          };
          this.manager.setPan(initialPan);
          return;
      }
      
      // Calculate the actual center of all visible nodes
      const minX = Math.min(...nodes.map(n => n.position.x));
      const maxX = Math.max(...nodes.map(n => n.position.x));
      const minY = Math.min(...nodes.map(n => n.position.y));
      const maxY = Math.max(...nodes.map(n => n.position.y));
      
      const treeCenter = {
          x: (minX + maxX) / 2,
          y: (minY + maxY) / 2
      };
      
      const canvasCenter = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
      const initialZoom = 0.5;
      this.manager.setZoom(initialZoom);
      const initialPan = {
          x: canvasCenter.x - treeCenter.x * initialZoom,
          y: canvasCenter.y - treeCenter.y * initialZoom
      };
      this.manager.setPan(initialPan);
      
      // Debug: Log the calculated center and node bounds
      console.log(`Tree Center: ${treeCenter.x}, ${treeCenter.y}`);
      console.log(`Node Bounds: X(${minX}-${maxX}), Y(${minY}-${maxY})`);
  }

  private focusOnNode(nodeId: string): void {
    const node = this.manager.getState().talentTree.nodes.find(n => n.id === nodeId);
    if (!node) return;

    // Use the same spread factor from the renderer for accurate positioning
    const SPREAD_FACTOR = 1.3;
    const targetX = node.position.x * SPREAD_FACTOR;
    const targetY = node.position.y * SPREAD_FACTOR;

    const canvasCenter = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
    
    // Set a comfortable zoom level for viewing a single node
    const targetZoom = 1.2;
    this.manager.setZoom(targetZoom);
    
    // Calculate the pan required to center the node
    const newPan = {
        x: canvasCenter.x - (targetX * targetZoom),
        y: canvasCenter.y - (targetY * targetZoom),
    };
    this.manager.setPan(newPan);
    
    // Optional: Add a visual pulse effect here in the future
  }

  private handleMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.lastMousePos = { x: event.clientX, y: event.clientY };
    this.canvas.style.cursor = 'grabbing';
  }

  private handleMouseMove(event: MouseEvent): void {
    const state = this.manager.getState();
    const dpr = window.devicePixelRatio || 1;

    if (this.isDragging) {
      const currentPos = { x: event.clientX, y: event.clientY };
      const delta = { x: currentPos.x - this.lastMousePos.x, y: currentPos.y - this.lastMousePos.y };
      this.manager.panBy(delta);
      this.lastMousePos = currentPos;
    } else {
      const rect = this.canvas.getBoundingClientRect();
      const position = { 
        x: (event.clientX - rect.left) * dpr, 
        y: (event.clientY - rect.top) * dpr 
      };
      
      const hoveredNode = this.renderer.findNodeAtPosition(position, state.talentTree.nodes, state.zoom, state.pan);
      this.manager.setHoveredNode(hoveredNode ? hoveredNode.id : null);
      this.canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
      if (hoveredNode) this.showTooltip(hoveredNode, event);
      else this.hideTooltip();
    }
  }

  private handleMouseUp(): void {
    this.isDragging = false;
    this.canvas.style.cursor = 'grab';
  }

  private handleMouseLeave(): void {
    if (this.isDragging) this.isDragging = false;
    this.canvas.style.cursor = 'grab';
    this.manager.setHoveredNode(null);
    this.hideTooltip();
  }

  private handleClick(event: MouseEvent): void {
    if(event.button !== 0) return;

    const state = this.manager.getState();
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const position = { 
      x: (event.clientX - rect.left) * dpr, 
      y: (event.clientY - rect.top) * dpr 
    };

    const clickedNode = this.renderer.findNodeAtPosition(position, state.talentTree.nodes, state.zoom, state.pan);
    if (clickedNode) {
      const wasAllocatable = clickedNode.isAllocatable && !clickedNode.isAllocated;
      this.manager.handleNodeClick(clickedNode.id);
      
      // Trigger flash animation on successful allocation
      const updatedNode = this.manager.getState().talentTree.nodes.find(n => n.id === clickedNode.id);
      if (wasAllocatable && updatedNode?.isAllocated) {
          this.visualEffects.set(clickedNode.id, {
              type: 'allocate_flash',
              startTime: Date.now(),
              duration: 600 // 600ms duration for the flash
          });
      }
    }
  }

  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    this.manager.setZoomAtPosition(this.manager.getState().zoom * zoomFactor, mousePos);
  }

  private handleResize(): void {
    this.resizeCanvas();
    this.renderer.updateViewport();
    this.centerViewOnLoad();
  }

  private resizeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  
  private startRenderLoop(): void {
    const loop = () => {
      const state = this.manager.getState();
      
      // Process visual events for animations
      this.processVisualEvents();
      
      const highlightedNodes = new Map<string, { type: 'prereq_chain' | 'prereq_met' | 'blocker' }>();
      const glowingNodeIds = new Set<string>();
      const highlightedConnections = new Set<string>();

      if (state.hoveredNode) {
        const hoveredNode = state.talentTree.nodes.find(n => n.id === state.hoveredNode);
        if (hoveredNode && (hoveredNode.isLocked || hoveredNode.isPermanentlyLocked)) {
          let currentNode = hoveredNode;
          while (currentNode && !currentNode.isAllocated) {
            highlightedNodes.set(currentNode.id, { type: 'prereq_chain' });
            if (currentNode.prerequisites.length > 0) {
              const prereqId = currentNode.prerequisites[0];
              const prereqNode = state.talentTree.nodes.find(n => n.id === prereqId);
              if (prereqNode) {
                highlightedConnections.add(`${prereqId}-${currentNode.id}`);
                if (prereqNode.isAllocated) {
                  highlightedNodes.set(prereqNode.id, { type: 'prereq_met' });
                  break;
                }
                currentNode = prereqNode;
              } else { break; }
            } else { break; }
          }
        }
      }

      // Process visual effects for animations
      const visualEffectsMap = new Map<string, { type: string; progress: number }>();
      const now = Date.now();
      this.visualEffects.forEach((effect, nodeId) => {
          const elapsed = now - effect.startTime;
          const progress = Math.min(elapsed / effect.duration, 1);
          if (progress < 1) {
              visualEffectsMap.set(nodeId, { type: effect.type, progress });
          } else {
              // Remove completed effects
              this.visualEffects.delete(nodeId);
          }
      });

      this.renderer.render(state.talentTree, state.zoom, state.pan, state.hoveredNode, visualEffectsMap, highlightedNodes, glowingNodeIds, highlightedConnections);
      
      this.updateUI(state);
      
      this.animationFrameId = requestAnimationFrame(loop);
    };
    
    loop();
  }

  /**
   * Processes visual events and creates animations
   */
  private processVisualEvents(): void {
    const events = this.manager.getVisualEvents();
    const now = Date.now();
    
    events.forEach(event => {
      if (event.type === 'bridge_allocated') {
        // Create flash effect for allocated Bridge
        this.visualEffects.set(event.nodeId, {
          type: 'bridge_flash',
          startTime: now,
          duration: 1000 // 1 second flash
        });
      } else if (event.type === 'bridge_locked') {
        // Create fade effect for locked Bridge
        this.visualEffects.set(event.nodeId, {
          type: 'bridge_locked',
          startTime: now,
          duration: 2000 // 2 second fade
        });
      } else if (event.type === 'synthesis_revealed') {
        // Create reveal animation for Synthesis node
        this.visualEffects.set(event.nodeId, {
          type: 'synthesis_reveal',
          startTime: now,
          duration: 1500 // 1.5 second reveal
        });
      }
    });
  }

  /**
   * Gets the current visual effect for a node
   */
  getVisualEffect(nodeId: string): { type: string; progress: number } | null {
    const effect = this.visualEffects.get(nodeId);
    if (!effect) return null;
    
    const now = Date.now();
    const elapsed = now - effect.startTime;
    const progress = Math.min(elapsed / effect.duration, 1);
    
    // Remove completed effects
    if (progress >= 1) {
      this.visualEffects.delete(nodeId);
      return null;
    }
    
    return { type: effect.type, progress };
  }

  private updateUI(state: AppState): void {
    // 1. Update the Points Gauge
    const gauge = document.getElementById('pk-gauge') as HTMLElement;
    const gaugeText = document.getElementById('pk-gauge-text') as HTMLElement;
    const spentText = document.getElementById('pk-spent-text') as HTMLElement;
    
    const remainingPK = state.talentTree.totalPK - state.talentTree.spentPK;
    const progressPercent = state.talentTree.totalPK > 0 ? (state.talentTree.spentPK / state.talentTree.totalPK) * 100 : 0;

    if (gauge) gauge.style.setProperty('--pk-progress', `${progressPercent}`);
    if (gaugeText) gaugeText.textContent = `${remainingPK}`;
    if (spentText) spentText.textContent = `Spent: ${state.talentTree.spentPK}`;

    // 2. Build the interactive "Outliner" / Chronicle
    const chosenPaths = Array.from(state.talentTree.chosenPaths.values());
    const allocatedNodes = state.talentTree.nodes.filter(n => n.isAllocated);
    const wounds = state.talentTree.philosophicalWounds;
    const covenant = state.talentTree.covenant;

    // Create the interactive allocated nodes list
    const allocatedNodesHTML = allocatedNodes.length > 0 
      ? `<ul class="allocated-nodes-list">
          ${allocatedNodes.map(n => `
            <li data-node-id="${n.id}">
              <span class="node-type-icon" data-node-type="${n.type}"></span>
              <span>${n.name}</span>
            </li>
          `).join('')}
        </ul>`
      : '<ul><li>None</li></ul>';

    this.buildSummary.innerHTML = `
      <div class="summary-section">
        <strong>Chosen Paths</strong>
        <ul>
          ${chosenPaths.length > 0 ? chosenPaths.map(p => `<li>${this.formatPathName(p)}</li>`).join('') : '<li>None</li>'}
        </ul>
      </div>
      <div class="summary-section">
        <strong>Allocated Nodes (${allocatedNodes.length})</strong>
        ${allocatedNodesHTML}
      </div>
      <div class="summary-section wounds ${wounds.length > 0 ? 'is-active' : ''}">
        <strong>Philosophical Wounds</strong>
        <ul>
          ${wounds.length > 0 ? wounds.map(w => `<li>${w}</li>`).join('') : '<li>None</li>'}
        </ul>
      </div>
      <div class="summary-section covenant ${covenant?.isActive ? 'is-active' : ''}">
        <strong>Covenant</strong>
        <ul>
          ${covenant?.isActive ? `<li>${covenant.definition.name}</li>` : '<li>None</li>'}
        </ul>
      </div>
    `;
  }
  
  private showTooltip(node: TalentNode, event: MouseEvent): void {
    this.tooltip.innerHTML = this.createTooltipContent(node);
    this.tooltip.style.display = 'block';
    this.tooltip.classList.add('show');
    
    // Temporarily set left/top to 0 to get accurate size
    this.tooltip.style.left = '0px';
    this.tooltip.style.top = '0px';
    const rect = this.tooltip.getBoundingClientRect();
    let left = event.clientX + 20;
    let top = event.clientY + 20;
    
    // Clamp right edge
    if (left + rect.width > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - rect.width - 8);
    }
    // Clamp bottom edge
    if (top + rect.height > window.innerHeight - 8) {
      top = Math.max(8, window.innerHeight - rect.height - 8);
    }
    // If tooltip would go off the left, stick to left edge
    if (left < 8) left = 8;
    // If tooltip would go off the top, stick to top edge
    if (top < 8) top = 8;
    
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }

  /**
   * Formats a raw path ID (e.g., 'soaring_freedom') into a display-ready name ('Soaring Freedom').
   */
  private formatPathName(pathId: string): string {
    if (!pathId) return 'Unknown Path';
    return pathId
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private createTooltipContent(node: TalentNode): string {
    const state = this.manager.getState();
    
    // Special case: root node (The Unburdened Gale)
    if (node.id === 'constellation_root') {
      return `
        <div class="tooltip-container">
          <div class="tooltip-header">
            <h3 class="node-name">The Unburdened Gale</h3>
            <div class="node-meta">
              <span class="node-type">Constellation</span>
              <span class="node-path">Air</span>
            </div>
          </div>
          <div class="tooltip-body">
            <div class="node-description">
              <h4>Effect</h4>
              <p>The constellation of freedom, movement, and transcendence. Choose one of the three paths to begin your journey.</p>
            </div>
            <div class="node-flavor">
              <h4>Philosophy</h4>
              <p class="flavor-text">"The wind knows no bounds, and neither should the spirit."</p>
            </div>
          </div>
        </div>
      `;
    }
    
    // Determine node status and styling
    let statusClass = 'node-unallocated';
    let statusText = 'Unallocated';
    
    if (node.isAllocated) {
      statusClass = 'node-allocated';
      statusText = 'Allocated';
    } else if (node.isPermanentlyLocked) {
      statusClass = 'node-locked';
      statusText = 'Locked';
    } else if (node.isAllocatable) {
      statusClass = 'node-allocatable';
      statusText = 'Allocatable';
    } else if (node.isLocked) {
        statusClass = 'node-locked';
        statusText = 'Locked';
    }

    // Get prerequisite nodes for display
    const prereqNodes = node.prerequisites
      .map(prereqId => state.talentTree.nodes.find(n => n.id === prereqId))
      .filter((n): n is TalentNode => n !== undefined);
      
    // This is the fixed HTML generation logic
    return `
      <div class="tooltip-container">
        <div class="tooltip-header">
          <h3 class="node-name">${node.name}</h3>
          <div class="node-meta">
            <span class="node-type">${node.type}</span>
            <span class="node-path">${this.formatPathName(node.path)}</span>
          </div>
        </div>
        
        <div class="tooltip-body">
          <div class="node-status-container">
            <span class="node-status ${statusClass}">${statusText}</span>
          </div>
        
          <div class="node-description">
            <h4>Effect</h4>
            <p>${node.description}</p>
          </div>
          
          <div class="node-flavor">
            <h4>Philosophy</h4>
            <p class="flavor-text">"${node.flavor}"</p>
          </div>

          ${node.isPermanentlyLocked ? `
            <div class="node-warning">
              <h4>🚫 Permanently Locked</h4>
              <p>A conflicting choice (like taking a Schism over a Capstone) has locked this node. This cannot be undone without a full reset.</p>
            </div>
          ` : ''}
          
          ${!node.isAllocatable && !node.isAllocated && !node.isPermanentlyLocked && prereqNodes.some(p => !p.isAllocated) ? `
             <div class="node-requirement">
                <h4>🔒 Locked by Prerequisite</h4>
                <p>You must first allocate all prerequisite nodes to unlock this.</p>
             </div>
          ` : ''}

          ${node.type === 'Schism' ? `
            <div class="node-warning">
              <h4>💀 Heretical Choice</h4>
              <p>This node represents a fundamental betrayal of your path. Taking it will inflict a permanent Philosophical Wound and lock you out of the path's Capstone.</p>
            </div>
          ` : ''}
          
        </div>
        
        <div class="tooltip-footer">
          <div class="node-cost">
            <span class="cost-label">Cost:</span>
            <span class="cost-value">${node.pkCost} Points of Knowing</span>
          </div>
          
          ${prereqNodes.length > 0 ? `
            <div class="node-prerequisites">
              <span class="prereq-label">Prerequisites:</span>
              <ul class="prereq-list">
                ${prereqNodes.map(prereq => `<li class="${prereq.isAllocated ? 'met' : 'unmet'}">${prereq.name}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private hideTooltip(): void {
    this.tooltip.classList.remove('show');
    setTimeout(() => {
      this.tooltip.style.display = 'none';
    }, 300);
  }

  /**
   * Shows a simplified tooltip next to the allocated nodes list
   * @param node The talent node to display information for
   * @param targetElement The list item element being hovered
   */
  private showSummaryTooltip(node: TalentNode, targetElement: HTMLElement): void {
    if (!this.summaryTooltip) return;

    // Set the content with just the effect description
    this.summaryTooltip.innerHTML = `
      <h4>Effect</h4>
      <p>${node.description}</p>
    `;

    // Calculate position relative to the UI panel
    const panelRect = (document.getElementById('ui-panel') as HTMLElement).getBoundingClientRect();
    const itemRect = targetElement.getBoundingClientRect();
    
    // Position it to the right of the panel, aligned with the hovered list item
    const top = itemRect.top;
    const left = panelRect.right + 10; // 10px gutter

    this.summaryTooltip.style.top = `${top}px`;
    this.summaryTooltip.style.left = `${left}px`;
    this.summaryTooltip.classList.add('show');
  }

  /**
   * Hides the summary tooltip
   */
  private hideSummaryTooltip(): void {
    if (!this.summaryTooltip) return;
    this.summaryTooltip.classList.remove('show');
  }

  private handleContextMenu(event: MouseEvent): void {
    event.preventDefault();
    const state = this.manager.getState();
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const position = {
      x: (event.clientX - rect.left) * dpr,
      y: (event.clientY - rect.top) * dpr
    };
    const node = this.renderer.findNodeAtPosition(position, state.talentTree.nodes, state.zoom, state.pan);
    if (node && node.isAllocated) {
      this.manager.removePoint(node.id);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new TalentTreeApp());