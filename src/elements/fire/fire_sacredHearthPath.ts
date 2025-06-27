/**
 * Path 2: The Sacred Hearth - "Life's First Spark"
 * Philosophy: "Fire is the breath of life itself, the warmth that nurtures growth. True fire gives life, it does not take it."
 * Focus: Healing flames, spiritual fire, the life-giving warmth of the sun.
 */

import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 600; const CENTER_Y = 500; const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI; // To the left
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'Ember of Life', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your flames carry the essence of life, able to soothe pain and provide a gentle, healing warmth.", flavor: "Fire is not destruction. It is the first spark of life." },

    // SUB-PATH A
    { id: 'A1', name: 'Cauterize Wounds', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Use a precise flame to seal a wound, stopping bleeding and preventing infection.", flavor: "The same fire that burns can also cleanse." },
    { id: 'minor_a1_1', name: 'Faster Healing', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your cauterization heals wounds more quickly.", flavor: "The flame of life burns bright." },
    { id: 'minor_a1_2', name: 'Painless Touch', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your healing flames cause no pain to the recipient.", flavor: "Gentle warmth soothes all." },
    { id: 'minor_a1_3', name: 'Precise Cauterization', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your cauterization is more precise, leaving smaller scars.", flavor: "The gentlest touch heals the deepest wounds." },
    
    { id: 'A2', name: 'Soothing Light', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create a gentle, warm light that calms hostile spirits and pacifies aggressive animals.", flavor: "Even the most savage beast seeks warmth." },
    { id: 'minor_a2_1', name: 'Brighter Light', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your soothing light affects a larger area.", flavor: "More light, more peace." },
    { id: 'minor_a2_2', name: 'Longer Duration', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your soothing light lasts longer.", flavor: "Peace endures." },
    { id: 'minor_a2_3', name: 'Calming Aura', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your soothing light also calms nearby allies, reducing their stress and fear.", flavor: "The light brings comfort to all." },
    
    { id: 'A3', name: 'Breath of Life', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Breathe a warm, healing energy into an ally, reviving them from being knocked out.", flavor: "Share your fire, and you will never be cold." },
    { id: 'minor_a3_1', name: 'Stronger Revival', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Revived allies return with more health.", flavor: "The breath of life grows stronger." },
    { id: 'minor_a3_2', name: 'Faster Revival', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "You can revive allies more quickly.", flavor: "Life returns swiftly." },
    { id: 'minor_a3_3', name: 'Revival Aura', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your breath of life affects multiple allies at once.", flavor: "The breath of life touches all." },
    
    { id: 'APEX_A', name: 'Heart of the Hearth', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "You emanate a permanent aura of warmth and healing, slowly regenerating the health of all nearby allies.", flavor: "Be the fire that warms, not the one that burns." },
    { id: 'minor_apex_a_1', name: 'Expanding Hearth', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your healing aura affects a larger area.", flavor: "The hearth's warmth reaches further." },
    { id: 'minor_apex_a_2', name: 'Stronger Warmth', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your healing aura regenerates health more quickly.", flavor: "The warmth grows stronger." },
    { id: 'minor_apex_a_3', name: 'Protective Hearth', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Your healing aura also provides minor protection from damage.", flavor: "The hearth protects as well as heals." },

    // SUB-PATH B
    { id: 'B1', name: 'Spiritual Fire', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You can see the 'inner flame' or life force of living beings, allowing you to gauge their health and spiritual state.", flavor: "Every soul is a flame. Some burn brighter than others." },
    { id: 'minor_b1_1', name: 'Clearer Sight', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "You can see spiritual energy more clearly and at greater distances.", flavor: "The inner flame reveals all." },
    { id: 'minor_b1_2', name: 'Deeper Understanding', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "You can sense the emotional state of those whose inner flame you observe.", flavor: "The heart speaks through the flame." },
    { id: 'minor_b1_3', name: 'Spiritual Awareness', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "You can sense spiritual entities and their intentions.", flavor: "The spirit world is open to those who see." },
    
    { id: 'B2', name: 'Cleansing Flame', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Use your fire to burn away curses, poisons, and other malevolent magical effects from yourself or allies.", flavor: "Fire purifies all." },
    { id: 'minor_b2_1', name: 'Faster Cleansing', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Your cleansing flame works more quickly and efficiently.", flavor: "Purification comes swiftly." },
    { id: 'minor_b2_2', name: 'Stronger Purification', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your cleansing flame can remove more powerful curses and effects.", flavor: "No darkness can withstand the light." },
    { id: 'minor_b2_3', name: 'Purifying Aura', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your cleansing flame affects multiple allies at once.", flavor: "Purification touches all." },
    
    { id: 'B3', name: 'Sun\'s Blessing', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Channel the power of the sun to create a zone of light that massively empowers all healing effects and damages undead.", flavor: "There is no darkness that can withstand the sun." },
    { id: 'minor_b3_1', name: 'Larger Blessing', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your sun's blessing affects a larger area.", flavor: "The sun's light reaches far." },
    { id: 'minor_b3_2', name: 'Stronger Blessing', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your sun's blessing provides even greater healing and damage to undead.", flavor: "The sun's power grows stronger." },
    { id: 'minor_b3_3', name: 'Lasting Blessing', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your sun's blessing lasts longer.", flavor: "The sun's blessing endures." },
    
    { id: 'APEX_B', name: 'The Inner Sun', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Your own life force becomes a miniature sun, making you immune to spiritual corruption and providing a constant source of positive energy.", flavor: "I carry the sun within my heart." },
    { id: 'minor_apex_b_1', name: 'Brighter Inner Sun', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your inner sun provides more positive energy to nearby allies.", flavor: "The inner sun burns brighter." },
    { id: 'minor_apex_b_2', name: 'Protective Radiance', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your inner sun provides protection against spiritual attacks to nearby allies.", flavor: "The light protects the faithful." },
    { id: 'minor_apex_b_3', name: 'Healing Radiance', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Your inner sun provides constant healing to nearby allies.", flavor: "The sun's warmth heals all." },

    // SUB-PATH C
    { id: 'C1', name: 'Cautious Flame', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Your destructive fire abilities (like Fireball) now have a secondary healing effect on allies caught in the blast.", flavor: "Even in wrath, there can be mercy." },
    { id: 'minor_c1_1', name: 'Greater Healing', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "The healing effect on allies is increased.", flavor: "Mercy grows stronger." },
    { id: 'minor_c1_2', name: 'Selective Blast', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "You can choose which allies receive healing from your fire attacks.", flavor: "The flame knows friend from foe." },
    { id: 'minor_c1_3', name: 'Healing Explosion', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "The healing effect from your fire attacks also removes negative status effects.", flavor: "The flame cleanses as it heals." },
    
    { id: 'C2', name: 'Fire of Inspiration', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Your presence inspires your allies, granting them increased courage and resistance to fear effects.", flavor: "A single candle can light a thousand more without diminishing." },
    { id: 'minor_c2_1', name: 'Stronger Inspiration', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your inspiring presence affects allies at greater distances.", flavor: "Hope spreads like wildfire." },
    { id: 'minor_c2_2', name: 'Courageous Flame', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your inspiring presence also grants allies increased attack power.", flavor: "Courage is the flame that drives us forward." },
    { id: 'minor_c2_3', name: 'Unwavering Spirit', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your inspiring presence makes allies immune to fear and panic effects.", flavor: "The spirit cannot be broken." },
    
    { id: 'C3', name: 'Phoenix Fire', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Summon the spirit of a phoenix. Its tears can heal any wound, and its fire burns only your enemies.", flavor: "The phoenix knows that life and death are two sides of the same flame." },
    { id: 'minor_c3_1', name: 'Larger Phoenix', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your phoenix spirit is larger and more powerful.", flavor: "The phoenix grows stronger." },
    { id: 'minor_c3_2', name: 'Phoenix Tears', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "The phoenix's tears heal more effectively and can cure more severe wounds.", flavor: "The phoenix's tears are life itself." },
    { id: 'minor_c3_3', name: 'Phoenix Aura', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "The phoenix spirit provides a protective aura to nearby allies.", flavor: "The phoenix protects its chosen." },
    
    { id: 'APEX_C', name: 'Cycle of Rebirth', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "When an ally falls in battle near you, they are immediately reborn from a pillar of healing fire, returning with a portion of their health.", flavor: "Death is not an end, but a chance to begin anew." },
    { id: 'minor_apex_c_1', name: 'Stronger Rebirth', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Reborn allies return with more health.", flavor: "The cycle of rebirth grows stronger." },
    { id: 'minor_apex_c_2', name: 'Faster Rebirth', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "The rebirth process is faster and more reliable.", flavor: "Life returns swiftly from death." },
    { id: 'minor_apex_c_3', name: 'Rebirth Aura', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "The rebirth effect can affect multiple allies simultaneously.", flavor: "The cycle of rebirth touches all." },

    // ENDGAME
    { id: 'rite_life', name: 'Trial of Life', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Bring a withered, dead tree back to vibrant life using only your healing fire.", flavor: "Life begets life." },
    { id: 'rite_spirit', name: 'Trial of Spirit', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Calm a powerful, enraged spirit with your inner light, without resorting to force.", flavor: "The brightest light casts no shadow." },
    { id: 'rite_hope', name: 'Trial of Hope', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Maintain a single, unwavering flame in the heart of a blizzard, as a beacon for the lost.", flavor: "Hope is the fire that never goes out." },
    { id: 'cap_sun_warrior', name: 'The Sun Warrior', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_life', description: "You are a conduit for the sun itself. All your fire abilities heal allies and burn foes, and you can create miniature suns to light and warm the world.", flavor: "I am the dawn." },
    { id: 'cap_guardian_flame', name: 'The Guardian Flame', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_spirit', description: "You can create a sanctuary of sacred fire. Within its bounds, allies are immortal, and enemies are weakened and burned.", flavor: "All are welcome at my hearth." },
    { id: 'cap_rebirth', name: 'Avatar of Rebirth', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_hope', description: "You master the cycle of life and death. You can resurrect fallen allies to their full strength, and your very touch can bring life to barren land.", flavor: "From the ashes, life will rise." },
    { id: 'schism_blood_fire', name: 'Blood Fire', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "You learn to heal by consuming the life force of others, a forbidden art that corrupts your flame.", flavor: "Why give my own warmth when I can take theirs?" },
    { id: 'schism_false_phoenix', name: 'The False Phoenix', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_blood_fire', description: "You can resurrect the dead, but they return as soulless, fiery husks under your command.", flavor: "Life is a fire. Let me be its master, not its servant." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'sacred_hearth', constellation: 'fire', position: { x, y }, prerequisites, visual: { color: '#f38ba8', size: 50, icon: getSacredHearthNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const SACRED_HEARTH_NODES = nodes;
export const SACRED_HEARTH_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateSacredHearthConnections(): TalentConnection[] { return connections; }
export const SACRED_HEARTH_METADATA = { name: 'The Sacred Hearth', philosophy: "True fire gives life, it does not take it.", essence: "Life-giving warmth, healing, and spiritual fire.", focus: "Healing, protection, and support.", sacredAnimal: "The Phoenix", emoji: '🔥', color: '#f38ba8', position: { x: 600, y: 500 } };

function getSacredHearthNodeIcon(type: string): string {
  switch (type) { 
    case 'Genesis': return '💖'; 
    case 'Keystone': return '✨'; 
    case 'Manifestation': return '☀️'; 
    case 'Axiom': return '🕊️'; 
    case 'Capstone': return '❤️‍🔥'; 
    case 'GnosticRite': return '🙏'; 
    case 'Schism': return '🖤'; 
    case 'Minor': return '💖'; 
    default: return '💖'; 
  }
}