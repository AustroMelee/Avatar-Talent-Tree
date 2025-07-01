/**
 * Earth Constellation Talent Data - The Four Pillars of Stone
 * 
 * The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies.
 * Each pillar represents a different approach to mastering the earth element.
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { 
    PATIENT_MOUNTAIN_NODES, 
    generatePatientMountainConnections, 
    PATIENT_MOUNTAIN_METADATA 
} from './earth_hunYuanPath';

import { 
    MOLTEN_CORE_NODES, 
    generateMoltenCoreConnections, 
    MOLTEN_CORE_METADATA 
} from './earth_bianHuaPath';

import { 
    ETERNAL_MOUNTAIN_NODES, 
    generateEternalMountainConnections, 
    ETERNAL_MOUNTAIN_METADATA 
} from './earth_gangQiangPath';

import { 
    SCULPTORS_HAND_NODES, 
    generateSculptorsHandConnections, 
    SCULPTORS_HAND_METADATA 
} from './earth_jingQuePath';

// --- Layout Configuration ---
const CONSTELLATION_CENTER: Point = { x: 1200, y: 1200 };
const PATH_RADIUS = 1100;
const SYNTHESIS_INNER_RADIUS = 400;
const SYNTHESIS_OUTER_RADIUS = 600;

// --- Helper Function ---
const prefixPathData = (nodes: TalentNode[], conns: TalentConnection[], prefix: string, offset: Point) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));
    return {
        nodes: nodes.map(node => ({
            ...node,
            id: idMap.get(node.id)!,
            position: { x: node.position.x + offset.x, y: node.position.y + offset.y },
            prerequisites: node.prerequisites.map(p => idMap.get(p)!).filter(Boolean),
        })),
        connections: conns.map(c => ({ ...c, from: idMap.get(c.from)!, to: idMap.get(c.to)! })),
    };
};

// --- Path Placement and Processing ---
const hyOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - PATH_RADIUS }; // Top: Hun Yuan (Patient)
const bhOffset: Point = { x: CONSTELLATION_CENTER.x + PATH_RADIUS, y: CONSTELLATION_CENTER.y }; // Right: Bian Hua (Molten)
const gqOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + PATH_RADIUS }; // Bottom: Gang Qiang (Strength)
const jqOffset: Point = { x: CONSTELLATION_CENTER.x - PATH_RADIUS, y: CONSTELLATION_CENTER.y }; // Left: Jing Que (Precision)

const { nodes: hyNodes, connections: hyConns } = prefixPathData(PATIENT_MOUNTAIN_NODES, generatePatientMountainConnections(), 'hun_yuan', hyOffset);
const { nodes: bhNodes, connections: bhConns } = prefixPathData(MOLTEN_CORE_NODES, generateMoltenCoreConnections(), 'bian_hua', bhOffset);
const { nodes: gqNodes, connections: gqConns } = prefixPathData(ETERNAL_MOUNTAIN_NODES, generateEternalMountainConnections(), 'gang_qiang', gqOffset);
const { nodes: jqNodes, connections: jqConns } = prefixPathData(SCULPTORS_HAND_NODES, generateSculptorsHandConnections(), 'jing_que', jqOffset);

// --- Define the new Synthesis Nodes for Earth ---
const synthesisNodes: TalentNode[] = [
    // --- Inner Ring (Genesis Synergies) ---
    {
        id: 'j_inner_nw', name: "Seismic Darts", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS },
        prerequisites: ['hun_yuan_genesis', 'jing_que_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🎯' },
        description: "Combine seismic sense with precision. You can launch small, precise stone projectiles that you can continue to track with seismic sense, even around corners.",
        flavor: "The earth sees, and the stone strikes.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_ne', name: "Metal Sense", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS },
        prerequisites: ['hun_yuan_genesis', 'bian_hua_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🔗' },
        description: "Your seismic sense is refined, allowing you to clearly distinguish and locate the subtle impurities in metal, making metalbending easier to learn and perform.",
        flavor: "The metal sings a different song than the stone.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_se', name: "Molten Fist", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['bian_hua_genesis', 'gang_qiang_genesis'], visual: { color: '#cba6f7', size: 60, icon: '👊' },
        description: "Combine raw strength with phase-shifting. You can encase your fists in rock and then superheat them to a semi-molten state, dealing both blunt and fire damage.",
        flavor: "The mountain's heart is a furnace.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_sw', name: "Architectural Weakpoint", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['gang_qiang_genesis', 'jing_que_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🏛️' },
        description: "Your knowledge of raw force and fine control allows you to instinctively spot and exploit structural weaknesses in buildings, walls, and other man-made constructions.",
        flavor: "Every fortress has a single stone that, when removed, brings it to ruin.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    // --- Outer Ring (Keystone/Manifestation Synergies) ---
    {
        id: 'j_outer_nw', name: "Dai Li Ambush", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['hun_yuan_earth_tunneling', 'jing_que_rock_gloves'], visual: { color: '#cba6f7', size: 60, icon: '🙌' },
        description: "Combine tunneling with precision strikes. While tunneling underground, you can launch your rock gloves to the surface to restrain an opponent from below.",
        flavor: "There is no war in Ba Sing Se.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_ne', name: "Subsurface Eruption", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['hun_yuan_seismic_sense', 'bian_hua_lavabending'], visual: { color: '#cba6f7', size: 60, icon: '🌋' },
        description: "Pinpoint an enemy's location with seismic sense, then precisely command a spout of lava to erupt directly beneath their feet.",
        flavor: "The hunter feels the prey's steps, and the earth provides the trap.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_se', name: "Forged Plating", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['bian_hua_metalbending', 'gang_qiang_earth_armor'], visual: { color: '#cba6f7', size: 60, icon: '🛡️' },
        description: "You apply thin, flexible metal plates to your Earth Armor, significantly increasing its durability against both physical and energy-based attacks.",
        flavor: "What is stronger than a mountain? A mountain sheathed in steel.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_sw', name: "Liquefaction", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'earth', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['gang_qiang_earthquake', 'jing_que_sandbending'], visual: { color: '#cba6f7', size: 60, icon: '🏜️' },
        description: "By combining the fine control of sandbending with raw tectonic force, your Earthquake ability can temporarily turn solid ground into quicksand, trapping armies.",
        flavor: "The unmovable mountain and the shifting sand become one.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
];

export const EARTH_TALENT_NODES: TalentNode[] = [...hyNodes, ...bhNodes, ...gqNodes, ...jqNodes, ...synthesisNodes];

export const EARTH_CONSTELLATION = {
  id: 'earth',
  name: 'The Four Pillars of Stone',
  description: 'The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies.',
  color: '#8B4513',
  background: 'earth',
  paths: [PATIENT_MOUNTAIN_METADATA, MOLTEN_CORE_METADATA, ETERNAL_MOUNTAIN_METADATA, SCULPTORS_HAND_METADATA]
};

export const ROOT_NODE: TalentNode = hyNodes.find(n => n.type === 'Genesis')!;

export function generateEarthConnections(): TalentConnection[] {
  const newConnections: TalentConnection[] = [];
  const add = (from: string, to: string) => newConnections.push({ from, to, isActive: false, isLocked: false });

  // Connect paths TO the Synthesis nodes.
  add('hun_yuan_genesis', 'j_inner_nw'); add('jing_que_genesis', 'j_inner_nw');
  add('hun_yuan_genesis', 'j_inner_ne'); add('bian_hua_genesis', 'j_inner_ne');
  add('bian_hua_genesis', 'j_inner_se'); add('gang_qiang_genesis', 'j_inner_se');
  add('gang_qiang_genesis', 'j_inner_sw'); add('jing_que_genesis', 'j_inner_sw');

  add('hun_yuan_earth_tunneling', 'j_outer_nw'); add('jing_que_rock_gloves', 'j_outer_nw');
  add('hun_yuan_seismic_sense', 'j_outer_ne'); add('bian_hua_lavabending', 'j_outer_ne');
  add('bian_hua_metalbending', 'j_outer_se'); add('gang_qiang_earth_armor', 'j_outer_se');
  add('gang_qiang_earthquake', 'j_outer_sw'); add('jing_que_sandbending', 'j_outer_sw');

  // Connect the Synthesis nodes to form rings
  add('j_inner_nw', 'j_inner_ne'); add('j_inner_ne', 'j_inner_se');
  add('j_inner_se', 'j_inner_sw'); add('j_inner_sw', 'j_inner_nw');
  add('j_outer_nw', 'j_outer_ne'); add('j_outer_ne', 'j_outer_se');
  add('j_outer_se', 'j_outer_sw'); add('j_outer_sw', 'j_outer_nw');

  // Connect Inner and Outer Synthesis Rings
  add('j_inner_nw', 'j_outer_nw'); add('j_inner_ne', 'j_outer_ne');
  add('j_inner_se', 'j_outer_se'); add('j_inner_sw', 'j_outer_sw');

  return [...hyConns, ...bhConns, ...gqConns, ...jqConns, ...newConnections];
} 