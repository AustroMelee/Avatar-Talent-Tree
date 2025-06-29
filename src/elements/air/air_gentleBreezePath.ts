/**
 * Path 1: The Gentle Breeze - 微風 (Wēi Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "Do not meet force with force; flow around it, and let the aggressor's strength become their own undoing."
 * Essence: Evasion, redirection of momentum, defensive mastery.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

// --- Layout Configuration ---
const CENTER_X = 1200;
const CENTER_Y = 900;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 200;
const RADIUS_STEP = 150;
const MIN_DIST = 110;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'The Gentle Breeze Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You learn to find and follow the path of least resistance. Your movements are fluid and evasive, making you a difficult target.", flavor: "Air is the element of freedom." },

  // Minors after Genesis
  { id: 'minor_genesis_1', name: 'Leaf on the Wind', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your body naturally aligns with air currents, slightly increasing your speed and agility.", flavor: "Be like the leaf; the wind cannot break what it can carry." },
  { id: 'minor_genesis_2', name: 'Light Step', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your movements are so light that you are difficult to track via vibrations through the earth.", flavor: "Toph could always tell it was you by your light walk." },

  // --- Sub-Path A: Aspect of Evasion ---
  { id: 'air_shield', name: 'Air Shield', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Throw up a gust of air close to your body as a shield, deflecting attacks by pushing them aside rather than stopping them directly.", flavor: "A wall can be broken, but how does one break the air?" },
  { id: 'minor_as_1', name: 'Repelling Gust', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'air_shield', description: "Upon deflecting an attack, the shield releases a focused gust, pushing the attacker away.", flavor: "A gentle push is more effective than a forceful shove." },
  
  { id: 'air_swipe', name: 'Air Swipe', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'air_shield', description: "Conjure a crescent-shaped wave of compressed air capable of deflecting colossal projectiles, like catapulted flaming rocks.", flavor: "Use the opponent's strength against them." },
  { id: 'minor_asw_1', name: 'Redirecting Current', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'air_swipe', description: "Your Air Swipe can redirect projectiles back toward the attacker.", flavor: "A gift returned is a lesson taught." },
  
  { id: 'enhanced_agility', name: 'Enhanced Agility', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_swipe', description: "You appear to flow around your opponents without expending any energy at all, letting them tire themselves out and creating exploitable openings.", flavor: "The constant movement required by this art makes masters difficult to hit." },
  { id: 'minor_ea_1', name: 'Twisting Wind', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'enhanced_agility', description: "You can effortlessly flow around blows like the wind itself.", flavor: "Stillness in motion is the mark of a master." },

  // --- Sub-Path B: Aspect of Redirection ---
  { id: 'air_cushion', name: 'Air Cushion', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Instinctively create a cushion of air to break anyone's fall, including your own, from great heights.", flavor: "To fall with grace is to fly." },
  { id: 'minor_ac_1', name: 'Safe Landing', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'air_cushion', description: "Your Air Cushion can protect multiple people or even very heavy objects.", flavor: "The wind catches all." },
  
  { id: 'air_vortex', name: 'Air Vortex', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'air_cushion', description: "Create a spinning funnel of air that can trap and disorient opponents, deflecting any objects thrown at it.", flavor: "In the center of the storm, there is only calm." },
  { id: 'minor_av_1', name: 'Returning Wind', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'air_vortex', description: "Your vortex is designed to pull in hurled objects and send them right back where they came from.", flavor: "The wind returns what it is given." },
  
  // Additional Minor Nodes
  { id: 'gb_minor_1', name: 'Whispering Wind', type: 'Minor', cost: 1, branch: 0.4, depth: 0.7, prerequisite: 'genesis', description: "You are more attuned to subtle changes in air currents, aiding your evasive maneuvers.", flavor: "The wind warns those who listen." },
  { id: 'gb_minor_2', name: 'Effortless Flow', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'air_shield', description: "Your defensive techniques consume slightly less stamina.", flavor: "True defense is as easy as breathing." },
  { id: 'gb_minor_3', name: 'Featherlike Landing', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'air_cushion', description: "You land from any height with absolute silence.", flavor: "The earth does not feel the landing of a single leaf." },
  { id: 'gb_minor_4', name: 'Constant Motion', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'air_vortex', description: "You find it easier to maintain momentum while moving defensively.", flavor: "The river is never still." },
  { id: 'gb_minor_5', name: 'Unburdened Spirit', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'air_swipe', description: "Your connection to the element of freedom makes you slightly more resistant to fear and intimidation.", flavor: "Freedom of the body begins with freedom of the mind." },
];

// --- Generation ---

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;

  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);

  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES);
  const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle));
  const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));

  const node: TalentNode = {
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'gentle_breeze', constellation: 'air', position: { x, y }, prerequisites: prerequisites, visual: { 
      color: '#B0E0E6', 
      size: 50, // Standardize size for now
      icon: getAirNodeIcon(id) 
    }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost,
  };
  
  nodes.push(node);
  nodeMap[id] = node;
  prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: id, isActive: false, isLocked: false });
  });
});

// --- Force-Directed Repulsion Algorithm ---
for (let iter = 0; iter < 100; iter++) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === 'Genesis') continue;
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.position.x - b.position.x;
            const dy = a.position.y - b.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MIN_DIST && dist > 0) {
                const moveFactor = (MIN_DIST - dist) / dist * 0.5;
                const moveX = dx * moveFactor;
                const moveY = dy * moveFactor;
                a.position.x += moveX;
                a.position.y += moveY;
                if (b.type !== 'Genesis') {
                    b.position.x -= moveX;
                    b.position.y -= moveY;
                }
            }
        }
    }
}

// --- Exports ---
export const GENTLE_BREEZE_NODES = nodes;
export const GENTLE_BREEZE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateGentleBreezeConnections(): TalentConnection[] { return connections; }
export const GENTLE_BREEZE_METADATA = {
  name: 'The Gentle Breeze',
  philosophy: 'Do not meet force with force; flow around it, and let the aggressor\'s strength become their own undoing.',
  essence: 'Evasion, redirection of momentum, defensive mastery.',
  focus: 'Traditional defensive Airbending, using an opponent\'s energy against them.',
  sacredAnimal: 'The Flying Lemur',
  emoji: '🍃',
  color: '#b3e6ff',
  position: { x: 1200, y: 900 }
}; 