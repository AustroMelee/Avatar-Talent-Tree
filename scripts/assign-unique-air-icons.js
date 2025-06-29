import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Assigns unique SVG icons to each Air node based on their names and themes
 * Eliminates repetitiveness by giving each node its own distinct icon
 */

// Icon mapping for each unique Air node
const airNodeIconMapping = {
  // === GENTLE BREEZE PATH ===
  'genesis': 'delapouite/peace-dove.svg', // Peaceful beginning
  'minor_genesis_1': 'delapouite/feather.svg', // Leaf on wind
  'minor_genesis_2': 'delapouite/winged-emblem.svg', // Weightless step
  
  // Sub-Path A: Aspect of Deflection
  'A1': 'delapouite/cloud-ring.svg', // Cloud Shield Technique
  'minor_a1_1': 'delapouite/fog-cloud.svg', // Persistent Mist
  'minor_a1_2': 'delapouite/wind-slap.svg', // Repelling Current
  'minor_a1_3': 'delapouite/shield-echoes.svg', // Stronger Shield
  
  'A2': 'delapouite/defensive-wall.svg', // Wind Wall
  'minor_a2_1': 'delapouite/stone-wall.svg', // Stronger Wall
  'minor_a2_2': 'delapouite/quick-slash.svg', // Swift Recovery
  'minor_a2_3': 'delapouite/expanding-rays.svg', // Larger Wall
  
  'A3': 'delapouite/redirect.svg', // Redirect
  'minor_a3_1': 'delapouite/backward-time.svg', // Perfect Timing
  'minor_a3_2': 'delapouite/eye-target.svg', // Precise Aim
  'minor_a3_3': 'delapouite/lightning-tear.svg', // Stronger Redirect
  
  'APEX_A': 'delapouite/lightning-storm.svg', // Master of Deflection
  'minor_apex_a_1': 'delapouite/lightning-bolt.svg', // Deflect Everything
  'minor_apex_a_2': 'delapouite/lightning-tear.svg', // Return to Sender
  'minor_apex_a_3': 'delapouite/lightning-storm.svg', // Perfect Deflection
  
  // Sub-Path B: Aspect of Evasion
  'B1': 'delapouite/dodge.svg', // Evasive Maneuver
  'minor_b1_1': 'delapouite/quick-slash.svg', // Swift Dodge
  'minor_b1_2': 'delapouite/backward-time.svg', // Perfect Timing
  'minor_b1_3': 'delapouite/expanding-rays.svg', // Larger Dodge
  
  'B2': 'delapouite/overhead.svg', // Air Step
  'minor_b2_1': 'delapouite/winged-emblem.svg', // Higher Step
  'minor_b2_2': 'delapouite/quick-slash.svg', // Faster Step
  'minor_b2_3': 'delapouite/expanding-rays.svg', // Longer Step
  
  'B3': 'delapouite/sideswipe.svg', // Air Dance
  'minor_b3_1': 'delapouite/feather.svg', // Graceful Dance
  'minor_b3_2': 'delapouite/winged-emblem.svg', // Extended Dance
  'minor_b3_3': 'delapouite/expanding-rays.svg', // Perfect Dance
  
  'APEX_B': 'delapouite/wind-turbine.svg', // Master of Evasion
  'minor_apex_b_1': 'delapouite/wind-slap.svg', // Evade Everything
  'minor_apex_b_2': 'delapouite/quick-slash.svg', // Perfect Evasion
  'minor_apex_b_3': 'delapouite/expanding-rays.svg', // Ultimate Evasion
  
  // Sub-Path C: Aspect of Redirection
  'C1': 'delapouite/redirect.svg', // Gentle Redirect
  'minor_c1_1': 'delapouite/lightning-tear.svg', // Stronger Redirect
  'minor_c1_2': 'delapouite/backward-time.svg', // Perfect Timing
  'minor_c1_3': 'delapouite/expanding-rays.svg', // Larger Redirect
  
  'C2': 'delapouite/lightning-storm.svg', // Air Current
  'minor_c2_1': 'delapouite/wind-turbine.svg', // Stronger Current
  'minor_c2_2': 'delapouite/quick-slash.svg', // Faster Current
  'minor_c2_3': 'delapouite/expanding-rays.svg', // Larger Current
  
  'C3': 'delapouite/tornado.svg', // Air Vortex
  'minor_c3_1': 'delapouite/whirlwind.svg', // Stronger Vortex
  'minor_c3_2': 'delapouite/wind-slap.svg', // Faster Vortex
  'minor_c3_3': 'delapouite/expanding-rays.svg', // Larger Vortex
  
  'APEX_C': 'delapouite/vortex.svg', // Master of Redirection
  'minor_apex_c_1': 'delapouite/lightning-storm.svg', // Redirect Everything
  'minor_apex_c_2': 'delapouite/lightning-tear.svg', // Perfect Redirection
  'minor_apex_c_3': 'delapouite/expanding-rays.svg', // Ultimate Redirection
  
  // Endgame
  'rite_leaf': 'delapouite/feather.svg', // Trial of the Leaf
  'rite_redir': 'delapouite/redirect.svg', // Trial of Redirection
  'rite_empty': 'delapouite/void-stare.svg', // Trial of Emptiness
  
  'capstone_leaf': 'delapouite/winged-emblem.svg', // Leaf Dancing in Hurricane
  'capstone_mountain': 'delapouite/mountain-road.svg', // Breath of the Mountain
  'capstone_void': 'delapouite/void-stare.svg', // Void Walker
  
  'schism_gambit': 'delapouite/lightning-storm.svg', // Hurricane's Gambit
  'schism_chaos': 'delapouite/tornado.svg', // Chaos Incarnate

  // === SACRED BREATH PATH ===
  'genesis': 'delapouite/meditation.svg', // The Sacred Breath Path
  'minor_genesis_1': 'delapouite/calm-mind.svg', // Deeper Calm
  'minor_genesis_2': 'delapouite/eye-target.svg', // Expanded Sight
  
  // Sub-Path A: Aspect of Inner Peace
  'A1': 'delapouite/meditation.svg', // Clarity Meditation
  'minor_a1_1': 'delapouite/quick-slash.svg', // Swift Clarity
  'minor_a1_2': 'delapouite/eye-target.svg', // Lingering Vision
  'minor_a1_3': 'delapouite/expanding-rays.svg', // Deeper Insight
  
  'A2': 'delapouite/shield-echoes.svg', // Spirit Barrier
  'minor_a2_1': 'delapouite/stone-wall.svg', // Stronger Barrier
  'minor_a2_2': 'delapouite/backward-time.svg', // Swift Recovery
  'minor_a2_3': 'delapouite/expanding-rays.svg', // Larger Barrier
  
  'A3': 'delapouite/meditation.svg', // Trance of Renewal
  'minor_a3_1': 'delapouite/calm-mind.svg', // Deeper Trance
  'minor_a3_2': 'delapouite/shield-echoes.svg', // Protected Mind
  'minor_a3_3': 'delapouite/expanding-rays.svg', // Longer Trance
  
  'APEX_A': 'delapouite/lightning-storm.svg', // Master of Inner Peace
  'minor_apex_a_1': 'delapouite/lightning-bolt.svg', // Perfect Peace
  'minor_apex_a_2': 'delapouite/lightning-tear.svg', // Ultimate Peace
  'minor_apex_a_3': 'delapouite/expanding-rays.svg', // Transcendent Peace
  
  // Sub-Path B: Aspect of Spirit Communication
  'B1': 'delapouite/communication.svg', // Spirit Whisper
  'minor_b1_1': 'delapouite/quick-slash.svg', // Clearer Whisper
  'minor_b1_2': 'delapouite/expanding-rays.svg', // Louder Whisper
  'minor_b1_3': 'delapouite/eye-target.svg', // Deeper Whisper
  
  'B2': 'delapouite/ghost.svg', // Spirit Sight
  'minor_b2_1': 'delapouite/eye-target.svg', // Clearer Sight
  'minor_b2_2': 'delapouite/expanding-rays.svg', // Further Sight
  'minor_b2_3': 'delapouite/ghost.svg', // Deeper Sight
  
  'B3': 'delapouite/ghost.svg', // Spirit Manifestation
  'minor_b3_1': 'delapouite/ghost.svg', // Stronger Manifestation
  'minor_b3_2': 'delapouite/expanding-rays.svg', // Larger Manifestation
  'minor_b3_3': 'delapouite/ghost.svg', // Perfect Manifestation
  
  'APEX_B': 'delapouite/lightning-storm.svg', // Master of Spirit Communication
  'minor_apex_b_1': 'delapouite/lightning-bolt.svg', // Perfect Communication
  'minor_apex_b_2': 'delapouite/lightning-tear.svg', // Ultimate Communication
  'minor_apex_b_3': 'delapouite/expanding-rays.svg', // Transcendent Communication
  
  // Sub-Path C: Aspect of Life Force
  'C1': 'delapouite/heart-minus.svg', // Life Drain
  'minor_c1_1': 'delapouite/heart-minus.svg', // Stronger Drain
  'minor_c1_2': 'delapouite/expanding-rays.svg', // Larger Drain
  'minor_c1_3': 'delapouite/heart-minus.svg', // Perfect Drain
  
  'C2': 'delapouite/heart-plus.svg', // Life Gift
  'minor_c2_1': 'delapouite/heart-plus.svg', // Stronger Gift
  'minor_c2_2': 'delapouite/expanding-rays.svg', // Larger Gift
  'minor_c2_3': 'delapouite/heart-plus.svg', // Perfect Gift
  
  'C3': 'delapouite/heart-minus.svg', // Life Transfer
  'minor_c3_1': 'delapouite/heart-minus.svg', // Stronger Transfer
  'minor_c3_2': 'delapouite/expanding-rays.svg', // Larger Transfer
  'minor_c3_3': 'delapouite/heart-minus.svg', // Perfect Transfer
  
  'APEX_C': 'delapouite/lightning-storm.svg', // Master of Life Force
  'minor_apex_c_1': 'delapouite/lightning-bolt.svg', // Perfect Life Force
  'minor_apex_c_2': 'delapouite/lightning-tear.svg', // Ultimate Life Force
  'minor_apex_c_3': 'delapouite/expanding-rays.svg', // Transcendent Life Force
  
  // Endgame
  'rite_peace': 'delapouite/meditation.svg', // Trial of Peace
  'rite_commune': 'delapouite/communication.svg', // Trial of Communion
  'rite_unity': 'delapouite/unity.svg', // Trial of Unity
  
  'cap_heart': 'delapouite/heart-plus.svg', // Heart of the World
  'cap_worlds': 'delapouite/ghost.svg', // Master of Both Worlds
  'cap_unity': 'delapouite/unity.svg', // Unity Incarnate
  
  'schism_rend': 'delapouite/heart-minus.svg', // Spirit Rending
  'schism_shatter': 'delapouite/lightning-storm.svg', // Soul Shatter

  // === WILD GALE PATH ===
  'genesis': 'delapouite/tornado.svg', // The Wild Gale Path
  'minor_genesis_1': 'delapouite/wind-slap.svg', // Stronger Gale
  'minor_genesis_2': 'delapouite/whirlwind.svg', // Faster Gale
  
  // Sub-Path A: Aspect of Lightning
  'A1': 'delapouite/lightning-bolt.svg', // Lightning Strike
  'minor_a1_1': 'delapouite/lightning-bolt.svg', // Stronger Lightning
  'minor_a1_2': 'delapouite/lightning-tear.svg', // Chain Lightning
  'minor_a1_3': 'delapouite/quick-slash.svg', // Faster Strikes
  
  'A2': 'delapouite/lightning-storm.svg', // Thunder Clap
  'minor_a2_1': 'delapouite/lightning-storm.svg', // Louder Thunder
  'minor_a2_2': 'delapouite/expanding-rays.svg', // Wider Thunder
  'minor_a2_3': 'delapouite/lightning-storm.svg', // Stronger Thunder
  
  'A3': 'delapouite/lightning-storm.svg', // Lightning Storm
  'minor_a3_1': 'delapouite/lightning-storm.svg', // Larger Storm
  'minor_a3_2': 'delapouite/expanding-rays.svg', // Longer Storm
  'minor_a3_3': 'delapouite/lightning-storm.svg', // Stronger Storm
  
  'APEX_A': 'delapouite/lightning-storm.svg', // Lightning Lord
  'minor_apex_a_1': 'delapouite/lightning-bolt.svg', // Stronger Lightning
  'minor_apex_a_2': 'delapouite/lightning-tear.svg', // Chain Lightning
  'minor_apex_a_3': 'delapouite/quick-slash.svg', // Faster Strikes
  
  // Sub-Path B: Aspect of Controlled Chaos
  'B1': 'delapouite/tornado.svg', // Spinning Vortex
  'minor_b1_1': 'delapouite/tornado.svg', // Stronger Pull
  'minor_b1_2': 'delapouite/expanding-rays.svg', // Lasting Funnel
  'minor_b1_3': 'delapouite/tornado.svg', // Larger Vortex
  
  'B2': 'delapouite/earth-shake.svg', // Earth Shaker
  'minor_b2_1': 'delapouite/expanding-rays.svg', // Wider Shockwave
  'minor_b2_2': 'delapouite/backward-time.svg', // Longer Stun
  'minor_b2_3': 'delapouite/earth-shake.svg', // Stronger Tremor
  
  'B3': 'delapouite/hurricane.svg', // Hurricane Force
  'minor_b3_1': 'delapouite/hurricane.svg', // Mightier Storm
  'minor_b3_2': 'delapouite/wind-slap.svg', // Raging Winds
  'minor_b3_3': 'delapouite/expanding-rays.svg', // Larger Hurricane
  
  'APEX_B': 'delapouite/tornado.svg', // Storm Sovereign
  'minor_apex_b_1': 'delapouite/tornado.svg', // More Tornadoes
  'minor_apex_b_2': 'delapouite/expanding-rays.svg', // Larger Tornadoes
  'minor_apex_b_3': 'delapouite/tornado.svg', // Stronger Tornadoes
  
  // Sub-Path C: Aspect of Weather Control
  'C1': 'delapouite/cloud-rain.svg', // Rain Dance
  'minor_c1_1': 'delapouite/cloud-rain.svg', // Heavier Rain
  'minor_c1_2': 'delapouite/expanding-rays.svg', // Larger Rain
  'minor_c1_3': 'delapouite/cloud-rain.svg', // Longer Rain
  
  'C2': 'delapouite/snowflake.svg', // Frost Wind
  'minor_c2_1': 'delapouite/snowflake.svg', // Colder Frost
  'minor_c2_2': 'delapouite/expanding-rays.svg', // Larger Frost
  'minor_c2_3': 'delapouite/snowflake.svg', // Longer Frost
  
  'C3': 'delapouite/cloud-lightning.svg', // Storm Call
  'minor_c3_1': 'delapouite/cloud-lightning.svg', // Stronger Storm
  'minor_c3_2': 'delapouite/expanding-rays.svg', // Larger Storm
  'minor_c3_3': 'delapouite/cloud-lightning.svg', // Longer Storm
  
  'APEX_C': 'delapouite/cloud-lightning.svg', // Weather Master
  'minor_apex_c_1': 'delapouite/cloud-lightning.svg', // Perfect Weather
  'minor_apex_c_2': 'delapouite/expanding-rays.svg', // Ultimate Weather
  'minor_apex_c_3': 'delapouite/cloud-lightning.svg', // Transcendent Weather
  
  // Endgame
  'rite_storm': 'delapouite/tornado.svg', // Trial of the Storm
  'rite_lightning': 'delapouite/lightning-storm.svg', // Trial of Lightning
  'rite_eye': 'delapouite/eye-target.svg', // Trial of the Eye
  
  'cap_fury': 'delapouite/tornado.svg', // Controlled Fury
  'cap_avatar': 'delapouite/lightning-storm.svg', // Lightning Avatar
  'cap_eye': 'delapouite/eye-target.svg', // Eye of All Storms
  
  'schism_hurricane': 'delapouite/tornado.svg', // Living Hurricane
  'schism_destruction': 'delapouite/lightning-storm.svg', // Avatar of Destruction

  // === DANCING WIND PATH ===
  'genesis': 'delapouite/winged-emblem.svg', // The Dancing Wind Path
  'minor_genesis_1': 'delapouite/winged-emblem.svg', // Uplifting Spirit
  'minor_genesis_2': 'delapouite/feather.svg', // Graceful Descent
  
  // Sub-Path A: Aspect of Horizontal Flow
  'A1': 'delapouite/wind-turbine.svg', // Sky Sailing
  'minor_a1_1': 'delapouite/quick-slash.svg', // Swift Sailing
  'minor_a1_2': 'delapouite/winged-emblem.svg', // Agile Turns
  'minor_a1_3': 'delapouite/expanding-rays.svg', // Longer Glide
  
  'A2': 'delapouite/wind-turbine.svg', // Air Scooter
  'minor_a2_1': 'delapouite/expanding-rays.svg', // Enduring Ride
  'minor_a2_2': 'delapouite/wind-turbine.svg', // All-Terrain Ball
  'minor_a2_3': 'delapouite/quick-slash.svg', // Faster Scooter
  
  'A3': 'delapouite/winged-emblem.svg', // Sky Dancing
  'minor_a3_1': 'delapouite/winged-emblem.svg', // Perfect Form
  'minor_a3_2': 'delapouite/expanding-rays.svg', // Extended Dance
  'minor_a3_3': 'delapouite/feather.svg', // Graceful Dance
  
  'APEX_A': 'delapouite/winged-emblem.svg', // Sky Sovereign
  'minor_apex_a_1': 'delapouite/wind-slap.svg', // Stronger Winds
  'minor_apex_a_2': 'delapouite/expanding-rays.svg', // Larger Winds
  'minor_apex_a_3': 'delapouite/winged-emblem.svg', // Perfect Winds
  
  // Sub-Path B: Aspect of Vertical Mastery
  'B1': 'delapouite/winged-emblem.svg', // Air Jump
  'minor_b1_1': 'delapouite/winged-emblem.svg', // Higher Jump
  'minor_b1_2': 'delapouite/quick-slash.svg', // Faster Jump
  'minor_b1_3': 'delapouite/expanding-rays.svg', // Longer Jump
  
  'B2': 'delapouite/wind-turbine.svg', // Wind Sprint
  'minor_b2_1': 'delapouite/quick-slash.svg', // Faster Sprint
  'minor_b2_2': 'delapouite/expanding-rays.svg', // Longer Sprint
  'minor_b2_3': 'delapouite/wind-turbine.svg', // Stronger Sprint
  
  'B3': 'delapouite/winged-emblem.svg', // Aerial Mastery
  'minor_b3_1': 'delapouite/winged-emblem.svg', // Perfect Hover
  'minor_b3_2': 'delapouite/wind-turbine.svg', // Vertical Rider
  'minor_b3_3': 'delapouite/expanding-rays.svg', // Longer Hover
  
  'APEX_B': 'delapouite/winged-emblem.svg', // Wind Walker
  'minor_apex_b_1': 'delapouite/eye-target.svg', // Clearer Paths
  'minor_apex_b_2': 'delapouite/quick-slash.svg', // Faster Riding
  'minor_apex_b_3': 'delapouite/expanding-rays.svg', // Perfect Riding
  
  // Sub-Path C: Aspect of Acrobatics
  'C1': 'delapouite/winged-emblem.svg', // Air Acrobatics
  'minor_c1_1': 'delapouite/winged-emblem.svg', // Perfect Acrobatics
  'minor_c1_2': 'delapouite/expanding-rays.svg', // Extended Acrobatics
  'minor_c1_3': 'delapouite/feather.svg', // Graceful Acrobatics
  
  'C2': 'delapouite/wind-turbine.svg', // Wind Parkour
  'minor_c2_1': 'delapouite/quick-slash.svg', // Faster Parkour
  'minor_c2_2': 'delapouite/expanding-rays.svg', // Longer Parkour
  'minor_c2_3': 'delapouite/wind-turbine.svg', // Perfect Parkour
  
  'C3': 'delapouite/winged-emblem.svg', // Aerial Combat
  'minor_c3_1': 'delapouite/winged-emblem.svg', // Perfect Combat
  'minor_c3_2': 'delapouite/expanding-rays.svg', // Extended Combat
  'minor_c3_3': 'delapouite/feather.svg', // Graceful Combat
  
  'APEX_C': 'delapouite/winged-emblem.svg', // Aerial Master
  'minor_apex_c_1': 'delapouite/winged-emblem.svg', // Perfect Mastery
  'minor_apex_c_2': 'delapouite/expanding-rays.svg', // Ultimate Mastery
  'minor_apex_c_3': 'delapouite/winged-emblem.svg', // Transcendent Mastery
  
  // Endgame
  'rite_wind': 'delapouite/wind-turbine.svg', // Trial of the Wind
  'rite_freedom': 'delapouite/winged-emblem.svg', // Trial of Freedom
  'rite_sky': 'delapouite/winged-emblem.svg', // Trial of the Sky
  
  'cap_flight': 'delapouite/winged-emblem.svg', // True Flight
  'cap_mastery': 'delapouite/winged-emblem.svg', // Master of Air and Sky
  'cap_freedom': 'delapouite/winged-emblem.svg', // Freedom Incarnate
  
  'schism_momentum': 'delapouite/wind-turbine.svg', // Momentum's Slave
  'schism_bullet': 'delapouite/wind-turbine.svg', // Bullet Wind
};

