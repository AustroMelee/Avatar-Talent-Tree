/**
 * Path 1: The Pillar of Hun Yuan (Neutral Jing) - "The Waiting Stone"
 * Philosophy: "Listen and wait. The earth teaches patience. Strike when the moment is perfect."
 * Focus: Defensive mastery, seismic awareness, perfect timing, counter-attacks.
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

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Pillar of Hun Yuan Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Gain Seismic Sense, allowing you to 'see' and feel vibrations through the earth.", flavor: "The earth speaks to those who listen." },

    // SUB-PATH A
    { id: 'A1', name: 'Rooted Stance', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Anchor yourself to the ground, becoming immune to knockback and staggers.", flavor: "Be as the mountain: unmoved, unyielding." },
    { id: 'minor_a1_1', name: 'Deeper Roots', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your connection to the earth is stronger, making you even more resistant to movement.", flavor: "The deeper the roots, the stronger the tree." },
    { id: 'minor_a1_2', name: 'Wider Stance', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your rooted stance affects a larger area around you.", flavor: "The mountain's shadow is long." },
    { id: 'minor_a1_3', name: 'Unshakeable Foundation', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your rooted stance also protects nearby allies from knockback.", flavor: "The mountain shelters all who seek refuge." },
    
    { id: 'A2', name: 'Tremor Echo', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Your Seismic Sense is now precise enough to reveal the exact number and location of enemies.", flavor: "Every footstep is a drumbeat on the skin of the world." },
    { id: 'minor_a2_1', name: 'Clearer Echo', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your seismic sense reveals more details about detected enemies.", flavor: "The earth's voice grows clearer." },
    { id: 'minor_a2_2', name: 'Longer Echo', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your seismic sense can detect enemies from further away.", flavor: "The earth's voice carries far." },
    { id: 'minor_a2_3', name: 'Echo Sharing', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your seismic sense can be shared with nearby allies.", flavor: "The earth speaks to all who listen." },
    
    { id: 'A3', name: 'Earth Sonar', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Send a powerful vibration through the earth, revealing the entire area map and highlighting all enemies, even through walls.", flavor: "There are no secrets from the stone." },
    { id: 'minor_a3_1', name: 'Larger Sonar', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your earth sonar covers a larger area.", flavor: "The stone's voice echoes far." },
    { id: 'minor_a3_2', name: 'Clearer Sonar', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your earth sonar reveals more detailed information about the environment.", flavor: "The stone reveals all secrets." },
    { id: 'minor_a3_3', name: 'Faster Sonar', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your earth sonar can be used more frequently.", flavor: "The stone speaks when called." },
    
    { id: 'APEX_A', name: 'One with the Stone', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Your Seismic Sense becomes a permanent, passive state. You are always aware of all movement on the ground around you.", flavor: "My senses are not my own; they are the earth's." },
    { id: 'minor_apex_a_1', name: 'Wider Awareness', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your seismic awareness covers a larger area.", flavor: "The earth's awareness spreads far." },
    { id: 'minor_apex_a_2', name: 'Deeper Awareness', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your seismic awareness can detect movement underground.", flavor: "The earth's secrets are revealed." },
    { id: 'minor_apex_a_3', name: 'Shared Awareness', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Your seismic awareness can be shared with allies at greater distances.", flavor: "The earth speaks to all." },

    // SUB-PATH B
    { id: 'B1', name: 'Patient Response', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "After successfully blocking an attack with an earth shield, your next attack is faster and deals more damage.", flavor: "Wait for the opening. Then strike." },
    { id: 'minor_b1_1', name: 'Faster Response', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your counter-attack after blocking is even faster.", flavor: "The patient strike is swift." },
    { id: 'minor_b1_2', name: 'Stronger Response', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your counter-attack after blocking deals even more damage.", flavor: "The patient strike is deadly." },
    { id: 'minor_b1_3', name: 'Longer Window', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "You have more time to execute your counter-attack after blocking.", flavor: "Patience rewards the prepared." },
    
    { id: 'B2', name: 'Earthen Reversal', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Time a block perfectly to absorb the kinetic energy of an attack, unleashing it as a concussive blast.", flavor: "The earth takes all blows and returns them in its own time." },
    { id: 'minor_b2_1', name: 'Larger Blast', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "The concussive blast from your reversal is larger and more damaging.", flavor: "The earth's answer is thunderous." },
    { id: 'minor_b2_2', name: 'Faster Reversal', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "You can perform earthen reversals more quickly and reliably.", flavor: "The earth responds swiftly." },
    { id: 'minor_b2_3', name: 'Directed Blast', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "You can control the direction of your concussive blast.", flavor: "The earth's fury is directed." },
    
    { id: 'B3', name: 'The Unbreakable Wall', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "When you block, you automatically raise a wall of stone that reflects all incoming projectiles for a short duration.", flavor: "Let them throw their fury at the mountain. The mountain will not care." },
    { id: 'minor_b3_1', name: 'Taller Wall', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your unbreakable wall is taller and harder to bypass.", flavor: "The wall reaches for the sky." },
    { id: 'minor_b3_2', name: 'Longer Duration', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your unbreakable wall lasts longer.", flavor: "The wall endures." },
    { id: 'minor_b3_3', name: 'Wider Wall', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your unbreakable wall covers a wider area.", flavor: "The wall protects all." },
    
    { id: 'APEX_B', name: 'Law of Inevitable Return', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "After a successful block, perfectly counter the next attack against you, nullifying its damage and stunning the attacker.", flavor: "Every action has an equal and opposite reaction. I am that reaction." },
    { id: 'minor_apex_b_1', name: 'Faster Counter', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your perfect counter happens more quickly.", flavor: "The earth's response is instant." },
    { id: 'minor_apex_b_2', name: 'Stronger Counter', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your perfect counter deals more damage and stuns longer.", flavor: "The earth's answer is devastating." },
    { id: 'minor_apex_b_3', name: 'Multiple Counters', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can counter multiple attacks in succession.", flavor: "The earth answers all challenges." },

    // SUB-PATH C
    { id: 'C1', name: 'Stone Shell', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Coat your body in a thin, flexible layer of rock, granting a significant boost to your armor.", flavor: "The best defense is to be harder than what hits you." },
    { id: 'minor_c1_1', name: 'Thicker Shell', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your stone shell provides even greater protection.", flavor: "The mountain's skin is thick." },
    { id: 'minor_c1_2', name: 'Flexible Armor', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Your stone shell is more flexible and doesn't impede movement.", flavor: "Stone can flow like water." },
    { id: 'minor_c1_3', name: 'Self-Repairing', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your stone shell automatically repairs itself over time.", flavor: "The mountain heals its own wounds." },
    
    { id: 'C2', name: 'Reinforced Form', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Your Earth Armor can now absorb a single heavy blow, shattering but leaving you unharmed.", flavor: "The shell may crack, but the core remains." },
    { id: 'minor_c2_1', name: 'Multiple Layers', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your earth armor can absorb multiple heavy blows before shattering.", flavor: "The mountain has many layers." },
    { id: 'minor_c2_2', name: 'Faster Recovery', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your earth armor reforms more quickly after shattering.", flavor: "The mountain rebuilds swiftly." },
    { id: 'minor_c2_3', name: 'Explosive Shatter', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "When your earth armor shatters, it creates a damaging explosion.", flavor: "Even in destruction, the mountain strikes back." },
    
    { id: 'C3', name: 'Fortress of One', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Instantly erect a dome of rock around yourself, providing temporary, absolute protection from all directions.", flavor: "My will is my fortress." },
    { id: 'minor_c3_1', name: 'Larger Fortress', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your fortress dome is larger and can protect allies.", flavor: "The fortress shelters all." },
    { id: 'minor_c3_2', name: 'Longer Fortress', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your fortress dome lasts longer.", flavor: "The fortress endures." },
    { id: 'minor_c3_3', name: 'Mobile Fortress', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Your fortress dome can move with you.", flavor: "The fortress follows the master." },
    
    { id: 'APEX_C', name: 'The Unmovable Mountain', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "For a short duration, become truly invulnerable to all forms of damage, but you cannot move.", flavor: "I am the mountain. I will not be moved." },
    { id: 'minor_apex_c_1', name: 'Longer Invulnerability', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your invulnerability lasts longer.", flavor: "The mountain stands eternal." },
    { id: 'minor_apex_c_2', name: 'Mountain Aura', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "While invulnerable, you radiate an aura that protects nearby allies.", flavor: "The mountain's shadow protects." },
    { id: 'minor_apex_c_3', name: 'Mountain\'s Revenge', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "When your invulnerability ends, you release a powerful shockwave that damages enemies.", flavor: "The mountain's awakening is felt by all." },

    // ENDGAME
    { id: 'rite_patience', name: 'Trial of Patience', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Withstand a continuous onslaught for one minute without attacking, using only defensive maneuvers.", flavor: "Patience is the ultimate weapon." },
    { id: 'rite_insight', name: 'Trial of Insight', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Defeat a foe using only counter-attacks triggered by their own moves.", flavor: "Use the enemy's strength as a weapon against them." },
    { id: 'rite_stone', name: 'Trial of Stone', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Hold your ground against an unstoppable force without yielding an inch.", flavor: "The stone endures." },
    { id: 'cap_neutral_jing', name: 'Embodiment of Neutral Jing', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_patience', description: "You have mastered the art of waiting. Time seems to slow around you, allowing you to react to threats with supernatural calm and precision.", flavor: "I do not need to see. The earth shows me everything." },
    { id: 'cap_perfect_counter', name: 'The Perfect Counter', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_insight', description: "Your counter-attacks are now instant and automatic, reflecting the full force of any attack back at its source.", flavor: "Do not bother attacking. You will only defeat yourself." },
    { id: 'cap_immovable_object', name: 'The Immovable Object', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_stone', description: "Your connection to the earth is absolute. You are permanently immune to forced movement, and your defensive abilities have no cooldown.", flavor: "I am the anchor of the world." },
    { id: 'schism_first_strike', name: 'Stone\'s First Strike', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Abandon patience. Your seismic sense now predicts enemy actions, allowing you to strike first with devastating force, but your defensive skills are weakened.", flavor: "Why wait for the storm when you can be the earthquake?" },
    { id: 'schism_brittle_prison', name: 'Brittle Prison', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_first_strike', description: "You encase enemies in stone prisons, but these prisons are unstable and explode, harming anyone nearby, including you and your allies.", flavor: "Patience is a cage. I prefer explosions." },
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
        id,
        name: nodeData.name,
        description: nodeData.description,
        flavor: nodeData.flavor,
        type: nodeData.type as NodeType,
        path: 'hun_yuan',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#8B4513',
            size: 50,
            icon: getHunYuanNodeIcon(type)
        },
        effects: [],
        isVisible: true,
        isAllocatable: prerequisites.length === 0,
        isAllocated: false,
        isLocked: prerequisites.length > 0,
        isPermanentlyLocked: false,
        pkCost: nodeData.cost
    };
    
    nodes.push(node);
    nodeMap[id] = node;
    
    prerequisites.forEach(prereqId => {
        connections.push({
            from: prereqId,
            to: id,
            isActive: false,
            isLocked: false
        });
    });
});

// Collision resolution
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
export const HUN_YUAN_NODES = nodes;
export const HUN_YUAN_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateHunYuanConnections(): TalentConnection[] {
    return connections;
}
export const HUN_YUAN_METADATA = {
    name: 'The Pillar of Hun Yuan',
    philosophy: "Listen and wait. The earth teaches patience.",
    essence: "Neutral Jing, waiting and listening.",
    focus: "Defensive mastery, seismic awareness, counter-attacks.",
    sacredAnimal: "The Badger-mole",
    emoji: '🦡',
    color: '#D2B48C',
    position: { x: 800, y: 400 }
};

function getHunYuanNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '👂';
        case 'Keystone': return '🛡️';
        case 'Manifestation': return '🧱';
        case 'Axiom': return '⛰️';
        case 'Capstone': return '🧘';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💥';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}