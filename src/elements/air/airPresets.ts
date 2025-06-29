/**
 * Preset Builds for the Air Constellation
 * These define the KEY endpoint nodes for iconic characters.
 * The logic will automatically fill in all prerequisites.
 */

export interface PresetBuild {
  id: string;
  name: string;
  description: string;
  nodeIds: string[];
}

export const AIR_PRESETS: PresetBuild[] = [
  {
    id: 'aang',
    name: 'Aang',
    description: 'A traditional, playful, and evasive style focusing on mobility and non-violent defense.',
    nodeIds: [
      'enhanced_agility', // pinnacle of evasive movement
      'air_scooter', // his signature invention
      'air_swipe', // key defensive move against projectiles
    ],
  },
  {
    id: 'zaheer',
    name: 'Zaheer',
    description: 'A ruthless and pragmatic style combining lethal force with the ultimate expression of freedom: flight.',
    nodeIds: [
      'suffocation', // his signature lethal technique
      'flight', // his ultimate achievement
    ],
  },
  {
    id: 'yangchen',
    name: 'Yangchen',
    description: 'A style defined by immense spiritual connection and overwhelming, decisive force to maintain balance.',
    nodeIds: [
      'spiritual_projection', // representing her deep spiritual connection
      'minor_suff_1', // Vacuum: her unique, non-lethal application of a deadly technique
      'minor_sa_1', // Deafening Shout: her unique sound-based attack
    ],
  },
]; 