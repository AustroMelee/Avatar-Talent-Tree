/**
 * Path 1: The Raging Inferno - "The Dragon's Fury" (Canonically Refactored)
 *
 * Path Philosophy: "Fire is the element of power. It is fueled by rage, hatred, and anger."
 * Essence: Uncontrolled aggression, explosive force, overwhelming AoE attacks, and jet propulsion.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 900;
const CENTER_Y = 400;
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
    { id: 'genesis', name: 'The Raging Inferno Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You learn the modern, militaristic style of firebending. Your chi is a source for your bending, allowing you to generate fire without an external source.", flavor: "Fire is the element of power." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Rage Focus', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your anger and hatred fuel your fire, making your flames burn hotter and more destructively.", flavor: "The Fire Nation's military training emphasizes emotional control through rage." },
    { id: 'minor_genesis_2', name: 'Aggressive Stance', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your fighting stance is always forward-leaning and aggressive, ready to strike at any moment.", flavor: "Never retreat, always advance." },
    
    // --- Sub-Path A: Explosive Force ---
    { id: 'fire_streams', name: 'Fire Streams', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Shoot continuous streams of fire from your fingertips, fists, or palms. Can be widened to create a flamethrower-like effect.", flavor: "A basic but brutally effective technique." },
    { id: 'minor_fs_1', name: 'Wide Blast', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'fire_streams', description: "Your fire streams can be spread wide to hit multiple targets or create area denial.", flavor: "Cover the battlefield in flame." },
    
    { id: 'fire_bomb', name: 'Fire Bomb', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'fire_streams', description: "Create a flame at the end of a limb and thrust it down in an explosive burst. Can also be charged to create enormous blasts of fire.", flavor: "A short-range, highly concussive attack." },
    { id: 'minor_fb_1', name: 'Charged Explosion', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'fire_bomb', description: "You can charge your Fire Bomb for longer to create even more devastating explosions.", flavor: "The longer you wait, the bigger the boom." },
    
    { id: 'jet_propulsion', name: 'Jet Propulsion', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'fire_bomb', description: "Conjure huge flames from your hands and feet to propel yourself at high speeds on the ground or through the air for sustained flight.", flavor: "First demonstrated by Azula, and later mastered by Ozai." },
    { id: 'minor_jp_1', name: 'Aerial Combat', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'jet_propulsion', description: "You can fight effectively while using jet propulsion, maintaining control and accuracy in flight.", flavor: "The sky is no longer a limit." },
    
    // --- Sub-Path B: Volatile Power ---
    { id: 'combustionbending', name: 'Combustionbending', type: 'Schism', cost: 8, branch: 1, depth: 2, prerequisite: 'genesis', description: "A rare and volatile ability. Concentrate energy through a tattooed third eye to project a ray of heat that detonates with great destructive force.", flavor: "The sole known weakness is an uninterrupted flow of chi." },
    { id: 'minor_cb_1', name: 'Curved Trajectory', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'combustionbending', description: "You learn to bend the beam's path, allowing you to strike targets behind cover.", flavor: "As demonstrated by P'Li." },
    { id: 'minor_cb_2', name: 'Rapid Fire', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'combustionbending', description: "You can fire multiple combustion blasts in quick succession, overwhelming your opponents.", flavor: "Speed and power combined." },
    
    { id: 'volcanic_rage', name: 'Volcanic Rage', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'jet_propulsion', description: "Your rage reaches its peak. You can create massive eruptions of fire from the ground, turning the battlefield into a volcanic hellscape.", flavor: "The earth itself burns with your fury." },
    { id: 'minor_vr_1', name: 'Lava Surge', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'volcanic_rage', description: "Your volcanic eruptions can create streams of molten rock that flow toward your enemies.", flavor: "The ground itself becomes your weapon." },
    
    // Additional Minor Nodes
    { id: 'ri_minor_1', name: 'Fan the Flames', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can control the size and intensity of any nearby flames, drawing them to you.", flavor: "Fire's nature is to spread." },
    { id: 'ri_minor_2', name: 'Lingering Embers', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'fire_streams', description: "The area of your explosions remains covered in burning embers, creating hazardous ground.", flavor: "The fire's memory is long and hot." },
    { id: 'ri_minor_3', name: 'Concussive Force', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'fire_bomb', description: "The explosion's primary damage comes from a massive concussive shockwave, capable of shattering earth defenses.", flavor: "The explosion shakes the earth." },
    { id: 'ri_minor_4', name: 'Afterburner', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'jet_propulsion', description: "You can unleash a powerful burst of speed for a short duration, leaving a trail of fire in your wake.", flavor: "Leave fire in your wake." },
    { id: 'ri_minor_5', name: 'Volatile Mind', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'combustionbending', description: "Intense emotions make your combustion beams slightly more powerful, but also harder to control.", flavor: "A dangerous pact." },
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
        path: 'raging_inferno',
        constellation: 'fire',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#f38ba8',
            size: 50,
            icon: getRagingInfernoNodeIcon(type)
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
export const RAGING_INFERNO_NODES = nodes;
export const RAGING_INFERNO_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateRagingInfernoConnections(): TalentConnection[] {
    return connections;
}
export const RAGING_INFERNO_METADATA = {
    name: 'The Raging Inferno',
    philosophy: "Fire is the element of power. It is fueled by rage, hatred, and anger.",
    essence: "Uncontrolled aggression, explosive force, overwhelming AoE attacks, and jet propulsion.",
    focus: "Modern militaristic firebending, inspired by Ozai and the Fire Nation's aggressive style.",
    sacredAnimal: "The Dragon",
    emoji: '🐉',
    color: '#f38ba8',
    position: { x: 900, y: 400 }
};

function getRagingInfernoNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🔥';
        case 'Keystone': return '💥';
        case 'Manifestation': return '☄️';
        case 'Axiom': return '☢️';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '☠️';
        case 'Minor': return '🔥';
        default: return '🔥';
    }
}