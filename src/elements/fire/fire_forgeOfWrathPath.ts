/**
 * Path 1: The Forge of Wrath - "Destruction Incarnate"
 * Philosophy: "Fire is the Great Destroyer, the end of all things. To embrace fire is to accept that everything must burn - including yourself."
 * Focus: Unbridled destruction, consuming rage, the cleansing fire that reduces all to ash.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800; const CENTER_Y = 400; const BRANCHES = 3;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Forge of Wrath Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your fire burns with destructive intent, dealing increased damage to structures and armored foes.", flavor: "Let it all burn." },

    // SUB-PATH A
    { id: 'A1', name: 'Fireball', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Hurl a classic projectile of fire that explodes on impact.", flavor: "The simplest answer is often the most effective." },
    { id: 'minor_a1_1', name: 'Larger Blast', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your fireball explosion radius is increased.", flavor: "Bigger is better." },
    { id: 'minor_a1_2', name: 'Faster Projectile', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your fireball travels faster and is harder to dodge.", flavor: "Speed is the essence of war." },
    { id: 'minor_a1_3', name: 'Molten Core', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your fireball leaves behind pools of molten fire that damage enemies who step in them.", flavor: "The fire's memory is long and hot." },
    
    { id: 'A2', name: 'Flame Breath', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Unleash a continuous stream of fire from your mouth in a wide cone.", flavor: "Exhale your fury upon the world." },
    { id: 'minor_a2_1', name: 'Wider Cone', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "The cone of your flame breath is wider.", flavor: "Cover more ground with your wrath." },
    { id: 'minor_a2_2', name: 'Longer Stream', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your flame breath reaches further.", flavor: "The fire's reach knows no bounds." },
    { id: 'minor_a2_3', name: 'Intensified Heat', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your flame breath burns hotter, dealing more damage over time.", flavor: "Heat that sears the soul." },
    
    { id: 'A3', name: 'Wall of Fire', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Create a towering inferno that blocks passage and heavily damages any who try to cross.", flavor: "A good wall solves many problems." },
    { id: 'minor_a3_1', name: 'Taller Wall', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your wall of fire is taller and harder to jump over.", flavor: "The wall reaches for the sky." },
    { id: 'minor_a3_2', name: 'Wider Wall', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your wall of fire extends further to the sides.", flavor: "The wall knows no end." },
    { id: 'minor_a3_3', name: 'Burning Barrier', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Enemies who touch the wall are set on fire for additional damage.", flavor: "Touch the wall and know pain." },
    
    { id: 'APEX_A', name: 'Immolation Aura', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "You are constantly surrounded by a vortex of fire that damages nearby enemies.", flavor: "My very presence is anathema to my enemies." },
    { id: 'minor_apex_a_1', name: 'Expanding Aura', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your immolation aura affects a larger area.", flavor: "The fire's reach grows ever wider." },
    { id: 'minor_apex_a_2', name: 'Intensified Vortex', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your aura deals more damage to enemies caught within it.", flavor: "The vortex consumes all." },
    { id: 'minor_apex_a_3', name: 'Burning Presence', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Enemies who stay in your aura too long are set on fire.", flavor: "My presence is a curse." },

    // SUB-PATH B
    { id: 'B1', name: 'Jet Propulsion', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Use controlled blasts of fire from your hands and feet to propel yourself through the air.", flavor: "Anger is a powerful fuel." },
    { id: 'minor_b1_1', name: 'Longer Flight', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your jet propulsion lasts longer and carries you further.", flavor: "The sky is no limit to fury." },
    { id: 'minor_b1_2', name: 'Faster Acceleration', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "You can change direction more quickly while using jet propulsion.", flavor: "Agility born of rage." },
    { id: 'minor_b1_3', name: 'Precise Control', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your jet propulsion is more precise and easier to control.", flavor: "Control is the key to power." },
    
    { id: 'B2', name: 'Explosive Landing', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "When you land after using Jet Propulsion, you create a fiery explosion.", flavor: "Make an entrance." },
    { id: 'minor_b2_1', name: 'Bigger Boom', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "The explosion from your landing is larger and more damaging.", flavor: "Leave a lasting impression." },
    { id: 'minor_b2_2', name: 'Shockwave', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your landing creates a shockwave that knocks back enemies.", flavor: "The earth itself trembles." },
    { id: 'minor_b2_3', name: 'Controlled Impact', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "You can control the direction of your explosive landing.", flavor: "Direct your fury with precision." },
    
    { id: 'B3', name: 'Combustion Bending', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Focus your chi to fire a beam of superheated air from your forehead that explodes on contact with devastating force.", flavor: "The mind is the most powerful furnace." },
    { id: 'minor_b3_1', name: 'Longer Range', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your combustion beam reaches further.", flavor: "The beam knows no distance." },
    { id: 'minor_b3_2', name: 'Faster Charge', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "You can charge and fire your combustion beam more quickly.", flavor: "Speed is the essence of destruction." },
    { id: 'minor_b3_3', name: 'Piercing Beam', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your combustion beam can pierce through multiple enemies.", flavor: "The beam cuts through all." },
    
    { id: 'APEX_B', name: 'Fire Lord\'s Wrath', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Your fire burns so hot it turns blue, dealing significantly more damage and ignoring a portion of enemy fire resistance.", flavor: "This is the fire that melts mountains." },
    { id: 'minor_apex_b_1', name: 'Blue Inferno', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your blue fire burns even hotter and deals more damage.", flavor: "The blue fire consumes all." },
    { id: 'minor_apex_b_2', name: 'Heat Resistance', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "You become more resistant to fire damage while using blue fire.", flavor: "The fire cannot burn the fire." },
    { id: 'minor_apex_b_3', name: 'Blue Aura', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Your blue fire creates a protective aura around you.", flavor: "The blue fire protects its master." },

    // SUB-PATH C
    { id: 'C1', name: 'Consuming Flames', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Enemies defeated by your fire explode, dealing damage to other nearby enemies.", flavor: "Let the fire spread." },
    { id: 'minor_c1_1', name: 'Larger Explosions', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "The explosions from defeated enemies are larger.", flavor: "Death is just the beginning." },
    { id: 'minor_c1_2', name: 'Chain Reaction', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Explosions can trigger other explosions if enemies are close enough.", flavor: "One spark can start a wildfire." },
    { id: 'minor_c1_3', name: 'Consuming Blast', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Explosions from defeated enemies heal you slightly.", flavor: "The fire feeds its master." },
    
    { id: 'C2', name: 'Lingering Cinders', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Your fire attacks leave behind patches of burning embers that continue to damage enemies who stand in them.", flavor: "The fire's memory is long and hot." },
    { id: 'minor_c2_1', name: 'Longer Burning', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "The ember patches last longer and deal more damage over time.", flavor: "Some fires never truly die." },
    { id: 'minor_c2_2', name: 'Larger Patches', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "The ember patches cover a larger area.", flavor: "The fire spreads like a disease." },
    { id: 'minor_c2_3', name: 'Igniting Cinders', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Enemies who step in ember patches are set on fire.", flavor: "The cinders awaken the flame." },
    
    { id: 'C3', name: 'Rain of Fire', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Call down a meteor shower from the sky, bombarding a large area with fiery projectiles.", flavor: "Let the heavens burn." },
    { id: 'minor_c3_1', name: 'More Meteors', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your meteor shower creates more projectiles.", flavor: "The heavens rain fire." },
    { id: 'minor_c3_2', name: 'Larger Impact', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Each meteor creates a larger explosion on impact.", flavor: "The impact shakes the earth." },
    { id: 'minor_c3_3', name: 'Burning Rain', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Meteors leave behind burning patches where they land.", flavor: "The rain leaves fire in its wake." },
    
    { id: 'APEX_C', name: 'The Great Conflagration', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your fire can no longer be extinguished by water or conventional means. It burns until there is nothing left to consume.", flavor: "Some fires can never be put out." },
    { id: 'minor_apex_c_1', name: 'Unquenchable Flame', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your fire is even more resistant to being extinguished.", flavor: "The fire cannot be denied." },
    { id: 'minor_apex_c_2', name: 'Consuming Hunger', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your fire spreads more quickly to nearby flammable objects.", flavor: "The fire hungers for more." },
    { id: 'minor_apex_c_3', name: 'Eternal Burn', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Enemies set on fire by your attacks burn longer.", flavor: "The fire remembers its victims." },

    // ENDGAME
    { id: 'rite_destruction', name: 'Trial of Destruction', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Reduce a stone fortress to rubble using only fire within a set time limit.", flavor: "To create, you must first destroy." },
    { id: 'rite_fury', name: 'Trial of Fury', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Channel your pure, unfiltered rage into a single, devastating blast without losing consciousness.", flavor: "Control your anger, or it will control you." },
    { id: 'rite_fire', name: 'Trial of Fire', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Walk through the heart of an inferno you created, proving your immunity to your own flames.", flavor: "The fire cannot burn what is already fire." },
    { id: 'cap_phoenix_king', name: 'The Phoenix King', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_destruction', description: "Upon death, you are reborn in a massive explosion of fire, returning to full health and incinerating all nearby enemies.", flavor: "From the ashes, a new fire is born." },
    { id: 'cap_inferno', name: 'Living Inferno', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_fury', description: "You become an avatar of pure fire. Your body is wreathed in inextinguishable flame, and all your attacks are massively empowered.", flavor: "I am wrath. I am fire. I am destruction." },
    { id: 'cap_sozins_comet', name: 'Sozin\'s Comet', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_fire', description: "You can call down the power of a comet at will, massively amplifying all firebending in a huge radius for a short time.", flavor: "Today, the world will be remade in fire." },
    { id: 'schism_wildfire', name: 'The Wildfire', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your fire spreads uncontrollably to its surroundings and cannot be aimed precisely, but its damage is greatly increased.", flavor: "A fire that is not spreading is a fire that is dying." },
    { id: 'schism_self_immolation', name: 'Self Immolation', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_wildfire', description: "Your own life force becomes fuel for your fire. You take constant damage but your power becomes near-infinite.", flavor: "To become the ultimate fire, one must be willing to become ash." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'forge_of_wrath', constellation: 'fire', position: { x, y }, prerequisites, visual: { color: '#f38ba8', size: 50, icon: getForgeOfWrathNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const FORGE_OF_WRATH_NODES = nodes;
export const FORGE_OF_WRATH_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateForgeOfWrathConnections(): TalentConnection[] { return connections; }
export const FORGE_OF_WRATH_METADATA = { name: 'The Forge of Wrath', philosophy: "Fire is the Great Destroyer...", essence: "Unbridled destruction, consuming rage.", focus: "Offensive power, AoE damage, raw force.", sacredAnimal: "The Dragon", emoji: '🐉', color: '#f38ba8', position: { x: 800, y: 400 } };

function getForgeOfWrathNodeIcon(type: string): string {
  switch (type) { 
    case 'Genesis': return '🔥'; 
    case 'Keystone': return '💥'; 
    case 'Manifestation': return '☄️'; 
    case 'Axiom': return '☢️'; 
    case 'Capstone': return '👑'; 
    case 'GnosticRite': return '🙏'; 
    case 'Schism': return '☠️'; 
    case 'Minor': return '🔥'; 
    default: return '🔥'; 
  }
}