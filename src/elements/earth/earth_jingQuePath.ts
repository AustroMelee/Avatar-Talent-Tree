/**
 * Path 4: The Sculptor's Hand (Precision) - "The Artisan's Touch"
 *
 * Philosophy: "A master can command every grain of sand. True control lies not in power, but in precision."
 * Essence: Fine control, environmental manipulation, architectural bending, the art of the earth.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI; // Leftwards
const RADIUS_STEP = 320;
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Sculptor\'s Hand Path', type: 'Genesis', cost: 1, description: "Your connection to earth becomes more refined. You can easily shape rock into simple tools, spheres, or sharp edges.", flavor: "True control lies in precision." },
    
    // Minor nodes after Genesis
    { id: 'dust_control', name: 'Dust Control', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can manipulate fine particles of dust and sand to create concealing clouds or clear the air.", flavor: "The smallest things can blind a giant." },
    { id: 'stone_shaping', name: 'Stone Shaping', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can easily shape rock into simple tools, spheres, or sharp edges without shattering it.", flavor: "The sculptor's touch is gentle yet firm." },
    { id: 'microscopic_awareness', name: 'Microscopic Awareness', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense and manipulate individual grains of sand and tiny particles of earth.", flavor: "The master sees what others cannot." },
    { id: 'smooth_transitions', name: 'Smooth Transitions', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your earthbending movements are fluid and precise, with no wasted motion or energy.", flavor: "Efficiency is the hallmark of mastery." },
    { id: 'architectural_vision', name: 'Architectural Vision', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can visualize complex structures and shapes in your mind before creating them with earthbending.", flavor: "The architect sees the finished work before the first stone is moved." },
    
    // Sub-Path A - Environmental Control
    { id: 'earth_gauntlets', name: 'Earth Gauntlets', type: 'Keystone', cost: 2, prerequisite: 'dust_control', description: "You can form stone around your hands and feet, which can be shaped into restraints, climbing claws, or used to adhere to stone surfaces.", flavor: "The signature technique of the Dai Li." },
    { id: 'remote_binding', name: 'Remote Binding', type: 'Minor', cost: 1, prerequisite: 'earth_gauntlets', description: "You can launch these gauntlets to bind an opponent's hands or feet from a distance.", flavor: "The sculptor's reach is long." },
    { id: 'adhesive_touch', name: 'Adhesive Touch', type: 'Minor', cost: 1, prerequisite: 'earth_gauntlets', description: "Your gauntlets can stick to any surface, allowing for incredible climbing and mobility.", flavor: "The stone becomes your anchor." },
    
    { id: 'quicksand_trap', name: 'Quicksand Trap', type: 'Manifestation', cost: 4, prerequisite: 'earth_gauntlets', description: "You can turn a large patch of solid ground into swirling sand or thick, inescapable mud, trapping any who enter.", flavor: "The softest ground can be the deadliest trap." },
    { id: 'selective_solidity', name: 'Selective Solidity', type: 'Minor', cost: 1, prerequisite: 'quicksand_trap', description: "You and your allies can walk across your quicksand traps as if they were solid ground.", flavor: "The sculptor controls the ground's nature." },
    { id: 'liquid_earth', name: 'Liquid Earth', type: 'Minor', cost: 1, prerequisite: 'quicksand_trap', description: "You can make earth flow like water, creating streams and currents of stone.", flavor: "The earth flows at the sculptor's command." },
    
    { id: 'architectural_bending', name: 'Architectural Bending', type: 'Axiom', cost: 5, prerequisite: 'quicksand_trap', description: "Your control is so precise you can rapidly raise complex structures from the earth: houses, bridges, or entire defensive fortifications.", flavor: "The world is my quarry, and I am the architect." },
    { id: 'trap_master', name: 'Trap Master', type: 'Minor', cost: 1, prerequisite: 'architectural_bending', description: "You can build hidden pitfalls, spring-loaded stone spikes, and other mechanical traps into your architecture.", flavor: "The architect's vision includes all possibilities." },
    { id: 'living_architecture', name: 'Living Architecture', type: 'Minor', cost: 1, prerequisite: 'architectural_bending', description: "Your structures can shift and change, adapting to the needs of the moment.", flavor: "The building breathes with life." },
    
    // Sub-Path B - Advanced Mobility
    { id: 'sand_spout', name: 'Sand Spout', type: 'Keystone', cost: 2, prerequisite: 'stone_shaping', description: "By creating a miniature cyclone of sand, you can ride atop it for high-speed travel across the ground, much like a sand-sailer.", flavor: "The style resembles air and waterbending." },
    { id: 'dust_devil', name: 'Dust Devil', type: 'Minor', cost: 1, prerequisite: 'sand_spout', description: "You can create smaller, mobile dust devils to harass and blind your opponents.", flavor: "The storm grows fiercer." },
    { id: 'sand_surfing', name: 'Sand Surfing', type: 'Minor', cost: 1, prerequisite: 'sand_spout', description: "You can ride waves of sand across any terrain, moving with incredible speed and grace.", flavor: "The desert becomes your road." },
    
    { id: 'earth_glide', name: 'Earth Glide', type: 'Manifestation', cost: 4, prerequisite: 'sand_spout', description: "You can move through rock as if it were water, 'swimming' beneath the surface to bypass obstacles or launch surprise attacks.", flavor: "The earth is not a barrier, but a path." },
    { id: 'silent_passage', name: 'Silent Passage', type: 'Minor', cost: 1, prerequisite: 'earth_glide', description: "Your movement through the earth is nearly silent, leaving behind almost no trace.", flavor: "The sculptor moves unseen." },
    { id: 'subterranean_sight', name: 'Subterranean Sight', type: 'Minor', cost: 1, prerequisite: 'earth_glide', description: "You can see through the earth while gliding, allowing you to navigate complex underground passages.", flavor: "The earth's secrets are revealed." },
    
    { id: 'dust_stepping', name: 'Dust Stepping', type: 'Axiom', cost: 5, prerequisite: 'earth_glide', description: "The pinnacle of fine control and mobility. You can solidify small platforms of dust or sand beneath your feet, allowing you to 'step' through the air or run up vertical surfaces.", flavor: "The sculptor walks on air." },
    { id: 'shifting_sands', name: 'Shifting Sands', type: 'Minor', cost: 1, prerequisite: 'dust_stepping', description: "While dust stepping, you can manipulate the sand around you to create offensive projectiles or defensive shields.", flavor: "The sand dances at your command." },
    { id: 'air_walker', name: 'Air Walker', type: 'Minor', cost: 1, prerequisite: 'dust_stepping', description: "You can create invisible platforms of compressed air and earth particles, allowing you to walk on air itself.", flavor: "The sculptor defies gravity." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getSculptorsHandNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🎨';
        case 'Keystone': return '🖐️';
        case 'Axiom': return '🏗️';
        case 'Manifestation': return '🏜️';
        case 'Minor': return '💎';
        default: return '💎';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'jing_que', constellation: 'earth', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#DEB887', size: 50, icon: getSculptorsHandNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
        isAllocated: false, isLocked: !!prerequisites.length, isPermanentlyLocked: false, pkCost: d.cost, type: d.type as NodeType
    };
    nodes.push(node);
    nodeMap[node.id] = node;
});

const placeChildren = (parentId: string, parentAngle: number) => {
    const children = nodes.filter(n => n.prerequisites.includes(parentId));
    const parentNode = nodeMap[parentId];
    if (!parentNode || children.length === 0) return;

    // Custom spread for major sub-branches
    let spread = DEFAULT_SPREAD_ANGLE;
    if (parentId === 'earth_gauntlets' || parentId === 'sand_spout') spread = WIDE_SPREAD_ANGLE;
    const angleStep = spread / (children.length > 1 ? children.length - 1 : 1);
    // For Manifestation/Axiom, fan outward from the main path
    const startAngle = parentAngle - spread / 2;
    children.forEach((child, index) => {
        const angle = children.length > 1 ? startAngle + index * angleStep : parentAngle;
        child.position = {
            x: parentNode.position.x + RADIUS_STEP * Math.cos(angle),
            y: parentNode.position.y + RADIUS_STEP * Math.sin(angle)
        };
        placeChildren(child.id, angle);
    });
};
placeChildren('genesis', PATH_MAIN_ANGLE);

nodes.forEach(node => node.prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: node.id, isActive: false, isLocked: false });
}));

export const SCULPTORS_HAND_NODES = nodes;
export function generateSculptorsHandConnections(): TalentConnection[] { return connections; }
export const SCULPTORS_HAND_METADATA = {
    name: 'The Sculptor\'s Hand',
    philosophy: "A master can command every grain of sand. True control lies not in power, but in precision.",
    essence: "Fine control, environmental manipulation, and architectural bending.",
    focus: "Precision control and architectural mastery, inspired by the Dai Li and Toph's sandbending.",
    sacredAnimal: "The Badgermole",
    emoji: '🎨',
    color: '#DEB887',
    position: { x: 440, y: 420 }
};