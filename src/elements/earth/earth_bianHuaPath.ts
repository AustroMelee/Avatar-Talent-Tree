/**
 * Path 2: The Pillar of Bian Hua (Transformation) - "The Changing Earth"
 * Philosophy: "Earth is not just rock - it is metal waiting to be freed, lava waiting to flow."
 * Focus: Sub-bending mastery, material transformation, elemental fusion.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 1000;
const CENTER_Y = 500;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = 0; // To the right
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'The Pillar of Bian Hua Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Unlock the ability to sense and manipulate the base impurities within earth: sand, metal, and superheated rock.", flavor: "Earth is not just rock - it is metal waiting to be freed, lava waiting to flow." },

    // SUB-PATH A
    { id: 'A1', name: 'Metal Sheath', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Pull trace metals from the earth to coat your arms in sharp, metallic armor, enhancing unarmed strikes.", flavor: "The metal was always there. It just needed to be asked to come out." },
    { id: 'minor_a1_1', name: 'Thicker Sheath', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your metal sheath provides greater protection and damage.", flavor: "More metal, more power." },
    { id: 'minor_a1_2', name: 'Faster Formation', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your metal sheath forms more quickly and efficiently.", flavor: "The metal answers faster." },
    { id: 'minor_a1_3', name: 'Flexible Armor', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your metal sheath is more flexible and doesn't impede movement.", flavor: "Metal can flow like water." },
    
    { id: 'A2', name: 'Shrapnel Shot', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Launch a cluster of sharp metal fragments at your enemies, causing bleeding damage.", flavor: "A thousand small cuts can fell the greatest beast." },
    { id: 'minor_a2_1', name: 'More Shrapnel', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your shrapnel shots contain more metal fragments.", flavor: "More pieces, more pain." },
    { id: 'minor_a2_2', name: 'Faster Projectiles', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your shrapnel shots travel faster and are harder to dodge.", flavor: "The metal flies like lightning." },
    { id: 'minor_a2_3', name: 'Precise Targeting', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "Your shrapnel shots are more accurate and can target specific areas.", flavor: "The metal knows its target." },
    
    { id: 'A3', name: 'Liquid Mercury', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Your metalbending becomes fluid and precise, allowing you to wield whips and cables of liquid metal to disarm and restrain foes.", flavor: "Metal is not rigid. It is a river, waiting to flow." },
    { id: 'minor_a3_1', name: 'Longer Whips', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Your liquid metal whips have greater reach.", flavor: "The river flows far." },
    { id: 'minor_a3_2', name: 'Faster Flow', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your liquid metal responds more quickly to your commands.", flavor: "The metal flows like thought." },
    { id: 'minor_a3_3', name: 'Multiple Streams', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "You can control multiple streams of liquid metal simultaneously.", flavor: "Many rivers, one master." },
    
    { id: 'APEX_A', name: 'Master of Metal', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "You can bend processed metals with ease, manipulating armor, weapons, and structures as if they were clay.", flavor: "The city is just another mountain to be shaped." },
    { id: 'minor_apex_a_1', name: 'Greater Control', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your control over processed metals is even more precise.", flavor: "The metal bends to my will." },
    { id: 'minor_apex_a_2', name: 'Larger Manipulation', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "You can manipulate larger metal structures and objects.", flavor: "The city is my clay." },
    { id: 'minor_apex_a_3', name: 'Metal Sense', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can sense and locate metal objects within a large radius.", flavor: "The metal calls to me." },

    // SUB-PATH B
    { id: 'B1', name: 'Magma Burst', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Superheat a rock into a molten projectile that explodes on impact, leaving a pool of lava.", flavor: "The heart of the earth is fire." },
    { id: 'minor_b1_1', name: 'Larger Burst', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Your magma burst creates a larger explosion and lava pool.", flavor: "The earth's heart burns brighter." },
    { id: 'minor_b1_2', name: 'Hotter Magma', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "Your magma burns hotter and deals more damage.", flavor: "The core's fire is unquenchable." },
    { id: 'minor_b1_3', name: 'Faster Heating', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "You can superheat rocks into magma more quickly.", flavor: "The earth's heart answers swiftly." },
    
    { id: 'B2', name: 'Lava Surfing', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Create a wave of lava to ride, granting you high-speed mobility and leaving a fiery trail in your wake.", flavor: "Ride the fire, don't be consumed by it." },
    { id: 'minor_b2_1', name: 'Faster Surfing', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Your lava surfing is faster and more maneuverable.", flavor: "The flow carries you swifter." },
    { id: 'minor_b2_2', name: 'Longer Trail', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "Your lava trail lasts longer and deals more damage to enemies who follow.", flavor: "The path of fire endures." },
    { id: 'minor_b2_3', name: 'Wider Wave', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "Your lava wave is wider and can carry allies with you.", flavor: "The fire carries all who trust it." },
    
    { id: 'B3', name: 'Volcanic Eruption', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Strike the ground to create a fissure that erupts with lava, creating a massive area of denial and heavy damage.", flavor: "Unleash the planet's fury." },
    { id: 'minor_b3_1', name: 'Larger Eruption', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your volcanic eruption covers a larger area.", flavor: "The earth's fury spreads far." },
    { id: 'minor_b3_2', name: 'Longer Duration', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your volcanic eruption lasts longer and continues to deal damage.", flavor: "The earth's anger is slow to cool." },
    { id: 'minor_b3_3', name: 'Multiple Fissures', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "You can create multiple volcanic fissures simultaneously.", flavor: "The earth cracks in many places." },
    
    { id: 'APEX_B', name: 'Heart of the Volcano', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "You become immune to fire and lava damage, and can convert any earth beneath your feet into magma at will.", flavor: "I carry the world's fire within me." },
    { id: 'minor_apex_b_1', name: 'Greater Immunity', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your immunity to fire and lava extends to nearby allies.", flavor: "The volcano's heart protects all." },
    { id: 'minor_apex_b_2', name: 'Faster Conversion', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "You can convert earth to magma more quickly and efficiently.", flavor: "The earth melts at my touch." },
    { id: 'minor_apex_b_3', name: 'Larger Conversion', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can convert larger areas of earth to magma at once.", flavor: "The volcano's reach grows." },

    // SUB-PATH C
    { id: 'C1', name: 'Sand Cloud', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Create a swirling cloud of sand that blinds and chokes enemies, reducing their accuracy.", flavor: "The desert hides its face for a reason." },
    { id: 'minor_c1_1', name: 'Larger Cloud', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "Your sand cloud covers a larger area and is more effective.", flavor: "The desert's breath is vast." },
    { id: 'minor_c1_2', name: 'Denser Sand', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Your sand cloud is denser and more blinding.", flavor: "The storm obscures all." },
    { id: 'minor_c1_3', name: 'Longer Duration', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Your sand cloud persists longer and is harder to disperse.", flavor: "The desert's patience is endless." },
    
    { id: 'C2', name: 'Quicksand Trap', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Convert a patch of earth into treacherous quicksand, trapping and immobilizing enemies who enter.", flavor: "The softest ground can be the deadliest trap." },
    { id: 'minor_c2_1', name: 'Larger Trap', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your quicksand trap covers a larger area.", flavor: "The trap grows wider." },
    { id: 'minor_c2_2', name: 'Deeper Sink', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Enemies sink deeper and faster into your quicksand.", flavor: "The earth swallows all." },
    { id: 'minor_c2_3', name: 'Longer Trap', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your quicksand trap lasts longer and is harder to escape.", flavor: "The trap's patience is infinite." },
    
    { id: 'C3', name: 'Glass Shards', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Superheat sand into sharp, piercing shards of glass, which you can launch as a deadly projectile volley.", flavor: "Pressure and heat can turn a simple grain of sand into a razor's edge." },
    { id: 'minor_c3_1', name: 'More Shards', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your glass shard volleys contain more projectiles.", flavor: "A thousand razors fly." },
    { id: 'minor_c3_2', name: 'Sharper Shards', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your glass shards are sharper and deal more damage.", flavor: "The glass cuts like diamond." },
    { id: 'minor_c3_3', name: 'Faster Formation', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "You can create and launch glass shards more quickly.", flavor: "The sand becomes glass in an instant." },
    
    { id: 'APEX_C', name: 'Lord of the Desert', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "You can manipulate vast quantities of sand with ease, creating massive sandstorms or intricate sand sculptures with a wave of your hand.", flavor: "The desert is my kingdom, and every grain of sand is my subject." },
    { id: 'minor_apex_c_1', name: 'Larger Storms', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your sandstorms cover larger areas and are more devastating.", flavor: "The desert's fury grows." },
    { id: 'minor_apex_c_2', name: 'Complex Sculptures', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "You can create more intricate and detailed sand sculptures.", flavor: "The artist's hand grows skilled." },
    { id: 'minor_apex_c_3', name: 'Sand Control', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can control sand with even greater precision and at greater distances.", flavor: "Every grain obeys my will." },

    // ENDGAME
    { id: 'rite_metal', name: 'Trial of Purity', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Extract a single, perfectly pure sphere of metal from an unrefined meteor.", flavor: "The master sees not the rock, but the treasure within." },
    { id: 'rite_lava', name: 'Trial of the Inner Fire', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Submerge yourself in lava and emerge unharmed, proving your mastery over the earth's heart.", flavor: "To command the fire, you must become one with it." },
    { id: 'rite_sand', name: 'Trial of a Million Grains', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Construct a perfect, life-sized statue of yourself using only individual grains of sand.", flavor: "Mastery is not moving the mountain, but knowing every stone." },
    { id: 'cap_metal_avatar', name: 'Avatar of Iron', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_metal', description: "Become a living being of metal. Your body is nigh-indestructible, and you can reshape your limbs into weapons at will.", flavor: "Flesh is weak. Metal endures." },
    { id: 'cap_magma_incarnate', name: 'Magma Incarnate', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_lava', description: "Your body becomes a conduit for the planet's core. You can erupt from any patch of earth, creating volcanoes and rivers of fire.", flavor: "I am the world's burning heart." },
    { id: 'cap_sand_spirit', name: 'The Sand Spirit', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_sand', description: "Your body can dissolve into a cloud of sentient sand, making you immune to physical harm and able to travel on the wind.", flavor: "How can you strike what has no form?" },
    { id: 'schism_unstable_core', name: 'Unstable Core', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your lavabending becomes wildly powerful but dangerously unstable, causing random secondary explosions that can harm you.", flavor: "True power cannot be perfectly controlled." },
    { id: 'schism_metal_plague', name: 'Metal Plague', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_unstable_core', description: "Your metalbending now infects your enemies, slowly transmuting their bodies into inert metal, but this corruption also slowly afflicts you.", flavor: "If all is earth, then let all return to it." },
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
        path: 'bian_hua',
        constellation: 'earth',
        position: { x, y },
        prerequisites,
        visual: {
            color: '#8B4513',
            size: 50,
            icon: getBianHuaNodeIcon(type)
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
export const BIAN_HUA_NODES = nodes;
export const BIAN_HUA_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateBianHuaConnections(): TalentConnection[] {
    return connections;
}
export const BIAN_HUA_METADATA = {
    name: 'The Pillar of Bian Hua',
    philosophy: "Earth is not just rock - it is metal waiting to be freed, lava waiting to flow.",
    essence: "Transformation and sub-bending.",
    focus: "Metal, lava, and sand manipulation.",
    sacredAnimal: "The Salamander",
    emoji: '🦎',
    color: '#D2B48C',
    position: { x: 1000, y: 500 }
};

function getBianHuaNodeIcon(type: string): string {
    switch (type) {
        case 'Genesis': return '↔️';
        case 'Keystone': return '🔥';
        case 'Manifestation': return '⛓️';
        case 'Axiom': return '⏳';
        case 'Capstone': return '🌋';
        case 'GnosticRite': return '🙏';
        case 'Schism': return '☣️';
        case 'Minor': return '🪨';
        default: return '🪨';
    }
}