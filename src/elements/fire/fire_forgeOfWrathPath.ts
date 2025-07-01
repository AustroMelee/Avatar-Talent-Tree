/**
 * Path 1: The Raging Inferno (Destruction/Aggression) - "The Fire of Wrath"
 *
 * Philosophy: "Fire is power. The Fire Nation's military training emphasizes emotional control through rage."
 * Essence: Uncontrolled aggression, explosive force, and jet propulsion.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = -Math.PI / 2; // CORRECTED: Upwards
const RADIUS_STEP = 320; // MATCHED: Same as Earth constellation
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Raging Inferno Path', type: 'Genesis', cost: 1, description: "You learn the modern, militaristic style of firebending, fueled by rage and aggression.", flavor: "Fire is the element of power." },
    
    // Minor nodes after Genesis
    { id: 'rage_focus', name: 'Rage Focus', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your anger and hatred fuel your fire, making your flames burn hotter and more destructively.", flavor: "The Fire Nation's military training emphasizes emotional control through rage." },
    { id: 'aggressive_stance', name: 'Aggressive Stance', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your fighting stance becomes more forward-leaning and aggressive, allowing for powerful offensive strikes.", flavor: "The best defense is overwhelming offense." },
    { id: 'fire_breathing', name: 'Fire Breathing', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can exhale small bursts of flame, useful for close combat or creating smoke screens.", flavor: "Every breath becomes a weapon." },
    { id: 'combat_fury', name: 'Combat Fury', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your attacks become more powerful when you are angry or in combat, feeding off your emotional intensity.", flavor: "Rage is the fuel that powers the inferno." },
    { id: 'destructive_impulse', name: 'Destructive Impulse', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You have an instinctive understanding of how to maximize the destructive potential of your fire attacks.", flavor: "Destruction is an art form." },
    
    // Sub-Path A - Fire Streams
    { id: 'fire_streams', name: 'Fire Streams', type: 'Keystone', cost: 2, prerequisite: 'rage_focus', description: "Shoot continuous streams of fire from your fingertips, fists, or palms. Can be widened to create a flamethrower-like effect.", flavor: "A basic but brutally effective technique." },
    { id: 'stream_control', name: 'Stream Control', type: 'Minor', cost: 1, prerequisite: 'fire_streams', description: "You can control the width and intensity of your fire streams, from thin cutting beams to wide area attacks.", flavor: "Precision in destruction." },
    { id: 'rapid_bursts', name: 'Rapid Bursts', type: 'Minor', cost: 1, prerequisite: 'fire_streams', description: "You can fire multiple quick bursts instead of sustained streams, allowing for rapid-fire attacks.", flavor: "Speed is as deadly as power." },
    { id: 'heat_intensification', name: 'Heat Intensification', type: 'Minor', cost: 1, prerequisite: 'fire_streams', description: "Your fire streams burn hotter, making them more effective against armored opponents.", flavor: "Heat that melts steel." },
    
    { id: 'fire_bomb', name: 'Fire Bomb', type: 'Manifestation', cost: 4, prerequisite: 'fire_streams', description: "Create a flame at the end of a limb and thrust it down in an explosive burst. Can also be charged to create enormous blasts of fire.", flavor: "A short-range, highly concussive attack." },
    { id: 'explosive_charge', name: 'Explosive Charge', type: 'Minor', cost: 1, prerequisite: 'fire_bomb', description: "You can charge your fire bombs for longer periods, creating more powerful explosions.", flavor: "The longer the fuse, the bigger the boom." },
    { id: 'concussive_force', name: 'Concussive Force', type: 'Minor', cost: 1, prerequisite: 'fire_bomb', description: "Your fire bombs create powerful shockwaves that can knock opponents back or destroy structures.", flavor: "The force of the explosion is as deadly as the flame." },
    
    { id: 'jet_propulsion', name: 'Jet Propulsion', type: 'Axiom', cost: 5, prerequisite: 'fire_bomb', description: "Conjure huge flames from your hands and feet to propel yourself at high speeds or through the air for sustained flight.", flavor: "First demonstrated by Azula, and later mastered by Ozai." },
    { id: 'aerial_maneuvering', name: 'Aerial Maneuvering', type: 'Minor', cost: 1, prerequisite: 'jet_propulsion', description: "You can perform complex aerial maneuvers while using jet propulsion, including sharp turns and hovering.", flavor: "The sky becomes your battlefield." },
    { id: 'supersonic_dash', name: 'Supersonic Dash', type: 'Minor', cost: 1, prerequisite: 'jet_propulsion', description: "You can create brief, incredibly fast bursts of speed that leave trails of fire in your wake.", flavor: "Speed that burns the air itself." },
    
    // Sub-Path B - Combustionbending
    { id: 'combustionbending', name: 'Combustionbending', type: 'Schism', cost: 5, prerequisite: 'rage_focus', description: "A rare and volatile ability. Concentrate energy through a tattooed third eye to project a ray of heat that detonates with great destructive force.", flavor: "The sole known weakness is an uninterrupted flow of chi." },
    { id: 'precision_targeting', name: 'Precision Targeting', type: 'Minor', cost: 1, prerequisite: 'combustionbending', description: "Your combustion beams can be aimed with incredible precision, allowing you to hit small targets at great distances.", flavor: "The eye sees, the beam strikes." },
    { id: 'explosive_radius', name: 'Explosive Radius', type: 'Minor', cost: 1, prerequisite: 'combustionbending', description: "Your combustion explosions have a larger radius, affecting multiple targets in an area.", flavor: "The bigger the explosion, the more enemies fall." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getRagingInfernoNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🔥';
        case 'Keystone': return '⚡';
        case 'Axiom': return '🚀';
        case 'Manifestation': return '💥';
        case 'Schism': return '💥';
        case 'Minor': return '🔥';
        default: return '🔥';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'raging_inferno', constellation: 'fire', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#f38ba8', size: 50, icon: getRagingInfernoNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'fire_streams' || parentId === 'combustionbending') spread = WIDE_SPREAD_ANGLE;
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

export const RAGING_INFERNO_NODES = nodes;
export function generateRagingInfernoConnections(): TalentConnection[] { return connections; }
export const RAGING_INFERNO_METADATA = {
    name: 'The Raging Inferno',
    philosophy: "Fire is power.",
    essence: "Uncontrolled aggression, explosive force, and jet propulsion.",
    focus: "Modern militaristic firebending.",
    sacredAnimal: "The Dragon",
    emoji: '🐉',
    color: '#f38ba8',
    position: { x: 1200, y: 100 }
};