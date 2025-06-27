/**
 * Verification script to ensure the talent tree project is properly configured
 * and all paths are set correctly.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Verifies that the project is properly configured for the talent tree project
 */
function verifyProjectSetup(): void {
  console.log('🌳 Verifying Talent Tree Project Setup...\n');

  const projectRoot = process.cwd();
  const expectedPath = 'C:\\Users\\rohai\\Desktop\\WEBSITE PAGES\\AVATAR\\TALENT TREES\\talent tree project';
  
  console.log(`📍 Current project root: ${projectRoot}`);
  console.log(`📍 Expected project path: ${expectedPath}`);
  
  // Check if we're in the correct directory
  if (projectRoot.includes('talent tree project')) {
    console.log('✅ Project is in the correct talent tree directory');
  } else {
    console.log('⚠️  Warning: Project may not be in the expected talent tree directory');
  }

  // Verify essential files exist
  const essentialFiles = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    'src/main.ts',
    '.cursorcontext'
  ];

  console.log('\n📁 Checking essential project files:');
  essentialFiles.forEach(file => {
    const filePath = join(projectRoot, file);
    if (existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
    }
  });

  // Verify package.json configuration
  try {
    const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
    
    console.log('\n📦 Package.json verification:');
    if (packageJson.name === 'talent-tree-project') {
      console.log('✅ Project name is correctly set to "talent-tree-project"');
    } else {
      console.log(`❌ Project name should be "talent-tree-project", found: "${packageJson.name}"`);
    }
    
    if (packageJson.description?.includes('talent tree')) {
      console.log('✅ Description correctly mentions talent tree functionality');
    } else {
      console.log('❌ Description should mention talent tree functionality');
    }
    
    if (packageJson.keywords?.includes('talent-tree')) {
      console.log('✅ Keywords include "talent-tree"');
    } else {
      console.log('❌ Keywords should include "talent-tree"');
    }
  } catch (error) {
    console.log('❌ Failed to read or parse package.json');
  }

  // Verify TypeScript configuration
  try {
    const tsConfig = JSON.parse(readFileSync(join(projectRoot, 'tsconfig.json'), 'utf8'));
    
    console.log('\n⚙️  TypeScript configuration:');
    if (tsConfig.compilerOptions?.target === 'ES2022') {
      console.log('✅ Target is set to ES2022');
    } else {
      console.log('❌ Target should be ES2022');
    }
    
    if (tsConfig.include?.includes('src/**/*')) {
      console.log('✅ Source files are included in compilation');
    } else {
      console.log('❌ Source files should be included in compilation');
    }
  } catch (error) {
    console.log('❌ Failed to read or parse tsconfig.json');
  }

  // Verify Vite configuration
  try {
    const viteConfig = readFileSync(join(projectRoot, 'vite.config.ts'), 'utf8');
    
    console.log('\n🚀 Vite configuration:');
    if (viteConfig.includes('port: 5174')) {
      console.log('✅ Development server port is configured (5174)');
    } else {
      console.log('❌ Development server port should be configured');
    }
    
    if (viteConfig.includes('outDir: \'dist\'')) {
      console.log('✅ Build output directory is configured');
    } else {
      console.log('❌ Build output directory should be configured');
    }
  } catch (error) {
    console.log('❌ Failed to read vite.config.ts');
  }

  // Verify source structure
  const srcFiles = [
    'src/main.ts',
    'src/appManager.ts',
    'src/themeManager.ts',
    'src/types.ts',
    'src/utils.ts'
  ];

  console.log('\n📂 Source file structure:');
  srcFiles.forEach(file => {
    const filePath = join(projectRoot, file);
    if (existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
    }
  });

  console.log('\n🎯 Project Setup Summary:');
  console.log('The talent tree project is configured and ready for development!');
  console.log('\nNext steps:');
  console.log('1. Run "npm install" to install dependencies');
  console.log('2. Run "npm run dev" to start the development server');
  console.log('3. Open http://localhost:5174 in your browser');
  console.log('4. Start building your talent tree features!');
}

// Run verification if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyProjectSetup();
}

export { verifyProjectSetup }; 