/**
 * Path 3: The Pillar of Gang Qiang (Unyielding Strength) - "The Eternal Mountain"
 * Philosophy: "Some things must never bend. Be the mountain that weathers all storms."
 * Focus: Raw power, overwhelming force, immovable defense, brutal offense.
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

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Pillar of Gang Qiang Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your earthbending embodies the mountain's eternal strength. Your attacks are slower but hit with immense force.", flavor: "Be the mountain." },

    // SUB-PATH A
    { id: 'A1', name: 'Boulder Hurl', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Rip a massive boulder from the earth and hurl it, crushing a single target.", flavor: "Simple. Direct. Effective." },
    { id: 'minor_a1_1', name: 'Larger Boulder', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your boulders are larger and deal more damage.", flavor: "Bigger is better." },
    { id: 'minor_a1_2', name: 'Faster Throw', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "You can hurl boulders more quickly.", flavor: "The mountain's arm is swift." },
    { id: 'minor_a1_3', name: 'Precise Targeting', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your boulder throws are more accurate and can target specific areas.", flavor: "The mountain's aim is true." },
    
    { id: 'A2', name: 'Earthquake Stomp', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Slam your foot down to create a localized earthquake, knocking all nearby enemies off their feet.", flavor: "The world trembles when I command it." },
    { id: 'minor_a2_1', name: 'Larger Quake', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your earthquake affects a larger area.", flavor: "The tremor spreads further." },
    { id: 'minor_a2_2', name: 'Stronger Tremor', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your earthquake deals more damage and affects larger enemies.", flavor: "The earth's fury is great." },
    { id: 'minor_a2_3', name: 'Longer Stun', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Enemies remain knocked down longer after your earthquake.", flavor: "The earth's memory is long." },
    
    { id: 'A3', name: 'Avalanche Charge', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Charge forward, encased in a shell of rock and debris. You are unstoppable and damage everything in your path.", flavor: "I am the avalanche. Get out of the way." },
    { id: 'minor_a3_1', name: 'Faster Charge', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your avalanche charge moves faster and is harder to avoid.", flavor: "The avalanche cannot be outrun." },
    { id: 'minor_a3_2', name: 'Longer Charge', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your avalanche charge can travel further before stopping.", flavor: "The avalanche's path is long." },
    { id: 'minor_a3_3', name: 'Wider Path', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your avalanche charge affects a wider area and damages more enemies.", flavor: "The avalanche leaves no survivors." },
    
    { id: 'APEX_A', name: 'World Breaker', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Your attacks are so powerful they shatter the very ground, creating permanent, impassable chasms.", flavor: "I do not shape the world. I break it." },
    { id: 'minor_apex_a_1', name: 'Larger Chasms', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your world-breaking attacks create larger and more devastating chasms.", flavor: "The world's wounds are deep." },
    { id: 'minor_apex_a_2', name: 'Faster Breaking', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "You can shatter the ground more quickly and efficiently.", flavor: "The world breaks at my command." },
    { id: 'minor_apex_a_3', name: 'Multiple Breaks', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can create multiple chasms simultaneously.", flavor: "The world shatters in many places." },

    // SUB-PATH B
    { id: 'B1', name: 'Immovable Stance', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Your defensive stance can withstand even the most powerful of blows without breaking.", flavor: "Let them try. The mountain does not care." },
    { id: 'minor_b1_1', name: 'Stronger Stance', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your defensive stance is even more resilient.", flavor: "The mountain stands firm." },
    { id: 'minor_b1_2', name: 'Wider Stance', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your defensive stance protects a larger area around you.", flavor: "The mountain's shadow is long." },
    { id: 'minor_b1_3', name: 'Unshakeable Foundation', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your stance also protects nearby allies from knockback and stuns.", flavor: "The mountain shelters all." },
    
    { id: 'B2', name: 'Spike Barricade', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Erect a wall of sharp stone spikes that damages any enemy who tries to cross it.", flavor: "My defense is an attack." },
    { id: 'minor_b2_1', name: 'Sharper Spikes', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Your spike barricade deals more damage to enemies.", flavor: "The mountain's teeth are sharp." },
    { id: 'minor_b2_2', name: 'Taller Barricade', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your spike barricade is taller and harder to jump over.", flavor: "The mountain's wall reaches high." },
    { id: 'minor_b2_3', name: 'Wider Barricade', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your spike barricade extends further to the sides.", flavor: "The mountain's protection is vast." },
    
    { id: 'B3', name: 'Pillar of the Earth', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Summon a colossal pillar of rock from the ground that can be used as a platform, a shield, or a devastating weapon.", flavor: "Reach for the sky, but be rooted in the earth." },
    { id: 'minor_b3_1', name: 'Taller Pillar', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your earth pillar is taller and provides better elevation.", flavor: "The pillar reaches for the heavens." },
    { id: 'minor_b3_2', name: 'Stronger Pillar', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your earth pillar is more durable and can withstand more damage.", flavor: "The pillar is unbreakable." },
    { id: 'minor_b3_3', name: 'Multiple Pillars', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "You can summon multiple earth pillars simultaneously.", flavor: "The mountain has many fingers." },
    
    { id: 'APEX_B', name: 'One with the Mountain', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Merge with any earthen surface, becoming completely invulnerable and regenerating health, but you cannot move or act.", flavor: "To rest is to become one with the stone." },
    { id: 'minor_apex_b_1', name: 'Faster Merging', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "You can merge with the earth more quickly.", flavor: "The mountain welcomes you swiftly." },
    { id: 'minor_apex_b_2', name: 'Better Regeneration', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your health regeneration while merged is faster and more effective.", flavor: "The mountain's healing is strong." },
    { id: 'minor_apex_b_3', name: 'Deeper Merge', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can merge deeper into the earth, making you harder to detect.", flavor: "The mountain hides you well." },

    // SUB-PATH C
    { id: 'C1', name: 'Shockwave Clap', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Clap your hands to send a focused shockwave of force through the air, staggering distant enemies.", flavor: "The air itself is a stone to be thrown." },
    { id: 'minor_c1_1', name: 'Stronger Shockwave', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your shockwave clap is more powerful and affects enemies at greater range.", flavor: "The mountain's voice is thunder." },
    { id: 'minor_c1_2', name: 'Faster Clap', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "You can perform shockwave claps more quickly.", flavor: "The mountain's hands are swift." },
    { id: 'minor_c1_3', name: 'Wider Shockwave', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your shockwave affects a wider area and hits more enemies.", flavor: "The mountain's voice echoes far." },
    
    { id: 'C2', name: 'Deep Fissure', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Punch the ground to open a fissure that travels in a straight line, damaging and slowing all enemies it passes through.", flavor: "The deepest wounds are not on the surface." },
    { id: 'minor_c2_1', name: 'Longer Fissure', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your fissures travel further and deal more damage.", flavor: "The earth's wounds run deep." },
    { id: 'minor_c2_2', name: 'Deeper Fissure', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your fissures are deeper and more difficult to cross.", flavor: "The earth's wounds are deep." },
    { id: 'minor_c2_3', name: 'Wider Fissure', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your fissures are wider and affect more enemies.", flavor: "The earth's wounds are vast." },
    
    { id: 'C3', name: 'Tectonic Shift', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Drastically reshape the battlefield, raising or lowering large sections of the terrain to create advantages.", flavor: "The battlefield is whatever I wish it to be." },
    { id: 'minor_c3_1', name: 'Larger Shift', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your tectonic shifts affect larger areas of the battlefield.", flavor: "The earth's changes are vast." },
    { id: 'minor_c3_2', name: 'Faster Shift', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your tectonic shifts happen more quickly.", flavor: "The earth answers swiftly." },
    { id: 'minor_c3_3', name: 'Multiple Shifts', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "You can perform multiple tectonic shifts simultaneously.", flavor: "The earth dances to many tunes." },
    
    { id: 'APEX_C', name: 'Planet Core Attunement', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Draw power directly from the planet's core, massively amplifying the scale and power of all your earthbending abilities.", flavor: "My strength is not my own. It is the strength of the world." },
    { id: 'minor_apex_c_1', name: 'Stronger Attunement', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your connection to the planet's core is stronger and provides more power.", flavor: "The world's strength flows freely." },
    { id: 'minor_apex_c_2', name: 'Longer Attunement', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "You can maintain your attunement to the planet's core longer.", flavor: "The world's power endures." },
    { id: 'minor_apex_c_3', name: 'Deeper Attunement', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Your attunement reaches deeper into the planet's core for even greater power.", flavor: "The world's heart beats with mine." },

    // ENDGAME
    { id: 'rite_strength', name: 'Trial of Unyielding Strength', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Stop a charging catapult with a single, perfectly-timed blow.", flavor: "Strength is not just power, but timing." },
    { id: 'rite_endurance', name: 'Trial of the Eternal Mountain', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Withstand the force of a waterfall for three days and three nights without moving.", flavor: "The water wears away the stone, but the mountain remains." },
    { id: 'rite_will', name: 'Trial of Will', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Hold two tectonic plates together through sheer force of will during an earthquake.", flavor: "My will is stronger than the world's." },
    { id: 'cap_colossus', name: 'The Stone Colossus', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_strength', description: "Animate and inhabit a massive golem made of earth and stone, becoming a walking engine of destruction.", flavor: "I am the mountain, and I have come to you." },
    { id: 'cap_earthshaker', name: 'The Earthshaker', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_endurance', description: "Your mastery over tectonic forces is absolute. You can create massive earthquakes, raise mountain ranges, or sink islands at will.", flavor: "The world shifts at my command." },
    { id: 'cap_titan', name: 'The Titan of Earth', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_will', description: "You fuse your body with the earth itself, becoming a giant of immense strength and resilience. Your physical power is unmatched.", flavor: "My fists are mountains." },
    { id: 'schism_petrified_heart', name: 'Petrified Heart', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your skin turns to stone, granting immense defense, but you become incredibly slow and your bending lacks finesse.", flavor: "To be strong, one must be unfeeling." },
    { id: 'schism_reckless_force', name: 'Reckless Force', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_petrified_heart', description: "You sacrifice all defense for pure, overwhelming power. Your attacks are devastating, but you take double damage from all sources.", flavor: "The best defense is a shattered enemy." },
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
        path: 'gang_qiang',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#8B4513',
            size: 50,
            icon: getGangQiangNodeIcon(type)
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
export const GANG_QIANG_NODES = nodes;
export const GANG_QIANG_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateGangQiangConnections(): TalentConnection[] {
    return connections;
}
export const GANG_QIANG_METADATA = {
    name: 'The Pillar of Gang Qiang',
    philosophy: "Some things must never bend. Be the mountain that weathers all storms.",
    essence: "Unyielding strength and raw power.",
    focus: "Immovable defense, overwhelming offense, brutal techniques.",
    sacredAnimal: "The Bear",
    emoji: '🐻',
    color: '#D2B48C',
    position: { x: 800, y: 600 }
};

function getGangQiangNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '👊';
        case 'Keystone': return '💪';
        case 'Manifestation': return '🌋';
        case 'Axiom': return '🏋️';
        case 'Capstone': return '🗿';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💔';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}