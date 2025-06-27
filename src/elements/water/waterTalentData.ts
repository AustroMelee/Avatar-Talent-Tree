/**
 * Water Constellation Talent Data - The Depths Eternal
 * The eternal dance between creation and destruction, memory and forgetting
 */

import type { TalentNode, TalentConnection } from '../../types';
import { ENDLESS_MIRROR_NODES, ENDLESS_MIRROR_GENESIS, generateEndlessMirrorConnections, ENDLESS_MIRROR_METADATA } from './water_endlessMirrorPath';
import { CRIMSON_TIDE_NODES, CRIMSON_TIDE_GENESIS, generateCrimsonTideConnections, CRIMSON_TIDE_METADATA } from './water_crimsonTidePath';
import { ETERNAL_PRISON_NODES, ETERNAL_PRISON_GENESIS, generateEternalPrisonConnections, ETERNAL_PRISON_METADATA } from './water_eternalPrisonPath';
import { HUNGRY_DEEP_NODES, HUNGRY_DEEP_GENESIS, generateHungryDeepConnections, HUNGRY_DEEP_METADATA } from './water_hungryDeepPath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 * @param nodes - The array of nodes for a path.
 * @param connections - The array of connections for a path.
 * @param prefix - The string prefix to use (e.g., 'em' for Endless Mirror).
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

const { prefixedNodes: emNodes, prefixedConnections: emConnections } = prefixPathData(ENDLESS_MIRROR_NODES, generateEndlessMirrorConnections(), 'em');
const { prefixedNodes: ctNodes, prefixedConnections: ctConnections } = prefixPathData(CRIMSON_TIDE_NODES, generateCrimsonTideConnections(), 'ct');
const { prefixedNodes: epNodes, prefixedConnections: epConnections } = prefixPathData(ETERNAL_PRISON_NODES, generateEternalPrisonConnections(), 'ep');
const { prefixedNodes: hdNodes, prefixedConnections: hdConnections } = prefixPathData(HUNGRY_DEEP_NODES, generateHungryDeepConnections(), 'hd');

/**
 * All Water talent nodes from all integrated paths.
 */
export const WATER_TALENT_NODES: TalentNode[] = [
  ...emNodes,
  ...ctNodes,
  ...epNodes,
  ...hdNodes
];

/**
 * Water constellation metadata, including all available paths.
 */
export const WATER_CONSTELLATION = {
  name: 'The Depths Eternal',
  description: 'The constellation of the eternal dance between creation and destruction, memory and forgetting',
  background: 'water',
  paths: [ENDLESS_MIRROR_METADATA, CRIMSON_TIDE_METADATA, ETERNAL_PRISON_METADATA, HUNGRY_DEEP_METADATA]
};

/**
 * Root node for the Water constellation (using the first path's prefixed Genesis as a default).
 */
export const ROOT_NODE: TalentNode = emNodes.find(n => n.type === 'Genesis') || emNodes[0];

/**
 * Generate all connections for the Water constellation by combining prefixed connections.
 */
export function generateWaterConnections(): TalentConnection[] {
  return [
    ...emConnections,
    ...ctConnections,
    ...epConnections,
    ...hdConnections
  ];
} 