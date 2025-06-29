/**
 * Steel Constellation Talent Data - The Forged Steel
 * This file serves as the main entry point for the Steel Constellation talent tree,
 * integrating all defined paths like The Silent Blade, The Shield of the People, The Flow of Combat, and The Mind of War.
 */

import type { TalentNode, TalentConnection } from '../../types';
import { ARSENAL_NODES, generateArsenalConnections, ARSENAL_METADATA } from './steel_arsenalPath';
import { PARAGON_NODES, generateParagonConnections, PARAGON_METADATA } from './steel_paragonPath';
import { INNOVATOR_NODES, generateInnovatorConnections, INNOVATOR_METADATA } from './steel_innovatorPath';
import { MASTERMIND_NODES, generateMastermindConnections, MASTERMIND_METADATA } from './steel_mastermindPath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 */
const prefixPathData = (nodes: TalentNode[], connections: TalentConnection[], prefix: string) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));
    
    const prefixedNodes = nodes.map(node => {
        // Handle exclusiveWith arrays, if they exist
        const newExclusiveWith = (node.exclusiveWith || [])
            .map(eId => idMap.get(eId))
            .filter((eId): eId is string => eId !== undefined);

        const newPrerequisites = node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined);
        
        return {
            ...node,
            id: idMap.get(node.id)!,
            prerequisites: newPrerequisites,
            exclusiveWith: newExclusiveWith
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
const { prefixedNodes: arsenalNodes, prefixedConnections: arsenalConnections } = prefixPathData(ARSENAL_NODES, generateArsenalConnections(), 'arsenal');
const { prefixedNodes: paragonNodes, prefixedConnections: paragonConnections } = prefixPathData(PARAGON_NODES, generateParagonConnections(), 'paragon');
const { prefixedNodes: innovatorNodes, prefixedConnections: innovatorConnections } = prefixPathData(INNOVATOR_NODES, generateInnovatorConnections(), 'innovator');
const { prefixedNodes: mastermindNodes, prefixedConnections: mastermindConnections } = prefixPathData(MASTERMIND_NODES, generateMastermindConnections(), 'mastermind');

/**
 * All Steel talent nodes from all integrated paths.
 */
export const STEEL_TALENT_NODES: TalentNode[] = [
  ...arsenalNodes,
  ...paragonNodes,
  ...innovatorNodes,
  ...mastermindNodes
];

/**
 * Steel constellation metadata, including all available paths.
 */
export const STEEL_CONSTELLATION = {
  name: 'The Human Spirit',
  description: 'Ingenuity, discipline, strategy, and innovation—peak human potential as a match for any element.',
  background: 'steel',
  paths: [ARSENAL_METADATA, PARAGON_METADATA, INNOVATOR_METADATA, MASTERMIND_METADATA]
};

/**
 * Root node for the Steel constellation (using the first path's prefixed Genesis as a default).
 */
export const STEEL_ROOT_NODE: TalentNode = arsenalNodes.find(n => n.type === 'Genesis') || arsenalNodes[0];

/**
 * Generate all connections for the Steel constellation by combining prefixed connections.
 */
export function generateSteelConnections(): TalentConnection[] {
  return [
    ...arsenalConnections,
    ...paragonConnections,
    ...innovatorConnections,
    ...mastermindConnections
  ];
} 