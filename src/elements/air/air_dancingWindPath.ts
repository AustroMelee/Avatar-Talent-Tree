/**
 * Path 4: The Dancing Wind - 舞風 (Wǔ Fēng)
 * Philosophy: "True freedom is found in movement, in the joyous dance between the earth and the sky."
 * Essence: Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const nodeDataList = [
    { id: 'genesis', name: 'The Dancing Wind Path', type: 'Genesis', cost: 1, description: "Your balance becomes flawless. You move with a light, acrobatic grace, and your jumps carry you further and land you softer.", flavor: "The wind is bound to nothing." },
    
    // Minors after Genesis
    { id: 'minor_gen_1', name: 'Graceful Descent', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can use minor air currents to slow any fall, preventing damage from all but the most extreme heights.", flavor: "Falling with style." },
    { id: 'minor_gen_2', name: 'Uplifting Spirit', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your acrobatic movements inspire and energize your allies, boosting their morale.", flavor: "A dance of hope." },
    { id: 'minor_gen_3', name: 'Vertical Rider', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can ride air currents vertically, allowing you to scale walls and cliffs with ease.", flavor: "The world is a playground." },
    { id: 'minor_gen_4', name: 'Enduring Flight', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your stamina for sustained flight and aerial maneuvers is significantly increased.", flavor: "Never tire of the sky." },
    { id: 'minor_gen_5', name: 'Wind Dancer', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can perform complex aerial maneuvers and acrobatics with minimal effort.", flavor: "Poetry in motion." },

    // Sub-Path A - Aspect of Mobility
    { id: 'a1_air_scooter', name: 'Air Scooter', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_1', description: "Form and ride a sphere of rapidly spinning air for high-speed travel and agile maneuvering.", flavor: "Aang's signature invention." },
    { id: 'a1_minor_1', name: 'All-Terrain Scooter', type: 'Minor', cost: 1, prerequisite: 'a1_air_scooter', description: "You can maintain the scooter's form while riding up vertical walls or briefly across water.", flavor: "The world is your road." },
    { id: 'a1_minor_2', name: 'Scooter Combat', type: 'Minor', cost: 1, prerequisite: 'a1_air_scooter', description: "You can fight effectively while riding the air scooter, using it for both mobility and as a weapon.", flavor: "A joyful offense." },
    { id: 'a1_minor_3', name: 'Tandem Riding', type: 'Minor', cost: 1, prerequisite: 'a1_air_scooter', description: "You can carry a passenger on your air scooter without losing control or speed.", flavor: "Share the ride." },

    { id: 'a2_air_spout', name: 'Air Spout', type: 'Manifestation', cost: 4, prerequisite: 'a1_air_scooter', description: "Create a powerful upward current of air to lift you high into the sky for sustained flight.", flavor: "Ride the heavens." },
    { id: 'a2_minor_1', name: 'Gliding', type: 'Minor', cost: 1, prerequisite: 'a2_air_spout', description: "You master the use of a glider, using it with your bending to fly as long as you can maintain air currents.", flavor: "The wings of a nomad." },
    { id: 'a2_minor_2', name: 'Aerial Combat', type: 'Minor', cost: 1, prerequisite: 'a2_air_spout', description: "You can fight effectively while using the air spout, maintaining control and accuracy in flight.", flavor: "The high ground is yours." },
    { id: 'a2_minor_3', name: 'Wind Surfing', type: 'Minor', cost: 1, prerequisite: 'a2_air_spout', description: "You can ride air currents horizontally, allowing for high-speed travel across open areas.", flavor: "Surf the sky." },

    { id: 'a3_flight_mastery', name: 'Flight Mastery', type: 'Axiom', cost: 5, prerequisite: 'a2_air_spout', description: "Achieve true, unaided flight, soaring through the skies with complete freedom and control.", flavor: "Let go your earthly tether. Enter the void. Empty, and become wind." },
    { id: 'a3_minor_1', name: 'Storm Flying', type: 'Minor', cost: 1, prerequisite: 'a3_flight_mastery', description: "You can fly safely through storms and adverse weather conditions.", flavor: "The storm cannot hold you." },
    { id: 'a3_minor_2', name: 'High Altitude', type: 'Minor', cost: 1, prerequisite: 'a3_flight_mastery', description: "You can reach incredible heights and maintain flight at high altitudes.", flavor: "Touch the heavens." },

    // Sub-Path B - Aspect of Acrobatic Grace
    { id: 'b1_air_walking', name: 'Air Walking', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_2', description: "Create solid platforms of compressed air beneath your feet, allowing you to walk on air.", flavor: "The sky is a staircase." },
    { id: 'b1_minor_1', name: 'Air Stairs', type: 'Minor', cost: 1, prerequisite: 'b1_air_walking', description: "You can create a series of air platforms to climb to great heights or cross large gaps.", flavor: "A bridge to nowhere." },
    { id: 'b1_minor_2', name: 'Floating Combat', type: 'Minor', cost: 1, prerequisite: 'b1_air_walking', description: "You can fight effectively while walking on air, using the platforms for both mobility and tactical advantage.", flavor: "Combat on a higher plane." },

    { id: 'b2_wind_dancing', name: 'Wind Dancing', type: 'Manifestation', cost: 4, prerequisite: 'b1_air_walking', description: "Your movements become a beautiful, deadly dance. Perform incredible acrobatic feats and use momentum to enhance attacks.", flavor: "The body as a poem." },
    { id: 'b2_minor_1', name: 'Dance of Death', type: 'Minor', cost: 1, prerequisite: 'b2_wind_dancing', description: "Your acrobatic movements become a form of combat, allowing you to strike from unexpected angles.", flavor: "Beauty and danger entwined." },
    { id: 'b2_minor_2', name: 'Graceful Evasion', type: 'Minor', cost: 1, prerequisite: 'b2_wind_dancing', description: "Your dance-like movements make you incredibly difficult to hit, as you flow around attacks with elegant precision.", flavor: "Can't touch this." },

    { id: 'b3_skys_embrace', name: 'The Sky\'s Embrace', type: 'Axiom', cost: 5, prerequisite: 'b2_wind_dancing', description: "You become one with the wind, able to move through the air as if it were water. Perform impossible feats of acrobatics.", flavor: "The sky welcomes you as its own." },
    { id: 'b3_minor_1', name: 'Wind Whisperer', type: 'Minor', cost: 1, prerequisite: 'b3_skys_embrace', description: "You can communicate with and understand the wind itself, gaining insights into weather patterns and air currents.", flavor: "The wind speaks to you." },
    { id: 'b3_minor_2', name: 'Freedom\'s Call', type: 'Minor', cost: 1, prerequisite: 'b3_skys_embrace', description: "Your presence inspires others to seek freedom and break free from their limitations.", flavor: "An inspiration to all." },
];

const nodes: TalentNode[] = nodeDataList.map(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const getIcon = (name: string): string => {
        if (name.includes('Flight')) return '🕊️';
        if (name.includes('Embrace')) return '🫂';
        if (name.includes('Scooter')) return '🛴';
        if (name.includes('Spout')) return '💨';
        if (name.includes('Dancing')) return '💃';
        if (name.includes('Walking')) return '🚶';
        if (d.type === 'Genesis') return '🤸';
        return '✨';
    };
    return {
        ...d,
        id: d.id,
        path: 'dancing_wind',
        constellation: 'air',
        position: { x: 0, y: 0 },
        prerequisites,
        visual: { color: '#F0F8FF', size: 50, icon: getIcon(d.name) },
        effects: [],
        isVisible: true,
        isAllocatable: !prerequisites.length,
        isAllocated: false,
        isLocked: !!prerequisites.length,
        isPermanentlyLocked: false,
        pkCost: d.cost,
        type: d.type as NodeType
    };
});

const connections: TalentConnection[] = [];
nodes.forEach(node => node.prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: node.id, isActive: false, isLocked: false });
}));

export const DANCING_WIND_NODES = nodes;
export function generateDancingWindConnections(): TalentConnection[] { return connections; }
export const DANCING_WIND_METADATA = {
    name: 'The Dancing Wind',
    philosophy: 'True freedom is not the absence of restraint, but perfect harmony with movement.',
    essence: 'Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.',
    focus: 'Pure mobility and freedom, culminating in the ultimate achievement of flight.',
    sacredAnimal: 'The Flying Lemur',
    emoji: '🐒',
    color: '#f0f8ff',
    position: { x: 800, y: 600 }
}; 