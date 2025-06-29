/**
 * Path 2: The Molten Core (Transformation) - "The Changing Earth" (Canonically Refactored)
 * 
 * Path Philosophy: "Earth is not static. It is metal waiting to be freed, and it is lava waiting to flow."
 * Essence: The canon sub-bending arts: Metalbending and Lavabending.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 875;
const CENTER_Y = 500;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = 0; // To the right
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Molten Core Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You understand that earth is not uniform, but a spectrum of materials. You can manipulate coal, gems, and crystals with greater ease.", flavor: "To master earth is to master its many forms." },
    // Minors after Genesis
    { id: 'metalbending', name: 'Metalbending', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "By locating the small fragments of earth within processed metal, you can target and utilize them to 'bend' the metal portion.", flavor: "A sub-skill developed by Toph Beifong." },
    { id: 'minor_mb_1', name: 'Cable Proficiency', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'metalbending', description: "You specialize in bending thin metal cables, using them as whips or grappling hooks with incredible precision.", flavor: "A technique perfected by Kuvira." },
    { id: 'minor_mb_2', name: 'Liquid Metal Control', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'metalbending', description: "Bend metal with such precision that it behaves like liquid mercury, forming shifting weapons or reforming shields.", flavor: "Metal is not rigid. It is a river, waiting to flow." },
    { id: 'platinum_bending', name: 'Platinum Bending', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'metalbending', description: "Your skill is so refined you can now bend even highly purified metals like platinum, though it requires immense effort.", flavor: "The city is just another mountain to be shaped." },
    { id: 'lavabending', name: 'Lavabending', type: 'Schism', cost: 8, branch: 1, depth: 2, prerequisite: 'genesis', description: "A rare ability. You can change the phase of earth, melting it into lava for more versatility in battle. You can form lava into weapons or summon it from the ground.", flavor: "First demonstrated by an ancient Fire Nation Avatar, but perfected by earthbenders like Ghazan and Bolin." },
    { id: 'minor_lb_1', name: 'Obsidian Forge', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'lavabending', description: "You can rapidly cool your lava into sharp, brittle volcanic glass, creating blades or shuriken.", flavor: "Pressure and heat create the sharpest edge." },
    
    // Additional Minor Nodes
    { id: 'mc_minor_1', name: 'Material Sense', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can identify the type of rock or mineral you are touching by its feel.", flavor: "The earth reveals its secrets to those who listen." },
    { id: 'mc_minor_2', name: 'Thermal Sensitivity', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can sense residual heat in stone, telling you if it has been recently heated.", flavor: "The earth remembers the fire's touch." },
    { id: 'mc_minor_3', name: 'Elemental Resonance', type: 'Minor', cost: 1, branch: -0.2, depth: 0.5, prerequisite: 'genesis', description: "You can feel the subtle differences between various earth materials, aiding your sub-bending abilities.", flavor: "Each element sings its own song." },
    { id: 'mc_minor_4', name: 'Heat Retention', type: 'Minor', cost: 1, branch: 0, depth: 0.5, prerequisite: 'genesis', description: "Your earthbending can maintain heat longer, making it easier to work with molten materials.", flavor: "The earth holds the fire's memory." },
    { id: 'mc_minor_5', name: 'Crystal Awareness', type: 'Minor', cost: 1, branch: 0.4, depth: 0.5, prerequisite: 'genesis', description: "You can sense and manipulate crystalline structures within stone more effectively.", flavor: "The crystal's song is clear and pure." },
    { id: 'mc_minor_6', name: 'Armor Weaving', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'metalbending', description: "You can expertly shape metal sheets into flexible, form-fitting armor around your body.", flavor: "The metal becomes your second skin." },
    { id: 'mc_minor_7', name: 'Fluid Motion', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'metalbending', description: "You can bend metal with greater fluidity, making it flow like thick liquid rather than just bending stiffly.", flavor: "The metal flows like water." },
    { id: 'mc_minor_8', name: 'Shrapnel Shot', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'platinum_bending', description: "You can launch a volley of razor-sharp metal shards at your opponents.", flavor: "The metal's edge is deadly." },
    { id: 'mc_minor_9', name: 'Metal Flow', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'platinum_bending', description: "You can make metal flow and reshape itself continuously, creating living weapons and armor.", flavor: "The metal lives and breathes." },
    { id: 'mc_minor_10', name: 'Sustained Heat', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'lavabending', description: "Your lava stays molten for a significantly longer time before cooling back into rock.", flavor: "The core's fire is unquenchable." },
    { id: 'mc_minor_11', name: 'Pyroclastic Cloud', type: 'Minor', cost: 1, branch: 0.8, depth: 2.7, prerequisite: 'lavabending', description: "Your lava can be modified to release a cloud of superheated gas and ash, blinding and choking enemies.", flavor: "The earth's breath is deadly." },
    { id: 'mc_minor_12', name: 'Resonance Break', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'platinum_bending', description: "You can vibrate a piece of metal at its resonant frequency, causing it to shatter.", flavor: "The metal sings its own destruction." },
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
        path: 'bian_hua',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#CD853F',
            size: 50,
            icon: getMoltenCoreNodeIcon(type)
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
export const MOLTEN_CORE_NODES = nodes;
export const MOLTEN_CORE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateMoltenCoreConnections(): TalentConnection[] {
    return connections;
}
export const MOLTEN_CORE_METADATA = {
    name: 'The Molten Core',
    philosophy: "Earth is not static. It is metal waiting to be freed, and it is lava waiting to flow.",
    essence: "The canon sub-bending arts: Metalbending and Lavabending.",
    focus: "Transformation and sub-bending arts, inspired by Toph's metalbending and Bolin's lavabending.",
    sacredAnimal: "The Metal Badgermole",
    emoji: '🔥',
    color: '#CD853F',
    position: { x: 875, y: 500 }
};

function getMoltenCoreNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '👂';
        case 'Keystone': return '🛡️';
        case 'Manifestation': return '🧱';
        case 'Axiom': return '⛰️';
        case 'Capstone': return '🧘';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💥';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}