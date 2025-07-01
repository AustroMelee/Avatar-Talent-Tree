/**
 * Steel Constellation Talent Data - The Forged Steel
 * This file serves as the main entry point for the Steel Constellation talent tree,
 * integrating all defined paths like The Silent Blade, The Shield of the People, The Flow of Combat, and The Mind of War.
 */

import type { TalentNode, TalentConnection, Point } from '../../types';
import { ARSENAL_NODES, generateArsenalConnections, ARSENAL_METADATA } from './steel_arsenalPath';
import { PARAGON_NODES, generateParagonConnections, PARAGON_METADATA } from './steel_paragonPath';
import { INNOVATOR_NODES, generateInnovatorConnections, INNOVATOR_METADATA } from './steel_innovatorPath';
import { MASTERMIND_NODES, generateMastermindConnections, MASTERMIND_METADATA } from './steel_mastermindPath';

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
            exclusiveWith: (node.exclusiveWith || []).map(p => idMap.get(p)!).filter(Boolean),
        })),
        connections: conns.map(c => ({ ...c, from: idMap.get(c.from)!, to: idMap.get(c.to)! })),
    };
};

// --- Path Placement and Processing ---
const mmOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y - PATH_RADIUS }; // Top: Mastermind
const inOffset: Point = { x: CONSTELLATION_CENTER.x + PATH_RADIUS, y: CONSTELLATION_CENTER.y }; // Right: Innovator
const paOffset: Point = { x: CONSTELLATION_CENTER.x, y: CONSTELLATION_CENTER.y + PATH_RADIUS }; // Bottom: Paragon
const arOffset: Point = { x: CONSTELLATION_CENTER.x - PATH_RADIUS, y: CONSTELLATION_CENTER.y }; // Left: Arsenal

const { nodes: mastermindNodes, connections: mastermindConnections } = prefixPathData(MASTERMIND_NODES, generateMastermindConnections(), 'mastermind', mmOffset);
const { nodes: innovatorNodes, connections: innovatorConnections } = prefixPathData(INNOVATOR_NODES, generateInnovatorConnections(), 'innovator', inOffset);
const { nodes: paragonNodes, connections: paragonConnections } = prefixPathData(PARAGON_NODES, generateParagonConnections(), 'paragon', paOffset);
const { nodes: arsenalNodes, connections: arsenalConnections } = prefixPathData(ARSENAL_NODES, generateArsenalConnections(), 'arsenal', arOffset);

