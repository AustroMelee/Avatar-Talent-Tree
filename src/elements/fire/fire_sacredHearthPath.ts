/**
 * Path 2: The Inner Sun - "The Source of Life" (Canonically Refactored)
 *
 * Path Philosophy: "Fire is not just destruction; it is the energy of life itself. Draw warmth from the sun, and power from your own inner spirit."
 * Essence: Stamina, energy redirection, empowering oneself, and resisting the cold.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800;
const CENTER_Y = 480;
const BRANCHES = 1;
const PATH_MAIN_ANGLE = Math.PI; // To the left
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Inner Sun Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You learn firebending from its original source, the dragons. You understand that fire represents energy and life, not rage.", flavor: "A concept lost to nearly all firebenders during the Hundred Year War." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Inner Warmth', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can generate warmth from within, making you resistant to cold and able to survive in harsh environments.", flavor: "The sun's warmth lives within you." },
    { id: 'minor_genesis_2', name: 'Life Sense', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can sense the life energy in living things, understanding their vitality and health.", flavor: "All life burns with the same inner fire." },
    
    // --- Sub-Path A: Breath and Energy ---
    { id: 'breath_of_fire', name: 'Fire Breathing', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Mix air from the lungs with flame to create a wider, hotter blast directly from your mouth. Requires excellent breath control.", flavor: "This technique earned Iroh the nickname 'The Dragon of the West'." },
    { id: 'minor_bof_1', name: 'Heat Control', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'breath_of_fire', description: "You can generate intense heat without producing flame, allowing you to heat metal or create steam.", flavor: "As demonstrated by Iroh and Sozin." },
    { id: 'minor_bof_2', name: 'Steam Generation', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'breath_of_fire', description: "You can create steam by heating water, useful for cooking, cleaning, or creating cover.", flavor: "Water and fire in harmony." },
    
    { id: 'dancing_dragon', name: 'The Dancing Dragon', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'breath_of_fire', description: "A firebending form learned from the sacred statues of the Sun Warriors. It is fluid, natural, and one of the few firebending techniques with defensive capabilities.", flavor: "Learning this form allowed Zuko to finally duel evenly with Azula." },
    { id: 'minor_dd_1', name: 'Flowing Motion', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'dancing_dragon', description: "Your movements become more fluid and dance-like, making your firebending unpredictable and beautiful.", flavor: "Fire dances like the wind." },
    
    { id: 'energy_reading', name: 'Energy Reading', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'dancing_dragon', description: "You are capable of sensing and guiding the heat and energy along pathways within a person's body.", flavor: "Used by ancient shamans to diagnose spiritual maladies." },
    { id: 'minor_er_1', name: 'Healing Touch', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'energy_reading', description: "You can use your energy reading to promote healing in others, warming their chi and restoring vitality.", flavor: "The warmth of life can heal." },
    
    // --- Sub-Path B: Spiritual Fire ---
    { id: 'spiritual_flame', name: 'Spiritual Flame', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Your fire can interact with spirits and spiritual energy, allowing you to see and communicate with the spirit world.", flavor: "Fire bridges the gap between worlds." },
    { id: 'minor_sf_1', name: 'Spirit Sight', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'spiritual_flame', description: "You can see spirits and spiritual energy as flames of different colors and intensities.", flavor: "The spirit world burns with its own fire." },
    
    { id: 'life_giving_flame', name: 'Life-Giving Flame', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'energy_reading', description: "Your fire can restore life and vitality to the dying, though at great cost to yourself. The ultimate expression of fire as life.", flavor: "To give life is the highest calling of fire." },
    { id: 'minor_lgf_1', name: 'Revitalizing Heat', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'life_giving_flame', description: "Your presence alone can restore energy and vitality to those around you, like the warmth of the sun.", flavor: "You carry the sun's blessing." },
    
    // Additional Minor Nodes
    { id: 'is_minor_1', name: 'Inner Warmth', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can raise your core body temperature, granting you significant resistance to cold environments.", flavor: "The sun's warmth lives within." },
    { id: 'is_minor_2', name: 'Extinguishing Grasp', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'breath_of_fire', description: "You can extinguish small fires by touch, absorbing their energy into your body.", flavor: "The flame of life absorbs all." },
    { id: 'is_minor_3', name: 'Shared Warmth', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'dancing_dragon', description: "You can transfer a portion of your body's warmth to an ally through physical contact, revitalizing them.", flavor: "More than one can sit by the fire." },
    { id: 'is_minor_4', name: 'Solar Flare', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'energy_reading', description: "You can release stored solar energy in a single, blinding, 360-degree blast.", flavor: "The sun's power, unleashed." },
    { id: 'is_minor_5', name: 'Sun\'s Endurance', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "During the day, your stamina regenerates noticeably faster.", flavor: "The sun gives strength to those who seek it." },
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
        path: 'inner_sun',
        constellation: 'fire',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#fab387',
            size: 50,
            icon: getInnerSunNodeIcon(type)
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
export const INNER_SUN_NODES = nodes;
export const INNER_SUN_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateInnerSunConnections(): TalentConnection[] {
    return connections;
}
export const INNER_SUN_METADATA = {
    name: 'The Inner Sun',
    philosophy: "Fire is not just destruction; it is the energy of life itself. Draw warmth from the sun, and power from your own inner spirit.",
    essence: "Stamina, energy redirection, empowering oneself, and resisting the cold.",
    focus: "The original, true form of firebending learned from the dragons, representing life and energy.",
    sacredAnimal: "The Dragon",
    emoji: '☀️',
    color: '#fab387',
    position: { x: 800, y: 480 }
};

function getInnerSunNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '☀️';
        case 'Keystone': return '🔥';
        case 'Manifestation': return '🕉️';
        case 'Axiom': return '✨';
        case 'Capstone': return '��';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '☠️';
        case 'Minor': return '🔥';
        default: return '🔥';
    }
}