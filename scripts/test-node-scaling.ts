/**
 * Test script to verify the new importance-based node scaling system
 * This script tests that nodes are properly scaled based on their importance level
 */

import { TalentTreeRenderer } from '../src/talentTreeRenderer';
import { AIR_TALENT_NODES } from '../src/elements/air/airTalentData';
import { ARGENT_CODEX_CONSTANTS } from '../src/types';
import type { TalentNode, RenderConfig } from '../src/types';

/**
 * Tests the importance-based node scaling system
 */
function testNodeScaling(): void {
  console.log('🎯 Testing Importance-Based Node Scaling System...\n');

  // Create a mock render config for testing
  const mockCanvas = document.createElement('canvas');
  const mockConfig: RenderConfig = {
    canvas: mockCanvas,
    ctx: mockCanvas.getContext('2d')!,
    viewport: { x: 0, y: 0, width: 800, height: 600 },
    debug: false
  };

  // Create a renderer instance
  const renderer = new TalentTreeRenderer(mockConfig);
  
  // Create a mock talent tree with all nodes
  const mockTalentTree = {
    nodes: AIR_TALENT_NODES,
    connections: [],
    totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
    spentPK: 0,
    chosenPaths: new Map<string, string>(),
    allocatedNodes: new Set<string>(),
    covenant: null,
    philosophicalWounds: [],
    metadata: {
      name: 'Test Tree',
      description: 'Test tree for scaling verification',
      background: 'air'
    }
  };

  // Call render to initialize the allNodes reference
  renderer.render(mockTalentTree, 1, { x: 0, y: 0 });

  // Test different node types and their expected importance levels
  const testCases = [
    { type: 'Genesis', expectedImportance: 5, expectedSize: 90 },
    { type: 'Capstone', expectedImportance: 4, expectedSize: 80 },
    { type: 'Schism', expectedImportance: 3, expectedSize: 70 },
    { type: 'Bridge', expectedImportance: 2, expectedSize: 65 },
    { type: 'Synthesis', expectedImportance: 2, expectedSize: 65 },
    { type: 'Keystone', expectedImportance: 2, expectedSize: 55 },
    { type: 'GnosticRite', expectedImportance: 2, expectedSize: 55 },
    { type: 'Minor', expectedImportance: 0, expectedSize: 35 },
    { type: 'Axiom', expectedImportance: 0, expectedSize: 35 }
  ];

  console.log('📊 Testing Node Importance and Scaling:\n');

  testCases.forEach(testCase => {
    // Find a node of this type
    const testNode = AIR_TALENT_NODES.find(node => node.type === testCase.type);
    
    if (testNode) {
      // Get the actual size using the renderer's method
      const actualSize = (renderer as any).getNodeSize(testNode);
      
      // Calculate expected importance (we'll need to access the private method)
      const actualImportance = (renderer as any).calculateNodeImportance(testNode, AIR_TALENT_NODES);
      
      console.log(`${testNode.type} Node: "${testNode.name}"`);
      console.log(`  - Expected Importance: ${testCase.expectedImportance}`);
      console.log(`  - Actual Importance: ${actualImportance}`);
      console.log(`  - Expected Size: ${testCase.expectedSize}`);
      console.log(`  - Actual Size: ${actualSize}`);
      console.log(`  - Status: ${actualImportance === testCase.expectedImportance && actualSize === testCase.expectedSize ? '✅ PASS' : '❌ FAIL'}`);
      console.log('');
    } else {
      console.log(`${testCase.type} Node: ❌ NOT FOUND in talent tree`);
      console.log('');
    }
  });

  // Test parent vs leaf node scaling
  console.log('🌳 Testing Parent vs Leaf Node Scaling:\n');
  
  // Find a parent node (one that has children)
  const parentNode = AIR_TALENT_NODES.find(node => 
    AIR_TALENT_NODES.some(otherNode => otherNode.prerequisites.includes(node.id))
  );
  
  // Find a leaf node (one that has no children)
  const leafNode = AIR_TALENT_NODES.find(node => 
    !AIR_TALENT_NODES.some(otherNode => otherNode.prerequisites.includes(node.id))
  );

  if (parentNode && leafNode) {
    const parentSize = (renderer as any).getNodeSize(parentNode);
    const leafSize = (renderer as any).getNodeSize(leafNode);
    const parentImportance = (renderer as any).calculateNodeImportance(parentNode, AIR_TALENT_NODES);
    const leafImportance = (renderer as any).calculateNodeImportance(leafNode, AIR_TALENT_NODES);

    console.log(`Parent Node: "${parentNode.name}" (${parentNode.type})`);
    console.log(`  - Importance: ${parentImportance}`);
    console.log(`  - Size: ${parentSize}`);
    console.log(`  - Has Children: ✅`);
    console.log('');

    console.log(`Leaf Node: "${leafNode.name}" (${leafNode.type})`);
    console.log(`  - Importance: ${leafImportance}`);
    console.log(`  - Size: ${leafSize}`);
    console.log(`  - Has Children: ❌`);
    console.log('');

    console.log(`Size Difference: ${parentSize - leafSize} (Parent should be larger)`);
    console.log(`Importance Difference: ${parentImportance - leafImportance} (Parent should have higher importance)`);
  }

  console.log('\n🎯 Node Scaling Test Complete!');
}

// Run the test if this script is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testNodeScaling);
  } else {
    testNodeScaling();
  }
} else {
  // Node.js environment
  testNodeScaling();
} 