/**
 * Fire Constellation Talent Data - The Eternal Flame
 * Complete data for Fire constellation with all 4 paths
 */

import type { TalentNode, TalentConnection } from '../../types';
import { 
    RAGING_INFERNO_NODES, 
    RAGING_INFERNO_GENESIS, 
    generateRagingInfernoConnections, 
    RAGING_INFERNO_METADATA 
} from './fire_forgeOfWrathPath';

import { 
    INNER_SUN_NODES, 
    INNER_SUN_GENESIS, 
    generateInnerSunConnections, 
    INNER_SUN_METADATA 
} from './fire_sacredHearthPath';

import { 
    FOCUSED_FLAME_NODES, 
    FOCUSED_FLAME_GENESIS, 
    generateFocusedFlameConnections, 
    FOCUSED_FLAME_METADATA 
} from './fire_mastersFlamePath';

import { 
    COLD_TEMPEST_NODES, 
    COLD_TEMPEST_GENESIS, 
    generateColdTempestConnections, 
    COLD_TEMPEST_METADATA 
} from './fire_lightningsEdgePath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 * @param nodes - The array of nodes for a path.
 * @param connections - The array of connections for a path.
 * @param prefix - The string prefix to use (e.g., 'ri' for Raging Inferno).
 * @returns An object containing the prefixed nodes and connections.
 */
const prefixPathData = (nodes: TalentNode[], connections: TalentConnection[], prefix: string) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));
    const prefixedNodes = nodes.map(node => {
        const newPrerequisites = node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined);
        return {
            ...node,
            id: idMap.get(node.id)!,
            prerequisites: newPrerequisites
        };
    });
    const prefixedConnections = connections.map(conn => ({
        ...conn,
        from: idMap.get(conn.from)!,
        to: idMap.get(conn.to)!
    }));
    return { prefixedNodes, prefixedConnections };
};

const { prefixedNodes: riNodes, prefixedConnections: riConnections } = prefixPathData(RAGING_INFERNO_NODES, generateRagingInfernoConnections(), 'ri');
const { prefixedNodes: isNodes, prefixedConnections: isConnections } = prefixPathData(INNER_SUN_NODES, generateInnerSunConnections(), 'is');
const { prefixedNodes: ffNodes, prefixedConnections: ffConnections } = prefixPathData(FOCUSED_FLAME_NODES, generateFocusedFlameConnections(), 'ff');
const { prefixedNodes: ctNodes, prefixedConnections: ctConnections } = prefixPathData(COLD_TEMPEST_NODES, generateColdTempestConnections(), 'ct');

/**
 * Generate all Fire talent nodes from all paths
 */
export function generateAllFireNodes(): TalentNode[] {
  return [
    ...riNodes,
    ...isNodes,
    ...ffNodes,
    ...ctNodes
  ];
}

/**
 * Generate all Fire constellation connections
 */
export function generateFireConnections(): TalentConnection[] {
  return [
    ...riConnections,
    ...isConnections,
    ...ffConnections,
    ...ctConnections
  ];
}

/**
 * Fire constellation metadata
 */
export const FIRE_CONSTELLATION = {
  id: 'fire',
  name: 'The Eternal Flame',
  description: 'The eternal dance between creation and destruction, passion and discipline, life and death through four fundamental philosophies.',
  color: '#f38ba8',
  emoji: '🔥',
  paths: [
    {
      id: 'raging_inferno',
      name: 'The Raging Inferno',
      description: 'Destruction Incarnate - "Fire is the element of power. It is fueled by rage, hatred, and anger."',
      flavor: 'Uncontrolled aggression, explosive force, overwhelming AoE attacks, and jet propulsion',
      emoji: '🐉',
      metadata: RAGING_INFERNO_METADATA
    },
    {
      id: 'inner_sun',
      name: 'The Inner Sun',
      description: 'Life\'s First Spark - "Fire is not just destruction; it is the energy of life itself. Draw warmth from the sun, and power from your own inner spirit."',
      flavor: 'Stamina, energy redirection, empowering oneself, and resisting the cold',
      emoji: '☀️',
      metadata: INNER_SUN_METADATA
    },
    {
      id: 'focused_flame',
      name: 'The Focused Flame',
      description: 'Discipline Made Manifest - "A wildfire destroys, but a focused flame forges. Control your fire, and you can shape the world."',
      flavor: 'Precise attacks, sustained streams, heat control, and defensive maneuvers',
      emoji: '🔥',
      metadata: FOCUSED_FLAME_METADATA
    },
    {
      id: 'cold_tempest',
      name: 'The Cold Tempest',
      description: 'The Void Between Thoughts - "To create lightning, you must first let go. Separate yin and yang. Let go of emotion. Only a mind at peace can command the storm."',
      flavor: 'The generation and mastery of lightning as the ultimate firebending technique',
      emoji: '⚡',
      metadata: COLD_TEMPEST_METADATA
    }
  ]
};

/**
 * Root nodes for each Fire path (using the prefixed Genesis nodes)
 */
export const FIRE_ROOT_NODES: TalentNode[] = [
  riNodes.find(n => n.type === 'Genesis')!,
  isNodes.find(n => n.type === 'Genesis')!,
  ffNodes.find(n => n.type === 'Genesis')!,
  ctNodes.find(n => n.type === 'Genesis')!
];

// Export all nodes and connections for easy access
export const FIRE_TALENT_NODES = generateAllFireNodes();
export const FIRE_CONSTELLATION_METADATA = FIRE_CONSTELLATION; 