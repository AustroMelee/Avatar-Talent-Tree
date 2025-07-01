/**
 * Path 4: The Cold Tempest (Lightning/Detachment) - "The Storm's Wrath"
 *
 * Philosophy: "Only a mind at peace can command the storm."
 * Essence: The generation and mastery of lightning.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 0;
const CENTER_Y = 0;
const PATH_MAIN_ANGLE = Math.PI; // CORRECTED: Leftwards
const RADIUS_STEP = 320; // MATCHED: Same as Earth constellation
const DEFAULT_SPREAD_ANGLE = Math.PI / 3;
const WIDE_SPREAD_ANGLE = Math.PI / 1.2;

// --- Node Definitions ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Cold Tempest Path', type: 'Genesis', cost: 1, description: "You learn the first step of lightning generation: separating your internal yin and yang energies. This requires peace of mind and a complete absence of emotion.", flavor: "Lightning is also known as 'the cold-blooded fire'." },
    
    // Minor nodes after Genesis
    { id: 'inner_peace', name: 'Inner Peace', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You are more resistant to emotional turmoil. If a firebender with inner conflict attempts to generate lightning, it will only result in a small explosion.", flavor: "Zuko was unable to generate lightning because of his inner conflict." },
    { id: 'energy_separation', name: 'Energy Separation', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can separate your internal yin and yang energies, creating the necessary imbalance for lightning generation.", flavor: "The storm requires perfect balance in imbalance." },
    { id: 'cold_focus', name: 'Cold Focus', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your mind becomes as cold and clear as ice, allowing you to maintain perfect concentration even in the heat of battle.", flavor: "The coldest mind commands the hottest fire." },
    { id: 'static_sense', name: 'Static Sense', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sense electrical charges and static electricity in your environment, aiding in lightning generation.", flavor: "The storm speaks to those who listen." },
    { id: 'storm_attunement', name: 'Storm Attunement', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You feel a natural connection to storms and electrical phenomena, making lightning generation easier during thunderstorms.", flavor: "The storm recognizes its master." },
    
    // Sub-Path A - Lightning Generation
    { id: 'lightning_generation', name: 'Lightning Generation', type: 'Keystone', cost: 2, prerequisite: 'inner_peace', description: "You can generate and direct a bolt of raw electricity. It is incredibly fast and powerful, but leaves you drained.", flavor: "Considered the purest form of firebending." },
    { id: 'lightning_control', name: 'Lightning Control', type: 'Minor', cost: 1, prerequisite: 'lightning_generation', description: "You can control the intensity and direction of your lightning bolts with greater precision.", flavor: "The master controls the storm." },
    { id: 'rapid_lightning', name: 'Rapid Lightning', type: 'Minor', cost: 1, prerequisite: 'lightning_generation', description: "You can generate lightning bolts more quickly, reducing the time needed to charge and release.", flavor: "Speed is the lightning's greatest weapon." },
    { id: 'lightning_aim', name: 'Lightning Aim', type: 'Minor', cost: 1, prerequisite: 'lightning_generation', description: "Your lightning bolts can be aimed with incredible accuracy, hitting small targets at great distances.", flavor: "The lightning strikes where the master wills." },
    
    { id: 'lightning_chain', name: 'Lightning Chain', type: 'Manifestation', cost: 4, prerequisite: 'lightning_generation', description: "Your lightning can arc between multiple targets, creating devastating chain attacks that can hit entire groups.", flavor: "Lightning seeks the path of least resistance." },
    { id: 'chain_control', name: 'Chain Control', type: 'Minor', cost: 1, prerequisite: 'lightning_chain', description: "You can control the path of your lightning chains, directing them to specific targets in sequence.", flavor: "The chain follows the master's will." },
    { id: 'chain_range', name: 'Chain Range', type: 'Minor', cost: 1, prerequisite: 'lightning_chain', description: "Your lightning chains can arc over greater distances, affecting more targets in a single attack.", flavor: "The storm's reach is vast." },
    
    { id: 'storm_mastery', name: 'Storm Mastery', type: 'Axiom', cost: 5, prerequisite: 'lightning_chain', description: "You achieve complete mastery over lightning, able to generate massive bolts that can devastate entire areas.", flavor: "You become the storm itself." },
    { id: 'storm_creation', name: 'Storm Creation', type: 'Minor', cost: 1, prerequisite: 'storm_mastery', description: "You can create localized electrical storms, generating multiple lightning bolts simultaneously.", flavor: "The master creates the storm." },
    { id: 'storm_control', name: 'Storm Control', type: 'Minor', cost: 1, prerequisite: 'storm_mastery', description: "You can control existing storms, directing their lightning and electrical energy as you see fit.", flavor: "The storm obeys the master." },
    
    // Sub-Path B - Lightning Redirection
    { id: 'lightning_redirection', name: 'Lightning Redirection', type: 'Axiom', cost: 5, prerequisite: 'inner_peace', description: "After observing waterbending, Iroh developed this technique to safely redirect lightning. Absorb the bolt through one arm, guide it through the stomach, and out the other.", flavor: "A critical technique taught to Zuko and Aang." },
    { id: 'redirection_control', name: 'Redirection Control', type: 'Minor', cost: 1, prerequisite: 'lightning_redirection', description: "You can redirect lightning with greater precision, sending it exactly where you want it to go.", flavor: "The master controls the redirected storm." },
    { id: 'redirection_speed', name: 'Redirection Speed', type: 'Minor', cost: 1, prerequisite: 'lightning_redirection', description: "You can redirect lightning more quickly, reducing the time needed to absorb and redirect a bolt.", flavor: "Speed saves lives." },
    
    { id: 'lightning_absorption', name: 'Lightning Absorption', type: 'Manifestation', cost: 4, prerequisite: 'lightning_redirection', description: "You can absorb lightning into your body and store its energy for later use, rather than immediately redirecting it.", flavor: "The master stores the storm's power." },
    { id: 'energy_storage', name: 'Energy Storage', type: 'Minor', cost: 1, prerequisite: 'lightning_absorption', description: "You can store more electrical energy in your body, allowing you to absorb multiple lightning bolts.", flavor: "The body becomes a battery." },
    { id: 'energy_release', name: 'Energy Release', type: 'Minor', cost: 1, prerequisite: 'lightning_absorption', description: "You can release stored electrical energy in controlled bursts, using it to power other abilities or attacks.", flavor: "The stored storm is unleashed." },
    
    { id: 'lightning_mastery', name: 'Lightning Mastery', type: 'Axiom', cost: 5, prerequisite: 'lightning_absorption', description: "You achieve complete mastery over all aspects of lightning, able to generate, redirect, and absorb it with perfect control.", flavor: "You become one with the storm." },
    { id: 'storm_avatar', name: 'Storm Avatar', type: 'Minor', cost: 1, prerequisite: 'lightning_mastery', description: "You can channel the power of storms directly, becoming a living embodiment of electrical energy.", flavor: "The storm and the master become one." },
    { id: 'eternal_storm', name: 'Eternal Storm', type: 'Minor', cost: 1, prerequisite: 'lightning_mastery', description: "Your connection to lightning becomes permanent, allowing you to generate electrical energy without external sources.", flavor: "The storm lives within." },
];

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getColdTempestNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '⚡';
        case 'Keystone': return '🌩️';
        case 'Axiom': return '⚡';
        case 'Manifestation': return '🔗';
        case 'Minor': return '⚡';
        default: return '⚡';
    }
}

nodeDataList.forEach(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const node: TalentNode = {
        ...d, id: d.id, path: 'cold_tempest', constellation: 'fire', position: { x: 0, y: 0 }, prerequisites,
        visual: { color: '#89b4fa', size: 50, icon: getColdTempestNodeIcon(d.type) }, effects: [], isVisible: true, isAllocatable: !prerequisites.length,
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
    if (parentId === 'lightning_generation' || parentId === 'lightning_redirection') spread = WIDE_SPREAD_ANGLE;
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

export const COLD_TEMPEST_NODES = nodes;
export function generateColdTempestConnections(): TalentConnection[] { return connections; }
export const COLD_TEMPEST_METADATA = {
    name: 'The Cold Tempest',
    philosophy: "Only a mind at peace can command the storm.",
    essence: "The generation and mastery of lightning.",
    focus: "A rare sub-skill requiring a complete absence of emotion.",
    sacredAnimal: "The Storm",
    emoji: '⛈️',
    color: '#89b4fa',
    position: { x: 100, y: 1200 }
};