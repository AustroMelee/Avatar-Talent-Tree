/**
 * Test script to verify the Philosophical Wounds system is working correctly
 * This script tests that Schism nodes properly apply wounds when allocated
 */

import { TalentTreeManager } from '../src/talentTreeManager';

/**
 * Tests the Philosophical Wounds system
 */
function testPhilosophicalWounds(): void {
  console.log('🔪 Testing Philosophical Wounds System...\n');

  // Create a new talent tree manager
  const manager = new TalentTreeManager();
  const initialState = manager.getState();

  console.log('📊 Initial State:');
  console.log(`- Philosophical Wounds: ${initialState.talentTree.philosophicalWounds.length}`);
  console.log(`- Allocated Nodes: ${initialState.talentTree.allocatedNodes.size}`);
  console.log(`- Spent PK: ${initialState.talentTree.spentPK}`);

  // Find Schism nodes
  const schismNodes = initialState.talentTree.nodes.filter(node => node.type === 'Schism');
  console.log(`\n🔍 Found ${schismNodes.length} Schism nodes:`);
  schismNodes.forEach(node => {
    console.log(`- ${node.name} (${node.id}): ${node.wound || 'No wound defined'}`);
  });

  if (schismNodes.length === 0) {
    console.log('❌ No Schism nodes found! The test cannot proceed.');
    return;
  }

  // Test allocating a Schism node
  const testSchismNode = schismNodes[0];
  console.log(`\n🧪 Testing allocation of "${testSchismNode.name}"...`);

  // First, we need to allocate enough nodes to unlock the Schism
  // Let's allocate the Genesis node first
  const genesisNode = initialState.talentTree.nodes.find(node => node.type === 'Genesis');
  if (genesisNode) {
    console.log(`\n📝 Allocating Genesis node: ${genesisNode.name}`);
    manager.allocatePoint(genesisNode.id);
    
    const afterGenesis = manager.getState();
    console.log(`- Spent PK: ${afterGenesis.talentTree.spentPK}`);
    console.log(`- Allocated Nodes: ${afterGenesis.talentTree.allocatedNodes.size}`);
  }

  // Now try to allocate the Schism node
  console.log(`\n📝 Attempting to allocate Schism node: ${testSchismNode.name}`);
  
  // Check if the node is allocatable
  const beforeSchism = manager.getState();
  const schismNode = beforeSchism.talentTree.nodes.find(n => n.id === testSchismNode.id);
  
  if (schismNode && schismNode.isAllocatable) {
    manager.allocatePoint(testSchismNode.id);
    
    const afterSchism = manager.getState();
    console.log(`\n✅ Schism node allocated successfully!`);
    console.log(`- Spent PK: ${afterSchism.talentTree.spentPK}`);
    console.log(`- Allocated Nodes: ${afterSchism.talentTree.allocatedNodes.size}`);
    console.log(`- Philosophical Wounds: ${afterSchism.talentTree.philosophicalWounds.length}`);
    
    if (afterSchism.talentTree.philosophicalWounds.length > 0) {
      console.log(`- Wounds Applied: ${afterSchism.talentTree.philosophicalWounds.join(', ')}`);
      console.log('✅ Philosophical Wounds system is working correctly!');
    } else {
      console.log('❌ No philosophical wounds were applied!');
      console.log('This might indicate an issue with the wound property or allocation logic.');
    }
  } else {
    console.log(`❌ Schism node "${testSchismNode.name}" is not allocatable.`);
    console.log('This might be because:');
    console.log('- The node requires prerequisites that are not met');
    console.log('- The node requires a minimum PK investment in the path');
    console.log('- The node is locked due to other constraints');
    
    // Let's check what nodes are available
    const availableNodes = beforeSchism.talentTree.nodes.filter(n => n.isAllocatable);
    console.log(`\n📋 Available nodes (${availableNodes.length}):`);
    availableNodes.forEach(node => {
      console.log(`- ${node.name} (${node.type})`);
    });
  }

  // Test deallocation
  if (schismNode && schismNode.isAllocated) {
    console.log(`\n🔄 Testing deallocation of Schism node...`);
    manager.removePoint(testSchismNode.id);
    
    const afterDeallocation = manager.getState();
    console.log(`- Spent PK: ${afterDeallocation.talentTree.spentPK}`);
    console.log(`- Allocated Nodes: ${afterDeallocation.talentTree.allocatedNodes.size}`);
    console.log(`- Philosophical Wounds: ${afterDeallocation.talentTree.philosophicalWounds.length}`);
    
    if (afterDeallocation.talentTree.philosophicalWounds.length === 0) {
      console.log('✅ Philosophical wounds were properly removed on deallocation!');
    } else {
      console.log('❌ Philosophical wounds were not removed on deallocation!');
    }
  }

  console.log('\n🎯 Philosophical Wounds Test Summary:');
  console.log('The test has completed. Check the output above for any issues.');
}

// Run test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testPhilosophicalWounds();
}

export { testPhilosophicalWounds }; 