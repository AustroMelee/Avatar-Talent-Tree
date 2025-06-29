/**
 * Path 4: The Sculptor's Hand (Precision) - "The Sculptor's Mind" (Canonically Refactored)
 *
 * Path Philosophy: "A master does not just move mountains; they can command every grain of sand."
 * Essence: Fine control, environmental manipulation, advanced mobility, and architectural bending.
 *
 * REFACTOR: Updated to match the "Four Pillars of Stone" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 770;
const CENTER_Y = 500;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI; // To the left
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Sculptor\'s Hand Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your connection to earth becomes more refined. You can easily shape rock into simple tools, spheres, or sharp edges without shattering it.", flavor: "True control lies in precision." },
    // Minors after Genesis
    { id: 'rock_gloves', name: 'Rock Gloves & Shoes', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Cover your hands and feet in stone. The gloves can be projected to grab and restrain opponents, while the shoes allow you to slide quickly or cling to walls.", flavor: "The signature technique of the Dai Li." },
    { id: 'minor_rg_1', name: 'Magnetization', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'rock_gloves', description: "Magnetize your rock-covered limbs to any stone surface, allowing you to easily scale walls or hang from ceilings.", flavor: "As used by the Dai Li in Lake Laogai." },
    // Sub-Path A - Environmental Control
    { id: 'architectural_bending', name: 'Architectural Bending', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'rock_gloves', description: "Your control is so precise you can rapidly raise complex structures from the earth: houses, bridges with arches, or entire defensive fortifications.", flavor: "The world is my quarry, and I am the architect." },
    // Sub-Path B - Advanced Mobility
    { id: 'sandbending', name: 'Sandbending', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Adapt your style for use in the desert. You can move quickly on sand-sailers by bending miniature sandstorms behind their sails.", flavor: "Because sand is sediment which travels in flows, the style resembles air and waterbending." },
    { id: 'sand_spout', name: 'Sand Spout', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'sandbending', description: "Manipulate fine sand particulates to form a whirling column, similar to an air or water spout.", flavor: "As used by the sandbenders to propel their sailers." },
    { id: 'minor_ss_1', name: 'Quicksand', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'sand_spout', description: "Turn a patch of solid ground into quicksand to immobilize an enemy.", flavor: "The softest ground can be the deadliest trap." },
    
    // Additional Minor Nodes
    { id: 'sh_minor_1', name: 'Dust Control', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can manipulate fine particles of dust and sand to create concealing clouds or clear the air.", flavor: "The smallest things can blind a giant." },
    { id: 'sh_minor_2', name: 'Stone Shaping', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can easily shape rock into simple tools, spheres, or sharp edges without shattering it.", flavor: "The sculptor's touch is gentle yet firm." },
    { id: 'sh_minor_3', name: 'Microscopic Awareness', type: 'Minor', cost: 1, branch: -0.2, depth: 0.5, prerequisite: 'genesis', description: "You can sense and manipulate individual grains of sand and tiny particles of earth.", flavor: "The master sees what others cannot." },
    { id: 'sh_minor_4', name: 'Smooth Transitions', type: 'Minor', cost: 1, branch: 0, depth: 0.5, prerequisite: 'genesis', description: "Your earthbending movements are fluid and precise, with no wasted motion or energy.", flavor: "Efficiency is the hallmark of mastery." },
    { id: 'sh_minor_5', name: 'Architectural Vision', type: 'Minor', cost: 1, branch: 0.4, depth: 0.5, prerequisite: 'genesis', description: "You can visualize complex structures and shapes in your mind before creating them with earthbending.", flavor: "The architect sees the finished work before the first stone is moved." },
    { id: 'sh_minor_6', name: 'Remote Binding', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'rock_gloves', description: "You can launch your rock gloves to bind an opponent's hands or feet from a distance.", flavor: "The sculptor's reach is long." },
    { id: 'sh_minor_7', name: 'Adhesive Touch', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'rock_gloves', description: "Your gauntlets can stick to any surface, allowing for incredible climbing and mobility.", flavor: "The stone becomes your anchor." },
    { id: 'sh_minor_8', name: 'Dust Devil', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'sandbending', description: "You can create smaller, mobile dust devils to harass and blind your opponents.", flavor: "The storm grows fiercer." },
    { id: 'sh_minor_9', name: 'Selective Solidity', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'sand_spout', description: "You and your allies can walk across your quicksand traps as if they were solid ground.", flavor: "The sculptor controls the ground's nature." },
    { id: 'sh_minor_10', name: 'Liquid Earth', type: 'Minor', cost: 1, branch: 0.4, depth: 2.5, prerequisite: 'sand_spout', description: "You can make earth flow like water, creating streams and currents of stone.", flavor: "The earth flows at the sculptor's command." },
    { id: 'sh_minor_11', name: 'Trap Master', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'architectural_bending', description: "You can build hidden pitfalls and spring-loaded stone spikes into your architecture.", flavor: "The architect's vision includes all possibilities." },
    { id: 'sh_minor_12', name: 'Living Architecture', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'architectural_bending', description: "Your structures can shift and change, adapting to the needs of the moment.", flavor: "The building breathes with life." },
];

// --- Generation Code ---
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

nodeDataList.forEach(nodeData => {
    const { id, branch, depth, prerequisite, type } = nodeData;
    const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
    const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES);
    const r = BASE_RADIUS + RADIUS_STEP * depth;
    const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle));
    const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
    
    const node: TalentNode = {
        id,
        name: nodeData.name,
        description: nodeData.description,
        flavor: nodeData.flavor,
        type: nodeData.type as NodeType,
        path: 'jing_que',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#DEB887',
            size: 50,
            icon: getSculptorsHandNodeIcon(type)
        },
        effects: [],
        isVisible: true,
        isAllocatable: prerequisites.length === 0,
        isAllocated: false,
        isLocked: prerequisites.length > 0,
        isPermanentlyLocked: false,
        pkCost: nodeData.cost
    };
    
    nodes.push(node);
    nodeMap[id] = node;
    
    prerequisites.forEach(prereqId => {
        connections.push({
            from: prereqId,
            to: id,
            isActive: false,
            isLocked: false
        });
    });
});

// Collision resolution
for (let iter = 0; iter < 100; iter++) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === 'Genesis') continue;
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.position.x - b.position.x;
            const dy = a.position.y - b.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MIN_DIST && dist > 0) {
                const moveFactor = (MIN_DIST - dist) / dist * 0.5;
                const moveX = dx * moveFactor;
                const moveY = dy * moveFactor;
                a.position.x += moveX;
                a.position.y += moveY;
                if (b.type !== 'Genesis') {
                    b.position.x -= moveX;
                    b.position.y -= moveY;
                }
            }
        }
    }
}

// --- Exports ---
export const SCULPTORS_HAND_NODES = nodes;
export const SCULPTORS_HAND_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateSculptorsHandConnections(): TalentConnection[] {
    return connections;
}
export const SCULPTORS_HAND_METADATA = {
    name: 'The Sculptor\'s Hand',
    philosophy: "A master does not just move mountains; they can command every grain of sand.",
    essence: "Fine control, environmental manipulation, advanced mobility, and architectural bending.",
    focus: "Precision control and architectural mastery, inspired by the Dai Li and sandbenders.",
    sacredAnimal: "The Sand Badgermole",
    emoji: '🏗️',
    color: '#DEB887',
    position: { x: 770, y: 500 }
};

function getSculptorsHandNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '👂';
        case 'Keystone': return '🛡️';
        case 'Manifestation': return '🧱';
        case 'Axiom': return '⛰️';
        case 'Capstone': return '��';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💥';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}