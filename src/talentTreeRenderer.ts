/**
 * Talent Tree Renderer - POE Style Overhaul
 * Handles drawing the talent tree on canvas with a professional, layered aesthetic.
 */

import type { 
  TalentTree, 
  TalentNode, 
  Point, 
  RenderConfig,
} from './types';

// A map to associate node icon types with emojis.
const EMOJI_MAP: Record<string, string> = {
    // Gentle Breeze
    'gentle_breeze_genesis': '🍃',
    'gentle_breeze_keystone': '🛡️',
    'gentle_breeze_manifestation': '💨',
    'gentle_breeze_axiom': '👁️',
    'gentle_breeze_capstone': '🌀',
    'gentle_breeze_gnosticrite': '🙏',
    'gentle_breeze_schism': '💥',
    'gentle_breeze_minor': '🕊️',

    // Sacred Breath
    'sacred_breath_genesis': '🕉️',
    'sacred_breath_keystone': '✨',
    'sacred_breath_manifestation': '👻',
    'sacred_breath_axiom': '🌌',
    'sacred_breath_capstone': '❤️‍🩹',
    'sacred_breath_gnosticrite': '🙏',
    'sacred_breath_schism': '💔',
    'sacred_breath_minor': '🕊️',

    // Wild Gale
    'wild_gale_genesis': '🌪️',
    'wild_gale_keystone': '💥',
    'wild_gale_manifestation': '⛈️',
    'wild_gale_axiom': '⚡',
    'wild_gale_capstone': '🐉',
    'wild_gale_gnosticrite': '🙏',
    'wild_gale_schism': '🌋',
    'wild_gale_minor': '💨',

    // Dancing Wind
    'dancing_wind_genesis': '🕊️',
    'dancing_wind_keystone': '🤸',
    'dancing_wind_manifestation': '🪁',
    'dancing_wind_axiom': '💫',
    'dancing_wind_capstone': '🦅',
    'dancing_wind_gnosticrite': '🙏',
    'dancing_wind_schism': '☄️',
    'dancing_wind_minor': '🪶',

    // Hun Yuan (Neutral Jing)
    'hun_yuan_genesis': '👂',
    'hun_yuan_keystone': '🛡️',
    'hun_yuan_manifestation': '🧱',
    'hun_yuan_axiom': '⛰️',
    'hun_yuan_capstone': '🧘',
    'hun_yuan_gnosticrite': '🙏',
    'hun_yuan_schism': '💥',
    'hun_yuan_minor': '🪨',

    // Bian Hua (Transformation)
    'bian_hua_genesis': '↔️',
    'bian_hua_keystone': '🔥',
    'bian_hua_manifestation': '⛓️',
    'bian_hua_axiom': '⏳',
    'bian_hua_capstone': '🌋',
    'bian_hua_gnosticrite': '🙏',
    'bian_hua_schism': '☣️',
    'bian_hua_minor': '🪨',

    // Gang Qiang (Unyielding Strength)
    'gang_qiang_genesis': '👊',
    'gang_qiang_keystone': '💪',
    'gang_qiang_manifestation': '🌋',
    'gang_qiang_axiom': '🏋️',
    'gang_qiang_capstone': '🗿',
    'gang_qiang_gnosticrite': '🙏',
    'gang_qiang_schism': '💔',
    'gang_qiang_minor': '🪨',

    // Jing Que (Precision Control)
    'jing_que_genesis': '🤌',
    'jing_que_keystone': '👌',
    'jing_que_manifestation': '🏗️',
    'jing_que_axiom': '✍️',
    'jing_que_capstone': '🏛️',
    'jing_que_gnosticrite': '🙏',
    'jing_que_schism': '🥀',
    'jing_que_minor': '🪨',

    // Generic Fallbacks
    'bridge': '🌉',
    'synthesis': '⚛️',
    'default': '⭐'
};

/**
 * Renders the talent tree on a canvas element
 */
export class TalentTreeRenderer {
  private config: RenderConfig;
  private animationTime = 0;
  private allNodes: TalentNode[] = []; 

