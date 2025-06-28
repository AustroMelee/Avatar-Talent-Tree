/**
 * Path 4: The Mind of War - "Strategy Beyond the Battlefield"
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const CENTER_X = 800; const CENTER_Y = 400; const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI; const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

const nodeDataList = [
    { id: 'genesis', name: 'The Mind of War Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can analyze battle situations instantly, seeing tactical opportunities others miss.", flavor: "Wars are won before the first blow is struck." },
    
    // Engineer's Art Branch
    { id: 'A1', name: 'Mechanical Genius', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Design and build complex mechanical devices and weapons.", flavor: "The mind is the greatest weapon." },
    { id: 'A2', name: 'War Machines', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Design and operate advanced siege engines and mechanical weapons.", flavor: "Technology is the great equalizer." },
    { id: 'A3', name: 'Master Engineer', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Create mechanical marvels that seem almost magical in their complexity.", flavor: "I build the impossible." },
    { id: 'APEX_A', name: 'The Great Inventor', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Understand the mechanical principles underlying all of reality.", flavor: "I understand the gears of creation." },
    
    // Strategist's Mind Branch
    { id: 'B1', name: 'Tactical Genius', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "See the optimal strategy in any conflict, from personal duels to massive wars.", flavor: "The greatest weapon is a mind that sees ten moves ahead." },
    { id: 'B2', name: 'Information Networks', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Gather and process intelligence with supernatural efficiency.", flavor: "Knowledge is power." },
    { id: 'B3', name: 'Master Strategist', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Plan and execute strategies that span years or decades.", flavor: "Victory is inevitable." },
    { id: 'APEX_B', name: 'The Mind That Sees All', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Understand all possible outcomes of any situation and choose the optimal path.", flavor: "I see all paths, and choose the best." },
    
    // Scholar's Path Branch
    { id: 'C1', name: 'Analytical Mind', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Process information and solve problems with superhuman speed and accuracy.", flavor: "The mind is a weapon that never dulls." },
    { id: 'C2', name: 'Research Mastery', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Discover hidden knowledge and uncover ancient secrets.", flavor: "The past holds the keys to the future." },
    { id: 'C3', name: 'Living Library', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Become a repository of all human knowledge and wisdom.", flavor: "I am the keeper of all knowledge." },
    { id: 'APEX_C', name: 'The Universal Mind', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Understand the fundamental principles that govern all existence.", flavor: "I comprehend the universe." },
    
    // Sacred Trials
    { id: 'rite_innovation', name: 'Trial of Innovation', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Invent something that changes the world forever." },
    { id: 'rite_strategy', name: 'Trial of Strategy', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Win an impossible war through pure strategic genius." },
    { id: 'rite_knowledge', name: 'Trial of Knowledge', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Solve a mystery that has baffled scholars for generations." },
    
    // Avatar States
    { id: 'capstone_innovation', name: 'Avatar of Innovation', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_innovation', description: "Become the source of all technological and strategic advancement." },
    { id: 'capstone_perfect_strategy', name: 'Avatar of Perfect Strategy', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_strategy', description: "Embody the concept of strategy itself, making victory inevitable." },
    { id: 'capstone_universal_knowledge', name: 'Avatar of Universal Knowledge', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_knowledge', description: "Become the living repository of all knowledge that exists or could exist." },
    
    // Corruption
    { id: 'schism_cold_logic', name: 'The Cold Logic', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Become perfectly logical and rational, but lose all emotion and empathy." },
    { id: 'schism_all_knowing', name: 'The All-Knowing Mind', type: 'Schism', cost: 12, branch: 1.5, depth: 6.5, prerequisite: 'schism_cold_logic', description: "Gain knowledge of everything, but become paralyzed by the weight of infinite understanding." }
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'mind_of_war', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#2F4F4F', size: 50, icon: getMindOfWarNodeIcon(id) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost
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

export const MIND_OF_WAR_NODES = nodes;
export const MIND_OF_WAR_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateMindOfWarConnections(): TalentConnection[] { return connections; }
export const MIND_OF_WAR_METADATA = {
  name: 'The Mind of War', philosophy: "Wars are won before the first blow is struck.", emoji: '🧠', color: '#2F4F4F', position: { x: 800, y: 400 }
};

function getMindOfWarNodeIcon(nodeId: string): string {
  switch (nodeId) {
    // Genesis
    case 'genesis': return '🧠';
    
    // Engineer's Art Branch
    case 'A1': return '🧠'; // Strategic Thinking - brain
    case 'A2': return '🧠'; // Combat Intelligence - brain
    case 'A3': return '🧠'; // Master Strategist - brain
    case 'APEX_A': return '🧠'; // The Living Strategy - brain
    
    // Strategist's Mind Branch
    case 'B1': return '🧘'; // Mental Fortress - meditating person
    case 'B2': return '🧘'; // Battle Meditation - meditating person
    case 'B3': return '🧘'; // Master of Mind - meditating person
    case 'APEX_B': return '🧘'; // The Living Mind - meditating person
    
    // Scholar's Path Branch
    case 'C1': return '👁️'; // Battlefield Psychology - eye
    case 'C2': return '👁️'; // Mental Domination - eye
    case 'C3': return '👁️'; // Master of Minds - eye
    case 'APEX_C': return '👁️'; // The Living Eye - eye
    
    // Sacred Trials
    case 'rite_strategy': return '🧠'; // Trial of Strategy - brain
    case 'rite_knowledge': return '🧘'; // Trial of Knowledge - meditating person
    
    // Avatar States
    case 'capstone_innovation': return '⚡'; // Avatar of Innovation - lightning
    case 'capstone_perfect_strategy': return '👑'; // Avatar of Perfect Strategy - crown
    case 'capstone_universal_knowledge': return '📚'; // Avatar of Universal Knowledge - books
    
    // Corruption
    case 'schism_cold_logic': return '🤖'; // The Cold Logic - robot
    case 'schism_all_knowing': return '💀'; // The All-Knowing Mind - skull
    
    default: return '🧠';
  }
} 