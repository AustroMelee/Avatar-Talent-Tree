/**
 * Fire Constellation Talent Data - The Eternal Flame
 * Complete data for Fire constellation with all 4 paths
 */

import type { TalentNode, TalentConnection } from '../../types';
import { FORGE_OF_WRATH_NODES, FORGE_OF_WRATH_GENESIS, generateForgeOfWrathConnections, FORGE_OF_WRATH_METADATA } from './fire_forgeOfWrathPath';
import { SACRED_HEARTH_NODES, SACRED_HEARTH_GENESIS, generateSacredHearthConnections, SACRED_HEARTH_METADATA } from './fire_sacredHearthPath';
import { MASTERS_FLAME_NODES, MASTERS_FLAME_GENESIS, generateMastersFlameConnections, MASTERS_FLAME_METADATA } from './fire_mastersFlamePath';
import { LIGHTNINGS_EDGE_NODES, LIGHTNINGS_EDGE_GENESIS, generateLightningsEdgeConnections, LIGHTNINGS_EDGE_METADATA } from './fire_lightningsEdgePath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 * @param nodes - The array of nodes for a path.
 * @param connections - The array of connections for a path.
 * @param prefix - The string prefix to use (e.g., 'fw' for Forge of Wrath).
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

const { prefixedNodes: fwNodes, prefixedConnections: fwConnections } = prefixPathData(FORGE_OF_WRATH_NODES, generateForgeOfWrathConnections(), 'fw');
const { prefixedNodes: shNodes, prefixedConnections: shConnections } = prefixPathData(SACRED_HEARTH_NODES, generateSacredHearthConnections(), 'sh');
const { prefixedNodes: mfNodes, prefixedConnections: mfConnections } = prefixPathData(MASTERS_FLAME_NODES, generateMastersFlameConnections(), 'mf');
const { prefixedNodes: leNodes, prefixedConnections: leConnections } = prefixPathData(LIGHTNINGS_EDGE_NODES, generateLightningsEdgeConnections(), 'le');

/**
 * Generate all Fire talent nodes from all paths
 */
export function generateAllFireNodes(): TalentNode[] {
  return [
    ...fwNodes,
    ...shNodes,
    ...mfNodes,
    ...leNodes
  ];
}

/**
 * Generate all Fire constellation connections
 */
export function generateFireConnections(): TalentConnection[] {
  return [
    ...fwConnections,
    ...shConnections,
    ...mfConnections,
    ...leConnections
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
      id: 'forge_of_wrath',
      name: 'The Forge of Wrath',
      description: 'Destruction Incarnate - "Fire is the Great Destroyer, the end of all things. To embrace fire is to accept that everything must burn - including yourself."',
      flavor: 'Unbridled destruction, consuming rage, the cleansing fire that reduces all to ash',
      emoji: '🐉',
      metadata: FORGE_OF_WRATH_METADATA
    },
    {
      id: 'sacred_hearth',
      name: 'The Sacred Hearth',
      description: 'Life\'s First Spark - "Fire is the breath of life itself, the warmth that nurtures growth. True fire gives life, it does not take it."',
      flavor: 'Healing flames, spiritual fire, the life-giving warmth of the sun',
      emoji: '🔥',
      metadata: SACRED_HEARTH_METADATA
    },
    {
      id: 'masters_flame',
      name: 'The Master\'s Flame',
      description: 'Discipline Made Manifest - "Fire without control is mere destruction. The master shapes flame as the smith shapes metal - with precision, patience, and purpose."',
      flavor: 'Perfect technique, shaped fire, defensive mastery',
      emoji: '🛠️',
      metadata: MASTERS_FLAME_METADATA
    },
    {
      id: 'lightnings_edge',
      name: 'The Lightning\'s Edge',
      description: 'The Void Between Thoughts - "True power comes from the space between heartbeats... Lightning is not fire - it is the absence of fire, the cold flame of pure will."',
      flavor: 'Lightning generation, mental discipline, cold fire techniques',
      emoji: '🦅',
      metadata: LIGHTNINGS_EDGE_METADATA
    }
  ]
};

/**
 * Root nodes for each Fire path (using the prefixed Genesis nodes)
 */
export const FIRE_ROOT_NODES: TalentNode[] = [
  fwNodes.find(n => n.type === 'Genesis')!,
  shNodes.find(n => n.type === 'Genesis')!,
  mfNodes.find(n => n.type === 'Genesis')!,
  leNodes.find(n => n.type === 'Genesis')!
];

// Export all nodes and connections for easy access
export const FIRE_TALENT_NODES = generateAllFireNodes();
export const FIRE_CONSTELLATION_METADATA = FIRE_CONSTELLATION; 