import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Air node IDs with their themes and descriptions
const AIR_NODES = {
  // Genesis and core nodes
  'genesis': { theme: 'wind', description: 'The Dancing Wind Path - core air mastery', keywords: ['wind', 'air', 'core', 'genesis'] },
  'minor_genesis_1': { theme: 'uplift', description: 'Uplifting Spirit - higher jumps', keywords: ['up', 'lift', 'spirit', 'jump'] },
  'minor_genesis_2': { theme: 'grace', description: 'Graceful Descent - controlled falling', keywords: ['grace', 'descent', 'fall', 'control'] },
  
  // Path A - Horizontal Flow / Sky Sailing
  'A1': { theme: 'sailing', description: 'Sky Sailing - horizontal gliding', keywords: ['sail', 'glide', 'horizontal', 'sky'] },
  'minor_a1_1': { theme: 'speed', description: 'Swift Sailing - faster gliding', keywords: ['swift', 'fast', 'speed', 'sail'] },
  'minor_a1_2': { theme: 'agility', description: 'Agile Turns - sharp direction changes', keywords: ['agile', 'turn', 'direction', 'sharp'] },
  'minor_a1_3': { theme: 'endurance', description: 'Longer Glide - extended distance', keywords: ['long', 'endure', 'distance', 'extend'] },
  
  'A2': { theme: 'scooter', description: 'Air Scooter - riding air ball', keywords: ['scooter', 'ride', 'ball', 'air'] },
  'minor_a2_1': { theme: 'duration', description: 'Enduring Ride - longer lasting', keywords: ['endure', 'last', 'duration', 'ride'] },
  'minor_a2_2': { theme: 'terrain', description: 'All-Terrain Ball - rough ground', keywords: ['terrain', 'ground', 'rough', 'all'] },
  'minor_a2_3': { theme: 'velocity', description: 'Faster Scooter - greater speed', keywords: ['fast', 'speed', 'velocity', 'scooter'] },
  
  'A3': { theme: 'dance', description: 'Sky Dancing - aerial maneuvers', keywords: ['dance', 'aerial', 'maneuver', 'sky'] },
  'minor_a3_1': { theme: 'perfection', description: 'Perfect Form - effective maneuvers', keywords: ['perfect', 'form', 'effective', 'skill'] },
  'minor_a3_2': { theme: 'chain', description: 'Extended Dance - multiple maneuvers', keywords: ['chain', 'multiple', 'extend', 'dance'] },
  'minor_a3_3': { theme: 'elegance', description: 'Graceful Dance - efficient movement', keywords: ['grace', 'elegant', 'efficient', 'dance'] },
  
  'APEX_A': { theme: 'sovereign', description: 'Sky Sovereign - protective winds', keywords: ['sovereign', 'protect', 'wind', 'sky'] },
  'minor_apex_a_1': { theme: 'strength', description: 'Stronger Winds - more effective', keywords: ['strong', 'power', 'effective', 'wind'] },
  'minor_apex_a_2': { theme: 'area', description: 'Wider Winds - larger coverage', keywords: ['wide', 'area', 'cover', 'wind'] },
  'minor_apex_a_3': { theme: 'persistence', description: 'Longer Winds - enduring protection', keywords: ['long', 'endure', 'persist', 'wind'] },
  
  // Path B - Vertical Mastery
  'B1': { theme: 'spiral', description: 'Spiraling Spout - rising air column', keywords: ['spiral', 'spout', 'rise', 'column'] },
  'minor_b1_1': { theme: 'height', description: 'Higher Spout - greater heights', keywords: ['high', 'height', 'spout', 'rise'] },
  'minor_b1_2': { theme: 'stability', description: 'Stable Column - easier to ride', keywords: ['stable', 'column', 'easy', 'ride'] },
  'minor_b1_3': { theme: 'acceleration', description: 'Faster Spout - quick launch', keywords: ['fast', 'launch', 'quick', 'spout'] },
  
  'B2': { theme: 'sprint', description: 'Wind Sprint - explosive speed bursts', keywords: ['sprint', 'burst', 'explosive', 'wind'] },
  'minor_b2_1': { theme: 'sustain', description: 'Sustained Wind - longer boost', keywords: ['sustain', 'long', 'boost', 'wind'] },
  'minor_b2_2': { theme: 'trail', description: 'Trailing Breeze - maintain speed', keywords: ['trail', 'breeze', 'maintain', 'speed'] },
  'minor_b2_3': { theme: 'power', description: 'Stronger Sprint - greater boost', keywords: ['strong', 'power', 'boost', 'sprint'] },
  
  'B3': { theme: 'mastery', description: 'Aerial Mastery - hover and ride currents', keywords: ['mastery', 'hover', 'current', 'aerial'] },
  'minor_b3_1': { theme: 'precision', description: 'Perfect Hover - absolute stability', keywords: ['perfect', 'hover', 'stable', 'precision'] },
  'minor_b3_2': { theme: 'climb', description: 'Vertical Rider - climb surfaces', keywords: ['climb', 'vertical', 'surface', 'ride'] },
  'minor_b3_3': { theme: 'endurance', description: 'Longer Hover - extended periods', keywords: ['long', 'hover', 'endure', 'period'] },
  
  'APEX_B': { theme: 'walker', description: 'Wind Walker - perceive wind currents', keywords: ['walk', 'perceive', 'current', 'wind'] },
  'minor_apex_b_1': { theme: 'vision', description: 'Clearer Paths - see currents better', keywords: ['vision', 'clear', 'path', 'see'] },
  'minor_apex_b_2': { theme: 'efficiency', description: 'Faster Riding - efficient movement', keywords: ['fast', 'efficient', 'ride', 'move'] },
  'minor_apex_b_3': { theme: 'multiple', description: 'Multiple Currents - ride many', keywords: ['multiple', 'current', 'many', 'ride'] },
  
  // Path C - Boundless Motion
  'C1': { theme: 'reckless', description: 'Reckless Joy - extreme altitudes', keywords: ['reckless', 'extreme', 'altitude', 'joy'] },
  'minor_c1_1': { theme: 'training', description: 'High Altitude Training - reduce cost', keywords: ['training', 'altitude', 'reduce', 'cost'] },
  'minor_c1_2': { theme: 'vigor', description: 'Soaring Vigor - frequent abilities', keywords: ['vigor', 'soar', 'frequent', 'ability'] },
  'minor_c1_3': { theme: 'limitless', description: 'Higher Heights - no limits', keywords: ['limitless', 'high', 'height', 'no-limit'] },
  
  'C2': { theme: 'takeoff', description: 'Swift Takeoff - instant activation', keywords: ['takeoff', 'swift', 'instant', 'activate'] },
  'minor_c2_1': { theme: 'explosive', description: 'Explosive Start - burst speed', keywords: ['explosive', 'burst', 'start', 'speed'] },
  'minor_c2_2': { theme: 'evasion', description: 'Evasive Launch - intangibility', keywords: ['evasive', 'intangible', 'launch', 'dodge'] },
  'minor_c2_3': { theme: 'recovery', description: 'Faster Recovery - quick cooldown', keywords: ['recovery', 'fast', 'cooldown', 'quick'] },
  
  'C3': { theme: 'freedom', description: 'Freedom\'s Flight - unlimited movement', keywords: ['freedom', 'unlimited', 'flight', 'move'] },
  'minor_c3_1': { theme: 'extend', description: 'Extended Freedom - longer duration', keywords: ['extend', 'freedom', 'long', 'duration'] },
  'minor_c3_2': { theme: 'control', description: 'Perfect Control - precise movement', keywords: ['control', 'perfect', 'precise', 'move'] },
  'minor_c3_3': { theme: 'power', description: 'Greater Freedom - more powerful', keywords: ['power', 'freedom', 'greater', 'strong'] },
  
  'APEX_C': { theme: 'boundless', description: 'Boundless Sky - 3D movement', keywords: ['boundless', 'sky', '3d', 'movement'] },
  'minor_apex_c_1': { theme: 'fluidity', description: 'Faster Movement - fluid motion', keywords: ['fluid', 'fast', 'move', 'motion'] },
  'minor_apex_c_2': { theme: 'precision', description: 'Perfect Control - precise 3D', keywords: ['perfect', 'control', 'precise', '3d'] },
  'minor_apex_c_3': { theme: 'range', description: 'Boundless Range - greater distance', keywords: ['range', 'boundless', 'distance', 'far'] },
  
  // Endgame nodes
  'rite_wind': { theme: 'harmony', description: 'Trial of the Wind - harmony with air', keywords: ['harmony', 'wind', 'trial', 'air'] },
  'rite_freedom': { theme: 'liberation', description: 'Trial of Freedom - unrestricted movement', keywords: ['freedom', 'liberation', 'unrestricted', 'trial'] },
  'rite_sky': { theme: 'command', description: 'Trial of the Sky - master 3D space', keywords: ['command', 'sky', 'master', '3d'] },
  
  'cap_flight': { theme: 'true_flight', description: 'True Flight - unassisted flight', keywords: ['flight', 'true', 'unassisted', 'fly'] },
  'cap_mastery': { theme: 'supreme', description: 'Master of Air and Sky - aerial combat', keywords: ['master', 'supreme', 'aerial', 'combat'] },
  'cap_freedom': { theme: 'incarnate', description: 'Freedom Incarnate - inspire others', keywords: ['freedom', 'incarnate', 'inspire', 'beacon'] },
  
  'schism_momentum': { theme: 'slave', description: 'Momentum\'s Slave - speed without control', keywords: ['momentum', 'slave', 'speed', 'no-control'] },
  'schism_bullet': { theme: 'weapon', description: 'Bullet Wind - pure kinetic force', keywords: ['bullet', 'weapon', 'kinetic', 'force'] }
};

