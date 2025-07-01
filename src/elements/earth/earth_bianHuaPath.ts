/**
 * Path 2: The Molten Core (Transformation) - "The Changing Stone"
 *
 * Philosophy: "Earth is not static. It is metal waiting to be freed, crystal waiting to be revealed, lava waiting to flow."
 * Essence: The canon sub-bending arts: Metalbending and Lavabending, transformation and adaptation.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = 0; // Rightwards
const RADIUS_STEP = 320;              // Large fixed spacing for all nodes
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;     // 60 degrees
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;      // 150 degrees for metalbending's children

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Molten Core Path', type: 'Genesis', cost: 1, description: "You understand that earth is not uniform, but a spectrum of materials. You can manipulate coal and crystals with greater ease.", flavor: "To master earth is to master its many forms." },
    
    // Minor nodes after Genesis
    { id: 'material_sense', name: 'Material Sense', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can identify the type of rock or mineral you are touching by its feel.", flavor: "The earth reveals its secrets to those who listen." },
    { id: 'thermal_sensitivity', name: 'Thermal Sensitivity', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense residual heat in stone, telling you if it has been recently heated.", flavor: "The earth remembers the fire's touch." },
    { id: 'elemental_resonance', name: 'Elemental Resonance', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can feel the subtle differences between various earth materials, aiding your sub-bending abilities.", flavor: "Each element sings its own song." },
    { id: 'heat_retention', name: 'Heat Retention', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your earthbending can maintain heat longer, making it easier to work with molten materials.", flavor: "The earth holds the fire's memory." },
    { id: 'crystal_awareness', name: 'Crystal Awareness', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense and manipulate crystalline structures within stone more effectively.", flavor: "The crystal's song is clear and pure." },
    
    // Sub-Path A - The Iron Soul (Metalbending)
    { id: 'metalbending', name: 'Metalbending', type: 'Keystone', cost: 2, prerequisite: 'material_sense', description: "By locating the small fragments of earth within processed metal, you can 'bend' the metal portion.", flavor: "A sub-skill developed by Toph Beifong." },
    { id: 'fluid_motion', name: 'Fluid Motion', type: 'Minor', cost: 1, prerequisite: 'metalbending', description: "You can bend metal with greater fluidity, making it flow like thick liquid rather than just bending stiffly.", flavor: "The metal flows like water." },
    { id: 'armor_weaving', name: 'Armor Weaving', type: 'Minor', cost: 1, prerequisite: 'metalbending', description: "You can expertly shape metal sheets into flexible, form-fitting armor around your body.", flavor: "The metal becomes your second skin." },
    { id: 'cable_proficiency', name: 'Cable Proficiency', type: 'Minor', cost: 1, prerequisite: 'metalbending', description: "You specialize in bending thin metal cables, using them as whips or grappling hooks with incredible precision.", flavor: "A technique perfected by Kuvira." },
    
    { id: 'liquid_metal_control', name: 'Liquid Metal Control', type: 'Manifestation', cost: 4, prerequisite: 'metalbending', description: "Bend metal with such precision that it behaves like liquid mercury, forming shifting weapons or reforming shields.", flavor: "Metal is not rigid. It is a river, waiting to flow." },
    { id: 'shrapnel_shot', name: 'Shrapnel Shot', type: 'Minor', cost: 1, prerequisite: 'liquid_metal_control', description: "You can launch a volley of razor-sharp metal shards at your opponents.", flavor: "The metal's edge is deadly." },
    { id: 'metal_flow', name: 'Metal Flow', type: 'Minor', cost: 1, prerequisite: 'liquid_metal_control', description: "You can make metal flow and reshape itself continuously, creating living weapons and armor.", flavor: "The metal lives and breathes." },
    
    { id: 'platinum_bending', name: 'Platinum Bending', type: 'Axiom', cost: 5, prerequisite: 'liquid_metal_control', description: "Your skill is so refined you can now bend even highly purified metals like platinum, though it requires immense effort.", flavor: "The city is just another mountain to be shaped." },
    { id: 'resonance_break', name: 'Resonance Break', type: 'Minor', cost: 1, prerequisite: 'platinum_bending', description: "You can vibrate a piece of metal at its resonant frequency, causing it to shatter.", flavor: "The metal sings its own destruction." },
    { id: 'metallic_symphony', name: 'Metallic Symphony', type: 'Minor', cost: 1, prerequisite: 'platinum_bending', description: "You can manipulate multiple types of metal simultaneously, creating complex alloys and structures.", flavor: "The metals harmonize at your command." },
    
    // Sub-Path B - The Molten Heart (Lavabending)
    { id: 'phase_change', name: 'Phase Change', type: 'Keystone', cost: 2, prerequisite: 'thermal_sensitivity', description: "Through intense focus and friction, you can turn solid rock into searing hot, pliable lava.", flavor: "The stone's heart becomes fire." },
    { id: 'lava_whip', name: 'Lava Whip', type: 'Minor', cost: 1, prerequisite: 'phase_change', description: "You can create long, flowing tendrils of lava to use as a ranged weapon.", flavor: "The fire flows like water." },
    { id: 'sustained_heat', name: 'Sustained Heat', type: 'Minor', cost: 1, prerequisite: 'phase_change', description: "Your lava stays molten for a significantly longer time before cooling back into rock.", flavor: "The core's fire is unquenchable." },
    { id: 'obsidian_forge', name: 'Obsidian Forge', type: 'Minor', cost: 1, prerequisite: 'phase_change', description: "You can rapidly cool your lava into sharp, brittle volcanic glass, creating blades or caltrops.", flavor: "Pressure and heat create the sharpest edge." },
    
    { id: 'lava_wave', name: 'Lava Wave', type: 'Manifestation', cost: 4, prerequisite: 'phase_change', description: "You can create and guide large waves or moats of lava, reshaping the battlefield into a deadly, impassable terrain.", flavor: "The earth's blood flows at your command." },
    { id: 'riding_the_wave', name: 'Riding the Wave', type: 'Minor', cost: 1, prerequisite: 'lava_wave', description: "You can ride atop a floating rock disc on the surface of your lava waves, granting you terrifying mobility.", flavor: "The fire carries you like the wind." },
    { id: 'molten_architecture', name: 'Molten Architecture', type: 'Minor', cost: 1, prerequisite: 'lava_wave', description: "You can shape lava into temporary structures and barriers that cool into solid rock.", flavor: "The architect of fire and stone." },
    
    { id: 'the_eruption', name: 'The Eruption', type: 'Axiom', cost: 5, prerequisite: 'lava_wave', description: "You can summon magma from deep within the earth or create a miniature, localized volcano that spews lava and rock.", flavor: "The earth's fury unleashed." },
    { id: 'pyroclastic_cloud', name: 'Pyroclastic Cloud', type: 'Minor', cost: 1, prerequisite: 'the_eruption', description: "Your eruption can be modified to release a cloud of superheated gas and ash, blinding and choking enemies.", flavor: "The earth's breath is deadly." },
    { id: 'volcanic_heart', name: 'Volcanic Heart', type: 'Minor', cost: 1, prerequisite: 'the_eruption', description: "You can maintain a constant connection to the earth's molten core, drawing on its power for your lavabending.", flavor: "The volcano's heart beats within you." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getMoltenCoreNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🔥';
        case 'Keystone': return '🔗';
        case 'Axiom': return '⚡';
        case 'Manifestation': return '🌋';
        case 'Minor': return '💎';
        default: return '💎';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'bian_hua', constellation: 'earth', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#CD853F', size: 50, icon: getMoltenCoreNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'metalbending' || parentId === 'phase_change') spread = WIDE_SPREAD_ANGLE;
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

export const MOLTEN_CORE_NODES = nodes;
export function generateMoltenCoreConnections(): TalentConnection[] { return connections; }
export const MOLTEN_CORE_METADATA = {
    name: 'The Molten Core',
    philosophy: "Earth is not static. It is metal waiting to be freed, crystal waiting to be revealed, lava waiting to flow.",
    essence: "The canon sub-bending arts: Metalbending and Lavabending, transformation and adaptation.",
    focus: "Transformation and sub-bending arts, inspired by Toph's metalbending and the rare lavabenders.",
    sacredAnimal: "The Badgermole",
    emoji: '🌋',
    color: '#CD853F',
    position: { x: 1200, y: 420 }
};