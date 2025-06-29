/**
 * Path 3: The Patient Glacier - 冰川 (Bīng Chuān) (Canonically Refactored)
 *
 * Path Philosophy: "The river carves the canyon, but the glacier moves the mountain. Patience is not inaction; it is the slow accumulation of unstoppable power."
 * Essence: Ice-based offense and defense, structural creation, and overwhelming force through solid mass.
 *
 * REFACTOR: Updated to match the "Depths Eternal" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 700; const CENTER_Y = 550; const BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI; // To the left
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'The Patient Glacier Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "The water you bend is naturally colder. Your touch can leave a layer of frost on surfaces, and your water attacks carry a numbing chill.", flavor: "The glacier endures the sun." },
  // Minors after Genesis
  { id: 'frosts_embrace', name: "Frost's Embrace", type: 'Minor', cost: 1, branch: 0.7, depth: 0.5, prerequisite: 'genesis', description: "You can create a layer of frost on any surface, making it slippery and dangerous.", flavor: "The cold comes quickly." },
  { id: 'ices_heart', name: "Ice's Heart", type: 'Minor', cost: 1, branch: 1.3, depth: 0.5, prerequisite: 'genesis', description: "Your connection to ice makes you more resistant to cold and allows you to create stronger ice structures.", flavor: "The heart of winter beats within you." },
  { id: 'frozen_time', name: 'Frozen Time', type: 'Minor', cost: 1, branch: 0.5, depth: 0.7, prerequisite: 'genesis', description: "You can slow down the movement of water, making it easier to freeze and control.", flavor: "Time slows in the cold." },
  { id: 'crystal_clarity', name: 'Crystal Clarity', type: 'Minor', cost: 1, branch: 1.5, depth: 0.7, prerequisite: 'genesis', description: "Your ice structures are more transparent and beautiful, reflecting light in dazzling patterns.", flavor: "Beauty in every flake." },
  { id: 'winters_touch', name: "Winter's Touch", type: 'Minor', cost: 1, branch: 1, depth: 0.9, prerequisite: 'genesis', description: "Your presence brings a chill to the air, making the environment colder around you.", flavor: "Winter follows in your wake." },
  // Sub-Path A - Ice Offense
  { id: 'ice_projectiles', name: 'Ice Projectiles', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You can instantly pull moisture from the air or a water source to form and launch sharp projectiles.", flavor: "The glacier rains its fury." },
  { id: 'shard_volley', name: 'Shard Volley', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'ice_projectiles', description: "You launch a rapid-fire volley of smaller, faster ice shards instead of a single large one.", flavor: "A storm of ice." },
  { id: 'ice_discs', name: 'Ice Discs', type: 'Minor', cost: 1, branch: 0.2, depth: 1.7, prerequisite: 'ice_projectiles', description: "You form your projectiles into spinning discs that can be guided to curve around obstacles or bounce off surfaces.", flavor: "Discs that dance." },
  { id: 'cryo_core', name: 'Cryo-Core', type: 'Minor', cost: 1, branch: 0.4, depth: 1.9, prerequisite: 'ice_projectiles', description: "Your projectiles explode on impact, covering the target and surrounding area in a layer of slippery, numbing ice.", flavor: "Explosive cold." },
  // Manifestation A2: Glacial Armor
  { id: 'glacial_armor', name: 'Glacial Armor', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'ice_projectiles', description: "You encase parts of your body in thick, articulated plates of incredibly dense ice, granting you immense physical protection and turning your strikes into bludgeoning attacks.", flavor: "Armor of the north." },
  { id: 'razor_claws', name: 'Razor Claws', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'glacial_armor', description: "You form long, sharp claws on your gauntlets for slashing and climbing icy surfaces.", flavor: "Claws of the glacier." },
  { id: 'unflinching_bastion', name: 'Unflinching Bastion', type: 'Minor', cost: 1, branch: 0.2, depth: 2.7, prerequisite: 'glacial_armor', description: "The armor is so resilient it can withstand direct hits from earth projectiles or fire blasts with minimal damage.", flavor: "Stand unbroken." },
  // Axiom A3: Inevitable Spear
  { id: 'inevitable_spear', name: 'Inevitable Spear', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'ice_projectiles', description: "You create a spear of ice so perfectly formed and dense it is nearly transparent. Launched with immense force, it can pierce through steel plate and stone walls.", flavor: "The spear that ends all things." },
  { id: 'water_drill', name: 'Water Drill', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'inevitable_spear', description: "Instead of launching the spear, you can spin it at high speeds, allowing you to drill through nearly any defense if you can maintain contact.", flavor: "Drill through the world." },
  { id: 'glacial_fissure', name: 'Glacial Fissure', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'inevitable_spear', description: "When the spear strikes the ground, it sends a rapidly expanding line of jagged ice spikes erupting from the earth towards your target.", flavor: "The earth splits with cold." },
  // Sub-Path B - Ice Defense
  { id: 'ice_wall', name: 'Ice Wall', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You raise a solid wall of ice from a water source or the moisture in the air to serve as a barrier.", flavor: "The glacier stands between you and harm." },
  { id: 'wave_wall', name: 'Wave Wall', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'ice_wall', description: "Instead of a static wall, you freeze the face of an oncoming wave, creating a moving barrier that crashes into your enemies.", flavor: "A wall that moves." },
  { id: 'dome_of_frost', name: 'Dome of Frost', type: 'Minor', cost: 1, branch: 1.2, depth: 1.7, prerequisite: 'ice_wall', description: "You can form the wall into a protective dome around yourself and your allies.", flavor: "A dome of safety." },
  // Manifestation B2: Flash Freeze
  { id: 'flash_freeze', name: 'Flash Freeze', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'ice_wall', description: "You can instantly drop the temperature in a large area, freezing the surface of a lake, encasing multiple opponents' feet in blocks of ice, or creating massive, complex structures.", flavor: "Freeze the world." },
  { id: 'cryo_prison', name: 'Cryo-Prison', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'flash_freeze', description: "You can trap a single opponent in a solid block of ice, completely immobilizing them without causing fatal injury.", flavor: "Imprison with mercy." },
  { id: 'iceberg_caltrop', name: 'Iceberg Caltrop', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'flash_freeze', description: "You can cause the ground in an area to erupt with sharp, ankle-high ice spikes, creating hazardous terrain for enemies.", flavor: "The ground bites." },
  // Axiom B3: The Frozen Fortress
  { id: 'frozen_fortress', name: 'The Frozen Fortress', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'flash_freeze', description: "You can create an entire fortress of ice, complete with walls, towers, and defensive structures that can withstand any attack.", flavor: "A fortress of winter." },
  { id: 'living_ice', name: 'Living Ice', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'frozen_fortress', description: "Your ice fortress can shift and change, adapting to different threats and situations.", flavor: "The fortress lives." },
  { id: 'eternal_winter', name: 'Eternal Winter', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'frozen_fortress', description: "Your fortress maintains its structure even in warm environments, creating a permanent stronghold.", flavor: "Winter never ends." },
  // Existing and legacy minors (for compatibility)
  { id: 'minor_genesis_1', name: 'Ice Sled', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Craft a sled of ice and propel it forward with your bending for high-speed travel.", flavor: "The glacier glides where others stumble." },
  { id: 'minor_genesis_2', name: 'Creeping Ice', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Send a ray of ice speeding along the ground to freeze an opponent's feet in place.", flavor: "The glacier's touch is swift and cold." },
  { id: 'minor_iw_1', name: 'Ice Dome', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'ice_wall', description: "Surround a foe in a sphere of water and freeze it, or form a protective shell around yourself.", flavor: "The glacier shelters all within." },
  { id: 'minor_ip_1', name: 'Ice Tunneling', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'frozen_fortress', description: "You are able to swim through thick ice with the same ease as through water, allowing for surprise attacks.", flavor: "The glacier is not a barrier, but a path." },
  { id: 'gp_minor_1', name: 'Breath of Ice', type: 'Minor', cost: 1, branch: 0.8, depth: 0.7, prerequisite: 'genesis', description: "You can use the water vapor in your breath to rapidly freeze small objects or create frost.", flavor: "The cold comes from within." },
  { id: 'gp_minor_2', name: 'Permafrost', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'ice_wall', description: "Ice structures you create melt much slower than normal.", flavor: "The glacier endures the sun." },
  { id: 'gp_minor_3', name: 'Shard Volley', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'ice_projectiles', description: "You can launch a rapid-fire volley of smaller, faster ice shards.", flavor: "The glacier rains its fury." },
  { id: 'gp_minor_4', name: 'Ice Claws', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'glacial_armor', description: "You can form sharp claws of ice around your fingers for climbing or close-quarters combat.", flavor: "The glacier's grip is sharp." },
  { id: 'gp_minor_5', name: 'Glacial Armor', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'glacial_armor', description: "You can encase parts of your body in thick ice, granting you enhanced protection.", flavor: "The glacier is its own shield." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'eternal_prison', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#89dceb', size: 50, icon: getPatientGlacierNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const PATIENT_GLACIER_NODES = nodes;
export const PATIENT_GLACIER_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generatePatientGlacierConnections(): TalentConnection[] { return connections; }
export const PATIENT_GLACIER_METADATA = { 
  name: 'The Patient Glacier', 
  philosophy: "The river carves the canyon, but the glacier moves the mountain. Patience is not inaction; it is the slow accumulation of unstoppable power.", 
  essence: "Ice-based offense and defense, structural creation, and overwhelming force through solid mass.", 
  focus: "Ice bending mastery and structural creation, inspired by Master Pakku and the Northern Water Tribe.", 
  sacredAnimal: "The Polar Bear Dog", 
  emoji: '❄️', 
  color: '#89dceb', 
  position: { x: 700, y: 550 } 
};

function getPatientGlacierNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '💧'; case 'Keystone': return '🌊'; case 'Manifestation': return '🔍'; case 'Axiom': return '📜'; case 'Capstone': return '🌀'; case 'GnosticRite': return '🙏'; case 'Schism': return '🔮'; case 'Minor': return '💧'; case 'Synthesis': return '⚛️'; case 'Bridge': return '🌉'; default: return '🌊'; }
} 