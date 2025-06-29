/**
 * Path 2: The Innovator - "The Forged Future" (Canonically Refactored)
 *
 * Path Philosophy: "The elements are a gift. Technology is a promise—a promise that we can build a future better, stronger, and more equal than the past."
 * Essence: Engineering, invention, vehicle mastery, technological warfare.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- CORRECTED LAYOUT CONFIGURATION ---
const CENTER_X = 900; // Was 1000 - Fixed to create symmetrical layout
const CENTER_Y = 550; // Was 570 - Fixed to create symmetrical layout
const BRANCHES = 1;
const PATH_MAIN_ANGLE = 0; // Was Math.PI / 2 (Changed to Right)
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Innovator Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You have a natural talent for understanding how mechanical things work. You can perform basic maintenance and repairs on common machinery.", flavor: "Technology is the great equalizer." },
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Science and Engineering', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You show a remarkable proclivity toward science and can create amateur explosives or optical illusions.", flavor: "Sokka solved the dilemma of the hot air balloon which stumped even the Mechanist." },
    { id: 'minor_genesis_2', name: "Scavenger's Eye", type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You are adept at identifying useful parts and materials from scrap heaps and discarded machinery.", flavor: "Technology is the great equalizer." },
    // Sub-Path A - Gadgetry & Armor
    { id: 'expert_driver', name: 'Expert Driver', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You are an expert driver, capable of handling Satomobiles, motorboats, and sand-sailers at high speed.", flavor: "Asami learned by testing her father's vehicles." },
    { id: 'minor_ed_1', name: 'Vehicle Mastery', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'expert_driver', description: "You can operate any vehicle with expert skill, from simple carts to complex machinery.", flavor: "Every machine speaks to you." },
    { id: 'signature_gadget', name: 'Signature Gadget', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'expert_driver', description: "You design and build a signature piece of personal equipment, like an electrified glove or a mechanized grappling line.", flavor: "Asami is a genius technologist and inventor." },
    { id: 'minor_sg_1', name: 'Customized Armor', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'signature_gadget', description: "You design and forge a personalized suit of light, articulated armor that enhances your abilities and integrates your gear.", flavor: "Asami's suit included shock-absorbing boots and an environmental seal." },
    { id: 'minor_sg_2', name: 'Gadget Integration', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'signature_gadget', description: "Your gadgets are seamlessly integrated into your equipment, allowing for quick deployment and use.", flavor: "Technology becomes an extension of yourself." },
    { id: 'A3', name: 'Mecha-Suit Pilot', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'signature_gadget', description: "The pinnacle of personal technology. You construct and pilot a custom, human-sized mechanized suit, granting immense strength and durability.", flavor: "Asami used her suit to fight her father and later developed the Hummingbird suits." },
    { id: 'minor_a3_1', name: 'Mounted Weapon System', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "The suit is equipped with a specific weapon, such as a grappling cable launcher, a high-pressure water cannon, or electrified battering rams.", flavor: "Build devices that violate normal physical laws." },
    { id: 'minor_a3_2', name: 'Heavy Plating', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "You sacrifice some of the suit's agility for thicker armor plating, making it a walking tank.", flavor: "Create mechanical beings with artificial intelligence." },
    // Sub-Path B: Industrial Engineering
    { id: 'industrial_engineering', name: 'Industrial Engineering', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You understand large-scale machinery and can design, build, and maintain complex industrial systems.", flavor: "The future is built one machine at a time." },
    { id: 'minor_ie_1', name: 'Factory Design', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'industrial_engineering', description: "You can design efficient factories and production lines, maximizing output while minimizing waste.", flavor: "Efficiency is the key to progress." },
    { id: 'automation_mastery', name: 'Automation Mastery', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'A3', description: "You can create fully automated systems that operate independently. Your machines can think, adapt, and improve themselves.", flavor: "You have created life from metal and gears." },
    { id: 'minor_am_1', name: 'Artificial Intelligence', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'automation_mastery', description: "Your automated systems develop true intelligence, capable of learning, problem-solving, and even creativity.", flavor: "The mind of metal learns to dream." },
    
    // Additional Minor Nodes
    { id: 'in_minor_1', name: 'Mechanical Intuition', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can instinctively understand how any machine works just by looking at it.", flavor: "The gears speak their secrets to you." },
    { id: 'in_minor_2', name: 'Rapid Prototyping', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'expert_driver', description: "You can quickly build functional prototypes of your inventions, testing ideas on the fly.", flavor: "The best way to test an idea is to build it." },
    { id: 'in_minor_3', name: 'Energy Efficiency', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'signature_gadget', description: "Your inventions use energy more efficiently, allowing them to operate longer on the same power source.", flavor: "Waste not, want not." },
    { id: 'in_minor_4', name: 'Modular Design', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your mecha-suit can be quickly modified with different modules for different situations.", flavor: "Adaptability is the key to survival." },
    { id: 'in_minor_5', name: 'Reverse Engineering', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can study any piece of technology and understand how to replicate or improve upon it.", flavor: "Every invention is a lesson waiting to be learned." },
];

// --- Generation Code ---
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getInnovatorNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '⚙️';
        case 'Keystone': return '🔧';
        case 'Manifestation': return '🛠️';
        case 'Axiom': return '🤖';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💔';
        case 'Minor': return '⚙️';
        default: return '●';
    }
}

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
        path: 'innovator',
        constellation: 'steel',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#87CEEB',
            size: 50,
            icon: getInnovatorNodeIcon(type)
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
export const INNOVATOR_NODES = nodes;
export const INNOVATOR_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateInnovatorConnections(): TalentConnection[] {
    return connections;
}
export const INNOVATOR_METADATA = {
    name: 'The Innovator',
    philosophy: "The elements are a gift. Technology is a promise—a promise that we can build a future better, stronger, and more equal than the past.",
    essence: "Engineering, invention, vehicle mastery, technological warfare.",
    focus: "Superior technology and engineering to counter bending, like Asami and Sokka's inventive side.",
    sacredAnimal: "The Eagle",
    emoji: '🦅',
    color: '#87CEEB',
    position: { x: 900, y: 550 }
}; 