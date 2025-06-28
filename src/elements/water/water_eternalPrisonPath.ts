/**
 * Path 3: The Eternal Prison - What Ice Remembers (Deterministically Generated)
 *
 * Path Philosophy: In ice, water finds its most honest form - unchanging, patient, eternal.
 * Focus: Preservation, patience, unstoppable force through immutable will.
 *
 * REFACTOR: Populated all descriptions and philosophies to match the design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 600; const CENTER_Y = 500; const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI; // To the left
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Eternal Prison Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your touch carries the patience of glaciers, chilling and slowing your targets.", flavor: "In ice, water finds its most honest form - unchanging, patient, eternal." },
    
    // SUB-PATH A
    { id: 'A1', name: 'Warden of Eternal Frost', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Create walls and barriers of ice with impossible strength and durability.", flavor: "A glacier does not yield." },
    { id: 'minor_a1_1', name: 'Reinforced Ice', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your ice structures are more durable.", flavor: "Harder than stone." },
    { id: 'minor_a1_2', name: 'Wider Barriers', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your ice walls are wider and taller.", flavor: "An impassable defense." },
    { id: 'minor_a1_3', name: 'Faster Formation', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your ice structures form more quickly.", flavor: "The frost answers swiftly." },
    
    { id: 'A2', name: 'Sentinel of Piercing Cold', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Launch icicles that cannot be stopped or blocked by conventional shields.", flavor: "What is a wall of wood to a mountain of ice?" },
    { id: 'minor_a2_1', name: 'Sharper Icicles', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your icicles deal more damage and have a higher chance to pierce.", flavor: "The cold cuts deep." },
    { id: 'minor_a2_2', name: 'Faster Projectiles', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your icicles travel faster and are harder to dodge.", flavor: "The cold strikes swiftly." },
    { id: 'minor_a2_3', name: 'Multiple Icicles', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "You can launch multiple icicles simultaneously.", flavor: "The storm brings many spears." },
    
    { id: 'A3', name: 'Raise the Deathless Walls', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Construct massive fortifications of ice that last until they are destroyed.", flavor: "This fortress will outlast the mountains." },
    { id: 'minor_a3_1', name: 'Larger Fortress', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your ice fortifications are larger and more complex.", flavor: "The fortress grows ever larger." },
    { id: 'minor_a3_2', name: 'Stronger Walls', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your ice fortifications are even more durable and resistant to damage.", flavor: "The walls are unbreakable." },
    { id: 'minor_a3_3', name: 'Faster Construction', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "You can construct your ice fortifications more quickly.", flavor: "The fortress rises in moments." },
    
    { id: 'APEX_A', name: 'Axiom: Ice Holds Forever', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Entomb a target—or yourself—in a block of invincible ice, preserving them perfectly and protecting them from all harm.", flavor: "Time itself freezes at my command." },
    { id: 'minor_apex_a_1', name: 'Larger Prison', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "You can entomb larger targets or multiple targets simultaneously.", flavor: "The prison grows to hold all." },
    { id: 'minor_apex_a_2', name: 'Longer Preservation', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your ice prison can preserve targets for longer periods.", flavor: "The ice preserves eternally." },
    { id: 'minor_apex_a_3', name: 'Selective Release', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can selectively release targets from your ice prison without affecting others.", flavor: "The jailer chooses who goes free." },

    // SUB-PATH B
    { id: 'B1', name: 'Keeper of Preserved Moments', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Flash-freeze water in the air to create sharp, disorienting shards of ice.", flavor: "A moment, frozen, can be a weapon." },
    { id: 'minor_b1_1', name: 'Dazing Shards', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Enemies hit by your ice shards are briefly disoriented.", flavor: "A moment of confusion is a moment of advantage." },
    { id: 'minor_b1_2', name: 'Wider Spray', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "The cone of ice shards is wider.", flavor: "No escape from the cold." },
    { id: 'minor_b1_3', name: 'Faster Freeze', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your ice shards form and launch more quickly.", flavor: "The moment freezes instantly." },
    
    { id: 'B2', name: 'Invoke the Inevitable Spear', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Create a spear of ice that travels unerringly towards its target, phasing through obstacles.", flavor: "The glacier's advance is slow, but it is inevitable." },
    { id: 'minor_b2_1', name: 'Faster Spear', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Your ice spear travels faster.", flavor: "Inevitability, accelerated." },
    { id: 'minor_b2_2', name: 'Stronger Spear', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your ice spear deals more damage and is harder to destroy.", flavor: "The spear is unbreakable." },
    { id: 'minor_b2_3', name: 'Multiple Spears', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "You can create and control multiple ice spears simultaneously.", flavor: "The glacier sends many spears." },
    
    { id: 'B3', name: 'Manifest the Eternal Moment', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Freeze a wide area in time, trapping all enemies and projectiles in a field of absolute stasis.", flavor: "Let this moment last forever." },
    { id: 'minor_b3_1', name: 'Larger Stasis', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your stasis field covers a larger area.", flavor: "The frozen moment spreads." },
    { id: 'minor_b3_2', name: 'Longer Stasis', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your stasis field lasts longer.", flavor: "The moment endures." },
    { id: 'minor_b3_3', name: 'Selective Stasis', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "You can choose which enemies and objects are affected by your stasis field.", flavor: "The moment chooses its prisoners." },
    
    { id: 'APEX_B', name: 'Law: Stillness Conquers Motion', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Become an immovable object. For a short time, you cannot be moved, staggered, or damaged.", flavor: "The mountain does not move for the storm." },
    { id: 'minor_apex_b_1', name: 'Longer Stillness', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your immovable state lasts longer.", flavor: "The stillness endures." },
    { id: 'minor_apex_b_2', name: 'Stronger Stillness', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your immovable state is even more resistant to all forms of force.", flavor: "The mountain stands firm." },
    { id: 'minor_apex_b_3', name: 'Stillness Aura', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Your immovable state also affects nearby allies, making them more resistant to movement effects.", flavor: "The mountain's shadow protects." },

    // SUB-PATH C
    { id: 'C1', name: 'Frost\'s Patient Embrace', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Create a field of intense cold that dramatically slows all enemies within it.", flavor: "Patience is a cold, sharp weapon." },
    { id: 'minor_c1_1', name: 'Deep Freeze', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "The slowing effect is intensified, and can briefly freeze weaker enemies solid.", flavor: "Patience can stop a heart." },
    { id: 'minor_c1_2', name: 'Lingering Cold', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "The field of cold persists for longer.", flavor: "The cold remains." },
    { id: 'minor_c1_3', name: 'Wider Embrace', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your cold field covers a larger area.", flavor: "The frost embraces all." },
    
    { id: 'C2', name: 'Whispers of Preservation', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Coat yourself in a thin layer of magical ice that makes you resistant to poisons, curses, and decay.", flavor: "Ice remembers, but it does not rot." },
    { id: 'minor_c2_1', name: 'Purity of Ice', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your resistance to negative effects is increased.", flavor: "The pure heart fears no poison." },
    { id: 'minor_c2_2', name: 'Thicker Coating', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your ice coating provides even greater protection and resistance.", flavor: "The ice grows thicker." },
    { id: 'minor_c2_3', name: 'Preservation Aura', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your ice coating also protects nearby allies from negative effects.", flavor: "The preservation spreads." },
    
    { id: 'C3', name: 'Ice Mastery', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Gain mastery over the fundamental forms of ice manipulation, allowing you to create complex structures and weapons with ease.", flavor: "Ice is not just a substance, it is an art form." },
    { id: 'minor_c3_1', name: 'Complex Structures', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "You can create more complex and intricate ice structures.", flavor: "The artist's hand grows skilled." },
    { id: 'minor_c3_2', name: 'Faster Creation', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "You can create ice structures and weapons more quickly.", flavor: "The ice answers swiftly." },
    { id: 'minor_c3_3', name: 'Larger Creations', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "You can create larger ice structures and weapons.", flavor: "The ice grows to any size." },
    
    { id: 'APEX_C', name: 'Truth: Patience Outlasts All', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your ice structures slowly regenerate over time, making them nearly indestructible through attrition.", flavor: "The mountain is built one stone at a time, and erodes one grain at a time. I have all the time in the world." },
    { id: 'minor_apex_c_1', name: 'Faster Regeneration', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your ice structures regenerate more quickly.", flavor: "The ice heals swiftly." },
    { id: 'minor_apex_c_2', name: 'Stronger Regeneration', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your ice structures regenerate to be even stronger than before.", flavor: "The ice grows stronger with each cycle." },
    { id: 'minor_apex_c_3', name: 'Regeneration Aura', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Your ice structures can also regenerate nearby allies' ice-based abilities.", flavor: "The ice shares its strength." },

    // ENDGAME
    { id: 'rite_ice', name: 'Vigil of Eternal Stillness', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Meditate within a block of your own ice in the heart of a volcano.", flavor: "To master stillness, one must embrace the fire." },
    { id: 'rite_defense', name: 'Trial of Inevitable Victory', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Defeat a powerful opponent using only defensive and counter-attacking moves.", flavor: "The patient stone outlasts the hammer." },
    { id: 'rite_control', name: 'Ordeal of Perfect Preservation', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Preserve a fragile flower in a block of ice for a year and a day, ensuring it emerges unharmed.", flavor: "The gentlest touch requires the greatest control." },
    { id: 'cap_deathless_glacier', name: 'The Deathless Glacier', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_ice', description: "Become a being of living ice. You no longer need to eat, sleep, or breathe, and you are immune to the ravages of time.", flavor: "I am eternal. I am the ice." },
    { id: 'cap_eternal_warden', name: 'The Eternal Warden', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_defense', description: "Your 'Stillness Conquers Motion' becomes a permanent passive state. You are a walking fortress.", flavor: "Let them break themselves upon my will." },
    { id: 'cap_moment_master', name: 'The Moment\'s Master', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_control', description: "You can selectively freeze and unfreeze objects and people in time, creating a battlefield where you are the only one who can move freely.", flavor: "Time is a river, and I am the dam." },
    { id: 'schism_weeping_ice', name: 'The Weeping Ice', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your ice no longer holds still, but 'weeps' a liquid of intense cold that freezes anything it touches, including the ground and yourself.", flavor: "Stillness is a lie. Even the ice must weep." },
    { id: 'schism_hungry_preservation', name: 'The Hungry Preservation', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_weeping_ice', description: "Instead of preserving, your ice consumes the life force of anything it encases, healing and strengthening you.", flavor: "Eternity is a cold and hungry god." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'eternal_prison', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#74c7ec', size: 50, icon: getEternalPrisonNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const ETERNAL_PRISON_NODES = nodes;
export const ETERNAL_PRISON_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateEternalPrisonConnections(): TalentConnection[] { return connections; }
export const ETERNAL_PRISON_METADATA = { name: 'The Eternal Prison', philosophy: "In ice, water finds its most honest form - unchanging, patient, eternal.", essence: "Stillness, preservation, and immutable will.", focus: "Defensive structures, battlefield control, unstoppable force.", sacredAnimal: "The Polar Bear Dog", emoji: '🐻‍❄️', color: '#74c7ec', position: { x: 600, y: 500 } };

function getEternalPrisonNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '❄️'; case 'Keystone': return '🛡️'; case 'Manifestation': return '🏔️'; case 'Axiom': return '💎'; case 'Capstone': return '🏰'; case 'GnosticRite': return '🙏'; case 'Schism': return '🧊'; case 'Minor': return '💧'; default: return '❄️'; }
} 