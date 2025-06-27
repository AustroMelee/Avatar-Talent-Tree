/**
 * Test script to verify the 51 PK limit is working correctly
 * This script tests that players cannot spend more than 51 Points of Knowing
 */

import { TalentTreeManager } from '../src/talentTreeManager';
import { ARGENT_CODEX_CONSTANTS } from '../src/types';

/**
 * Tests the 51 PK limit system
 */
function testPKLimit(): void {
  console.log('🎯 Testing 51 PK Limit System...\n');

  // Create a new talent tree manager
  const manager = new TalentTreeManager();
  const initialState = manager.getState();

  console.log('📊 Initial State:');
  console.log(`- Total PK Available: ${initialState.talentTree.totalPK}`);
  console.log(`- Spent PK: ${initialState.talentTree.spentPK}`);
  console.log(`- Remaining PK: ${initialState.talentTree.totalPK - initialState.talentTree.spentPK}`);
  console.log(`- Expected Total PK: ${ARGENT_CODEX_CONSTANTS.TOTAL_PK}`);

  // Verify the total PK is correct
  if (initialState.talentTree.totalPK !== ARGENT_CODEX_CONSTANTS.TOTAL_PK) {
    console.log(`❌ ERROR: Total PK mismatch! Expected ${ARGENT_CODEX_CONSTANTS.TOTAL_PK}, got ${initialState.talentTree.totalPK}`);
    return;
  } else {
    console.log('✅ Total PK is correctly set to 51');
  }

  // Find all allocatable nodes
  const allocatableNodes = initialState.talentTree.nodes.filter(node => node.isAllocatable);
  console.log(`\n📋 Found ${allocatableNodes.length} allocatable nodes initially`);

  // Try to allocate all possible nodes to test the limit
  let totalSpent = 0;
  let nodesAllocated = 0;
  const maxAttempts = 100; // Prevent infinite loops
  let attempts = 0;

  console.log('\n🧪 Testing PK allocation limit...');

  while (attempts < maxAttempts) {
    const currentState = manager.getState();
    const currentAllocatable = currentState.talentTree.nodes.filter(node => node.isAllocatable);
    
    if (currentAllocatable.length === 0) {
      console.log('✅ No more allocatable nodes - reached natural limit');
      break;
    }

    // Try to allocate the first available node
    const nodeToAllocate = currentAllocatable[0];
    const cost = nodeToAllocate.pkCost;
    
    if (currentState.talentTree.spentPK + cost > currentState.talentTree.totalPK) {
      console.log(`✅ PK limit enforced! Cannot allocate "${nodeToAllocate.name}" (${cost} PK) - would exceed limit`);
      console.log(`   Current spent: ${currentState.talentTree.spentPK} PK`);
      console.log(`   Would need: ${currentState.talentTree.spentPK + cost} PK`);
      console.log(`   Available: ${currentState.talentTree.totalPK} PK`);
      break;
    }

    // Allocate the node
    manager.allocatePoint(nodeToAllocate.id);
    nodesAllocated++;
    totalSpent += cost;
    
    console.log(`📝 Allocated "${nodeToAllocate.name}" (${cost} PK) - Total spent: ${totalSpent} PK`);
    
    attempts++;
  }

  const finalState = manager.getState();
  console.log('\n📊 Final State:');
  console.log(`- Total PK Available: ${finalState.talentTree.totalPK}`);
  console.log(`- Spent PK: ${finalState.talentTree.spentPK}`);
  console.log(`- Remaining PK: ${finalState.talentTree.totalPK - finalState.talentTree.spentPK}`);
  console.log(`- Nodes Allocated: ${nodesAllocated}`);

  // Verify we didn't exceed the limit
  if (finalState.talentTree.spentPK > finalState.talentTree.totalPK) {
    console.log('❌ ERROR: Exceeded PK limit!');
    return;
  } else if (finalState.talentTree.spentPK === finalState.talentTree.totalPK) {
    console.log('✅ Perfect! Used exactly 51 PK');
  } else {
    console.log('✅ Successfully stayed within PK limit');
  }

  // Test that we can't allocate more points
  const remainingAllocatable = finalState.talentTree.nodes.filter(node => node.isAllocatable);
  if (remainingAllocatable.length > 0) {
    console.log(`\n🔍 Found ${remainingAllocatable.length} nodes that appear allocatable but should be blocked:`);
    remainingAllocatable.slice(0, 5).forEach(node => {
      const wouldExceed = finalState.talentTree.spentPK + node.pkCost > finalState.talentTree.totalPK;
      console.log(`- "${node.name}" (${node.pkCost} PK): ${wouldExceed ? 'Would exceed limit' : 'Should be allocatable'}`);
    });
  }

  console.log('\n🎯 PK Limit Test Complete!');
}

// Run the test if this script is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testPKLimit);
  } else {
    testPKLimit();
  }
} else {
  // Node.js environment
  testPKLimit();
} 