/**
 * Path 2: The Shield of the People - "Protection Through Sacrifice"
 * Philosophy: "Strength means nothing if you cannot protect what matters. A true warrior stands between harm and the innocent."
 * Essence: Defensive mastery, group tactics, inspiring leadership.
 * Focus: Shield Arts, Formation Fighting, Battlefield Command.
 * Sacred Animal: The Bear - protective, strong, willing to sacrifice for family.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800;
const CENTER_Y = 400;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = 0; // Rightwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Shield of the People Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can instinctively position yourself to protect others, reducing damage to allies near you.", flavor: "Strength means nothing if you cannot protect what matters." },

    // SUB-PATH A: The Guardian's Way Branch
    { id: 'A1', name: 'Shield Wall', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Create impenetrable defensive formations with shields and teamwork.", flavor: "Together we are unbreakable." },
    { id: 'A2', name: 'Protective Instinct', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Automatically intercept attacks aimed at allies.", flavor: "I will not let them fall." },
    { id: 'A3', name: 'Human Fortress', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Become an unmovable defensive position that can protect large groups.", flavor: "I am the wall that protects." },
    { id: 'APEX_A', name: 'The Unbreakable Wall', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Become absolutely immovable when protecting others, able to withstand any force.", flavor: "I will not be moved." },

    // SUB-PATH B: The Leader's Command Branch
    { id: 'B1', name: 'Inspiring Presence', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Rally allies and boost their combat effectiveness through leadership.", flavor: "Follow me, and we will not fail." },
    { id: 'B2', name: 'Combat Coordination', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Direct allied attacks for maximum effectiveness.", flavor: "Unity is strength." },
    { id: 'B3', name: 'Battlefield General', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Command entire armies with supernatural effectiveness.", flavor: "Victory is not a matter of chance, but of choice." },
    { id: 'APEX_B', name: 'The Hero King', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Inspire others to greatness, temporarily granting them heroic abilities.", flavor: "I will make heroes of us all." },

    // SUB-PATH C: The Sacrifice's Honor Branch
    { id: 'C1', name: 'Selfless Defense', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Redirect all damage from allies to yourself.", flavor: "Better I suffer than they." },
    { id: 'C2', name: 'Last Stand', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Fight beyond your limits when protecting others.", flavor: "I will not fall while they still stand." },
    { id: 'C3', name: 'Guardian Angel', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Protect allies from any harm through supernatural intervention.", flavor: "I will be their shield, even in death." },
    { id: 'APEX_C', name: 'The Eternal Guardian', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your protective spirit watches over others even after death.", flavor: "Even in death, I protect." },

    // SACRED TRIALS
    { id: 'rite_sacrifice', name: 'Trial of Sacrifice', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Protect someone by willingly taking a wound that would have killed them." },
    { id: 'rite_leadership', name: 'Trial of Leadership', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Lead a group of civilians to safety through overwhelming danger." },
    { id: 'rite_duty', name: 'Trial of Duty', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Maintain your post and protect your charges despite personal cost." },

    // AVATAR STATES
    { id: 'capstone_eternal_shield', name: 'Avatar of the Eternal Shield', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_sacrifice', description: "Become protection incarnate, able to shield entire nations from harm." },
    { id: 'capstone_heroic_legend', name: 'Avatar of Heroic Legend', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_leadership', description: "Become a living legend that inspires heroism in all who know your story." },
    { id: 'capstone_noble_sacrifice', name: 'Avatar of Noble Sacrifice', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_duty', description: "Embody the concept of sacrifice, able to take on any burden to protect others." },
    
    // CORRUPTION
    { id: 'schism_endless_vigil', name: 'The Endless Vigil', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: ['APEX_B', 'APEX_C'], description: "You can never rest or stop protecting others, gaining incredible power but losing the ability to live for yourself." },
    { id: 'schism_ultimate_sacrifice', name: 'The Ultimate Sacrifice', type: 'Schism', cost: 12, branch: 1.5, depth: 6.5, prerequisite: 'schism_endless_vigil', description: "Permanently sacrifice aspects of yourself to grant others power, becoming less human with each use." }
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'shield_of_people', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#8B4513', size: 50, icon: getShieldOfPeopleNodeIcon(id) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost
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
export const SHIELD_OF_PEOPLE_NODES = nodes;
export const SHIELD_OF_PEOPLE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateShieldOfPeopleConnections(): TalentConnection[] { return connections; }
export const SHIELD_OF_PEOPLE_METADATA = {
  name: 'The Shield of the People',
  philosophy: "Strength means nothing if you cannot protect what matters.",
  essence: 'Defensive mastery, group tactics, inspiring leadership.',
  focus: 'Shield Arts, Formation Fighting, Battlefield Command.',
  sacredAnimal: 'The Bear',
  emoji: '🛡️',
  color: '#8B4513',
  position: { x: 800, y: 400 }
};

function getShieldOfPeopleNodeIcon(nodeId: string): string {
  switch (nodeId) {
    // Genesis
    case 'genesis': return '🛡️';
    
    // Guardian's Heart Branch
    case 'A1': return '💙'; // Protector's Heart - blue heart
    case 'minor_a1_1': return '🤗'; // Embrace of Safety - hugging
    case 'minor_a1_2': return '🫂'; // Shared Strength - people hugging
    case 'minor_a1_3': return '💪'; // Unbreakable Will - flexed biceps
    case 'A2': return '🏰'; // Living Fortress - castle
    case 'minor_a2_1': return '🧱'; // Wall of Flesh - brick
    case 'minor_a2_2': return '🔄'; // Regenerating Defense - recycle
    case 'minor_a2_3': return '🛡️'; // Adaptive Shielding - shield
    case 'A3': return '👑'; // Guardian Lord - crown
    case 'minor_a3_1': return '🎖️'; // Inspiring Presence - medal
    case 'minor_a3_2': return '⚡'; // Aura of Protection - lightning
    case 'minor_a3_3': return '🛡️'; // Commanding Defense - shield
    case 'APEX_A': return '🌟'; // The People's Shield - star
    case 'minor_apex_a_1': return '🌍'; // Continental Protection - earth
    case 'minor_apex_a_2': return '🛡️'; // Reality Shield - shield
    case 'minor_apex_a_3': return '💎'; // Unbreakable Spirit - diamond
    
    // Defensive Arts Branch
    case 'B1': return '🛡️'; // Shield Mastery - shield
    case 'minor_b1_1': return '🔄'; // Deflection Arts - recycle
    case 'minor_b1_2': return '🛡️'; // Barrier Creation - shield
    case 'minor_b1_3': return '🛡️'; // Reactive Defense - shield
    case 'B2': return '🛡️'; // Shield Wall - shield
    case 'minor_b2_1': return '🛡️'; // Coordinated Defense - shield
    case 'minor_b2_2': return '🛡️'; // Mobile Fortress - shield
    case 'minor_b2_3': return '🛡️'; // Impenetrable Formation - shield
    case 'B3': return '🛡️'; // Living Shield - shield
    case 'minor_b3_1': return '🛡️'; // Sentient Defense - shield
    case 'minor_b3_2': return '🛡️'; // Adaptive Shielding - shield
    case 'minor_b3_3': return '🛡️'; // Perfect Protection - shield
    case 'APEX_B': return '🛡️'; // Master of Defense - shield
    case 'minor_apex_b_1': return '🛡️'; // Conceptual Shielding - shield
    case 'minor_apex_b_2': return '🛡️'; // Reality Barrier - shield
    case 'minor_apex_b_3': return '🛡️'; // Absolute Defense - shield
    
    // Healing Arts Branch
    case 'C1': return '💚'; // Life Touch - green heart
    case 'minor_c1_1': return '🩹'; // Wound Binding - bandage
    case 'minor_c1_2': return '💊'; // Pain Relief - pill
    case 'minor_c1_3': return '🔄'; // Rapid Recovery - recycle
    case 'C2': return '💚'; // Mass Healing - green heart
    case 'minor_c2_1': return '💚'; // Healing Aura - green heart
    case 'minor_c2_2': return '💚'; // Regenerative Field - green heart
    case 'minor_c2_3': return '💚'; // Life Restoration - green heart
    case 'C3': return '💚'; // Resurrection Arts - green heart
    case 'minor_c3_1': return '💚'; // Death Reversal - green heart
    case 'minor_c3_2': return '💚'; // Soul Restoration - green heart
    case 'minor_c3_3': return '💚'; // Eternal Life - green heart
    case 'APEX_C': return '💚'; // Master of Life - green heart
    case 'minor_apex_c_1': return '💚'; // Conceptual Healing - green heart
    case 'minor_apex_c_2': return '💚'; // Reality Restoration - green heart
    case 'minor_apex_c_3': return '💚'; // Life Mastery - green heart
    
    // Sacred Trials
    case 'rite_sacrifice': return '🤲'; // Trial of Sacrifice - praying hands
    case 'rite_endurance': return '💪'; // Trial of Endurance - flexed biceps
    case 'rite_compassion': return '💙'; // Trial of Compassion - blue heart
    
    // Avatar States
    case 'capstone_protector': return '🛡️'; // The Eternal Protector - shield
    case 'capstone_guardian': return '👑'; // The Guardian of All - crown
    case 'capstone_life_giver': return '💚'; // The Giver of Life - green heart
    
    // Corruption
    case 'schism_control': return '👁️'; // Benevolent Control - eye
    case 'schism_dependency': return '🔗'; // The People's Dependency - link
    
    default: return '🛡️';
  }
} 