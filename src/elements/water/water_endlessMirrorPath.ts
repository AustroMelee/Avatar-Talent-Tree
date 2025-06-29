/**
 * Path 1: The Flowing Form - 流形 (Liú Xíng) (Canonically Refactored)
 *
 * Path Philosophy: "Water can flow or it can crash. Be water, my friend."
 * Essence: Versatility, mimicry of natural forms, reactive combat.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800; const CENTER_Y = 500; const BRANCHES = 2;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Flowing Form Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You instinctively sense the flow of water in the environment and the 'flow' of combat, making it easier to anticipate and react to an opponent's rhythm.", flavor: "Water is the element of change." },
    // Minors after Genesis
    { id: 'flowing_grace', name: 'Flowing Grace', type: 'Minor', cost: 1, branch: 0.7, depth: 0.5, prerequisite: 'genesis', description: "Your waterbending movements are more fluid and graceful, improving your overall technique.", flavor: "Move as the river moves." },
    { id: 'waters_touch', name: 'Water\'s Touch', type: 'Minor', cost: 1, branch: 1.3, depth: 0.5, prerequisite: 'genesis', description: "You can sense water sources nearby and feel their purity and strength.", flavor: "The water calls to you." },
    { id: 'reflective_surface', name: 'Reflective Surface', type: 'Minor', cost: 1, branch: 0.5, depth: 0.7, prerequisite: 'genesis', description: "You can create smooth, reflective surfaces of water that can be used for communication or observation.", flavor: "The mirror shows all things." },
    { id: 'mirrors_edge', name: 'Mirror\'s Edge', type: 'Minor', cost: 1, branch: 1.5, depth: 0.7, prerequisite: 'genesis', description: "Your water constructs have sharper, more defined edges, making them more effective as weapons.", flavor: "Sharper than steel." },
    { id: 'liquid_harmony', name: 'Liquid Harmony', type: 'Minor', cost: 1, branch: 1, depth: 0.9, prerequisite: 'genesis', description: "You can synchronize your movements with the natural flow of water, making your bending more efficient.", flavor: "Harmony in every drop." },
    // Sub-Path A - Adaptive Combat
    { id: 'octopus_form', name: 'Octopus Form', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Form multiple, semi-sentient water tendrils around your body for simultaneous offense and defense, mimicking the movements of a cephalopod.", flavor: "The octopus teaches us to be everywhere at once." },
    { id: 'grasping_tentacles', name: 'Grasping Tentacles', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'octopus_form', description: "Your tentacles can securely grab onto opponents, objects, or surfaces to pull or throw them.", flavor: "The river pulls what it touches." },
    { id: 'barbed_tendrils', name: 'Barbed Tendrils', type: 'Minor', cost: 1, branch: 0.2, depth: 1.7, prerequisite: 'octopus_form', description: "The tips of your tentacles can be frozen into sharp barbs for piercing damage.", flavor: "Barbs of ice, swift and silent." },
    { id: 'extended_reach', name: 'Extended Reach', type: 'Minor', cost: 1, branch: 0.4, depth: 1.9, prerequisite: 'octopus_form', description: "You can extend your tentacles to a much greater length, controlling the space around you.", flavor: "Reach beyond the horizon." },
    // Manifestation A2: Reactive Defense
    { id: 'reactive_defense', name: 'Reactive Defense', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'octopus_form', description: "When an opponent attacks, you can instantly pull water from a source to create a shield, parry with a whip, or even form a watery duplicate of yourself.", flavor: "Defense is the best offense." },
    { id: 'counter_current', name: 'Counter-Current', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'reactive_defense', description: "After blocking an attack, your water shield releases a powerful wave back at the attacker.", flavor: "The current always returns." },
    { id: 'vapor_decoy', name: 'Vapor Decoy', type: 'Minor', cost: 1, branch: 0.2, depth: 2.7, prerequisite: 'reactive_defense', description: "Your watery duplicate now dissolves into a thick cloud of mist, obscuring vision.", flavor: "Disappear in a cloud of mist." },
    // Axiom A3: Fluidic Motion
    { id: 'fluidic_motion', name: 'Fluidic Motion', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'genesis', description: "You no longer distinguish between your own movement and the movement of the water. Your body and your bending become one, allowing you to seamlessly transition between offense, defense, and mobility.", flavor: "You are the water." },
    { id: 'unbalancing_flow', name: 'Unbalancing Flow', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'fluidic_motion', description: "Every movement you make creates subtle currents at your opponent's feet, constantly disrupting their balance.", flavor: "Destabilize with every step." },
    { id: 'one_with_the_water', name: 'One with the Water', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'fluidic_motion', description: "While in contact with a large body of water, you can 'teleport' through it, dissolving into the water in one spot and reforming in another nearby.", flavor: "Become the river." },
    // Sub-Path B - Environmental Mastery
    { id: 'plantbending', name: 'Plantbending', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "By controlling the water within plants, you can manipulate them. This is most effective on water-rich plants like vines and seaweed but can be used to rustle trees or part grasses.", flavor: "The water in all things answers the call." },
    { id: 'vine_lash', name: 'Vine Lash', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'plantbending', description: "You can command vines to whip, ensnare, and constrict your opponents.", flavor: "The jungle is your ally." },
    { id: 'verdant_shield', name: 'Verdant Shield', type: 'Minor', cost: 1, branch: 1.2, depth: 1.7, prerequisite: 'plantbending', description: "You can rapidly grow a thick barrier of roots and leaves from the ground to block attacks.", flavor: "Nature's shield is swift." },
    { id: 'toxin_extraction', name: 'Toxin Extraction', type: 'Minor', cost: 1, branch: 1.4, depth: 1.9, prerequisite: 'plantbending', description: "You can use plantbending to draw natural poisons or toxins out of venomous plants for use.", flavor: "Extract the essence." },
    // Manifestation B2: State Shifting
    { id: 'state_shifting', name: 'State Shifting', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'plantbending', description: "You have mastered the rapid transition between water's three states. You can flash-freeze a wave into a wall, instantly melt that wall into a rushing torrent, and turn that torrent into a concealing cloud of steam.", flavor: "Change is your weapon." },
    { id: 'thermal_shock', name: 'Thermal Shock', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'state_shifting', description: "Your rapid temperature changes create stress in enemy armor and earth defenses, making them brittle.", flavor: "Break them with heat and cold." },
    { id: 'scalding_mist', name: 'Scalding Mist', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'state_shifting', description: "Your steam can be made intensely hot, creating a painful barrier that can cause burns on unprotected skin.", flavor: "Mist that burns." },
    // Axiom B3: Mirror of the World
    { id: 'mirror_of_the_world', name: 'Mirror of the World', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'plantbending', description: "You can create perfect reflections of the world around you using water, allowing you to see around corners, communicate over distances, and even create illusions.", flavor: "See all, be all." },
    { id: 'reflection_mastery', name: 'Reflection Mastery', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'mirror_of_the_world', description: "Your water mirrors can show events happening in other locations, allowing for remote observation.", flavor: "The world in a drop." },
    { id: 'illusion_weaving', name: 'Illusion Weaving', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'mirror_of_the_world', description: "You can create complex illusions using water and light, making it appear as if you are in multiple places at once.", flavor: "Weave the impossible." },
    // Existing and legacy minors (for compatibility)
    { id: 'minor_genesis_1', name: 'Water Whip', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Create a lashing tendril of water to swipe at an opponent. A fundamental and versatile technique.", flavor: "The whip is an extension of the river." },
    { id: 'minor_genesis_2', name: 'Water Gliding', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Form an ice surfboard or ride the crest of a wave to move at high speeds.", flavor: "The surface yields, but does not break." },
    { id: 'minor_of_1', name: 'Water Cloak', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'octopus_form', description: "A more defensive version that surrounds your entire body, allowing you to easily throw water into your environment.", flavor: "The river becomes your armor." },
    { id: 'minor_ws_1', name: 'Maelstrom', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'reactive_defense', description: "In a large body of water, expand your spout into a gigantic whirlpool, capable of trapping ships.", flavor: "The ocean itself becomes your weapon." },
    { id: 'minor_pb_1', name: 'Seaweed Manipulation', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'plantbending', description: "Specialize in manipulating seaweed from the ocean floor, creating a massive, monstrous form to fight on your behalf.", flavor: "As demonstrated by Huu." },
    { id: 'em_minor_1', name: 'Flowing Step', type: 'Minor', cost: 1, branch: 1.2, depth: 0.7, prerequisite: 'genesis', description: "Your movements are more fluid, making it easier to transition between stances.", flavor: "Act in concert with the environment." },
    { id: 'em_minor_2', name: 'Grasping Tendrils', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'octopus_form', description: "Your Octopus Form tentacles can more securely grab onto opponents and objects.", flavor: "The river pulls what it touches." },
    { id: 'em_minor_3', name: 'Verdant Growth', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'plantbending', description: "The plants you bend are more resilient and harder to destroy.", flavor: "The jungle is your ally." },
    { id: 'em_minor_4', name: 'Watery Grave', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'reactive_defense', description: "The center of your maelstrom pulls objects downward with much greater force.", flavor: "The abyss pulls deeper." },
    { id: 'em_minor_5', name: 'Surface Tension', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'plantbending', description: "It is easier to walk or run across the surface of water.", flavor: "The surface yields, but does not break." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'endless_mirror', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#74c7ec', size: 50, icon: getFlowingFormNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const FLOWING_FORM_NODES = nodes;
export const FLOWING_FORM_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateFlowingFormConnections(): TalentConnection[] { return connections; }
export const FLOWING_FORM_METADATA = { 
  name: 'The Flowing Form', 
  philosophy: "Water can flow or it can crash. Be water, my friend.", 
  essence: "Versatility, mimicry of natural forms, reactive combat.", 
  focus: "Adaptive combat and environmental mastery, inspired by Katara's versatile style.", 
  sacredAnimal: "The Koi Fish", 
  emoji: '🌊', 
  color: '#74c7ec', 
  position: { x: 800, y: 500 } 
};

function getFlowingFormNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '💧'; case 'Keystone': return '🌊'; case 'Manifestation': return '🔍'; case 'Axiom': return '📜'; case 'Capstone': return '🌀'; case 'GnosticRite': return '🙏'; case 'Schism': return '🔮'; case 'Minor': return '💧'; case 'Synthesis': return '⚛️'; case 'Bridge': return '🌉'; default: return '🌊'; }
} 