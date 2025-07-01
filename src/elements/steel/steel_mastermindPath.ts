/**
 * Path 1: The Mastermind - "The Grand Plan" (Canonically Refactored)
 *
 * Path Philosophy: "A bender can move a mountain, but a strategist can tell them which mountain to move."
 * Essence: Tactics, leadership, deception, psychological warfare.
 *
 * REFACTOR: Updated to match the "Human Spirit" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- LAYOUT CONFIGURATION (MATCH EARTH/WATER) ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const RADIUS_STEP = 320;
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Mastermind Path', type: 'Genesis', cost: 1, description: "You begin to see conflict as a system of interlocking parts. You instinctively identify tactical advantages like high ground and flanking routes.", flavor: "Wars are won before the first blow is struck." },
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Reading People', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You are adept at noticing subtle body language and vocal tells, giving you an edge in negotiations.", flavor: "The mind is the greatest weapon." },
    { id: 'minor_genesis_2', name: 'Tactical Eye', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can quickly sketch out maps of your immediate surroundings, noting key features and potential ambush points.", flavor: "Technology is the great equalizer." },
    // Sub-Path A - Battlefield Strategy
    { id: 'strategy_and_tactics', name: 'Strategy and Tactics', type: 'Keystone', cost: 2, prerequisite: 'genesis', description: "You are the group's strategist, devising plans, gathering intelligence, and collecting maps that help your allies succeed.", flavor: "Sokka was the one counted on for determining the strategy of attack." },
    { id: 'minor_st_1', name: 'Inspirational Speaker', type: 'Minor', cost: 1, prerequisite: 'strategy_and_tactics', description: "You can give inspirational speeches to rile up warriors for battle and boost morale.", flavor: "As demonstrated by Hakoda before the invasion." },
    { id: 'minor_st_2', name: 'Intelligence Network', type: 'Minor', cost: 1, prerequisite: 'strategy_and_tactics', description: "You have contacts and informants who provide you with valuable information about enemy movements and plans.", flavor: "Knowledge is power." },
    { id: 'battlefield_preparation', name: 'Battlefield Preparation', type: 'Manifestation', cost: 4, prerequisite: 'strategy_and_tactics', description: "Given time before a conflict, you excel at preparing the terrain by constructing traps, deadfalls, and other non-mechanical hazards.", flavor: "Victory is assured before the battle begins." },
    { id: 'minor_a2_1', name: 'Master of Traps', type: 'Minor', cost: 1, prerequisite: 'battlefield_preparation', description: "Your traps are more cleverly concealed and harder to detect.", flavor: "Calculate perfect trajectories for any projectile weapon." },
    { id: 'minor_a2_2', name: 'Advantageous Terrain', type: 'Minor', cost: 1, prerequisite: 'battlefield_preparation', description: "You are an expert at herding enemies into natural kill-zones like narrow canyons, deep mud, or onto rickety structures.", flavor: "Create and safely handle explosive devices." },
    { id: 'minor_a2_3', name: 'Resource Denial', type: 'Minor', cost: 1, prerequisite: 'battlefield_preparation', description: "You excel at sabotage, capable of contaminating water supplies, ruining equipment, or spooking pack animals before a fight begins.", flavor: "Build devices that operate themselves." },
    { id: 'grand_strategist', name: 'Grand Strategist', type: 'Axiom', cost: 5, prerequisite: 'battlefield_preparation', description: "Your tactical mind operates on a grand scale. You can mentally track multiple friendly and enemy groups, issuing orders to orchestrate complex battle plans.", flavor: "Sokka's masterminding of the Day of Black Sun invasion is a prime example." },
    { id: 'minor_a3_1', name: 'Plan B (and C, and D)', type: 'Minor', cost: 1, prerequisite: 'grand_strategist', description: "You have already considered multiple failure points in your strategy and have prepared contingency plans for each.", flavor: "Build devices that violate normal physical laws." },
    { id: 'minor_a3_2', name: 'Fog of War Clarity', type: 'Minor', cost: 1, prerequisite: 'grand_strategist', description: "You have a knack for getting the right information at the right time, using scouts, messengers, and logical deduction to maintain a clear picture of the battlefield.", flavor: "Create mechanical beings with artificial intelligence." },
    // Sub-Path B: Psychological Warfare
    { id: 'psychological_warfare', name: 'Psychological Warfare', type: 'Keystone', cost: 2, prerequisite: 'genesis', description: "You understand that the mind is the ultimate battlefield. You can demoralize enemies and inspire allies through words and actions.", flavor: "The greatest victory is winning without fighting." },
    { id: 'minor_pw_1', name: 'Fear Tactics', type: 'Minor', cost: 1, prerequisite: 'psychological_warfare', description: "You can instill fear in your enemies through reputation, intimidation, or psychological manipulation.", flavor: "Fear is a weapon that never runs out of ammunition." },
    { id: 'master_manipulator', name: 'Master Manipulator', type: 'Capstone', cost: 10, prerequisite: 'grand_strategist', description: "You can manipulate entire societies and nations through careful planning, propaganda, and strategic alliances.", flavor: "You have become a master of the human mind." },
    { id: 'minor_mm_1', name: 'Social Engineering', type: 'Minor', cost: 1, prerequisite: 'master_manipulator', description: "You can reshape societies through careful manipulation of information, culture, and social structures.", flavor: "The future is what you make it." },
    
    // Additional Minor Nodes
    { id: 'mm_minor_1', name: 'Pattern Recognition', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can quickly identify patterns in enemy behavior, predicting their next moves with uncanny accuracy.", flavor: "The mind sees what the eye cannot." },
    { id: 'mm_minor_2', name: 'Deceptive Tactics', type: 'Minor', cost: 1, prerequisite: 'strategy_and_tactics', description: "You can create false trails, misleading signals, and decoy movements to confuse your enemies.", flavor: "The best deception is the one they never suspect." },
    { id: 'mm_minor_3', name: 'Morale Booster', type: 'Minor', cost: 1, prerequisite: 'battlefield_preparation', description: "Your presence alone can boost the morale of your allies, making them fight harder and longer.", flavor: "A leader's confidence is contagious." },
    { id: 'mm_minor_4', name: 'Strategic Retreat', type: 'Minor', cost: 1, prerequisite: 'grand_strategist', description: "You can turn a retreat into a tactical advantage, luring enemies into prepared ambushes.", flavor: "Sometimes the best advance is a strategic withdrawal." },
    { id: 'mm_minor_5', name: 'Information Warfare', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can spread misinformation, intercept enemy communications, and control the flow of information.", flavor: "Knowledge is power, and you control both." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getMastermindNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🧠';
        case 'Keystone': return '⚙️';
        case 'Manifestation': return '🤖';
        case 'Axiom': return '🏗️';
        case 'Minor': return '🧠';
        default: return '⚫';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'mastermind', constellation: 'steel', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#B0C4DE', size: 50, icon: getMastermindNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'strategy_and_tactics' || parentId === 'psychological_warfare') spread = WIDE_SPREAD_ANGLE;
    const angleStep = spread / (children.length > 1 ? children.length - 1 : 1);
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

export const MASTERMIND_NODES = nodes;
export function generateMastermindConnections(): TalentConnection[] { return connections; }
export const MASTERMIND_METADATA = {
    name: 'The Mastermind',
    philosophy: "A bender can move a mountain, but a strategist can tell them which mountain to move.",
    essence: "Tactics, leadership, deception, psychological warfare.",
    focus: "Strategic thinking and battlefield command, like Sokka and Hakoda.",
    sacredAnimal: "The Owl",
    emoji: '🦉',
    color: '#B0C4DE',
    position: { x: 0, y: 0 }
}; 