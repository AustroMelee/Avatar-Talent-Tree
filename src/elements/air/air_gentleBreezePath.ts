/**
 * Path 1: The Gentle Breeze - 微風 (Wēi Fēng) (Deterministically Generated)
 * 
 * Path Philosophy: "The softest thing in the universe overcomes the hardest thing in the universe."
 * Essence: Subtlety, patience, flowing around obstacles rather than through them.
 * Focus: Evasion, misdirection, defensive mastery, turning force aside.
 * Sacred Animal: The Flying Lemur - elusive, graceful, one with the air.
 *
 * REFACTOR: Updated to match the "Four Winds Constellation" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800;
const CENTER_Y = 500;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; 
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
  // Genesis
  { id: 'genesis', name: 'Essence of Yielding', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Passive chance to completely avoid attacks through perfect timing.", flavor: "The softest thing in the universe overcomes the hardest thing in the universe." },

  // Minors after Genesis
  { id: 'minor_genesis_1', name: 'Leaf on Wind', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your natural evasion flows more smoothly.", flavor: "Be like the leaf; the wind cannot break what it can carry." },
  { id: 'minor_genesis_2', name: 'Weightless Step', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Move with the silence of falling leaves.", flavor: "The earth does not feel the landing of a single leaf." },

  // --- Sub-Path A: Aspect of Deflection ---
  { id: 'A1', name: 'Cloud Shield Technique', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Conjure protective air currents that deflect the next attack.", flavor: "A wall can be broken, but how does one break the air?" },
  { id: 'minor_a1_1', name: 'Persistent Mist', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your shield lingers like morning fog.", flavor: "Patience is a shield." },
  { id: 'minor_a1_2', name: 'Repelling Current', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Deflected attacks push enemies back gently.", flavor: "A gentle push is more effective than a forceful shove." },
  { id: 'minor_a1_3', name: 'Stronger Shield', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your cloud shield can deflect more powerful attacks.", flavor: "The air grows stronger with each breath." },
  
  { id: 'A2', name: 'Flowing Redirection', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Brief intangible movement, slipping through attacks like air through fingers.", flavor: "Do not resist the current; become it." },
  { id: 'minor_a2_1', name: 'Extended Flow', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your movement carries you further.", flavor: "The journey of a thousand miles begins with a single gust." },
  { id: 'minor_a2_2', name: 'Swift Current', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Return to the flow more quickly.", flavor: "The river is never still." },
  { id: 'minor_a2_3', name: 'Smoother Flow', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your flowing movement is more graceful and efficient.", flavor: "The wind flows without effort." },
  
  { id: 'A3', name: 'Aura of Deflection', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Persistent field that turns away projectiles without effort.", flavor: "True mastery is effortless. The wind does not try to blow; it simply blows." },
  { id: 'minor_a3_1', name: 'Widening Gyre', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your protective field expands.", flavor: "The circle of protection widens." },
  { id: 'minor_a3_2', name: 'Enduring Breeze', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "The deflection persists longer.", flavor: "The breeze outlasts the storm." },
  { id: 'minor_a3_3', name: 'Stronger Aura', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your deflection aura can handle more powerful projectiles.", flavor: "The wind grows stronger with each breath." },
  
  { id: 'APEX_A', name: 'Eye of Serenity', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Achieve near-perfect evasion through absolute awareness.", flavor: "In the center of the storm, there is only calm." },
  { id: 'minor_apex_a_1', name: 'Wider Awareness', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your awareness extends to a larger area around you.", flavor: "The eye sees all." },
  { id: 'minor_apex_a_2', name: 'Deeper Calm', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your serenity is even more profound and unshakeable.", flavor: "The calm grows deeper." },
  { id: 'minor_apex_a_3', name: 'Shared Serenity', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Your serenity can be shared with nearby allies.", flavor: "The calm spreads like morning mist." },

  // --- Sub-Path B: Aspect of Redirection ---
  { id: 'B1', name: 'Catching Breeze', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Catch projectiles and return them with gentle precision.", flavor: "Use the opponent's strength against them." },
  { id: 'minor_b1_1', name: 'Swift Return', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Returned attacks fly swifter.", flavor: "A gift returned is a lesson taught." },
  { id: 'minor_b1_2', name: 'Guided Flight', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your redirected attacks seek their mark.", flavor: "The wind knows its destination." },
  { id: 'minor_b1_3', name: 'Larger Catch', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "You can catch larger and more powerful projectiles.", flavor: "The wind catches all." },
  
  { id: 'B2', name: 'Answering Gust', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "After perfect evasion, respond with a gentle but firm push.", flavor: "A whisper can be louder than a shout." },
  { id: 'minor_b2_1', name: 'Stronger Answer', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your response carries more force.", flavor: "Even the gentlest wind can move a mountain." },
  { id: 'minor_b2_2', name: 'Wider Reach', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Affect multiple attackers with your answer.", flavor: "The wind touches all." },
  { id: 'minor_b2_3', name: 'Faster Answer', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your answering gust responds more quickly after evasion.", flavor: "The wind answers swiftly." },
  
  { id: 'B3', name: 'Perfect Redirection', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Turn melee attacks into throws using the attacker's own momentum.", flavor: "The tide turns not by force, but by redirection." },
  { id: 'minor_b3_1', name: 'Extended Window', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "More time to achieve perfect timing.", flavor: "Patience opens the window to opportunity." },
  { id: 'minor_b3_2', name: 'Graceful Throw', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Thrown enemies travel further and with greater impact.", flavor: "Grace is power under control." },
  { id: 'minor_b3_3', name: 'Multiple Throws', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "You can redirect multiple attackers simultaneously.", flavor: "The wind handles many at once." },

  { id: 'APEX_B', name: 'Mirror of Force', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Perfectly reflect all damage back to its source.", flavor: "The still lake reflects the storm perfectly." },
  { id: 'minor_apex_b_1', name: 'Stronger Reflection', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your damage reflection is more powerful and accurate.", flavor: "The mirror reflects with greater clarity." },
  { id: 'minor_apex_b_2', name: 'Wider Mirror', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your reflection can handle multiple sources of damage simultaneously.", flavor: "The mirror reflects many faces." },
  { id: 'minor_apex_b_3', name: 'Longer Reflection', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Your damage reflection persists longer.", flavor: "The mirror's memory is long." },

  // --- Sub-Path C: Aspect of Transcendence ---
  { id: 'C1', name: 'Whisper of Danger', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Sense attacks before they come through air pressure changes.", flavor: "Listen to the air; it speaks of what is to come." },
  { id: 'minor_c1_1', name: 'Earlier Warning', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Feel the danger sooner.", flavor: "The future whispers to those who listen." },
  { id: 'minor_c1_2', name: 'Clearer Whisper', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Understand the nature of the threat.", flavor: "Clarity is the key to understanding." },
  { id: 'minor_c1_3', name: 'Wider Whisper', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Sense danger from threats at greater distances.", flavor: "The wind carries warnings far." },

  { id: 'C2', name: 'Frictionless Flow', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Move with increased speed, immune to restraining effects.", flavor: "The wind knows no chains." },
  { id: 'minor_c2_1', name: 'Unshakeable Balance', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Cannot be knocked down or staggered.", flavor: "A master of air is a master of balance." },
  { id: 'minor_c2_2', name: 'Effortless Motion', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Movement costs no energy.", flavor: "True mastery is effortless." },
  { id: 'minor_c2_3', name: 'Faster Flow', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your movement speed is even greater.", flavor: "The wind flows faster." },

  { id: 'C3', name: 'Wind Walking', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Leap and glide with supernatural grace, taking no harm while airborne.", flavor: "The sky is not a limit, but a home." },
  { id: 'minor_c3_1', name: 'Extended Glide', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Travel further on each breath of air.", flavor: "The wind carries those who trust it." },
  { id: 'minor_c3_2', name: 'Sky\'s Protection', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Even greater protection while airborne.", flavor: "The sky protects its own." },
  { id: 'minor_c3_3', name: 'Higher Flight', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "You can glide to greater heights.", flavor: "The sky has no limits." },

  { id: 'APEX_C', name: 'Incorporeal Step', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Phase through enemies and obstacles like wind through a forest.", flavor: "What is a wall to the wind?" },
  { id: 'minor_apex_c_1', name: 'Longer Phase', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "You can phase through obstacles for longer distances.", flavor: "The wind travels far." },
  { id: 'minor_apex_c_2', name: 'Faster Phase', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your phasing movement is faster and more fluid.", flavor: "The wind flows swiftly." },
  { id: 'minor_apex_c_3', name: 'Multiple Phases', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can phase through multiple obstacles in quick succession.", flavor: "The wind knows no barriers." },

  // --- Synthesis & Bridge ---
  { id: 'SYNTHESIS_A_B', name: 'Graceful Deflection', type: 'Synthesis', cost: 5, branch: 0.5, depth: 4, prerequisite: ['APEX_A', 'APEX_B'], description: "Combine deflection and redirection for ultimate defensive mastery.", flavor: "Defense and offense are two sides of the same coin." },
  { id: 'BRIDGE_B', name: 'Cross-Path Bridge', type: 'Bridge', cost: 10, branch: 1.5, depth: 4.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Gain access to Synthesis Opportunity.", flavor: "True mastery comes from understanding multiple perspectives." },

  // --- Endgame Choices ---
  { id: 'rite_leaf', name: 'Trial of the Leaf', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Achieve perfect evasion without moving your feet.", flavor: "The leaf does not resist the storm, it dances with it." },
  { id: 'rite_redir', name: 'Trial of Redirection', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Turn an enemy's greatest strength into their downfall.", flavor: "The mightiest river is turned by the smallest stone." },
  { id: 'rite_empty', name: 'Trial of Emptiness', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Become so still that you cannot be perceived.", flavor: "To be unseen, one must first become nothing." },

  { id: 'capstone_leaf', name: 'Leaf Dancing in Hurricane', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_leaf', description: "Your evasion becomes so perfect that you leave afterimages, confusing all who face you while becoming briefly invisible after each perfect dodge.", flavor: "How can you strike what is in a thousand places at once?" },
  { id: 'capstone_mountain', name: 'Breath of the Mountain', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_redir', description: "Embody the philosophy of yielding - adopt and reflect the essence of any wind path you've studied.", flavor: "The mountain does not fight the storm, it endures it. It becomes it." },
  { id: 'capstone_void', name: 'Void Walker', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_empty', description: "Transcend physical limitation entirely, greatly reducing the risks of forbidden techniques.", flavor: "I walk the path between what is and what is not." },
  
  { id: 'schism_gambit', name: 'Hurricane\'s Gambit', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Greatly increase evasion, but any attack that connects deals devastating damage.", flavor: "To dance on the razor's edge is to truly feel alive." },
  { id: 'schism_chaos', name: 'Chaos Incarnate', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_gambit', description: "Become an unpredictable force, abandoning traditional mastery for pure instinct.", flavor: "Let go of the illusion of control. Embrace the chaos." },
];

// --- Generation ---

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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'gentle_breeze', constellation: 'air', position: { x, y }, prerequisites: prerequisites, visual: { 
      color: '#B0E0E6', 
      size: 50, // Standardize size for now
      icon: getGentleBreezeNodeIcon(type) 
    }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost,
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
export const GENTLE_BREEZE_NODES = nodes;
export const GENTLE_BREEZE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateGentleBreezeConnections(): TalentConnection[] { return connections; }
export const GENTLE_BREEZE_METADATA = {
  name: 'The Gentle Breeze',
  philosophy: 'The softest thing in the universe overcomes the hardest thing in the universe.',
  essence: 'Subtlety, patience, flowing around obstacles rather than through them.',
  focus: 'Evasion, misdirection, defensive mastery, turning force aside.',
  sacredAnimal: 'The Flying Lemur',
  emoji: '🍃',
  color: '#b3e6ff',
  position: { x: 800, y: 500 }
};

function getGentleBreezeNodeIcon(type: string): string {
  switch (type) {
    case 'Genesis': return '🍃';
    case 'Keystone': return '🛡️';
    case 'Manifestation': return '💨';
    case 'Axiom': return '👁️';
    case 'Capstone': return '🌀';
    case 'GnosticRite': return '🙏';
    case 'Schism': return '💥';
    case 'Minor': return '🕊️';
    default: return '🌬️';
  }
} 