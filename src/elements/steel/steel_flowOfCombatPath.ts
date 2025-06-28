/**
 * Path 3: The Flow of Combat - "Adaptation Made Art"
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const CENTER_X = 800; const CENTER_Y = 400; const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI / 2; const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

const nodeDataList = [
    { id: 'genesis', name: 'The Flow of Combat Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can adapt your fighting style mid-combat, gaining small bonuses against opponents you've fought before.", flavor: "Like water, true skill has no fixed form." },
    
    // Chi-Blocker's Art Branch
    { id: 'A1', name: 'Pressure Point Strikes', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Disable bending abilities and chi flow with precise strikes.", flavor: "The body has its own language." },
    { id: 'A2', name: 'Perfect Balance', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Maintain perfect physical and mental equilibrium in any situation.", flavor: "Balance is the foundation of all technique." },
    { id: 'A3', name: 'Chi Master', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Control the flow of chi in yourself and others with surgical precision.", flavor: "Chi is the river of life. I am its master." },
    { id: 'APEX_A', name: 'The Void Hand', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Become able to completely negate bending and other supernatural abilities through touch.", flavor: "The void consumes all power." },
    
    // Weapon Master Branch
    { id: 'B1', name: 'Improvised Weapons', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Use any object as an effective weapon with supernatural skill.", flavor: "Everything is a weapon to the prepared mind." },
    { id: 'B2', name: 'Weapon Adaptation', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Instantly master any weapon you pick up.", flavor: "The weapon chooses the warrior." },
    { id: 'B3', name: 'Grandmaster of Arms', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Achieve perfect mastery of all weapons and fighting styles.", flavor: "I am the weapon, and the weapon is me." },
    { id: 'APEX_B', name: 'The Weapon That Is Not', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Become a weapon yourself, able to fight barehanded against any armed opponent.", flavor: "The greatest weapon is the one that cannot be taken." },
    
    // Flow State Branch
    { id: 'C1', name: 'Combat Instinct', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "React to danger without conscious thought, moving perfectly in battle.", flavor: "The body knows what the mind cannot." },
    { id: 'C2', name: 'Adaptive Fighting', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Change your fighting style to counter any opponent.", flavor: "Adapt or die." },
    { id: 'C3', name: 'The Perfect Fighter', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Achieve a level of martial skill that transcends normal human limitations.", flavor: "Perfection is not a destination, but a journey." },
    { id: 'APEX_C', name: 'Master of All Conflict', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Become the living embodiment of martial arts, able to win any fight.", flavor: "I am the art of war incarnate." },
    
    // Sacred Trials
    { id: 'rite_adaptation', name: 'Trial of Adaptation', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Defeat a master of every major fighting style using only their own techniques." },
    { id: 'rite_flow', name: 'Trial of Flow', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Fight blindfolded against multiple opponents using only instinct and chi sense." },
    { id: 'rite_innovation', name: 'Trial of Innovation', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Create an entirely new fighting style that others will study for generations." },
    
    // Avatar States
    { id: 'capstone_perfect_technique', name: 'Avatar of Perfect Technique', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_adaptation', description: "Become the embodiment of martial perfection, able to teach or defeat anyone." },
    { id: 'capstone_adaptive_mastery', name: 'Avatar of Adaptive Mastery', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_flow', description: "Become capable of instantly mastering any skill or ability you encounter." },
    { id: 'capstone_eternal_flow', name: 'Avatar of the Eternal Flow', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_innovation', description: "Exist in permanent flow state, moving in perfect harmony with the universe." },
    
    // Corruption
    { id: 'schism_empty_fighter', name: 'The Empty Fighter', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Become so adaptive you lose all personal fighting style, gaining power but losing identity." },
    { id: 'schism_mirror_combat', name: 'The Mirror of Combat', type: 'Schism', cost: 10, branch: 1.5, depth: 6.5, prerequisite: 'schism_empty_fighter', description: "Become unable to act except as a reflection of your opponents, gaining their abilities but losing your own." }
];

const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};

nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES);
  const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle));
  const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));

  const node: TalentNode = {
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'flow_of_combat', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#4682B4', size: 50, icon: getFlowOfCombatNodeIcon(id) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost
  };
  
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});

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

export const FLOW_OF_COMBAT_NODES = nodes;
export const FLOW_OF_COMBAT_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateFlowOfCombatConnections(): TalentConnection[] { return connections; }
export const FLOW_OF_COMBAT_METADATA = {
  name: 'The Flow of Combat', philosophy: "Like water, true skill has no fixed form.", emoji: '🌊', color: '#4682B4', position: { x: 800, y: 400 }
};

function getFlowOfCombatNodeIcon(nodeId: string): string {
  switch (nodeId) {
    // Genesis
    case 'genesis': return '⚔️';
    
    // Chi-Blocker's Art Branch
    case 'A1': return '🌊'; // Combat Flow - wave
    case 'A2': return '🌀'; // Combat Rhythm - cyclone
    case 'A3': return '🌊'; // Master of Flow - wave
    case 'APEX_A': return '🌊'; // The Living Flow - wave
    
    // Weapon Master Branch
    case 'B1': return '⚔️'; // Weapon Harmony - crossed swords
    case 'B2': return '⚔️'; // Weapon Fusion - crossed swords
    case 'B3': return '⚔️'; // Living Weapons - crossed swords
    case 'APEX_B': return '⚔️'; // Master of Arms - crossed swords
    
    // Flow State Branch
    case 'C1': return '🧠'; // Combat Intelligence - brain
    case 'C2': return '🎖️'; // Battlefield Control - medal
    case 'C3': return '👑'; // War Master - crown
    case 'APEX_C': return '👑'; // Master of War - crown
    
    // Sacred Trials
    case 'rite_adaptation': return '🔄'; // Trial of Adaptation - recycle
    case 'rite_flow': return '🌊'; // Trial of Flow - wave
    case 'rite_innovation': return '💡'; // Trial of Innovation - light bulb
    
    // Avatar States
    case 'capstone_perfect_technique': return '🎭'; // Avatar of Perfect Technique - performing arts
    case 'capstone_adaptive_mastery': return '🧠'; // Avatar of Adaptive Mastery - brain
    case 'capstone_eternal_flow': return '🌊'; // Avatar of the Eternal Flow - wave
    
    // Corruption
    case 'schism_empty_fighter': return '🤖'; // The Empty Fighter - robot
    case 'schism_mirror_combat': return '🪞'; // The Mirror of Combat - mirror
    
    default: return '⚔️';
  }
} 