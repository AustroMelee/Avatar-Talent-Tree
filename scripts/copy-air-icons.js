import fs from 'fs';
import path from 'path';

/**
 * Copies and renames selected icons for Air path node types
 * Maps original Game Icons to semantic node type names
 */

const sourceDir = path.join(
  'C:', 'Users', 'rohai', 'Desktop',
  'WEBSITE PAGES', 'AVATAR', 'TALENT TREES',
  'talent tree project', 'assets', '1x1'
);

const targetDir = path.join('assets', 'air-icons');

// Icon mapping: nodeType -> [sourceFile, artist]
const iconMapping = {
  'Genesis': ['delapouite/peace-dove.svg', 'delapouite'],
  'Keystone': ['delapouite/wind-turbine.svg', 'delapouite'],
  'Manifestation': ['lorc/tornado.svg', 'lorc'],
  'Axiom': ['lorc/vortex.svg', 'lorc'],
  'Capstone': ['lorc/winged-emblem.svg', 'lorc'],
  'GnosticRite': ['lorc/meditation.svg', 'lorc'],
  'Schism': ['lorc/lightning-storm.svg', 'lorc'],
  'Minor': ['lorc/leaf-swirl.svg', 'lorc']
};

/**
 * Creates directory if it doesn't exist
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Copies and renames an icon file
 */
function copyIcon(sourceFile, targetFile, artist) {
  const sourcePath = path.join(sourceDir, sourceFile);
  const targetPath = path.join(targetDir, targetFile);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied: ${sourceFile} -> ${targetFile}`);
      return true;
    } else {
      console.log(`✗ Source not found: ${sourcePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error copying ${sourceFile}:`, error.message);
    return false;
  }
}

/**
 * Creates a README file for the air icons directory
 */
function createReadme() {
  const readmeContent = `# Air Path Icons

This directory contains SVG icons for Air path talent tree nodes, sourced from the Game Icons collection.

## License
These icons are licensed under CC-BY 3.0. Original source: https://game-icons.net

## Node Type Icons
- **Genesis**: peace-dove.svg - Represents the gentle beginning of the air path
- **Keystone**: wind-turbine.svg - Major milestone in harnessing air power
- **Manifestation**: tornado.svg - Powerful visible air effect
- **Axiom**: vortex.svg - Core truth/essence of air
- **Capstone**: winged-emblem.svg - Ultimate air mastery
- **GnosticRite**: meditation.svg - Spiritual trial/rite
- **Schism**: lightning-storm.svg - Risky/dangerous path
- **Minor**: leaf-swirl.svg - Small air-themed upgrades

## Usage
Reference these icons in your code as: \`assets/air-icons/{NodeType}.svg\`
`;

  const readmePath = path.join(targetDir, 'README.md');
  fs.writeFileSync(readmePath, readmeContent);
  console.log('✓ Created README.md');
}

/**
 * Main execution
 */
function main() {
  console.log('🪶 Copying Air Path Icons...\n');
  
  // Ensure target directory exists
  ensureDirectoryExists(targetDir);
  
  let successCount = 0;
  let totalCount = Object.keys(iconMapping).length;
  
  // Copy each icon
  for (const [nodeType, [sourceFile, artist]] of Object.entries(iconMapping)) {
    const targetFile = `${nodeType}.svg`;
    if (copyIcon(sourceFile, targetFile, artist)) {
      successCount++;
    }
  }
  
  // Create README
  createReadme();
  
  console.log(`\n🎯 Summary: ${successCount}/${totalCount} icons copied successfully`);
  console.log(`📁 Icons saved to: ${targetDir}`);
  
  if (successCount === totalCount) {
    console.log('✅ All Air path icons ready for use!');
  } else {
    console.log('⚠️  Some icons failed to copy. Check the errors above.');
  }
}

// Run the script
main(); 