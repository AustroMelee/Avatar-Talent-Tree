/**
 * Simplified Air Talent Data for Grid Layout
 * Converts the complex sunburst layout to a simple grid system
 */

import type { TalentNode, TalentConnection, TalentTree } from './types/talent.types';

/**
 * Gentle Breeze Path - Full Grid Layout (WOTLK-style, branching)
 * Structure: 8 rows, 28 nodes total
 * Row distribution: 1 → 5 → 2 → 6 → 2 → 6 → 2 → 4
 * All minors under a major node are unlocked together, not chained.
 */
export function createAirGridTalentTree(): TalentTree {
  // Column 4 = main vertical, 2-3 = left branch (A), 5-6 = right branch (B)
  // Row increases downward (0-7 for 8 rows total)
  const nodes: TalentNode[] = [
    // Row 0: Genesis (1 node, x=4)
    { id: 'gb_genesis', name: 'The Gentle Breeze Path', path: 'gentle_breeze', constellation: 'air', type: 'Genesis', description: 'Your movements become lighter, more fluid. You have a passive, instinctual urge to move out of harm\'s way, making you harder to hit with telegraphed attacks.', flavor: 'The softest thing in the universe overcomes the hardest thing in the universe. Do not meet force with force; flow around it, and let the aggressor\'s strength become their own undoing.', prerequisites: [], pkCost: 1, position: { x: 4, y: 0 }, visual: { color: '#87CEEB', size: 1, icon: '🍃' }, effects: [], isAllocated: false, isAllocatable: true, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 1: 5 minors (x=2,3,4,5,6)
    { id: 'gb_minor_whispering_wind', name: 'Whispering Wind', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You are more attuned to subtle changes in air currents, aiding your evasive maneuvers.', flavor: 'Listen to the wind, and it will tell you of approaching danger.', prerequisites: ['gb_genesis'], pkCost: 1, position: { x: 2, y: 1 }, visual: { color: '#b3e0ff', size: 1, icon: '🌬️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_effortless_flow', name: 'Effortless Flow', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'Your defensive techniques consume slightly less stamina.', flavor: 'When movement becomes effortless, defense becomes natural.', prerequisites: ['gb_genesis'], pkCost: 1, position: { x: 3, y: 1 }, visual: { color: '#b3e0ff', size: 1, icon: '💧' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_featherlike_landing', name: 'Featherlike Landing', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You land from any height with absolute silence.', flavor: 'As light as a feather, as silent as the wind.', prerequisites: ['gb_genesis'], pkCost: 1, position: { x: 4, y: 1 }, visual: { color: '#b3e0ff', size: 1, icon: '🪶' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_constant_motion', name: 'Constant Motion', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You find it easier to maintain momentum while moving defensively.', flavor: 'The wind never stops moving, and neither should you.', prerequisites: ['gb_genesis'], pkCost: 1, position: { x: 5, y: 1 }, visual: { color: '#b3e0ff', size: 1, icon: '🔄' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_unburdened_spirit', name: 'Unburdened Spirit', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'Your connection to the element of freedom makes you slightly more resistant to fear and intimidation.', flavor: 'A free spirit cannot be bound by fear.', prerequisites: ['gb_genesis'], pkCost: 1, position: { x: 6, y: 1 }, visual: { color: '#b3e0ff', size: 1, icon: '🕊️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 2: 2 keystones (x=3,5)
    { id: 'gb_keystone_a', name: 'Cloud Shield Technique', path: 'gentle_breeze', constellation: 'air', type: 'Keystone', description: 'Form a dense, swirling disc or sphere of compressed air that can physically halt or deflect a single projectile or physical blow.', flavor: 'The softest shield is often the strongest.', prerequisites: ['gb_genesis', 'gb_minor_unburdened_spirit'], pkCost: 2, position: { x: 3, y: 2 }, visual: { color: '#87CEEB', size: 1, icon: '🛡️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_keystone_b', name: 'Catch and Release', path: 'gentle_breeze', constellation: 'air', type: 'Keystone', description: 'Create a precise air current to safely cushion and capture an incoming projectile, holding it suspended in a vortex in front of you.', flavor: 'To catch is to understand, to release is to control.', prerequisites: ['gb_genesis', 'gb_minor_unburdened_spirit'], pkCost: 2, position: { x: 5, y: 2 }, visual: { color: '#87CEEB', size: 1, icon: '✋' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 3: 6 minors (x=1,2,3,5,6,7)
    { id: 'gb_minor_layered_currents', name: 'Layered Currents', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'The shield is woven with multiple layers, allowing it to absorb several weaker, rapid-fire projectiles before dissipating.', flavor: 'Layer upon layer, strength upon strength.', prerequisites: ['gb_keystone_a'], pkCost: 1, position: { x: 1, y: 3 }, visual: { color: '#b3e0ff', size: 1, icon: '🌀' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_repelling_gust', name: 'Repelling Gust', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'Upon impact, the shield releases its compressed air in a focused gust, pushing the attacker away from you.', flavor: 'The wind pushes back with the force of the attack.', prerequisites: ['gb_keystone_a'], pkCost: 1, position: { x: 2, y: 3 }, visual: { color: '#b3e0ff', size: 1, icon: '💨' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_predictive_formation', name: 'Predictive Formation', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'Your shield begins to form a fraction of a second before an attack connects, reacting to air pressure changes.', flavor: 'The wind knows before you do.', prerequisites: ['gb_keystone_a'], pkCost: 1, position: { x: 3, y: 3 }, visual: { color: '#b3e0ff', size: 1, icon: '⏱️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_precise_return', name: 'Precise Return', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You can release the captured projectile back along its original trajectory with equal or greater force.', flavor: 'What goes around comes around, with interest.', prerequisites: ['gb_keystone_b'], pkCost: 1, position: { x: 5, y: 3 }, visual: { color: '#b3e0ff', size: 1, icon: '🎯' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_disarming_vortex', name: 'Disarming Vortex', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You can instead choose to violently spin the captured projectile, shattering it harmlessly in the vortex.', flavor: 'Sometimes destruction is the kindest act.', prerequisites: ['gb_keystone_b'], pkCost: 1, position: { x: 6, y: 3 }, visual: { color: '#b3e0ff', size: 1, icon: '💫' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_gentle_hand', name: 'Gentle Hand', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You can catch heavier objects or multiple smaller projectiles within the same vortex.', flavor: 'A gentle hand can hold the heaviest burden.', prerequisites: ['gb_keystone_b'], pkCost: 1, position: { x: 7, y: 3 }, visual: { color: '#b3e0ff', size: 1, icon: '👐' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 4: 2 manifestations (x=3,5)
    { id: 'gb_manifest_a', name: 'Unburdened Form', path: 'gentle_breeze', constellation: 'air', type: 'Manifestation', description: 'By drastically reducing the air pressure and resistance around your body, you can achieve moments of explosive, frictionless movement.', flavor: 'When you are unburdened, you are unstoppable.', prerequisites: ['gb_keystone_a'], pkCost: 4, position: { x: 3, y: 4 }, visual: { color: '#87CEEB', size: 1, icon: '💨' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_manifest_b', name: 'Momentum Redirection', path: 'gentle_breeze', constellation: 'air', type: 'Manifestation', description: 'By matching an opponent\'s incoming melee attack with perfectly timed air currents, you seize control of their momentum.', flavor: 'Turn their strength against them.', prerequisites: ['gb_keystone_b'], pkCost: 4, position: { x: 5, y: 4 }, visual: { color: '#87CEEB', size: 1, icon: '↪️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 5: 6 minors (x=1,2,3,5,6,7)
    { id: 'gb_minor_zephyrs_trail', name: 'Zephyr\'s Trail', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You leave a trail of disturbed air in your wake, which can subtly unbalance a pursuing opponent.', flavor: 'The wind remembers where you have been.', prerequisites: ['gb_manifest_a'], pkCost: 1, position: { x: 1, y: 5 }, visual: { color: '#b3e0ff', size: 1, icon: '🌪️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_vertical_flow', name: 'Vertical Flow', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'During the burst of movement, you can travel up vertical surfaces for a few steps as if they were level ground.', flavor: 'The wind flows in all directions, including up.', prerequisites: ['gb_manifest_a'], pkCost: 1, position: { x: 2, y: 5 }, visual: { color: '#b3e0ff', size: 1, icon: '🧗' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_effortless_flow_2', name: 'Effortless Flow', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'The stamina cost of maintaining this frictionless state is significantly reduced.', flavor: 'When movement becomes effortless, you can move forever.', prerequisites: ['gb_manifest_a'], pkCost: 1, position: { x: 3, y: 5 }, visual: { color: '#b3e0ff', size: 1, icon: '💧' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_sweeping_leg', name: 'Sweeping Leg', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'Specialize the redirection into a low-to-the-ground air sweep that takes out an opponent\'s footing.', flavor: 'The lowest blow can be the most effective.', prerequisites: ['gb_manifest_b'], pkCost: 1, position: { x: 5, y: 5 }, visual: { color: '#b3e0ff', size: 1, icon: '🦵' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_chain_reaction', name: 'Chain Reaction', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'After redirecting one attacker, you can use their momentum to throw them into another nearby opponent.', flavor: 'One fall leads to another.', prerequisites: ['gb_manifest_b'], pkCost: 1, position: { x: 6, y: 5 }, visual: { color: '#b3e0ff', size: 1, icon: '🔗' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_elemental_weave', name: 'Elemental Weave', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You can apply this principle to incoming elemental attacks, diverting their path away from you.', flavor: 'All elements flow, and all flows can be redirected.', prerequisites: ['gb_manifest_b'], pkCost: 1, position: { x: 7, y: 5 }, visual: { color: '#b3e0ff', size: 1, icon: '🌈' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 6: 2 axioms (x=3,5)
    { id: 'gb_axiom_a', name: 'Eye of Serenity', path: 'gentle_breeze', constellation: 'air', type: 'Axiom', description: 'You enter a state of total awareness, perceiving the world as a series of air currents and pressure shifts.', flavor: 'In perfect calm, you see everything.', prerequisites: ['gb_manifest_a'], pkCost: 5, position: { x: 3, y: 6 }, visual: { color: '#87CEEB', size: 1, icon: '👁️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_axiom_b', name: 'The Unbroken Current', path: 'gentle_breeze', constellation: 'air', type: 'Axiom', description: 'You become a continuous current of redirection. Opponents find that any force they direct at you is seamlessly and immediately turned aside.', flavor: 'The current never breaks, the flow never ends.', prerequisites: ['gb_manifest_b'], pkCost: 5, position: { x: 5, y: 6 }, visual: { color: '#87CEEB', size: 1, icon: '🌊' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },

    // Row 7: 4 minors (x=2,3,5,6)
    { id: 'gb_minor_stillness_of_mind', name: 'Stillness of Mind', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'While in this state, you are immune to taunts, feints, and other attempts to break your concentration.', flavor: 'A still mind cannot be disturbed.', prerequisites: ['gb_axiom_a'], pkCost: 1, position: { x: 2, y: 7 }, visual: { color: '#b3e0ff', size: 1, icon: '🧘' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_calm_center', name: 'The Calm Center', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You can extend a small bubble of this awareness to an ally you are in physical contact with.', flavor: 'Share your calm, share your strength.', prerequisites: ['gb_axiom_a'], pkCost: 1, position: { x: 3, y: 7 }, visual: { color: '#b3e0ff', size: 1, icon: '🤝' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_environmental_advantage', name: 'Environmental Advantage', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'You can incorporate the environment into your redirection, using an opponent\'s force to slam them into walls or off ledges.', flavor: 'The environment is your ally.', prerequisites: ['gb_axiom_b'], pkCost: 1, position: { x: 5, y: 7 }, visual: { color: '#b3e0ff', size: 1, icon: '🏞️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
    { id: 'gb_minor_disarming_flow', name: 'Disarming Flow', path: 'gentle_breeze', constellation: 'air', type: 'Minor', description: 'Your redirection techniques are so precise you can specifically target and disarm an opponent\'s weapon without harming them.', flavor: 'The gentlest touch can disarm the fiercest warrior.', prerequisites: ['gb_axiom_b'], pkCost: 1, position: { x: 6, y: 7 }, visual: { color: '#b3e0ff', size: 1, icon: '🗡️' }, effects: [], isAllocated: false, isAllocatable: false, isLocked: false, isPermanentlyLocked: false, isVisible: true },
  ];

  // Generate connections based on prerequisites
  const connections: TalentConnection[] = [];
  nodes.forEach(node => {
    node.prerequisites.forEach(prereqId => {
      connections.push({
        from: prereqId,
        to: node.id,
        isActive: false,
        isLocked: false
      });
    });
  });

  return {
    nodes,
    connections,
    totalPK: 24,
    spentPK: 0,
    allocatedNodes: new Set(),
    philosophicalWounds: [],
    covenant: null,
    metadata: {
      name: 'The Four Winds - Gentle Breeze',
      description: 'Full Gentle Breeze path with all minor nodes in a symmetrical, branching grid.',
      background: 'air'
    }
  };
} 