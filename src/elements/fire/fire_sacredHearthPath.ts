/**
 * Path 2: The Inner Sun (Life/Energy/Wisdom) - "The Dragon's Breath"
 *
 * Philosophy: "Fire is energy and life. The original firebending was learned from the dragons."
 * Essence: Stamina, energy redirection, empowering oneself.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = 0; // CORRECTED: Rightwards
const RADIUS_STEP = 320; // MATCHED: Same as Earth constellation
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Inner Sun Path', type: 'Genesis', cost: 1, description: "You learn firebending from its original source, the dragons. You understand that fire represents energy and life, not rage.", flavor: "A concept lost to nearly all firebenders during the Hundred Year War." },
    
    // Minor nodes after Genesis
    { id: 'inner_warmth', name: 'Inner Warmth', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can generate warmth from within, making you resistant to cold and able to survive in harsh environments.", flavor: "The sun's warmth lives within you." },
    { id: 'life_energy', name: 'Life Energy', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your firebending draws from your life force, making you more energetic and less prone to fatigue.", flavor: "Fire is the spark of life itself." },
    { id: 'dragon_spirit', name: 'Dragon Spirit', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You embody the wisdom and patience of the dragons, making you more resistant to manipulation and deception.", flavor: "The dragon's wisdom is ancient and deep." },
    { id: 'healing_flame', name: 'Healing Flame', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can use your fire to gently warm and heal minor injuries, though this requires great concentration.", flavor: "The same flame that destroys can also heal." },
    { id: 'energy_sense', name: 'Energy Sense', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense the energy and life force in living beings, allowing you to understand their emotional state.", flavor: "The energy of life flows through all things." },
    
    // Sub-Path A - Breath of Fire
    { id: 'breath_of_fire', name: 'Breath of Fire', type: 'Keystone', cost: 2, prerequisite: 'inner_warmth', description: "Mix air from the lungs with flame to create a wider, hotter blast directly from your mouth.", flavor: "This technique earned Iroh the nickname 'The Dragon of the West'." },
    { id: 'breath_control', name: 'Breath Control', type: 'Minor', cost: 1, prerequisite: 'breath_of_fire', description: "You have perfect control over your breath of fire, able to adjust its intensity and direction.", flavor: "The breath is the foundation of all firebending." },
    { id: 'sustained_flame', name: 'Sustained Flame', type: 'Minor', cost: 1, prerequisite: 'breath_of_fire', description: "You can maintain your breath of fire for extended periods, creating a continuous stream of flame.", flavor: "The dragon's breath never falters." },
    { id: 'healing_breath', name: 'Healing Breath', type: 'Minor', cost: 1, prerequisite: 'breath_of_fire', description: "Your breath of fire can be used to warm and heal others, though this requires great care and control.", flavor: "The breath that warms can also heal." },
    
    { id: 'dancing_dragon', name: 'The Dancing Dragon', type: 'Manifestation', cost: 4, prerequisite: 'breath_of_fire', description: "A firebending form learned from the Sun Warriors. It is fluid, natural, and one of the few firebending techniques with defensive capabilities.", flavor: "Learning this form allowed Zuko to finally duel evenly with Azula." },
    { id: 'fluid_movement', name: 'Fluid Movement', type: 'Minor', cost: 1, prerequisite: 'dancing_dragon', description: "Your movements become as fluid and graceful as the dragon's dance, making you harder to predict and hit.", flavor: "The dragon dances with the wind." },
    { id: 'defensive_flame', name: 'Defensive Flame', type: 'Minor', cost: 1, prerequisite: 'dancing_dragon', description: "You can use your fire defensively, creating barriers and deflecting attacks with graceful movements.", flavor: "The flame can protect as well as destroy." },
    
    { id: 'energy_reading', name: 'Energy Reading', type: 'Axiom', cost: 5, prerequisite: 'dancing_dragon', description: "You are capable of sensing and guiding the heat and energy along pathways within a person's body.", flavor: "Used by ancient shamans to diagnose spiritual maladies." },
    { id: 'chi_manipulation', name: 'Chi Manipulation', type: 'Minor', cost: 1, prerequisite: 'energy_reading', description: "You can gently manipulate the chi flow in others, helping to restore balance and health.", flavor: "The energy of life responds to the master's touch." },
    { id: 'spiritual_healing', name: 'Spiritual Healing', type: 'Minor', cost: 1, prerequisite: 'energy_reading', description: "Your understanding of energy allows you to heal spiritual wounds and restore inner balance.", flavor: "The spirit and body are one." },
    
    // Sub-Path B - Dragon's Wisdom
    { id: 'dragon_vision', name: 'Dragon Vision', type: 'Keystone', cost: 2, prerequisite: 'dragon_spirit', description: "You gain the ability to see through deception and illusions, perceiving the true nature of things.", flavor: "The dragon's eyes see through all falsehoods." },
    { id: 'ancient_knowledge', name: 'Ancient Knowledge', type: 'Minor', cost: 1, prerequisite: 'dragon_vision', description: "You have access to ancient firebending wisdom and techniques that have been lost to time.", flavor: "The dragon's memory spans centuries." },
    { id: 'truth_speaker', name: 'Truth Speaker', type: 'Minor', cost: 1, prerequisite: 'dragon_vision', description: "Your words carry the weight of ancient wisdom, making you more persuasive and trustworthy.", flavor: "The dragon speaks only truth." },
    
    { id: 'sun_warrior_legacy', name: 'Sun Warrior Legacy', type: 'Manifestation', cost: 4, prerequisite: 'dragon_vision', description: "You embody the spirit of the Sun Warriors, gaining their ancient techniques and understanding.", flavor: "The legacy of the Sun Warriors lives on." },
    { id: 'sacred_fire', name: 'Sacred Fire', type: 'Minor', cost: 1, prerequisite: 'sun_warrior_legacy', description: "Your fire takes on a sacred quality, capable of purifying corruption and evil.", flavor: "The sacred flame burns away all impurity." },
    { id: 'eternal_flame', name: 'Eternal Flame', type: 'Minor', cost: 1, prerequisite: 'sun_warrior_legacy', description: "You can create a flame that never goes out, serving as a beacon of hope and guidance.", flavor: "The eternal flame guides the way." },
    
    { id: 'dragon_ascension', name: 'Dragon Ascension', type: 'Axiom', cost: 5, prerequisite: 'sun_warrior_legacy', description: "You achieve the highest level of dragon-inspired firebending, becoming one with the ancient wisdom.", flavor: "You become as the dragons themselves." },
    { id: 'cosmic_awareness', name: 'Cosmic Awareness', type: 'Minor', cost: 1, prerequisite: 'dragon_ascension', description: "You gain awareness of the cosmic forces that govern fire and energy throughout the universe.", flavor: "The dragon's wisdom spans the cosmos." },
    { id: 'immortal_flame', name: 'Immortal Flame', type: 'Minor', cost: 1, prerequisite: 'dragon_ascension', description: "Your connection to the eternal flame makes you resistant to aging and disease.", flavor: "The dragon's flame never dies." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getInnerSunNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '☀️';
        case 'Keystone': return '🔥';
        case 'Axiom': return '🌟';
        case 'Manifestation': return '🐉';
        case 'Minor': return '🔥';
        default: return '🔥';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'inner_sun', constellation: 'fire', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#fab387', size: 50, icon: getInnerSunNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'breath_of_fire' || parentId === 'dragon_vision') spread = WIDE_SPREAD_ANGLE;
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

export const INNER_SUN_NODES = nodes;
export function generateInnerSunConnections(): TalentConnection[] { return connections; }
export const INNER_SUN_METADATA = {
    name: 'The Inner Sun',
    philosophy: "Fire is energy and life.",
    essence: "Stamina, energy redirection, empowering oneself.",
    focus: "The original, true form of firebending.",
    sacredAnimal: "The Dragon",
    emoji: '🐉',
    color: '#fab387',
    position: { x: 2300, y: 1200 }
};