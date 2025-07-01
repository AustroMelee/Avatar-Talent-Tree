/**
 * Preset Builds for the Air Constellation (CHARACTER UPDATE)
 * These define the KEY endpoint nodes for iconic characters: Aang, Yangchen, Zaheer, and Tenzin.
 * The logic will automatically fill in all prerequisites.
 */

import type { PresetBuild } from '../../types';

export const AIR_PRESETS: PresetBuild[] = [
  {
    id: 'aang',
    name: 'Aang',
    icon: '🦋',
    description: 'The Reluctant Avatar. A master of traditional, evasive airbending, focusing on mobility, misdirection, and non-violent solutions.',
    pinnacleSkills: ['Air Scooter', 'Eye of Serenity', 'Momentum Redirection'],
    nodeIds: [
      'dw_a1_air_scooter',     // His signature invention for mobility.
      'gb_a3_eye_of_serenity', // The pinnacle of evasive awareness.
      'gb_b2_momentum_redir',  // His core defensive philosophy.
    ],
  },
  {
    id: 'zaheer',
    name: 'Zaheer',
    icon: '🌪️',
    description: 'The Red Lotus Anarchist. A ruthless spiritualist who weaponized airbending philosophy to pursue ultimate, violent freedom.',
    pinnacleSkills: ['Flight Mastery', 'Suffocation'],
    nodeIds: [
      'wg_b3_suffocation',   // His signature lethal technique.
      'dw_a3_flight_mastery',// His ultimate achievement after "letting go his earthly tether".
    ],
  },
  {
    id: 'yangchen',
    name: 'Yangchen',
    icon: '🧘',
    description: 'The Revered Predecessor. A pragmatic Avatar who combined deep spiritual connection with decisive, overwhelming force to maintain global balance.',
    pinnacleSkills: ['Spirit Projection', 'Eye of the Hurricane', 'Breath of Kinship'],
    nodeIds: [
      'sb_a3_spirit_projection', // Her unparalleled connection to the Spirit World.
      'wg_a3_eye_of_hurricane',  // Her willingness to use immense power to end conflicts.
      'sb_b3_breath_of_kinship', // Her connection to all life and people.
    ],
  },
  {
    id: 'tenzin',
    name: 'Tenzin',
    icon: '⚖️',
    description: 'The Son of Aang. A master traditionalist dedicated to preserving Air Nomad culture, blending defensive grace with forceful determination.',
    pinnacleSkills: ['The Unbroken Current', 'Eye of the Hurricane', 'Peaceful Presence'],
    nodeIds: [
      'gb_b3_unbroken_current',   // His mastery of defensive, flowing combat.
      'wg_a3_eye_of_hurricane',   // His ability to create massive cyclones to control the battlefield.
      'sb_b1_peaceful_presence',  // His role as a teacher and leader of the new Air Nation.
    ],
  },
]; 