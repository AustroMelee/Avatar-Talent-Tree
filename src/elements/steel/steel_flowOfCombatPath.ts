/**
 * Path 3: The Flow of Combat - "Adaptation Made Art"
 * Philosophy: "Like water, true skill has no fixed form. Read your opponent, become what they cannot counter, and victory follows."
 * Essence: Adaptability, counter-fighting, chi-blocking techniques.
 * Focus: Pressure Point Arts, Combat Acrobatics, Weapon Improvisation.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 600;
const CENTER_Y = 500;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI; // To the left
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Flow of Combat Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can adapt your fighting style mid-combat, gaining small bonuses against opponents you've fought before.", flavor: "Like water, true skill has no fixed form." },

    // SUB-PATH A: The Chi-Blocker's Art Branch
    { id: 'A1', name: 'Pressure Point Strikes', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Disable bending abilities and chi flow with precise strikes.", flavor: "The body has its own language." },
    { id: 'minor_a1_1', name: 'Nerve Clusters', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Target specific nerve clusters to cause paralysis or numbness." },
    { id: 'minor_a1_2', name: 'Chi Sight', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "See the flow of chi through living beings." },
    { id: 'minor_a1_3', name: 'Temporary Blocks', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Create precise, temporary disabilities that wear off safely." },
    
    { id: 'A2', name: 'Perfect Balance', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Maintain perfect physical and mental equilibrium in any situation.", flavor: "Balance is the foundation of all technique." },
    { id: 'minor_a2_1', name: 'Acrobatic Flow', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Move with supernatural grace and flexibility." },
    { id: 'minor_a2_2', name: 'Counter Mastery', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Turn any attack into an opportunity for a counter-attack." },
    { id: 'minor_a2_3', name: 'Adaptive Stance', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Automatically shift to the optimal stance for any situation." },
    
    { id: 'A3', name: 'Chi Master', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Control the flow of chi in yourself and others with surgical precision.", flavor: "Chi is the river of life. I am its master." },
    { id: 'minor_a3_1', name: 'Chi Redirection', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Redirect enemy attacks by manipulating their chi flow." },
    { id: 'minor_a3_2', name: 'Enhanced Reflexes', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "React to attacks before they're even fully committed." },
    { id: 'minor_a3_3', name: 'Chi Healing', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Heal by redirecting chi flow, even without being a bender." },
    
    { id: 'APEX_A', name: 'The Void Hand', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Become able to completely negate bending and other supernatural abilities through touch.", flavor: "The void consumes all power." },

    // SUB-PATH B: The Weapon Master Branch
    { id: 'B1', name: 'Improvised Weapons', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Use any object as an effective weapon with supernatural skill.", flavor: "Everything is a weapon to the prepared mind." },
    { id: 'minor_b1_1', name: 'Environmental Mastery', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Turn any environment to your advantage in combat." },
    { id: 'minor_b1_2', name: 'Quick Draw', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Draw and attack with any weapon faster than thought." },
    { id: 'minor_b1_3', name: 'Dual Wielding', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Fight with multiple weapons simultaneously with perfect coordination." },
    
    { id: 'B2', name: 'Weapon Adaptation', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Instantly master any weapon you pick up.", flavor: "The weapon chooses the warrior." },
    { id: 'minor_b2_1', name: 'Weapon Bonding', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Form supernatural connections with favored weapons." },
    { id: 'minor_b2_2', name: 'Technique Theft', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Learn enemy techniques by observing them once." },
    { id: 'minor_b2_3', name: 'Style Fusion', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Combine different weapon styles into new hybrid techniques." },
    
    { id: 'B3', name: 'Grandmaster of Arms', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Achieve perfect mastery of all weapons and fighting styles.", flavor: "I am the weapon, and the weapon is me." },
    { id: 'minor_b3_1', name: 'Thousand Techniques', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Know every fighting technique that has ever existed." },
    { id: 'minor_b3_2', name: 'Weapon Creation', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Improvise weapons from impossible materials and situations." },
    { id: 'minor_b3_3', name: 'Style Mastery', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Master entire fighting traditions instantly." },
    
    { id: 'APEX_B', name: 'The Weapon That Is Not', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Become a weapon yourself, able to fight barehanded against any armed opponent.", flavor: "The greatest weapon is the one that cannot be taken." },

    // SUB-PATH C: The Flow State Branch
    { id: 'C1', name: 'Combat Instinct', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "React to danger without conscious thought, moving perfectly in battle.", flavor: "The body knows what the mind cannot." },
    { id: 'minor_c1_1', name: 'Prediction', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Sense what enemies will do moments before they do it." },
    { id: 'minor_c1_2', name: 'Perfect Timing', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Always act at exactly the right moment for maximum effect." },
    { id: 'minor_c1_3', name: 'Flow State', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Enter a trance where conscious thought doesn't interfere with action." },
    
    { id: 'C2', name: 'Adaptive Fighting', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Change your fighting style to counter any opponent.", flavor: "Adapt or die." },
    { id: 'minor_c2_1', name: 'Style Reading', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Instantly understand any fighting style by observing it." },
    { id: 'minor_c2_2', name: 'Counter Development', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Develop counters to enemy techniques in real-time." },
    { id: 'minor_c2_3', name: 'Pattern Breaking', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Become immune to any technique used against you repeatedly." },
    
    { id: 'C3', name: 'The Perfect Fighter', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Achieve a level of martial skill that transcends normal human limitations.", flavor: "Perfection is not a destination, but a journey." },
    { id: 'minor_c3_1', name: 'Superhuman Reflexes', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "React faster than physically possible." },
    { id: 'minor_c3_2', name: 'Combat Omniscience', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Know everything that happens in a battle instantly." },
    { id: 'minor_c3_3', name: 'Technique Evolution', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Your techniques improve and adapt during battle." },
    
    { id: 'APEX_C', name: 'Master of All Conflict', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Become the living embodiment of martial arts, able to win any fight.", flavor: "I am the art of war incarnate." },

    // SACRED TRIALS
    { id: 'rite_adaptation', name: 'Trial of Adaptation', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Defeat a master of every major fighting style using only their own techniques." },
    { id: 'rite_flow', name: 'Trial of Flow', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Fight blindfolded against multiple opponents using only instinct and chi sense." },
    { id: 'rite_innovation', name: 'Trial of Innovation', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Create an entirely new fighting style that others will study for generations." },
    
    // AVATAR STATES (CAPSTONES)
    { id: 'cap_technique', name: 'Avatar of Perfect Technique', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_adaptation', description: "Become the embodiment of martial perfection, able to teach or defeat anyone.", exclusiveWith: ['cap_mastery', 'cap_flow'] },
    { id: 'cap_mastery', name: 'Avatar of Adaptive Mastery', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_flow', description: "Become capable of instantly mastering any skill or ability you encounter.", exclusiveWith: ['cap_technique', 'cap_flow'] },
    { id: 'cap_flow', name: 'Avatar of the Eternal Flow', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_innovation', description: "Exist in permanent flow state, moving in perfect harmony with the universe.", exclusiveWith: ['cap_technique', 'cap_mastery'] },
    
    // CORRUPTION (SCHISMS)
    { id: 'schism_fighter', name: 'The Empty Fighter', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: 'APEX_B', description: "Become so adaptive you lose all personal fighting style, gaining power but losing identity.", exclusiveWith: ['rite_adaptation', 'rite_flow', 'rite_innovation'] },
    { id: 'schism_mirror', name: 'The Mirror of Combat', type: 'Schism', cost: 10, branch: 1.5, depth: 6.5, prerequisite: 'schism_fighter', description: "Become unable to act except as a reflection of your opponents, gaining their abilities but losing your own." }
];

// --- Generation Code ---
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getFlowOfCombatNodeIcon(nodeId: string): string {
    const type = nodeDataList.find(n => n.id === nodeId)?.type;
    switch (type) {
        case 'Genesis': return '🌊';
        case 'Keystone':
            if (nodeId.startsWith('A')) return '🖐️'; // Chi-blocking
            if (nodeId.startsWith('B')) return '🛠️'; // Improvised weapons
            if (nodeId.startsWith('C')) return '🤸'; // Flow/Acrobatics
            return '⭐';
        case 'Manifestation':
            if (nodeId.startsWith('A')) return '☯️'; // Chi Master
            if (nodeId.startsWith('B')) return '⚔️'; // Grandmaster of Arms
            if (nodeId.startsWith('C')) return '🧘'; // Perfect Fighter
            return '🌟';
        case 'Axiom':
            if (nodeId.startsWith('A')) return '🚫'; // Void Hand
            if (nodeId.startsWith('B')) return '🥋'; // Weapon That Is Not
            if (nodeId.startsWith('C')) return '♾️'; // Master of Conflict
            return '✨';
        case 'GnosticRite': return '🙏';
        case 'Capstone':
            if (nodeId === 'cap_technique') return '💯';
            if (nodeId === 'cap_mastery') return '🧠';
            if (nodeId === 'cap_flow') return '🌌';
            return '👑';
        case 'Schism':
            if (nodeId === 'schism_fighter') return '😶';
            if (nodeId === 'schism_mirror') return '🪞';
            return '💔';
        case 'Minor': return '○';
        default: return '●';
    }
}

nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES);
  const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle));
  const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));

  const node: TalentNode = {
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'flow_of_combat', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#B0C4DE', size: 50, icon: getFlowOfCombatNodeIcon(id) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost, exclusiveWith: (nodeData as any).exclusiveWith || []
  };
  
  nodes.push(node);
  nodeMap[id] = node;
  prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: id, isActive: false, isLocked: false });
  });
});

// --- Force-Directed Repulsion Algorithm ---
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
export const FLOW_OF_COMBAT_NODES = nodes;
export function generateFlowOfCombatConnections(): TalentConnection[] { return connections; }
export const FLOW_OF_COMBAT_METADATA = {
  name: 'The Flow of Combat',
  philosophy: "Like water, true skill has no fixed form. Read your opponent, become what they cannot counter, and victory follows.",
  essence: 'Adaptability, counter-fighting, chi-blocking techniques.',
  focus: 'Pressure Point Arts, Combat Acrobatics, Weapon Improvisation.',
  sacredAnimal: 'The Water Strider',
  emoji: '🌊',
  color: '#B0C4DE',
  position: { x: 600, y: 500 }
}; 