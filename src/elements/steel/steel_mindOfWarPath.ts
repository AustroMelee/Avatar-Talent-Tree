/**
 * Path 4: The Mind of War - "Strategy Beyond the Battlefield"
 * Philosophy: "Wars are won before the first blow is struck. The greatest weapon is a mind that sees ten moves ahead."
 * Essence: Tactical supremacy, technological innovation, psychological warfare.
 * Focus: Engineering Arts, Strategic Command, Intelligence Networks.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800;
const CENTER_Y = 600;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Mind of War Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can analyze battle situations instantly, seeing tactical opportunities others miss.", flavor: "Wars are won before the first blow is struck." },

    // SUB-PATH A: The Engineer's Art Branch
    { id: 'A1', name: 'Mechanical Genius', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Design and build complex mechanical devices and weapons.", flavor: "The mind is the greatest weapon." },
    { id: 'minor_a1_1', name: 'Rapid Construction', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Build devices much faster than should be possible." },
    { id: 'minor_a1_2', name: 'Improvised Engineering', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Create complex devices from scrap materials." },
    { id: 'minor_a1_3', name: 'Maintenance Mastery', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Keep devices running far beyond their normal lifespan." },
    
    { id: 'A2', name: 'War Machines', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Design and operate advanced siege engines and mechanical weapons.", flavor: "Technology is the great equalizer." },
    { id: 'minor_a2_1', name: 'Ballistic Mastery', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Calculate perfect trajectories for any projectile weapon." },
    { id: 'minor_a2_2', name: 'Explosive Expertise', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Create and safely handle explosive devices." },
    { id: 'minor_a2_3', name: 'Automation', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Build devices that operate themselves." },
    
    { id: 'A3', name: 'Master Engineer', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Create mechanical marvels that seem almost magical in their complexity.", flavor: "I build the impossible." },
    { id: 'minor_a3_1', name: 'Impossible Machines', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Build devices that violate normal physical laws." },
    { id: 'minor_a3_2', name: 'Living Machines', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Create mechanical beings with artificial intelligence." },
    { id: 'minor_a3_3', name: 'Reality Engineering', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Build devices that alter the fundamental nature of reality." },
    
    { id: 'APEX_A', name: 'The Great Inventor', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Understand the mechanical principles underlying all of reality.", flavor: "I understand the gears of creation." },

    // SUB-PATH B: The Strategist's Mind Branch
    { id: 'B1', name: 'Tactical Genius', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "See the optimal strategy in any conflict, from personal duels to massive wars.", flavor: "The greatest weapon is a mind that sees ten moves ahead." },
    { id: 'minor_b1_1', name: 'Battle Prediction', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Predict the outcome of battles before they begin." },
    { id: 'minor_b1_2', name: 'Resource Management', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Maximize the effectiveness of any army or organization." },
    { id: 'minor_b1_3', name: 'Logistics Mastery', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Ensure your forces are always properly supplied and positioned." },
    
    { id: 'B2', name: 'Information Networks', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Gather and process intelligence with supernatural efficiency.", flavor: "Knowledge is power." },
    { id: 'minor_b2_1', name: 'Spy Networks', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Maintain vast networks of informants and agents." },
    { id: 'minor_b2_2', name: 'Code Breaking', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Crack any code or cipher instantly." },
    { id: 'minor_b2_3', name: 'Pattern Recognition', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "See hidden patterns in seemingly random information." },
    
    { id: 'B3', name: 'Master Strategist', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Plan and execute strategies that span years or decades.", flavor: "Victory is inevitable." },
    { id: 'minor_b3_1', name: 'Long-term Planning', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Create plans that account for every possible variable." },
    { id: 'minor_b3_2', name: 'Psychological Warfare', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Defeat enemies through manipulation and mind games." },
    { id: 'minor_b3_3', name: 'Victory Inevitable', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your strategies are so perfect they become self-fulfilling prophecies." },
    
    { id: 'APEX_B', name: 'The Mind That Sees All', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Understand all possible outcomes of any situation and choose the optimal path.", flavor: "I see all paths, and choose the best." },

    // SUB-PATH C: The Scholar's Path Branch
    { id: 'C1', name: 'Analytical Mind', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Process information and solve problems with superhuman speed and accuracy.", flavor: "The mind is a weapon that never dulls." },
    { id: 'minor_c1_1', name: 'Speed Reading', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Absorb written information almost instantaneously." },
    { id: 'minor_c1_2', name: 'Perfect Memory', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Remember everything you've ever learned with perfect clarity." },
    { id: 'minor_c1_3', name: 'Logical Deduction', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Solve any mystery or puzzle through pure logic." },
    
    { id: 'C2', name: 'Research Mastery', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Discover hidden knowledge and uncover ancient secrets.", flavor: "The past holds the keys to the future." },
    { id: 'minor_c2_1', name: 'Archive Access', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Find any information that exists somewhere in the world." },
    { id: 'minor_c2_2', name: 'Ancient Languages', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Read and understand any written language." },
    { id: 'minor_c2_3', name: 'Secret Knowledge', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Learn secrets that others have tried to hide." },
    
    { id: 'C3', name: 'Living Library', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Become a repository of all human knowledge and wisdom.", flavor: "I am the keeper of all knowledge." },
    { id: 'minor_c3_1', name: 'Knowledge Synthesis', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Combine different fields of knowledge to create new understanding." },
    { id: 'minor_c3_2', name: 'Instant Expertise', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Become an expert in any field through rapid study." },
    { id: 'minor_c3_3', name: 'Teaching Mastery', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Transfer your knowledge to others with perfect efficiency." },
    
    { id: 'APEX_C', name: 'The Universal Mind', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Understand the fundamental principles that govern all existence.", flavor: "I comprehend the universe." },
    
    // SACRED TRIALS
    { id: 'rite_innovation', name: 'Trial of Innovation', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Invent something that changes the world forever." },
    { id: 'rite_strategy', name: 'Trial of Strategy', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Win an impossible war through pure strategic genius." },
    { id: 'rite_knowledge', name: 'Trial of Knowledge', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Solve a mystery that has baffled scholars for generations." },
    
    // AVATAR STATES (CAPSTONES)
    { id: 'cap_innovation', name: 'Avatar of Innovation', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_innovation', description: "Become the source of all technological and strategic advancement.", exclusiveWith: ['cap_strategy', 'cap_knowledge'] },
    { id: 'cap_strategy', name: 'Avatar of Perfect Strategy', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_strategy', description: "Embody the concept of strategy itself, making victory inevitable.", exclusiveWith: ['cap_innovation', 'cap_knowledge'] },
    { id: 'cap_knowledge', name: 'Avatar of Universal Knowledge', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_knowledge', description: "Become the living repository of all knowledge that exists or could exist.", exclusiveWith: ['cap_innovation', 'cap_strategy'] },
    
    // CORRUPTION (SCHISMS)
    { id: 'schism_logic', name: 'The Cold Logic', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: 'APEX_B', description: "Become perfectly logical and rational, but lose all emotion and empathy.", exclusiveWith: ['rite_innovation', 'rite_strategy', 'rite_knowledge'] },
    { id: 'schism_knowing', name: 'The All-Knowing Mind', type: 'Schism', cost: 12, branch: 1.5, depth: 6.5, prerequisite: 'schism_logic', description: "Gain knowledge of everything, but become paralyzed by the weight of infinite understanding." }
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'mind_of_war', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#B0C4DE', size: 50, icon: 'default' }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost, exclusiveWith: (nodeData as any).exclusiveWith || []
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
export const MIND_OF_WAR_NODES = nodes;
export function generateMindOfWarConnections(): TalentConnection[] { return connections; }
export const MIND_OF_WAR_METADATA = {
  name: 'The Mind of War',
  philosophy: "Wars are won before the first blow is struck.",
  essence: 'Tactical supremacy, technological innovation, psychological warfare.',
  focus: 'Engineering Arts, Strategic Command, Intelligence Networks.',
  sacredAnimal: 'The Owl',
  emoji: '🧠',
  color: '#B0C4DE',
  position: { x: 800, y: 600 }
}; 