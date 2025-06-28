/**
 * Path 4: The Lightning's Edge - "The Void Between Thoughts"
 * Philosophy: "True power comes from the space between heartbeats... Lightning is not fire - it is the absence of fire, the cold flame of pure will."
 * Focus: Lightning generation, mental discipline, cold fire techniques.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800; const CENTER_Y = 600; const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: "The Lightning's Edge Path", type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Begin to separate the positive and negative energy within yourself, generating small static charges and a feeling of inner cold.", flavor: "True power is not heat, but the potential between two points." },

    // SUB-PATH A
    { id: 'A1', name: 'Static Charge', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Your movements build up a static charge, which you can discharge on your next physical attack for bonus lightning damage.", flavor: "The air crackles with anticipation." },
    { id: 'minor_a1_1', name: 'Faster Build-up', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "You build up static charge more quickly.", flavor: "Every step is a spark." },
    { id: 'minor_a1_2', name: 'Stronger Discharge', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "The lightning damage from your discharge is increased.", flavor: "Release the storm within." },
    { id: 'minor_a1_3', name: 'Larger Charge', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "You can build up a larger static charge before discharging.", flavor: "The greater the potential, the greater the power." },
    
    { id: 'A2', name: 'Redirect Lightning', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "You can catch and redirect natural or enemy lightning, channeling it through your body unharmed and unleashing it at a new target.", flavor: "Become the conduit, not the target." },
    { id: 'minor_a2_1', name: 'Faster Redirection', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "You can redirect lightning more quickly and efficiently.", flavor: "The lightning flows through me like water." },
    { id: 'minor_a2_2', name: 'Stronger Redirect', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Redirected lightning deals more damage to its new target.", flavor: "The redirected bolt carries my will." },
    { id: 'minor_a2_3', name: 'Multiple Redirects', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "You can redirect lightning multiple times before it dissipates.", flavor: "The lightning dances to my command." },
    
    { id: 'A3', name: 'Lightning Bolt', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Generate and fire a bolt of pure lightning from your fingertips. It is faster and more precise than any fire attack.", flavor: "The will, made manifest as light." },
    { id: 'minor_a3_1', name: 'Faster Bolt', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your lightning bolts travel faster and are harder to dodge.", flavor: "Speed is the essence of lightning." },
    { id: 'minor_a3_2', name: 'Stronger Bolt', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your lightning bolts deal more damage.", flavor: "The bolt carries the force of the storm." },
    { id: 'minor_a3_3', name: 'Precise Bolt', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your lightning bolts are more accurate and can hit smaller targets.", flavor: "Precision is the mark of mastery." },
    
    { id: 'APEX_A', name: 'Chain Lightning', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Your lightning bolts will arc from their initial target to strike multiple nearby enemies.", flavor: "One spark can start a storm." },
    { id: 'minor_apex_a_1', name: 'More Chains', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your chain lightning can jump to more targets.", flavor: "The storm spreads further." },
    { id: 'minor_apex_a_2', name: 'Longer Chains', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your chain lightning can jump to targets further away.", flavor: "Distance is no barrier to the storm." },
    { id: 'minor_apex_a_3', name: 'Stronger Chains', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Each chain of lightning deals more damage than the previous.", flavor: "The storm grows stronger with each strike." },

    // SUB-PATH B
    { id: 'B1', name: 'Cold-Blooded', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Your inner calm makes you highly resistant to emotional manipulation and grants you an unnerving presence.", flavor: "The quiet mind is a fortress." },
    { id: 'minor_b1_1', name: 'Deeper Calm', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your resistance to emotional manipulation is increased.", flavor: "The void within grows deeper." },
    { id: 'minor_b1_2', name: 'Unnerving Aura', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your presence is even more unsettling to enemies.", flavor: "They fear what they cannot understand." },
    { id: 'minor_b1_3', name: 'Cold Presence', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your cold presence can freeze small amounts of water and create frost on nearby surfaces.", flavor: "The cold emanates from within." },
    
    { id: 'B2', name: 'Emotionless State', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Enter a trance of pure logic, making you immune to fear and granting you hyper-awareness of your surroundings.", flavor: "Emotion is a weakness. I have none." },
    { id: 'minor_b2_1', name: 'Faster Trance', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "You can enter the emotionless state more quickly.", flavor: "The transition is seamless." },
    { id: 'minor_b2_2', name: 'Longer Trance', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "You can maintain the emotionless state longer.", flavor: "The void is endless." },
    { id: 'minor_b2_3', name: 'Deeper Awareness', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your hyper-awareness reveals more details about your surroundings.", flavor: "The void sees all." },
    
    { id: 'B3', name: 'The Cold Flame', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Generate a flame that does not burn with heat, but with a life-draining cold, freezing and weakening your enemies.", flavor: "The opposite of fire is not water. It is a fire that takes, rather than gives." },
    { id: 'minor_b3_1', name: 'Colder Flame', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your cold flame drains more life and creates more intense cold.", flavor: "The cold flame grows colder." },
    { id: 'minor_b3_2', name: 'Larger Flame', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your cold flame can cover a larger area.", flavor: "The cold flame spreads like frost." },
    { id: 'minor_b3_3', name: 'Frozen Touch', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your cold flame can freeze enemies solid, making them vulnerable to shattering.", flavor: "The cold flame freezes all it touches." },
    
    { id: 'APEX_B', name: 'Void Between Thoughts', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Your mind works so fast that time appears to slow down, allowing you to react and move with impossible speed.", flavor: "There is an eternity between each heartbeat." },
    { id: 'minor_apex_b_1', name: 'Slower Time', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Time appears to slow down even more for you.", flavor: "The void between thoughts grows wider." },
    { id: 'minor_apex_b_2', name: 'Faster Reactions', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your reaction speed is even more enhanced.", flavor: "The void reacts before thought." },
    { id: 'minor_apex_b_3', name: 'Void Awareness', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can sense the flow of time and predict events before they happen.", flavor: "The void sees the future." },

    // SUB-PATH C
    { id: 'C1', name: 'Lightning Reflexes', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Your reaction speed is heightened, giving you a passive chance to automatically dodge incoming attacks.", flavor: "Move like lightning, and you cannot be struck." },
    { id: 'minor_c1_1', name: 'Faster Reactions', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your dodge chance is increased.", flavor: "The lightning never strikes the same place twice." },
    { id: 'minor_c1_2', name: 'Lightning Awareness', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "You can sense incoming attacks before they arrive.", flavor: "The air speaks of danger." },
    { id: 'minor_c1_3', name: 'Lightning Dodge', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "When you successfully dodge, you leave behind a lightning afterimage that can damage enemies.", flavor: "The lightning leaves its mark." },
    
    { id: 'C2', name: 'Lightning Step', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Dissolve into a bolt of lightning for a short-range, instantaneous teleport.", flavor: "Why run when you can flash?" },
    { id: 'minor_c2_1', name: 'Longer Range', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "The range of your lightning step is increased.", flavor: "Distance is an illusion." },
    { id: 'minor_c2_2', name: 'Faster Step', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "You can perform lightning steps more frequently.", flavor: "The lightning never rests." },
    { id: 'minor_c2_3', name: 'Lightning Trail', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your lightning step leaves behind a trail of electricity that damages enemies who follow.", flavor: "The lightning's path is dangerous." },
    
    { id: 'C3', name: 'Ride the Lightning', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "You can transform into a being of pure electricity, allowing you to travel through metal wires or conduits.", flavor: "The world is a circuit, and I am the current." },
    { id: 'minor_c3_1', name: 'Faster Travel', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "You can travel through electrical systems more quickly.", flavor: "The current flows faster." },
    { id: 'minor_c3_2', name: 'Longer Travel', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "You can travel through electrical systems over longer distances.", flavor: "The circuit knows no bounds." },
    { id: 'minor_c3_3', name: 'Electrical Control', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "While traveling through electrical systems, you can control and manipulate them.", flavor: "The current obeys my will." },
    
    { id: 'APEX_C', name: 'Storm\'s Arrival', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "You can call down a powerful thunderstorm at will, empowering all your lightning abilities and creating natural bolts you can redirect.", flavor: "I do not follow the storm. I am its herald." },
    { id: 'minor_apex_c_1', name: 'Larger Storm', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your summoned storms cover a larger area.", flavor: "The storm grows ever larger." },
    { id: 'minor_apex_c_2', name: 'Stronger Storm', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your summoned storms create more powerful lightning bolts.", flavor: "The storm's fury grows." },
    { id: 'minor_apex_c_3', name: 'Longer Storm', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Your summoned storms last longer.", flavor: "The storm endures." },

    // ENDGAME
    { id: 'rite_focus', name: 'Trial of Focus', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Split a single bolt of lightning to hit ten different targets simultaneously.", flavor: "The focused will can divide the indivisible." },
    { id: 'rite_calm', name: 'Trial of Calm', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Meditate and maintain a state of absolute zero emotion while being subjected to intense spiritual and emotional attacks.", flavor: "The void within is proof against the storm without." },
    { id: 'rite_speed', name: 'Trial of Speed', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Outrun a bolt of natural lightning from a storm you summoned.", flavor: "To master the lightning, you must be faster than it." },
    { id: 'cap_storm_incarnate', name: 'Storm Incarnate', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_focus', description: "You become a living thunderstorm, constantly arcing with chain lightning and capable of calling down massive, targeted strikes from the sky.", flavor: "I am the heart of the storm." },
    { id: 'cap_void_mind', name: 'The Void Mind', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_calm', description: "Your mind becomes a cold, calculating void. You are immune to all mental effects, can predict enemy actions with flawless logic, and your 'cold fire' abilities are massively empowered.", flavor: "I think, therefore I am. But I do not feel." },
    { id: 'cap_lightning_avatar', name: 'Avatar of Lightning', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_speed', description: "You can transform your body into pure lightning at will. In this form, you are invulnerable, move at the speed of light, and can unleash devastating electrical attacks.", flavor: "I am speed. I am light." },
    { id: 'schism_energy_vampire', name: 'Energy Vampire', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your lightning strikes no longer just damage, they drain chi and energy from your foes to replenish your own, but this act leaves you spiritually numb.", flavor: "Their energy is a resource. I will not waste it." },
    { id: 'schism_short_circuit', name: 'Short Circuit', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_energy_vampire', description: "You can permanently disable an enemy's connection to their own chi, effectively severing them from their bending, but doing so creates a violent backlash that randomly disables one of your own abilities.", flavor: "If I cannot have this power, neither can you." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'lightnings_edge', constellation: 'fire', position: { x, y }, prerequisites, visual: { color: '#f38ba8', size: 50, icon: getLightningsEdgeNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const LIGHTNINGS_EDGE_NODES = nodes;
export const LIGHTNINGS_EDGE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateLightningsEdgeConnections(): TalentConnection[] { return connections; }
export const LIGHTNINGS_EDGE_METADATA = { name: 'The Lightning\'s Edge', philosophy: "Lightning is not fire - it is the absence of fire, the cold flame of pure will.", essence: "Mental discipline and cold fire.", focus: "Lightning generation, speed, precision.", sacredAnimal: "The Hawk", emoji: '🦅', color: '#f38ba8', position: { x: 800, y: 600 } };

function getLightningsEdgeNodeIcon(type: string): string {
  switch (type) { 
    case 'Genesis': return '🧠'; 
    case 'Keystone': return '⚡'; 
    case 'Manifestation': return '🧊'; 
    case 'Axiom': return '🧘'; 
    case 'Capstone': return '🌩️'; 
    case 'GnosticRite': return '🙏'; 
    case 'Schism': return '🔌'; 
    case 'Minor': return '⚡'; 
    default: return '⚡'; 
  }
}