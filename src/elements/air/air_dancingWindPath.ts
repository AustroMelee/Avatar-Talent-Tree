/**
 * Path 4: The Dancing Wind - 舞風 (Wǔ Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "True freedom is not the absence of restraint, but perfect harmony with movement."
 * Essence: Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

// --- Layout Configuration (Relative to 0,0) ---
const CENTER_X = 0;
const CENTER_Y = 0;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI / 2; // Pointing "down" from its origin, will be rotated centrally
const ANGLE_SPREAD = Math.PI / 2.5;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 220;
const RADIUS_STEP = 160;
const MIN_DIST = 110;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Dancing Wind Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You learn that the key to airbending is flexibility and finding and following the path of least resistance. You embrace dynamic, constant movement.", flavor: "Let the wind lift your spirit." },
    
    // Minors after Genesis
    { id: 'enhanced_speed', name: 'Enhanced Speed', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Enhance your movement by decreasing air resistance around you, allowing you to run swiftly and even sprint up vertical surfaces.", flavor: "This technique can make an airbender almost too swift for the naked eye to see properly." },
    { id: 'minor_es_1', name: 'Smooth Stride', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'enhanced_speed', description: "Cut the air around you to limit wind resistance, allowing you to move even faster.", flavor: "The wind parts for you." },
    { id: 'minor_es_2', name: 'Gliding', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'enhanced_speed', description: "You master the use of a glider, which can be used in conjunction with your bending to fly as long as you can maintain the air currents.", flavor: "The sky is your playground." },
    { id: 'minor_es_3', name: 'Aerial Combat', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'enhanced_speed', description: "You can fight effectively while using the air spout, maintaining control and accuracy in flight.", flavor: "Battle is a dance in the sky." },

    // --- Sub-Path A: Aspect of Mobility ---
    { id: 'air_scooter', name: 'Air Scooter', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'enhanced_speed', description: "Form and ride a spherical 'ball' of air, allowing for high-speed travel across most surfaces and vertical walls.", flavor: "The invention of this technique by Aang earned him his master tattoos at a young age." },
    { id: 'minor_as_1', name: 'Wind Surfing', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'air_scooter', description: "You can ride air currents horizontally, allowing for high-speed travel across open areas.", flavor: "The wind is your highway." },
    { id: 'minor_as_2', name: 'Storm Flying', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'air_scooter', description: "You can fly safely through storms and adverse weather conditions.", flavor: "The storm is your ally, not your enemy." },
    { id: 'minor_as_3', name: 'High Altitude', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'air_scooter', description: "You can reach incredible heights and maintain flight at high altitudes.", flavor: "The sky is not the limit." },
    
    { id: 'flight', name: 'Flight', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_scooter', description: "The highest level of airbending. By releasing yourself of all earthly tethers, you achieve true and complete freedom, able to fly without any aid.", flavor: "A technique unlocked by Guru Laghima and, thousands of years later, by Zaheer." },

    // --- Sub-Path B: Aspect of Unpredictability ---
    { id: 'air_spout', name: 'Air Spout', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You create a powerful upward current of air that can lift you high into the sky, allowing for sustained flight and aerial combat.", flavor: "The wind lifts you above all obstacles." },
    { id: 'minor_asp_1', name: 'Air Stairs', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'air_spout', description: "You can create a series of air platforms to climb to great heights or cross large gaps.", flavor: "The sky is your staircase." },
    
    // Additional Minor Nodes
    { id: 'dw_minor_1', name: 'Graceful Descent', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can use minor air currents to slow any fall, preventing damage from all but the most extreme heights.", flavor: "Falling is just flying, for a moment." },
    { id: 'dw_minor_2', name: 'Uplifting Spirit', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'enhanced_speed', description: "Moving at high speeds grants you a small boost of morale and confidence.", flavor: "Let the wind lift your spirit." },
    { id: 'dw_minor_3', name: 'Vertical Rider', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'air_spout', description: "Your Air Spout can ascend vertical surfaces more easily.", flavor: "The sky is a road without limits." },
    { id: 'dw_minor_4', name: 'Enduring Ride', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'air_scooter', description: "Your Air Scooter lasts longer before dissipating.", flavor: "The dance never has to end." },
    { id: 'dw_minor_5', name: 'Weightless Soul', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'flight', description: "When you have truly let go of your earthly tethers, worldly concerns have less of a hold on you.", flavor: "Enter the void. Empty, and become wind." },
    { id: 'minor_ast_2', name: 'Floating Combat', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'air_spout', description: "You can fight effectively while walking on air, using the platforms for both mobility and tactical advantage.", flavor: "Battle is a dance on the wind." },
];

// --- Generation Code (Identical to other paths, just feeding it new data) ---
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'dancing_wind', constellation: 'air', position: { x, y }, prerequisites: prerequisites, visual: { 
      color: '#F0F8FF', 
      size: 50,
      icon: getAirNodeIcon(id) 
    }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost,
  };
  nodes.push(node);
  nodeMap[id] = node;
  prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: id, isActive: false, isLocked: false });
  });
});

// Force-Directed Repulsion
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
export const DANCING_WIND_NODES = nodes;
export const DANCING_WIND_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateDancingWindConnections(): TalentConnection[] { return connections; }
export const DANCING_WIND_METADATA = {
  name: 'The Dancing Wind',
  philosophy: 'True freedom is not the absence of restraint, but perfect harmony with movement.',
  essence: 'Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.',
  focus: 'Pure mobility and freedom, culminating in the ultimate achievement of flight.',
  sacredAnimal: 'The Flying Lemur',
  emoji: '🕊️',
  color: '#f0f8ff',
  position: { x: 1200, y: 1600 }
}; 