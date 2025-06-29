/**
 * Path 3: The Focused Flame - "The Smith's Precision" (Canonically Refactored)
 * 
 * Path Philosophy: "A wildfire destroys, but a focused flame forges. Control your fire, and you can shape the world."
 * Essence: Precise attacks, sustained streams, heat control, and defensive maneuvers.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 1000;
const CENTER_Y = 480;
const BRANCHES = 1;
const PATH_MAIN_ANGLE = 0; // To the right
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Focused Flame Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your firebending is an extension of your discipline. You stress self-restraint and breath control to direct and contain the fire you manifest.", flavor: "Poor breath control means dangerously poor control of any fire generated." },
    
    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Breath Control', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your breathing is perfectly controlled, allowing you to maintain steady flames and precise control.", flavor: "Breath is the foundation of all firebending." },
    { id: 'minor_genesis_2', name: 'Disciplined Mind', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Your mental discipline allows you to focus your fire with surgical precision, never wasting energy.", flavor: "A focused mind creates a focused flame." },
    
    // --- Sub-Path A: Precision Weapons ---
    { id: 'fire_blades', name: 'Fire Blades', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Narrow and condense your flame projections to create thin blades of fire that can slice through objects without completely destroying them.", flavor: "Used by Zuko to free Azula from Katara's water whips." },
    { id: 'minor_fb_1', name: 'Fire Daggers', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'fire_blades', description: "Create solid, dagger-like constructs of fire that can be held for melee combat or thrown.", flavor: "A blade of fire is a blade of pure will." },
    { id: 'minor_fb_2', name: 'Razor Edge', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'fire_blades', description: "Your fire blades become so sharp and focused they can cut through metal and stone.", flavor: "The finest edge is the edge of flame." },
    
    { id: 'wall_of_flames', name: 'Wall of Flames', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'fire_blades', description: "One of firebending's few defensive techniques. Create a barrier of concentrated flames to block incoming attacks or push aggressors back.", flavor: "Jeong Jeong used this to stop an entire fleet of Fire Navy patrol boats." },
    { id: 'minor_wf_1', name: 'Impenetrable Barrier', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'wall_of_flames', description: "Your wall of flames becomes so dense that nothing can pass through it, not even water or earth.", flavor: "The wall stands unbroken." },
    
    { id: 'blue_fire', name: 'Blue Fire', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'wall_of_flames', description: "A sign of prodigious skill and perfect combustion. Your flames turn blue, burning far hotter and with greater destructive potential than normal fire.", flavor: "This technique is most famously demonstrated by Princess Azula." },
    { id: 'minor_bf_1', name: 'Perfect Combustion', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'blue_fire', description: "Your blue fire burns with perfect efficiency, leaving no smoke or waste, only pure destructive force.", flavor: "The perfect flame leaves no trace." },
    
    // --- Sub-Path B: Controlled Power ---
    { id: 'fire_rings', name: 'Fire Rings', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Create rings of fire that can be used for defense, offense, or as tools for manipulation.", flavor: "A ring of fire is a circle of control." },
    { id: 'minor_fr_1', name: 'Cutting Rings', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'fire_rings', description: "Your fire rings can be used to cut through obstacles or enemies with surgical precision.", flavor: "The ring cuts like a blade." },
    
    { id: 'master_forge', name: 'Master Forge', type: 'Capstone', cost: 10, branch: 1, depth: 4, prerequisite: 'blue_fire', description: "You can control fire with such precision that you can forge metal, create glass, or perform any task requiring perfect heat control.", flavor: "The master smith shapes metal with fire." },
    { id: 'minor_mf_1', name: 'Artisan\'s Touch', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'master_forge', description: "Your control is so fine that you can create intricate works of art with fire, from delicate glass sculptures to perfect metalwork.", flavor: "Fire becomes your brush, the world your canvas." },
    
    // Additional Minor Nodes
    { id: 'ff_minor_1', name: 'Controlled Burn', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can create small, controlled fires that burn exactly as long as you intend, no more, no less.", flavor: "The flame obeys the master's will." },
    { id: 'ff_minor_2', name: 'Heat Sensing', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'fire_blades', description: "You can sense heat sources around you, allowing you to detect hidden enemies or navigate in darkness.", flavor: "The flame reveals what the eye cannot see." },
    { id: 'ff_minor_3', name: 'Flame Sculpting', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'wall_of_flames', description: "You can shape your flames into complex forms, creating barriers, bridges, or even simple tools.", flavor: "The flame takes the shape of your imagination." },
    { id: 'ff_minor_4', name: 'Precision Strike', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'blue_fire', description: "Your fire attacks can be focused to hit specific targets without damaging surrounding areas.", flavor: "The surgeon's blade, not the butcher's axe." },
    { id: 'ff_minor_5', name: 'Sustained Focus', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can maintain complex firebending techniques for extended periods without losing concentration.", flavor: "The master's focus is unbreakable." },
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
        path: 'focused_flame',
        constellation: 'fire',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#f9e2af',
            size: 50,
            icon: getFocusedFlameNodeIcon(type)
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
export const FOCUSED_FLAME_NODES = nodes;
export const FOCUSED_FLAME_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateFocusedFlameConnections(): TalentConnection[] {
    return connections;
}
export const FOCUSED_FLAME_METADATA = {
    name: 'The Focused Flame',
    philosophy: "A wildfire destroys, but a focused flame forges. Control your fire, and you can shape the world.",
    essence: "Precise attacks, sustained streams, heat control, and defensive maneuvers.",
    focus: "Firebending as a tool of precision and control, not just raw power, like Jeong Jeong's disciplined style.",
    sacredAnimal: "The Phoenix",
    emoji: '🔥',
    color: '#f9e2af',
    position: { x: 1000, y: 480 }
};

function getFocusedFlameNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🔥';
        case 'Keystone': return '⚔️';
        case 'Manifestation': return '🛡️';
        case 'Axiom': return '💎';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '☠️';
        case 'Minor': return '🔥';
        default: return '🔥';
    }
}