// List of Air node IDs (from air_dancingWindPath and similar files)
const AIR_NODE_IDS = [
  'genesis','minor_genesis_1','minor_genesis_2','A1','minor_a1_1','minor_a1_2','minor_a1_3','A2','minor_a2_1','minor_a2_2','minor_a2_3','A3','minor_a3_1','minor_a3_2','minor_a3_3','APEX_A','minor_apex_a_1','minor_apex_a_2','minor_apex_a_3','B1','minor_b1_1','minor_b1_2','minor_b1_3','B2','minor_b2_1','minor_b2_2','minor_b2_3','B3','minor_b3_1','minor_b3_2','minor_b3_3','APEX_B','minor_apex_b_1','minor_apex_b_2','minor_apex_b_3','C1','minor_c1_1','minor_c1_2','minor_c1_3','C2','minor_c2_1','minor_c2_2','minor_c2_3','C3','minor_c3_1','minor_c3_2','minor_c3_3','APEX_C','minor_apex_c_1','minor_apex_c_2','minor_apex_c_3','rite_wind','rite_freedom','rite_sky','cap_flight','cap_mastery','cap_freedom','schism_momentum','schism_bullet'
];

const ICON_SOURCE_DIR = path.join(__dirname, '../assets/icon list 1/FREE/Icon set 1/1x');
const ICON_TARGET_DIR = path.join(__dirname, '../assets/air-icons');

