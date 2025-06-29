/**
 * Air Constellation Talent Data - Full Implementation
 * This file serves as the main entry point for the Air Constellation talent tree,
 * implementing a central-anchor layout to create a cohesive, web-like structure.
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { GENTLE_BREEZE_NODES, generateGentleBreezeConnections, GENTLE_BREEZE_METADATA } from './air_gentleBreezePath';
import { SACRED_BREATH_NODES, generateSacredBreathConnections, SACRED_BREATH_METADATA } from './air_sacredBreathPath';
import { WILD_GALE_NODES, generateWildGaleConnections, WILD_GALE_METADATA } from './air_wildGalePath';
import { DANCING_WIND_NODES, generateDancingWindConnections, DANCING_WIND_METADATA } from './air_dancingWindPath';

// --- Central Layout Configuration ---
const CONSTELLATION_CENTER: Point = { x: 1200, y: 1200 };
const DIAMOND_RADIUS = 950; // The distance of the outer Genesis nodes from the center

/**
 * Translates a pre-shaped, inward-facing path to its final position on the canvas.
 */
const processPathData = (
    nodes: TalentNode[], 
    connections: TalentConnection[], 
    prefix: string, 
    offset: Point
) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));

    const processedNodes = nodes.map(node => ({
        ...node,
        id: idMap.get(node.id)!,
        position: { 
            x: node.position.x + offset.x,
            y: node.position.y + offset.y
        },
        prerequisites: node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined)
    }));

    const processedConnections = connections.map(conn => ({
        ...conn,
        from: idMap.get(conn.from)!,
        to: idMap.get(conn.to)!
    }));

    return { processedNodes, processedConnections };
};

// --- Position Each Path ---

// Top Path (Gentle Breeze), positioned at the top of the diamond.
const gbOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - DIAMOND_RADIUS };
const { processedNodes: gbNodes, processedConnections: gbConnections } = 
    processPathData(GENTLE_BREEZE_NODES, generateGentleBreezeConnections(), 'gb', gbOffset);

// Right Path (Sacred Breath)
const sbOffset: Point = { x: CONSTELLATION_CENTER.x + DIAMOND_RADIUS, y: CONSTELLATION_CENTER.y };
const { processedNodes: sbNodes, processedConnections: sbConnections } = 
    processPathData(SACRED_BREATH_NODES, generateSacredBreathConnections(), 'sb', sbOffset);

// Bottom Path (Dancing Wind)
const dwOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + DIAMOND_RADIUS };
const { processedNodes: dwNodes, processedConnections: dwConnections } = 
    processPathData(DANCING_WIND_NODES, generateDancingWindConnections(), 'dw', dwOffset);

// Left Path (Wild Gale)
const wgOffset: Point = { x: CONSTELLATION_CENTER.x - DIAMOND_RADIUS, y: CONSTELLATION_CENTER.y };
const { processedNodes: wgNodes, processedConnections: wgConnections } = 
    processPathData(WILD_GALE_NODES, generateWildGaleConnections(), 'wg', wgOffset);


/** All Air talent nodes from all integrated paths. */
export const AIR_TALENT_NODES: TalentNode[] = [
  ...gbNodes,
  ...sbNodes,
  ...wgNodes,
  ...dwNodes,
];

/** Air constellation metadata. */
export const AIR_CONSTELLATION = {
  name: 'The Four Winds',
  description: 'The constellation of balance, freedom, adaptation, and transcendence',
  background: 'air',
  paths: [GENTLE_BREEZE_METADATA, SACRED_BREATH_METADATA, WILD_GALE_METADATA, DANCING_WIND_METADATA]
};

export const ROOT_NODE: TalentNode = gbNodes.find(n => n.type === 'Genesis')!;

/** Generate all connections for the Air constellation. */
export function generateAirConnections(): TalentConnection[] {
  // --- Define connections between the four paths to form the central web ---
  const interPathConnections: TalentConnection[] = [
    // The main diamond shape connecting the four Genesis nodes
    { from: 'gb_genesis', to: 'sb_genesis', isActive: false, isLocked: false },
    { from: 'sb_genesis', to: 'dw_genesis', isActive: false, isLocked: false },
    { from: 'dw_genesis', to: 'wg_genesis', isActive: false, isLocked: false },
    { from: 'wg_genesis', to: 'gb_genesis', isActive: false, isLocked: false },

    // Connect major skills from outer paths to the central nodes
    { from: 'wg_air_cannon', to: 'gb_air_shield', isActive: false, isLocked: false },
    { from: 'sb_breath_of_wind', to: 'gb_air_vortex', isActive: false, isLocked: false },
    { from: 'dw_air_scooter', to: 'gb_air_swipe', isActive: false, isLocked: false },
    
    // Connect adjacent outer paths to each other
    { from: 'wg_suffocation', to: 'dw_flight', isActive: false, isLocked: false },
    { from: 'dw_air_spout', to: 'sb_B3', isActive: false, isLocked: false },
    { from: 'sb_spiritual_projection', to: 'gb_enhanced_agility', isActive: false, isLocked: false },
    { from: 'wg_sound_bending', to: 'gb_air_cushion', isActive: false, isLocked: false },
    
    // Create a denser web in the middle
    { from: 'wg_air_blades', to: 'sb_hypersensitivity', isActive: false, isLocked: false },
    { from: 'dw_enhanced_speed', to: 'gb_air_vortex', isActive: false, isLocked: false },
  ];

  return [
    ...gbConnections,
    ...sbConnections,
    ...wgConnections,
    ...dwConnections,
    ...interPathConnections
  ];
}