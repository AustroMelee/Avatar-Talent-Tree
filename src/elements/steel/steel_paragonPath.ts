/**
 * Path 3: The Paragon - "The Perfected Form" (Canonically Refactored)
 *
 * Path Philosophy: "A bender commands fire. I command every muscle, every nerve, every breath. My body is not a vessel for power; it is the power."
 * Essence: Peak human conditioning, acrobatics, stealth, and chi-blocking.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- LAYOUT CONFIGURATION (MATCH EARTH/WATER) ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const RADIUS_STEP = 320;
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Paragon Path', type: 'Genesis', cost: 1, description: "Your body is your temple. You are more flexible, agile, and have greater stamina than an average person.", flavor: "My body is not a vessel for power; it is the power." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Peak Conditioning', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your physical conditioning is beyond normal human limits. You can run for hours, lift incredible weights, and recover from injuries quickly.", flavor: "The body is a weapon that never dulls." },
    { id: 'minor_genesis_2', name: 'Enhanced Reflexes', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your reflexes are lightning-fast, allowing you to react to threats before they fully materialize.", flavor: "The mind and body move as one." },
    
    // --- Sub-Path A: Acrobatic Mastery ---
    { id: 'acrobatic_evasion', name: 'Acrobatic Evasion', type: 'Keystone', cost: 2, prerequisite: 'genesis', description: "You are extraordinarily agile, able to outmaneuver almost any opponent and jump exceptionally high and far, even from a stationary position.", flavor: "Ty Lee's abilities allowed her to defeat dozens of powerful earthbenders." },
    { id: 'minor_ae_1', name: 'Wall Running', type: 'Minor', cost: 1, prerequisite: 'acrobatic_evasion', description: "You can run horizontally or vertically along walls for short distances.", flavor: "A key skill for both Suki and Ty Lee." },
    { id: 'minor_ae_2', name: 'Aerial Combat', type: 'Minor', cost: 1, prerequisite: 'acrobatic_evasion', description: "You can fight effectively while airborne, using your momentum and gravity to enhance your attacks.", flavor: "The sky is your battlefield." },
    
    { id: 'flawless_form', name: 'Flawless Form', type: 'Manifestation', cost: 4, prerequisite: 'acrobatic_evasion', description: "Your movements are so perfect and efficient that you never waste energy. Every step, every strike, every dodge is executed with mathematical precision.", flavor: "Perfection is not a goal, it is a way of life." },
    { id: 'minor_ff_1', name: 'Energy Conservation', type: 'Minor', cost: 1, prerequisite: 'flawless_form', description: "You can fight for hours without tiring, your movements so efficient that you barely expend energy.", flavor: "The master never tires." },
    
    { id: 'perfect_balance', name: 'Perfect Balance', type: 'Axiom', cost: 5, prerequisite: 'flawless_form', description: "You have achieved perfect balance in all situations. You can stand on a single finger, walk on tightropes, or maintain your footing on any surface.", flavor: "Balance is the foundation of all movement." },
    { id: 'minor_pb_1', name: 'Unshakeable Stance', type: 'Minor', cost: 1, prerequisite: 'perfect_balance', description: "No force can knock you off balance. You can withstand powerful blows without being moved.", flavor: "The mountain stands unmoved." },
    
    // --- Sub-Path B: Chi-Blocking ---
    { id: 'chi_blocking', name: 'Chi-Blocking', type: 'Axiom', cost: 5, prerequisite: 'genesis', description: "A mastery of pressure-point striking. With a sequence of jabs, you can disrupt an individual's chi flow, temporarily paralyzing them and preventing bending.", flavor: "Ty Lee's signature and defining ability." },
    { id: 'minor_cb_1', name: 'Blocking the Flow', type: 'Minor', cost: 1, prerequisite: 'chi_blocking', description: "A specific sequence of strikes to the torso and forehead can temporarily sever a bender's connection to their element entirely.", flavor: "The ultimate anti-bender technique." },
    { id: 'minor_cb_2', name: 'Pressure Point Mastery', type: 'Minor', cost: 1, prerequisite: 'chi_blocking', description: "You know every pressure point in the human body and can target them with surgical precision.", flavor: "Knowledge is the greatest weapon." },
    
    { id: 'chi_manipulation', name: 'Chi Manipulation', type: 'Capstone', cost: 10, prerequisite: 'perfect_balance', description: "You can not only block chi but also redirect and manipulate it. You can temporarily grant bending abilities to non-benders or enhance a bender's power.", flavor: "You have become a master of the body's energy." },
    { id: 'minor_cm_1', name: 'Energy Transfer', type: 'Minor', cost: 1, prerequisite: 'chi_manipulation', description: "You can transfer your own chi to others, healing their injuries or temporarily enhancing their abilities.", flavor: "The gift of life flows through your hands." },
    
    // Additional Minor Nodes
    { id: 'pa_minor_1', name: 'Silent Movement', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can move with absolute silence, making no sound even when running or jumping.", flavor: "The shadow makes no sound." },
    { id: 'pa_minor_2', name: 'Flexibility Mastery', type: 'Minor', cost: 1, prerequisite: 'acrobatic_evasion', description: "Your body is incredibly flexible, allowing you to contort into impossible positions and squeeze through tight spaces.", flavor: "The body adapts to any challenge." },
    { id: 'pa_minor_3', name: 'Pain Resistance', type: 'Minor', cost: 1, prerequisite: 'flawless_form', description: "You can ignore pain and continue fighting even with serious injuries.", flavor: "The mind controls the body, not the other way around." },
    { id: 'pa_minor_4', name: 'Precision Striking', type: 'Minor', cost: 1, prerequisite: 'chi_blocking', description: "Your strikes are incredibly precise, allowing you to hit specific targets even in the heat of battle.", flavor: "Accuracy is the difference between victory and defeat." },
    { id: 'pa_minor_5', name: 'Endurance Training', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your body recovers from fatigue much faster than normal, allowing you to train longer and harder.", flavor: "The body grows stronger with each challenge." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getParagonNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🏃';
        case 'Keystone': return '🧘';
        case 'Manifestation': return '🧙';
        case 'Axiom': return '⚡';
        case 'Minor': return '🏃';
        default: return '⚫';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'paragon', constellation: 'steel', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#98FB98', size: 50, icon: getParagonNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'acrobatic_evasion' || parentId === 'chi_blocking') spread = WIDE_SPREAD_ANGLE;
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

export const PARAGON_NODES = nodes;
export function generateParagonConnections(): TalentConnection[] { return connections; }
export const PARAGON_METADATA = {
    name: 'The Paragon',
    philosophy: "A bender commands fire. I command every muscle, every nerve, every breath. My body is not a vessel for power; it is the power.",
    essence: "Peak human conditioning, acrobatics, stealth, and chi-blocking.",
    focus: "Athletes at the peak of human potential who use their bodies as weapons, like Ty Lee and Suki.",
    sacredAnimal: "The Crane",
    emoji: '🦢',
    color: '#98FB98',
    position: { x: 0, y: 0 }
}; 