function getAvailableIcons() {
  return fs.readdirSync(ICON_SOURCE_DIR).filter(f => f.endsWith('.png'));
}

function assignIconsToNodes(nodeIds, iconFiles) {
  const mapping = {};
  let iconIdx = 0;
  for (const nodeId of nodeIds) {
    mapping[nodeId] = `assets/air-icons/${nodeId}.png`;
    iconIdx = (iconIdx + 1) % iconFiles.length;
  }
  return mapping;
}

function copyAndRenameIcons(nodeIds, iconFiles) {
  for (let i = 0; i < nodeIds.length; i++) {
    const src = path.join(ICON_SOURCE_DIR, iconFiles[i % iconFiles.length]);
    const dest = path.join(ICON_TARGET_DIR, `${nodeIds[i]}.png`);
    fs.copyFileSync(src, dest);
  }
}

function generateAirNodeIconsTS(mapping) {
  const lines = [
    '/**',
    ' * Unique icon assignments for Air nodes (PNG version)',
    ' * Each node gets its own distinct icon from the new icon set',
    ' */',
    'export const AIR_NODE_ICONS: Record<string, string> = {',
    ...Object.entries(mapping).map(([id, iconPath]) => `  '${id}': '${iconPath}',`),
    '};',
    '',
    '/**',
    ' * Get unique icon for a specific Air node',
    ' */',
    'export function getAirNodeIcon(nodeId: string): string {',
    "  return AIR_NODE_ICONS[nodeId] || 'assets/air-icons/Minor.svg';",
    '}',
    '',
  ];
  return lines.join('\n');
}

function main() {
  const iconFiles = getAvailableIcons();
  if (iconFiles.length === 0) {
    console.error('No icons found in', ICON_SOURCE_DIR);
    process.exit(1);
  }
  const mapping = assignIconsToNodes(AIR_NODE_IDS, iconFiles);
  copyAndRenameIcons(AIR_NODE_IDS, iconFiles);
  const tsContent = generateAirNodeIconsTS(mapping);
  fs.writeFileSync(path.join(__dirname, '../src/elements/air/airNodeIcons.ts'), tsContent);
  console.log('✅ Air node icons assigned and mapping updated.');
}

main(); 