// Icon sources with their themes
const ICON_SOURCES = [
  {
    name: 'Game Icons (1x1)',
    path: path.join(__dirname, '../assets/1x1'),
    themes: {
      'wind': ['wind-turbine.svg', 'tornado.svg', 'wind-slap.svg', 'windmill.svg', 'windsock.svg'],
      'air': ['winged-emblem.svg', 'feather.svg', 'feathered-wing.svg', 'two-feathers.svg'],
      'flight': ['winged-emblem.svg', 'feather.svg', 'feathered-wing.svg'],
      'speed': ['quick-slash.svg', 'wind-turbine.svg', 'speedometer.svg'],
      'spiral': ['spiral-hilt.svg', 'spiral-lollipop.svg'],
      'sprint': ['quick-slash.svg', 'wind-turbine.svg'],
      'mastery': ['winged-emblem.svg', 'skills.svg'],
      'freedom': ['winged-emblem.svg', 'feather.svg'],
      'harmony': ['meditation.svg', 'unity.svg'],
      'vision': ['eye-target.svg', 'eye.svg'],
      'control': ['eye-target.svg', 'skills.svg'],
      'power': ['lightning-storm.svg', 'tornado.svg'],
      'grace': ['feather.svg', 'winged-emblem.svg'],
      'agility': ['quick-slash.svg', 'feather.svg'],
      'endurance': ['mountain-road.svg', 'wind-turbine.svg'],
      'precision': ['eye-target.svg', 'skills.svg'],
      'elegance': ['feather.svg', 'winged-emblem.svg'],
      'sovereign': ['winged-emblem.svg', 'crown.svg'],
      'strength': ['lightning-storm.svg', 'tornado.svg'],
      'area': ['expanding-rays.svg', 'wind-turbine.svg'],
      'persistence': ['mountain-road.svg', 'wind-turbine.svg'],
      'height': ['mountain-road.svg', 'winged-emblem.svg'],
      'stability': ['mountain-road.svg', 'shield-impact.svg'],
      'acceleration': ['quick-slash.svg', 'wind-turbine.svg'],
      'sustain': ['wind-turbine.svg', 'mountain-road.svg'],
      'trail': ['wind-turbine.svg', 'feather.svg'],
      'hover': ['winged-emblem.svg', 'feather.svg'],
      'climb': ['mountain-road.svg', 'winged-emblem.svg'],
      'walker': ['mountain-road.svg', 'wind-turbine.svg'],
      'efficiency': ['quick-slash.svg', 'wind-turbine.svg'],
      'multiple': ['expanding-rays.svg', 'wind-turbine.svg'],
      'reckless': ['lightning-storm.svg', 'tornado.svg'],
      'training': ['skills.svg', 'mountain-road.svg'],
      'vigor': ['lightning-storm.svg', 'wind-turbine.svg'],
      'limitless': ['infinity.svg', 'winged-emblem.svg'],
      'takeoff': ['quick-slash.svg', 'wind-turbine.svg'],
      'explosive': ['lightning-storm.svg', 'quick-slash.svg'],
      'evasion': ['feather.svg', 'quick-slash.svg'],
      'recovery': ['heart-plus.svg', 'skills.svg'],
      'extend': ['expanding-rays.svg', 'wind-turbine.svg'],
      'fluidity': ['wind-turbine.svg', 'feather.svg'],
      'range': ['expanding-rays.svg', 'winged-emblem.svg'],
      'liberation': ['winged-emblem.svg', 'feather.svg'],
      'command': ['winged-emblem.svg', 'lightning-storm.svg'],
      'true_flight': ['winged-emblem.svg', 'feather.svg'],
      'supreme': ['lightning-storm.svg', 'winged-emblem.svg'],
      'incarnate': ['winged-emblem.svg', 'unity.svg'],
      'slave': ['lightning-storm.svg', 'tornado.svg'],
      'weapon': ['lightning-storm.svg', 'quick-slash.svg']
    }
  },
  {
    name: 'Icon Set 1 (PNG)',
    path: path.join(__dirname, '../assets/icon list 1/FREE/Icon set 1/1x'),
    themes: {
      'wind': ['Asset 1.png', 'Asset 2.png', 'Asset 3.png', 'Asset 4.png', 'Asset 5.png'],
      'air': ['Asset 6.png', 'Asset 7.png', 'Asset 8.png', 'Asset 9.png', 'Asset 10.png'],
      'flight': ['Asset 11.png', 'Asset 12.png', 'Asset 13.png', 'Asset 14.png', 'Asset 15.png'],
      'speed': ['Asset 16.png', 'Asset 17.png', 'Asset 18.png', 'Asset 19.png', 'Asset 20.png'],
      'spiral': ['Asset 21.png', 'Asset 22.png', 'Asset 23.png', 'Asset 24.png', 'Asset 25.png'],
      'sprint': ['Asset 26.png', 'Asset 27.png', 'Asset 28.png', 'Asset 29.png', 'Asset 30.png'],
      'mastery': ['Asset 31.png', 'Asset 32.png', 'Asset 33.png', 'Asset 34.png', 'Asset 35.png'],
      'freedom': ['Asset 36.png', 'Asset 37.png', 'Asset 38.png', 'Asset 39.png', 'Asset 40.png'],
      'harmony': ['Asset 41.png', 'Asset 42.png', 'Asset 43.png', 'Asset 44.png', 'Asset 45.png'],
      'vision': ['Asset 46.png', 'Asset 47.png', 'Asset 48.png', 'Asset 49.png', 'Asset 50.png'],
      'control': ['Asset 51.png', 'Asset 52.png', 'Asset 53.png', 'Asset 54.png', 'Asset 55.png'],
      'power': ['Asset 56.png', 'Asset 57.png', 'Asset 58.png', 'Asset 59.png', 'Asset 60.png'],
      'grace': ['Asset 61.png', 'Asset 62.png', 'Asset 63.png', 'Asset 64.png', 'Asset 65.png'],
      'agility': ['Asset 66.png', 'Asset 67.png', 'Asset 68.png', 'Asset 69.png', 'Asset 70.png'],
      'endurance': ['Asset 71.png', 'Asset 72.png', 'Asset 73.png', 'Asset 74.png', 'Asset 75.png'],
      'precision': ['Asset 76.png', 'Asset 77.png', 'Asset 78.png', 'Asset 79.png', 'Asset 80.png'],
      'elegance': ['Asset 81.png', 'Asset 82.png', 'Asset 83.png', 'Asset 84.png', 'Asset 85.png'],
      'sovereign': ['Asset 86.png', 'Asset 87.png', 'Asset 88.png']
    }
  }
];

