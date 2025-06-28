/**
 * Steel Element Talent Data
 * Philosophy: "Through discipline and skill, we forge our own destiny."
 * Essence: Unyielding determination, martial mastery, and the strength of the human spirit.
 * Focus: Combat Arts, Defensive Techniques, Strategic Thinking.
 * Sacred Animal: The Bear - strong, protective, and unbreakable.
 */

import type { TalentNode, TalentConnection } from '../../types';
import { SILENT_BLADE_NODES, generateSilentBladeConnections, SILENT_BLADE_METADATA } from './steel_silentBladePath';
import { SHIELD_OF_PEOPLE_NODES, generateShieldOfPeopleConnections, SHIELD_OF_PEOPLE_METADATA } from './steel_shieldOfPeoplePath';
import { FLOW_OF_COMBAT_NODES, generateFlowOfCombatConnections, FLOW_OF_COMBAT_METADATA } from './steel_flowOfCombatPath';
import { MIND_OF_WAR_NODES, generateMindOfWarConnections, MIND_OF_WAR_METADATA } from './steel_mindOfWarPath';

// --- Steel Constellation Metadata ---
export const STEEL_CONSTELLATION_METADATA = {
  name: 'Steel',
  philosophy: "Through discipline and skill, we forge our own destiny.",
  essence: 'Unyielding determination, martial mastery, and the strength of the human spirit.',
  focus: 'Combat Arts, Defensive Techniques, Strategic Thinking.',
  sacredAnimal: 'The Bear',
  emoji: '⚔️',
  color: '#708090',
  position: { x: 800, y: 400 }
};

// --- Path Metadata ---
export const STEEL_PATHS = {
  silent_blade: SILENT_BLADE_METADATA,
  shield_of_people: SHIELD_OF_PEOPLE_METADATA,
  flow_of_combat: FLOW_OF_COMBAT_METADATA,
  mind_of_war: MIND_OF_WAR_METADATA
};

// --- Node Collections ---
export const STEEL_NODES: TalentNode[] = [
  ...SILENT_BLADE_NODES,
  ...SHIELD_OF_PEOPLE_NODES,
  ...FLOW_OF_COMBAT_NODES,
  ...MIND_OF_WAR_NODES
];

// --- Connection Generation ---
export function generateSteelConnections(): TalentConnection[] {
  return [
    ...generateSilentBladeConnections(),
    ...generateShieldOfPeopleConnections(),
    ...generateFlowOfCombatConnections(),
    ...generateMindOfWarConnections()
  ];
}

// --- Genesis Nodes ---
export const STEEL_GENESIS_NODES = [
  SILENT_BLADE_NODES.find(n => n.type === 'Genesis')!,
  SHIELD_OF_PEOPLE_NODES.find(n => n.type === 'Genesis')!,
  FLOW_OF_COMBAT_NODES.find(n => n.type === 'Genesis')!,
  MIND_OF_WAR_NODES.find(n => n.type === 'Genesis')!
];

// --- Path-Specific Exports ---
export {
  SILENT_BLADE_NODES,
  generateSilentBladeConnections,
  SILENT_BLADE_METADATA,
  SHIELD_OF_PEOPLE_NODES,
  generateShieldOfPeopleConnections,
  SHIELD_OF_PEOPLE_METADATA,
  FLOW_OF_COMBAT_NODES,
  generateFlowOfCombatConnections,
  FLOW_OF_COMBAT_METADATA,
  MIND_OF_WAR_NODES,
  generateMindOfWarConnections,
  MIND_OF_WAR_METADATA
}; 