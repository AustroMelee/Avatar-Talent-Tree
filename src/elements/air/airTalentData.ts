/**
 * Air Constellation Talent Data - Full Implementation
 * This file serves as the main entry point for the Air Constellation talent tree,
 * integrating all defined paths like The Gentle Breeze, The Sacred Breath, The Wild Gale, and The Dancing Wind.
 */

import type { TalentNode, TalentConnection } from '../../types';
import { GENTLE_BREEZE_NODES, GENTLE_BREEZE_GENESIS, generateGentleBreezeConnections, GENTLE_BREEZE_METADATA } from './air_gentleBreezePath';
import { SACRED_BREATH_NODES, SACRED_BREATH_GENESIS, generateSacredBreathConnections, SACRED_BREATH_METADATA } from './air_sacredBreathPath';
import { WILD_GALE_NODES, WILD_GALE_GENESIS, generateWildGaleConnections, WILD_GALE_METADATA } from './air_wildGalePath';
import { DANCING_WIND_NODES, DANCING_WIND_GENESIS, generateDancingWindConnections, DANCING_WIND_METADATA } from './air_dancingWindPath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 * @param nodes - The array of nodes for a path.
 * @param connections - The array of connections for a path.
 * @param prefix - The string prefix to use (e.g., 'gb' for Gentle Breeze).
 * @returns An object containing the prefixed nodes and connections.
 */
const prefixPathData = (nodes: TalentNode[], connections: TalentConnection[], prefix: string) => {
    // Create a map from old ID to new, prefixed ID.
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));

    // Create new node array with updated IDs and prerequisite IDs.
    const prefixedNodes = nodes.map(node => {
        // Ensure prerequisite IDs exist in the map before transforming.
        const newPrerequisites = node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined);

        return {
            ...node,
            id: idMap.get(node.id)!,
            prerequisites: newPrerequisites
        };
    });

    // Create new connections array with updated from/to IDs.
    const prefixedConnections = connections.map(conn => ({
        ...conn,
        from: idMap.get(conn.from)!,
        to: idMap.get(conn.to)!
    }));

    return { prefixedNodes, prefixedConnections };
};

// Apply the prefixing logic to each path
const { prefixedNodes: gbNodes, prefixedConnections: gbConnections } = prefixPathData(GENTLE_BREEZE_NODES, generateGentleBreezeConnections(), 'gb');
const { prefixedNodes: sbNodes, prefixedConnections: sbConnections } = prefixPathData(SACRED_BREATH_NODES, generateSacredBreathConnections(), 'sb');
const { prefixedNodes: wgNodes, prefixedConnections: wgConnections } = prefixPathData(WILD_GALE_NODES, generateWildGaleConnections(), 'wg');
const { prefixedNodes: dwNodes, prefixedConnections: dwConnections } = prefixPathData(DANCING_WIND_NODES, generateDancingWindConnections(), 'dw');

/**
 * All Air talent nodes from all integrated paths.
 */
export const AIR_TALENT_NODES: TalentNode[] = [
  ...gbNodes,
  ...sbNodes,
  ...wgNodes,
  ...dwNodes
];

/**
 * Air constellation metadata, including all available paths.
 */
export const AIR_CONSTELLATION = {
  name: 'The Four Winds',
  description: 'The constellation of balance, freedom, adaptation, and transcendence',
  background: 'air',
  paths: [GENTLE_BREEZE_METADATA, SACRED_BREATH_METADATA, WILD_GALE_METADATA, DANCING_WIND_METADATA]
};

/**
 * Root node for the Air constellation (using the first path's prefixed Genesis as a default).
 */
export const ROOT_NODE: TalentNode = gbNodes.find(n => n.type === 'Genesis') || gbNodes[0];

/**
 * Generate all connections for the Air constellation by combining prefixed connections.
 */
export function generateAirConnections(): TalentConnection[] {
  return [
    ...gbConnections,
    ...sbConnections,
    ...wgConnections,
    ...dwConnections
    // Add other path connections here when implemented
  ];
}