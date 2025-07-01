import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI; // CORRECTED: Leftwards

// Helper data
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'The Crushing Abyss Path', type: 'Genesis', cost: 1, description: "You feel the weight and pressure of water, allowing you to exert more force with your bending and create more powerful currents.", flavor: "The abyss holds tight." },
  // Minors after Genesis
  { id: 'pressure_sense', name: 'Pressure Sense', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can feel the pressure of water around you, making you more aware of underwater currents and depths.", flavor: "Feel the weight of the world." },
  { id: 'deep_currents', name: 'Deep Currents', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can create powerful underwater currents that can carry you or others through water at high speeds.", flavor: "Ride the deep." },
  // Sub-Path A - High Pressure Techniques
  { id: 'high_pressure_jet', name: 'High-Pressure Jet', type: 'Keystone', cost: 2, prerequisite: 'pressure_sense', description: "You create a thin, highly-pressurized stream of water capable of slicing through wood and rock, or punching through armor.", flavor: "Cut with water." },
  { id: 'pressure_cutter', name: 'Pressure Cutter', type: 'Minor', cost: 1, prerequisite: 'high_pressure_jet', description: "Your jet can be focused into an even thinner stream that can cut through metal and stone with ease.", flavor: "Cut through anything." },
  { id: 'abyssal_drill', name: 'Abyssal Drill', type: 'Minor', cost: 1, prerequisite: 'high_pressure_jet', description: "You can spin your jet into a drilling motion, allowing you to bore through solid rock and earth.", flavor: "Drill through the earth." },
  // Manifestation A2: Water Sphere
  { id: 'water_sphere', name: 'Water Sphere', type: 'Manifestation', cost: 4, prerequisite: 'high_pressure_jet', description: "You can trap an opponent inside a sphere of water, lifting them off the ground and rendering them helpless while you maintain concentration.", flavor: "The abyss squeezes tight." },
  { id: 'crushing_sphere', name: 'Crushing Sphere', type: 'Minor', cost: 1, prerequisite: 'water_sphere', description: "You can increase the pressure within the sphere, causing intense pain and potentially crushing internal organs.", flavor: "Crush them slowly." },
  { id: 'abyssal_prison', name: 'Abyssal Prison', type: 'Minor', cost: 1, prerequisite: 'water_sphere', description: "The sphere becomes nearly impenetrable, making it impossible for the trapped person to escape without external help.", flavor: "A prison of water." },
  // Axiom A3: The Abyssal Maw
  { id: 'abyssal_maw', name: 'The Abyssal Maw', type: 'Axiom', cost: 5, prerequisite: 'high_pressure_jet', description: "You can create a massive vortex of water that acts like a whirlpool, pulling in enemies and crushing them with immense pressure.", flavor: "The abyss consumes all." },
  { id: 'oceanic_vortex', name: 'Oceanic Vortex', type: 'Minor', cost: 1, prerequisite: 'abyssal_maw', description: "Your vortex can be made large enough to affect entire groups of enemies at once.", flavor: "Many fall to the deep." },
  { id: 'crushing_depths', name: 'Crushing Depths', type: 'Minor', cost: 1, prerequisite: 'abyssal_maw', description: "The pressure within your vortex increases with depth, creating a deadly environment for those caught within.", flavor: "Deeper means deadlier." },
  // Sub-Path B - Massive Force
  { id: 'wave', name: 'Wave', type: 'Keystone', cost: 2, prerequisite: 'deep_currents', description: "Create a massive wave of water to ride on or crash into your enemies, demonstrating large-scale power and control.", flavor: "The ocean's raw power." },
  { id: 'tsunami_force', name: 'Tsunami Force', type: 'Minor', cost: 1, prerequisite: 'wave', description: "Your waves carry immense force, capable of destroying buildings and sweeping away entire groups of enemies.", flavor: "Force of nature." },
  { id: 'wave_riding', name: 'Wave Riding', type: 'Minor', cost: 1, prerequisite: 'wave', description: "You can ride your own waves with perfect balance, using them for transportation and tactical positioning.", flavor: "Ride the wave." },
  // Manifestation B2: Ocean's Wrath
  { id: 'oceans_wrath', name: "Ocean's Wrath", type: 'Manifestation', cost: 4, prerequisite: 'wave', description: "You can create multiple massive waves simultaneously, creating a devastating attack that can overwhelm even the strongest defenses.", flavor: "The ocean's fury unleashed." },
  { id: 'tidal_surge', name: 'Tidal Surge', type: 'Minor', cost: 1, prerequisite: 'oceans_wrath', description: "Your waves can be directed with incredible precision, allowing you to target specific areas or enemies.", flavor: "Direct the tide." },
  { id: 'abyssal_tide', name: 'Abyssal Tide', type: 'Minor', cost: 1, prerequisite: 'oceans_wrath', description: "Your waves carry the weight and pressure of the deep ocean, making them more destructive and harder to resist.", flavor: "The tide of the deep." },
  // Axiom B3: The Hungry Deep
  { id: 'hungry_deep', name: 'The Hungry Deep', type: 'Axiom', cost: 5, prerequisite: 'wave', description: "You can create a massive area of effect that simulates the crushing pressure of the ocean's depths, affecting all enemies within range.", flavor: "The deep hungers." },
  { id: 'oceanic_dominion', name: 'Oceanic Dominion', type: 'Minor', cost: 1, prerequisite: 'hungry_deep', description: "Your control over water becomes absolute within your area of effect, making it nearly impossible for others to bend water nearby.", flavor: "Dominion over water." },
  { id: 'abyssal_consumption', name: 'Abyssal Consumption', type: 'Minor', cost: 1, prerequisite: 'hungry_deep', description: "Enemies within your area of effect feel the crushing weight of the abyss, making them slower and weaker.", flavor: "The abyss consumes." },
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
        case 'Minor': return '💧'; 
        default: return '🌊'; 
    } 
}

nodeDataList.forEach(d => { 
    const prerequisites = d.prerequisite ? [d.prerequisite] : []; 
    const node: TalentNode = { 
        ...d, 
        id: d.id, 
        path: 'crushing_abyss', 
        constellation: 'water', 
        position: { x: 0, y: 0 }, 
        prerequisites, 
        visual: { color: '#89b4fa', size: 50, icon: getNodeIcon(d.type) }, 
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

export const CRUSHING_ABYSS_NODES = nodes; 
export function generateCrushingAbyssConnections(): TalentConnection[] { return connections; } 
export const CRUSHING_ABYSS_METADATA = { 
    name: 'The Crushing Abyss', 
    philosophy: "The truth lies in the deep. The weight of the world creates a pressure that can bend steel. True power is not seen; it is felt.", 
    essence: "High-pressure techniques, overwhelming force, battlefield control through massive water manipulation.", 
    focus: "High-pressure water techniques and massive force, inspired by Korra's aggressive style.", 
}; 