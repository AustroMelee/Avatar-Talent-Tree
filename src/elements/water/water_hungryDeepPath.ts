/**
 * Path 4: The Hungry Deep - Pressure of the Abyss (Deterministically Generated)
 *
 * Path Philosophy: The ocean's deepest truth is hunger. It swallows islands, drowns civilizations...
 * Focus: Overwhelming force, pressure mastery, and the ocean's consuming nature.
 *
 * REFACTOR: Populated all descriptions and philosophies to match the design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800; const CENTER_Y = 600; const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Hungry Deep Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your water attacks carry immense weight, slowing and staggering enemies.", flavor: "The ocean's deepest truth is hunger." },

    // SUB-PATH A
    { id: 'A1', name: 'Herald of Consuming Tides', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Launch a powerful wave that knocks enemies down and drags them back towards you.", flavor: "The tide comes in, and the tide goes out. It always takes something with it." },
    { id: 'minor_a1_1', name: 'Riptide', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "The dragging effect of your wave is stronger.", flavor: "The undertow is a patient hunter." },
    { id: 'minor_a1_2', name: 'Crushing Wave', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "The initial impact of the wave deals more damage.", flavor: "The ocean's slap." },
    { id: 'minor_a1_3', name: 'Longer Wave', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your wave travels further and affects a larger area.", flavor: "The tide reaches far." },
    
    { id: 'A2', name: 'Shepherd of the Hungering Current', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create a whirlpool that pulls enemies into its center, crushing them with immense pressure.", flavor: "The abyss has a gravitational pull all its own." },
    { id: 'minor_a2_1', name: 'Stronger Vortex', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "The pull of your whirlpool is stronger and wider.", flavor: "There is no escape from the spiral." },
    { id: 'minor_a2_2', name: 'Deeper Vortex', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your whirlpool deals more crushing damage to enemies caught within it.", flavor: "The pressure grows unbearable." },
    { id: 'minor_a2_3', name: 'Longer Vortex', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your whirlpool persists longer and is harder to escape.", flavor: "The spiral never ends." },
    
    { id: 'A3', name: 'Summon the Abyssal Maw', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Open a temporary rift to the abyssal plane, creating a zone of crushing, damaging pressure that devours projectiles.", flavor: "Listen closely, and you can hear the deep chewing." },
    { id: 'minor_a3_1', name: 'Larger Maw', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your abyssal rift covers a larger area.", flavor: "The maw grows wider." },
    { id: 'minor_a3_2', name: 'Stronger Pressure', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "The crushing pressure within your rift deals more damage.", flavor: "The deep's hunger grows." },
    { id: 'minor_a3_3', name: 'Longer Rift', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your abyssal rift remains open longer.", flavor: "The deep is patient." },
    
    { id: 'APEX_A', name: 'Certainty: The Deep Claims All', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Enemies defeated by your pressure abilities are consumed, unable to be revived or resurrected.", flavor: "What the deep takes, it keeps." },
    { id: 'minor_apex_a_1', name: 'Stronger Consumption', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your consumption effect is more potent and harder to resist.", flavor: "The deep's claim is absolute." },
    { id: 'minor_apex_a_2', name: 'Wider Consumption', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your consumption affects more enemies simultaneously.", flavor: "The deep claims many." },
    { id: 'minor_apex_a_3', name: 'Permanent Consumption', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Your consumption effect is permanent and cannot be undone by any means.", flavor: "What the deep takes, it keeps forever." },

    // SUB-PATH B
    { id: 'B1', name: 'Warden of Absolute Pressure', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Compress water into shields so dense they can stop even magical attacks.", flavor: "Pressure makes diamonds. Or, it makes pulp." },
    { id: 'minor_b1_1', name: 'Denser Shield', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your pressure shield is more durable.", flavor: "Withstand the unthinkable." },
    { id: 'minor_b1_2', name: 'Pressure Wave', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "When your shield breaks, it releases a concussive shockwave.", flavor: "Even in defense, the pressure builds." },
    { id: 'minor_b1_3', name: 'Larger Shield', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your pressure shield covers a larger area and can protect allies.", flavor: "The shield protects all." },
    
    { id: 'B2', name: 'Invoke the Tide of Endings', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Summon a colossal tidal wave that moves across the battlefield, washing away all in its path.", flavor: "The end of all things is a wave." },
    { id: 'minor_b2_1', name: 'Higher Tide', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "The tidal wave is larger and more destructive.", flavor: "Drown the world." },
    { id: 'minor_b2_2', name: 'Faster Tide', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your tidal wave moves faster and is harder to escape.", flavor: "The end comes swiftly." },
    { id: 'minor_b2_3', name: 'Longer Tide', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your tidal wave travels further across the battlefield.", flavor: "The tide reaches far." },
    
    { id: 'B3', name: 'Manifest the Deep\'s Desire', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Temporarily flood a massive area with water from the abyssal plane, transforming the battlefield to your advantage.", flavor: "The world is but a temporary distraction from the eternal sea." },
    { id: 'minor_b3_1', name: 'Larger Flood', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your abyssal flood covers a larger area.", flavor: "The deep's reach grows." },
    { id: 'minor_b3_2', name: 'Longer Flood', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your abyssal flood persists longer.", flavor: "The deep is patient." },
    { id: 'minor_b3_3', name: 'Stronger Flood', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your abyssal flood provides greater battlefield control and damage.", flavor: "The deep's power grows." },
    
    { id: 'APEX_B', name: 'Law: Pressure Breaks Everything', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Your pressure-based attacks ignore all armor, shields, and resistances.", flavor: "There is no shield that can withstand the weight of the ocean." },
    { id: 'minor_apex_b_1', name: 'Stronger Pressure', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your pressure attacks deal even more damage when ignoring defenses.", flavor: "The pressure grows unbearable." },
    { id: 'minor_apex_b_2', name: 'Wider Pressure', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your pressure attacks affect a larger area.", flavor: "The pressure spreads far." },
    { id: 'minor_apex_b_3', name: 'Longer Pressure', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Your pressure effects last longer on affected enemies.", flavor: "The pressure endures." },

    // SUB-PATH C
    { id: 'C1', name: 'Depths That Echo', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Use water as a sonar, sending out a pressure wave that reveals the location of all nearby enemies.", flavor: "In the dark, one must learn to see with pressure." },
    { id: 'minor_c1_1', name: 'Clearer Echoes', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your sonar reveals more information, such as enemy type.", flavor: "Listen to the shape of the silence." },
    { id: 'minor_c1_2', name: 'Deeper Pulse', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "The range of your sonar is increased.", flavor: "The deep has long ears." },
    { id: 'minor_c1_3', name: 'Faster Echoes', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your sonar pulses more frequently and updates more quickly.", flavor: "The deep listens constantly." },
    
    { id: 'C2', name: 'Pull of the Abyss', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Create a subtle, persistent gravitational pull centered on an enemy, making their movement difficult.", flavor: "The abyss is patient. It will pull you in, sooner or later." },
    { id: 'minor_c2_1', name: 'Stronger Pull', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "The pull is stronger and affects a wider area.", flavor: "The inevitable gravity of the end." },
    { id: 'minor_c2_2', name: 'Longer Pull', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "The gravitational pull persists longer on affected enemies.", flavor: "The abyss never lets go." },
    { id: 'minor_c2_3', name: 'Multiple Pulls', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "You can create gravitational pulls on multiple enemies simultaneously.", flavor: "The abyss claims many." },
    
    { id: 'C3', name: 'Pressure Mastery', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Master the art of internal pressure, causing an enemy's own water to turn against them, rupturing them from within.", flavor: "The most dangerous water is the water already inside." },
    { id: 'minor_c3_1', name: 'Stronger Rupture', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your internal pressure attacks deal more damage.", flavor: "The rupture grows more violent." },
    { id: 'minor_c3_2', name: 'Faster Rupture', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your internal pressure effects activate more quickly.", flavor: "The pressure builds swiftly." },
    { id: 'minor_c3_3', name: 'Multiple Ruptures', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "You can cause internal pressure ruptures in multiple enemies simultaneously.", flavor: "The pressure affects many." },
    
    { id: 'APEX_C', name: 'Truth: The Abyss is Patient', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your pressure effects become permanent, slowly crushing enemies over time until they are defeated.", flavor: "The abyss has waited for eons. It can wait a little longer." },
    { id: 'minor_apex_c_1', name: 'Faster Crushing', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your permanent pressure effects crush enemies more quickly.", flavor: "The abyss grows impatient." },
    { id: 'minor_apex_c_2', name: 'Stronger Crushing', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your permanent pressure effects deal more damage over time.", flavor: "The pressure grows unbearable." },
    { id: 'minor_apex_c_3', name: 'Multiple Crushing', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can maintain permanent pressure effects on multiple enemies simultaneously.", flavor: "The abyss claims many." },

    // ENDGAME
    { id: 'rite_tides', name: 'Descent into the Absolute Deep', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Travel to the deepest part of the ocean and withstand its pressure without bending.", flavor: "To master the deep, you must let it crush you... and survive." },
    { id: 'rite_pressure', name: 'Trial of Consuming Hunger', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Face a manifestation of the ocean's hunger and quell it.", flavor: "To calm the hunger, one must offer a greater will." },
    { id: 'rite_force', name: 'Vigil of the Endless Tide', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Hold back the tide of an entire ocean for one full cycle.", flavor: "True strength is not in moving the water, but in holding it back." },
    { id: 'cap_abyssal_sovereign', name: 'The Abyssal Sovereign', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_tides', description: "You are the master of the deep. You can summon abyssal creatures and command the crushing pressures of the ocean floor anywhere.", flavor: "The deep has a new master. Me." },
    { id: 'cap_consuming_tide', name: 'The Consuming Tide', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_pressure', description: "Become an avatar of the ocean's hunger. Your attacks not only damage but also consume, adding the victim's strength to your own.", flavor: "All things return to the sea. I am simply... expediting the process." },
    { id: 'cap_pressure_absolute', name: 'The Pressure Absolute', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_force', description: "Your mastery of pressure becomes absolute. You can create fields of zero gravity, crush fortresses into dust, or create diamonds from coal with a thought.", flavor: "Reality is just a matter of pressure." },
    { id: 'schism_thirsting_void', name: 'The Thirsting Void', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your whirlpools no longer just pull, they drain life and energy from all within them, including allies.", flavor: "Hunger does not discriminate." },
    { id: 'schism_drowning_deep', name: 'The Drowning Deep', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_thirsting_void', description: "You lose the ability to bend water on the surface, but your power over the abyssal plane becomes godlike. You drown the world to feed the deep.", flavor: "Let the world sink. The deep is all that matters." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'hungry_deep', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#74c7ec', size: 50, icon: getHungryDeepNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const HUNGRY_DEEP_NODES = nodes;
export const HUNGRY_DEEP_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateHungryDeepConnections(): TalentConnection[] { return connections; }
export const HUNGRY_DEEP_METADATA = { name: 'The Hungry Deep', philosophy: "The ocean's deepest truth is hunger. It swallows islands, drowns civilizations...", essence: "Overwhelming force and consumption.", focus: "Pressure mastery, battlefield manipulation, consuming attacks.", sacredAnimal: "The Kraken", emoji: '🐙', color: '#74c7ec', position: { x: 800, y: 600 } };

function getHungryDeepNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '🌊'; case 'Keystone': return '🌀'; case 'Manifestation': return '🐙'; case 'Axiom': return '⚫'; case 'Capstone': return '🔱'; case 'GnosticRite': return '🙏'; case 'Schism': return '🕳️'; case 'Minor': return '💧'; default: return '🌊'; }
} 