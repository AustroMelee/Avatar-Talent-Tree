/**
 * Fire Constellation Talent Data - The Eternal Flame
 * Complete data for Fire constellation with all 4 paths
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { 
    RAGING_INFERNO_NODES, 
    generateRagingInfernoConnections, 
    RAGING_INFERNO_METADATA 
} from './fire_forgeOfWrathPath';

import { 
    INNER_SUN_NODES, 
    generateInnerSunConnections, 
    INNER_SUN_METADATA 
} from './fire_sacredHearthPath';

import { 
    FOCUSED_FLAME_NODES, 
    generateFocusedFlameConnections, 
    FOCUSED_FLAME_METADATA 
} from './fire_mastersFlamePath';

import { 
    COLD_TEMPEST_NODES, 
    generateColdTempestConnections, 
    COLD_TEMPEST_METADATA 
} from './fire_lightningsEdgePath';

// --- Layout Configuration ---
const CONSTELLATION_CENTER: Point = { x: 1200, y: 1200 };
const PATH_RADIUS = 1100;
const SYNTHESIS_INNER_RADIUS = 400;
const SYNTHESIS_OUTER_RADIUS = 600;

/**
 * Rotates a point around a center by a given angle (in radians).
 */
function rotatePoint(point: Point, center: Point, angleRad: number): Point {
    const x = point.x - center.x;
    const y = point.y - center.y;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: cos * x - sin * y + center.x,
        y: sin * x + cos * y + center.y,
    };
}

const ROTATE_RAD = -Math.PI / 4; // -45 degrees

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 * @param nodes - The array of nodes for a path.
 * @param connections - The array of connections for a path.
 * @param prefix - The string prefix to use (e.g., 'ri' for Raging Inferno).
 * @returns An object containing the prefixed nodes and connections.
 */
const prefixPathData = (nodes: TalentNode[], conns: TalentConnection[], prefix: string, offset: Point) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));
    return {
        nodes: nodes.map(node => {
            // First, offset the node
            const offsetPos = { x: node.position.x + offset.x, y: node.position.y + offset.y };
            // Then, rotate around the offset point by ROTATE_RAD
            const rotatedPos = rotatePoint(offsetPos, offset, ROTATE_RAD);
            return {
                ...node,
                id: idMap.get(node.id)!,
                position: rotatedPos,
                prerequisites: node.prerequisites.map(p => idMap.get(p)!).filter(Boolean),
            };
        }),
        connections: conns.map(c => ({ ...c, from: idMap.get(c.from)!, to: idMap.get(c.to)! })),
    };
};

