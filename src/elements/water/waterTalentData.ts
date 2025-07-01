/**
 * Water Constellation Talent Data - The Depths Eternal
 * The eternal dance between creation and destruction, memory and forgetting
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { 
    FLOWING_FORM_NODES as ENDLESS_MIRROR_NODES, 
    generateFlowingFormConnections as generateEndlessMirrorConnections, 
    FLOWING_FORM_METADATA as ENDLESS_MIRROR_METADATA 
} from './water_endlessMirrorPath';

import { 
    SPRING_OF_LIFE_NODES as CRIMSON_TIDE_NODES, 
    generateSpringOfLifeConnections as generateCrimsonTideConnections, 
    SPRING_OF_LIFE_METADATA as CRIMSON_TIDE_METADATA 
} from './water_crimsonTidePath';

import { 
    PATIENT_GLACIER_NODES as ETERNAL_PRISON_NODES, 
    generatePatientGlacierConnections as generateEternalPrisonConnections, 
    PATIENT_GLACIER_METADATA as ETERNAL_PRISON_METADATA 
} from './water_eternalPrisonPath';

import { 
    CRUSHING_ABYSS_NODES as HUNGRY_DEEP_NODES, 
    generateCrushingAbyssConnections as generateHungryDeepConnections, 
    CRUSHING_ABYSS_METADATA as HUNGRY_DEEP_METADATA 
} from './water_crushingAbyssPath';

// --- Layout Configuration ---
const CONSTELLATION_CENTER: Point = { x: 1200, y: 1200 };
const PATH_RADIUS = 1100;
const SYNTHESIS_INNER_RADIUS = 450;
const SYNTHESIS_OUTER_RADIUS = 800;

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
const emOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - PATH_RADIUS }; // Top: Endless Mirror
const ctOffset: Point = { x: CONSTELLATION_CENTER.x + PATH_RADIUS, y: CONSTELLATION_CENTER.y }; // Right: Crimson Tide
const epOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + PATH_RADIUS }; // Bottom: Eternal Prison
const hdOffset: Point = { x: CONSTELLATION_CENTER.x - PATH_RADIUS, y: CONSTELLATION_CENTER.y }; // Left: Hungry Deep

const { nodes: emNodes, connections: emConns } = prefixPathData(ENDLESS_MIRROR_NODES, generateEndlessMirrorConnections(), 'em', emOffset);
const { nodes: ctNodes, connections: ctConns } = prefixPathData(CRIMSON_TIDE_NODES, generateCrimsonTideConnections(), 'ct', ctOffset);
const { nodes: epNodes, connections: epConns } = prefixPathData(ETERNAL_PRISON_NODES, generateEternalPrisonConnections(), 'ep', epOffset);
const { nodes: hdNodes, connections: hdConns } = prefixPathData(HUNGRY_DEEP_NODES, generateHungryDeepConnections(), 'hd', hdOffset);

// --- Define the new Synthesis Nodes for Water ---
const synthesisNodes: TalentNode[] = [
    // --- Inner Ring (Genesis Synergies) ---
    {
        id: 'j_inner_nw', name: "Riptide Counter", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS },
        prerequisites: ['em_genesis', 'hd_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🌊' },
        description: "Combine adaptive flow with raw force. After you successfully dodge an attack, your next water whip is infused with high pressure, staggering your opponent.",
        flavor: "The ocean's flow hides a crushing weight.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_ne', name: "Moon's Reflection", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS },
        prerequisites: ['em_genesis', 'ct_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🌙' },
        description: "Under moonlight, your healing abilities are enhanced and your waterbending gains a subtle, ethereal quality that can soothe spirits and calm troubled waters.",
        flavor: "The moon guides the tides of life.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_se', name: "Healing Frost", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['ct_genesis', 'ep_genesis'], visual: { color: '#cba6f7', size: 60, icon: '❄️' },
        description: "Your ice constructs slowly emanate a healing aura, mending the minor wounds of allies who stand near them.",
        flavor: "The cold preserves, and in preservation, there is healing.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_sw', name: "Ice Coffin", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['ep_genesis', 'hd_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🧊' },
        description: "You can encase enemies in a shell of ice so dense and cold it temporarily paralyzes them, inspired by the legendary ice prisons of the Northern Water Tribe.",
        flavor: "The glacier's embrace is unbreakable.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    // --- Outer Ring (Keystone/Manifestation Synergies) ---
    {
        id: 'j_outer_nw', name: "Constrictor's Squeeze", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['em_octopus_form', 'hd_high_pressure_jet'], visual: { color: '#cba6f7', size: 60, icon: '🐙' },
        description: "Your Octopus Form tentacles can now apply crushing water pressure, making them capable of restraining stronger foes or crushing objects.",
        flavor: "The deep holds what it touches.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_ne', name: "Sap Healing", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['em_plantbending', 'ct_chi_restoration'], visual: { color: '#cba6f7', size: 60, icon: '🌿' },
        description: "You can draw life-giving water directly from plants to perform minor healing on yourself or allies without needing an external water source.",
        flavor: "Life finds a way, and water is its vessel.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_se', name: "Blood Moon Stasis", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['ct_bloodbending', 'ep_flash_freeze'], visual: { color: '#cba6f7', size: 60, icon: '🩸' },
        description: "A dark fusion of abilities. You use a micro-application of bloodbending to momentarily halt a target's circulation, making them far more susceptible to being flash-frozen.",
        flavor: "First the heart stills, then the world freezes.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_sw', name: "Northern Bastion", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'water', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['ep_glacial_armor', 'hd_water_sphere'], visual: { color: '#cba6f7', size: 60, icon: '🛡️' },
        description: "Your Glacial Armor can be temporarily liquefied into a sphere of high-pressure water to absorb a heavy blow, before instantly re-freezing.",
        flavor: "Flow like water, stand like a glacier.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
];

export const WATER_TALENT_NODES: TalentNode[] = [...emNodes, ...ctNodes, ...epNodes, ...hdNodes, ...synthesisNodes];

export const WATER_CONSTELLATION = {
  id: 'water',
  name: 'The Depths Eternal',
  description: 'The eternal dance between creation and destruction, memory and forgetting through 4 profound philosophical currents.',
  color: '#74c7ec',
  background: 'water',
  paths: [ENDLESS_MIRROR_METADATA, CRIMSON_TIDE_METADATA, ETERNAL_PRISON_METADATA, HUNGRY_DEEP_METADATA]
};

export const ROOT_NODE: TalentNode = emNodes.find(n => n.type === 'Genesis')!;

export function generateWaterConnections(): TalentConnection[] {
  const newConnections: TalentConnection[] = [];
  const add = (from: string, to: string) => newConnections.push({ from, to, isActive: false, isLocked: false });

  // Connect paths TO the Synthesis nodes.
  add('em_genesis', 'j_inner_nw'); add('hd_genesis', 'j_inner_nw');
  add('em_genesis', 'j_inner_ne'); add('ct_genesis', 'j_inner_ne');
  add('ct_genesis', 'j_inner_se'); add('ep_genesis', 'j_inner_se');
  add('ep_genesis', 'j_inner_sw'); add('hd_genesis', 'j_inner_sw');
  
  add('em_octopus_form', 'j_outer_nw'); add('hd_high_pressure_jet', 'j_outer_nw');
  add('em_plantbending', 'j_outer_ne'); add('ct_chi_restoration', 'j_outer_ne');
  add('ct_bloodbending', 'j_outer_se'); add('ep_flash_freeze', 'j_outer_se');
  add('ep_glacial_armor', 'j_outer_sw'); add('hd_water_sphere', 'j_outer_sw');

  // Connect the Synthesis nodes to form rings
  add('j_inner_nw', 'j_inner_ne'); add('j_inner_ne', 'j_inner_se');
  add('j_inner_se', 'j_inner_sw'); add('j_inner_sw', 'j_inner_nw');
  add('j_outer_nw', 'j_outer_ne'); add('j_outer_ne', 'j_outer_se');
  add('j_outer_se', 'j_outer_sw'); add('j_outer_sw', 'j_outer_nw');

  // Connect Inner and Outer Synthesis Rings
  add('j_inner_nw', 'j_outer_nw'); add('j_inner_ne', 'j_outer_ne');
  add('j_inner_se', 'j_outer_se'); add('j_inner_sw', 'j_outer_sw');
  
  // Iconic cross-connections
  add('ct_bloodbending', 'em_fluidic_motion'); // A dark path to ultimate control

  return [...emConns, ...ctConns, ...epConns, ...hdConns, ...newConnections];
} 