// --- Define the new Synthesis Nodes for Steel ---
const synthesisNodes: TalentNode[] = [
    // --- Inner Ring (Genesis Synergies) ---
    {
        id: 'j_inner_nw', name: "Exploiting Weakness", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS },
        prerequisites: ['mastermind_genesis', 'arsenal_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🧐' },
        description: "Your tactical mind guides your weapon strikes, allowing you to instinctively target armor gaps, joints, and other weak points for increased damage.",
        flavor: "The perfect strike is not the strongest, but the smartest.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_ne', name: "Efficient Design", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_INNER_RADIUS },
        prerequisites: ['mastermind_genesis', 'innovator_genesis'], visual: { color: '#cba6f7', size: 60, icon: '💡' },
        description: "Your inventions are built with a strategist's eye for logistics, requiring fewer materials and being significantly easier and faster to repair in the field.",
        flavor: "A good plan accounts for failure. A great plan makes failure irrelevant.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_se', name: "Ergonomic Armor", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['innovator_genesis', 'paragon_genesis'], visual: { color: '#cba6f7', size: 60, icon: '🤸' },
        description: "Your custom armor is engineered to complement your body's natural movements, removing penalties to agility and acrobatics.",
        flavor: "The machine should serve the body, not encumber it.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_inner_sw', name: "Kinetic Striking", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_INNER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['paragon_genesis', 'arsenal_genesis'], visual: { color: '#cba6f7', size: 60, icon: '💪' },
        description: "Your peak physical conditioning allows you to wield heavy weapons with surprising speed and agility, and light weapons with devastating force.",
        flavor: "The body is the engine, the weapon is merely the wheel.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    // --- Outer Ring (Keystone/Manifestation Synergies) ---
    {
        id: 'j_outer_nw', name: "Prepared Ambush", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['mastermind_battlefield_preparation', 'arsenal_trick_ammunition'], visual: { color: '#cba6f7', size: 60, icon: '💣' },
        description: "Your battlefield traps can be armed with your specialized projectiles, allowing you to trigger smoke screens, nets, or explosives from a safe distance.",
        flavor: "The best traps are the ones the enemy willingly walks into.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_ne', name: "Command Suit", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y - SYNTHESIS_OUTER_RADIUS },
        prerequisites: ['mastermind_grand_strategist', 'innovator_A3'], visual: { color: '#cba6f7', size: 60, icon: '🤖' },
        description: "Your custom mecha-suit is equipped with advanced communication arrays and tactical displays, improving your ability to coordinate allies and analyze the battlefield.",
        flavor: "The general's eye, with a titan's strength.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_se', name: "Chi-Disruptor Glove", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x + SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['innovator_signature_gadget', 'paragon_chi_blocking'], visual: { color: '#cba6f7', size: 60, icon: '🧤' },
        description: "Your signature electrified glove is calibrated to a frequency that disrupts a bender's chi on contact, stunning them and making it easier to land a full chi-blocking sequence.",
        flavor: "Technology finds a way to level the playing field.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
    {
        id: 'j_outer_sw', name: "Evasive Barrage", type: 'Synthesis', pkCost: 3,
        path: 'synergy', constellation: 'steel', position: { x: CONSTELLATION_CENTER.x - SYNTHESIS_OUTER_RADIUS, y: CONSTELLATION_CENTER.y + SYNTHESIS_INNER_RADIUS },
        prerequisites: ['paragon_acrobatic_evasion', 'arsenal_A1'], visual: { color: '#cba6f7', size: 60, icon: '🎯' },
        description: "Combine acrobatic skill with ranged prowess. While dodging, wall-running, or leaping, you can accurately throw a volley of knives or shuriken.",
        flavor: "The dance of the warrior is a storm of steel.",
        effects:[], isVisible:true, isAllocatable:false, isAllocated:false, isLocked:true, isPermanentlyLocked:false,
    },
];

export const STEEL_TALENT_NODES: TalentNode[] = [...mastermindNodes, ...innovatorNodes, ...paragonNodes, ...arsenalNodes, ...synthesisNodes];

export const STEEL_CONSTELLATION = {
  id: 'steel',
  name: 'The Forged Steel',
  description: 'The triumph of mortal will over supernatural power, achieved through dedication, training, and ingenuity.',
  color: '#cdd6f4',
  background: 'steel',
  paths: [MASTERMIND_METADATA, INNOVATOR_METADATA, PARAGON_METADATA, ARSENAL_METADATA]
};

export const STEEL_ROOT_NODE: TalentNode = mastermindNodes.find(n => n.type === 'Genesis')!;

export function generateSteelConnections(): TalentConnection[] {
  const newConnections: TalentConnection[] = [];
  const add = (from: string, to: string) => newConnections.push({ from, to, isActive: false, isLocked: false });

  // Connect paths TO the Synthesis nodes.
  add('mastermind_genesis', 'j_inner_nw'); add('arsenal_genesis', 'j_inner_nw');
  add('mastermind_genesis', 'j_inner_ne'); add('innovator_genesis', 'j_inner_ne');
  add('innovator_genesis', 'j_inner_se'); add('paragon_genesis', 'j_inner_se');
  add('paragon_genesis', 'j_inner_sw'); add('arsenal_genesis', 'j_inner_sw');

  add('mastermind_battlefield_preparation', 'j_outer_nw'); add('arsenal_trick_ammunition', 'j_outer_nw');
  add('mastermind_grand_strategist', 'j_outer_ne'); add('innovator_A3', 'j_outer_ne');
  add('innovator_signature_gadget', 'j_outer_se'); add('paragon_chi_blocking', 'j_outer_se');
  add('paragon_acrobatic_evasion', 'j_outer_sw'); add('arsenal_A1', 'j_outer_sw');

  // Connect the Synthesis nodes to form rings
  add('j_inner_nw', 'j_inner_ne'); add('j_inner_ne', 'j_inner_se');
  add('j_inner_se', 'j_inner_sw'); add('j_inner_sw', 'j_inner_nw');
  add('j_outer_nw', 'j_outer_ne'); add('j_outer_ne', 'j_outer_se');
  add('j_outer_se', 'j_outer_sw'); add('j_outer_sw', 'j_outer_nw');

  // Connect Inner and Outer Synthesis Rings
  add('j_inner_nw', 'j_outer_nw'); add('j_inner_ne', 'j_outer_ne');
  add('j_inner_se', 'j_outer_se'); add('j_inner_sw', 'j_outer_sw');

  return [...mastermindConnections, ...innovatorConnections, ...paragonConnections, ...arsenalConnections, ...newConnections];
} 