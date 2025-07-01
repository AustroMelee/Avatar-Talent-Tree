/**
 * Path 1: The Gentle Breeze - 微風 (Wēi Fēng)
 * Philosophy: "Do not meet force with force; flow around it, and let the aggressor's strength become their own undoing."
 * Essence: Evasion, redirection of momentum, defensive mastery based on Aikido principles.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Gentle Breeze Path', type: 'Genesis', cost: 1, description: "Your movements become lighter, more fluid. You have a passive, instinctual urge to move out of harm's way.", flavor: "The softest thing overcomes the hardest." },
    
    // Minors after Genesis
    { id: 'minor_gen_1', name: 'Whispering Wind', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You are more attuned to subtle changes in air currents, aiding your evasive maneuvers.", flavor: "The wind warns of danger." },
    { id: 'minor_gen_2', name: 'Effortless Flow', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your defensive techniques consume slightly less stamina.", flavor: "As easy as breathing." },
    { id: 'minor_gen_3', name: 'Featherlike Landing', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You land from any height with absolute silence.", flavor: "A soundless fall." },
    { id: 'minor_gen_4', name: 'Constant Motion', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You find it easier to maintain momentum while moving defensively.", flavor: "Stillness is a vulnerability." },
    { id: 'minor_gen_5', name: 'Unburdened Spirit', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your connection to the element of freedom makes you slightly more resistant to fear and intimidation.", flavor: "A free mind cannot be caged." },

    // Sub-Path A - Aspect of Evasion
    { id: 'a1_cloud_shield', name: 'Cloud Shield Technique', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_1', description: "Form a dense, swirling disc of compressed air that can physically halt or deflect a single projectile or physical blow.", flavor: "A wall can be broken, not the air." },
    { id: 'a1_minor_1', name: 'Layered Currents', type: 'Minor', cost: 1, prerequisite: 'a1_cloud_shield', description: "The shield is woven with multiple layers, allowing it to absorb several weaker, rapid-fire projectiles.", flavor: "Many leaves turning aside the stream." },
    { id: 'a1_minor_2', name: 'Repelling Gust', type: 'Minor', cost: 1, prerequisite: 'a1_cloud_shield', description: "Upon impact, the shield releases its compressed air in a focused gust, pushing the attacker away.", flavor: "The wind answers force with a push." },
    { id: 'a1_minor_3', name: 'Predictive Formation', type: 'Minor', cost: 1, prerequisite: 'a1_cloud_shield', description: "Your shield begins to form a fraction of a second before an attack connects, reacting to air pressure changes.", flavor: "Anticipate, don't just react." },

    { id: 'a2_unburdened_form', name: 'Unburdened Form', type: 'Manifestation', cost: 4, prerequisite: 'a1_cloud_shield', description: "By drastically reducing the air pressure around your body, you can achieve moments of explosive, frictionless movement.", flavor: "As swift as the unburdened wind." },
    { id: 'a2_minor_1', name: 'Zephyr\'s Trail', type: 'Minor', cost: 1, prerequisite: 'a2_unburdened_form', description: "You leave a trail of disturbed air in your wake, which can subtly unbalance a pursuing opponent.", flavor: "A trap for the unwary." },
    { id: 'a2_minor_2', name: 'Vertical Flow', type: 'Minor', cost: 1, prerequisite: 'a2_unburdened_form', description: "During the burst of movement, you can travel up vertical surfaces for a few steps as if they were level ground.", flavor: "Gravity is just a suggestion." },

    { id: 'a3_eye_of_serenity', name: 'Eye of Serenity', type: 'Axiom', cost: 5, prerequisite: 'a2_unburdened_form', description: "You enter a state of total awareness, perceiving the world as a series of air currents and pressure shifts.", flavor: "In the eye of the storm, there is calm." },
    { id: 'a3_minor_1', name: 'Stillness of Mind', type: 'Minor', cost: 1, prerequisite: 'a3_eye_of_serenity', description: "While in this state, you are immune to taunts, feints, and other attempts to break your concentration.", flavor: "The mind, a placid lake." },
    { id: 'a3_minor_2', name: 'The Calm Center', type: 'Minor', cost: 1, prerequisite: 'a3_eye_of_serenity', description: "You can extend a small bubble of this awareness to an ally you are in physical contact with.", flavor: "Share your peace." },

    // Sub-Path B - Aspect of Redirection
    { id: 'b1_catch_release', name: 'Catch and Release', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_2', description: "Create a precise air current to safely cushion and capture an incoming projectile, holding it suspended in a vortex.", flavor: "Receive the gift, and return it." },
    { id: 'b1_minor_1', name: 'Precise Return', type: 'Minor', cost: 1, prerequisite: 'b1_catch_release', description: "You can release the captured projectile back along its original trajectory with equal or greater force.", flavor: "Answering in kind." },
    { id: 'b1_minor_2', name: 'Disarming Vortex', type: 'Minor', cost: 1, prerequisite: 'b1_catch_release', description: "Violently spin the captured projectile, shattering it harmlessly in the vortex.", flavor: "Reduced to dust." },
    { id: 'b1_minor_3', name: 'Gentle Hand', type: 'Minor', cost: 1, prerequisite: 'b1_catch_release', description: "You can catch heavier objects or multiple smaller projectiles within the same vortex.", flavor: "No burden is too great." },
    
    { id: 'b2_momentum_redir', name: 'Momentum Redirection', type: 'Manifestation', cost: 4, prerequisite: 'b1_catch_release', description: "Match an opponent's incoming melee attack with perfectly timed air currents to seize control of their momentum.", flavor: "Use their own strength against them." },
    { id: 'b2_minor_1', name: 'Sweeping Leg', type: 'Minor', cost: 1, prerequisite: 'b2_momentum_redir', description: "Specialize the redirection into a low-to-the-ground air sweep that takes out an opponent's footing.", flavor: "The current pulls the rug out." },
    { id: 'b2_minor_2', name: 'Chain Reaction', type: 'Minor', cost: 1, prerequisite: 'b2_momentum_redir', description: "After redirecting one attacker, you can use their momentum to throw them into another nearby opponent.", flavor: "Two birds, one gust." },
    { id: 'b2_minor_3', name: 'Elemental Weave', type: 'Minor', cost: 1, prerequisite: 'b2_momentum_redir', description: "You can apply this principle to incoming elemental attacks, diverting their path away from you.", flavor: "The river parts for the stone." },

    { id: 'b3_unbroken_current', name: 'The Unbroken Current', type: 'Axiom', cost: 5, prerequisite: 'b2_momentum_redir', description: "You become a continuous current of redirection. Force directed at you is seamlessly and immediately turned aside.", flavor: "You are the river; they are but a stone." },
    { id: 'b3_minor_1', name: 'Environmental Advantage', type: 'Minor', cost: 1, prerequisite: 'b3_unbroken_current', description: "Incorporate the environment into your redirection, using an opponent's force to slam them into walls or off ledges.", flavor: "The world is your weapon." },
    { id: 'b3_minor_2', name: 'Disarming Flow', type: 'Minor', cost: 1, prerequisite: 'b3_unbroken_current', description: "Your redirection techniques are so precise you can specifically target and disarm an opponent's weapon without harming them.", flavor: "A weaponless foe is no foe at all." },
];

const nodes: TalentNode[] = nodeDataList.map(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    // Basic icon mapping based on name
    const getIcon = (name: string): string => {
        if (name.includes('Shield')) return '🛡️';
        if (name.includes('Serenity')) return '👁️';
        if (name.includes('Current')) return '🌊';
        if (name.includes('Redirection')) return '↪️';
        if (name.includes('Form')) return '💨';
        if (name.includes('Catch')) return '✋';
        if (d.type === 'Genesis') return '🍃';
        return '🌬️';
    };
    return {
        ...d,
        id: d.id,
        path: 'gentle_breeze',
        constellation: 'air',
        position: { x: 0, y: 0 },
        prerequisites,
        visual: { color: '#B0E0E6', size: 50, icon: getIcon(d.name) },
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

export const GENTLE_BREEZE_NODES = nodes;
export function generateGentleBreezeConnections(): TalentConnection[] { return connections; }
export const GENTLE_BREEZE_METADATA = {
    name: 'The Gentle Breeze',
    philosophy: 'Do not meet force with force; flow around it, and let the aggressor\'s strength become their own undoing.',
    essence: 'Evasion, redirection of momentum, defensive mastery.',
    focus: 'Traditional defensive Airbending, using an opponent\'s energy against them.',
    sacredAnimal: 'The Flying Lemur',
    emoji: '🍃',
    color: '#b3e6ff',
    position: { x: 800, y: 500 }
}; 