/**
 * Path 4: The Dancing Wind - 舞風 (Wǔ Fēng) (Deterministically Generated)
 * 
 * Path Philosophy: "True freedom is not the absence of restraint, but perfect harmony with movement."
 * Essence: Freedom, joy, playfulness, the celebration of movement itself.
 * Focus: Mobility, flight, acrobatics, the pure joy of being airborne.
 * Sacred Animal: The Air Scooter Sprite - playful, free, born of pure motion.
 *
 * REFACTOR: Updated to match the "Four Winds Constellation" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800;
const CENTER_Y = 600;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'Essence of Freedom', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Enhanced jumping, immunity to fall damage, ability to change direction in mid-air.", flavor: "True freedom is not the absence of restraint, but perfect harmony with movement." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Uplifting Spirit', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your air-jumps carry you higher.", flavor: "Let the wind lift your spirit." },
    { id: 'minor_genesis_2', name: 'Graceful Descent', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Perfect control over your falling trajectory.", flavor: "To fall with grace is to fly." },

    // --- Sub-Path A: Aspect of Horizontal Flow ---
    { id: 'A1', name: 'Sky Sailing', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Deploy air currents beneath you for extended horizontal gliding.", flavor: "The sky is an ocean, and you are its sailor." },
    { id: 'minor_a1_1', name: 'Swift Sailing', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Glide much faster through the air." },
    { id: 'minor_a1_2', name: 'Agile Turns', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Make sharp directional changes while gliding." },
    { id: 'minor_a1_3', name: 'Longer Glide', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your gliding can be maintained for longer distances.", flavor: "The wind carries you far." },
    
    { id: 'A2', name: 'Air Scooter', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create a spinning ball of air to ride at high speed.", flavor: "Movement is a form of joy." },
    { id: 'minor_a2_1', name: 'Enduring Ride', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "The air scooter lasts much longer." },
    { id: 'minor_a2_2', name: 'All-Terrain Ball', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Maintain speed over rough ground and water." },
    { id: 'minor_a2_3', name: 'Faster Scooter', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your air scooter moves at greater speeds.", flavor: "The wind carries you swiftly." },
    
    { id: 'A3', name: 'Sky Dancing', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Perform evasive barrel rolls and devastating dive-bomb attacks.", flavor: "The sky is a stage, and you are the dancer." },
    { id: 'minor_a3_1', name: 'Perfect Form', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your aerial maneuvers are more effective." },
    { id: 'minor_a3_2', name: 'Extended Dance', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Chain multiple maneuvers together." },
    { id: 'minor_a3_3', name: 'Graceful Dance', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your aerial maneuvers are more graceful and efficient.", flavor: "The dance grows more beautiful." },
    
    { id: 'APEX_A', name: 'Sky Sovereign', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Surround yourself with protective winds while airborne.", flavor: "The air itself is your armor and your steed." },
    { id: 'minor_apex_a_1', name: 'Stronger Winds', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your protective winds are stronger and more effective.", flavor: "The wind protects with greater strength." },
    { id: 'minor_apex_a_2', name: 'Wider Winds', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your protective winds cover a larger area.", flavor: "The wind's protection spreads wide." },
    { id: 'minor_apex_a_3', name: 'Longer Winds', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Your protective winds last longer while airborne.", flavor: "The wind's protection endures." },

    // --- Sub-Path B: Aspect of Vertical Mastery ---
    { id: 'B1', name: 'Spiraling Spout', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Create a column of rising air to launch yourself to great heights.", flavor: "Ascend. The sky is waiting." },
    { id: 'minor_b1_1', name: 'Higher Spout', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Achieve much greater heights." },
    { id: 'minor_b1_2', name: 'Stable Column', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Easier to enter and ride the air spout." },
    { id: 'minor_b1_3', name: 'Faster Spout', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your air spout launches you more quickly.", flavor: "The wind lifts you swiftly." },
    
    { id: 'B2', name: 'Wind Sprint', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Summon a powerful tailwind for explosive bursts of speed.", flavor: "Let the wind carry you." },
    { id: 'minor_b2_1', name: 'Sustained Wind', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "The speed boost lasts longer." },
    { id: 'minor_b2_2', name: 'Trailing Breeze', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Maintain enhanced speed after the sprint." },
    { id: 'minor_b2_3', name: 'Stronger Sprint', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your wind sprint provides even greater speed boosts.", flavor: "The wind carries you faster." },
    
    { id: 'B3', name: 'Aerial Mastery', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Hover motionlessly in place and ride air currents vertically.", flavor: "Stillness in motion is the mark of a master." },
    { id: 'minor_b3_1', name: 'Perfect Hover', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Hover with absolute stability." },
    { id: 'minor_b3_2', name: 'Vertical Rider', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your air scooter can climb sheer surfaces." },
    { id: 'minor_b3_3', name: 'Longer Hover', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "You can hover for longer periods without effort.", flavor: "The master's stillness endures." },
    
    { id: 'APEX_B', name: 'Wind Walker', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Perceive and ride natural wind currents anywhere.", flavor: "The wind has paths unseen by the grounded." },
    { id: 'minor_apex_b_1', name: 'Clearer Paths', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "You can perceive wind currents more clearly and from greater distances.", flavor: "The wind's paths are clear." },
    { id: 'minor_apex_b_2', name: 'Faster Riding', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "You can ride wind currents more quickly and efficiently.", flavor: "The wind carries you swiftly." },
    { id: 'minor_apex_b_3', name: 'Multiple Currents', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can ride multiple wind currents simultaneously.", flavor: "The wind has many paths." },

    // --- Sub-Path C: Aspect of Boundless Motion ---
    { id: 'C1', name: 'Reckless Joy', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Achieve extreme altitudes at the cost of your own life force.", flavor: "To touch the sun, you must be willing to be burned." },
    { id: 'minor_c1_1', name: 'High Altitude Training', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Reduce the life force cost." },
    { id: 'minor_c1_2', name: 'Soaring Vigor', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Use abilities more frequently at height." },
    { id: 'minor_c1_3', name: 'Higher Heights', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "You can achieve even greater altitudes.", flavor: "The sky has no limits." },
    
    { id: 'C2', name: 'Swift Takeoff', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Instantly activate movement abilities with greatly reduced recovery time.", flavor: "The first moment of flight is the most important." },
    { id: 'minor_c2_1', name: 'Explosive Start', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Even greater initial burst of speed." },
    { id: 'minor_c2_2', name: 'Evasive Launch', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Brief intangibility when using movement." },
    { id: 'minor_c2_3', name: 'Faster Recovery', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your movement abilities recover even more quickly.", flavor: "The wind answers instantly." },
    
    { id: 'C3', name: 'Freedom\'s Flight', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Temporarily gain unlimited air-jumps and air-dashes.", flavor: "For a moment, all chains are broken." },
    { id: 'minor_c3_1', name: 'Extended Freedom', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "The unlimited ability lasts longer." },
    { id: 'minor_c3_2', name: 'Perfect Control', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Even more precise aerial maneuvering." },
    { id: 'minor_c3_3', name: 'Greater Freedom', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your unlimited movement abilities are even more powerful.", flavor: "The freedom grows greater." },
    
    { id: 'APEX_C', name: 'Boundless Sky', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Achieve perfect three-dimensional movement in any direction.", flavor: "The sky is not the limit. It is the beginning." },
    { id: 'minor_apex_c_1', name: 'Faster Movement', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your three-dimensional movement is faster and more fluid.", flavor: "The sky answers swiftly." },
    { id: 'minor_apex_c_2', name: 'Perfect Control', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your three-dimensional movement is even more precise and controlled.", flavor: "The sky is perfectly controlled." },
    { id: 'minor_apex_c_3', name: 'Boundless Range', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Your three-dimensional movement can cover greater distances.", flavor: "The sky's reach is boundless." },

    // --- Synthesis & Bridge ---
    { id: 'SYNTHESIS_A_B', name: 'Freedom Mastery', type: 'Synthesis', cost: 5, branch: 0.5, depth: 4, prerequisite: ['APEX_A', 'APEX_B'], description: "Combine horizontal flow with vertical mastery for ultimate freedom." },
    { id: 'BRIDGE_B', name: 'Cross-Path Bridge', type: 'Bridge', cost: 10, branch: 1.5, depth: 4.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Gain access to Synthesis Opportunity." },

    // --- Endgame Choices ---
    { id: 'rite_wind', name: 'Trial of the Wind', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Achieve perfect harmony with natural air currents.", flavor: "Do not command the wind. Become it." },
    { id: 'rite_freedom', name: 'Trial of Freedom', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Move without any restriction for an extended time.", flavor: "True freedom is a state of mind." },
    { id: 'rite_sky', name: 'Trial of the Sky', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Demonstrate complete mastery over three-dimensional space.", flavor: "The sky is yours to command." },

    { id: 'cap_flight', name: 'True Flight', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_wind', description: "Gain genuine, unassisted flight with no need for techniques or aids.", flavor: "The dream of all airbenders, realized." },
    { id: 'cap_mastery', name: 'Master of Air and Sky', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_freedom', description: "Become supreme in aerial combat, using your mobility as both weapon and shield.", flavor: "The sky is my fortress and my sword." },
    { id: 'cap_freedom', name: 'Freedom Incarnate', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_sky', description: "Embody the very concept of freedom, inspiring and empowering all around you.", flavor: "My freedom is a beacon for all." },

    { id: 'schism_momentum', name: 'Momentum\'s Slave', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Move at incredible speed but lose fine control - slide when stopping, slow turning.", flavor: "To be truly fast, one must give up control." },
    { id: 'schism_bullet', name: 'Bullet Wind', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_momentum', description: "Become pure kinetic force, devastating in speed but unable to stop or change direction easily.", flavor: "I am not a bender. I am a weapon." },
];

// --- Generation Code (Identical to Gentle Breeze, just feeding it new data) ---
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
      color: '#e1f5fe', 
      size: 50,
      icon: getDancingWindNodeIcon(type) 
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
  essence: 'Freedom, joy, playfulness, the celebration of movement itself.',
  focus: 'Mobility, flight, acrobatics, the pure joy of being airborne.',
  sacredAnimal: 'The Air Scooter Sprite',
  emoji: '🤸',
  color: '#e1f5fe',
  position: { x: 800, y: 600 }
};

function getDancingWindNodeIcon(type: string): string {
  switch (type) {
    case 'Genesis': return '🕊️';
    case 'Keystone': return '🤸';
    case 'Manifestation': return '🪁';
    case 'Axiom': return '💫';
    case 'Capstone': return '🦅';
    case 'GnosticRite': return '🙏';
    case 'Schism': return '☄️';
    case 'Minor': return '🪶';
    default: return '🌬️';
  }
} 