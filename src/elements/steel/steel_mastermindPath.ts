/**
 * Path 1: The Mastermind - "The Grand Plan" (Canonically Refactored)
 *
 * Path Philosophy: "A bender can move a mountain, but a strategist can tell them which mountain to move."
 * Essence: Tactics, leadership, deception, psychological warfare.
 *
 * REFACTOR: Updated to match the "Human Spirit" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- CORRECTED LAYOUT CONFIGURATION ---
const CENTER_X = 800;
const CENTER_Y = 500; // Was 570 - Fixed to create symmetrical layout
const BRANCHES = 1;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Was Math.PI / 2 (Changed to Up)
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Mastermind Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You begin to see conflict as a system of interlocking parts. You instinctively identify tactical advantages like high ground and flanking routes.", flavor: "Wars are won before the first blow is struck." },
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Reading People', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You are adept at noticing subtle body language and vocal tells, giving you an edge in negotiations.", flavor: "The mind is the greatest weapon." },
    { id: 'minor_genesis_2', name: 'Tactical Eye', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can quickly sketch out maps of your immediate surroundings, noting key features and potential ambush points.", flavor: "Technology is the great equalizer." },
    // Sub-Path A - Battlefield Strategy
    { id: 'strategy_and_tactics', name: 'Strategy and Tactics', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You are the group's strategist, devising plans, gathering intelligence, and collecting maps that help your allies succeed.", flavor: "Sokka was the one counted on for determining the strategy of attack." },
    { id: 'minor_st_1', name: 'Inspirational Speaker', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'strategy_and_tactics', description: "You can give inspirational speeches to rile up warriors for battle and boost morale.", flavor: "As demonstrated by Hakoda before the invasion." },
    { id: 'minor_st_2', name: 'Intelligence Network', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'strategy_and_tactics', description: "You have contacts and informants who provide you with valuable information about enemy movements and plans.", flavor: "Knowledge is power." },
    { id: 'battlefield_preparation', name: 'Battlefield Preparation', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'strategy_and_tactics', description: "Given time before a conflict, you excel at preparing the terrain by constructing traps, deadfalls, and other non-mechanical hazards.", flavor: "Victory is assured before the battle begins." },
    { id: 'minor_a2_1', name: 'Master of Traps', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'battlefield_preparation', description: "Your traps are more cleverly concealed and harder to detect.", flavor: "Calculate perfect trajectories for any projectile weapon." },
    { id: 'minor_a2_2', name: 'Advantageous Terrain', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'battlefield_preparation', description: "You are an expert at herding enemies into natural kill-zones like narrow canyons, deep mud, or onto rickety structures.", flavor: "Create and safely handle explosive devices." },
    { id: 'minor_a2_3', name: 'Resource Denial', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'battlefield_preparation', description: "You excel at sabotage, capable of contaminating water supplies, ruining equipment, or spooking pack animals before a fight begins.", flavor: "Build devices that operate themselves." },
    { id: 'grand_strategist', name: 'Grand Strategist', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'battlefield_preparation', description: "Your tactical mind operates on a grand scale. You can mentally track multiple friendly and enemy groups, issuing orders to orchestrate complex battle plans.", flavor: "Sokka's masterminding of the Day of Black Sun invasion is a prime example." },
    { id: 'minor_a3_1', name: 'Plan B (and C, and D)', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'grand_strategist', description: "You have already considered multiple failure points in your strategy and have prepared contingency plans for each.", flavor: "Build devices that violate normal physical laws." },
    { id: 'minor_a3_2', name: 'Fog of War Clarity', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'grand_strategist', description: "You have a knack for getting the right information at the right time, using scouts, messengers, and logical deduction to maintain a clear picture of the battlefield.", flavor: "Create mechanical beings with artificial intelligence." },
    // Sub-Path B: Psychological Warfare
    { id: 'psychological_warfare', name: 'Psychological Warfare', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You understand that the mind is the ultimate battlefield. You can demoralize enemies and inspire allies through words and actions.", flavor: "The greatest victory is winning without fighting." },
    { id: 'minor_pw_1', name: 'Fear Tactics', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'psychological_warfare', description: "You can instill fear in your enemies through reputation, intimidation, or psychological manipulation.", flavor: "Fear is a weapon that never runs out of ammunition." },
    { id: 'master_manipulator', name: 'Master Manipulator', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'grand_strategist', description: "You can manipulate entire societies and nations through careful planning, propaganda, and strategic alliances.", flavor: "You have become a master of the human mind." },
    { id: 'minor_mm_1', name: 'Social Engineering', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'master_manipulator', description: "You can reshape societies through careful manipulation of information, culture, and social structures.", flavor: "The future is what you make it." },
    
    // Additional Minor Nodes
    { id: 'mm_minor_1', name: 'Pattern Recognition', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can quickly identify patterns in enemy behavior, predicting their next moves with uncanny accuracy.", flavor: "The mind sees what the eye cannot." },
    { id: 'mm_minor_2', name: 'Deceptive Tactics', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'strategy_and_tactics', description: "You can create false trails, misleading signals, and decoy movements to confuse your enemies.", flavor: "The best deception is the one they never suspect." },
    { id: 'mm_minor_3', name: 'Morale Booster', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'battlefield_preparation', description: "Your presence alone can boost the morale of your allies, making them fight harder and longer.", flavor: "A leader's confidence is contagious." },
    { id: 'mm_minor_4', name: 'Strategic Retreat', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'grand_strategist', description: "You can turn a retreat into a tactical advantage, luring enemies into prepared ambushes.", flavor: "Sometimes the best advance is a strategic withdrawal." },
    { id: 'mm_minor_5', name: 'Information Warfare', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can spread misinformation, intercept enemy communications, and control the flow of information.", flavor: "Knowledge is power, and you control both." },
];

// --- Generation Code ---
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getMastermindNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🧠';
        case 'Keystone': return '⚙️';
        case 'Manifestation': return '🤖';
        case 'Axiom': return '🏗️';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💔';
        case 'Minor': return '🧠';
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
        path: 'mastermind',
        constellation: 'steel',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#B0C4DE',
            size: 50,
            icon: getMastermindNodeIcon(type)
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
export const MASTERMIND_NODES = nodes;
export const MASTERMIND_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateMastermindConnections(): TalentConnection[] {
    return connections;
}
export const MASTERMIND_METADATA = {
    name: 'The Mastermind',
    philosophy: "A bender can move a mountain, but a strategist can tell them which mountain to move.",
    essence: "Tactics, leadership, deception, psychological warfare.",
    focus: "Strategic thinking and battlefield command, like Sokka and Hakoda.",
    sacredAnimal: "The Owl",
    emoji: '🦉',
    color: '#B0C4DE',
    position: { x: 800, y: 500 }
}; 