/**
 * Path 4: The Cold Tempest - "The Unburdened Mind" (Canonically Refactored)
 *
 * Path Philosophy: "To create lightning, you must first let go. Separate yin and yang. Let go of emotion. Only a mind at peace can command the storm."
 * Essence: The generation and mastery of lightning as the ultimate firebending technique.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 900;
const CENTER_Y = 550;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Cold Tempest Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You learn the first step of lightning generation: separating your internal yin and yang energies. This requires peace of mind and a complete absence of emotion.", flavor: "Lightning is also known as 'the cold-blooded fire'." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Inner Peace', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You are more resistant to emotional turmoil. If a firebender with inner conflict attempts to generate lightning, it will only result in a small explosion.", flavor: "Zuko was unable to generate lightning because of his inner conflict." },
    { id: 'minor_genesis_2', name: 'Emotional Control', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can suppress your emotions at will, creating the mental state necessary for lightning generation.", flavor: "Emotion is the enemy of lightning." },
    
    // --- Sub-Path A: Lightning Generation ---
    { id: 'lightning_generation', name: 'Lightning Generation', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You can generate and direct a bolt of raw electricity. It is incredibly fast and powerful, but leaves you drained.", flavor: "Considered the purest form of firebending." },
    { id: 'minor_lg_1', name: 'Charged Attack', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'lightning_generation', description: "You can charge your lightning before releasing it, allowing for a much larger and more powerful blast.", flavor: "As demonstrated by Iroh, Ozai, and Azula." },
    { id: 'minor_lg_2', name: 'Quick Strike', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'lightning_generation', description: "You can generate lightning almost instantly, without the need for charging time.", flavor: "Speed is the essence of lightning." },
    
    { id: 'lightning_chain', name: 'Lightning Chain', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'lightning_generation', description: "Your lightning can arc between multiple targets, creating devastating chain attacks that can hit entire groups.", flavor: "Lightning seeks the path of least resistance." },
    { id: 'minor_lc_1', name: 'Chain Mastery', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'lightning_chain', description: "You can control the path of your lightning chain, directing it to specific targets.", flavor: "The lightning dances to your will." },
    
    { id: 'storm_caller', name: 'Storm Caller', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'lightning_chain', description: "You can summon natural lightning from storm clouds, creating massive bolts that dwarf your generated lightning.", flavor: "You become one with the storm." },
    { id: 'minor_sc_1', name: 'Weather Sense', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'storm_caller', description: "You can sense approaching storms and predict lightning strikes, allowing you to prepare your techniques.", flavor: "The storm speaks to you." },
    
    // --- Sub-Path B: Lightning Redirection ---
    { id: 'lightning_redirection', name: 'Lightning Redirection', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'genesis', description: "After observing waterbending, Iroh developed this technique to safely redirect lightning. Absorb the bolt through one arm, guide it through the stomach, and out the other.", flavor: "A critical technique taught to Zuko and Aang." },
    { id: 'minor_lr_1', name: 'Instantaneous Redirection', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'lightning_redirection', description: "The redirection becomes a seamless, instantaneous reflex, requiring no conscious thought.", flavor: "The hand guides, the body follows." },
    { id: 'minor_lr_2', name: 'Redirected Power', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'lightning_redirection', description: "You can amplify redirected lightning, making it more powerful than the original bolt.", flavor: "Turn your enemy's strength against them." },
    
    { id: 'lightning_mastery', name: 'Lightning Mastery', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'storm_caller', description: "You have complete mastery over lightning. You can generate it without emotion, redirect it effortlessly, and even create lightning storms at will.", flavor: "You are the storm incarnate." },
    { id: 'minor_lm_1', name: 'Storm Lord', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'lightning_mastery', description: "You can create localized storms, bringing rain, wind, and lightning to any battlefield.", flavor: "The weather itself becomes your weapon." },
    
    // Additional Minor Nodes
    { id: 'ct_minor_1', name: 'Static Field', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can create a small static field around yourself, making your hair stand on end and warning of approaching lightning.", flavor: "The storm's approach is felt before it's seen." },
    { id: 'ct_minor_2', name: 'Lightning Sense', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'lightning_generation', description: "You can sense electrical currents and lightning in the area, even when they're not visible.", flavor: "The lightning calls to its master." },
    { id: 'ct_minor_3', name: 'Thunder Clap', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'lightning_chain', description: "You can create a thunderous clap of sound by rapidly expanding air with your lightning, disorienting enemies.", flavor: "The storm's voice is deafening." },
    { id: 'ct_minor_4', name: 'Lightning Absorption', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'lightning_redirection', description: "You can absorb small amounts of electrical energy into your body, storing it for later use.", flavor: "The storm's power becomes your own." },
    { id: 'ct_minor_5', name: 'Storm\'s Eye', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You are naturally calm during storms, finding peace in the chaos of thunder and lightning.", flavor: "In the storm's heart, there is perfect peace." },
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
        path: 'cold_tempest',
        constellation: 'fire',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#89b4fa',
            size: 50,
            icon: getColdTempestNodeIcon(type)
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
export const COLD_TEMPEST_NODES = nodes;
export const COLD_TEMPEST_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateColdTempestConnections(): TalentConnection[] {
    return connections;
}
export const COLD_TEMPEST_METADATA = {
    name: 'The Cold Tempest',
    philosophy: "To create lightning, you must first let go. Separate yin and yang. Let go of emotion. Only a mind at peace can command the storm.",
    essence: "The generation and mastery of lightning as the ultimate firebending technique.",
    focus: "A rare and powerful sub-skill requiring a complete absence of emotion to separate yin and yang.",
    sacredAnimal: "The Storm",
    emoji: '⚡',
    color: '#89b4fa',
    position: { x: 900, y: 550 }
};

function getColdTempestNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '⚡';
        case 'Keystone': return '🌩️';
        case 'Manifestation': return '💫';
        case 'Axiom': return '🌀';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '☠️';
        case 'Minor': return '⚡';
        default: return '⚡';
    }
}