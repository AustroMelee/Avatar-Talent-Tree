/**
 * Path 2: The Crimson Tide - Blood Calls to Blood (Deterministically Generated)
 *
 * Path Philosophy: Life is water given purpose. Blood is the sacred river that connects all living things.
 * Focus: Life manipulation, healing mastery, forbidden blood arts.
 *
 * REFACTOR: Populated all descriptions and philosophies to match the design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 1000; const CENTER_Y = 500; const BRANCHES = 3;
const PATH_MAIN_ANGLE = 0; // To the right
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'Pulse of the Sacred River', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Feel the life-flow in all living things, allowing you to sense their vitality and injuries.", flavor: "Life is water given purpose. Blood is the sacred river that connects all living things." },

    // SUB-PATH A
    { id: 'A1', name: 'Keeper of Sacred Flows', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Use water to mend wounds, accelerating natural healing.", flavor: "To guide the river is to restore life." },
    { id: 'minor_a1_1', name: 'Swift Mending', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your healing works more quickly.", flavor: "A moment saved is a life saved." },
    { id: 'minor_a1_2', name: 'Potent Restoration', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your healing is more effective.", flavor: "A stronger current brings greater renewal." },
    { id: 'minor_a1_3', name: 'Gentle Touch', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your healing causes no pain or discomfort to the recipient.", flavor: "The river's touch is always gentle." },
    
    { id: 'A2', name: 'Shepherd of the Life-River', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create a pool of healing water that restores vitality to allies who enter it.", flavor: "All life drinks from the same river." },
    { id: 'minor_a2_1', name: 'Vitality Pool', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "The healing pool also grants a temporary boost to maximum health.", flavor: "Drink deep from the waters of life." },
    { id: 'minor_a2_2', name: 'Larger Pool', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your healing pool covers a larger area and can heal more allies simultaneously.", flavor: "The river's embrace is wide." },
    { id: 'minor_a2_3', name: 'Purifying Waters', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your healing pool also removes negative status effects from allies.", flavor: "The sacred river cleanses all." },
    
    { id: 'A3', name: 'Channel the Life-River\'s Mercy', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Perform a miraculous feat of healing, saving an ally from the brink of death.", flavor: "Where the river flows, life returns." },
    { id: 'minor_a3_1', name: 'Stronger Mercy', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your miraculous healing is more effective and reliable.", flavor: "The river's mercy knows no bounds." },
    { id: 'minor_a3_2', name: 'Faster Channeling', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "You can channel the life-river's mercy more quickly.", flavor: "The river answers when called." },
    { id: 'minor_a3_3', name: "Mercy's Echo", type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your miraculous healing also provides a temporary protective aura to the healed ally.", flavor: "The river's blessing lingers." },
    
    { id: 'APEX_A', name: 'Law: Blood Remembers Its Source', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Establish a blood link with an ally, allowing you to heal them from a great distance.", flavor: "The river always finds its way back to the source." },
    { id: 'minor_apex_a_1', name: 'Stronger Link', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your blood link provides more effective healing at a distance.", flavor: "The river's connection grows stronger." },
    { id: 'minor_apex_a_2', name: 'Longer Range', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your blood link can reach allies at greater distances.", flavor: "The river flows far and wide." },
    { id: 'minor_apex_a_3', name: 'Multiple Links', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can maintain blood links with multiple allies simultaneously.", flavor: "The river has many tributaries." },

    // SUB-PATH B
    { id: 'B1', name: 'Warden of Vital Essence', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Subtly influence the flow of life within an enemy, causing fatigue and slowing their movements.", flavor: "To control the tide is to control the body." },
    { id: 'minor_b1_1', name: 'Sapping Current', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "The slowing effect is more pronounced.", flavor: "Steal their strength, one drop at a time." },
    { id: 'minor_b1_2', name: 'Enervating Touch', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your influence also reduces their damage output.", flavor: "A tired fist has no force." },
    { id: 'minor_b1_3', name: 'Deeper Drain', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your influence affects enemies at greater distances.", flavor: "The river's reach is long." },
    
    { id: 'B2', name: 'Invoke the Crimson Communion', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Exert your will over the water within a target, briefly seizing control of their limbs.", flavor: "Your blood is my blood. Your body is my vessel." },
    { id: 'minor_b2_1', name: 'Iron Grip', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "It is harder for enemies to break free from your control.", flavor: "The puppet does not question the master." },
    { id: 'minor_b2_2', name: 'Longer Control', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "You can maintain control over enemies for longer periods.", flavor: "The master's will endures." },
    { id: 'minor_b2_3', name: 'Precise Control', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your control over enemy movements is more precise and coordinated.", flavor: "The puppeteer's hand is steady." },
    
    { id: 'B3', name: 'Manifest the Sacred Tide', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Under the full moon, your power over the sacred river becomes absolute, allowing you to puppet multiple enemies at once.", flavor: "The moon is the mother of tides, both of water and of blood." },
    { id: 'minor_b3_1', name: 'More Puppets', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "You can control more enemies simultaneously under the full moon.", flavor: "The tide controls many vessels." },
    { id: 'minor_b3_2', name: 'Stronger Manifestation', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your control over enemies is more powerful and difficult to resist.", flavor: "The sacred tide's power grows." },
    { id: 'minor_b3_3', name: 'Lunar Resonance', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your power is enhanced even during partial moons, not just full moons.", flavor: "The moon's influence is always present." },
    
    { id: 'APEX_B', name: 'Truth: Life Flows Where It Wills', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Break free from the lunar cycle, able to perform bloodbending at any time, though it is still strongest under the full moon.", flavor: "The tide is not commanded by the moon, but by the will." },
    { id: 'minor_apex_b_1', name: 'Independent Will', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your bloodbending is less dependent on lunar phases.", flavor: "The will is stronger than the moon." },
    { id: 'minor_apex_b_2', name: 'Stronger Truth', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your bloodbending is more powerful regardless of lunar phase.", flavor: "The truth of life is absolute." },
    { id: 'minor_apex_b_3', name: 'Flowing Mastery', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can perform more complex bloodbending techniques.", flavor: "The river flows as I command." },

    // SUB-PATH C
    { id: 'C1', name: 'Whispers of Vitality', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Give a portion of your own life force to an ally, instantly mending their wounds.", flavor: "A shared river is a stronger one." },
    { id: 'minor_c1_1', name: 'Generous Flow', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "The amount of health restored is increased.", flavor: "To give freely is the greatest strength." },
    { id: 'minor_c1_2', name: 'Efficient Transfer', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "The cost to your own life force is reduced.", flavor: "Do not empty your own river to fill another's." },
    { id: 'minor_c1_3', name: 'Vitality Bond', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "The transferred life force creates a temporary bond that enhances both you and your ally.", flavor: "Shared strength is multiplied strength." },
    
    { id: 'C2', name: 'Gentle Currents of Mercy', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Siphon a small amount of vitality from an enemy with each water-based attack, healing yourself.", flavor: "The river gives, and the river takes." },
    { id: 'minor_c2_1', name: 'Hungry Tide', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "The amount of vitality siphoned is increased.", flavor: "Even a small tributary feeds the great river." },
    { id: 'minor_c2_2', name: 'Flowing Mercy', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "The siphoned vitality also provides a small boost to your maximum health temporarily.", flavor: "The river grows stronger with each drop." },
    { id: 'minor_c2_3', name: 'Gentle Touch', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your vitality siphoning is more subtle and harder for enemies to detect.", flavor: "The river's touch is gentle but sure." },
    
    { id: 'C3', name: 'Warm Pools of Mercy', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Create a bond between yourself and your allies, sharing all healing and life force regeneration among the group.", flavor: "We are all drops in the same river." },
    { id: 'minor_c3_1', name: 'Larger Pool', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your mercy pool can include more allies in the bond.", flavor: "The river embraces all who seek it." },
    { id: 'minor_c3_2', name: 'Warmer Waters', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "The shared healing and regeneration is more effective.", flavor: "The warm waters heal faster." },
    { id: 'minor_c3_3', name: 'Enduring Bond', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "The bond between allies lasts longer and is more stable.", flavor: "The river's bonds are eternal." },
    
    { id: 'APEX_C', name: 'Certainty: The Sacred River Never Runs Dry', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your healing abilities no longer have a limit; you can restore life and mend wounds as long as you have the will.", flavor: "Life is an eternal, flowing river." },
    { id: 'minor_apex_c_1', name: 'Endless Flow', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your healing abilities are even more limitless and efficient.", flavor: "The river never runs dry." },
    { id: 'minor_apex_c_2', name: 'Sacred Certainty', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your healing can restore even the most severe and permanent injuries.", flavor: "The sacred river heals all wounds." },
    { id: 'minor_apex_c_3', name: "River's Blessing", type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Your healing abilities also provide permanent enhancements to those you heal.", flavor: "The river's blessing is eternal." },

    // ENDGAME
    { id: 'rite_healing', name: 'Trial of the Crimson Communion', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Heal a wound that cannot be healed, using your own life essence as the catalyst.", flavor: "To give life, one must be willing to give of their own." },
    { id: 'rite_life', name: 'Ordeal of Sacred Mercy', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Take control of a powerful being without harming them, guiding their actions with a gentle touch.", flavor: "True control is not domination, but guidance." },
    { id: 'rite_spirit', name: 'Vigil of the Life-River', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Sustain the life of a dying creature for a full day and night using only your bending.", flavor: "The river of life requires a steady hand to guide its course." },
    { id: 'cap_sacred_tide', name: 'The Sacred Tide Incarnate', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_healing', description: "Become a living nexus of life energy, passively healing all allies around you and making them immune to curses and poisons.", flavor: "I am the river, and where I flow, life blooms." },
    { id: 'cap_crimson_sovereign', name: 'The Crimson Sovereign', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_life', description: "Achieve mastery over the body, able to stop a heart with a thought or restart it, mend bones and sinew, or seize complete and total control over a person's form.", flavor: "All who have water within them are my subjects." },
    { id: 'cap_eternal_healer', name: 'The Eternal Healer', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_spirit', description: "You can sever a person's connection to their own life force and bind it to your own, effectively granting them immortality as long as you live.", flavor: "I am the keeper of the sacred river, and its waters will not run dry." },
    { id: 'schism_thirsting_vein', name: 'The Thirsting Vein', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Forcefully drain the life force from enemies to replenish your own, a corrupting act that empowers you but weakens your healing.", flavor: "Why should I give, when it is so much easier to take?" },
    { id: 'schism_puppet_master', name: 'The Puppet Master', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_thirsting_vein', description: "Your control becomes permanent. Those you bend become mindless puppets, their will forever erased. This act severs your connection to healing arts.", flavor: "Their will is gone. There is only mine." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'crimson_tide', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#74c7ec', size: 50, icon: getCrimsonTideNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const CRIMSON_TIDE_NODES = nodes;
export const CRIMSON_TIDE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateCrimsonTideConnections(): TalentConnection[] { return connections; }
export const CRIMSON_TIDE_METADATA = { name: 'The Crimson Tide', philosophy: "Life is water given purpose. Blood is the sacred river that connects all living things.", essence: "Healing, life-force manipulation, and forbidden arts.", focus: "Healing, control, and vitality transfer.", sacredAnimal: "The Serpent", emoji: '🐍', color: '#74c7ec', position: { x: 1000, y: 500 } };

function getCrimsonTideNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '🩸'; case 'Keystone': return '❤️‍🩹'; case 'Manifestation': return '🧬'; case 'Axiom': return '♾️'; case 'Capstone': return '👑'; case 'GnosticRite': return '🙏'; case 'Schism': return '⛓️'; case 'Minor': return '💧'; default: return '🩸'; }
} 