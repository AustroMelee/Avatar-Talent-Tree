/**
 * Grid Layout Helper
 * Converts existing node positions to a simple grid layout
 */

import type { TalentNode, TalentConnection } from './types/talent.types';

/**
 * Grid layout configuration
 */
type GridLayoutConfig = {
  columns: number;
  rows: number;
  centerX: number;
  centerY: number;
};

/**
 * Converts existing node positions to grid coordinates
 */
export class GridLayoutHelper {
  private config: GridLayoutConfig;

  constructor(config: GridLayoutConfig = {
    columns: 8,
    rows: 6,
    centerX: 4,
    centerY: 3
  }) {
    this.config = config;
  }

  /**
   * Convert nodes to grid positions
   */
  convertToGridLayout(nodes: TalentNode[]): TalentNode[] {
    return nodes.map(node => {
      const gridPosition = this.calculateGridPosition(node);
      return {
        ...node,
        position: gridPosition
      };
    });
  }

  /**
   * Calculate grid position for a node based on its type and path
   */
  private calculateGridPosition(node: TalentNode): { x: number; y: number } {
    // For Genesis nodes, place in center
    if (node.type === 'Genesis') {
      return { x: this.config.centerX, y: this.config.centerY };
    }

    // For other nodes, use a simple grid layout based on path and type
    const pathIndex = this.getPathIndex(node.path);
    const typeTier = this.getTypeTier(node.type);
    
    // Calculate position based on path direction and tier
    const angle = (pathIndex * Math.PI / 2) + (Math.PI / 4); // 45-degree offset
    const distance = typeTier;
    
    const x = this.config.centerX + Math.cos(angle) * distance;
    const y = this.config.centerY + Math.sin(angle) * distance;
    
    // Clamp to grid bounds
    return {
      x: Math.max(0, Math.min(this.config.columns - 1, Math.round(x))),
      y: Math.max(0, Math.min(this.config.rows - 1, Math.round(y)))
    };
  }

  /**
   * Get path index for positioning
   */
  private getPathIndex(path: string): number {
    const pathMap: Record<string, number> = {
      'gentle_breeze': 0,
      'sacred_breath': 1,
      'wild_gale': 2,
      'dancing_wind': 3
    };
    return pathMap[path] || 0;
  }

  /**
   * Get tier for node type
   */
  private getTypeTier(type: string): number {
    const tierMap: Record<string, number> = {
      'Genesis': 0,
      'Minor': 1,
      'Keystone': 2,
      'Manifestation': 3,
      'Axiom': 4,
      'Capstone': 5,
      'Synthesis': 2
    };
    return tierMap[type] || 1;
  }

  /**
   * Generate connections for grid layout
   */
  generateGridConnections(nodes: TalentNode[]): TalentConnection[] {
    const connections: TalentConnection[] = [];
    
    nodes.forEach(node => {
      // Connect to prerequisites
      node.prerequisites.forEach(prereqId => {
        const prereqNode = nodes.find(n => n.id === prereqId);
        if (prereqNode) {
          connections.push({
            from: prereqId,
            to: node.id,
            isActive: false,
            isLocked: false
          });
        }
      });
    });
    
    return connections;
  }

  /**
   * Create a simple grid layout for testing
   */
  createSimpleGridLayout(): { nodes: TalentNode[], connections: TalentConnection[] } {
    const nodes: TalentNode[] = [
      // Genesis node in center
      {
        id: 'genesis',
        name: 'Genesis',
        path: 'gentle_breeze',
        constellation: 'air',
        type: 'Genesis',
        description: 'Starting point',
        flavor: 'The beginning',
        prerequisites: [],
        pkCost: 1,
        position: { x: this.config.centerX, y: this.config.centerY },
        visual: { color: '#87CEEB', size: 1, icon: '🌟' },
        effects: [],
        isAllocated: false,
        isAllocatable: true,
        isLocked: false,
        isPermanentlyLocked: false,
        isVisible: true
      },
      
      // Minor nodes around center
      {
        id: 'minor_1',
        name: 'Minor Node 1',
        path: 'gentle_breeze',
        constellation: 'air',
        type: 'Minor',
        description: 'Minor ability',
        flavor: 'Small step',
        prerequisites: ['genesis'],
        pkCost: 1,
        position: { x: this.config.centerX - 1, y: this.config.centerY },
        visual: { color: '#87CEEB', size: 1, icon: '⚪' },
        effects: [],
        isAllocated: false,
        isAllocatable: false,
        isLocked: false,
        isPermanentlyLocked: false,
        isVisible: true
      },
      
      {
        id: 'minor_2',
        name: 'Minor Node 2',
        path: 'gentle_breeze',
        constellation: 'air',
        type: 'Minor',
        description: 'Minor ability',
        flavor: 'Small step',
        prerequisites: ['genesis'],
        pkCost: 1,
        position: { x: this.config.centerX + 1, y: this.config.centerY },
        visual: { color: '#87CEEB', size: 1, icon: '⚪' },
        effects: [],
        isAllocated: false,
        isAllocatable: false,
        isLocked: false,
        isPermanentlyLocked: false,
        isVisible: true
      },
      
      // Keystone node
      {
        id: 'keystone_1',
        name: 'Keystone',
        path: 'gentle_breeze',
        constellation: 'air',
        type: 'Keystone',
        description: 'Powerful ability',
        flavor: 'Major step',
        prerequisites: ['minor_1', 'minor_2'],
        pkCost: 2,
        position: { x: this.config.centerX, y: this.config.centerY - 2 },
        visual: { color: '#87CEEB', size: 1, icon: '💎' },
        effects: [],
        isAllocated: false,
        isAllocatable: false,
        isLocked: false,
        isPermanentlyLocked: false,
        isVisible: true
      }
    ];
    
    const connections = this.generateGridConnections(nodes);
    
    return { nodes, connections };
  }
} 