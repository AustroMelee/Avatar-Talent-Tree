/**
 * Path 1: The Flowing Form - 流形 (Liú Xíng) (Canonically Refactored)
 *
 * Path Philosophy: "Water can flow or it can crash. Be water, my friend."
 * Essence: Versatility, mimicry of natural forms, reactive combat.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = -Math.PI / 2; // CORRECTED: Upwards
const SPREAD_ANGLE = Math.PI / 3;
const RADIUS_STEP = 220;

// Helper data
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Flowing Form Path', type: 'Genesis', cost: 1, description: "You instinctively sense the flow of water in the environment and the 'flow' of combat, making it easier to anticipate and react to an opponent's rhythm.", flavor: "Water is the element of change." },
    // Minors after Genesis
    { id: 'flowing_grace', name: 'Flowing Grace', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your waterbending movements are more fluid and graceful, improving your overall technique.", flavor: "Move as the river moves." },
    { id: 'waters_touch', name: 'Water\'s Touch', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense water sources nearby and feel their purity and strength.", flavor: "The water calls to you." },
    // Sub-Path A - Adaptive Combat
    { id: 'octopus_form', name: 'Octopus Form', type: 'Keystone', cost: 2, prerequisite: 'flowing_grace', description: "Form multiple, semi-sentient water tendrils around your body for simultaneous offense and defense, mimicking the movements of a cephalopod.", flavor: "The octopus teaches us to be everywhere at once." },
    { id: 'grasping_tentacles', name: 'Grasping Tentacles', type: 'Minor', cost: 1, prerequisite: 'octopus_form', description: "Your tentacles can securely grab onto opponents, objects, or surfaces to pull or throw them.", flavor: "The river pulls what it touches." },
    { id: 'extended_reach', name: 'Extended Reach', type: 'Minor', cost: 1, prerequisite: 'octopus_form', description: "You can extend your tentacles to a much greater length, controlling the space around you.", flavor: "Reach beyond the horizon." },
    // Manifestation A2: Reactive Defense
    { id: 'reactive_defense', name: 'Reactive Defense', type: 'Manifestation', cost: 4, prerequisite: 'octopus_form', description: "When an opponent attacks, you can instantly pull water from a source to create a shield, parry with a whip, or even form a watery duplicate of yourself.", flavor: "Defense is the best offense." },
    { id: 'counter_current', name: 'Counter-Current', type: 'Minor', cost: 1, prerequisite: 'reactive_defense', description: "After blocking an attack, your water shield releases a powerful wave back at the attacker.", flavor: "The current always returns." },
    { id: 'vapor_decoy', name: 'Vapor Decoy', type: 'Minor', cost: 1, prerequisite: 'reactive_defense', description: "Your watery duplicate now dissolves into a thick cloud of mist, obscuring vision.", flavor: "Disappear in a cloud of mist." },
    // Axiom A3: Fluidic Motion
    { id: 'fluidic_motion', name: 'Fluidic Motion', type: 'Axiom', cost: 5, prerequisite: 'reactive_defense', description: "You no longer distinguish between your own movement and the movement of the water. Your body and your bending become one, allowing you to seamlessly transition between offense, defense, and mobility.", flavor: "You are the water." },
    { id: 'unbalancing_flow', name: 'Unbalancing Flow', type: 'Minor', cost: 1, prerequisite: 'fluidic_motion', description: "Every movement you make creates subtle currents at your opponent's feet, constantly disrupting their balance.", flavor: "Destabilize with every step." },
    { id: 'one_with_the_water', name: 'One with the Water', type: 'Minor', cost: 1, prerequisite: 'fluidic_motion', description: "While in contact with a large body of water, you can 'teleport' through it, dissolving into the water in one spot and reforming in another nearby.", flavor: "Become the river." },
    // Sub-Path B - Environmental Mastery
    { id: 'plantbending', name: 'Plantbending', type: 'Keystone', cost: 2, prerequisite: 'waters_touch', description: "By controlling the water within plants, you can manipulate them. This is most effective on water-rich plants like vines and seaweed but can be used to rustle trees or part grasses.", flavor: "The water in all things answers the call." },
    { id: 'vine_lash', name: 'Vine Lash', type: 'Minor', cost: 1, prerequisite: 'plantbending', description: "You can command vines to whip, ensnare, and constrict your opponents.", flavor: "The jungle is your ally." },
    { id: 'verdant_shield', name: 'Verdant Shield', type: 'Minor', cost: 1, prerequisite: 'plantbending', description: "You can rapidly grow a thick barrier of roots and leaves from the ground to block attacks.", flavor: "Nature's shield is swift." },
    // Manifestation B2: State Shifting
    { id: 'state_shifting', name: 'State Shifting', type: 'Manifestation', cost: 4, prerequisite: 'plantbending', description: "You have mastered the rapid transition between water's three states. You can flash-freeze a wave into a wall, instantly melt that wall into a rushing torrent, and turn that torrent into a concealing cloud of steam.", flavor: "Change is your weapon." },
    { id: 'thermal_shock', name: 'Thermal Shock', type: 'Minor', cost: 1, prerequisite: 'state_shifting', description: "Your rapid temperature changes create stress in enemy armor and earth defenses, making them brittle.", flavor: "Break them with heat and cold." },
    { id: 'scalding_mist', name: 'Scalding Mist', type: 'Minor', cost: 1, prerequisite: 'state_shifting', description: "Your steam can be made intensely hot, creating a painful barrier that can cause burns on unprotected skin.", flavor: "Mist that burns." },
    // Axiom B3: Mirror of the World
    { id: 'mirror_of_the_world', name: 'Mirror of the World', type: 'Axiom', cost: 5, prerequisite: 'state_shifting', description: "You can create perfect reflections of the world around you using water, allowing you to see around corners, communicate over distances, and even create illusions.", flavor: "See all, be all." },
    { id: 'reflection_mastery', name: 'Reflection Mastery', type: 'Minor', cost: 1, prerequisite: 'mirror_of_the_world', description: "Your water mirrors can show events happening in other locations, allowing for remote observation.", flavor: "The world in a drop." },
    { id: 'illusion_weaving', name: 'Illusion Weaving', type: 'Minor', cost: 1, prerequisite: 'mirror_of_the_world', description: "You can create complex illusions using water and light, making it appear as if you are in multiple places at once.", flavor: "Weave the impossible." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getNodeIcon(type: string): string { 
    switch (type) { 
        case 'Genesis': return '💧'; 
        case 'Keystone': return '🌊'; 
        case 'Manifestation': return '🔍'; 
        case 'Axiom': return '📜'; 
        case 'Minor': return '💧'; 
        default: return '🌊'; 
    } 
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id:d.id, path:'endless_mirror', constellation:'water', position: { x: 0, y: 0 }, prerequisites,
        visual:{color:'#74c7ec',size:50,icon:getNodeIcon(d.type)}, effects:[], isVisible:true, isAllocatable:!prerequisites.length,
        isAllocated:false, isLocked:!!prerequisites.length, isPermanentlyLocked:false, pkCost:d.cost, type:d.type as NodeType
    };
    nodes.push(node);
    nodeMap[node.id] = node;
});

const placeChildren = (parentId: string, parentAngle: number) => {
    const children = nodes.filter(n => n.prerequisites.includes(parentId));
    const parentNode = nodeMap[parentId];
    if (!parentNode || children.length === 0) return;

    const angleStep = SPREAD_ANGLE / (children.length > 1 ? children.length - 1 : 1);
    const startAngle = parentAngle - SPREAD_ANGLE / 2;
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

export const FLOWING_FORM_NODES = nodes; 
export function generateFlowingFormConnections(): TalentConnection[] { return connections; } 
export const FLOWING_FORM_METADATA = { 
    name: 'The Flowing Form', 
    philosophy: "Water can flow or it can crash. Be water, my friend.", 
    essence: "Versatility, mimicry of natural forms, reactive combat.", 
    focus: "Adaptive combat and environmental mastery, inspired by Katara's versatile style.", 
}; 