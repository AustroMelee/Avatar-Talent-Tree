/**
 * Path 3: The Master's Flame - "Discipline Made Manifest"
 * Philosophy: "Fire without control is mere destruction. The master shapes flame as the smith shapes metal - with precision, patience, and purpose."
 * Focus: Perfect technique, shaped fire, defensive mastery.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 1000; const CENTER_Y = 500; const BRANCHES = 3;
const PATH_MAIN_ANGLE = 0; // To the right
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'Ember of Control', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your fire responds to precise mental commands, allowing you to sustain and shape your flames with greater ease.", flavor: "The mind is the hand that shapes the flame." },

    // SUB-PATH A
    { id: 'A1', name: 'Flame Shield', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Create a small, solid shield of fire that can block physical attacks.", flavor: "The best offense is a good, flammable defense." },
    { id: 'minor_a1_1', name: 'Larger Shield', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your flame shield is larger and can block more attacks.", flavor: "A bigger shield protects more." },
    { id: 'minor_a1_2', name: 'Hotter Shield', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your flame shield burns enemies who attack it.", flavor: "The best defense is a painful offense." },
    { id: 'minor_a1_3', name: 'Durable Shield', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your flame shield lasts longer before dissipating.", flavor: "Endurance is the mark of mastery." },
    
    { id: 'A2', name: 'Fire Daggers', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create short, solid blades of fire for close-quarters combat. They do not burn you.", flavor: "A blade of fire is a blade of pure will." },
    { id: 'minor_a2_1', name: 'Sharper Blades', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your fire daggers are sharper and deal more damage.", flavor: "The edge of will cuts deep." },
    { id: 'minor_a2_2', name: 'Longer Blades', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your fire daggers have greater reach.", flavor: "Distance is the weapon of the wise." },
    { id: 'minor_a2_3', name: 'Dual Wielding', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "You can create and wield two fire daggers simultaneously.", flavor: "Two blades are better than one." },
    
    { id: 'A3', name: 'Fire Whip', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Create a long, flexible whip of fire to disarm, trip, and attack enemies from a distance.", flavor: "Control is not about rigidity, but about flexibility." },
    { id: 'minor_a3_1', name: 'Longer Whip', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your fire whip has greater reach.", flavor: "The whip reaches where the hand cannot." },
    { id: 'minor_a3_2', name: 'Faster Crack', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your fire whip can be cracked more quickly for rapid attacks.", flavor: "Speed is the essence of the whip." },
    { id: 'minor_a3_3', name: 'Precise Control', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your fire whip can be controlled with greater precision for complex maneuvers.", flavor: "Precision is the mark of the master." },
    
    { id: 'APEX_A', name: 'The Smith\'s Hand', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "You can create complex, solid constructs of fire that persist until destroyed, such as armor, cages, or bridges.", flavor: "The world is my forge, and fire is my hammer." },
    { id: 'minor_apex_a_1', name: 'Larger Constructs', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "You can create larger and more complex fire constructs.", flavor: "The smith's hand grows more skilled." },
    { id: 'minor_apex_a_2', name: 'Durable Constructs', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your fire constructs last longer before dissipating.", flavor: "The master's work endures." },
    { id: 'minor_apex_a_3', name: 'Complex Designs', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can create more intricate and detailed fire constructs.", flavor: "Beauty is in the details." },

    // SUB-PATH B
    { id: 'B1', name: 'Deflecting Arc', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Sweep an arc of fire in front of you, deflecting incoming projectiles and pushing enemies back.", flavor: "Meet force with force, but with superior technique." },
    { id: 'minor_b1_1', name: 'Wider Arc', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your deflecting arc covers a wider area.", flavor: "More ground, more protection." },
    { id: 'minor_b1_2', name: 'Stronger Push', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Enemies are pushed back further by your deflecting arc.", flavor: "Distance is the best defense." },
    { id: 'minor_b1_3', name: 'Faster Arc', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "You can sweep your deflecting arc more quickly.", flavor: "Speed is the essence of defense." },
    
    { id: 'B2', name: 'Heat Control', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "You can precisely control the temperature of your flames, from a gentle warmth to a searing heat.", flavor: "The difference between a burn and a brand is control." },
    { id: 'minor_b2_1', name: 'Finer Control', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "You can control temperature with even greater precision.", flavor: "The master's touch is gentle." },
    { id: 'minor_b2_2', name: 'Extreme Temperatures', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "You can achieve more extreme temperatures in both directions.", flavor: "The master knows no limits." },
    { id: 'minor_b2_3', name: 'Rapid Changes', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "You can change the temperature of your flames more quickly.", flavor: "Adaptation is the key to survival." },
    
    { id: 'B3', name: 'Circle of Fire', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Create a ring of fire around you that acts as a barrier, preventing enemies from passing but allowing allies and projectiles through.", flavor: "This is my space. You are not welcome." },
    { id: 'minor_b3_1', name: 'Larger Circle', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your circle of fire covers a larger area.", flavor: "The circle of protection grows." },
    { id: 'minor_b3_2', name: 'Higher Barrier', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your circle of fire creates a taller barrier.", flavor: "The wall reaches for the sky." },
    { id: 'minor_b3_3', name: 'Selective Barrier', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "You can choose which allies can pass through your circle of fire.", flavor: "The master chooses who enters." },
    
    { id: 'APEX_B', name: 'Master of the Flame', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "You can redirect and even extinguish the fire of other, lesser firebenders, asserting your dominance.", flavor: "There is only one master flame here. Mine." },
    { id: 'minor_apex_b_1', name: 'Greater Control', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "You can control the fire of more powerful firebenders.", flavor: "The master's authority grows." },
    { id: 'minor_apex_b_2', name: 'Faster Redirection', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "You can redirect enemy fire more quickly and efficiently.", flavor: "The master's reflexes are unmatched." },
    { id: 'minor_apex_b_3', name: 'Dominance Aura', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Your presence alone weakens the fire of lesser firebenders.", flavor: "The master's presence commands respect." },

    // SUB-PATH C
    { id: 'C1', name: 'Steady Flame', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Your sustained fire abilities (like Flame Breath) are more efficient and can be maintained for longer.", flavor: "Patience is the wick that keeps the candle burning." },
    { id: 'minor_c1_1', name: 'Longer Duration', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your sustained fire abilities last even longer.", flavor: "The flame that never dies." },
    { id: 'minor_c1_2', name: 'More Efficient', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Your sustained fire abilities cost less energy to maintain.", flavor: "Efficiency is the mark of mastery." },
    { id: 'minor_c1_3', name: 'Steady Focus', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your sustained fire abilities are less affected by distractions and interruptions.", flavor: "The master's focus is unbreakable." },
    
    { id: 'C2', name: 'Fire Blade', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Extend a long, sharp blade of fire from your hand, functioning as a sword with superior reach.", flavor: "The perfect cut leaves no trace." },
    { id: 'minor_c2_1', name: 'Longer Blade', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your fire blade has greater reach.", flavor: "Distance is no obstacle." },
    { id: 'minor_c2_2', name: 'Sharper Edge', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your fire blade cuts through armor more easily.", flavor: "The master's blade knows no resistance." },
    { id: 'minor_c2_3', name: 'Dual Blades', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "You can create two fire blades simultaneously.", flavor: "Two blades dance as one." },
    
    { id: 'C3', name: 'Dancing Dragon', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Perform the ancient 'Dancing Dragon' form, weaving intricate patterns of multi-colored fire that both defend and attack.", flavor: "Fire is not just a weapon. It is an art." },
    { id: 'minor_c3_1', name: 'More Colors', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your dancing dragon form uses more colors and patterns.", flavor: "The dragon's dance grows more beautiful." },
    { id: 'minor_c3_2', name: 'Faster Dance', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your dancing dragon form can be performed more quickly.", flavor: "The dragon's dance is swift and deadly." },
    { id: 'minor_c3_3', name: 'Larger Pattern', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Your dancing dragon form creates larger patterns that affect more enemies.", flavor: "The dragon's dance covers all." },
    
    { id: 'APEX_C', name: 'The Unburnable', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your mastery of heat is so perfect that you can no longer be burned by any fire, magical or mundane.", flavor: "How can you be burned by that which you command?" },
    { id: 'minor_apex_c_1', name: 'Heat Absorption', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "You can absorb heat from fire attacks to heal yourself.", flavor: "The master turns attack into sustenance." },
    { id: 'minor_apex_c_2', name: 'Fire Immunity', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "You are completely immune to all fire damage, even from magical sources.", flavor: "The master fears no flame." },
    { id: 'minor_apex_c_3', name: 'Heat Manipulation', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can manipulate the heat around you, creating areas of extreme cold or heat.", flavor: "The master controls all temperature." },

    // ENDGAME
    { id: 'rite_precision', name: 'Trial of Precision', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Create a perfect, interlocking chain of fire, with each link a different color.", flavor: "Perfection is in the details." },
    { id: 'rite_control', name: 'Trial of Control', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Hold a single, tiny flame steady on your fingertip in the heart of a hurricane.", flavor: "The will is the anchor of the flame." },
    { id: 'rite_discipline', name: 'Trial of Discipline', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Meditate for a day and night in a ring of fire, maintaining its perfect shape through sheer concentration.", flavor: "Discipline is the forge of mastery." },
    { id: 'cap_flame_shaper', name: 'The Flame-Shaper', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_precision', description: "Your fire constructs are now as permanent and durable as stone, allowing you to create lasting works of art or impenetrable fortresses.", flavor: "I will build a new world in fire." },
    { id: 'cap_fire_eater', name: 'The Fire-Eater', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_control', description: "You can absorb any external fire, adding its energy to your own. You can even absorb the heat from the air, creating intense cold.", flavor: "Your fire is now my fire." },
    { id: 'cap_dragon_soul', name: 'The Dragon Soul', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_discipline', description: "You have achieved perfect harmony with fire. You can generate the legendary multi-colored flames of the dragons, the source of all firebending.", flavor: "I have looked into the heart of the flame and seen its true colors." },
    { id: 'schism_glass_cannon', name: 'The Glass Cannon', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your fire attacks become perfectly precise and unerring, but you lose the ability to create defensive flames, leaving you vulnerable.", flavor: "The only defense needed is a perfect offense." },
    { id: 'schism_brittle_flame', name: 'The Brittle Flame', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_glass_cannon', description: "Your fire constructs are incredibly sharp and deadly, but they are as brittle as glass and shatter on impact, creating a field of dangerous shards.", flavor: "Perfection is a fragile thing." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'masters_flame', constellation: 'fire', position: { x, y }, prerequisites, visual: { color: '#f38ba8', size: 50, icon: getMastersFlameNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const MASTERS_FLAME_NODES = nodes;
export const MASTERS_FLAME_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateMastersFlameConnections(): TalentConnection[] { return connections; }
export const MASTERS_FLAME_METADATA = { name: 'The Master\'s Flame', philosophy: "Fire without control is mere destruction.", essence: "Discipline, precision, and purpose.", focus: "Perfect technique, shaped fire, defensive mastery.", sacredAnimal: "The Smith", emoji: '🛠️', color: '#f38ba8', position: { x: 1000, y: 500 } };

function getMastersFlameNodeIcon(type: string): string {
  switch (type) { 
    case 'Genesis': return '👌'; 
    case 'Keystone': return '🛡️'; 
    case 'Manifestation': return '⚔️'; 
    case 'Axiom': return '🎯'; 
    case 'Capstone': return '🥋'; 
    case 'GnosticRite': return '🙏'; 
    case 'Schism': return '🧊'; 
    case 'Minor': return '👌'; 
    default: return '👌'; 
  }
}