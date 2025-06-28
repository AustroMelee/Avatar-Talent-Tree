/**
 * Path 3: The Wild Gale - 狂風 (Kuáng Fēng) (Deterministically Generated)
 * 
 * Path Philosophy: "Sometimes the mountain must be moved, and only the hurricane has such strength."
 * Essence: Raw power, decisive action, the fury of nature unleashed.
 * Focus: Offensive techniques, storm mastery, overwhelming force.
 * Sacred Animal: The Dragon - primal power, elemental fury, force of nature.
 *
 * REFACTOR: Updated to match the "Four Winds Constellation" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 700;
const CENTER_Y = 550;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI; // Leftwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Wild Gale Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "All attacks carry concussive force, staggering smaller opponents.", flavor: "Sometimes the mountain must be moved, and only the hurricane has such strength." },

    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Stronger Gale', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your natural pushback affects heavier opponents.", flavor: "The wind does not discriminate." },
    { id: 'minor_genesis_2', name: 'Wider Storm', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your staggering force affects a larger area.", flavor: "The storm's reach is vast." },

    // --- Sub-Path A: Aspect of Raw Power ---
    { id: 'A1', name: 'Focused Gale', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Launch a concentrated blast of air that damages and pushes distant enemies.", flavor: "A focused mind is a powerful weapon." },
    { id: 'minor_a1_1', name: 'Extended Reach', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your air blast travels much further.", flavor: "The wind knows no distance." },
    { id: 'minor_a1_2', name: 'Stunning Impact', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Direct hits briefly stun the target.", flavor: "The impact echoes in the mind." },
    { id: 'minor_a1_3', name: 'Stronger Blast', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your air blast deals more damage and pushes enemies further.", flavor: "The gale's fury grows." },
    
    { id: 'A2', name: 'Explosive Burst', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create a violent explosion of air that knocks enemies away from you.", flavor: "Sometimes, a whisper is not enough." },
    { id: 'minor_a2_1', name: 'Greater Blast', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "The explosion affects a much larger area.", flavor: "The storm's reach expands." },
    { id: 'minor_a2_2', name: 'Echo Blast', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Secondary shockwaves extend the effect.", flavor: "The explosion echoes through the air." },
    { id: 'minor_a2_3', name: 'Faster Burst', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your explosive burst charges and releases more quickly.", flavor: "The storm answers swiftly." },
    
    { id: 'A3', name: 'Thunder Clap', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Generate a sonic boom that deafens and disorients all nearby enemies.", flavor: "The sound of the storm is a weapon in itself." },
    { id: 'minor_a3_1', name: 'Deafening Roar', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Greater area and stronger disorientation.", flavor: "The thunder's voice is overwhelming." },
    { id: 'minor_a3_2', name: 'Reverberating Thunder', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Multiple echoes affect enemies at the edges.", flavor: "The sound echoes through the soul." },
    { id: 'minor_a3_3', name: 'Longer Disorientation', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "The disorientation effect lasts longer on affected enemies.", flavor: "The thunder's memory lingers." },
    
    { id: 'APEX_A', name: 'Lightning Lord', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Transform your air blasts into devastating lightning strikes.", flavor: "The cold fire of the sky." },
    { id: 'minor_apex_a_1', name: 'Stronger Lightning', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your lightning strikes deal more damage.", flavor: "The sky's fury burns brighter." },
    { id: 'minor_apex_a_2', name: 'Chain Lightning', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your lightning can chain between multiple enemies.", flavor: "The lightning seeks all targets." },
    { id: 'minor_apex_a_3', name: 'Faster Strikes', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can fire lightning strikes more rapidly.", flavor: "The storm's fury is unrelenting." },

    // --- Sub-Path B: Aspect of Controlled Chaos ---
    { id: 'B1', name: 'Spinning Vortex', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Generate a stationary tornado that pulls enemies in and damages them.", flavor: "Chaos, contained." },
    { id: 'minor_b1_1', name: 'Stronger Pull', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "The vortex is much harder to escape.", flavor: "The whirlwind's grip is iron." },
    { id: 'minor_b1_2', name: 'Lasting Funnel', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your tornado persists much longer.", flavor: "The storm endures." },
    { id: 'minor_b1_3', name: 'Larger Vortex', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your tornado covers a larger area and affects more enemies.", flavor: "The whirlwind grows vast." },
    
    { id: 'B2', name: 'Earth Shaker', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Strike the earth to create damaging shockwaves that stun enemies.", flavor: "The earth trembles before the storm." },
    { id: 'minor_b2_1', name: 'Wider Shockwave', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "The tremor travels much further.", flavor: "The earth's fear spreads far." },
    { id: 'minor_b2_2', name: 'Longer Stun', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Enemies remain stunned longer.", flavor: "The earth's memory is long." },
    { id: 'minor_b2_3', name: 'Stronger Tremor', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your shockwaves deal more damage and affect larger enemies.", flavor: "The earth's fury is great." },
    
    { id: 'B3', name: 'Hurricane Force', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Create a massive hurricane that lifts and hurls even large enemies.", flavor: "Become the storm." },
    { id: 'minor_b3_1', name: 'Mightier Storm', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Affect even larger and heavier enemies.", flavor: "The storm fears no size." },
    { id: 'minor_b3_2', name: 'Raging Winds', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "The hurricane moves faster and hits harder.", flavor: "The storm's fury grows." },
    { id: 'minor_b3_3', name: 'Larger Hurricane', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your hurricane covers a much larger area.", flavor: "The storm's reach is vast." },
    
    { id: 'APEX_B', name: 'Storm Sovereign', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Create and control several seeking tornadoes simultaneously.", flavor: "The storm has many voices." },
    { id: 'minor_apex_b_1', name: 'More Tornadoes', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "You can control more tornadoes at once.", flavor: "The storm speaks in many tongues." },
    { id: 'minor_apex_b_2', name: 'Smarter Seeking', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your tornadoes are more intelligent in seeking targets.", flavor: "The storm knows its prey." },
    { id: 'minor_apex_b_3', name: 'Longer Control', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can maintain control over your tornadoes longer.", flavor: "The storm's will endures." },

    // --- Sub-Path C: Aspect of Storm Mastery ---
    { id: 'C1', name: 'Overcharged Power', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Dramatically increase your power at the cost of your own life force.", flavor: "Power at a price." },
    { id: 'minor_c1_1', name: 'Efficient Channeling', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Reduce the life force cost.", flavor: "The price of power grows smaller." },
    { id: 'minor_c1_2', name: 'Amplified Power', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Gain even greater power from overcharging.", flavor: "The storm's fury grows greater." },
    { id: 'minor_c1_3', name: 'Longer Overcharge', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "You can maintain the overcharged state longer.", flavor: "The storm's power endures." },
    
    { id: 'C2', name: 'Cutting Gale', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Create razor-sharp currents of air that slice enemies and cause bleeding.", flavor: "The wind's edge is sharper than any blade." },
    { id: 'minor_c2_1', name: 'Sharper Edge', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Cause more severe bleeding effects.", flavor: "The wind cuts deeper." },
    { id: 'minor_c2_2', name: 'Extended Blades', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your cutting air travels further.", flavor: "The wind's reach grows." },
    { id: 'minor_c2_3', name: 'Multiple Cuts', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "You can create multiple cutting air streams simultaneously.", flavor: "The wind strikes from many angles." },
    
    { id: 'C3', name: 'Perfect Storm', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Temporarily enhance all your abilities without any negative effects.", flavor: "The brief, perfect calm in the eye of the hurricane." },
    { id: 'minor_c3_1', name: 'Extended Storm', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "The enhancement lasts longer.", flavor: "The perfect storm endures." },
    { id: 'minor_c3_2', name: 'Greater Power', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Even more dramatic improvements to your abilities.", flavor: "The storm's power grows greater." },
    { id: 'minor_c3_3', name: 'Faster Activation', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "You can activate the perfect storm more quickly.", flavor: "The storm answers instantly." },
    
    { id: 'APEX_C', name: 'Weather Master', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Control natural weather patterns across vast areas.", flavor: "The sky is my canvas." },
    { id: 'minor_apex_c_1', name: 'Larger Control', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "You can control weather over larger areas.", flavor: "The sky's domain grows vast." },
    { id: 'minor_apex_c_2', name: 'Faster Changes', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "You can change weather patterns more quickly.", flavor: "The sky answers swiftly." },
    { id: 'minor_apex_c_3', name: 'Complex Weather', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can create more complex and powerful weather patterns.", flavor: "The sky's artistry grows complex." },

    // --- Synthesis & Bridge ---
    { id: 'SYNTHESIS_A_B', name: 'Storm Mastery', type: 'Synthesis', cost: 5, branch: 0.5, depth: 4, prerequisite: ['APEX_A', 'APEX_B'], description: "Combine raw power with controlled chaos for ultimate storm mastery.", flavor: "The storm is my domain." },
    { id: 'BRIDGE_B', name: 'Cross-Path Bridge', type: 'Bridge', cost: 10, branch: 1.5, depth: 4.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Gain access to Synthesis Opportunity.", flavor: "The path is open. The choice is yours." },

    // --- Endgame Choices ---
    { id: 'rite_storm', name: 'Trial of the Storm', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Channel raw destructive power without losing control.", flavor: "To ride the storm, you must become the storm." },
    { id: 'rite_lightning', name: 'Trial of Lightning', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Strike with perfect precision despite overwhelming force.", flavor: "Precision in chaos is true mastery." },
    { id: 'rite_eye', name: 'Trial of the Eye', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Maintain perfect awareness within absolute chaos.", flavor: "Clarity in the heart of the maelstrom." },

    { id: 'cap_fury', name: 'Controlled Fury', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_storm', description: "Master the art of overcharging without cost - your abilities are permanently enhanced without requiring life force.", flavor: "The fury of the storm, tempered by the will of the master." },
    { id: 'cap_avatar', name: 'Lightning Avatar', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_lightning', description: "Become one with lightning itself - strike with perfect accuracy, chain between targets, and even ride your own bolts.", flavor: "I am the flash, the thunder, the storm." },
    { id: 'cap_eye', name: 'Eye of All Storms', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_eye', description: "Achieve perfect clarity in chaos - predict weather, sense all threats, and maintain absolute calm in any situation.", flavor: "All storms are one storm, and I am its eye." },
    
    { id: 'schism_hurricane', name: 'Living Hurricane', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Become surrounded by a constant chaotic storm, but lose control over individual techniques.", flavor: "Let the storm rage. I am its heart." },
    { id: 'schism_destruction', name: 'Avatar of Destruction', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_hurricane', description: "Transform into a force of pure destruction, reshaping the world but losing all restraint.", flavor: "I am no longer the bender. I am the storm." },
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'wild_gale', constellation: 'air', position: { x, y }, prerequisites: prerequisites, visual: { 
      color: '#b2ebf2', 
      size: 50,
      icon: getWildGaleNodeIcon(type) 
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
export const WILD_GALE_NODES = nodes;
export const WILD_GALE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateWildGaleConnections(): TalentConnection[] { return connections; }
export const WILD_GALE_METADATA = {
  name: 'The Wild Gale',
  philosophy: 'Sometimes the mountain must be moved, and only the hurricane has such strength.',
  essence: 'Raw power, decisive action, the fury of nature unleashed.',
  focus: 'Offensive techniques, storm mastery, overwhelming force.',
  sacredAnimal: 'The Dragon',
  emoji: '🐲',
  color: '#b2ebf2',
  position: { x: 700, y: 550 }
};

function getWildGaleNodeIcon(type: string): string {
  switch (type) {
    case 'Genesis': return '🌪️';
    case 'Keystone': return '💥';
    case 'Manifestation': return '⛈️';
    case 'Axiom': return '⚡';
    case 'Capstone': return '🐉';
    case 'GnosticRite': return '🙏';
    case 'Schism': return '🌋';
    case 'Minor': return '💨';
    default: return '🌬️';
  }
} 