function findBestIconForNode(nodeId, nodeInfo) {
  const { theme, keywords } = nodeInfo;
  
  // Try to find icons that match the theme
  for (const source of ICON_SOURCES) {
    if (source.themes[theme]) {
      const iconName = source.themes[theme][0]; // Take the first matching icon
      const iconPath = path.join(source.path, iconName);
      if (fs.existsSync(iconPath)) {
        return {
          source: source.name,
          path: iconPath,
          relativePath: `assets/${source.name === 'Game Icons (1x1)' ? '1x1' : 'icon list 1/FREE/Icon set 1/1x'}/${iconName}`
        };
      }
    }
  }
  
  // Fallback: look for icons that match any keyword
  for (const keyword of keywords) {
    for (const source of ICON_SOURCES) {
      for (const [sourceTheme, icons] of Object.entries(source.themes)) {
        if (sourceTheme.includes(keyword) || keyword.includes(sourceTheme)) {
          const iconName = icons[0];
          const iconPath = path.join(source.path, iconName);
          if (fs.existsSync(iconPath)) {
            return {
              source: source.name,
              path: iconPath,
              relativePath: `assets/${source.name === 'Game Icons (1x1)' ? '1x1' : 'icon list 1/FREE/Icon set 1/1x'}/${iconName}`
            };
          }
        }
      }
    }
  }
  
  // Final fallback: use a generic air/wind icon
  const fallbackIcon = path.join(__dirname, '../assets/1x1/lorc/winged-emblem.svg');
  return {
    source: 'Fallback',
    path: fallbackIcon,
    relativePath: 'assets/1x1/lorc/winged-emblem.svg'
  };
}

