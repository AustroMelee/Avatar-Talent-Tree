/**
 * Path 1: The Way of the Silent Blade - "Precision Incarnate"
 * Philosophy: "A single strike, perfectly placed, ends all conflict. True warriors need no second chance."
 * Essence: Lethal precision, silent movement, the art of ending fights before they begin.
 * Focus: Assassination Arts, Thrown Weapons, Critical Strikes.
 * Sacred Animal: The Shadow - unseen, deadly, inevitable.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800;
const CENTER_Y = 400;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Silent Blade Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your strikes target vital points instinctively, dealing increased damage to unarmored foes and bypassing light armor.", flavor: "A single strike, perfectly placed, ends all conflict." },

    // SUB-PATH A: The Assassin's Art Branch
    { id: 'A1', name: 'Silent Steps', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Move without making any sound, becoming effectively invisible while motionless.", flavor: "The deadliest sound is silence." },
    { id: 'minor_a1_1', name: 'Shadow Meld', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Blend perfectly with shadows and darkness." },
    { id: 'minor_a1_2', name: 'Scent Masking', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Eliminate your scent and other traces." },
    { id: 'minor_a1_3', name: 'Breath Control', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Hold your breath for extended periods and control your heartbeat." },
    
    { id: 'A2', name: 'Death Strike', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Target vital organs and pressure points for massive damage or instant kills.", flavor: "Efficiency is the soul of lethality." },
    { id: 'minor_a2_1', name: 'Poison Knowledge', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Expertly apply and resist various toxins." },
    { id: 'minor_a2_2', name: 'Anatomical Mastery', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Know exactly where to strike any creature for maximum effect." },
    { id: 'minor_a2_3', name: 'Silent Kill', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Kill without your target making any sound." },
    
    { id: 'A3', name: 'Master Assassin', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Become capable of infiltrating any location and eliminating any target.", flavor: "No lock, no guard, no wall can stop a true shadow." },
    { id: 'minor_a3_1', name: 'Social Invisibility', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Blend into crowds and social situations perfectly." },
    { id: 'minor_a3_2', name: 'Legendary Stealth', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Remain hidden even from supernatural senses." },
    { id: 'minor_a3_3', name: 'Perfect Timing', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Strike at the exact moment when success is guaranteed." },
    
    { id: 'APEX_A', name: 'The Final Shadow', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Become a legend of fear, able to kill with your presence alone and move through reality unseen.", flavor: "I am the fear in the dark." },
    
    // SUB-PATH B: The Thrown Weapons Branch
    { id: 'B1', name: 'Perfect Aim', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Never miss with thrown weapons, able to ricochet shots around obstacles.", flavor: "The path of the blade is decided before it is thrown." },
    { id: 'minor_b1_1', name: 'Boomerang Mastery', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Thrown weapons return to your hand automatically." },
    { id: 'minor_b1_2', name: 'Multi-target', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Hit multiple enemies with a single thrown weapon." },
    { id: 'minor_b1_3', name: 'Penetrating Throw', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Thrown weapons punch through armor and shields." },
    
    { id: 'B2', name: 'Weapon Return', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Thrown weapons teleport back to your hand after striking.", flavor: "The blade is always where I need it to be." },
    { id: 'minor_b2_1', name: 'Guided Flight', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Control the path of thrown weapons in mid-air." },
    { id: 'minor_b2_2', name: 'Explosive Impact', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Thrown weapons create small explosions on impact." },
    { id: 'minor_b2_3', name: 'Chain Throws', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Weapons bounce between multiple targets." },
    
    { id: 'B3', name: 'Storm of Blades', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Fill the air with dozens of thrown weapons that seek out enemies.", flavor: "Let them drown in a sea of steel." },
    { id: 'minor_b3_1', name: 'Blade Tornado', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Create whirling barriers of thrown weapons around yourself." },
    { id: 'minor_b3_2', name: 'Seeking Weapons', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Thrown weapons actively hunt down targets." },
    { id: 'minor_b3_3', name: 'Infinite Arsenal', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Never run out of throwing weapons." },
    
    { id: 'APEX_B', name: 'Master of Distance', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Your thrown weapons ignore distance, able to strike anywhere you can see or imagine.", flavor: "Distance is a concept for those who walk." },

    // SUB-PATH C: The Critical Arts Branch
    { id: 'C1', name: 'Vital Strike', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "All your attacks have a chance to cause devastating critical damage.", flavor: "Not harder, smarter." },
    { id: 'minor_c1_1', name: 'Weak Point Vision', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "See the structural weaknesses in any object or opponent." },
    { id: 'minor_c1_2', name: 'Armor Piercing', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Your attacks ignore armor and defensive abilities." },
    { id: 'minor_c1_3', name: 'Crippling Blows', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Strikes that disable limbs or senses without permanent damage." },
    
    { id: 'C2', name: 'Pressure Point Mastery', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Disable opponents with precise strikes to nerve clusters.", flavor: "A giant can be felled by a single, well-placed needle." },
    { id: 'minor_c2_1', name: 'Paralysis Touch', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Temporarily paralyze opponents with a touch." },
    { id: 'minor_c2_2', name: 'Pain Control', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Cause excruciating pain or complete numbness." },
    { id: 'minor_c2_3', name: 'Chi Disruption', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Disrupt bending abilities temporarily." },
    
    { id: 'C3', name: 'One Touch Death', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Kill any living being with a single precise touch.", flavor: "The line between life and death is thinner than a razor's edge." },
    { id: 'minor_c3_1', name: 'Delayed Death', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Set death to occur at a specific time." },
    { id: 'minor_c3_2', name: 'Selective Lethality', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Choose exactly what dies - organs, limbs, or whole body." },
    { id: 'minor_c3_3', name: 'Merciful Death', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Grant painless death to suffering beings." },
    
    { id: 'APEX_C', name: 'Touch of Ending', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your touch can end anything - life, abilities, concepts, or even natural laws.", flavor: "All things have an end. I am simply the one who delivers it." },

    // SACRED TRIALS
    { id: 'rite_silence', name: 'Trial of Silence', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Infiltrate an enemy stronghold and eliminate the target without anyone knowing you were there." },
    { id: 'rite_precision', name: 'Trial of Precision', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Kill a target with a thrown weapon from impossible distance through multiple obstacles." },
    { id: 'rite_mercy', name: 'Trial of Mercy', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Use your lethal skills to save a life instead of taking one." },
    
    // AVATAR STATES (CAPSTONES)
    { id: 'cap_killer', name: 'The Perfect Killer', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_silence', description: "Become death incarnate, able to kill anything that exists with perfect efficiency.", exclusiveWith: ['cap_shadow', 'cap_reality_blade'] },
    { id: 'cap_shadow', name: 'The Shadow Between Worlds', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_precision', description: "Exist partially outside reality, moving unseen through the spaces between moments.", exclusiveWith: ['cap_killer', 'cap_reality_blade'] },
    { id: 'cap_reality_blade', name: 'The Blade That Cuts Reality', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_mercy', description: "Your weapons can cut through anything - armor, shields, space, time, or concepts.", exclusiveWith: ['cap_killer', 'cap_shadow'] },

    // CORRUPTION (SCHISMS)
    { id: 'schism_efficiency', name: 'Emotionless Efficiency', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: 'APEX_B', description: "Become perfectly efficient at killing, but lose the ability to feel emotion or form connections.", exclusiveWith: ['rite_silence', 'rite_precision', 'rite_mercy'] },
    { id: 'schism_weapon', name: 'The Living Weapon', type: 'Schism', cost: 12, branch: 1.5, depth: 6.5, prerequisite: 'schism_efficiency', description: "Transform into a perfect instrument of death, gaining incredible power but losing your humanity." }
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'silent_blade', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#B0C4DE', size: 50, icon: 'default' }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost, exclusiveWith: (nodeData as any).exclusiveWith || []
  };
  
  nodes.push(node);
  nodeMap[id] = node;
  prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: id, isActive: false, isLocked: false });
  });
});

// --- Force-Directed Repulsion ---
for (let iter = 0; iter < 100; iter++) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === 'Genesis') continue;
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]; const b = nodes[j];
            const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MIN_DIST && dist > 0) {
                const moveFactor = (MIN_DIST - dist) / dist * 0.5;
                const moveX = dx * moveFactor; const moveY = dy * moveFactor;
                a.position.x += moveX; a.position.y += moveY;
                if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; }
            }
        }
    }
}

// --- Exports ---
export const SILENT_BLADE_NODES = nodes;
export function generateSilentBladeConnections(): TalentConnection[] { return connections; }
export const SILENT_BLADE_METADATA = {
  name: 'The Way of the Silent Blade',
  philosophy: "A single strike, perfectly placed, ends all conflict.",
  essence: 'Lethal precision, silent movement, the art of ending fights before they begin.',
  focus: 'Assassination Arts, Thrown Weapons, Critical Strikes.',
  sacredAnimal: 'The Shadow',
  emoji: '🗡️',
  color: '#B0C4DE',
  position: { x: 800, y: 400 }
}; 