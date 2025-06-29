import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Find the correct path for an icon by searching through all artist directories
 */
function findIconPath(iconName) {
  const assetsDir = path.join(__dirname, '..', 'assets', '1x1');
  
  if (!fs.existsSync(assetsDir)) {
    console.error('Assets directory not found:', assetsDir);
    return null;
  }
  
  const artistDirs = fs.readdirSync(assetsDir);
  
  for (const artistDir of artistDirs) {
    const artistPath = path.join(assetsDir, artistDir);
    if (fs.statSync(artistPath).isDirectory()) {
      const iconPath = path.join(artistPath, iconName);
      if (fs.existsSync(iconPath)) {
        return `assets/1x1/${artistDir}/${iconName}`;
      }
    }
  }
  
  return null;
}

/**
 * Fix the Air node icons by finding correct paths
 */
function fixAirNodeIcons() {
  const currentIcons = {
    'genesis': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_genesis_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_genesis_2': 'assets/1x1/delapouite/feather.svg',
    'A1': 'assets/1x1/delapouite/wind-turbine.svg',
    'minor_a1_1': 'assets/1x1/delapouite/quick-slash.svg',
    'minor_a1_2': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_a1_3': 'assets/1x1/delapouite/expanding-rays.svg',
    'A2': 'assets/1x1/delapouite/wind-turbine.svg',
    'minor_a2_1': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_a2_2': 'assets/1x1/delapouite/wind-turbine.svg',
    'minor_a2_3': 'assets/1x1/delapouite/quick-slash.svg',
    'A3': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_a3_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_a3_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_a3_3': 'assets/1x1/delapouite/feather.svg',
    'APEX_A': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_apex_a_1': 'assets/1x1/delapouite/wind-slap.svg',
    'minor_apex_a_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_apex_a_3': 'assets/1x1/delapouite/winged-emblem.svg',
    'B1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_b1_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_b1_2': 'assets/1x1/delapouite/quick-slash.svg',
    'minor_b1_3': 'assets/1x1/delapouite/expanding-rays.svg',
    'B2': 'assets/1x1/delapouite/wind-turbine.svg',
    'minor_b2_1': 'assets/1x1/delapouite/quick-slash.svg',
    'minor_b2_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_b2_3': 'assets/1x1/delapouite/wind-turbine.svg',
    'B3': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_b3_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_b3_2': 'assets/1x1/delapouite/wind-turbine.svg',
    'minor_b3_3': 'assets/1x1/delapouite/expanding-rays.svg',
    'APEX_B': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_apex_b_1': 'assets/1x1/delapouite/eye-target.svg',
    'minor_apex_b_2': 'assets/1x1/delapouite/quick-slash.svg',
    'minor_apex_b_3': 'assets/1x1/delapouite/expanding-rays.svg',
    'C1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_c1_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_c1_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_c1_3': 'assets/1x1/delapouite/feather.svg',
    'C2': 'assets/1x1/delapouite/wind-turbine.svg',
    'minor_c2_1': 'assets/1x1/delapouite/quick-slash.svg',
    'minor_c2_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_c2_3': 'assets/1x1/delapouite/wind-turbine.svg',
    'C3': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_c3_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_c3_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_c3_3': 'assets/1x1/delapouite/feather.svg',
    'APEX_C': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_apex_c_1': 'assets/1x1/delapouite/winged-emblem.svg',
    'minor_apex_c_2': 'assets/1x1/delapouite/expanding-rays.svg',
    'minor_apex_c_3': 'assets/1x1/delapouite/winged-emblem.svg',
    'rite_leaf': 'assets/1x1/delapouite/feather.svg',
    'rite_redir': 'assets/1x1/delapouite/redirect.svg',
    'rite_empty': 'assets/1x1/delapouite/void-stare.svg',
    'capstone_leaf': 'assets/1x1/delapouite/winged-emblem.svg',
    'capstone_mountain': 'assets/1x1/delapouite/mountain-road.svg',
    'capstone_void': 'assets/1x1/delapouite/void-stare.svg',
    'schism_gambit': 'assets/1x1/delapouite/lightning-storm.svg',
    'schism_chaos': 'assets/1x1/delapouite/tornado.svg',
    'rite_peace': 'assets/1x1/delapouite/meditation.svg',
    'rite_commune': 'assets/1x1/delapouite/communication.svg',
    'rite_unity': 'assets/1x1/delapouite/unity.svg',
    'cap_heart': 'assets/1x1/delapouite/heart-plus.svg',
    'cap_worlds': 'assets/1x1/delapouite/ghost.svg',
    'cap_unity': 'assets/1x1/delapouite/unity.svg',
    'schism_rend': 'assets/1x1/delapouite/heart-minus.svg',
    'schism_shatter': 'assets/1x1/delapouite/lightning-storm.svg',
    'rite_storm': 'assets/1x1/delapouite/tornado.svg',
    'rite_lightning': 'assets/1x1/delapouite/lightning-storm.svg',
    'rite_eye': 'assets/1x1/delapouite/eye-target.svg',
    'cap_fury': 'assets/1x1/delapouite/tornado.svg',
    'cap_avatar': 'assets/1x1/delapouite/lightning-storm.svg',
    'cap_eye': 'assets/1x1/delapouite/eye-target.svg',
    'schism_hurricane': 'assets/1x1/delapouite/tornado.svg',
    'schism_destruction': 'assets/1x1/delapouite/lightning-storm.svg',
    'rite_wind': 'assets/1x1/delapouite/wind-turbine.svg',
    'rite_freedom': 'assets/1x1/delapouite/winged-emblem.svg',
    'rite_sky': 'assets/1x1/delapouite/winged-emblem.svg',
    'cap_flight': 'assets/1x1/delapouite/winged-emblem.svg',
    'cap_mastery': 'assets/1x1/delapouite/winged-emblem.svg',
    'cap_freedom': 'assets/1x1/delapouite/winged-emblem.svg',
    'schism_momentum': 'assets/1x1/delapouite/wind-turbine.svg',
    'schism_bullet': 'assets/1x1/delapouite/wind-turbine.svg',
  };

  const fixedIcons = {};
  const notFound = [];

  console.log('Fixing Air node icon paths...\n');

  for (const [nodeId, iconPath] of Object.entries(currentIcons)) {
    const iconName = path.basename(iconPath);
    const correctPath = findIconPath(iconName);
    
    if (correctPath) {
      fixedIcons[nodeId] = correctPath;
      console.log(`✓ ${nodeId}: ${iconPath} → ${correctPath}`);
    } else {
      notFound.push(iconName);
      console.log(`✗ ${nodeId}: ${iconPath} → NOT FOUND`);
    }
  }

  if (notFound.length > 0) {
    console.log(`\n⚠️  ${notFound.length} icons not found:`, notFound);
  }

  // Generate the updated TypeScript file
  const tsContent = `/**
 * Unique icon assignments for Air nodes
 * Each node gets its own distinct icon to eliminate repetitiveness
 */
export const AIR_NODE_ICONS: Record<string, string> = {
${Object.entries(fixedIcons).map(([nodeId, iconPath]) => `  '${nodeId}': '${iconPath}',`).join('\n')}
};

/**
 * Get unique icon for a specific Air node
 */
export function getAirNodeIcon(nodeId: string): string {
  return AIR_NODE_ICONS[nodeId] || 'assets/air-icons/Minor.svg';
}
`;

  const outputPath = path.join(__dirname, '..', 'src', 'elements', 'air', 'airNodeIcons.ts');
  fs.writeFileSync(outputPath, tsContent);
  
  console.log(`\n✅ Updated ${outputPath}`);
  console.log(`📊 Fixed ${Object.keys(fixedIcons).length} icon paths`);
}

fixAirNodeIcons(); 