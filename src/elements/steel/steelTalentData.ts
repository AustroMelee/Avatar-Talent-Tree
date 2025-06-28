/**
 * Steel Constellation Talent Data - The Forged Steel
 * This file serves as the main entry point for the Steel Constellation talent tree,
 * integrating all defined paths like The Silent Blade, The Shield of the People, The Flow of Combat, and The Mind of War.
 */

import type { TalentNode, TalentConnection } from '../../types';
import { SILENT_BLADE_NODES, generateSilentBladeConnections, SILENT_BLADE_METADATA } from './steel_silentBladePath';
import { SHIELD_OF_PEOPLE_NODES, generateShieldOfPeopleConnections, SHIELD_OF_PEOPLE_METADATA } from './steel_shieldOfPeoplePath';
import { FLOW_OF_COMBAT_NODES, generateFlowOfCombatConnections, FLOW_OF_COMBAT_METADATA } from './steel_flowOfCombatPath';
import { MIND_OF_WAR_NODES, generateMindOfWarConnections, MIND_OF_WAR_METADATA } from './steel_mindOfWarPath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
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

// Apply the prefixing logic to each path
const { prefixedNodes: sbNodes, prefixedConnections: sbConnections } = prefixPathData(SILENT_BLADE_NODES, generateSilentBladeConnections(), 'sb');
const { prefixedNodes: spNodes, prefixedConnections: spConnections } = prefixPathData(SHIELD_OF_PEOPLE_NODES, generateShieldOfPeopleConnections(), 'sp');
const { prefixedNodes: fcNodes, prefixedConnections: fcConnections } = prefixPathData(FLOW_OF_COMBAT_NODES, generateFlowOfCombatConnections(), 'fc');
const { prefixedNodes: mwNodes, prefixedConnections: mwConnections } = prefixPathData(MIND_OF_WAR_NODES, generateMindOfWarConnections(), 'mw');

/**
 * All Steel talent nodes from all integrated paths.
 */
export const STEEL_TALENT_NODES: TalentNode[] = [
  ...sbNodes,
  ...spNodes,
  ...fcNodes,
  ...mwNodes
];

/**
 * Steel constellation metadata, including all available paths.
 */
export const STEEL_CONSTELLATION = {
  name: 'The Forged Steel',
  description: 'The triumph of mortal will over supernatural power, achieved through dedication, training, and ingenuity.',
  background: 'steel',
  paths: [SILENT_BLADE_METADATA, SHIELD_OF_PEOPLE_METADATA, FLOW_OF_COMBAT_METADATA, MIND_OF_WAR_METADATA]
};

/**
 * Root node for the Steel constellation (using the first path's prefixed Genesis as a default).
 */
export const STEEL_ROOT_NODE: TalentNode = sbNodes.find(n => n.type === 'Genesis') || sbNodes[0];

/**
 * Generate all connections for the Steel constellation by combining prefixed connections.
 */
export function generateSteelConnections(): TalentConnection[] {
  return [
    ...sbConnections,
    ...spConnections,
    ...fcConnections,
    ...mwConnections
  ];
} 