function generateAirNodeIconsTS(mapping) {
  const lines = [
    '/**',
    ' * Intelligent icon assignments for Air nodes',
    ' * Icons matched to node themes and descriptions',
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
  console.log('🎯 Intelligently assigning icons to Air nodes...\n');
  
  const mapping = {};
  const assignments = [];
  
  for (const [nodeId, nodeInfo] of Object.entries(AIR_NODES)) {
    const iconMatch = findBestIconForNode(nodeId, nodeInfo);
    mapping[nodeId] = iconMatch.relativePath;
    
    assignments.push({
      nodeId,
      theme: nodeInfo.theme,
      description: nodeInfo.description,
      icon: iconMatch.relativePath,
      source: iconMatch.source
    });
    
    console.log(`✅ ${nodeId}: ${nodeInfo.description}`);
    console.log(`   Theme: ${nodeInfo.theme} → Icon: ${iconMatch.relativePath} (${iconMatch.source})`);
    console.log('');
  }
  
  // Generate the TypeScript file
  const tsContent = generateAirNodeIconsTS(mapping);
  fs.writeFileSync(path.join(__dirname, '../src/elements/air/airNodeIcons.ts'), tsContent);
  
  console.log(`🎯 Completed intelligent icon assignment for ${Object.keys(mapping).length} Air nodes`);
  console.log(`📁 Updated: src/elements/air/airNodeIcons.ts`);
}

main(); 