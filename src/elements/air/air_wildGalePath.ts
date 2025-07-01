/**
 * Path 3: The Wild Gale - 狂風 (Kuáng Fēng)
 * Philosophy: "Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action."
 * Essence: Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const nodeDataList = [
    { id: 'genesis', name: 'The Wild Gale Path', type: 'Genesis', cost: 1, description: "Your airbending attacks carry more concussive force. A simple air jab can now stagger an opponent.", flavor: "The focused fury of a hurricane." },
    
    // Minors after Genesis
    { id: 'minor_gen_1', name: 'Concussive Force', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your air attacks have a greater chance to stagger opponents.", flavor: "Hit like a stone wall." },
    { id: 'minor_gen_2', name: 'Shattering Gust', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your air blasts are more effective at breaking brittle objects.", flavor: "The wind that shatters." },
    { id: 'minor_gen_3', name: 'Razor\'s Edge', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can sharpen your air currents into cutting edges that can slice through materials.", flavor: "A razor-sharp wind." },
    { id: 'minor_gen_4', name: 'Storm\'s Heart', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your stamina recovers faster in windy or stormy conditions.", flavor: "The storm invigorates you." },
    { id: 'minor_gen_5', name: 'Sinister Whisper', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can create unsettling sounds with air manipulation, disorienting enemies.", flavor: "The wind screams." },

    // Sub-Path A - Aspect of Raw Power
    { id: 'a1_air_cannon', name: 'Air Cannon', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_1', description: "Fire a compressed sphere of air that explodes on impact, creating a powerful shockwave.", flavor: "A direct approach." },
    { id: 'a1_minor_1', name: 'Piercing Shot', type: 'Minor', cost: 1, prerequisite: 'a1_air_cannon', description: "Narrow the sphere into a lance-like shape, increasing its range but reducing its area of effect.", flavor: "A needle, not a hammer." },
    { id: 'a1_minor_2', name: 'Vacuum Burst', type: 'Minor', cost: 1, prerequisite: 'a1_air_cannon', description: "Upon impact, the cannon's explosion briefly creates a vacuum, pulling nearby enemies toward the point of impact.", flavor: "The void calls." },
    { id: 'a1_minor_3', name: 'Rapid Fire', type: 'Minor', cost: 1, prerequisite: 'a1_air_cannon', description: "You learn to form and fire smaller, less powerful versions of the Air Cannon in quick succession.", flavor: "A storm of blows." },
    
    { id: 'a2_unstoppable_typhoon', name: 'Unstoppable Typhoon', type: 'Manifestation', cost: 4, prerequisite: 'a1_air_cannon', description: "Channel a moving wall of wind that can sweep soldiers off their feet and deflect arrow volleys.", flavor: "A storm on the move." },
    { id: 'a2_minor_1', name: 'Rending Edge', type: 'Minor', cost: 1, prerequisite: 'a2_unstoppable_typhoon', description: "The leading edge of the typhoon is laced with sharp, shearing currents that can shred earth and metal defenses.", flavor: "The wind tears all asunder." },
    { id: 'a2_minor_2', name: 'Extended Front', type: 'Minor', cost: 1, prerequisite: 'a2_unstoppable_typhoon', description: "You can widen the wall of wind to cover a larger area, sacrificing some of its forward momentum.", flavor: "A broader path of destruction." },

    { id: 'a3_eye_of_hurricane', name: 'Eye of the Hurricane', type: 'Axiom', cost: 5, prerequisite: 'a2_unstoppable_typhoon', description: "Create a massive, stationary cyclone on the battlefield, trapping those inside and repelling those outside.", flavor: "All things bend to the storm's will." },
    { id: 'a3_minor_1', name: 'Lightning Rod', type: 'Minor', cost: 1, prerequisite: 'a3_eye_of_hurricane', description: "If natural storm clouds are present, you can guide lightning strikes from the sky into your hurricane.", flavor: "Command the heavens' fury." },
    { id: 'a3_minor_2', name: 'Spinning Vortex', type: 'Minor', cost: 1, prerequisite: 'a3_eye_of_hurricane', description: "You can collapse the hurricane inward with immense force, throwing everything caught inside toward the center.", flavor: "The crushing embrace." },

    // Sub-Path B - Aspect of Decisive Action
    { id: 'b1_wind_blades', name: 'Wind Blades', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_2', description: "Create crescent-shaped blades of air that can cut through wood, rope, and unarmored targets.", flavor: "The wind's sharp edge." },
    { id: 'b1_minor_1', name: 'Arcing Blades', type: 'Minor', cost: 1, prerequisite: 'b1_wind_blades', description: "Launch blades that curve in mid-air, allowing you to strike targets behind cover.", flavor: "No escape." },
    { id: 'b1_minor_2', name: 'Blade Vortex', type: 'Minor', cost: 1, prerequisite: 'b1_wind_blades', description: "You can create a small, defensive whirlwind of wind blades that orbits your body.", flavor: "A shield of knives." },
    { id: 'b1_minor_3', name: 'Ricochet Shot', type: 'Minor', cost: 1, prerequisite: 'b1_wind_blades', description: "Your blades are solid enough to bounce off one hard surface to strike a secondary target.", flavor: "The unpredictable path." },
    
    { id: 'b2_sound_bending', name: 'Sound Bending', type: 'Manifestation', cost: 4, prerequisite: 'b1_wind_blades', description: "Create a perfect vacuum and then collapse it, creating a deafening sonic boom.", flavor: "The thunder before the lightning." },
    { id: 'b2_minor_1', name: 'Amplifying Cone', type: 'Minor', cost: 1, prerequisite: 'b2_sound_bending', description: "You can focus the sonic boom into a cone, increasing its intensity and range in one direction.", flavor: "A focused shout." },
    { id: 'b2_minor_2', name: 'Silent Zone', type: 'Minor', cost: 1, prerequisite: 'b2_sound_bending', description: "Create a sphere of sound-dampening air, allowing for completely silent infiltration or conversation.", flavor: "The sound of silence." },

    { id: 'b3_suffocation', name: 'Suffocation', type: 'Axiom', cost: 5, prerequisite: 'b2_sound_bending', description: "Pull the air directly from an opponent's lungs and create a vacuum around their head. A forbidden technique.", flavor: "The last breath." },
];

const nodes: TalentNode[] = nodeDataList.map(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const getIcon = (name: string): string => {
        if (name.includes('Hurricane')) return '🌀';
        if (name.includes('Suffocation')) return '💀';
        if (name.includes('Typhoon')) return '🌊';
        if (name.includes('Cannon')) return '💥';
        if (name.includes('Blades')) return '🔪';
        if (name.includes('Sound')) return '🔊';
        if (d.type === 'Genesis') return '🌪️';
        return '💨';
    };
    return {
        ...d,
        id: d.id,
        path: 'wild_gale',
        constellation: 'air',
        position: { x: 0, y: 0 },
        prerequisites,
        visual: { color: '#FFE4E1', size: 50, icon: getIcon(d.name) },
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

export const WILD_GALE_NODES = nodes;
export function generateWildGaleConnections(): TalentConnection[] { return connections; }
export const WILD_GALE_METADATA = {
    name: 'The Wild Gale',
    philosophy: 'Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action.',
    essence: 'Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.',
    focus: 'Aggressive, overwhelming force and lethal techniques, inspired by Zaheer.',
    sacredAnimal: 'The Dragon',
    emoji: '🐉',
    color: '#ffe4e1',
    position: { x: 700, y: 550 }
}; 