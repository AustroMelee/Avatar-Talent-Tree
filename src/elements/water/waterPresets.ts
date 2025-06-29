/**
 * Preset Builds for the Water Constellation
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 * Path Prefixes:
 * - Flowing Form (Adaptive Combat): 'ff'
 * - Spring of Life (Healing/Bloodbending): 'sl'
 * - Patient Glacier (Ice): 'pg'
 * - Crushing Abyss (Pressure/Force): 'ca'
 */

import type { PresetBuild } from '../air/airPresets'; // Reuse the interface

export const WATER_PRESETS: PresetBuild[] = [
  {
    id: 'katara',
    name: 'Katara',
    description: 'A compassionate and powerful master, skilled in healing, combat, and even the forbidden arts.',
    nodeIds: [
      'ff_water_spout',   // Her adaptive combat and mobility.
      'sl_genesis',         // Her core identity as a master healer.
      'pg_ice_prison',      // Her iconic move to defeat Azula.
      'sl_bloodbending',    // Acknowledges her reluctant but potent dark power.
    ],
  },
  {
    id: 'hama',
    name: 'Hama',
    description: 'The originator of bloodbending, a master of controlling others, but only under the power of a full moon.',
    nodeIds: [
      'sl_bloodbending',    // Her singular, all-consuming focus.
      'sl_condensation',    // How she found water to practice in prison.
    ],
  },
  {
    id: 'pakku',
    name: 'Pakku',
    description: 'A disciplined and powerful Northern master, whose style is a razor-sharp application of ice and water.',
    nodeIds: [
      'pg_ice_projectiles', // His primary offensive technique.
      'ff_water_spout',     // A signature move for Northern Tribe masters.
      'pg_ice_prison',      // His preferred method of incapacitating foes.
    ],
  },
  {
    id: 'korra',
    name: 'Korra',
    description: 'A modern, aggressive Avatar whose waterbending is defined by overwhelming power and force.',
    nodeIds: [
      'ca_wave',          // Her ability to command massive waves and waterspouts.
      'ca_water_jet',     // Represents her forceful, direct water attacks.
      'sl_genesis',       // She is a capable healer, taught by Katara.
      'pg_minor_genesis_1', // Ice Sled: For her signature ice-skating mobility.
    ],
  },
]; 