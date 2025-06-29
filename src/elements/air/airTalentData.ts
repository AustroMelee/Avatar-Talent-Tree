/**
 * Air Constellation Talent Data - Full Implementation
 * This file serves as the main entry point for the Air Constellation talent tree,
 * integrating all defined paths and centrally managing their layout in a quadrant system.
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { GENTLE_BREEZE_NODES, generateGentleBreezeConnections, GENTLE_BREEZE_METADATA } from './air_gentleBreezePath';
import { SACRED_BREATH_NODES, generateSacredBreathConnections, SACRED_BREATH_METADATA } from './air_sacredBreathPath';
import { WILD_GALE_NODES, generateWildGaleConnections, WILD_GALE_METADATA } from './air_wildGalePath';
import { DANCING_WIND_NODES, generateDancingWindConnections, DANCING_WIND_METADATA } from './air_dancingWindPath';

// --- Central Layout Configuration ---
const CONSTELLATION_CENTER: Point = { x: 1200, y: 1200 };
const QUADRANT_RADIUS = 850; // Increased radius for more space

/**
 * Processes a path's nodes and connections to place them in a specific quadrant.
 * It rotates the path to face outwards and translates it to its quadrant center.
 */
const processPathData = (
    nodes: TalentNode[], 
    connections: TalentConnection[], 
    prefix: string, 
    quadrantCenter: Point, 
    rotationAngle: number
) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));

    const processedNodes = nodes.map(node => {
        const { x, y } = node.position;

        // 1. Rotate the node's position around (0,0)
        const cos = Math.cos(rotationAngle);
        const sin = Math.sin(rotationAngle);
        const rotatedX = x * cos - y * sin;
        const rotatedY = x * sin + y * cos;

        // 2. Translate the rotated position to the quadrant center
        const finalX = rotatedX + quadrantCenter.x;
        const finalY = rotatedY + quadrantCenter.y;

        const newPrerequisites = node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined);

        return {
            ...node,
            id: idMap.get(node.id)!,
            position: { x: Math.round(finalX), y: Math.round(finalY) },
            prerequisites: newPrerequisites
        };
    });

    const processedConnections = connections.map(conn => ({
        ...conn,
        from: idMap.get(conn.from)!,
        to: idMap.get(conn.to)!
    }));

    return { processedNodes, processedConnections };
};

// --- Define Quadrant Centers and Process Each Path ---

// Top Quadrant: Gentle Breeze
const gbCenter: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - QUADRANT_RADIUS };
const { processedNodes: gbNodes, processedConnections: gbConnections } = processPathData(GENTLE_BREEZE_NODES, generateGentleBreezeConnections(), 'gb', gbCenter, 0);

// Right Quadrant: Sacred Breath
const sbCenter: Point = { x: CONSTELLATION_CENTER.x + QUADRANT_RADIUS, y: CONSTELLATION_CENTER.y };
const { processedNodes: sbNodes, processedConnections: sbConnections } = processPathData(SACRED_BREATH_NODES, generateSacredBreathConnections(), 'sb', sbCenter, Math.PI / 2);

// Bottom Quadrant: Dancing Wind
const dwCenter: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + QUADRANT_RADIUS };
const { processedNodes: dwNodes, processedConnections: dwConnections } = processPathData(DANCING_WIND_NODES, generateDancingWindConnections(), 'dw', dwCenter, Math.PI);

// Left Quadrant: Wild Gale
const wgCenter: Point = { x: CONSTELLATION_CENTER.x - QUADRANT_RADIUS, y: CONSTELLATION_CENTER.y };
const { processedNodes: wgNodes, processedConnections: wgConnections } = processPathData(WILD_GALE_NODES, generateWildGaleConnections(), 'wg', wgCenter, -Math.PI / 2);


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
  const allConnections: TalentConnection[] = [
    ...gbConnections,
    ...sbConnections,
    ...wgConnections,
    ...dwConnections
  ];

  // --- Define connections between the four paths to form the central web ---
  const interPathConnections: TalentConnection[] = [
    // Gentle Breeze (Top) to its neighbors
    { from: 'gb_air_shield', to: 'wg_air_blast', isActive: false, isLocked: false },
    { from: 'gb_air_cushion', to: 'sb_hypersensitivity', isActive: false, isLocked: false },

    // Sacred Breath (Right) to its neighbors
    { from: 'sb_sound_amplification', to: 'dw_air_spout', isActive: false, isLocked: false },
    
    // Dancing Wind (Bottom) to its neighbors
    { from: 'dw_enhanced_speed', to: 'wg_air_blades', isActive: false, isLocked: false },

    // Add some cross-connections for a more web-like structure
    { from: 'wg_air_blast', to: 'sb_hypersensitivity', isActive: false, isLocked: false },
    { from: 'wg_sound_bending', to: 'dw_flight', isActive: false, isLocked: false },
    { from: 'sb_spiritual_projection', to: 'gb_enhanced_agility', isActive: false, isLocked: false },
  ];

  allConnections.push(...interPathConnections);

  return allConnections;
}