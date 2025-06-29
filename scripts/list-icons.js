import fs from 'fs';
import path from 'path';

const iconDir = path.join(
  'C:', 'Users', 'rohai', 'Desktop',
  'WEBSITE PAGES', 'AVATAR', 'TALENT TREES',
  'talent tree project', 'assets', '1x1'
);

function listIconsRecursive(dir, icons = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listIconsRecursive(fullPath, icons);
    } else if (entry.isFile() && (entry.name.endsWith('.svg') || entry.name.endsWith('.png'))) {
      icons.push(fullPath);
    }
  }
  return icons;
}

const icons = listIconsRecursive(iconDir);
console.log(`Found ${icons.length} icons:\n`);
icons.forEach(icon => console.log('•', icon)); 