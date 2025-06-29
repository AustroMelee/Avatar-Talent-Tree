/**
 * Earth Constellation Talent Data - The Four Pillars of Stone
 * 
 * The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies.
 * Each pillar represents a different approach to mastering the earth element.
 */

import type { TalentNode, TalentConnection } from '../../types';
import { 
    PATIENT_MOUNTAIN_NODES as HUN_YUAN_NODES, 
    PATIENT_MOUNTAIN_GENESIS as HUN_YUAN_GENESIS, 
    generatePatientMountainConnections as generateHunYuanConnections, 
    PATIENT_MOUNTAIN_METADATA as HUN_YUAN_METADATA 
} from './earth_hunYuanPath';

import { 
    MOLTEN_CORE_NODES as BIAN_HUA_NODES, 
    MOLTEN_CORE_GENESIS as BIAN_HUA_GENESIS, 
    generateMoltenCoreConnections as generateBianHuaConnections, 
    MOLTEN_CORE_METADATA as BIAN_HUA_METADATA 
} from './earth_bianHuaPath';

import { 
    ETERNAL_MOUNTAIN_NODES as GANG_QIANG_NODES, 
    ETERNAL_MOUNTAIN_GENESIS as GANG_QIANG_GENESIS, 
    generateEternalMountainConnections as generateGangQiangConnections, 
    ETERNAL_MOUNTAIN_METADATA as GANG_QIANG_METADATA 
} from './earth_gangQiangPath';

import { 
    SCULPTORS_HAND_NODES as JING_QUE_NODES, 
    SCULPTORS_HAND_GENESIS as JING_QUE_GENESIS, 
    generateSculptorsHandConnections as generateJingQueConnections, 
    SCULPTORS_HAND_METADATA as JING_QUE_METADATA 
} from './earth_jingQuePath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 * @param nodes - The array of nodes for a path.
 * @param connections - The array of connections for a path.
 * @param prefix - The string prefix to use (e.g., 'hy' for Hun Yuan).
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

const { prefixedNodes: hyNodes, prefixedConnections: hyConnections } = prefixPathData(HUN_YUAN_NODES, generateHunYuanConnections(), 'hun_yuan');
const { prefixedNodes: bhNodes, prefixedConnections: bhConnections } = prefixPathData(BIAN_HUA_NODES, generateBianHuaConnections(), 'bian_hua');
const { prefixedNodes: gqNodes, prefixedConnections: gqConnections } = prefixPathData(GANG_QIANG_NODES, generateGangQiangConnections(), 'gang_qiang');
const { prefixedNodes: jqNodes, prefixedConnections: jqConnections } = prefixPathData(JING_QUE_NODES, generateJingQueConnections(), 'jing_que');

/**
 * All Earth talent nodes from all integrated paths.
 */
export const EARTH_TALENT_NODES: TalentNode[] = [
  ...hyNodes,
  ...bhNodes,
  ...gqNodes,
  ...jqNodes
];

/**
 * Earth constellation metadata, including all available paths.
 */
export const EARTH_CONSTELLATION = {
  name: 'The Four Pillars of Stone',
  description: 'The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies',
  background: 'earth',
  paths: [HUN_YUAN_METADATA, BIAN_HUA_METADATA, GANG_QIANG_METADATA, JING_QUE_METADATA]
};

/**
 * Root node for the Earth constellation (using the first path's prefixed Genesis as a default).
 */
export const ROOT_NODE: TalentNode = hyNodes.find(n => n.type === 'Genesis') || hyNodes[0];

/**
 * Generate all connections for the Earth constellation by combining prefixed connections.
 */
export function generateEarthConnections(): TalentConnection[] {
  return [
    ...hyConnections,
    ...bhConnections,
    ...gqConnections,
    ...jqConnections
  ];
} 