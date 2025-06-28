/**
 * Path 4: The Pillar of Jing Que (Precision Control) - "The Sculptor's Mind"
 * Philosophy: "True mastery lies not in moving mountains, but in commanding every grain of sand."
 * Focus: Fine control, enemy manipulation, architectural bending, artistic mastery.
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

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Pillar of Jing Que Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Your earthbending becomes an extension of your will, allowing for fine, precise movements.", flavor: "The greatest power is in the smallest motion." },

    // SUB-PATH A
    { id: 'A1', name: 'Earthen Puppetry', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Create small, animated constructs of rock to distract or harry your foes.", flavor: "Even a pebble can be a soldier in the right hands." },
    { id: 'minor_a1_1', name: 'More Puppets', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "You can create more earthen puppets at once.", flavor: "Many hands make light work." },
    { id: 'minor_a1_2', name: 'Smarter Puppets', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your earthen puppets are more intelligent and coordinated.", flavor: "The sculptor's mind guides many hands." },
    { id: 'minor_a1_3', name: 'Stronger Puppets', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your earthen puppets are more durable and deal more damage.", flavor: "The sculptor's hands are strong." },
    
    { id: 'A2', name: 'Dust Devil', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Manipulate fine particles of dust and rock to create a localized whirlwind that obscures vision and stings the eyes.", flavor: "The smallest things, in great numbers, can blind a giant." },
    { id: 'minor_a2_1', name: 'Larger Devil', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your dust devil covers a larger area and is more effective.", flavor: "The storm grows wider." },
    { id: 'minor_a2_2', name: 'Stronger Devil', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your dust devil deals more damage and is harder to resist.", flavor: "The storm grows fiercer." },
    { id: 'minor_a2_3', name: 'Longer Devil', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your dust devil lasts longer and is harder to disperse.", flavor: "The storm endures." },
    
    { id: 'A3', name: 'The Sculptor\'s Hand', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Manipulate an enemy's armor or clothing as if it were clay, restraining their movements or weighing them down.", flavor: "Why fight the warrior when you can fight his armor?" },
    { id: 'minor_a3_1', name: 'Stronger Hand', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your sculptor's hand can manipulate heavier and more complex armor.", flavor: "The sculptor's hand grows stronger." },
    { id: 'minor_a3_2', name: 'Faster Hand', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your sculptor's hand works more quickly and efficiently.", flavor: "The sculptor's hand moves swiftly." },
    { id: 'minor_a3_3', name: 'Precise Hand', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Your sculptor's hand can make more precise and subtle manipulations.", flavor: "The sculptor's hand is precise." },
    
    { id: 'APEX_A', name: 'Master of Marionettes', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Animate a full-sized, human-shaped golem of earth to fight alongside you, which you can command with your thoughts.", flavor: "My will, given form." },
    { id: 'minor_apex_a_1', name: 'Stronger Marionette', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your earth golem is stronger and more durable.", flavor: "The marionette grows stronger." },
    { id: 'minor_apex_a_2', name: 'Smarter Marionette', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your earth golem is more intelligent and can perform complex actions.", flavor: "The marionette grows wiser." },
    { id: 'minor_apex_a_3', name: 'Multiple Marionettes', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can control multiple earth golems simultaneously.", flavor: "The puppeteer controls many strings." },

    // SUB-PATH B
    { id: 'B1', name: 'Stone Gauntlets', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Encase your hands in rock, allowing you to catch and stop projectiles mid-air.", flavor: "What is a sword to a hand of stone?" },
    { id: 'minor_b1_1', name: 'Thicker Gauntlets', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your stone gauntlets provide better protection and grip.", flavor: "The sculptor's hands are strong." },
    { id: 'minor_b1_2', name: 'Faster Formation', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your stone gauntlets form more quickly.", flavor: "The stone answers swiftly." },
    { id: 'minor_b1_3', name: 'Flexible Gauntlets', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your stone gauntlets are more flexible and don't impede movement.", flavor: "The sculptor's hands are nimble." },
    
    { id: 'B2', name: 'Remote Bending', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "You can manipulate earth at a distance, without direct physical contact, as long as you can see it.", flavor: "My reach is as far as my sight." },
    { id: 'minor_b2_1', name: 'Greater Range', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Your remote bending has greater range and precision.", flavor: "The sculptor's eye sees far." },
    { id: 'minor_b2_2', name: 'Faster Remote', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your remote bending works more quickly and efficiently.", flavor: "The sculptor's will is swift." },
    { id: 'minor_b2_3', name: 'Multiple Remote', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "You can manipulate multiple earth objects remotely simultaneously.", flavor: "The sculptor's mind is vast." },
    
    { id: 'B3', name: 'Architectural Genius', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "You can rapidly construct complex structures like bridges, towers, and walls with perfect architectural integrity.", flavor: "The world is my quarry, and I am the architect." },
    { id: 'minor_b3_1', name: 'Faster Construction', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your architectural constructions are built more quickly.", flavor: "The architect's hand is swift." },
    { id: 'minor_b3_2', name: 'Stronger Structures', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your constructed structures are more durable and stable.", flavor: "The architect's work endures." },
    { id: 'minor_b3_3', name: 'Complex Structures', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "You can construct more complex and intricate architectural designs.", flavor: "The architect's vision grows complex." },
    
    { id: 'APEX_B', name: 'The World as Clay', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "You no longer see earth, but potential. You can transmute stone to sand, sand to glass, and back again, reshaping the very substance of the world.", flavor: "I do not move the earth. I ask it to become something new." },
    { id: 'minor_apex_b_1', name: 'Faster Transmutation', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your transmutation of earth materials happens more quickly.", flavor: "The world changes swiftly." },
    { id: 'minor_apex_b_2', name: 'Complex Transmutation', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "You can perform more complex transmutations and create new materials.", flavor: "The world's potential is vast." },
    { id: 'minor_apex_b_3', name: 'Larger Transmutation', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can transmute larger areas of earth at once.", flavor: "The world's changes are vast." },

    // SUB-PATH C
    { id: 'C1', name: 'Precision Shot', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Launch a small, pebble-sized rock with the speed and accuracy of an arrow.", flavor: "A single, well-placed stone can change the course of a river." },
    { id: 'minor_c1_1', name: 'Greater Accuracy', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your precision shots are more accurate and deal more damage.", flavor: "The sculptor's aim is true." },
    { id: 'minor_c1_2', name: 'Faster Shot', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "You can fire precision shots more quickly.", flavor: "The stone flies swifter." },
    { id: 'minor_c1_3', name: 'Longer Range', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your precision shots can travel further and maintain accuracy.", flavor: "The sculptor's reach is long." },
    
    { id: 'C2', name: 'Earthen Grip', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Cause a hand of rock to erupt from the ground, grabbing and holding an enemy in place.", flavor: "The earth has a strong grip." },
    { id: 'minor_c2_1', name: 'Stronger Grip', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your earthen grip is stronger and holds enemies longer.", flavor: "The earth's grasp is firm." },
    { id: 'minor_c2_2', name: 'Faster Grip', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your earthen grip forms more quickly and is harder to avoid.", flavor: "The earth's hand is swift." },
    { id: 'minor_c2_3', name: 'Multiple Grips', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "You can create multiple earthen grips simultaneously.", flavor: "The earth has many hands." },
    
    { id: 'C3', name: 'Splinter Volley', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Shatter a piece of earth into a thousand tiny, razor-sharp splinters, launching them in a wide cone.", flavor: "A thousand needles are more deadly than a single spear." },
    { id: 'minor_c3_1', name: 'More Splinters', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your splinter volley creates more projectiles.", flavor: "A thousand becomes ten thousand." },
    { id: 'minor_c3_2', name: 'Sharper Splinters', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your splinters are sharper and deal more damage.", flavor: "The needles cut like razors." },
    { id: 'minor_c3_3', name: 'Wider Volley', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Your splinter volley covers a wider area.", flavor: "The needles spread far." },
    
    { id: 'APEX_C', name: 'The Surgeon\'s Hand', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Your control is so precise you can perform feats of microsurgery, removing impurities or blockages from within a person's body with minimal harm.", flavor: "The difference between a weapon and a tool is intent." },
    { id: 'minor_apex_c_1', name: 'Faster Surgery', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your surgical procedures are performed more quickly.", flavor: "The surgeon's hand is swift." },
    { id: 'minor_apex_c_2', name: 'Precise Surgery', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your surgical procedures are more precise and cause less harm.", flavor: "The surgeon's hand is steady." },
    { id: 'minor_apex_c_3', name: 'Complex Surgery', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can perform more complex surgical procedures.", flavor: "The surgeon's skill grows deep." },

    // ENDGAME
    { id: 'rite_artistry', name: 'Trial of the Sculptor', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Recreate a masterpiece painting in a sand tapestry, perfect to the last grain.", flavor: "Art requires the most exacting control." },
    { id: 'rite_creation', name: 'Trial of Creation', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Build a functional, interlocking bridge over a chasm without setting foot on the other side.", flavor: "True creation comes from a distance." },
    { id: 'rite_precision', name: 'Trial of Precision', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Shoot a pebble to split a drop of water in two mid-fall.", flavor: "Perfection is the goal of every action." },
    { id: 'cap_geomancer', name: 'The Grand Geomancer', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_artistry', description: "You can manipulate the earth on a continental scale, slowly moving tectonic plates to create or destroy mountains over time.", flavor: "Patience and precision can reshape the world." },
    { id: 'cap_world_shaper', name: 'The World-Shaper', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_creation', description: "Your mastery of architecture becomes godlike. You can raise entire cities from the earth in moments.", flavor: "I do not build on the world. I build with it." },
    { id: 'cap_living_chisel', name: 'The Living Chisel', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_precision', description: "Your control is so absolute you can alter the bodies of living beings, healing or harming with a touch, reshaping flesh as if it were soft clay.", flavor: "All things are earth. Flesh, bone, stone. It is all the same." },
    { id: 'schism_unraveling', name: 'The Unraveling', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Instead of shaping earth, you learn to deconstruct it, causing stone to crumble to dust and metal to flake away, but this power is indiscriminate and affects your surroundings.", flavor: "It is easier to destroy than to create." },
    { id: 'schism_crystal_curse', name: 'The Crystal Curse', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_unraveling', description: "You can turn living beings into beautiful, inert crystal statues. The curse, however, has a chance to rebound, partially crystallizing your own limbs.", flavor: "Perfection is a beautiful, lifeless prison." },
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
        path: 'jing_que',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#8B4513',
            size: 50,
            icon: getJingQueNodeIcon(type)
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
export const JING_QUE_NODES = nodes;
export const JING_QUE_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateJingQueConnections(): TalentConnection[] {
    return connections;
}
export const JING_QUE_METADATA = {
    name: 'The Pillar of Jing Que',
    philosophy: "True mastery lies not in moving mountains, but in commanding every grain of sand.",
    essence: "Precision and fine control.",
    focus: "Enemy manipulation, architectural bending, artistic mastery.",
    sacredAnimal: "The Spider-fly",
    emoji: '🕷️',
    color: '#D2B48C',
    position: { x: 600, y: 500 }
};

function getJingQueNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '🤌';
        case 'Keystone': return '👌';
        case 'Manifestation': return '🏗️';
        case 'Axiom': return '✍️';
        case 'Capstone': return '🏛️';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '🥀';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}