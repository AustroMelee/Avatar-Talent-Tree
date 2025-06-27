/**
 * Script to add icon properties to all talent nodes
 * This script updates the visual properties to include icon identifiers
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Icon mapping based on node type
const ICON_MAP: Record<string, string> = {
  'Genesis': 'genesis',
  'Axiom': 'axiom', 
  'Manifestation': 'manifestation',
  'Lens': 'lens',
  'Capstone': 'capstone',
  'Schism': 'schism',
  'Covenant': 'covenant'
};

function addIconsToNodes(): void {
  const dataFilePath = join(__dirname, '../src/airTalentData.ts');
  let content = readFileSync(dataFilePath, 'utf8');
  
  // Find all visual properties that don't have icons
  const visualPattern = /visual: \{ color: '[^']+', size: \d+ \}/g;
  
  content = content.replace(visualPattern, (match) => {
    // Extract the node type from the context
    const lines = content.split('\n');
    const matchIndex = content.indexOf(match);
    const lineIndex = content.substring(0, matchIndex).split('\n').length - 1;
    
    // Look for the type property in nearby lines
    let nodeType = 'axiom'; // default
    for (let i = Math.max(0, lineIndex - 10); i < Math.min(lines.length, lineIndex + 10); i++) {
      const typeMatch = lines[i].match(/type: '([^']+)'/);
      if (typeMatch) {
        nodeType = typeMatch[1];
        break;
      }
    }
    
    const icon = ICON_MAP[nodeType] || 'axiom';
    return `visual: { color: '${match.match(/color: '([^']+)'/)?.[1]}', size: ${match.match(/size: (\d+)/)?.[1]}, icon: '${icon}' }`;
  });
  
  writeFileSync(dataFilePath, content, 'utf8');
  console.log('Successfully added icons to all talent nodes');
}

// Run the script
addIconsToNodes(); 