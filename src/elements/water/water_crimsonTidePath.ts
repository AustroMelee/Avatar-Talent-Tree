import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = 0; // CORRECTED: Rightwards

// Helper data
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'The Spring of Life Path', type: 'Genesis', cost: 1, description: "You can perceive the flow of chi within living beings, allowing you to see injuries, blockages, or imbalances as disruptions in their energy.", flavor: "Water is the element of change, and healing is its greatest expression." },
  // Minors after Genesis
  { id: 'healing_touch', name: 'Healing Touch', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your touch has a calming effect, easing pain and reducing swelling even without active bending.", flavor: "A gentle hand soothes the spirit." },
  { id: 'lifes_flow', name: "Life's Flow", type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense the life force in all living things, making you more attuned to their needs.", flavor: "The river flows through all things." },
  // Sub-Path A - Focused Healing
  { id: 'chi_restoration', name: 'Chi Restoration', type: 'Keystone', cost: 2, prerequisite: 'healing_touch', description: "Using water as a conduit, you physically guide a person's chi back into its proper pathways, mending cuts, knitting bones, and healing internal injuries.", flavor: "Restore the flow." },
  { id: 'accelerated_mending', name: 'Accelerated Mending', type: 'Minor', cost: 1, prerequisite: 'chi_restoration', description: "The healing process is significantly faster, allowing you to treat serious wounds in minutes rather than hours.", flavor: "Swift waters heal swiftly." },
  { id: 'deep_cleanse', name: 'Deep Cleanse', type: 'Minor', cost: 1, prerequisite: 'chi_restoration', description: "You can push poisons, infections, and other foreign agents out of the body with a focused flush of water and chi.", flavor: "Cleanse the body, cleanse the spirit." },
  // Manifestation A2: Revitalizing Current
  { id: 'revitalizing_current', name: 'Revitalizing Current', type: 'Manifestation', cost: 4, prerequisite: 'chi_restoration', description: "By drawing on a large source of spiritually-charged water, you can perform incredible feats of healing, such as restoring scarred tissue, re-growing nerves, or even bringing someone back from the brink of death.", flavor: "The current restores all." },
  { id: 'group_renewal', name: 'Group Renewal', type: 'Minor', cost: 1, prerequisite: 'revitalizing_current', description: "You can channel the healing energy into a pool of water, allowing multiple people to be healed simultaneously.", flavor: "Heal the many." },
  { id: 'spirit_water_infusion', name: 'Spirit Water Infusion', type: 'Minor', cost: 1, prerequisite: 'revitalizing_current', description: "If you possess spirit water, this technique's power is amplified tenfold, capable of mending even catastrophic spiritual injuries.", flavor: "Spirit water, spirit healing." },
  // Axiom A3: Life's Spring
  { id: 'lifes_spring', name: "Life's Spring", type: 'Axiom', cost: 5, prerequisite: 'revitalizing_current', description: "You can create a permanent source of healing water that continuously restores vitality to those who drink from it or bathe in it.", flavor: "The spring of life flows eternal." },
  { id: 'eternal_spring', name: 'Eternal Spring', type: 'Minor', cost: 1, prerequisite: 'lifes_spring', description: "Your healing spring can be made permanent, creating a lasting source of healing for your community.", flavor: "A well that never runs dry." },
  { id: 'lifes_blessing', name: "Life's Blessing", type: 'Minor', cost: 1, prerequisite: 'lifes_spring', description: "Those who drink from your spring gain enhanced vitality and resistance to disease.", flavor: "Blessed by the water." },
  // Sub-Path B - The Forbidden Art
  { id: 'bloodbending', name: 'Bloodbending (Full Moon)', type: 'Keystone', cost: 2, prerequisite: 'lifes_flow', description: "A dark revelation. You understand that all life is water, and you gain the terrifying ability to seize control of the fluids within another living being's body.", flavor: "The moon's shadow falls." },
  { id: 'subtle_puppetry', name: 'Subtle Puppetry', type: 'Minor', cost: 1, prerequisite: 'bloodbending', description: "You can exert fine motor control, forcing a target to stumble, drop a weapon, or miss an attack.", flavor: "Pull the strings." },
  { id: 'crushing_grip', name: 'Crushing Grip', type: 'Minor', cost: 1, prerequisite: 'bloodbending', description: "You can cause intense internal pain and paralysis by constricting the flow within a target's body.", flavor: "Pain from within." },
  // Manifestation B2: Psychic Bloodbending
  { id: 'psychic_bloodbending', name: 'Psychic Bloodbending', type: 'Manifestation', cost: 4, prerequisite: 'bloodbending', description: "You have severed the final ethical tether. Through immense willpower and talent, you no longer require the full moon to bloodbend.", flavor: "No moon, no mercy." },
  { id: 'blood_sense', name: 'Blood-Sense', type: 'Minor', cost: 1, prerequisite: 'psychic_bloodbending', description: "You can feel the heartbeats and locations of all living creatures around you, making it impossible for them to hide.", flavor: "Sense the pulse of life." },
  { id: 'severing_the_flow', name: 'Severing the Flow', type: 'Minor', cost: 1, prerequisite: 'psychic_bloodbending', description: "You can use bloodbending to block a bender's connection to their chi paths, temporarily severing their ability to bend.", flavor: "Cut the flow." },
  // Axiom B3: The Dark Tide
  { id: 'the_dark_tide', name: 'The Dark Tide', type: 'Axiom', cost: 5, prerequisite: 'psychic_bloodbending', description: "You can control the blood of multiple targets simultaneously, creating a terrifying display of power that can incapacitate entire groups.", flavor: "The tide rises." },
  { id: 'mass_control', name: 'Mass Control', type: 'Minor', cost: 1, prerequisite: 'the_dark_tide', description: "You can control larger groups of people, though with less precision than individual control.", flavor: "Many as one." },
  { id: 'blood_storm', name: 'Blood Storm', type: 'Minor', cost: 1, prerequisite: 'the_dark_tide', description: "You can create a storm of blood droplets that can be used to attack or disorient enemies.", flavor: "A crimson rain falls." },
];

const SPREAD_ANGLE = Math.PI / 3;
const RADIUS_STEP = 220;
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getNodeIcon(type: string): string { 
    switch (type) { 
        case 'Genesis': return '💧'; 
        case 'Keystone': return '🌊'; 
        case 'Manifestation': return '🔍'; 
        case 'Axiom': return '📜'; 
        case 'Schism': return '🩸'; 
        case 'Minor': return '💧'; 
        default: return '🌊'; 
    } 
}

nodeDataList.forEach(d => { 
    const prerequisites = d.prerequisite ? [d.prerequisite] : []; 
    const node: TalentNode = { 
        ...d, 
        id: d.id, 
        path: 'crimson_tide', 
        constellation: 'water', 
        position: { x: 0, y: 0 }, 
        prerequisites, 
        visual: { color: '#f38ba8', size: 50, icon: getNodeIcon(d.type) }, 
        effects: [], 
        isVisible: true, 
        isAllocatable: !prerequisites.length, 
        isAllocated: false, 
        isLocked: !!prerequisites.length, 
        isPermanentlyLocked: false, 
        pkCost: d.cost, 
        type: d.type as NodeType 
    }; 
    nodes.push(node); 
    nodeMap[node.id] = node; 
});

const placeChildren = (parentId: string, parentAngle: number) => { 
    const children = nodes.filter(n => n.prerequisites.includes(parentId)); 
    const parent = nodeMap[parentId]; 
    if (!parent || children.length === 0) return; 
    const angleStep = SPREAD_ANGLE / (children.length > 1 ? children.length - 1 : 1); 
    const startAngle = parentAngle - SPREAD_ANGLE / 2; 
    children.forEach((child, i) => { 
        const angle = children.length > 1 ? startAngle + i * angleStep : parentAngle; 
        child.position = { 
            x: parent.position.x + RADIUS_STEP * Math.cos(angle), 
            y: parent.position.y + RADIUS_STEP * Math.sin(angle) 
        }; 
        placeChildren(child.id, angle); 
    }); 
};

placeChildren('genesis', PATH_MAIN_ANGLE);
nodes.forEach(n => n.prerequisites.forEach(p => connections.push({ from: p, to: n.id, isActive: false, isLocked: false })));

export const SPRING_OF_LIFE_NODES = nodes; 
export function generateSpringOfLifeConnections(): TalentConnection[] { return connections; } 
export const SPRING_OF_LIFE_METADATA = { 
    name: 'The Spring of Life', 
    philosophy: "In the driest desert, a single drop of water is life. To master water is to understand the sacred flow of chi that animates all beings.", 
    essence: "Healing, purification, chi manipulation, restoration, and the forbidden perversion of these arts.", 
    focus: "Healing and the forbidden art of bloodbending, inspired by Katara and Hama.", 
}; 