  constructor(config: RenderConfig) {
    this.config = config;
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const { ctx } = this.config;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }

  render(talentTree: TalentTree, zoom: number, pan: Point, hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, highlightedNodes?: Map<string, { type: 'prereq_chain' | 'prereq_met' | 'blocker' }>, glowingNodeIds?: Set<string>): void {
    const { ctx, canvas } = this.config;
    
    this.allNodes = talentTree.nodes;
    this.animationTime = Date.now();
    
    // NEW: Logic to find the path to a hovered node
    const hoveredPath = this.getHoveredPath(hoveredNodeId, talentTree);
    
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    
    // RENDER ORDER CHANGE: Connections are now drawn FIRST, so they appear behind nodes.
    this.drawConnections(talentTree, hoveredPath);
    this.drawNodes(talentTree.nodes.filter(node => node.isVisible), hoveredNodeId, visualEffects, glowingNodeIds, hoveredPath);
    
    ctx.restore();
  }

  /**
   * NEW: Traces the prerequisites from a hovered node back to the allocated tree.
   */
  private getHoveredPath(hoveredNodeId: string | null, talentTree: TalentTree): Set<string> {
    const path = new Set<string>();
    if (!hoveredNodeId) return path;

    const nodesById = new Map(talentTree.nodes.map(n => [n.id, n]));
    let currentNode = nodesById.get(hoveredNodeId);

    // Trace backwards from the hovered node until we hit an allocated node or the start.
    while (currentNode && !currentNode.isAllocated) {
        path.add(currentNode.id);
        if (currentNode.prerequisites.length === 0) break;
        
        // Follow the first prerequisite (assuming linear paths for now)
        const prereqId = currentNode.prerequisites[0];
        const prereqNode = nodesById.get(prereqId);
        
        if (prereqNode && !path.has(prereqId)) {
            currentNode = prereqNode;
        } else {
            break; 
        }
    }
    // Also add the final node (either the hovered one or the last unallocated one in the chain)
    if(currentNode) path.add(currentNode.id);
    return path;
  }

