import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI / 2; // CORRECTED: Downwards

// Helper data
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'The Patient Glacier Path', type: 'Genesis', cost: 1, description: "The water you bend is naturally colder. Your touch can leave a layer of frost on surfaces, and your water attacks carry a numbing chill.", flavor: "The glacier endures the sun." },
  // Minors after Genesis
  { id: 'frosts_embrace', name: "Frost's Embrace", type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can create a layer of frost on any surface, making it slippery and dangerous.", flavor: "The cold comes quickly." },
  { id: 'ices_heart', name: "Ice's Heart", type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your connection to ice makes you more resistant to cold and allows you to create stronger ice structures.", flavor: "The heart of winter beats within you." },
  // Sub-Path A - Ice Offense
  { id: 'ice_projectiles', name: 'Ice Projectiles', type: 'Keystone', cost: 2, prerequisite: 'frosts_embrace', description: "You can instantly pull moisture from the air or a water source to form and launch sharp projectiles.", flavor: "The glacier rains its fury." },
  { id: 'shard_volley', name: 'Shard Volley', type: 'Minor', cost: 1, prerequisite: 'ice_projectiles', description: "You launch a rapid-fire volley of smaller, faster ice shards instead of a single large one.", flavor: "A storm of ice." },
  { id: 'ice_discs', name: 'Ice Discs', type: 'Minor', cost: 1, prerequisite: 'ice_projectiles', description: "You form your projectiles into spinning discs that can be guided to curve around obstacles or bounce off surfaces.", flavor: "Discs that dance." },
  // Manifestation A2: Glacial Armor
  { id: 'glacial_armor', name: 'Glacial Armor', type: 'Manifestation', cost: 4, prerequisite: 'ice_projectiles', description: "You encase parts of your body in thick, articulated plates of incredibly dense ice, granting you immense physical protection and turning your strikes into bludgeoning attacks.", flavor: "Armor of the north." },
  { id: 'razor_claws', name: 'Razor Claws', type: 'Minor', cost: 1, prerequisite: 'glacial_armor', description: "You form long, sharp claws on your gauntlets for slashing and climbing icy surfaces.", flavor: "Claws of the glacier." },
  { id: 'unflinching_bastion', name: 'Unflinching Bastion', type: 'Minor', cost: 1, prerequisite: 'glacial_armor', description: "The armor is so resilient it can withstand direct hits from earth projectiles or fire blasts with minimal damage.", flavor: "Stand unbroken." },
  // Axiom A3: Inevitable Spear
  { id: 'inevitable_spear', name: 'Inevitable Spear', type: 'Axiom', cost: 5, prerequisite: 'ice_projectiles', description: "You create a spear of ice so perfectly formed and dense it is nearly transparent. Launched with immense force, it can pierce through steel plate and stone walls.", flavor: "The spear that ends all things." },
  { id: 'water_drill', name: 'Water Drill', type: 'Minor', cost: 1, prerequisite: 'inevitable_spear', description: "Instead of launching the spear, you can spin it at high speeds, allowing you to drill through nearly any defense if you can maintain contact.", flavor: "Drill through the world." },
  { id: 'glacial_fissure', name: 'Glacial Fissure', type: 'Minor', cost: 1, prerequisite: 'inevitable_spear', description: "When the spear strikes the ground, it sends a rapidly expanding line of jagged ice spikes erupting from the earth towards your target.", flavor: "The earth splits with cold." },
  // Sub-Path B - Ice Defense
  { id: 'ice_wall', name: 'Ice Wall', type: 'Keystone', cost: 2, prerequisite: 'ices_heart', description: "You raise a solid wall of ice from a water source or the moisture in the air to serve as a barrier.", flavor: "The glacier stands between you and harm." },
  { id: 'wave_wall', name: 'Wave Wall', type: 'Minor', cost: 1, prerequisite: 'ice_wall', description: "Instead of a static wall, you freeze the face of an oncoming wave, creating a moving barrier that crashes into your enemies.", flavor: "A wall that moves." },
  { id: 'dome_of_frost', name: 'Dome of Frost', type: 'Minor', cost: 1, prerequisite: 'ice_wall', description: "You can form the wall into a protective dome around yourself and your allies.", flavor: "A dome of safety." },
  // Manifestation B2: Flash Freeze
  { id: 'flash_freeze', name: 'Flash Freeze', type: 'Manifestation', cost: 4, prerequisite: 'ice_wall', description: "You can instantly drop the temperature in a large area, freezing the surface of a lake, encasing multiple opponents' feet in blocks of ice, or creating massive, complex structures.", flavor: "Freeze the world." },
  { id: 'cryo_prison', name: 'Cryo-Prison', type: 'Minor', cost: 1, prerequisite: 'flash_freeze', description: "You can trap a single opponent in a solid block of ice, completely immobilizing them without causing fatal injury.", flavor: "Imprison with mercy." },
  { id: 'iceberg_caltrop', name: 'Iceberg Caltrop', type: 'Minor', cost: 1, prerequisite: 'flash_freeze', description: "You can cause the ground in an area to erupt with sharp, ankle-high ice spikes, creating hazardous terrain for enemies.", flavor: "The ground bites." },
  // Axiom B3: The Frozen Fortress
  { id: 'frozen_fortress', name: 'The Frozen Fortress', type: 'Axiom', cost: 5, prerequisite: 'flash_freeze', description: "You can create an entire fortress of ice, complete with walls, towers, and defensive structures that can withstand any attack.", flavor: "A fortress of winter." },
  { id: 'living_ice', name: 'Living Ice', type: 'Minor', cost: 1, prerequisite: 'frozen_fortress', description: "Your ice fortress can shift and change, adapting to different threats and situations.", flavor: "The fortress lives." },
  { id: 'eternal_winter', name: 'Eternal Winter', type: 'Minor', cost: 1, prerequisite: 'frozen_fortress', description: "Your fortress maintains its structure even in warm environments, creating a permanent stronghold.", flavor: "Winter never ends." },
];

const SPREAD_ANGLE = Math.PI / 3;
const RADIUS_STEP = 220;
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getNodeIcon(type: string): string { 
    switch (type) { 
        case 'Genesis': return '💧'; 
        case 'Keystone': return '❄️'; 
        case 'Manifestation': return '🧊'; 
        case 'Axiom': return '📜'; 
        case 'Minor': return '💧'; 
        default: return '🌊'; 
    } 
}

nodeDataList.forEach(d => { 
    const prerequisites = d.prerequisite ? [d.prerequisite] : []; 
    const node: TalentNode = { 
        ...d, 
        id: d.id, 
        path: 'eternal_prison', 
        constellation: 'water', 
        position: { x: 0, y: 0 }, 
        prerequisites, 
        visual: { color: '#89dceb', size: 50, icon: getNodeIcon(d.type) }, 
        effects: [], 
        isVisible: true, 
        isAllocatable: !prerequisites.length, 
        isAllocated: false, 
        isLocked: !!prerequisites.length, 
        isPermanentlyLocked: false, 
        pkCost: d.cost, 
        type: d.type as NodeType 
    }; 
    nodes.push(node); 
    nodeMap[node.id] = node; 
});

const placeChildren = (parentId: string, parentAngle: number) => { 
    const children = nodes.filter(n => n.prerequisites.includes(parentId)); 
    const parent = nodeMap[parentId]; 
    if (!parent || children.length === 0) return; 
    const angleStep = SPREAD_ANGLE / (children.length > 1 ? children.length - 1 : 1); 
    const startAngle = parentAngle - SPREAD_ANGLE / 2; 
    children.forEach((child, i) => { 
        const angle = children.length > 1 ? startAngle + i * angleStep : parentAngle; 
        child.position = { 
            x: parent.position.x + RADIUS_STEP * Math.cos(angle), 
            y: parent.position.y + RADIUS_STEP * Math.sin(angle) 
        }; 
        placeChildren(child.id, angle); 
    }); 
};

placeChildren('genesis', PATH_MAIN_ANGLE);
nodes.forEach(n => n.prerequisites.forEach(p => connections.push({ from: p, to: n.id, isActive: false, isLocked: false })));

export const PATIENT_GLACIER_NODES = nodes; 
export function generatePatientGlacierConnections(): TalentConnection[] { return connections; } 
export const PATIENT_GLACIER_METADATA = { 
    name: 'The Patient Glacier', 
    philosophy: "The river carves the canyon, but the glacier moves the mountain. Patience is not inaction; it is the slow accumulation of unstoppable power.", 
    essence: "Ice-based offense and defense, structural creation, and overwhelming force through solid mass.", 
    focus: "Ice bending mastery and structural creation, inspired by Master Pakku and the Northern Water Tribe.", 
}; 