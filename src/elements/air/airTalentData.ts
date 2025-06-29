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
const QUADRANT_RADIUS = 800; // Increased radius for more space

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
        const cos = Math.cos(rotationAngle), sin = Math.sin(rotationAngle);
        const rotatedX = x * cos - y * sin;
        const rotatedY = x * sin + y * cos;
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
const gbCenter: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - QUADRANT_RADIUS };
const { processedNodes: gbNodes, processedConnections: gbConnections } = processPathData(GENTLE_BREEZE_NODES, generateGentleBreezeConnections(), 'gb', gbCenter, 0);

const sbCenter: Point = { x: CONSTELLATION_CENTER.x + QUADRANT_RADIUS, y: CONSTELLATION_CENTER.y };
const { processedNodes: sbNodes, processedConnections: sbConnections } = processPathData(SACRED_BREATH_NODES, generateSacredBreathConnections(), 'sb', sbCenter, Math.PI / 2);

const dwCenter: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + QUADRANT_RADIUS };
const { processedNodes: dwNodes, processedConnections: dwConnections } = processPathData(DANCING_WIND_NODES, generateDancingWindConnections(), 'dw', dwCenter, Math.PI);

const wgCenter: Point = { x: CONSTELLATION_CENTER.x - QUADRANT_RADIUS, y: CONSTELLATION_CENTER.y };
const { processedNodes: wgNodes, processedConnections: wgConnections } = processPathData(WILD_GALE_NODES, generateWildGaleConnections(), 'wg', wgCenter, -Math.PI / 2);

// --- NEW: Define the Central Root Node ---
const constellationRootNode: TalentNode = {
    id: 'constellation_root',
    name: 'The Four Winds',
    description: 'The constellation of freedom, movement, and transcendence. Choose one of the four paths to begin your journey.',
    flavor: '"The wind knows no bounds, and neither should the spirit."',
    type: 'Genesis', 
    path: 'constellation_center',
    constellation: 'air',
    position: CONSTELLATION_CENTER,
    prerequisites: [],
    visual: { color: '#f9e2af', size: 60, icon: '🌪️' },
    effects: [],
    isAllocated: false, isAllocatable: false, isLocked: true, isVisible: true, isPermanentlyLocked: false, pkCost: 0,
};

/**
 * All Air talent nodes from all integrated paths.
 */
export const AIR_TALENT_NODES: TalentNode[] = [
  ...gbNodes,
  ...sbNodes,
  ...wgNodes,
  ...dwNodes,
  constellationRootNode // Add the central root node
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
 * Root node for the Air constellation (now the central node).
 */
export const ROOT_NODE: TalentNode = constellationRootNode;

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

  // --- NEW: Connections from the Central Root to each Path's Genesis ---
  const rootConnections: TalentConnection[] = [
    { from: 'constellation_root', to: 'gb_genesis', isActive: false, isLocked: false },
    { from: 'constellation_root', to: 'sb_genesis', isActive: false, isLocked: false },
    { from: 'constellation_root', to: 'dw_genesis', isActive: false, isLocked: false },
    { from: 'constellation_root', to: 'wg_genesis', isActive: false, isLocked: false },
  ];

  // --- NEW: A more comprehensive set of inter-path connections for the web effect ---
  const interPathConnections: TalentConnection[] = [
    // Connect adjacent path's major nodes
    { from: 'gb_air_swipe', to: 'wg_sound_bending', isActive: false, isLocked: false },
    { from: 'gb_air_vortex', to: 'sb_B2', isActive: false, isLocked: false },
    { from: 'wg_suffocation', to: 'dw_flight', isActive: false, isLocked: false },
    { from: 'sb_spiritual_projection', to: 'dw_air_scooter', isActive: false, isLocked: false },

    // Add some longer, cross-constellation connections
    { from: 'gb_enhanced_agility', to: 'dw_flight', isActive: false, isLocked: false },
    { from: 'wg_suffocation', to: 'sb_spiritual_projection', isActive: false, isLocked: false },
  ];

  allConnections.push(...rootConnections, ...interPathConnections);

  return allConnections;
}