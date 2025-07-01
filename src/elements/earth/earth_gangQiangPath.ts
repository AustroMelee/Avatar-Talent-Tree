/**
 * Path 3: The Eternal Mountain (Strength) - "The Unyielding Stone"
 *
 * Philosophy: "Be the mountain that weathers all storms. Your strength is not in aggression, but in absolute, unbreakable resolve."
 * Essence: Raw power, overwhelming force, immovable defense, the strength of the mountain itself.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const RADIUS_STEP = 320;
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Eternal Mountain Path', type: 'Genesis', cost: 1, description: "Your earthbending is imbued with your stubborn will. Your thrown rocks hit harder, and your stances are more solid.", flavor: "This is not about anger, but about absolute resolve." },
    
    // Minor nodes after Genesis
    { id: 'boulder_hurl', name: 'Boulder Hurl', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can more easily lift and throw boulders far larger than yourself.", flavor: "The mountain's strength is mine." },
    { id: 'concussive_impact', name: 'Concussive Impact', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your earthbending attacks have a greater chance of staggering opponents or knocking them off their feet.", flavor: "The mountain's fist is heavy." },
    { id: 'unbreakable_will', name: 'Unbreakable Will', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your mental fortitude enhances your physical strength, making your earthbending more powerful.", flavor: "The mountain's resolve is unshakeable." },
    { id: 'mountains_strength', name: 'Mountain\'s Strength', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can draw on the earth's inherent strength, making your attacks more devastating.", flavor: "The mountain's power flows through me." },
    { id: 'tectonic_resonance', name: 'Tectonic Resonance', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your connection to the earth's core makes your bending more powerful and stable.", flavor: "The earth's heartbeat matches my own." },
    
    // Sub-Path A - The Immovable Object
    { id: 'earth_armor', name: 'Earth Armor', type: 'Keystone', cost: 2, prerequisite: 'boulder_hurl', description: "Bring rocks, dust, or crystals around you and mold them to fit your body, creating a suit of armor for immense defense.", flavor: "This technique limits the user's range of motion." },
    { id: 'spiked_armor', name: 'Spiked Armor', type: 'Minor', cost: 1, prerequisite: 'earth_armor', description: "You can cause sharp spikes to erupt from your armor's surface to deter close-range attackers.", flavor: "The mountain's teeth are sharp." },
    { id: 'full_encasement', name: 'Full Encasement', type: 'Minor', cost: 1, prerequisite: 'earth_armor', description: "You can form the armor into a complete, sealed sarcophagus for a brief period to weather an overwhelming attack.", flavor: "The mountain endures all." },
    
    { id: 'unbreakable_wall', name: 'Unbreakable Wall', type: 'Manifestation', cost: 4, prerequisite: 'earth_armor', description: "You can raise massive, thick walls of compressed rock that can withstand cannon fire and repeated assaults.", flavor: "Let them throw their fury at the mountain. The mountain will not care." },
    { id: 'rampart_defense', name: 'Rampart Defense', type: 'Minor', cost: 1, prerequisite: 'unbreakable_wall', description: "Your walls can be formed with battlements and firing slits for you and your allies to use.", flavor: "The fortress stands unassailable." },
    { id: 'reinforced_structure', name: 'Reinforced Structure', type: 'Minor', cost: 1, prerequisite: 'unbreakable_wall', description: "Your walls are reinforced with multiple layers of compressed earth, making them nearly indestructible.", flavor: "The mountain's foundation is unshakeable." },
    
    { id: 'rooted_to_world', name: 'Rooted to the World', type: 'Axiom', cost: 5, prerequisite: 'unbreakable_wall', description: "You can anchor yourself to the very bedrock beneath you. While in this stance, you are truly immovable by any physical or bending force.", flavor: "I am the mountain. I will not be moved." },
    { id: 'earths_grip', name: 'Earth\'s Grip', type: 'Minor', cost: 1, prerequisite: 'rooted_to_world', description: "While rooted, you can extend this unmovable property to a small patch of ground around you, preventing enemies from tunneling beneath you.", flavor: "The mountain's foundation is unshakeable." },
    { id: 'bedrock_connection', name: 'Bedrock Connection', type: 'Minor', cost: 1, prerequisite: 'rooted_to_world', description: "Your connection to the earth's core grants you incredible stability and resistance to all forms of attack.", flavor: "The mountain's heart beats within me." },
    
    // Sub-Path B - The Unstoppable Force
    { id: 'column_assault', name: 'Column Assault', type: 'Keystone', cost: 2, prerequisite: 'concussive_impact', description: "You can launch a high-speed pillar of rock from the ground to strike an opponent from below or create a platform.", flavor: "The mountain reaches for the sky." },
    { id: 'rapid_fire_pillars', name: 'Rapid Fire Pillars', type: 'Minor', cost: 1, prerequisite: 'column_assault', description: "You can launch multiple, smaller pillars in quick succession to harry an opponent or create a path.", flavor: "The mountain has many fingers." },
    { id: 'precision_strike', name: 'Precision Strike', type: 'Minor', cost: 1, prerequisite: 'column_assault', description: "Your pillars can be launched with incredible accuracy, striking specific targets with devastating force.", flavor: "The mountain's aim is true." },
    
    { id: 'tectonic_shift', name: 'Tectonic Shift', type: 'Manifestation', cost: 4, prerequisite: 'column_assault', description: "By stomping the ground with immense force, you can send a localized shockwave through the earth, creating fissures and destabilizing structures.", flavor: "The world trembles when I command it." },
    { id: 'ripple_effect', name: 'Ripple Effect', type: 'Minor', cost: 1, prerequisite: 'tectonic_shift', description: "Your tectonic shift travels further and can curve to follow a specific path.", flavor: "The tremor spreads far." },
    { id: 'seismic_wave', name: 'Seismic Wave', type: 'Minor', cost: 1, prerequisite: 'tectonic_shift', description: "You can create multiple waves of earth-shaking force, devastating large areas.", flavor: "The mountain's fury is unstoppable." },
    
    { id: 'mountain_breaker', name: 'Mountain Breaker', type: 'Axiom', cost: 5, prerequisite: 'tectonic_shift', description: "The pinnacle of raw power. You can lift and throw colossal structures like statues or entire sections of a city wall.", flavor: "I do not shape the world. I break it." },
    { id: 'golem_creation', name: 'Golem Creation', type: 'Minor', cost: 1, prerequisite: 'mountain_breaker', description: "Instead of throwing it, you can animate a massive humanoid figure of earth and stone to fight for you for a short time.", flavor: "The mountain walks." },
    { id: 'tectonic_mastery', name: 'Tectonic Mastery', type: 'Minor', cost: 1, prerequisite: 'mountain_breaker', description: "You can manipulate the very foundations of the earth, causing massive geological changes.", flavor: "The mountain shapes the world." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getEternalMountainNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '⛰️';
        case 'Keystone': return '🛡️';
        case 'Axiom': return '🌍';
        case 'Manifestation': return '💥';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'gang_qiang', constellation: 'earth', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#A0522D', size: 50, icon: getEternalMountainNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'earth_armor' || parentId === 'column_assault') spread = WIDE_SPREAD_ANGLE;
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

export const ETERNAL_MOUNTAIN_NODES = nodes;
export function generateEternalMountainConnections(): TalentConnection[] { return connections; }
export const ETERNAL_MOUNTAIN_METADATA = {
    name: 'The Eternal Mountain',
    philosophy: "Be the mountain that weathers all storms. Your strength is not in aggression, but in absolute, unbreakable resolve.",
    essence: "Raw power, overwhelming force, immovable defense, the strength of the mountain itself.",
    focus: "Raw power and unyielding strength, inspired by King Bumi and the Dai Li.",
    sacredAnimal: "The Badgermole",
    emoji: '⛰️',
    color: '#A0522D',
    position: { x: 820, y: 600 }
};