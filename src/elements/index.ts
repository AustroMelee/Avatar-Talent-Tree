/**
 * Elements Index - Central Export for All Element Constellations
 * This file serves as the main entry point for all element constellations,
 * providing a centralized way to import and manage different elements.
 */

import type { ConstellationMetadata } from '../types';
import { EARTH_TALENT_NODES } from './earth/earthTalentData';
import { FIRE_CONSTELLATION } from './fire/fireTalentData';
import { STEEL_TALENT_NODES } from './steel/steelTalentData';

/**
 * Elemental Constellation Data - The Four Elements of the Argent Codex
 * Each constellation represents a different philosophical approach to power
 */

/**
 * Air Constellation - The Four Winds
 * Philosophy: Balance, freedom, adaptation, and transcendence
 */
export { 
  AIR_TALENT_NODES, 
  generateAirConnections, 
  AIR_CONSTELLATION, 
  ROOT_NODE as AIR_ROOT_NODE 
} from './air/airTalentData';

/**
 * Fire Constellation - The Eternal Flame
 * Philosophy: The eternal dance between creation and destruction, passion and discipline, life and death
 */
export { 
  FIRE_TALENT_NODES, 
  generateFireConnections, 
  FIRE_CONSTELLATION, 
  FIRE_ROOT_NODES 
} from './fire/fireTalentData';

/**
 * Water Constellation - The Depths Eternal
 * Philosophy: The eternal dance between creation and destruction, memory and forgetting
 */
export { 
  WATER_TALENT_NODES, 
  generateWaterConnections, 
  WATER_CONSTELLATION, 
  ROOT_NODE as WATER_ROOT_NODE 
} from './water/waterTalentData';

/**
 * Earth Constellation - The Four Pillars of Stone
 * Philosophy: The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies
 */
export {
  EARTH_TALENT_NODES,
  EARTH_CONSTELLATION,
  generateEarthConnections,
  generateEarthConnections as generateAllEarthConnections
} from './earth/earthTalentData';

// Export a function that returns the Earth nodes array
export function generateAllEarthNodes() {
  return EARTH_TALENT_NODES;
}

/**
 * Steel Constellation - The Forged Steel
 * Philosophy: The Power of Human Determination
 */
export {
  STEEL_TALENT_NODES,
  STEEL_CONSTELLATION,
  generateSteelConnections,
  generateSteelConnections as generateAllSteelConnections
} from './steel/steelTalentData';

// Export a function that returns the Steel nodes array
export function generateAllSteelNodes() {
  return STEEL_TALENT_NODES;
}

/**
 * Air Constellation - The Four Winds
 * Philosophy: Balance, freedom, adaptation, and transcendence
 */
export const AIR_CONSTELLATION_METADATA: ConstellationMetadata = {
  id: 'air',
  name: 'The Four Winds',
  description: 'Balance, freedom, adaptation, and transcendence through 4 distinct philosophical paths.',
  color: '#89b4fa',
  paths: [
    {
      id: 'gentleBreeze',
      name: 'The Gentle Breeze',
      description: '微風 (Wēi Fēng) - The softest thing in the universe overcomes the hardest thing in the universe',
      flavor: '🍃 Evasion, misdirection, defensive mastery, turning force aside'
    },
    {
      id: 'sacredBreath',
      name: 'The Sacred Breath', 
      description: '聖息 (Shèng Xī) - Air connects all life; to master breath is to understand the unity of existence',
      flavor: '🐂 Meditation, spiritual sight, healing, communion with spirits'
    },
    {
      id: 'wildGale',
      name: 'The Wild Gale',
      description: '狂風 (Kuáng Fēng) - Sometimes the mountain must be moved, and only the hurricane has such strength',
      flavor: '🐉 Offensive techniques, storm mastery, overwhelming force'
    },
    {
      id: 'dancingWind',
      name: 'The Dancing Wind',
      description: '舞風 (Wǔ Fēng) - True freedom is not the absence of restraint, but perfect harmony with movement',
      flavor: '🌀 Mobility, flight, acrobatics, the pure joy of being airborne'
    }
  ]
};

/**
 * Fire Constellation - The Eternal Flame
 * Philosophy: The eternal dance between creation and destruction, passion and discipline, life and death
 */
export const FIRE_CONSTELLATION_METADATA: ConstellationMetadata = FIRE_CONSTELLATION;

/**
 * Water Constellation - The Depths Eternal
 * Philosophy: The eternal dance between creation and destruction, memory and forgetting
 */
