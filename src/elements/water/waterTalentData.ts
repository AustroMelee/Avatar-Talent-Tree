/**
 * Water Constellation Talent Data - The Depths Eternal
 * The eternal dance between creation and destruction, memory and forgetting
 */

import type { TalentNode, TalentConnection } from '../../types';
import { 
    FLOWING_FORM_NODES as ENDLESS_MIRROR_NODES, 
    FLOWING_FORM_GENESIS as ENDLESS_MIRROR_GENESIS, 
    generateFlowingFormConnections as generateEndlessMirrorConnections, 
    FLOWING_FORM_METADATA as ENDLESS_MIRROR_METADATA 
} from './water_endlessMirrorPath';

import { 
    SPRING_OF_LIFE_NODES as CRIMSON_TIDE_NODES, 
    SPRING_OF_LIFE_GENESIS as CRIMSON_TIDE_GENESIS, 
    generateSpringOfLifeConnections as generateCrimsonTideConnections, 
    SPRING_OF_LIFE_METADATA as CRIMSON_TIDE_METADATA 
} from './water_crimsonTidePath';

import { 
    PATIENT_GLACIER_NODES as ETERNAL_PRISON_NODES, 
    PATIENT_GLACIER_GENESIS as ETERNAL_PRISON_GENESIS, 
    generatePatientGlacierConnections as generateEternalPrisonConnections, 
    PATIENT_GLACIER_METADATA as ETERNAL_PRISON_METADATA 
} from './water_eternalPrisonPath';

import { 
    CRUSHING_ABYSS_NODES as HUNGRY_DEEP_NODES, 
    CRUSHING_ABYSS_GENESIS as HUNGRY_DEEP_GENESIS, 
    generateCrushingAbyssConnections as generateHungryDeepConnections, 
    CRUSHING_ABYSS_METADATA as HUNGRY_DEEP_METADATA 
} from './water_crushingAbyssPath';

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