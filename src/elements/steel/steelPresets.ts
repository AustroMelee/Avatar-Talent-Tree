/**
 * Preset Builds for the Steel Constellation ("The Human Spirit")
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 * Path Prefixes:
 * - Mastermind (Strategy/Leadership): 'mastermind'
 * - Innovator (Technology/Engineering): 'innovator'
 * - Paragon (Physicality/Chi-Blocking): 'paragon'
 * - Arsenal (Weapon Mastery): 'arsenal'
 */

import type { PresetBuild } from '../../types';

export const STEEL_PRESETS: PresetBuild[] = [
  {
    id: 'sokka',
    name: 'Sokka',
    icon: '🗡️',
    description: 'The strategist and "idea guy." His strength is his mind, his plans, and his trusty boomerang.',
    pinnacleSkills: ['Grand Strategy', 'Swordsmanship', 'Engineering'],
    nodeIds: [
      'mastermind_grand_strategist', // His core identity.
      'arsenal_swordsmanship',         // His training under Piandao.
      'innovator_minor_genesis_1',   // His scientific and engineering mind.
    ],
  },
  {
    id: 'mai',
    name: 'Mai',
    icon: '🎯',
    description: 'A deadly marksman, whose stoic demeanor hides unparalleled precision with her hidden knives and shuriken.',
    pinnacleSkills: ["Yuyan's Eye"],
    nodeIds: [
      'arsenal_yuyans_eye',         // Represents her seemingly impossible accuracy.
    ],
  },
  {
    id: 'ty_lee',
    name: 'Ty Lee',
    icon: '🤸',
    description: 'An acrobatic marvel whose chi-blocking abilities can neutralize any bender, no matter how powerful.',
    pinnacleSkills: ['Chi Blocking', 'Acrobatic Evasion'],
    nodeIds: [
      'paragon_chi_blocking',       // Her signature ability.
      'paragon_acrobatic_evasion',  // The foundation of her fighting style.
    ],
  },
  {
    id: 'suki',
    name: 'Suki',
    icon: '🌺',
    description: 'The leader of the Kyoshi Warriors, a master of war fans, and an inspirational battlefield commander.',
    pinnacleSkills: ['Melee Virtuosity', 'Strategy and Tactics', 'Acrobatic Evasion'],
    nodeIds: [
      'arsenal_melee_virtuosity',   // Her mastery of the Kyoshi fans.
      'mastermind_strategy_and_tactics', // Her tactical leadership.
      'paragon_acrobatic_evasion',  // Her fighting style is highly acrobatic.
    ],
  },
  {
    id: 'hakoda',
    name: 'Hakoda',
    icon: '⚓',
    description: 'Chieftain of the Southern Water Tribe and a master naval strategist who commands through experience and respect.',
    pinnacleSkills: ['Grand Strategy', 'Inspirational Leadership'],
    nodeIds: [
      'mastermind_grand_strategist', // His command of the invasion force.
      'mastermind_minor_st_1',       // His inspirational speeches.
    ],
  },
  {
    id: 'asami',
    name: 'Asami Sato',
    icon: '⚙️',
    description: 'A genius engineer, inventor, and pilot. She counters bending with superior technology and training.',
    pinnacleSkills: ['Mecha Suit Pilot', 'Acrobatic Evasion'],
    nodeIds: [
      'innovator_mecha_suit_pilot',   // The pinnacle of her engineering.
      'paragon_acrobatic_evasion',  // Represents her self-defense training.
    ],
  },
]; 