/**
 * Path 4: The Arsenal - "The Tools of the Trade" (Canonically Refactored)
 *
 * Path Philosophy: "A bender is born with one weapon. I have chosen a thousand."
 * Essence: Unparalleled skill with a variety of weapons, both melee and ranged.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- CORRECTED LAYOUT CONFIGURATION ---
const CENTER_X = 700; // Was 1400 - Fixed to create symmetrical layout
const CENTER_Y = 550; // Was 570 - Fixed to create symmetrical layout
const BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI; // Was Math.PI / 2 (Changed to Left)
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Guide) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Arsenal Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You are proficient with a single category of common weapons, such as swords, clubs, or a boomerang.", flavor: "The master warrior knows the perfect tool for any job." },
    // Minors after Genesis
    { id: 'ranged_mastery', name: 'Ranged Mastery', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You are a master markswoman, able to skillfully hit targets from a distance. Your accuracy is deadly.", flavor: "Mai developed this skill out of boredom, eventually reaching mastery." },
    { id: 'minor_rm_1', name: 'Pinning Shot', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'ranged_mastery', description: "You can use knives or stilettos to pin an opponent's clothes to a nearby surface, disabling them without causing fatal injury.", flavor: "Mai's preferred method of dealing with foes." },
    // Sub-Path A - Ranged Supremacy
    { id: 'A1', name: 'Quick Draw', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You can draw and fire/throw a ranged weapon with blinding speed. Your accuracy is such that you can reliably hit human-sized targets at range.", flavor: "The mind is the greatest weapon." },
    { id: 'minor_a1_1', name: 'Ricochet Shot', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "You can bounce thrown knives or other solid projectiles off of hard surfaces to strike targets behind cover.", flavor: "Build devices much faster than should be possible." },
    { id: 'minor_a1_2', name: 'Volley', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "You can throw multiple projectiles (e.g., a fan of knives) at once to strike a single target or multiple opponents in a cone.", flavor: "Keep devices running far beyond their normal lifespan." },
    { id: 'A2', name: 'Trick Ammunition', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'A1', description: "You are a master of employing specialized ammunition to control the battlefield.", flavor: "Technology is the great equalizer." },
    { id: 'minor_a2_1', name: 'Explosive Tips', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your arrows or projectiles are fitted with small explosive charges, perfect for creating diversions or destroying cover.", flavor: "Calculate perfect trajectories for any projectile weapon." },
    { id: 'minor_a2_2', name: 'Smoke Pellets', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "You can fire projectiles that release a cloud of thick smoke on impact.", flavor: "Create and safely handle explosive devices." },
    { id: 'minor_a2_3', name: 'Net Projectiles', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "You can launch projectiles that deploy a weighted net to entangle and trap an opponent.", flavor: "Build devices that operate themselves." },
    { id: 'yuyans_eye', name: 'Yuyan\'s Eye', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'ranged_mastery', description: "You achieve the legendary accuracy of the Yuyan Archers. You can hit a moving target in near-total darkness or perform other feats of seemingly impossible marksmanship.", flavor: "The pinnacle of ranged combat." },
    { id: 'minor_a3_1', name: 'Through the Eye of the Needle', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'yuyans_eye', description: "You can consistently hit minuscule weak spots on a target, such as the straps on a piece of armor or the trigger mechanism of a machine.", flavor: "Build devices that violate normal physical laws." },
    { id: 'minor_a3_2', name: 'Calculated Trajectory', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'yuyans_eye', description: "You can hit a target you cannot see by calculating the trajectory needed based on sound, reflection, or other environmental clues.", flavor: "Create mechanical beings with artificial intelligence." },
    // Sub-Path B - Melee Virtuosity
    { id: 'melee_virtuosity', name: 'Melee Virtuosity', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You master a single melee weapon (e.g., dual hook swords, war fans, a Jian sword) to the level of a true grandmaster.", flavor: "The greatest weapon is a mind that sees ten moves ahead." },
    { id: 'minor_mv_1', name: 'Improvised Weapon', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'melee_virtuosity', description: "You are so skilled you can use almost any object in your environment as if it were your chosen weapon.", flavor: "To a master, everything is a weapon." },
    { id: 'B2', name: 'A-Symmetrical Offense', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'melee_virtuosity', description: "You have mastered fighting with two different types of weapons simultaneously (e.g., a long sword and a short dagger), creating a confusing and unpredictable rhythm.", flavor: "Victory is inevitable." },
    { id: 'minor_b2_1', name: 'Blade and Chain', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "You specialize in combining a solid weapon with a flexible one (like a chain whip or rope dart), allowing you to attack and defend at multiple ranges simultaneously.", flavor: "Create plans that account for every possible variable." },
    { id: 'minor_b2_2', name: 'Guard Breaker', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your fighting style is adept at overwhelming a defensive opponent, using one weapon to bind or parry theirs while striking with the other.", flavor: "Defeat enemies through manipulation and mind games." },
    { id: 'swordsmanship', name: 'Swordsmanship', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'melee_virtuosity', description: "Under the tutelage of a master like Piandao, you learn the art of the sword, even forging your own blade from unique materials.", flavor: "Piandao told Sokka it was his creativity and intelligence that made him a true swordsman." },
    
    // Additional Minor Nodes
    { id: 'ar_minor_1', name: 'Weapon Bond', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You develop a deep connection with your chosen weapon, allowing you to use it with greater skill and precision.", flavor: "The weapon becomes an extension of your will." },
    { id: 'ar_minor_2', name: 'Quick Reload', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'ranged_mastery', description: "You can reload or draw new weapons with incredible speed, maintaining a constant barrage of attacks.", flavor: "Speed is the essence of survival." },
    { id: 'ar_minor_3', name: 'Weapon Throwing', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A1', description: "You can throw any melee weapon with deadly accuracy, turning it into a ranged weapon when needed.", flavor: "Every weapon serves every purpose." },
    { id: 'ar_minor_4', name: 'Blind Fighting', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'yuyans_eye', description: "You can fight effectively even when blinded, using sound and touch to locate and strike your enemies.", flavor: "The warrior's senses never fail." },
    { id: 'ar_minor_5', name: 'Weapon Mastery', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "You can quickly adapt to any new weapon, becoming proficient with it in a matter of minutes.", flavor: "The master of weapons is the master of all." },
];

// --- Generation Code ---
const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

function getArsenalNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '⚔️';
        case 'Keystone': return '🏹';
        case 'Manifestation': return '🗡️';
        case 'Axiom': return '🎯';
        case 'Capstone': return '👑';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '💔';
        case 'Minor': return '⚔️';
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
        id,
        name: nodeData.name,
        description: nodeData.description,
        flavor: nodeData.flavor,
        type: nodeData.type as NodeType,
        path: 'arsenal',
        constellation: 'steel',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#DDA0DD',
            size: 50,
            icon: getArsenalNodeIcon(type)
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
export const ARSENAL_NODES = nodes;
export const ARSENAL_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateArsenalConnections(): TalentConnection[] {
    return connections;
}
export const ARSENAL_METADATA = {
    name: 'The Arsenal',
    philosophy: "A bender is born with one weapon. I have chosen a thousand.",
    essence: "Unparalleled skill with a variety of weapons, both melee and ranged.",
    focus: "Masters of traditional weaponry, like Mai and Suki.",
    sacredAnimal: "The Wolf",
    emoji: '🐺',
    color: '#DDA0DD',
    position: { x: 700, y: 550 }
}; 