export const WATER_CONSTELLATION_METADATA: ConstellationMetadata = {
  id: 'water',
  name: 'The Depths Eternal',
  description: 'The eternal dance between creation and destruction, memory and forgetting through 4 profound philosophical currents.',
  color: '#74c7ec',
  paths: [
    {
      id: 'endlessMirror',
      name: 'The Endless Mirror',
      description: 'Reflections of What Was - Water is memory incarnate. Every drop has touched every shore, carries every story.',
      flavor: '🌊 Adaptation through wisdom, learning from every encounter, becoming stronger through understanding'
    },
    {
      id: 'crimsonTide',
      name: 'The Crimson Tide',
      description: 'Blood Calls to Blood - Life is water given purpose. Blood is the sacred river that connects all living things.',
      flavor: '🩸 Life manipulation, healing mastery, forbidden blood arts'
    },
    {
      id: 'eternalPrison',
      name: 'The Eternal Prison',
      description: 'What Ice Remembers - In ice, water finds its most honest form - unchanging, patient, eternal.',
      flavor: '🧊 Preservation, patience, unstoppable force through immutable will'
    },
    {
      id: 'hungryDeep',
      name: 'The Hungry Deep',
      description: 'Pressure of the Abyss - The ocean\'s deepest truth is hunger. It swallows islands, drowns civilizations.',
      flavor: '🌊 Overwhelming force, pressure mastery, the ocean\'s consuming nature'
    }
  ]
};

/**
 * Earth Constellation - The Four Pillars of Stone
 * Philosophy: The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies
 */
export const EARTH_CONSTELLATION_METADATA: ConstellationMetadata = {
  id: 'earth',
  name: 'The Four Pillars of Stone',
  description: 'The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies.',
  color: '#8B4513',
  paths: [
    {
      id: 'hun_yuan',
      name: 'The Pillar of Hun Yuan (Neutral Jing)',
      description: 'The Waiting Stone - "Listen and wait. The earth teaches patience. Strike when the moment is perfect."',
      flavor: '🦡 Defensive mastery, seismic awareness, perfect timing, counter-attacks'
    },
    {
      id: 'bian_hua',
      name: 'The Pillar of Bian Hua (Transformation)',
      description: 'The Changing Earth - "Earth is not just rock - it is metal waiting to be freed, lava waiting to flow."',
      flavor: '🦎 Sub-bending mastery, material transformation, elemental fusion'
    },
    {
      id: 'gang_qiang',
      name: 'The Pillar of Gang Qiang (Unyielding Strength)',
      description: 'The Eternal Mountain - "Some things must never bend. Be the mountain that weathers all storms."',
      flavor: '🐻 Raw power, overwhelming force, immovable defense, brutal offense'
    },
    {
      id: 'jing_que',
      name: 'The Pillar of Jing Que (Precision Control)',
      description: 'The Sculptor\'s Mind - "True mastery lies not in moving mountains, but in commanding every grain of sand."',
      flavor: '🕷️ Fine control, enemy manipulation, architectural bending, artistic mastery'
    }
  ]
};

/**
 * Steel Constellation - The Forged Steel
 * Philosophy: The Power of Human Determination
 */
export const STEEL_CONSTELLATION_METADATA: ConstellationMetadata = {
  id: 'steel',
  name: 'The Forged Steel',
  description: 'The triumph of mortal will over supernatural power, achieved through dedication, training, and ingenuity.',
  color: '#B0C4DE',
  paths: [
    {
      id: 'silent_blade',
      name: 'The Way of the Silent Blade',
      description: 'Lethal precision, silent movement, the art of ending fights before they begin',
      flavor: '🗡️ Precision, Assassination, Critical Strikes'
    },
    {
      id: 'shield_of_people',
      name: 'The Shield of the People',
      description: 'Defensive mastery, group tactics, inspiring leadership',
      flavor: '🛡️ Protection, Leadership, Sacrifice'
    },
    {
      id: 'flow_of_combat',
      name: 'The Flow of Combat',
      description: 'Adaptability, counter-fighting, chi-blocking techniques',
      flavor: '🌊 Adaptation, Chi-Blocking, Improvisation'
    },
    {
      id: 'mind_of_war',
      name: 'The Mind of War',
      description: 'Tactical supremacy, technological innovation, psychological warfare',
      flavor: '🧠 Strategy, Engineering, Psy-ops'
    }
  ]
};

/**
 * All available constellations
 */
export const CONSTELLATIONS = {
  air: AIR_CONSTELLATION_METADATA,
  fire: FIRE_CONSTELLATION_METADATA,
  water: WATER_CONSTELLATION_METADATA,
  earth: EARTH_CONSTELLATION_METADATA,
  steel: STEEL_CONSTELLATION_METADATA
} as const;

/**
 * Get constellation by ID
 */
export function getConstellation(id: string): ConstellationMetadata | null {
  return CONSTELLATIONS[id as keyof typeof CONSTELLATIONS] || null;
}

/**
 * Get all constellation IDs
 */
export function getConstellationIds(): string[] {
  return Object.keys(CONSTELLATIONS);
}

/**
 * Check if a constellation ID is valid
 */
export function isValidConstellation(id: string): boolean {
  return id in CONSTELLATIONS;
}

/**
 * All available constellations
 */
export const ALL_CONSTELLATIONS = {
  air: 'AIR_CONSTELLATION',
  water: 'WATER_CONSTELLATION', 
  earth: 'EARTH_CONSTELLATION',
  fire: 'FIRE_CONSTELLATION',
  steel: 'STEEL_CONSTELLATION'
} as const;

/**
 * Element type for type safety
 */
export type ElementType = keyof typeof ALL_CONSTELLATIONS; 