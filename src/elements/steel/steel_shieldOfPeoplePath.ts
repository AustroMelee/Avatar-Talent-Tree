/**
 * Path 2: The Shield of the People - "Protection Through Sacrifice"
 * Philosophy: "Strength means nothing if you cannot protect what matters. A true warrior stands between harm and the innocent."
 * Essence: Defensive mastery, group tactics, inspiring leadership.
 * Focus: Shield Arts, Formation Fighting, Battlefield Command.
 * Sacred Animal: The Bear - protective, strong, willing to sacrifice for family.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 1000;
const CENTER_Y = 500;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = 0; // Rightwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Shield of the People Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You can instinctively position yourself to protect others, reducing damage to allies near you.", flavor: "Strength means nothing if you cannot protect what matters." },

    // SUB-PATH A: The Guardian's Way Branch
    { id: 'A1', name: 'Shield Wall', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Create impenetrable defensive formations with shields and teamwork.", flavor: "Together we are unbreakable." },
    { id: 'minor_a1_1', name: 'Shield Mastery', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Use shields as weapons as effectively as defensive tools." },
    { id: 'minor_a1_2', name: 'Formation Tactics', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Coordinate group movements with perfect precision." },
    { id: 'minor_a1_3', name: 'Defensive Stance', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Become nearly immovable when defending a position." },
    
    { id: 'A2', name: 'Protective Instinct', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Automatically intercept attacks aimed at allies.", flavor: "I will not let them fall." },
    { id: 'minor_a2_1', name: 'Danger Sense', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Detect threats to yourself and others before they strike." },
    { id: 'minor_a2_2', name: 'Shield Throw', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Use shields as ranged weapons that return to your hand." },
    { id: 'minor_a2_3', name: 'Bodyguard Training', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Perfectly predict and counter assassination attempts." },
    
    { id: 'A3', name: 'Human Fortress', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Become an unmovable defensive position that can protect large groups.", flavor: "I am the wall that protects." },
    { id: 'minor_a3_1', name: 'Rallying Presence', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Allies fight better and feel braver near you." },
    { id: 'minor_a3_2', name: 'Damage Absorption', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Take damage meant for others onto yourself." },
    { id: 'minor_a3_3', name: 'Shield Aura', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Extend your defensive abilities to cover nearby allies." },
    
    { id: 'APEX_A', name: 'The Unbreakable Wall', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Become absolutely immovable when protecting others, able to withstand any force.", flavor: "I will not be moved." },

    // SUB-PATH B: The Leader's Command Branch
    { id: 'B1', name: 'Inspiring Presence', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Rally allies and boost their combat effectiveness through leadership.", flavor: "Follow me, and we will not fail." },
    { id: 'minor_b1_1', name: 'Battle Cry', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your shouts can inspire allies or demoralize enemies." },
    { id: 'minor_b1_2', name: 'Tactical Coordination', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Direct multiple allies to act as one unit." },
    { id: 'minor_b1_3', name: 'Morale Boost', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Allies fight without fear while you lead them." },
    
    { id: 'B2', name: 'Combat Coordination', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Direct allied attacks for maximum effectiveness.", flavor: "Unity is strength." },
    { id: 'minor_b2_1', name: 'Perfect Timing', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Coordinate attacks so they all land simultaneously." },
    { id: 'minor_b2_2', name: 'Formation Master', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Create and maintain complex battle formations." },
    { id: 'minor_b2_3', name: 'Chain Commands', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Give orders that spread through your entire force instantly." },
    
    { id: 'B3', name: 'Battlefield General', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Command entire armies with supernatural effectiveness.", flavor: "Victory is not a matter of chance, but of choice." },
    { id: 'minor_b3_1', name: 'Strategic Genius', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "See the optimal strategy for any battle instantly." },
    { id: 'minor_b3_2', name: 'Omnipresent Command', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your commands reach any ally no matter the distance." },
    { id: 'minor_b3_3', name: 'Victory Aura', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Battles tend to turn in your favor through pure leadership." },
    
    { id: 'APEX_B', name: 'The Hero King', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Inspire others to greatness, temporarily granting them heroic abilities.", flavor: "I will make heroes of us all." },

    // SUB-PATH C: The Sacrifice's Honor Branch
    { id: 'C1', name: 'Selfless Defense', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Redirect all damage from allies to yourself.", flavor: "Better I suffer than they." },
    { id: 'minor_c1_1', name: 'Pain Tolerance', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Continue fighting effectively despite severe injuries." },
    { id: 'minor_c1_2', name: 'Damage Conversion', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Convert some damage you take into healing for allies." },
    { id: 'minor_c1_3', name: 'Martyr\'s Strength', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Grow stronger as you take more damage protecting others." },
    
    { id: 'C2', name: 'Last Stand', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Fight beyond your limits when protecting others.", flavor: "I will not fall while they still stand." },
    { id: 'minor_c2_1', name: 'Beyond Death', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Continue fighting for a short time even after receiving fatal wounds." },
    { id: 'minor_c2_2', name: 'Desperate Power', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Gain superhuman strength when allies are in mortal danger." },
    { id: 'minor_c2_3', name: 'Final Strike', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your last attack before falling deals massive damage." },
    
    { id: 'C3', name: 'Guardian Angel', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Protect allies from any harm through supernatural intervention.", flavor: "I will be their shield, even in death." },
    { id: 'minor_c3_1', name: 'Divine Protection', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Sometimes attacks against allies simply miss or fail." },
    { id: 'minor_c3_2', name: 'Healing Sacrifice', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Transfer your life force to heal critically wounded allies." },
    { id: 'minor_c3_3', name: 'Protective Miracle', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Once per battle, completely negate a killing blow to an ally." },
    
    { id: 'APEX_C', name: 'The Eternal Guardian', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your protective spirit watches over others even after death.", flavor: "Even in death, I protect." },

    // SACRED TRIALS
    { id: 'rite_sacrifice', name: 'Trial of Sacrifice', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Protect someone by willingly taking a wound that would have killed them." },
    { id: 'rite_leadership', name: 'Trial of Leadership', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Lead a group of civilians to safety through overwhelming danger." },
    { id: 'rite_duty', name: 'Trial of Duty', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Maintain your post and protect your charges despite personal cost." },

    // AVATAR STATES (CAPSTONES)
    { id: 'cap_shield', name: 'Avatar of the Eternal Shield', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_sacrifice', description: "Become protection incarnate, able to shield entire nations from harm.", exclusiveWith: ['cap_legend', 'cap_sacrifice'] },
    { id: 'cap_legend', name: 'Avatar of Heroic Legend', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_leadership', description: "Become a living legend that inspires heroism in all who know your story.", exclusiveWith: ['cap_shield', 'cap_sacrifice'] },
    { id: 'cap_sacrifice', name: 'Avatar of Noble Sacrifice', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_duty', description: "Embody the concept of sacrifice, able to take on any burden to protect others.", exclusiveWith: ['cap_shield', 'cap_legend'] },

    // CORRUPTION (SCHISMS)
    { id: 'schism_vigil', name: 'The Endless Vigil', type: 'Schism', cost: 8, branch: 1.5, depth: 5.5, prerequisite: 'APEX_B', description: "You can never rest or stop protecting others, gaining incredible power but losing the ability to live for yourself.", exclusiveWith: ['rite_sacrifice', 'rite_leadership', 'rite_duty'] },
    { id: 'schism_sacrifice', name: 'The Ultimate Sacrifice', type: 'Schism', cost: 12, branch: 1.5, depth: 6.5, prerequisite: 'schism_vigil', description: "Permanently sacrifice aspects of yourself to grant others power, becoming less human with each use." }
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
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'shield_of_people', constellation: 'steel', position: { x, y }, prerequisites, visual: { color: '#B0C4DE', size: 50, icon: 'default' }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost, exclusiveWith: (nodeData as any).exclusiveWith || []
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
export const SHIELD_OF_PEOPLE_NODES = nodes;
export function generateShieldOfPeopleConnections(): TalentConnection[] { return connections; }
export const SHIELD_OF_PEOPLE_METADATA = {
  name: 'The Shield of the People',
  philosophy: "Strength means nothing if you cannot protect what matters.",
  essence: 'Defensive mastery, group tactics, inspiring leadership.',
  focus: 'Shield Arts, Formation Fighting, Battlefield Command.',
  sacredAnimal: 'The Bear',
  emoji: '🛡️',
  color: '#B0C4DE',
  position: { x: 1000, y: 500 }
}; 