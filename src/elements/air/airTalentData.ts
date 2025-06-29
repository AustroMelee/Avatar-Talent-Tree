/**
 * Air Constellation Talent Data - Full Implementation (RESTRUCTURED)
 * This file serves as the main entry point for the Air Constellation talent tree,
 * implementing a new, organized layout with a central root and symmetrical connections.
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { GENTLE_BREEZE_NODES, generateGentleBreezeConnections, GENTLE_BREEZE_METADATA } from './air_gentleBreezePath';
import { SACRED_BREATH_NODES, generateSacredBreathConnections, SACRED_BREATH_METADATA } from './air_sacredBreathPath';
import { WILD_GALE_NODES, generateWildGaleConnections, WILD_GALE_METADATA } from './air_wildGalePath';
import { DANCING_WIND_NODES, generateDancingWindConnections, DANCING_WIND_METADATA } from './air_dancingWindPath';

// --- Central Layout Configuration ---
const CONSTELLATION_CENTER: Point = { x: 1200, y: 1200 };
const DIAMOND_RADIUS = 1050; // Increased radius for more space

/**
 * A new central root node for the Air constellation. This is the starting point.
 */
const constellationRoot: TalentNode = {
    id: 'constellation_root',
    name: 'The Unburdened Gale',
    description: 'The constellation of freedom, movement, and transcendence. Choose one of the four philosophical paths to begin your journey.',
    flavor: '"The wind knows no bounds, and neither should the spirit."',
    type: 'Genesis',
    path: 'constellation_air',
    constellation: 'air',
    position: CONSTELLATION_CENTER,
    prerequisites: [],
    visual: { color: '#f9e2af', size: 90, icon: '🌪️' },
    effects: [],
    isVisible: true,
    isAllocatable: true,
    isAllocated: false,
    isLocked: false,
    isPermanentlyLocked: false,
    pkCost: 0, // The root node itself costs nothing to "unlock"
};

/**
 * Translates a pre-shaped, outward-facing path to its final position on the canvas.
 */
const processPathData = (
    nodes: TalentNode[], 
    connections: TalentConnection[], 
    prefix: string, 
    offset: Point
) => {
    // Create a map to translate old IDs to new prefixed IDs
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));

    const processedNodes = nodes.map(node => ({
        ...node,
        id: idMap.get(node.id)!,
        // The Genesis node is placed at the offset, others are relative to it
        position: { 
            x: node.position.x + offset.x,
            y: node.position.y + offset.y
        },
        // Update prerequisites to use the new prefixed IDs
        prerequisites: node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined),
        // Connect each path's Genesis node to the central root
        ...(node.type === 'Genesis' && { prerequisites: [constellationRoot.id] }),
    }));

    const processedConnections = connections.map(conn => ({
        ...conn,
        from: idMap.get(conn.from)!,
        to: idMap.get(conn.to)!
    }));

    return { processedNodes, processedConnections };
};

// --- Position Each Path around the Central Root ---

// Top Path (Gentle Breeze)
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


/** All Air talent nodes from all integrated paths, including the new central root. */
export const AIR_TALENT_NODES: TalentNode[] = [
  constellationRoot,
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

// The true root of the tree is now the central constellation node.
export const ROOT_NODE: TalentNode = constellationRoot;

/** Generate all connections for the Air constellation with a new, organized structure. */
export function generateAirConnections(): TalentConnection[] {
  // --- Define clean, symmetrical connections between the four paths ---
  const interPathConnections: TalentConnection[] = [
    // Outer Ring (connecting the depth 1 Keystones)
    { from: 'gb_air_shield', to: 'sb_hypersensitivity', isActive: false, isLocked: false },
    { from: 'sb_sound_amplification', to: 'dw_air_spout', isActive: false, isLocked: false },
    { from: 'dw_enhanced_speed', to: 'wg_air_blast', isActive: false, isLocked: false },
    { from: 'wg_air_blades', to: 'gb_air_cushion', isActive: false, isLocked: false },

    // Inner Ring (connecting the depth 2 Manifestations)
    { from: 'gb_air_swipe', to: 'sb_breath_of_wind', isActive: false, isLocked: false },
    { from: 'sb_B2', to: 'dw_air_scooter', isActive: false, isLocked: false }, // B2 is "Guiding Light"
    { from: 'dw_air_scooter', to: 'wg_air_cannon', isActive: false, isLocked: false },
    { from: 'wg_sound_bending', to: 'gb_air_vortex', isActive: false, isLocked: false },

    // Cross-Connections for iconic builds (e.g., Zaheer)
    { from: 'wg_suffocation', to: 'dw_flight', isActive: false, isLocked: false },
    { from: 'gb_enhanced_agility', to: 'sb_spiritual_projection', isActive: false, isLocked: false },
  ];

  return [
    // Connections from individual paths
    ...gbConnections,
    ...sbConnections,
    ...wgConnections,
    ...dwConnections,
    // The new, clean inter-path connections
    ...interPathConnections
  ];
}