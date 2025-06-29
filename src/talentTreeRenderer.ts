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

    // Raging Inferno (Fire)
    'raging_inferno_genesis': '🔥',
    'raging_inferno_keystone': '💥',
    'raging_inferno_manifestation': '☄️',
    'raging_inferno_axiom': '☢️',
    'raging_inferno_capstone': '👑',
    'raging_inferno_gnosticrite': '🙏',
    'raging_inferno_schism': '☠️',
    'raging_inferno_minor': '🔥',

    // Inner Sun (Fire)
    'inner_sun_genesis': '☀️',
    'inner_sun_keystone': '🔥',
    'inner_sun_manifestation': '🕉️',
    'inner_sun_axiom': '✨',
    'inner_sun_capstone': '👑',
    'inner_sun_gnosticrite': '🙏',
    'inner_sun_schism': '☠️',
    'inner_sun_minor': '🔥',

    // Focused Flame (Fire)
    'focused_flame_genesis': '🔥',
    'focused_flame_keystone': '⚔️',
    'focused_flame_manifestation': '🛡️',
    'focused_flame_axiom': '💎',
    'focused_flame_capstone': '👑',
    'focused_flame_gnosticrite': '🙏',
    'focused_flame_schism': '☠️',
    'focused_flame_minor': '🔥',

    // Cold Tempest (Fire)
    'cold_tempest_genesis': '⚡',
    'cold_tempest_keystone': '🌩️',
    'cold_tempest_manifestation': '💫',
    'cold_tempest_axiom': '🌀',
    'cold_tempest_capstone': '👑',
    'cold_tempest_gnosticrite': '🙏',
    'cold_tempest_schism': '☠️',
    'cold_tempest_minor': '⚡',

    // Mastermind (Steel)
    'mastermind_genesis': '🧠',
    'mastermind_keystone': '⚙️',
    'mastermind_manifestation': '🤖',
    'mastermind_axiom': '🏗️',
    'mastermind_capstone': '👑',
    'mastermind_gnosticrite': '🙏',
    'mastermind_schism': '💔',
    'mastermind_minor': '🧠',

    // Innovator (Steel)
    'innovator_genesis': '⚙️',
    'innovator_keystone': '🔧',
    'innovator_manifestation': '🛠️',
    'innovator_axiom': '🤖',
    'innovator_capstone': '👑',
    'innovator_gnosticrite': '🙏',
    'innovator_schism': '💔',
    'innovator_minor': '⚙️',

    // Paragon (Steel)
    'paragon_genesis': '🏃',
    'paragon_keystone': '🤸',
    'paragon_manifestation': '🧘',
    'paragon_axiom': '⚡',
    'paragon_capstone': '👑',
    'paragon_gnosticrite': '🙏',
    'paragon_schism': '💔',
    'paragon_minor': '🏃',

    // Arsenal (Steel)
    'arsenal_genesis': '⚔️',
    'arsenal_keystone': '🏹',
    'arsenal_manifestation': '🗡️',
    'arsenal_axiom': '🎯',
    'arsenal_capstone': '👑',
    'arsenal_gnosticrite': '🙏',
    'arsenal_schism': '💔',
    'arsenal_minor': '⚔️',

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
  
  // NEW Properties
  private viewportWidth = 0;
  private viewportHeight = 0;
  private dpr = 1;

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

  // Utility: Check if a point is within the visible canvas (with margin buffer)
  private isOnScreen(x: number, y: number, margin: number = 120): boolean {
    return (
      x > -margin &&
      x < this.viewportWidth + margin &&
      y > -margin &&
      y < this.viewportHeight + margin
    );
  }

  render(talentTree: TalentTree, zoom: number, pan: Point, hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, highlightedNodes?: Map<string, { type: 'prereq_chain' | 'prereq_met' | 'blocker' }>, glowingNodeIds?: Set<string>): void {
    const { ctx, canvas } = this.config;
    
    // Clear the canvas with the raw dimensions
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform to clear correctly
    ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
    ctx.restore();

    this.allNodes = talentTree.nodes;
    this.animationTime = Date.now();
    const hoveredPath = this.getHoveredPath(hoveredNodeId, talentTree);
    
    ctx.save();

    // Apply pan and zoom transforms. These are now independent of DPI.
    // The pan values are in logical CSS pixels, so we multiply by DPR.
    ctx.translate(pan.x * this.dpr, pan.y * this.dpr);
    ctx.scale(zoom * this.dpr, zoom * this.dpr);
    
    // Culling logic needs to be updated to use the new viewport properties
    const margin = 120 * zoom; // Margin should scale with zoom
    
    const visibleNodeIds = new Set<string>();
    for (const node of talentTree.nodes) {
        // Transform node position to screen space for culling check
        const screenX = node.position.x * zoom * this.dpr + pan.x * this.dpr;
        const screenY = node.position.y * zoom * this.dpr + pan.y * this.dpr;
        if (this.isOnScreen(screenX, screenY, margin)) {
            visibleNodeIds.add(node.id);
        }
    }
    
    // Pass the raw zoom and pan to drawConnections, as it operates in world space
    this.drawConnections(talentTree, hoveredPath, visibleNodeIds, zoom, pan);

    this.drawNodes(talentTree.nodes.filter(node => visibleNodeIds.has(node.id) && node.isVisible), hoveredNodeId, visualEffects, glowingNodeIds, hoveredPath);
    
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

  // Patch drawConnections to support culling
  private drawConnections(talentTree: TalentTree, hoveredPath: Set<string>, visibleNodeIds?: Set<string>, zoom?: number, pan?: Point, margin?: number): void {
    const { ctx } = this.config;
    
    // --- NEW: Dynamically calculate tree center for connector curves ---
    let treeCenter: Point;
    const genesisNodes = talentTree.nodes.filter(n => n.type === 'Genesis');

    if (genesisNodes.length > 0) {
      const sumX = genesisNodes.reduce((sum, node) => sum + node.position.x, 0);
      const sumY = genesisNodes.reduce((sum, node) => sum + node.position.y, 0);
      treeCenter = {
        x: sumX / genesisNodes.length,
        y: sumY / genesisNodes.length,
      };
    } else if (talentTree.nodes.length > 0) {
      const minX = Math.min(...talentTree.nodes.map(n => n.position.x));
      const maxX = Math.max(...talentTree.nodes.map(n => n.position.x));
      const minY = Math.min(...talentTree.nodes.map(n => n.position.y));
      const maxY = Math.max(...talentTree.nodes.map(n => n.position.y));
      treeCenter = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
    } else {
      treeCenter = { x: 1200, y: 1200 }; // Fallback center
    }

    for (const connection of talentTree.connections) {
      const fromNode = this.allNodes.find(n => n.id === connection.from);
      const toNode = this.allNodes.find(n => n.id === connection.to);
      if (!fromNode || !toNode) continue;
      if (fromNode.isPermanentlyLocked || toNode.isPermanentlyLocked) continue;
      // Culling: Only draw if either endpoint is visible
      if (visibleNodeIds && zoom !== undefined && pan !== undefined && margin !== undefined) {
        const fromScreenX = fromNode.position.x * zoom + pan.x;
        const fromScreenY = fromNode.position.y * zoom + pan.y;
        const toScreenX = toNode.position.x * zoom + pan.x;
        const toScreenY = toNode.position.y * zoom + pan.y;
        if (!this.isOnScreen(fromScreenX, fromScreenY, margin) && !this.isOnScreen(toScreenX, toScreenY, margin)) {
          continue;
        }
      }
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
      const curveStrength = 25;
      const controlX = midX - normPerpX * curveStrength * curveDirection;
      const controlY = midY - normPerpY * curveStrength * curveDirection;
      let baseStyle: string, highlightStyle: string, shadowColor: string;
      let baseWidth: number, highlightWidth: number, shadowBlur: number;
      if (connection.isActive) {
        baseStyle = 'rgba(137, 180, 250, 0.4)';
        highlightStyle = '#cdd6f4';
        shadowColor = '#89b4fa';
        baseWidth = 8;
        highlightWidth = 3;
        shadowBlur = isHovered ? 20 : 12;
      } else if (toNode.isAllocatable || isHovered) {
        baseStyle = 'rgba(108, 112, 134, 0.4)';
        highlightStyle = '#a6adc8';
        shadowColor = '#a6adc8';
        baseWidth = 6;
        highlightWidth = 2;
        shadowBlur = isHovered ? 12 : 6;
      } else {
        baseStyle = 'rgba(49, 50, 68, 0.5)';
        highlightStyle = '#6c7086';
        shadowColor = '#313244';
        baseWidth = 4;
        highlightWidth = 1.5;
        shadowBlur = 0;
      }
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);
      ctx.quadraticCurveTo(controlX, controlY, toPos.x, toPos.y);
      ctx.lineCap = 'round';
      ctx.strokeStyle = baseStyle;
      ctx.lineWidth = baseWidth;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.stroke();
      ctx.strokeStyle = highlightStyle;
      ctx.lineWidth = highlightWidth;
      ctx.shadowBlur = 0;
      ctx.stroke();
      // --- Flowing Stream Effect for Active Connections ---
      if (connection.isActive) {
        // Animate a moving dashed highlight along the path
        const dashLength = 32;
        const gapLength = 24;
        const totalLength = dashLength + gapLength;
        const t = (this.animationTime / 40) % totalLength;
        ctx.save();
        ctx.setLineDash([dashLength, gapLength]);
        ctx.lineDashOffset = -t;
        ctx.strokeStyle = 'rgba(249, 226, 175, 0.85)'; // Gold highlight
        ctx.lineWidth = highlightWidth + 2;
        ctx.shadowColor = '#f9e2af';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.quadraticCurveTo(controlX, controlY, toPos.x, toPos.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // --- NEW: Flowing Prerequisite Path Effect ---
      // Check if this connection is part of the hovered prerequisite path
      // AND that it is not already an active connection (we don't want to over-draw)
      if (isHovered && !connection.isActive) {
        const dashLength = 20;
        const gapLength = 15;
        const totalLength = dashLength + gapLength;
        // Animate the flow forwards along the path
        const t = (this.animationTime / 30) % totalLength;

        ctx.save();
        ctx.setLineDash([dashLength, gapLength]);
        ctx.lineDashOffset = -t;

        // Use a vibrant purple for the prerequisite path
        const purpleColor = '#cba6f7'; // A nice purple from your theme
        ctx.strokeStyle = `rgba(203, 166, 247, 0.9)`; // The purple color with some transparency
        ctx.lineWidth = 4; // A bit thicker to stand out
        ctx.shadowColor = purpleColor;
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.quadraticCurveTo(controlX, controlY, toPos.x, toPos.y);
        ctx.stroke();
        
        ctx.setLineDash([]);
        ctx.restore();
      }
      // --- END OF NEW LOGIC ---

      ctx.restore();
    }
  }
  
  private drawNodes(nodes: TalentNode[], hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, glowingNodeIds?: Set<string>, hoveredPath?: Set<string>): void {
    nodes.forEach(node => {
      this.drawNode(node, hoveredNodeId, visualEffects, glowingNodeIds, hoveredPath);
    });
  }

  private drawNode(node: TalentNode, hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, glowingNodeIds?: Set<string>, hoveredPath?: Set<string>, selectedNodeId?: string | null): void {
    const isHovered = hoveredNodeId === node.id || (hoveredPath?.has(node.id) ?? false);
    const isSelected = selectedNodeId === node.id;
    // Determine node state
    let state: 'allocated' | 'unallocated' | 'allocatable' | 'locked' | 'unlocked' | 'selected' | 'unselectable' = 'unallocated';
    if (isSelected) state = 'selected';
    else if (node.isPermanentlyLocked || (!node.isAllocatable && node.isLocked)) state = 'unselectable';
    else if (node.isAllocated) state = 'allocated';
    else if (node.isAllocatable) state = 'unlocked';
    else if (node.isLocked) state = 'locked';
    this.drawNodeState(node, state, isHovered, visualEffects);
  }

  /**
   * NEW: Refactored node drawing into a state-based function for clarity and style.
   * Now supports SVG/PNG icon rendering if node.visual.icon is a file path.
   */
  private static _iconImageCache: Record<string, HTMLImageElement> = {};
  private drawNodeState(node: TalentNode, state: 'allocated' | 'unallocated' | 'allocatable' | 'locked' | 'unlocked' | 'selected' | 'unselectable', isHovered: boolean, visualEffects?: Map<string, { type: string; progress: number }>): void {
    const { ctx } = this.config;
    const position = node.position;
    
    // Use 'let' to allow modification for the animation
    let size = this.getNodeSize(node);
    let halfSize = size / 2;
    
    // Use the path-specific emoji from the map, but prefer node.visual.icon if present
    const icon = node.visual && node.visual.icon ? node.visual.icon : (EMOJI_MAP[`${node.path}_${node.type.toLowerCase()}`] || EMOJI_MAP[`${node.path}_minor`] || EMOJI_MAP.default);
    
    ctx.save();
    
    // --- 1. Determine Style based on State (with new animation logic) ---
    let fillStyle: string, outlineStyle: string, iconOpacity: number, shadowColor: string, shadowBlur: number, outlineWidth: number;
    
    switch(state) {
        case 'allocated':
        case 'selected': { // Combine allocated and selected since selected is a super-state
            // --- NEW BREATHING ANIMATION LOGIC ---
            // Create a smoothly oscillating value between 0 and 1 using a sine wave.
            const pulseFactor = (Math.sin(this.animationTime * 0.002) + 1) / 2; // Slow "breathing" speed

            // Determine base values based on selected or just allocated
            const baseGlow = state === 'selected' ? 35 : 15;
            const baseOutlineWidth = state === 'selected' ? 5 : 3.5;
            const pulseIntensity = state === 'selected' ? 1.5 : 1.0;

            // Animate the size
            const sizeIncrease = (pulseFactor * 4 * pulseIntensity);
            size += sizeIncrease;
            halfSize = size / 2;

            // Animate the shadow/glow
            shadowBlur = baseGlow + (pulseFactor * 10 * pulseIntensity);
            outlineWidth = baseOutlineWidth;
            // --- END OF NEW LOGIC ---

            fillStyle = '#1e1e2e'; // Dark blue-grey
            outlineStyle = state === 'selected' ? '#4ade80' : '#a6e3a1'; // Brighter green for selected, normal green for allocated
            iconOpacity = 1.0;
            shadowColor = outlineStyle;
            break;
        }
        
        case 'unselectable':
            fillStyle = '#181825';
            outlineStyle = '#e64553'; // Red for unselectable
            iconOpacity = 0.4;
            shadowColor = outlineStyle;
            shadowBlur = 10;
            outlineWidth = 3;
            break;
        case 'unlocked':
            // Unlocked but not allocated: yellow
            fillStyle = '#181825';
            outlineStyle = isHovered ? `rgba(249, 226, 175, ${0.7 + (Math.sin(this.animationTime * 0.01) * 0.3)})` : '#f9e2af';
            iconOpacity = isHovered ? 1.0 : 0.9;
            shadowColor = '#f9e2af';
            shadowBlur = isHovered ? 30 : 15;
            outlineWidth = 3;
            break;
        case 'allocatable':
            // fallback, treat as unlocked
            fillStyle = '#181825';
            outlineStyle = '#f9e2af';
            iconOpacity = 0.9;
            shadowColor = '#f9e2af';
            shadowBlur = 15;
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
            outlineStyle = isHovered ? `rgba(249, 226, 175, ${0.7 + (Math.sin(this.animationTime * 0.01) * 0.3)})` : '#6c7086'; // Pulsing yellow on hover
            iconOpacity = isHovered ? 0.8 : 0.5;
            shadowColor = isHovered ? '#f9e2af' : 'black';
            shadowBlur = isHovered ? 15 : 0;
            outlineWidth = 2;
            break;
    }
    
    // The emoji size needs to be calculated AFTER the main size might have been animated
    const emojiSize = size * (node.type === 'Minor' ? 0.7 : 0.6);
    
    // --- 2. Draw Node Layers ---
    ctx.beginPath();
    ctx.arc(position.x, position.y, halfSize, 0, 2 * Math.PI);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.strokeStyle = outlineStyle;
    ctx.lineWidth = outlineWidth;
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Major Node Decoration (Inner Ring for important nodes)
    const isMajorNode = ['Genesis', 'Capstone', 'Axiom', 'Schism', 'Manifestation'].includes(node.type);
    if (isMajorNode) {
        ctx.strokeStyle = state === 'allocated' || state === 'selected' ? 'rgba(249, 226, 175, 0.5)' : 'rgba(108, 112, 134, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(position.x, position.y, halfSize * 0.85, 0, 2 * Math.PI);
        ctx.stroke();
    }
    // --- 3. Draw Icon (SVG/PNG or Emoji) ---
    ctx.globalAlpha = iconOpacity;
    const isImage = typeof icon === 'string' && (icon.endsWith('.svg') || icon.endsWith('.png'));
    if (isImage) {
      let img = TalentTreeRenderer._iconImageCache[icon];
      if (!img) {
        img = new window.Image();
        img.src = icon;
        TalentTreeRenderer._iconImageCache[icon] = img;
      }
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(
          img,
          position.x - emojiSize / 2,
          position.y - emojiSize / 2,
          emojiSize,
          emojiSize
        );
      } else {
        // If image not loaded yet, fallback to emoji for now
        ctx.font = `${emojiSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#cdd6f4';
        ctx.fillText('⭐', position.x, position.y);
        img.onload = () => {
          // Redraw when loaded (assumes external render loop)
        };
      }
    } else {
      ctx.font = `${emojiSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#cdd6f4';
      ctx.fillText(icon, position.x, position.y);
    }
    // --- 4. Allocation Flash Animation ---
    const flashEffect = visualEffects?.get(node.id);
    if (flashEffect) {
        const progress = flashEffect.progress;
        const easedProgress = 1 - Math.pow(progress, 3); // Ease-out-cubic
        ctx.globalAlpha = easedProgress;

        if (flashEffect.type === 'allocate_flash') {
            ctx.strokeStyle = `rgba(249, 226, 175, ${easedProgress})`; // Fading Gold
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(position.x, position.y, halfSize + (progress * 25), 0, Math.PI * 2);
            ctx.stroke();
        } 
        else if (flashEffect.type === 'deallocate_denied_flash') {
            // Use the red "schism" color for the denied flash
            ctx.strokeStyle = `rgba(230, 69, 83, ${easedProgress})`; // Fading Red
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(position.x, position.y, halfSize + (progress * 25), 0, Math.PI * 2);
            ctx.stroke();
        }
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

  findNodeAtPosition(worldPos: Point, nodes: TalentNode[]): TalentNode | null {
    // No need to convert from screen to world space here anymore.
    // worldPos is already in the correct coordinate system.
    
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

  // NEW Method: updateViewport
  public updateViewport(width: number, height: number, dpr: number): void {
    this.viewportWidth = width;
    this.viewportHeight = height;
    this.dpr = dpr;
  }
} 