// --- Path Placement and Processing ---
const riOffset: Point = rotatePoint({ x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - PATH_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD); // Top: Raging Inferno
const isOffset: Point = rotatePoint({ x: CONSTELLATION_CENTER.x + PATH_RADIUS, y: CONSTELLATION_CENTER.y }, CONSTELLATION_CENTER, ROTATE_RAD); // Right: Inner Sun
const ffOffset: Point = rotatePoint({ x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + PATH_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD); // Bottom: Focused Flame
const ctOffset: Point = rotatePoint({ x: CONSTELLATION_CENTER.x - PATH_RADIUS, y: CONSTELLATION_CENTER.y }, CONSTELLATION_CENTER, ROTATE_RAD); // Left: Cold Tempest

const { nodes: riNodes, connections: riConns } = prefixPathData(RAGING_INFERNO_NODES, generateRagingInfernoConnections(), 'ri', riOffset);
const { nodes: isNodes, connections: isConns } = prefixPathData(INNER_SUN_NODES, generateInnerSunConnections(), 'is', isOffset);
const { nodes: ffNodes, connections: ffConns } = prefixPathData(FOCUSED_FLAME_NODES, generateFocusedFlameConnections(), 'ff', ffOffset);
const { nodes: ctNodes, connections: ctConns } = prefixPathData(COLD_TEMPEST_NODES, generateColdTempestConnections(), 'ct', ctOffset);

// --- Define the new Synthesis Nodes for Fire ---
const synthesisNodes: TalentNode[] = [
    // --- Inner Ring (Genesis Synergies) ---
    {
        id: 'j_inner_nw', name: "Charged Blast", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['ri_genesis', 'ct_genesis'], visual: { color: '#cba6f7', size: 60, icon: '⚡' },
        description: "Your explosive fire attacks are charged with static electricity. While they don't electrocute, the discharge is enough to disorient and disrupt an opponent's chi.",
        flavor: "The storm's rage and the lightning's focus, united.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_ne', name: "Burning Vitality", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['ri_genesis', 'is_genesis'], visual: { color: '#cba6f7', size: 60, icon: '❤️‍🔥' },
        description: "A dangerous pact. Your fire burns slightly hotter and your attacks become more powerful the lower your health is.",
        flavor: "To burn brightest, one must consume the self.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_se', name: "Breath of the Forge", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['is_genesis', 'ff_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🌬️' },
        description: "You combine the life-giving warmth of the Inner Sun with the precision of the Focused Flame. Your breath of fire can be controlled enough to heat metal for smithing or gently warm an ally.",
        flavor: "The same breath that forges a sword can warm a soul.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_sw', name: "Magnetic Field", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['ff_genesis', 'ct_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🧲' },
        description: "Your precise control over energy allows you to use your lightning to create a temporary magnetic field, capable of subtly deflecting incoming metal projectiles or disarming foes.",
        flavor: "The cold fire commands more than just the storm.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    // --- Outer Ring (Keystone/Manifestation Synergies) ---
    {
        id: 'j_outer_nw', name: "Lightning Thrusters", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['ri_jet_propulsion', 'ct_lightning_generation'], visual: { color: '#cba6f7', size: 60, icon: '🚀' },
        description: "You can channel raw lightning through your propulsion jets for a short, incredibly fast burst of speed that leaves a trail of electricity.",
        flavor: "Ride the lightning.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_ne', name: "Chi-Sight Bombardment", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['ri_combustionbending', 'is_energy_reading'], visual: { color: '#cba6f7', size: 60, icon: '👁️' },
        description: "Your ability to read energy allows you to sense a target's chi, enabling you to curve your combustion beams around obstacles to strike them with unerring accuracy.",
        flavor: "You can't hide from the fire that sees your soul.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_se', name: "Dragon's Claw", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_OUTER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['is_dancing_dragon', 'ff_fire_blades'], visual: { color: '#cba6f7', size: 60, icon: '🐲' },
        description: "Your fluid, dancing movements can now manifest sharp, precise fire claws from your fingertips, combining the grace of the dragon with the cut of the blade.",
        flavor: "The dragon's dance is both beautiful and deadly.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_sw', name: "Energy Absorption", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'fire', position: rotatePoint({ x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_OUTER_RADIUS }, CONSTELLATION_CENTER, ROTATE_RAD),
        prerequisites: ['ff_blue_fire', 'ct_lightning_redirection'], visual: { color: '#cba6f7', size: 60, icon: '🔋' },
        description: "When you successfully redirect lightning, you absorb a portion of its immense energy, causing your next fire attack to be a guaranteed blue-flame attack.",
        flavor: "Turn your enemy's greatest power into your own.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
];

export const FIRE_TALENT_NODES: TalentNode[] = [...riNodes, ...isNodes, ...ffNodes, ...ctNodes, ...synthesisNodes];

/**
 * Fire constellation metadata
 */
export const FIRE_CONSTELLATION = {
  id: 'fire',
  name: 'The Eternal Flame',
  description: 'The eternal dance between creation and destruction, passion and discipline, life and death.',
  color: '#f38ba8',
  background: 'fire',
  paths: [RAGING_INFERNO_METADATA, INNER_SUN_METADATA, FOCUSED_FLAME_METADATA, COLD_TEMPEST_METADATA]
};

/**
 * Root nodes for each Fire path (using the prefixed Genesis nodes)
 */
export const FIRE_ROOT_NODES: TalentNode[] = [
  riNodes.find(n => n.type === 'Genesis')!,
  isNodes.find(n => n.type === 'Genesis')!,
  ffNodes.find(n => n.type === 'Genesis')!,
  ctNodes.find(n => n.type === 'Genesis')!
];

export function generateFireConnections(): TalentConnection[] {
  const newConnections: TalentConnection[] = [];
  const add = (from: string, to: string) => newConnections.push({ from, to, isActive: false, isLocked: false });

  // Connect paths TO the Synthesis nodes.
  add('ri_genesis', 'j_inner_nw'); add('ct_genesis', 'j_inner_nw');
  add('ri_genesis', 'j_inner_ne'); add('is_genesis', 'j_inner_ne');
  add('is_genesis', 'j_inner_se'); add('ff_genesis', 'j_inner_se');
  add('ff_genesis', 'j_inner_sw'); add('ct_genesis', 'j_inner_sw');

  add('ri_jet_propulsion', 'j_outer_nw'); add('ct_lightning_generation', 'j_outer_nw');
  add('ri_combustionbending', 'j_outer_ne'); add('is_energy_reading', 'j_outer_ne');
  add('is_dancing_dragon', 'j_outer_se'); add('ff_fire_blades', 'j_outer_se');
  add('ff_blue_fire', 'j_outer_sw'); add('ct_lightning_redirection', 'j_outer_sw');

  // Connect the Synthesis nodes to form rings
  add('j_inner_nw', 'j_inner_ne'); add('j_inner_ne', 'j_inner_se');
  add('j_inner_se', 'j_inner_sw'); add('j_inner_sw', 'j_inner_nw');
  add('j_outer_nw', 'j_outer_ne'); add('j_outer_ne', 'j_outer_se');
  add('j_outer_se', 'j_outer_sw'); add('j_outer_sw', 'j_outer_nw');

  // Connect Inner and Outer Synthesis Rings
  add('j_inner_nw', 'j_outer_nw'); add('j_inner_ne', 'j_outer_ne');
  add('j_inner_se', 'j_outer_se'); add('j_inner_sw', 'j_outer_sw');
  
  // Iconic cross-connections
  add('ct_lightning_redirection', 'is_breath_of_fire'); // Iroh's philosophy

  return [...riConns, ...isConns, ...ffConns, ...ctConns, ...newConnections];
}

export const FIRE_CONSTELLATION_METADATA = FIRE_CONSTELLATION; 