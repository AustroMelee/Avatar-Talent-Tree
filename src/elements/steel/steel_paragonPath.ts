/**
 * Path 3: The Paragon - "The Perfected Form" (Canonically Refactored)
 *
 * Path Philosophy: "A bender commands fire. I command every muscle, every nerve, every breath. My body is not a vessel for power; it is the power."
 * Essence: Peak human conditioning, acrobatics, stealth, and chi-blocking.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- CORRECTED LAYOUT CONFIGURATION ---
const CENTER_X = 800;
const CENTER_Y = 600;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Paragon Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your body is your temple. You are more flexible, agile, and have greater stamina than an average person.", flavor: "My body is not a vessel for power; it is the power." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Peak Conditioning', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your physical conditioning is beyond normal human limits. You can run for hours, lift incredible weights, and recover from injuries quickly.", flavor: "The body is a weapon that never dulls." },
    { id: 'minor_genesis_2', name: 'Enhanced Reflexes', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your reflexes are lightning-fast, allowing you to react to threats before they fully materialize.", flavor: "The mind and body move as one." },
    
    // --- Sub-Path A: Acrobatic Mastery ---
    { id: 'acrobatic_evasion', name: 'Acrobatic Evasion', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You are extraordinarily agile, able to outmaneuver almost any opponent and jump exceptionally high and far, even from a stationary position.", flavor: "Ty Lee's abilities allowed her to defeat dozens of powerful earthbenders." },
    { id: 'minor_ae_1', name: 'Wall Running', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'acrobatic_evasion', description: "You can run horizontally or vertically along walls for short distances.", flavor: "A key skill for both Suki and Ty Lee." },
    { id: 'minor_ae_2', name: 'Aerial Combat', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'acrobatic_evasion', description: "You can fight effectively while airborne, using your momentum and gravity to enhance your attacks.", flavor: "The sky is your battlefield." },
    
    { id: 'flawless_form', name: 'Flawless Form', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'acrobatic_evasion', description: "Your movements are so perfect and efficient that you never waste energy. Every step, every strike, every dodge is executed with mathematical precision.", flavor: "Perfection is not a goal, it is a way of life." },
    { id: 'minor_ff_1', name: 'Energy Conservation', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'flawless_form', description: "You can fight for hours without tiring, your movements so efficient that you barely expend energy.", flavor: "The master never tires." },
    
    { id: 'perfect_balance', name: 'Perfect Balance', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'flawless_form', description: "You have achieved perfect balance in all situations. You can stand on a single finger, walk on tightropes, or maintain your footing on any surface.", flavor: "Balance is the foundation of all movement." },
    { id: 'minor_pb_1', name: 'Unshakeable Stance', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'perfect_balance', description: "No force can knock you off balance. You can withstand powerful blows without being moved.", flavor: "The mountain stands unmoved." },
    
    // --- Sub-Path B: Chi-Blocking ---
    { id: 'chi_blocking', name: 'Chi-Blocking', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'genesis', description: "A mastery of pressure-point striking. With a sequence of jabs, you can disrupt an individual's chi flow, temporarily paralyzing them and preventing bending.", flavor: "Ty Lee's signature and defining ability." },
    { id: 'minor_cb_1', name: 'Blocking the Flow', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'chi_blocking', description: "A specific sequence of strikes to the torso and forehead can temporarily sever a bender's connection to their element entirely.", flavor: "The ultimate anti-bender technique." },
    { id: 'minor_cb_2', name: 'Pressure Point Mastery', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'chi_blocking', description: "You know every pressure point in the human body and can target them with surgical precision.", flavor: "Knowledge is the greatest weapon." },
    
    { id: 'chi_manipulation', name: 'Chi Manipulation', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'perfect_balance', description: "You can not only block chi but also redirect and manipulate it. You can temporarily grant bending abilities to non-benders or enhance a bender's power.", flavor: "You have become a master of the body's energy." },
    { id: 'minor_cm_1', name: 'Energy Transfer', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'chi_manipulation', description: "You can transfer your own chi to others, healing their injuries or temporarily enhancing their abilities.", flavor: "The gift of life flows through your hands." },
    
    // Additional Minor Nodes
    { id: 'pa_minor_1', name: 'Silent Movement', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can move with absolute silence, making no sound even when running or jumping.", flavor: "The shadow makes no sound." },
    { id: 'pa_minor_2', name: 'Flexibility Mastery', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'acrobatic_evasion', description: "Your body is incredibly flexible, allowing you to contort into impossible positions and squeeze through tight spaces.", flavor: "The body adapts to any challenge." },
    { id: 'pa_minor_3', name: 'Pain Resistance', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'flawless_form', description: "You can ignore pain and continue fighting even with serious injuries.", flavor: "The mind controls the body, not the other way around." },
    { id: 'pa_minor_4', name: 'Precision Striking', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'chi_blocking', description: "Your strikes are incredibly precise, allowing you to hit specific targets even in the heat of battle.", flavor: "Accuracy is the difference between victory and defeat." },
    { id: 'pa_minor_5', name: 'Endurance Training', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your body recovers from fatigue much faster than normal, allowing you to train longer and harder.", flavor: "The body grows stronger with each challenge." },
];

// --- Generation Code ---
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getParagonNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🏃';
        case 'Keystone': return '🤸';
        case 'Manifestation': return '🧘';
        case 'Axiom': return '⚡';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💔';
        case 'Minor': return '🏃';
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
        path: 'paragon',
        constellation: 'steel',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#98FB98',
            size: 50,
            icon: getParagonNodeIcon(type)
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
export const PARAGON_NODES = nodes;
export const PARAGON_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateParagonConnections(): TalentConnection[] {
    return connections;
}
export const PARAGON_METADATA = {
    name: 'The Paragon',
    philosophy: "A bender commands fire. I command every muscle, every nerve, every breath. My body is not a vessel for power; it is the power.",
    essence: "Peak human conditioning, acrobatics, stealth, and chi-blocking.",
    focus: "Athletes at the peak of human potential who use their bodies as weapons, like Ty Lee and Suki.",
    sacredAnimal: "The Crane",
    emoji: '🦢',
    color: '#98FB98',
    position: { x: 800, y: 600 }
}; 