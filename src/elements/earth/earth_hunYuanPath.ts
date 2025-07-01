/**
 * Path 1: The Patient Mountain (Neutral Jing) - "The Waiting Stone"
 *
 * Philosophy: "Listen and wait. The earth does not rush. It feels every tremor, every footstep, and strikes only when the moment is perfect."
 * Essence: Defensive mastery, seismic awareness, counter-attacks, listening to the earth.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const RADIUS_STEP = 320;
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Patient Mountain Path', type: 'Genesis', cost: 1, description: "You learn the core of Neutral Jing: to wait and listen for the right moment to strike. Your stances become more rooted and stable.", flavor: "Earth is the element of substance." },
    
    // Minor nodes after Genesis
    { id: 'barefoot_sensitivity', name: 'Barefoot Sensitivity', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "When in direct contact with earth, you gain a vague sense of large movements or impacts nearby.", flavor: "The earth speaks to those who listen." },
    { id: 'rooted_stance', name: 'Rooted Stance', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "It is significantly harder for opponents to knock you off balance or move you with physical force.", flavor: "The mountain's roots run deep." },
    { id: 'earths_whisper', name: 'Earth\'s Whisper', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can faintly hear the subtle sounds of the earth, aiding your seismic awareness.", flavor: "The earth's voice is soft but clear." },
    { id: 'patient_mind', name: 'Patient Mind', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your connection to earth's patient nature makes you more resistant to taunts and psychological manipulation.", flavor: "The mountain does not respond to petty insults." },
    { id: 'grounding_presence', name: 'Grounding Presence', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your mere presence seems to stabilize the earth around you, reducing minor tremors and vibrations.", flavor: "The earth finds peace in your presence." },
    
    // Sub-Path A - Seismic Sense
    { id: 'seismic_sense', name: 'Seismic Sense', type: 'Keystone', cost: 2, prerequisite: 'barefoot_sensitivity', description: "By feeling vibrations through the ground, you can 'see' your surroundings, making a mental image of it. This requires direct contact with the ground.", flavor: "A technique originally developed by the blind badgermoles." },
    { id: 'acoustic_dampening', name: 'Acoustic Dampening', type: 'Minor', cost: 1, prerequisite: 'seismic_sense', description: "You can filter out distracting vibrations to focus on specific targets.", flavor: "The earth's voice grows clearer." },
    { id: 'lie_detector', name: 'Lie Detector', type: 'Minor', cost: 1, prerequisite: 'seismic_sense', description: "Your seismic sense is so acute you can detect the physical reactions of lying, such as breathing and heart rate.", flavor: "The earth reveals all secrets." },
    { id: 'structural_insight', name: 'Structural Insight', type: 'Minor', cost: 1, prerequisite: 'seismic_sense', description: "You can sense the internal structure of earth and stone, identifying weak points, faults, or hollow areas.", flavor: "The stone reveals its own weaknesses." },
    
    { id: 'earths_warning', name: 'The Earth\'s Warning', type: 'Manifestation', cost: 4, prerequisite: 'seismic_sense', description: "Your seismic sense becomes second nature. The earth itself seems to warn you of danger, giving you an almost precognitive instinct.", flavor: "The earth speaks of danger before it arrives." },
    { id: 'rhythmic_echo', name: 'Rhythmic Echo', type: 'Minor', cost: 1, prerequisite: 'earths_warning', description: "You can sense the 'rhythm' of an opponent's bending style, allowing you to anticipate their next move.", flavor: "Every fighter has a pattern." },
    { id: 'distant_tremors', name: 'Distant Tremors', type: 'Minor', cost: 1, prerequisite: 'earths_warning', description: "Your seismic awareness extends to a much greater range, allowing you to sense approaching threats from far away.", flavor: "The earth's warnings come early." },
    
    { id: 'geomantic_awareness', name: 'Geomantic Awareness', type: 'Axiom', cost: 5, prerequisite: 'earths_warning', description: "Your sense expands beyond immediate combat. You can feel the 'shape' of the land over a vast area, sensing major fault lines and underground features.", flavor: "The earth's ancient wisdom flows through you." },
    { id: 'far_reaching_echo', name: 'Far-Reaching Echo', type: 'Minor', cost: 1, prerequisite: 'geomantic_awareness', description: "You can send out a powerful seismic 'ping' to get a clearer, more detailed map of your surroundings.", flavor: "The earth's voice carries far." },
    { id: 'earths_memory', name: 'Earth\'s Memory', type: 'Minor', cost: 1, prerequisite: 'geomantic_awareness', description: "You can sense the history of the land, feeling echoes of past events that have shaped the terrain.", flavor: "The earth remembers all that has passed." },
    
    // Sub-Path B - The Perfect Counter
    { id: 'intercepting_wall', name: 'Intercepting Wall', type: 'Keystone', cost: 2, prerequisite: 'rooted_stance', description: "You can raise a small, precise wall of earth at the last second to block or deflect an incoming projectile.", flavor: "The mountain's shield appears when needed." },
    { id: 'catch_and_return', name: 'Catch and Return', type: 'Minor', cost: 1, prerequisite: 'intercepting_wall', description: "You can form the wall into a glove-like shape to catch a projectile and hurl it back.", flavor: "Receive the gift, and return it." },
    { id: 'shattering_impact', name: 'Shattering Impact', type: 'Minor', cost: 1, prerequisite: 'intercepting_wall', description: "The wall is designed to shatter on impact, spraying sharp rock shrapnel back towards the attacker.", flavor: "The mountain's teeth are sharp." },
    
    { id: 'patient_earth', name: 'Patient Earth', type: 'Manifestation', cost: 4, prerequisite: 'intercepting_wall', description: "While you remain still and rooted, you can passively influence the ground around you. The earth will subtly shift to aid you.", flavor: "The earth moves at your command, even when you do not." },
    { id: 'earths_embrace', name: 'Earth\'s Embrace', type: 'Minor', cost: 1, prerequisite: 'patient_earth', description: "If an enemy gets too close, the earth can rise up to briefly trap their feet, rooting them in place for a counter-attack.", flavor: "The earth holds what it touches." },
    { id: 'loyal_ground', name: 'Loyal Ground', type: 'Minor', cost: 1, prerequisite: 'patient_earth', description: "This zone of influence follows you as long as you maintain a slow, deliberate pace.", flavor: "The earth follows the patient master." },
    
    { id: 'eternal_mountain', name: 'Eternal Mountain', type: 'Axiom', cost: 5, prerequisite: 'patient_earth', description: "You become as immovable as the mountains themselves. No force can dislodge you from your position, and you can weather any storm.", flavor: "I am the mountain. I will not be moved." },
    { id: 'mountains_heart', name: 'Mountain\'s Heart', type: 'Minor', cost: 1, prerequisite: 'eternal_mountain', description: "Your connection to the earth's core grants you incredible endurance and resistance to fatigue.", flavor: "The mountain's strength flows through you." },
    { id: 'unshakable_resolve', name: 'Unshakable Resolve', type: 'Minor', cost: 1, prerequisite: 'eternal_mountain', description: "Your mental fortitude matches your physical stability, making you immune to fear and intimidation.", flavor: "The mountain's resolve is unshakeable." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getPatientMountainNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '👂';
        case 'Keystone': return '🛡️';
        case 'Axiom': return '⛰️';
        case 'Manifestation': return '🧱';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'hun_yuan', constellation: 'earth', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#8B4513', size: 50, icon: getPatientMountainNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'seismic_sense' || parentId === 'intercepting_wall') spread = WIDE_SPREAD_ANGLE;
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

export const PATIENT_MOUNTAIN_NODES = nodes;
export function generatePatientMountainConnections(): TalentConnection[] { return connections; }
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