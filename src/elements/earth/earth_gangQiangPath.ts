/**
 * Path 3: The Eternal Mountain (Strength) - "The Unyielding Force" (Canonically Refactored)
 *
 * Path Philosophy: "Some things must never bend. Be the mountain that weathers all storms and breaks all who stand against it."
 * Essence: Raw power, overwhelming force, immovable defense, and large-scale tectonic bending.
 *
 * REFACTOR: Updated to match the "Four Pillars of Stone" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 820;
const CENTER_Y = 580;
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
    { id: 'genesis', name: 'The Eternal Mountain Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your earthbending is imbued with your stubborn will. Your thrown rocks hit harder, and your stances are more solid. You embody 'substance over style.'", flavor: "This is not about anger, but about absolute resolve." },
    // Minors after Genesis
    { id: 'earth_armor', name: 'Earth Armor', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Bring rocks, dust, or crystals around you and mold them to fit your body, creating a suit of armor for immense defense.", flavor: "This technique is great for defense but limits the user's range of motion." },
    { id: 'minor_ea_1', name: 'Spiked Armor', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'earth_armor', description: "You can cause sharp spikes to erupt from your armor's surface to deter close-range attackers.", flavor: "The mountain's teeth are sharp." },
    // Sub-Path A - The Immovable Object
    { id: 'tectonics', name: 'Tectonics', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'earth_armor', description: "Earthbend on a scale vast enough to move entire landmasses. This requires the power of the Avatar State for non-Avatars.", flavor: "As used by Avatar Kyoshi to create Kyoshi Island." },
    { id: 'rock_column', name: 'Rock Column', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Force columns of rock out of the ground to strike opponents or create platforms. More powerful than simple rock projectiles.", flavor: "The mountain reaches for the sky." },
    { id: 'earthquake', name: 'Earthquake/Fissures', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'rock_column', description: "Strike the ground with your fists or feet to create localized earthquakes or fissures to throw opponents off-balance.", flavor: "The world trembles when I command it." },
    { id: 'A3', name: 'Rooted to the World', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'earthquake', description: "You can anchor yourself to the very bedrock beneath you. While in this stance, you are truly immovable by any physical or bending force, though you cannot move yourself. You become a human mountain.", flavor: "I am the mountain. I will not be moved." },
    { id: 'minor_a3_1', name: 'Earth\'s Grip', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "While rooted, you can extend this unmovable property to a small patch of ground around you, preventing enemies from tunneling beneath you or shifting the earth you stand on.", flavor: "The mountain's foundation is unshakeable." },
    // Sub-Path B - The Unstoppable Force
    { id: 'minor_b1_1', name: 'Rapid Fire Pillars', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'rock_column', description: "You can launch multiple, smaller pillars in quick succession to harry an opponent or create a path.", flavor: "The mountain has many fingers." },
    { id: 'minor_b2_1', name: 'Ripple Effect', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'earthquake', description: "Your tectonic shift travels further and can curve to follow a specific path.", flavor: "The tremor spreads far." },
    { id: 'B3', name: 'Mountain Breaker', type: 'Axiom', cost: 5, branch: 1, depth: 3, prerequisite: 'earthquake', description: "The pinnacle of raw power, as demonstrated by King Bumi. You can lift and throw colossal structures like statues or entire sections of a city wall. This requires immense stamina and concentration.", flavor: "I do not shape the world. I break it." },
    { id: 'minor_b3_1', name: 'Golem Creation', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Instead of throwing it, you can animate a massive humanoid figure of earth and stone to fight for you for a short time.", flavor: "The mountain walks." },
    
    // Additional Minor Nodes
    { id: 'em_minor_1', name: 'Boulder Hurl', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can more easily lift and throw boulders far larger than yourself.", flavor: "The mountain's strength is mine." },
    { id: 'em_minor_2', name: 'Unbreakable Will', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your determination makes you more resistant to mental manipulation and fear effects.", flavor: "The mountain's resolve is unshakeable." },
    { id: 'em_minor_3', name: 'Stone Fist', type: 'Minor', cost: 1, branch: -0.2, depth: 0.5, prerequisite: 'genesis', description: "Your punches and strikes carry the weight of stone, making them more devastating.", flavor: "The mountain's fist is heavy." },
    { id: 'em_minor_4', name: 'Immovable Stance', type: 'Minor', cost: 1, branch: 0, depth: 0.5, prerequisite: 'genesis', description: "Your stances are incredibly stable, making it nearly impossible to knock you off balance.", flavor: "The mountain does not move." },
    { id: 'em_minor_5', name: 'Raw Power', type: 'Minor', cost: 1, branch: 0.4, depth: 0.5, prerequisite: 'genesis', description: "Your earthbending techniques are more powerful and destructive, though less refined.", flavor: "The mountain's power is raw and unrefined." },
    { id: 'em_minor_6', name: 'Full Encasement', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'earth_armor', description: "You can form the armor into a complete, sealed sarcophagus for a brief period to weather an overwhelming attack.", flavor: "The mountain endures all." },
    { id: 'em_minor_7', name: 'Precision Strike', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'rock_column', description: "Your pillars can be launched with incredible accuracy, striking specific targets with devastating force.", flavor: "The mountain's aim is true." },
    { id: 'em_minor_8', name: 'Seismic Wave', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'earthquake', description: "You can create multiple waves of earth-shaking force, devastating large areas.", flavor: "The mountain's fury is unstoppable." },
    { id: 'em_minor_9', name: 'Unbreakable Wall', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'earthquake', description: "You can raise massive, thick walls of compressed rock that can withstand cannon fire.", flavor: "Let them throw their fury at the mountain. The mountain will not care." },
    { id: 'em_minor_10', name: 'Tectonic Mastery', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'tectonics', description: "You can manipulate the very foundations of the earth, causing massive geological changes.", flavor: "The mountain shapes the world." },
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
        path: 'gang_qiang',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#A0522D',
            size: 50,
            icon: getEternalMountainNodeIcon(type)
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
export const ETERNAL_MOUNTAIN_NODES = nodes;
export const ETERNAL_MOUNTAIN_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateEternalMountainConnections(): TalentConnection[] {
    return connections;
}
export const ETERNAL_MOUNTAIN_METADATA = {
    name: 'The Eternal Mountain',
    philosophy: "Some things must never bend. Be the mountain that weathers all storms and breaks all who stand against it.",
    essence: "Raw power, overwhelming force, immovable defense, and large-scale tectonic bending.",
    focus: "Raw power and unyielding strength, inspired by King Bumi and Avatar Kyoshi.",
    sacredAnimal: "The Mountain Lion",
    emoji: '🗿',
    color: '#A0522D',
    position: { x: 820, y: 580 }
};

function getEternalMountainNodeIcon(type: string): string {
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