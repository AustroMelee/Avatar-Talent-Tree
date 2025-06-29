/**
 * Preset Builds for the Fire Constellation
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 * Path Prefixes:
 * - Raging Inferno (Destruction/Aggression): 'ri' (Raging Inferno)
 * - Inner Sun (Life/Energy/Wisdom): 'is' (Inner Sun)
 * - Focused Flame (Precision/Control): 'ff' (Focused Flame)
 * - Cold Tempest (Lightning/Detachment): 'ct' (Cold Tempest)
 */

import type { PresetBuild } from '../air/airPresets'; // Reuse the interface

export const FIRE_PRESETS: PresetBuild[] = [
  {
    id: 'iroh',
    name: 'Iroh',
    description: 'The Dragon of the West. A wise grandmaster who understands that fire is life, not just destruction.',
    nodeIds: [
      'is_breath_of_fire',      // His signature technique.
      'ct_lightning_redirection', // His signature invention.
      'is_dancing_dragon',      // Represents his connection to the true meaning of firebending.
    ],
  },
  {
    id: 'azula',
    name: 'Azula',
    description: 'A ruthless prodigy. Her fire burns hotter and her mind is as sharp and deadly as lightning.',
    nodeIds: [
      'ff_blue_fire',             // Her unique and iconic hotter flame.
      'ct_lightning_generation',  // Her mastery of lightning as an offensive weapon.
      'ri_jet_propulsion',        // Her advanced and agile mobility in combat.
    ],
  },
  {
    id: 'zuko',
    name: 'Zuko',
    description: 'The conflicted prince. His style evolves from pure rage to the controlled, colorful fire of the masters.',
    nodeIds: [
      'ff_fire_blades',           // His signature dual swords.
      'is_dancing_dragon',        // Represents his shift to true firebending after meeting the dragons.
      'ct_lightning_redirection', // A critical skill for his final Agni Kai.
    ],
  },
  {
    id: 'ozai',
    name: 'Ozai',
    description: 'The Phoenix King. A tyrannical master whose firebending is the pinnacle of destructive force, fueled by ambition.',
    nodeIds: [
      'ri_jet_propulsion',        // His powerful, sustained flight during the Comet.
      'ct_lightning_generation',  // His primary tool for execution and assassination.
      'ri_fire_bomb',             // Represents the overwhelming, concussive force of his attacks.
    ],
  },
  {
    id: 'jeongjeong',
    name: 'Jeong Jeong',
    description: 'The Deserter. A master who fears fire\'s destructive potential, specializing in massive defensive walls and control.',
    nodeIds: [
      'ff_wall_of_flames',        // His most demonstrated and signature technique.
      'ff_fire_blades',           // His ability to create precise, controlled forms like cutting rings.
    ],
  },
  {
    id: 'combustion_man',
    name: 'Combustion Man',
    description: 'A silent assassin with a rare and volatile power, capable of creating focused, explosive blasts from his mind.',
    nodeIds: [
      'ri_combustionbending',     // This is his only known ability.
    ],
  },
]; 