  /**
   * OVERHAULED: Draws connections with a layered, POE-style aesthetic.
   */
  private drawConnections(talentTree: TalentTree, hoveredPath: Set<string>): void {
    const { ctx } = this.config;
    const treeCenter = { x: 800, y: 500 }; // A general center for curve direction

    talentTree.connections.forEach(connection => {
        const fromNode = this.allNodes.find(n => n.id === connection.from);
        const toNode = this.allNodes.find(n => n.id === connection.to);

        if (!fromNode || !toNode) return;
        if (fromNode.isPermanentlyLocked || toNode.isPermanentlyLocked) return;

        const fromPos = fromNode.position;
        const toPos = toNode.position;

        const isHovered = hoveredPath.has(fromNode.id) && hoveredPath.has(toNode.id);

        // --- Calculate Quadratic Curve Control Point ---
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const perpDx = -dy;
        const perpDy = dx;
        const perpLength = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
        const normPerpX = perpLength ? perpDx / perpLength : 0;
        const normPerpY = perpLength ? perpDy / perpLength : 0;
        
        const midToCenterDx = treeCenter.x - midX;
        const midToCenterDy = treeCenter.y - midY;
        const dotProduct = (midToCenterDx * normPerpX) + (midToCenterDy * normPerpY);
        const curveDirection = Math.sign(dotProduct) || 1;
        const curveStrength = 25; // Slightly more curve
        
        const controlX = midX - normPerpX * curveStrength * curveDirection;
        const controlY = midY - normPerpY * curveStrength * curveDirection;

        // --- Determine Style Based on State ---
        let baseStyle: string, highlightStyle: string, shadowColor: string;
        let baseWidth: number, highlightWidth: number, shadowBlur: number;

        if (connection.isActive) {
            // Allocated and active connection
            baseStyle = 'rgba(137, 180, 250, 0.4)'; // Soft blue base
            highlightStyle = '#cdd6f4'; // Bright white/off-white highlight
            shadowColor = '#89b4fa';
            baseWidth = 8;
            highlightWidth = 3;
            shadowBlur = isHovered ? 20 : 12;
        } else if (toNode.isAllocatable || isHovered) {
            // Unallocated but can be taken, or is being hovered over
            baseStyle = 'rgba(108, 112, 134, 0.4)'; // Grey base
            highlightStyle = '#a6adc8'; // Brighter grey highlight
            shadowColor = '#a6adc8';
            baseWidth = 6;
            highlightWidth = 2;
            shadowBlur = isHovered ? 12 : 6;
        } else {
            // Default inactive and unallocatable
            baseStyle = 'rgba(49, 50, 68, 0.5)'; // Very dark grey base
            highlightStyle = '#6c7086'; // Muted grey highlight
            shadowColor = '#313244';
            baseWidth = 4;
            highlightWidth = 1.5;
            shadowBlur = 0;
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.quadraticCurveTo(controlX, controlY, toPos.x, toPos.y);

        // Draw the main line with a shadow for glow effect
        ctx.lineCap = 'round';
        ctx.strokeStyle = baseStyle;
        ctx.lineWidth = baseWidth;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.stroke();

        // Draw the brighter highlight line on top
        ctx.strokeStyle = highlightStyle;
        ctx.lineWidth = highlightWidth;
        ctx.shadowBlur = 0; // No shadow for the highlight
        ctx.stroke();
        
        ctx.restore();
    });
  }
  
  private drawNodes(nodes: TalentNode[], hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, glowingNodeIds?: Set<string>, hoveredPath?: Set<string>): void {
    nodes.forEach(node => {
      this.drawNode(node, hoveredNodeId, visualEffects, glowingNodeIds, hoveredPath);
    });
  }

  private drawNode(node: TalentNode, hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, glowingNodeIds?: Set<string>, hoveredPath?: Set<string>): void {
    const isHovered = hoveredNodeId === node.id || (hoveredPath?.has(node.id) ?? false);
    
    // Determine node state
    let state: 'allocated' | 'unallocated' | 'allocatable' | 'locked' = 'unallocated';
    if(node.isPermanentlyLocked) state = 'locked';
    else if (node.isAllocated) state = 'allocated';
    else if (node.isAllocatable) state = 'allocatable';
    else if (node.isLocked) state = 'locked';

    this.drawNodeState(node, state, isHovered, visualEffects);
  }

  /**
   * NEW: Refactored node drawing into a state-based function for clarity and style.
   */
  private drawNodeState(node: TalentNode, state: 'allocated' | 'unallocated' | 'allocatable' | 'locked', isHovered: boolean, visualEffects?: Map<string, { type: string; progress: number }>): void {
    const { ctx } = this.config;
    const position = node.position;
    const size = this.getNodeSize(node);
    const halfSize = size / 2;
    
    // Use the path-specific emoji from the map, but prefer node.visual.icon if present
    const emoji = node.visual?.icon || EMOJI_MAP[`${node.path}_${node.type.toLowerCase()}`] || EMOJI_MAP[`${node.path}_minor`] || EMOJI_MAP.default;

    const emojiSize = size * (node.type === 'Minor' ? 0.7 : 0.6);

    ctx.save();
    
    // --- 1. Determine Style based on State ---
    let fillStyle: string, outlineStyle: string, iconOpacity: number, shadowColor: string, shadowBlur: number, outlineWidth: number;

    switch(state) {
        case 'allocated':
            fillStyle = '#1e1e2e'; // Dark blue-grey
            outlineStyle = '#f9e2af'; // Gold outline for allocated
            iconOpacity = 1.0;
            shadowColor = outlineStyle;
            shadowBlur = isHovered ? 25 : 15;
            outlineWidth = 3;
            break;
        case 'allocatable':
            const pulse = 0.7 + (Math.sin(this.animationTime * 0.005) * 0.3);
            fillStyle = 'rgba(166, 227, 161, 0.1)'; // Faint green fill
            outlineStyle = `rgba(166, 227, 161, ${pulse})`; // Pulsing green outline
            iconOpacity = 0.9;
            shadowColor = '#a6e3a1';
            shadowBlur = isHovered ? 30 : 20;
            outlineWidth = 3;
            break;
        case 'locked':
            fillStyle = '#181825';
            outlineStyle = '#45475a';
            iconOpacity = 0.2;
            shadowColor = 'black';
            shadowBlur = 0;
            outlineWidth = 2;
            break;
        case 'unallocated':
        default:
            fillStyle = '#181825'; // Dark, almost black fill
            outlineStyle = isHovered ? '#a6adc8' : '#6c7086'; // Grey, brighter on hover
            iconOpacity = isHovered ? 0.8 : 0.5;
            shadowColor = isHovered ? '#a6adc8' : 'black';
            shadowBlur = isHovered ? 15 : 0;
            outlineWidth = 2;
            break;
    }
    
    // --- 2. Draw Node Layers ---

    // Base Fill
    ctx.beginPath();
    ctx.arc(position.x, position.y, halfSize, 0, 2 * Math.PI);
    ctx.fillStyle = fillStyle;
    ctx.fill();

    // Outer Glow (via shadow) and Outline
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.strokeStyle = outlineStyle;
    ctx.lineWidth = outlineWidth;
    ctx.stroke();
    
    // Reset shadow for subsequent drawings
    ctx.shadowBlur = 0;

    // Major Node Decoration (Inner Ring for important nodes)
    const isMajorNode = ['Genesis', 'Capstone', 'Axiom', 'Schism', 'Manifestation'].includes(node.type);
    if (isMajorNode) {
        ctx.strokeStyle = state === 'allocated' ? 'rgba(249, 226, 175, 0.5)' : 'rgba(108, 112, 134, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(position.x, position.y, halfSize * 0.85, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    // --- 3. Draw Icon ---
    ctx.globalAlpha = iconOpacity;
    ctx.font = `${emojiSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#cdd6f4';
    ctx.fillText(emoji, position.x, position.y);
    
    // --- 4. Allocation Flash Animation ---
    const flashEffect = visualEffects?.get(node.id);
    if (flashEffect && flashEffect.type === 'allocate_flash') {
        const progress = flashEffect.progress;
        const easedProgress = 1 - Math.pow(progress, 3); // Ease-out-cubic
        
        ctx.globalAlpha = easedProgress;
        ctx.strokeStyle = `rgba(249, 226, 175, ${easedProgress})`; // Fading Gold
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(position.x, position.y, halfSize + (progress * 25), 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Gets the scaled size for a node based on its type.
   */
  private getNodeSize(node: TalentNode): number {
    switch (node.type) {
        case 'Genesis': return 80;
        case 'Capstone': return 70;
        case 'Schism': return 65;
        case 'Axiom': return 60;
        case 'Manifestation': return 50;
        case 'Keystone': return 40;
        case 'GnosticRite': return 35;
        case 'Minor': return 30;
        default: return 30;
    }
  }

  findNodeAtPosition(screenPos: Point, nodes: TalentNode[], zoom: number, pan: Point): TalentNode | null {
    const worldPos = {
      x: (screenPos.x - pan.x) / zoom,
      y: (screenPos.y - pan.y) / zoom
    };
    
    // Iterate backwards to prioritize smaller nodes on top in case of overlap
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (!node.isVisible) continue;
      
      const nodeRenderPos = node.position;
      // Increase clickable area slightly beyond the visual size
      const clickableRadius = this.getNodeSize(node) / 2 * 1.1; 
      
      const distance = Math.sqrt(
        Math.pow(worldPos.x - nodeRenderPos.x, 2) +
        Math.pow(worldPos.y - nodeRenderPos.y, 2)
      );
      
      if (distance <= clickableRadius) {
        return node;
      }
    }
    
    return null;
  }

  updateViewport(): void {
    this.config.viewport = {
      x: 0, y: 0,
      width: this.config.canvas.clientWidth,
      height: this.config.canvas.clientHeight
    };
  }
} 