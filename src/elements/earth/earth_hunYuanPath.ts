/**
 * Path 1: The Patient Mountain (Neutral Jing) - "The Waiting Stone" (Canonically Refactored)
 *
 * Path Philosophy: "Listen and wait. The earth does not rush. It feels every tremor, every footstep, and strikes only when the moment is perfect."
 * Essence: Defensive mastery, seismic awareness, counter-attacks, listening to the earth.
 *
 * REFACTOR: Updated to match the "Four Pillars of Stone" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 820;
const CENTER_Y = 420;
const BRANCHES = 2;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Patient Mountain Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You learn the core of Neutral Jing: to wait and listen for the right moment to strike. Your stances become more rooted and stable.", flavor: "Earth is the element of substance." },
    // Minors after Genesis
    { id: 'seismic_sense', name: 'Seismic Sense', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "By feeling vibrations through the ground, you can 'see' your surroundings, making a mental image of it. This requires direct contact with the ground.", flavor: "A technique originally developed by the blind badgermoles." },
    { id: 'minor_ss_1', name: 'Lie Detector', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'seismic_sense', description: "Your seismic sense is so acute you can detect the physical reactions of lying, such as breathing and heart rate.", flavor: "The earth reveals all secrets." },
    { id: 'minor_ss_2', name: 'Structural Insight', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'seismic_sense', description: "You can sense the internal structure of earth and stone, identifying weak points, faults, or hollow areas.", flavor: "The stone reveals its own weaknesses." },
    { id: 'earth_sinking', name: 'Earth Sinking', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'seismic_sense', description: "Forcibly sink your opponents into the ground, imprisoning them or even suffocating them in earth.", flavor: "A technique used by General Fong to subdue Katara." },
    { id: 'earth_tunneling', name: 'Earth Tunneling', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Move through the earth to out-maneuver foes, either by opening tunnels or by literally swimming through the ground.", flavor: "As demonstrated by King Bumi and the badgermoles." },
    { id: 'minor_et_1', name: 'Earth Glide', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'earth_tunneling', description: "You move through rock as if it were water, 'swimming' beneath the surface to bypass obstacles or launch surprise attacks.", flavor: "The earth is not a barrier, but a path." },
    
    // Additional Minor Nodes
    { id: 'pm_minor_1', name: 'Barefoot Sensitivity', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "When in direct contact with earth, you gain a vague sense of large movements or impacts nearby.", flavor: "The earth speaks to those who listen." },
    { id: 'pm_minor_2', name: 'Rooted Stance', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "It is significantly harder for opponents to knock you off balance or move you with physical force.", flavor: "The mountain's roots run deep." },
    { id: 'pm_minor_3', name: 'Earth\'s Whisper', type: 'Minor', cost: 1, branch: -0.2, depth: 0.5, prerequisite: 'genesis', description: "You can faintly hear the subtle sounds of the earth, aiding your seismic awareness.", flavor: "The earth's voice is soft but clear." },
    { id: 'pm_minor_4', name: 'Patient Mind', type: 'Minor', cost: 1, branch: 0, depth: 0.5, prerequisite: 'genesis', description: "Your connection to earth's patient nature makes you more resistant to taunts and psychological manipulation.", flavor: "The mountain does not respond to petty insults." },
    { id: 'pm_minor_5', name: 'Grounding Presence', type: 'Minor', cost: 1, branch: 0.4, depth: 0.5, prerequisite: 'genesis', description: "Your mere presence seems to stabilize the earth around you, reducing minor tremors and vibrations.", flavor: "The earth finds peace in your presence." },
    { id: 'pm_minor_6', name: 'Acoustic Dampening', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'seismic_sense', description: "You can filter out distracting vibrations to focus on specific targets.", flavor: "The earth's voice grows clearer." },
    { id: 'pm_minor_7', name: 'Rhythmic Echo', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'seismic_sense', description: "You can sense the 'rhythm' of an opponent's bending style, allowing you to anticipate their next move.", flavor: "Every fighter has a pattern." },
    { id: 'pm_minor_8', name: 'Earth\'s Embrace', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'earth_tunneling', description: "If an enemy gets too close, the earth can rise up to briefly trap their feet, rooting them in place for a counter-attack.", flavor: "The earth holds what it touches." },
    { id: 'pm_minor_9', name: 'Loyal Ground', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'earth_tunneling', description: "This zone of influence follows you as long as you maintain a slow, deliberate pace.", flavor: "The earth follows the patient master." },
    { id: 'pm_minor_10', name: 'Distant Tremors', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'earth_sinking', description: "Your seismic awareness extends to a much greater range, allowing you to sense approaching threats from far away.", flavor: "The earth's warnings come early." },
    { id: 'pm_minor_11', name: 'Far-Reaching Echo', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'earth_sinking', description: "You can send out a powerful seismic 'ping' to get a clearer, more detailed map of your surroundings.", flavor: "The earth's voice carries far." },
    { id: 'pm_minor_12', name: 'Earth\'s Memory', type: 'Minor', cost: 1, branch: 0.4, depth: 2.5, prerequisite: 'earth_sinking', description: "You can sense the history of the land, feeling echoes of past events that have shaped the terrain.", flavor: "The earth remembers all that has passed." },
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
        path: 'hun_yuan',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#8B4513',
            size: 50,
            icon: getPatientMountainNodeIcon(type)
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
export const PATIENT_MOUNTAIN_NODES = nodes;
export const PATIENT_MOUNTAIN_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generatePatientMountainConnections(): TalentConnection[] {
    return connections;
}
export const PATIENT_MOUNTAIN_METADATA = {
    name: 'The Patient Mountain',
    philosophy: "Listen and wait. The earth does not rush. It feels every tremor, every footstep, and strikes only when the moment is perfect.",
    essence: "Defensive mastery, seismic awareness, counter-attacks, listening to the earth.",
    focus: "Neutral Jing and seismic sense mastery, inspired by Toph and the badgermoles.",
    sacredAnimal: "The Badgermole",
    emoji: '🦡',
    color: '#8B4513',
    position: { x: 820, y: 420 }
};

function getPatientMountainNodeIcon(type: string): string {
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