import fs from 'fs';
import path from 'path';

/**
 * Fix Air icon assignments using all available icon sources
 * Avoids fallback icons and ensures better thematic matches
 */

// Get all available icons from different sources
function getAllAvailableIcons() {
  const icons = [];
  
  // Source 1: 1x1 folder (SVG icons)
  const oneXOnePath = 'assets/1x1';
  if (fs.existsSync(oneXOnePath)) {
    const artists = fs.readdirSync(oneXOnePath);
    artists.forEach(artist => {
      const artistPath = path.join(oneXOnePath, artist);
      if (fs.statSync(artistPath).isDirectory()) {
        const files = fs.readdirSync(artistPath);
        files.forEach(file => {
          if (file.endsWith('.svg')) {
            icons.push({
              path: `assets/1x1/${artist}/${file}`,
              source: '1x1',
              artist: artist,
              name: file.replace('.svg', '')
            });
          }
        });
      }
    });
  }
  
  // Source 2: Icon list 1 (PNG icons)
  const iconList1Path = 'assets/icon list 1/FREE/Icon set 1/1x';
  if (fs.existsSync(iconList1Path)) {
    const files = fs.readdirSync(iconList1Path);
    files.forEach(file => {
      if (file.endsWith('.png')) {
        icons.push({
          path: `assets/icon list 1/FREE/Icon set 1/1x/${file}`,
          source: 'icon-list-1',
          artist: 'Sungraphica',
          name: file.replace('.png', '')
        });
      }
    });
  }
  
  return icons;
}

