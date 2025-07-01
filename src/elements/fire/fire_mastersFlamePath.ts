/**
 * Path 3: The Focused Flame (Precision/Control) - "The Master's Discipline"
 *
 * Philosophy: "A focused flame forges. Firebending as a tool of precision and control."
 * Essence: Precise attacks, sustained streams, heat control.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI / 2; // CORRECTED: Downwards
const RADIUS_STEP = 320; // MATCHED: Same as Earth constellation
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Focused Flame Path', type: 'Genesis', cost: 1, description: "Your firebending is an extension of your discipline. You stress self-restraint and breath control to direct and contain the fire you manifest.", flavor: "Poor breath control means dangerously poor control of any fire generated." },
    
    // Minor nodes after Genesis
    { id: 'breath_control', name: 'Breath Control', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your breathing is perfectly controlled, allowing you to maintain steady flames and precise control.", flavor: "Breath is the foundation of all firebending." },
    { id: 'discipline_mind', name: 'Discipline Mind', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your mental discipline allows you to maintain focus even in chaotic situations, preventing your fire from becoming uncontrolled.", flavor: "The mind controls the flame." },
    { id: 'heat_sensitivity', name: 'Heat Sensitivity', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense and control the exact temperature of your flames, from gentle warmth to searing heat.", flavor: "Precision in temperature is precision in power." },
    { id: 'flame_shaping', name: 'Flame Shaping', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can shape your flames into specific forms and maintain them, creating tools and weapons of fire.", flavor: "The flame becomes an extension of your will." },
    { id: 'energy_efficiency', name: 'Energy Efficiency', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your firebending is highly efficient, requiring less energy to maintain the same level of power.", flavor: "Waste not, want not." },
    
    // Sub-Path A - Fire Blades
    { id: 'fire_blades', name: 'Fire Blades', type: 'Keystone', cost: 2, prerequisite: 'breath_control', description: "Narrow and condense your flame projections to create thin blades of fire that can slice through objects.", flavor: "Used by Zuko to free Azula from Katara's water whips." },
    { id: 'blade_precision', name: 'Blade Precision', type: 'Minor', cost: 1, prerequisite: 'fire_blades', description: "Your fire blades can be controlled with surgical precision, allowing for delicate cutting and carving.", flavor: "The blade that cuts paper without touching it." },
    { id: 'dual_blades', name: 'Dual Blades', type: 'Minor', cost: 1, prerequisite: 'fire_blades', description: "You can create and control two fire blades simultaneously, one in each hand.", flavor: "Two blades are better than one." },
    { id: 'blade_extension', name: 'Blade Extension', type: 'Minor', cost: 1, prerequisite: 'fire_blades', description: "Your fire blades can extend and retract at will, allowing for variable reach in combat.", flavor: "The blade that reaches where others cannot." },
    
    { id: 'wall_of_flames', name: 'Wall of Flames', type: 'Keystone', cost: 2, prerequisite: 'breath_control', description: "Create a barrier of concentrated flames to block incoming attacks or push aggressors back.", flavor: "Jeong Jeong used this to stop an entire fleet of Fire Navy patrol boats." },
    { id: 'wall_control', name: 'Wall Control', type: 'Minor', cost: 1, prerequisite: 'wall_of_flames', description: "You can shape and move your wall of flames, creating defensive formations or offensive barriers.", flavor: "The wall becomes a weapon." },
    { id: 'heat_barrier', name: 'Heat Barrier', type: 'Minor', cost: 1, prerequisite: 'wall_of_flames', description: "Your wall of flames creates an intense heat barrier that can deter or damage enemies who get too close.", flavor: "The heat itself becomes a weapon." },
    
    { id: 'blue_fire', name: 'Blue Fire', type: 'Axiom', cost: 5, prerequisite: 'wall_of_flames', description: "A sign of prodigious skill and perfect combustion. Your flames turn blue, burning far hotter and with greater destructive potential than normal fire.", flavor: "This technique is most famously demonstrated by Princess Azula." },
    { id: 'blue_control', name: 'Blue Control', type: 'Minor', cost: 1, prerequisite: 'blue_fire', description: "You can control the intensity of your blue fire, switching between normal and blue flames at will.", flavor: "The master controls the flame's color." },
    { id: 'blue_efficiency', name: 'Blue Efficiency', type: 'Minor', cost: 1, prerequisite: 'blue_fire', description: "Your blue fire is more energy efficient than normal fire, requiring less chi to maintain the same destructive power.", flavor: "Efficiency in destruction." },
    
    // Sub-Path B - Precision Control
    { id: 'flame_weaving', name: 'Flame Weaving', type: 'Keystone', cost: 2, prerequisite: 'flame_shaping', description: "You can weave complex patterns of fire, creating intricate designs that serve both aesthetic and practical purposes.", flavor: "Fire becomes an art form." },
    { id: 'pattern_mastery', name: 'Pattern Mastery', type: 'Minor', cost: 1, prerequisite: 'flame_weaving', description: "You can create and maintain complex fire patterns that can trap, confuse, or dazzle opponents.", flavor: "The pattern becomes the trap." },
    { id: 'flame_sculpting', name: 'Flame Sculpting', type: 'Minor', cost: 1, prerequisite: 'flame_weaving', description: "You can sculpt fire into three-dimensional objects and maintain them for extended periods.", flavor: "Fire becomes solid in your hands." },
    
    { id: 'heat_manipulation', name: 'Heat Manipulation', type: 'Manifestation', cost: 4, prerequisite: 'flame_weaving', description: "You can manipulate heat without creating visible flame, allowing for stealthy and precise temperature control.", flavor: "The invisible fire is the most dangerous." },
    { id: 'thermal_sight', name: 'Thermal Sight', type: 'Minor', cost: 1, prerequisite: 'heat_manipulation', description: "You can see heat signatures and temperature variations, allowing you to track living beings and detect hidden sources of heat.", flavor: "The master sees what others cannot." },
    { id: 'heat_absorption', name: 'Heat Absorption', type: 'Minor', cost: 1, prerequisite: 'heat_manipulation', description: "You can absorb heat from your surroundings, cooling areas and storing the energy for later use.", flavor: "Take what is given, use what is taken." },
    
    { id: 'perfect_combustion', name: 'Perfect Combustion', type: 'Axiom', cost: 5, prerequisite: 'heat_manipulation', description: "You achieve perfect control over the combustion process, allowing you to create fire with maximum efficiency and minimal waste.", flavor: "The perfect flame burns clean and true." },
    { id: 'combustion_mastery', name: 'Combustion Mastery', type: 'Minor', cost: 1, prerequisite: 'perfect_combustion', description: "You can control the exact timing and intensity of explosions, creating precise detonations when needed.", flavor: "The master controls the explosion." },
    { id: 'energy_conservation', name: 'Energy Conservation', type: 'Minor', cost: 1, prerequisite: 'perfect_combustion', description: "Your perfect combustion allows you to maintain powerful flames for extended periods without fatigue.", flavor: "Efficiency is the mark of mastery." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getFocusedFlameNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🔥';
        case 'Keystone': return '⚔️';
        case 'Axiom': return '🔵';
        case 'Manifestation': return '🎯';
        case 'Minor': return '🔥';
        default: return '🔥';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'focused_flame', constellation: 'fire', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#f9e2af', size: 50, icon: getFocusedFlameNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'fire_blades' || parentId === 'wall_of_flames' || parentId === 'flame_weaving') spread = WIDE_SPREAD_ANGLE;
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

export const FOCUSED_FLAME_NODES = nodes;
export function generateFocusedFlameConnections(): TalentConnection[] { return connections; }
export const FOCUSED_FLAME_METADATA = {
    name: 'The Focused Flame',
    philosophy: "A focused flame forges.",
    essence: "Precise attacks, sustained streams, heat control.",
    focus: "Firebending as a tool of precision and control.",
    sacredAnimal: "The Phoenix",
    emoji: '🦅',
    color: '#f9e2af',
    position: { x: 1200, y: 2300 }
};