/**
 * Talent Tree Renderer - POE Style Overhaul
 * Handles drawing the talent tree on canvas with a professional, layered aesthetic.
 */

import type { 
  TalentTree, 
  TalentNode, 
  Point, 
  RenderConfig,
  TalentConnection,
} from './types';
import { nodeStyler, NodeDrawState } from './rendering/nodeStyler';
import { connectionStyler } from './rendering/connectionStyler';
import { iconManager } from './rendering/iconManager';
import { getCurveControlPoint, drawArcConnection, drawStraightConnection, isLegalArc } from './rendering/canvasUtils';
import { getPulseFactor } from './rendering/animationUtils';

// A map to associate node icon types with emojis.
const EMOJI_MAP: Record<string, string> = {
    // Gentle Breeze
    'gentle_breeze_genesis': '🦋',
    'gentle_breeze_keystone': '🛡️',
    'gentle_breeze_manifestation': '💨',
    'gentle_breeze_axiom': '✨',
    'gentle_breeze_capstone': '🌟',
    'gentle_breeze_gnosticrite': '☯️',
    'gentle_breeze_schism': '💥',
    'gentle_breeze_minor': '🦋',

    // Sacred Breath
    'sacred_breath_genesis': '🦬',
    'sacred_breath_keystone': '⚜️',
    'sacred_breath_manifestation': '🕯️',
    'sacred_breath_axiom': '🕊️',
    'sacred_breath_capstone': '💙💫',
    'sacred_breath_gnosticrite': '☯️',
    'sacred_breath_schism': '💔',
    'sacred_breath_minor': '🦋',

    // Wild Gale
    'wild_gale_genesis': '🐉',
    'wild_gale_keystone': '💥',
    'wild_gale_manifestation': '⚡',
    'wild_gale_axiom': '⚔️',
    'wild_gale_capstone': '💀',
    'wild_gale_gnosticrite': '☯️',
    'wild_gale_schism': '🌪️',
    'wild_gale_minor': '💨',

    // Dancing Wind
    'dancing_wind_genesis': '🦋',
    'dancing_wind_keystone': '🏃',
    'dancing_wind_manifestation': '🛴',
    'dancing_wind_axiom': '🦅',
    'dancing_wind_capstone': '🦅',
    'dancing_wind_gnosticrite': '☯️',
    'dancing_wind_schism': '☁️',
    'dancing_wind_minor': '🦋',

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
    'default': '●'
};

/**
 * Renders the talent tree on a canvas element
 */
export class TalentTreeRenderer {
  private config: RenderConfig;
  private animationTime = 0;
  private allNodes: Map<string, TalentNode> = new Map();
  private viewportWidth = 0;
  private viewportHeight = 0;
  private dpr = 1;
  // This should match the center point used in the data file for the specific constellation.
  private CONSTELLATION_CENTER: Point = { x: 1500, y: 1500 };

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

  public updateViewport(width: number, height: number, dpr: number): void {
    this.viewportWidth = width;
    this.viewportHeight = height;
    this.dpr = dpr;
  }

