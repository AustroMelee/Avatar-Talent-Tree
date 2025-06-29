/**
 * Path 2: The Spring of Life - 活泉 (Huó Quán) (Canonically Refactored)
 *
 * Path Philosophy: "In the driest desert, a single drop of water is life. To master water is to understand the sacred flow of chi that animates all beings."
 * Essence: Healing, purification, chi manipulation, restoration, and the forbidden perversion of these arts.
 *
 * REFACTOR: Updated to match the "Depths Eternal" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 900; const CENTER_Y = 550; const BRANCHES = 2;
const PATH_MAIN_ANGLE = 0; // To the right
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'The Spring of Life Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can perceive the flow of chi within living beings, allowing you to see injuries, blockages, or imbalances as disruptions in their energy.", flavor: "Water is the element of change, and healing is its greatest expression." },
  // Minors after Genesis
  { id: 'healing_touch', name: 'Healing Touch', type: 'Minor', cost: 1, branch: 0.7, depth: 0.5, prerequisite: 'genesis', description: "Your touch has a calming effect, easing pain and reducing swelling even without active bending.", flavor: "A gentle hand soothes the spirit." },
  { id: 'lifes_flow', name: "Life's Flow", type: 'Minor', cost: 1, branch: 1.3, depth: 0.5, prerequisite: 'genesis', description: "You can sense the life force in all living things, making you more attuned to their needs.", flavor: "The river flows through all things." },
  { id: 'vital_waters', name: 'Vital Waters', type: 'Minor', cost: 1, branch: 0.5, depth: 0.7, prerequisite: 'genesis', description: "Water you bend has enhanced healing properties, making it more effective for treating wounds.", flavor: "Vitality in every drop." },
  { id: 'restorative_mist', name: 'Restorative Mist', type: 'Minor', cost: 1, branch: 1.5, depth: 0.7, prerequisite: 'genesis', description: "You can create a gentle mist that promotes healing and restores vitality to those who breathe it in.", flavor: "Mist that heals." },
  { id: 'renewing_rain', name: 'Renewing Rain', type: 'Minor', cost: 1, branch: 1, depth: 0.9, prerequisite: 'genesis', description: "You can create a light rain that washes away fatigue and minor ailments.", flavor: "Rain that renews." },
  // Sub-Path A - Focused Healing
  { id: 'chi_restoration', name: 'Chi Restoration', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Using water as a conduit, you physically guide a person's chi back into its proper pathways, mending cuts, knitting bones, and healing internal injuries.", flavor: "Restore the flow." },
  { id: 'accelerated_mending', name: 'Accelerated Mending', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'chi_restoration', description: "The healing process is significantly faster, allowing you to treat serious wounds in minutes rather than hours.", flavor: "Swift waters heal swiftly." },
  { id: 'deep_cleanse', name: 'Deep Cleanse', type: 'Minor', cost: 1, branch: 0.2, depth: 1.7, prerequisite: 'chi_restoration', description: "You can push poisons, infections, and other foreign agents out of the body with a focused flush of water and chi.", flavor: "Cleanse the body, cleanse the spirit." },
  { id: 'psychic_trauma_healing', name: 'Psychic Trauma Healing', type: 'Minor', cost: 1, branch: 0.4, depth: 1.9, prerequisite: 'chi_restoration', description: "By soothing the flow of chi to the brain, you can help heal mental trauma and break the effects of mind-altering drugs or techniques.", flavor: "Soothe the mind, heal the soul." },
  // Manifestation A2: Revitalizing Current
  { id: 'revitalizing_current', name: 'Revitalizing Current', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'chi_restoration', description: "By drawing on a large source of spiritually-charged water, you can perform incredible feats of healing, such as restoring scarred tissue, re-growing nerves, or even bringing someone back from the brink of death.", flavor: "The current restores all." },
  { id: 'group_renewal', name: 'Group Renewal', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'revitalizing_current', description: "You can channel the healing energy into a pool of water, allowing multiple people to be healed simultaneously.", flavor: "Heal the many." },
  { id: 'spirit_water_infusion', name: 'Spirit Water Infusion', type: 'Minor', cost: 1, branch: 0.2, depth: 2.7, prerequisite: 'revitalizing_current', description: "If you possess spirit water, this technique's power is amplified tenfold, capable of mending even catastrophic spiritual injuries.", flavor: "Spirit water, spirit healing." },
  // Axiom A3: Life's Spring
  { id: 'lifes_spring', name: "Life's Spring", type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'chi_restoration', description: "You can create a permanent source of healing water that continuously restores vitality to those who drink from it or bathe in it.", flavor: "The spring of life flows eternal." },
  { id: 'eternal_spring', name: 'Eternal Spring', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'lifes_spring', description: "Your healing spring can be made permanent, creating a lasting source of healing for your community.", flavor: "A well that never runs dry." },
  { id: 'lifes_blessing', name: "Life's Blessing", type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'lifes_spring', description: "Those who drink from your spring gain enhanced vitality and resistance to disease.", flavor: "Blessed by the water." },
  // Sub-Path B - The Forbidden Art
  { id: 'bloodbending', name: 'Bloodbending (Full Moon)', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "A dark revelation. You understand that all life is water, and you gain the terrifying ability to seize control of the fluids within another living being's body.", flavor: "The moon's shadow falls." },
  { id: 'subtle_puppetry', name: 'Subtle Puppetry', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'bloodbending', description: "You can exert fine motor control, forcing a target to stumble, drop a weapon, or miss an attack.", flavor: "Pull the strings." },
  { id: 'crushing_grip', name: 'Crushing Grip', type: 'Minor', cost: 1, branch: 1.2, depth: 1.7, prerequisite: 'bloodbending', description: "You can cause intense internal pain and paralysis by constricting the flow within a target's body.", flavor: "Pain from within." },
  // Manifestation B2: Psychic Bloodbending
  { id: 'psychic_bloodbending', name: 'Psychic Bloodbending', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'bloodbending', description: "You have severed the final ethical tether. Through immense willpower and talent, you no longer require the full moon to bloodbend.", flavor: "No moon, no mercy." },
  { id: 'blood_sense', name: 'Blood-Sense', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'psychic_bloodbending', description: "You can feel the heartbeats and locations of all living creatures around you, making it impossible for them to hide.", flavor: "Sense the pulse of life." },
  { id: 'severing_the_flow', name: 'Severing the Flow', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'psychic_bloodbending', description: "You can use bloodbending to block a bender's connection to their chi paths, temporarily severing their ability to bend.", flavor: "Cut the flow." },
  // Axiom B3: The Dark Tide
  { id: 'the_dark_tide', name: 'The Dark Tide', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'psychic_bloodbending', description: "You can control the blood of multiple targets simultaneously, creating a terrifying display of power that can incapacitate entire groups.", flavor: "The tide rises." },
  { id: 'mass_control', name: 'Mass Control', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'the_dark_tide', description: "You can control larger groups of people, though with less precision than individual control.", flavor: "Many as one." },
  { id: 'blood_storm', name: 'Blood Storm', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'the_dark_tide', description: "You can create a storm of blood droplets that can be used to attack or disorient enemies.", flavor: "A crimson rain falls." },
  // Existing and legacy minors (for compatibility)
  { id: 'minor_genesis_1', name: 'Purifying Water', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can use water to cleanse minor impurities and toxins from a wound or a drink.", flavor: "The river cleanses all it touches." },
  { id: 'minor_genesis_2', name: 'Spirit Calming', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Infused with spiritual knowledge, your healing can be used to calm angry or agitated spirits.", flavor: "A technique first demonstrated by Unalaq." },
  { id: 'minor_cond_1', name: 'Sweat Bending', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'chi_restoration', description: "If captured and deprived of water, you can bend the sweat from your own body to escape.", flavor: "The final reservoir is the self." },
  { id: 'minor_blood_1', name: 'Psychic Bloodbending', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'psychic_bloodbending', description: "Through immense talent and a specific bloodline, you no longer require the full moon to bloodbend. This is one of the most feared abilities in existence.", flavor: "A power held only by Yakone and his sons." },
  { id: 'ct_minor_1', name: 'Soothing Touch', type: 'Minor', cost: 1, branch: 0.8, depth: 0.7, prerequisite: 'genesis', description: "Your touch has a calming effect, easing minor pain and reducing swelling even without active bending.", flavor: "A gentle hand soothes the spirit." },
  { id: 'ct_minor_2', name: 'Herbal Knowledge', type: 'Minor', cost: 1, branch: 1.2, depth: 0.7, prerequisite: 'genesis', description: "You have an intuitive understanding of which plants have healing properties.", flavor: "The earth provides its own remedies." },
  { id: 'ct_minor_3', name: 'Accelerated Mending', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'chi_restoration', description: "The healing process for minor cuts and bruises is significantly faster.", flavor: "Swift waters heal swiftly." },
  { id: 'ct_minor_4', name: 'Resistant Constitution', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'chi_restoration', description: "You are slightly more resistant to poisons and sickness.", flavor: "A pure spirit repels all ills." },
  { id: 'ct_minor_5', name: 'Intimidating Presence', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'the_dark_tide', description: "Your mere presence is enough to make others uneasy, knowing the dark power you command.", flavor: "Fear is a powerful weapon." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'crimson_tide', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#f38ba8', size: 50, icon: getSpringOfLifeNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const SPRING_OF_LIFE_NODES = nodes;
export const SPRING_OF_LIFE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateSpringOfLifeConnections(): TalentConnection[] { return connections; }
export const SPRING_OF_LIFE_METADATA = { 
  name: 'The Spring of Life', 
  philosophy: "In the driest desert, a single drop of water is life. To master water is to understand the sacred flow of chi that animates all beings.", 
  essence: "Healing, purification, chi manipulation, restoration, and the forbidden perversion of these arts.", 
  focus: "Healing and the forbidden art of bloodbending, inspired by Katara and Hama.", 
  sacredAnimal: "The Moon Spirit", 
  emoji: '🌙', 
  color: '#f38ba8', 
  position: { x: 900, y: 550 } 
};

function getSpringOfLifeNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '💧'; case 'Keystone': return '🌊'; case 'Manifestation': return '🔍'; case 'Axiom': return '📜'; case 'Capstone': return '🌀'; case 'GnosticRite': return '🙏'; case 'Schism': return '🔮'; case 'Minor': return '💧'; case 'Synthesis': return '⚛️'; case 'Bridge': return '🌉'; default: return '🌊'; }
} 