/**
 * Preset Builds for the Earth Constellation
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 * Path Prefixes:
 * - Patient Mountain (Neutral Jing / Seismic Sense): 'pm'
 * - Molten Core (Transformation / Metal & Lava): 'mc'
 * - Eternal Mountain (Strength): 'em'
 * - Sculptor's Hand (Precision): 'sh'
 */

import type { PresetBuild } from '../air/airPresets'; // Reuse the interface

export const EARTH_PRESETS: PresetBuild[] = [
  {
    id: 'toph',
    name: 'Toph Beifong',
    description: 'The inventor of metalbending, a master of seismic sense, and an unconventional, powerful fighter.',
    nodeIds: [
      'pm_seismic_sense',     // Her most defining characteristic.
      'mc_metalbending',      // Her signature invention.
      'sh_sandbending',       // Her ability to create a detailed sand model of Ba Sing Se.
    ],
  },
  {
    id: 'bumi',
    name: 'King Bumi',
    description: 'A mad genius and grandmaster whose power is matched only by his eccentricity. He moves mountains with his mind.',
    nodeIds: [
      'em_earthquake',    // The raw power to retake Omashu.
      'pm_earth_tunneling', // His primary method of surprise and mobility.
      'sh_architectural_bending', // His ability to earthbend massive statues and structures.
    ],
  },
  {
    id: 'bolin',
    name: 'Bolin',
    description: 'A pro-bender with a heart of gold and the rare ability to bend lava, combining fast footwork with explosive power.',
    nodeIds: [
      'mc_lavabending',       // His signature, rare skill.
      'sh_rock_gloves',       // Represents his fast, precise pro-bending disc attacks.
    ],
  },
  {
    id: 'kuvira',
    name: 'Kuvira',
    description: 'The "Great Uniter." A master metalbender whose style is ruthlessly efficient, precise, and militaristic.',
    nodeIds: [
      'mc_platinum_bending',  // Represents her mastery over even purified metals for her Colossus.
      'mc_minor_mb_1',      // Cable Proficiency is the absolute core of her fighting style.
    ],
  },
]; 