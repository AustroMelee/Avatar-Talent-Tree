/**
 * Preset Builds for the Water Constellation
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 * Path Prefixes:
 * - Endless Mirror (Adaptive Combat): 'em'
 * - Crimson Tide (Healing/Bloodbending): 'ct'
 * - Eternal Prison (Ice): 'ep'
 * - Crushing Abyss (Pressure/Force): 'hd'
 */

import type { PresetBuild } from '../../types';

export const WATER_PRESETS: PresetBuild[] = [
  {
    id: 'katara',
    name: 'Katara',
    icon: '💖',
    description: 'A compassionate and powerful master, skilled in healing, combat, and even the forbidden arts.',
    pinnacleSkills: ['Octopus Form', 'Chi Restoration', 'Ice Prison'],
    nodeIds: [
      'em_octopus_form',   // Her adaptive combat and mobility.
      'ct_chi_restoration',// Her core identity as a master healer.
      'ep_ice_prison',     // Her iconic move to defeat Azula.
      'ct_bloodbending',   // Acknowledges her reluctant but potent dark power.
    ],
  },
  {
    id: 'pakku',
    name: 'Pakku',
    icon: '❄️',
    description: 'A disciplined and powerful Northern master, whose style is a razor-sharp application of ice and water.',
    pinnacleSkills: ['Ice Projectiles', 'Flash Freeze'],
    nodeIds: [
      'ep_ice_projectiles', // His primary offensive technique.
      'em_octopus_form',    // A signature move for Northern Tribe masters.
      'ep_flash_freeze',    // For creating large ice structures and prisons.
    ],
  },
  {
    id: 'hama',
    name: 'Hama',
    icon: '🩸',
    description: 'The original bloodbender, who discovered the forbidden art and used it for revenge.',
    pinnacleSkills: ['Bloodbending', 'Psychic Bloodbending'],
    nodeIds: [
      'ct_bloodbending',        // The forbidden art she discovered.
      'ct_psychic_bloodbending',// Her ability to bloodbend without the full moon.
      'ct_subtle_puppetry',     // Fine control over victims.
      'ct_crushing_grip',       // Causing pain and paralysis.
    ],
  },
  {
    id: 'korra',
    name: 'Korra',
    icon: '🌊',
    description: 'The Avatar of her era, with a natural talent for waterbending and a preference for aggressive, direct combat.',
    pinnacleSkills: ['Wave', 'High-Pressure Jet', 'Ice Projectiles'],
    nodeIds: [
      'hd_wave',              // Her signature large-scale water manipulation.
      'hd_high_pressure_jet', // Her precise, powerful attacks.
      'ep_ice_projectiles',   // Her ice combat techniques.
      'em_octopus_form',      // Her adaptive combat style.
    ],
  },
  {
    id: 'tarrlok',
    name: 'Tarrlok',
    icon: '🩸',
    description: 'A powerful bloodbender who used his abilities for political control and personal gain.',
    pinnacleSkills: ['Psychic Bloodbending', 'Mass Control'],
    nodeIds: [
      'ct_psychic_bloodbending', // His ability to bloodbend without the full moon.
      'ct_the_dark_tide',        // His mastery of the forbidden art.
      'ct_mass_control',         // His ability to control multiple targets.
      'ct_blood_sense',          // His awareness of living beings around him.
    ],
  },
  {
    id: 'yakone',
    name: 'Yakone',
    icon: '🩸',
    description: 'A criminal mastermind and one of the most powerful bloodbenders ever, capable of controlling entire courtrooms.',
    pinnacleSkills: ['The Dark Tide', 'Mass Control'],
    nodeIds: [
      'ct_psychic_bloodbending', // His terrifying ability to bloodbend without the moon.
      'ct_the_dark_tide',        // His mastery of multiple target control.
      'ct_mass_control',         // His ability to control large groups.
      'ct_severing_the_flow',    // His ability to block bending.
    ],
  },
  {
    id: 'amon',
    name: 'Amon/Noatak',
    icon: '🩸',
    description: 'The most powerful bloodbender of his generation, who used his abilities to take away others\' bending permanently.',
    pinnacleSkills: ['The Dark Tide', 'Severing the Flow'],
    nodeIds: [
      'ct_psychic_bloodbending', // His ability to bloodbend without the full moon.
      'ct_the_dark_tide',        // His mastery of the forbidden art.
      'ct_severing_the_flow',    // His unique ability to permanently remove bending.
      'ct_blood_sense',          // His awareness of all living beings.
    ],
  },
  {
    id: 'ming_hua',
    name: 'Ming-Hua',
    icon: '🌊',
    description: 'A waterbending prodigy who lost her arms but developed incredible water tentacle techniques to compensate.',
    pinnacleSkills: ['Octopus Form', 'Fluidic Motion'],
    nodeIds: [
      'em_octopus_form',        // Her signature water tentacles replacing her arms.
      'em_fluidic_motion',      // Her seamless integration of movement and bending.
      'em_grasping_tentacles',  // Her precise control over her water appendages.
      'em_extended_reach',      // Her ability to extend her tentacles great distances.
    ],
  },
  {
    id: 'unalaq',
    name: 'Unalaq',
    icon: '🌙',
    description: 'A dark waterbending master who sought to merge the spirit and human worlds, with advanced ice and spirit techniques.',
    pinnacleSkills: ['Flash Freeze', 'Glacial Armor', 'State Shifting'],
    nodeIds: [
      'ep_flash_freeze',        // His ability to instantly freeze large areas.
      'ep_glacial_armor',       // His defensive ice techniques.
      'em_state_shifting',      // His mastery of water's three states.
      'ep_ice_projectiles',     // His offensive ice techniques.
    ],
  },
  {
    id: 'desna_eska',
    name: 'Desna & Eska',
    icon: '❄️',
    description: 'Twin waterbending masters with synchronized techniques and a preference for ice-based combat.',
    pinnacleSkills: ['Ice Projectiles', 'Flash Freeze'],
    nodeIds: [
      'ep_ice_projectiles',     // Their coordinated ice attacks.
      'ep_flash_freeze',        // Their ability to freeze opponents instantly.
      'ep_shard_volley',        // Their rapid-fire ice techniques.
      'ep_ice_discs',           // Their curved, guided ice projectiles.
    ],
  },
  {
    id: 'tonraq',
    name: 'Tonraq',
    icon: '🛡️',
    description: 'A Northern Water Tribe warrior and Korra\'s father, skilled in defensive waterbending and large-scale ice manipulation.',
    pinnacleSkills: ['Wave', 'Glacial Armor'],
    nodeIds: [
      'hd_wave',                // His large-scale water manipulation.
      'ep_glacial_armor',       // His defensive ice techniques.
      'hd_tsunami_force',       // His powerful wave attacks.
      'ep_unflinching_bastion', // His resilient defensive style.
    ],
  },
]; 