// Get Air node definitions to understand themes
function getAirNodes() {
  const airPath = 'src/elements/air';
  const nodes = [];
  
  const files = fs.readdirSync(airPath);
  files.forEach(file => {
    if (file.endsWith('.ts') && file !== 'airNodeIcons.ts' && file !== 'index.ts') {
      const content = fs.readFileSync(path.join(airPath, file), 'utf8');
      const nodeMatches = content.match(/export const (\w+): TalentNode = {[\s\S]*?};/g);
      if (nodeMatches) {
        nodeMatches.forEach(match => {
          const nodeIdMatch = match.match(/export const (\w+): TalentNode/);
          if (nodeIdMatch) {
            const nodeId = nodeIdMatch[1];
            const nameMatch = match.match(/name: ['"`]([^'"`]+)['"`]/);
            const descriptionMatch = match.match(/description: ['"`]([^'"`]+)['"`]/);
            const nodeTypeMatch = match.match(/nodeType: ['"`]([^'"`]+)['"`]/);
            
            nodes.push({
              id: nodeId,
              name: nameMatch ? nameMatch[1] : '',
              description: descriptionMatch ? descriptionMatch[1] : '',
              nodeType: nodeTypeMatch ? nodeTypeMatch[1] : '',
              file: file
            });
          }
        });
      }
    }
  });
  
  return nodes;
}

// Create intelligent icon assignments
function createIconAssignments() {
  const icons = getAllAvailableIcons();
  const nodes = getAirNodes();
  
  console.log(`Found ${icons.length} available icons`);
  console.log(`Found ${nodes.length} Air nodes`);
  
  // Filter out problematic icons (winged-emblem, etc.)
  const goodIcons = icons.filter(icon => 
    !icon.name.includes('winged-emblem') &&
    !icon.name.includes('floppy') &&
    !icon.name.includes('disk') &&
    !icon.name.includes('computer') &&
    !icon.name.includes('tech')
  );
  
  console.log(`Using ${goodIcons.length} good icons`);
  
  // Create thematic assignments
  const assignments = {};
  const usedIcons = new Set();
  
  // Priority assignments for key nodes
  const priorityAssignments = {
    'genesis': ['wind', 'air', 'breath', 'spirit', 'magic', 'star', 'crystal'],
    'rite_wind': ['wind', 'air', 'breeze', 'gust'],
    'rite_freedom': ['freedom', 'wings', 'bird', 'eagle', 'hawk'],
    'rite_sky': ['sky', 'cloud', 'heaven', 'celestial'],
    'cap_flight': ['wings', 'bird', 'eagle', 'hawk', 'flight'],
    'cap_mastery': ['mastery', 'crown', 'star', 'gem'],
    'cap_freedom': ['freedom', 'wings', 'bird', 'eagle'],
    'APEX_A': ['apex', 'crown', 'star', 'mastery'],
    'APEX_B': ['apex', 'crown', 'star', 'mastery'],
    'APEX_C': ['apex', 'crown', 'star', 'mastery']
  };
  
  // Assign priority nodes first
  Object.entries(priorityAssignments).forEach(([nodeId, themes]) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      const icon = findBestIcon(goodIcons, themes, usedIcons);
      if (icon) {
        assignments[nodeId] = icon.path;
        usedIcons.add(icon.path);
        console.log(`Assigned ${icon.path} to ${nodeId} (${node.name})`);
      }
    }
  });
  
  // Assign remaining nodes
  nodes.forEach(node => {
    if (!assignments[node.id]) {
      const themes = extractThemes(node);
      const icon = findBestIcon(goodIcons, themes, usedIcons);
      if (icon) {
        assignments[node.id] = icon.path;
        usedIcons.add(icon.path);
        console.log(`Assigned ${icon.path} to ${node.id} (${node.name})`);
      }
    }
  });
  
  return assignments;
}

// Extract themes from node data
function extractThemes(node) {
  const themes = [];
  const text = `${node.name} ${node.description} ${node.nodeType}`.toLowerCase();
  
  // Add themes based on node type
  if (node.nodeType.includes('Genesis')) themes.push('genesis', 'origin', 'beginning', 'star', 'crystal');
  if (node.nodeType.includes('Minor')) themes.push('minor', 'small', 'basic');
  if (node.nodeType.includes('Major')) themes.push('major', 'powerful', 'strong');
  if (node.nodeType.includes('Apex')) themes.push('apex', 'crown', 'mastery', 'star');
  if (node.nodeType.includes('Rite')) themes.push('rite', 'ritual', 'magic', 'spell');
  if (node.nodeType.includes('Capstone')) themes.push('capstone', 'crown', 'mastery', 'final');
  if (node.nodeType.includes('Schism')) themes.push('schism', 'split', 'choice', 'path');
  
  // Add themes based on content
  if (text.includes('wind') || text.includes('breeze')) themes.push('wind', 'air', 'breeze');
  if (text.includes('freedom') || text.includes('free')) themes.push('freedom', 'wings', 'bird');
  if (text.includes('sky') || text.includes('heaven')) themes.push('sky', 'cloud', 'heaven');
  if (text.includes('flight') || text.includes('fly')) themes.push('flight', 'wings', 'bird');
  if (text.includes('mastery') || text.includes('master')) themes.push('mastery', 'crown', 'star');
  if (text.includes('momentum') || text.includes('speed')) themes.push('momentum', 'speed', 'arrow');
  if (text.includes('bullet') || text.includes('projectile')) themes.push('bullet', 'arrow', 'projectile');
  
  return themes;
}

// Find best matching icon
function findBestIcon(icons, themes, usedIcons) {
  // First try exact theme matches
  for (const theme of themes) {
    const matches = icons.filter(icon => 
      icon.name.toLowerCase().includes(theme) && !usedIcons.has(icon.path)
    );
    if (matches.length > 0) {
      return matches[0];
    }
  }
  
  // Then try partial matches
  for (const theme of themes) {
    const matches = icons.filter(icon => 
      icon.name.toLowerCase().includes(theme.substring(0, 3)) && !usedIcons.has(icon.path)
    );
    if (matches.length > 0) {
      return matches[0];
    }
  }
  
  // Finally, use any unused icon
  const unused = icons.filter(icon => !usedIcons.has(icon.path));
  if (unused.length > 0) {
    return unused[0];
  }
  
  return null;
}

// Generate the TypeScript file
function generateIconFile(assignments) {
  const content = `/**
 * Intelligent icon assignments for Air nodes
 * Icons matched to node themes and descriptions from multiple sources
 */
export const AIR_NODE_ICONS: Record<string, string> = {
${Object.entries(assignments).map(([nodeId, iconPath]) => `  '${nodeId}': '${iconPath}',`).join('\n')}
};

/**
 * Get unique icon for a specific Air node
 */
export function getAirNodeIcon(nodeId: string): string {
  return AIR_NODE_ICONS[nodeId] || 'assets/air-icons/Minor.svg';
}
`;

  fs.writeFileSync('src/elements/air/airNodeIcons.ts', content);
  console.log('Generated airNodeIcons.ts with new assignments');
}

// Main execution
try {
  const assignments = createIconAssignments();
  generateIconFile(assignments);
  console.log(`Successfully assigned ${Object.keys(assignments).length} icons`);
} catch (error) {
  console.error('Error:', error);
} 