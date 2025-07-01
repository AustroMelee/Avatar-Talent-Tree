/**
 * Preset Builds for the Earth Constellation
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 * Path Prefixes:
 * - Hun Yuan (Patient Mountain / Neutral Jing): 'hun_yuan'
 * - Bian Hua (Molten Core / Transformation): 'bian_hua'
 * - Gang Qiang (Eternal Mountain / Strength): 'gang_qiang'
 * - Jing Que (Sculptor's Hand / Precision): 'jing_que'
 */

import type { PresetBuild } from '../../types';

export const EARTH_PRESETS: PresetBuild[] = [
  {
    id: 'toph',
    name: 'Toph Beifong',
    icon: '🦡',
    description: 'The Blind Bandit. The inventor of metalbending, a master of seismic sense, and an unconventional, powerful fighter who revolutionized earthbending.',
    pinnacleSkills: ['Seismic Sense', 'Metalbending', 'Platinum Bending'],
    nodeIds: [
      'hun_yuan_seismic_sense',      // Her signature ability developed from badgermoles.
      'hun_yuan_geomantic_awareness',// Her deep connection to the earth's wisdom.
      'bian_hua_metalbending',       // Her revolutionary discovery.
      'bian_hua_platinum_bending',   // Her mastery of even the purest metals.
      'jing_que_dust_stepping',      // Her ability to walk on air using earth particles.
    ],
  },
  {
    id: 'bolin',
    name: 'Bolin',
    icon: '🌋',
    description: 'The Lavabender. A rare lavabender who combines traditional earthbending with the ability to melt rock into lava, creating devastating battlefield control.',
    pinnacleSkills: ['Lavabending', 'Lava Wave', 'The Eruption'],
    nodeIds: [
      'bian_hua_phase_change',       // His ability to turn solid rock into lava.
      'bian_hua_lava_wave',          // His signature large-scale lava manipulation.
      'bian_hua_the_eruption',       // His ability to create miniature volcanoes.
      'gang_qiang_boulder_hurl',     // His traditional earthbending strength.
      'gang_qiang_concussive_impact',// His powerful, direct combat style.
    ],
  },
  {
    id: 'bumi',
    name: 'King Bumi',
    icon: '👑',
    description: 'The Mad Genius. A master of Neutral Jing and one of the most powerful earthbenders ever, known for his unconventional tactics and immense strength.',
    pinnacleSkills: ['Eternal Mountain', 'Mountain Breaker', 'Patient Earth'],
    nodeIds: [
      'hun_yuan_eternal_mountain',   // His mastery of Neutral Jing and immovability.
      'hun_yuan_patient_earth',      // His ability to influence the earth while remaining still.
      'gang_qiang_mountain_breaker', // His ability to lift and throw massive structures.
      'gang_qiang_tectonic_shift',   // His large-scale earth manipulation.
      'jing_que_earth_glide',        // His ability to move through earth like water.
    ],
  },
  {
    id: 'long_feng',
    name: 'Long Feng',
    icon: '🕵️',
    description: 'The Grand Secretariat. The leader of the Dai Li, master of precision earthbending and psychological manipulation through architectural control.',
    pinnacleSkills: ['Earth Gauntlets', 'Architectural Bending', 'Living Architecture'],
    nodeIds: [
      'jing_que_earth_gauntlets',    // The signature Dai Li technique.
      'jing_que_architectural_bending',// His ability to create complex structures.
      'jing_que_living_architecture',// His ability to make buildings shift and change.
      'jing_que_trap_master',        // His expertise in creating hidden traps.
      'hun_yuan_patient_mind',       // His psychological manipulation skills.
    ],
  },
  {
    id: 'kuvira',
    name: 'Kuvira',
    icon: '⚔️',
    description: 'The Great Uniter. A master metalbender and military strategist who perfected Toph\'s art and used it to create a powerful, centralized empire.',
    pinnacleSkills: ['Metalbending', 'Liquid Metal Control', 'Cable Proficiency'],
    nodeIds: [
      'bian_hua_metalbending',       // Her mastery of Toph's discovery.
      'bian_hua_liquid_metal_control',// Her ability to make metal flow like liquid.
      'bian_hua_cable_proficiency',  // Her signature metal cable techniques.
      'bian_hua_armor_weaving',      // Her ability to create flexible metal armor.
      'gang_qiang_unbreakable_will', // Her iron determination and leadership.
    ],
  },
  {
    id: 'ghazan',
    name: 'Ghazan',
    icon: '🌋',
    description: 'The Red Lotus Lavabender. A powerful lavabender who used his abilities to destroy the Northern Air Temple and fight against the Avatar.',
    pinnacleSkills: ['Lavabending', 'Lava Wave', 'Pyroclastic Cloud'],
    nodeIds: [
      'bian_hua_phase_change',       // His ability to melt rock into lava.
      'bian_hua_lava_wave',          // His large-scale lava manipulation.
      'bian_hua_pyroclastic_cloud',  // His ability to create deadly gas clouds.
      'bian_hua_riding_the_wave',    // His mobility on lava waves.
      'gang_qiang_concussive_impact',// His powerful traditional earthbending.
    ],
  },
  {
    id: 'lin_beifong',
    name: 'Lin Beifong',
    icon: '🛡️',
    description: 'The Chief of Police. Toph\'s daughter and a master metalbender who uses her abilities for law enforcement and protection.',
    pinnacleSkills: ['Metalbending', 'Earth Armor', 'Seismic Sense'],
    nodeIds: [
      'bian_hua_metalbending',       // Her mastery of her mother's art.
      'gang_qiang_earth_armor',      // Her defensive metal armor techniques.
      'hun_yuan_seismic_sense',      // Her inherited seismic awareness.
      'jing_que_remote_binding',     // Her law enforcement techniques.
      'gang_qiang_spiked_armor',     // Her defensive spikes for close combat.
    ],
  },
  {
    id: 'su_yin',
    name: 'Suyin Beifong',
    icon: '🏛️',
    description: 'The Architect of Zaofu. Toph\'s daughter and the founder of the metal city, combining architectural vision with metalbending mastery.',
    pinnacleSkills: ['Architectural Bending', 'Metalbending', 'Living Architecture'],
    nodeIds: [
      'jing_que_architectural_bending',// Her ability to create the metal city of Zaofu.
      'jing_que_living_architecture',// Her ability to make buildings adapt and change.
      'bian_hua_metalbending',       // Her mastery of her mother's art.
      'jing_que_architectural_vision',// Her ability to visualize complex structures.
      'jing_que_trap_master',        // Her defensive architectural techniques.
    ],
  },
  {
    id: 'dai_li_agent',
    name: 'Dai Li Agent',
    icon: '🕵️',
    description: 'The Secret Police. Masters of precision earthbending and psychological manipulation, using architectural control to maintain order.',
    pinnacleSkills: ['Earth Gauntlets', 'Remote Binding', 'Trap Master'],
    nodeIds: [
      'jing_que_earth_gauntlets',    // Their signature stone gloves technique.
      'jing_que_remote_binding',     // Their ability to restrain from a distance.
      'jing_que_trap_master',        // Their expertise in creating hidden traps.
      'jing_que_architectural_bending',// Their ability to create complex structures.
      'hun_yuan_patient_mind',       // Their psychological manipulation skills.
    ],
  },
  {
    id: 'badgermole',
    name: 'Badgermole',
    icon: '🦡',
    description: 'The Original Earthbenders. The sacred animals who taught the first earthbenders, masters of seismic sense and earth tunneling.',
    pinnacleSkills: ['Seismic Sense', 'Earth Glide', 'Geomantic Awareness'],
    nodeIds: [
      'hun_yuan_seismic_sense',      // Their original ability to "see" through earth.
      'hun_yuan_geomantic_awareness',// Their deep connection to the earth's wisdom.
      'jing_que_earth_glide',        // Their ability to move through earth like water.
      'hun_yuan_earths_memory',      // Their ability to sense the land's history.
      'hun_yuan_far_reaching_echo',  // Their powerful seismic awareness.
    ],
  },
]; 