  public findNodeAtPosition(worldPos: Point, nodes: TalentNode[]): TalentNode | null {
    for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (!node.isVisible) continue;
        
        const clickableRadius = nodeStyler.getSize(node) / 2 * 1.1; 
        const distance = Math.hypot(worldPos.x - node.position.x, worldPos.y - node.position.y);
        
        if (distance <= clickableRadius) {
            return node;
        }
    }
    return null;
  }

  public render(
    talentTree: TalentTree, 
    zoom: number, 
    pan: Point, 
    hoveredNodeId?: string | null, 
    visualEffects?: Map<string, { type: string; progress: number }>
  ): void {
    const { ctx } = this.config;
    
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
    ctx.restore();

    this.allNodes = new Map(talentTree.nodes.map(n => [n.id, n]));
    this.animationTime = Date.now();
    const hoveredPath = this.getHoveredPath(hoveredNodeId);
    
    ctx.save();
    ctx.translate(pan.x * this.dpr, pan.y * this.dpr);
    ctx.scale(zoom * this.dpr, zoom * this.dpr);
    
    this.drawConnections(talentTree, hoveredPath);
    this.drawNodes(talentTree.nodes, hoveredNodeId, visualEffects, hoveredPath);
    
    ctx.restore();
  }

  private drawConnections(talentTree: TalentTree, hoveredPath: Set<string>): void {
    const { ctx } = this.config;

    // Get all connections including dynamic ones for allocatable nodes
    const allConnections = this.getAllConnections(talentTree);

    for (const connection of allConnections) {
      const fromNode = this.allNodes.get(connection.from);
      const toNode = this.allNodes.get(connection.to);

      if (!fromNode || !toNode || fromNode.isPermanentlyLocked || toNode.isPermanentlyLocked) {
          continue;
      }
      
      const isHovered = hoveredPath.has(fromNode.id) && hoveredPath.has(toNode.id);
      const style = connectionStyler.getStyle(connection, toNode, isHovered);
      
      // Check if this is a legal ring connection using ringId and validation
      const isRingConnection = isLegalArc(fromNode, toNode);
      
      // Check if the target node is allocatable (available for selection)
      const isToNodeAllocatable = toNode.isAllocatable;
      
      if (isRingConnection) {
          // Draw arc for true ring connections (same ringId, legal angle difference)
          drawArcConnection(ctx, this.CONSTELLATION_CENTER, fromNode, toNode, style);
      } else if (isToNodeAllocatable) {
          // Draw straight line for connections to allocatable nodes
          drawStraightConnection(ctx, fromNode, toNode, style);
      } else {
          // Draw curved line for other connections (different rings or non-allocatable)
          const controlPoint = getCurveControlPoint(fromNode, toNode);
          
          ctx.save();
          
          // Base line
          ctx.beginPath();
          ctx.moveTo(fromNode.position.x, fromNode.position.y);
          ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, toNode.position.x, toNode.position.y);
          ctx.lineCap = 'round';
          ctx.strokeStyle = style.base;
          ctx.lineWidth = style.baseWidth;
          ctx.shadowColor = style.shadow;
          ctx.shadowBlur = style.shadowBlur;
          ctx.stroke();

          // Highlight line
          ctx.strokeStyle = style.highlight;
          ctx.lineWidth = style.highlightWidth;
          ctx.shadowBlur = 0;
          ctx.stroke();

          // Animated dashes for active or hovered connections
          if (style.dash) {
              ctx.setLineDash(style.dash.pattern);
              ctx.lineDashOffset = -(this.animationTime / style.dash.speed) % (style.dash.pattern[0] + style.dash.pattern[1]);
              ctx.strokeStyle = style.dash.color;
              ctx.lineWidth = style.dash.width;
              ctx.shadowColor = style.dash.shadow;
              ctx.shadowBlur = style.dash.shadowBlur;
              ctx.stroke();
          }
          ctx.restore();
      }
    }
  }

  private getAllConnections(talentTree: TalentTree): TalentConnection[] {
    const connections = [...talentTree.connections];
    
    // Add dynamic connections for allocatable nodes
    talentTree.nodes.forEach(node => {
      if (node.isAllocatable) {
        // Find all allocated nodes that could lead to this allocatable node
        talentTree.nodes.forEach(potentialFrom => {
          if (potentialFrom.isAllocated && node.prerequisites.includes(potentialFrom.id)) {
            // Check if this connection doesn't already exist
            const connectionExists = connections.some(conn => 
              conn.from === potentialFrom.id && conn.to === node.id
            );
            
            if (!connectionExists) {
              connections.push({ 
                from: potentialFrom.id, 
                to: node.id, 
                isActive: false, 
                isLocked: false 
              });
            }
          }
        });
      }
    });
    
    // Also preserve connections from allocated nodes to their immediate children
    // (even if the children are not yet allocatable, to show the progression path)
    talentTree.nodes.forEach(node => {
      if (node.isAllocated) {
        // Find all nodes that have this allocated node as a prerequisite
        talentTree.nodes.forEach(potentialTo => {
          if (potentialTo.prerequisites.includes(node.id)) {
            // Check if this connection doesn't already exist
            const connectionExists = connections.some(conn => 
              conn.from === node.id && conn.to === potentialTo.id
            );
            
            if (!connectionExists) {
              connections.push({ 
                from: node.id, 
                to: potentialTo.id, 
                isActive: false, 
                isLocked: false 
              });
            }
          }
        });
      }
    });
    
    return connections;
  }
  
  private drawNodes(nodes: TalentNode[], hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, hoveredPath?: Set<string>): void {
    // Draw minor nodes first, then major nodes on top
    nodes.filter(n => n.type === 'Minor').forEach(node => {
      if (!node.isVisible) return;
      this.drawNode(node, hoveredNodeId, visualEffects, hoveredPath);
    });
    nodes.filter(n => n.type !== 'Minor').forEach(node => {
      if (!node.isVisible) return;
      this.drawNode(node, hoveredNodeId, visualEffects, hoveredPath);
    });
  }

  private drawNode(node: TalentNode, hoveredNodeId?: string | null, visualEffects?: Map<string, { type: string; progress: number }>, hoveredPath?: Set<string>): void {
    const { ctx } = this.config;
    const isHovered = hoveredNodeId === node.id || (hoveredPath?.has(node.id) ?? false);

    let state: NodeDrawState = 'locked';
    if (node.isPermanentlyLocked) state = 'permanently_locked';
    else if (node.isAllocated) state = 'allocated';
    else if (node.isAllocatable) state = 'allocatable';
    
    const style = nodeStyler.getStyle(node, state, isHovered, this.animationTime);
    const position = node.position;

    ctx.save();
    
    // Draw Node Body
    ctx.beginPath();
    ctx.arc(position.x, position.y, style.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = style.fill;
    ctx.shadowColor = style.shadow;
    ctx.shadowBlur = style.shadowBlur;
    ctx.strokeStyle = style.outline;
    ctx.lineWidth = style.outlineWidth;
    ctx.fill();
    ctx.stroke();

    // Draw Inner Ring Decoration
    if (style.innerRingColor) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = style.innerRingColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(position.x, position.y, style.size * 0.425, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Draw Icon
    iconManager.drawIcon(ctx, node, style.iconOpacity, style.size);

    // Draw Allocation Flash Effect
    const flashEffect = visualEffects?.get(node.id);
    if (flashEffect && flashEffect.type === 'allocate_flash') {
        const progress = flashEffect.progress;
        const easedProgress = 1 - Math.pow(progress, 3);
        ctx.globalAlpha = easedProgress;
        ctx.strokeStyle = `rgba(249, 226, 175, ${easedProgress})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(position.x, position.y, style.size / 2 + (progress * 25), 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
  }

  private getHoveredPath(hoveredNodeId: string | null): Set<string> {
    const path = new Set<string>();
    if (!hoveredNodeId) return path;

    const traceBackwards = (nodeId: string) => {
        const node = this.allNodes.get(nodeId);
        if (!node || node.isAllocated || path.has(node.id)) return;
        path.add(node.id);
        node.prerequisites.forEach(traceBackwards);
    };
    traceBackwards(hoveredNodeId);
    return path;
  }
} 