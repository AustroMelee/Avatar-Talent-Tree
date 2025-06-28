/**
 * Steel Constellation Talent Data - The Forged Steel
 * This file serves as the main entry point for the Steel Constellation talent tree,
 * integrating all defined paths like The Silent Blade, The Shield of the People, The Flow of Combat, and The Mind of War.
 */

import type { TalentNode, TalentConnection } from '../../types';
import { addExtraMinorNodes } from '../../talentPathLayoutHelpers';
import { SILENT_BLADE_NODES, generateSilentBladeConnections, SILENT_BLADE_METADATA } from './steel_silentBladePath';
import { SHIELD_OF_PEOPLE_NODES, generateShieldOfPeopleConnections, SHIELD_OF_PEOPLE_METADATA } from './steel_shieldOfPeoplePath';
import { FLOW_OF_COMBAT_NODES, generateFlowOfCombatConnections, FLOW_OF_COMBAT_METADATA } from './steel_flowOfCombatPath';
import { MIND_OF_WAR_NODES, generateMindOfWarConnections, MIND_OF_WAR_METADATA } from './steel_mindOfWarPath';

// Import node data lists for minor node generation
import { nodeDataList as silentBladeNodeDataList } from './steel_silentBladePath';
import { nodeDataList as shieldOfPeopleNodeDataList } from './steel_shieldOfPeoplePath';
import { nodeDataList as flowOfCombatNodeDataList } from './steel_flowOfCombatPath';
import { nodeDataList as mindOfWarNodeDataList } from './steel_mindOfWarPath';

/**
 * Prefixes all IDs within a path's nodes and connections to ensure they are unique
 * across the entire constellation.
 */
const prefixPathData = (nodes: TalentNode[], connections: TalentConnection[], prefix: string) => {
    const idMap = new Map(nodes.map(n => [n.id, `${prefix}_${n.id}`]));
    
    const prefixedNodes = nodes.map(node => {
        const newPrerequisites = node.prerequisites
            .map(pId => idMap.get(pId))
            .filter((pId): pId is string => pId !== undefined);
        
        return {
            ...node,
            id: idMap.get(node.id)!,
            prerequisites: newPrerequisites
        };
    });
    
    const prefixedConnections = connections.map(conn => ({
        ...conn,
        from: idMap.get(conn.from)!,
        to: idMap.get(conn.to)!
    }));
    
    return { prefixedNodes, prefixedConnections };
};

// Get base nodes and connections from each path
let sbNodes = [...SILENT_BLADE_NODES];
let sbConnections = [...generateSilentBladeConnections()];
let spNodes = [...SHIELD_OF_PEOPLE_NODES];
let spConnections = [...generateShieldOfPeopleConnections()];
let fcNodes = [...FLOW_OF_COMBAT_NODES];
let fcConnections = [...generateFlowOfCombatConnections()];
let mwNodes = [...MIND_OF_WAR_NODES];
let mwConnections = [...generateMindOfWarConnections()];

// Create node maps for minor node generation
const sbNodeMap: Record<string, TalentNode> = {};
const spNodeMap: Record<string, TalentNode> = {};
const fcNodeMap: Record<string, TalentNode> = {};
const mwNodeMap: Record<string, TalentNode> = {};

sbNodes.forEach(node => sbNodeMap[node.id] = node);
spNodes.forEach(node => spNodeMap[node.id] = node);
fcNodes.forEach(node => fcNodeMap[node.id] = node);
mwNodes.forEach(node => mwNodeMap[node.id] = node);

// Add extra minor nodes to each path before prefixing
addExtraMinorNodes(sbNodes, sbConnections, sbNodeMap, silentBladeNodeDataList, { value: 0 }, [
  { adjectives: ['Silent', 'Deadly', 'Shadowy'], nouns: ['Step', 'Blade', 'Strike'], verbs: ['improve', 'sharpen', 'quicken'], philosophies: ['Precision is everything.', 'A true assassin leaves no trace.', 'The shadow is your ally.'] },
  { adjectives: ['Perfect', 'Swift', 'Unerring'], nouns: ['Throw', 'Aim', 'Arc'], verbs: ['enhance', 'focus', 'accelerate'], philosophies: ['The blade finds its mark.', 'Distance is an illusion.', 'Every throw is a promise.'] },
  { adjectives: ['Critical', 'Lethal', 'Subtle'], nouns: ['Hit', 'Point', 'Touch'], verbs: ['refine', 'target', 'amplify'], philosophies: ['Every weakness is a weapon.', 'Strike where it matters.', 'Death is a whisper.'] }
], {
  CENTER_X: 800, CENTER_Y: 400, ANGLE_START: -Math.PI / 2 - (Math.PI / 2.2) / 2, ANGLE_SPREAD: Math.PI / 2.2, BRANCHES: 3, BASE_RADIUS: 160, RADIUS_STEP: 120, MIN_DIST: 90
});

addExtraMinorNodes(spNodes, spConnections, spNodeMap, shieldOfPeopleNodeDataList, { value: 0 }, [
  { adjectives: ['Stalwart', 'Protective', 'Unyielding'], nouns: ['Wall', 'Guard', 'Bastion'], verbs: ['fortify', 'shield', 'reinforce'], philosophies: ['Protection is strength.', 'The shield never falters.', 'Sacrifice is the highest honor.'] },
  { adjectives: ['Inspiring', 'Commanding', 'Heroic'], nouns: ['Presence', 'Order', 'Banner'], verbs: ['lead', 'rally', 'unite'], philosophies: ['Leadership is service.', 'Unity is power.', 'A true leader stands last.'] },
  { adjectives: ['Selfless', 'Resolute', 'Enduring'], nouns: ['Sacrifice', 'Duty', 'Oath'], verbs: ['endure', 'sustain', 'preserve'], philosophies: ['To protect is to serve.', 'Endurance is victory.', 'The greatest strength is selflessness.'] }
], {
  CENTER_X: 800, CENTER_Y: 400, ANGLE_START: 0 - (Math.PI / 2.2) / 2, ANGLE_SPREAD: Math.PI / 2.2, BRANCHES: 3, BASE_RADIUS: 160, RADIUS_STEP: 120, MIN_DIST: 90
});

addExtraMinorNodes(fcNodes, fcConnections, fcNodeMap, flowOfCombatNodeDataList, { value: 0 }, [
  { adjectives: ['Fluid', 'Reactive', 'Balanced'], nouns: ['Move', 'Flow', 'Step'], verbs: ['adapt', 'shift', 'respond'], philosophies: ['Adaptation is survival.', 'Flow with the battle.', 'Balance is power.'] },
  { adjectives: ['Weaponized', 'Masterful', 'Versatile'], nouns: ['Weapon', 'Form', 'Art'], verbs: ['master', 'wield', 'transform'], philosophies: ['Every tool is a weapon.', 'Mastery is endless.', 'Versatility wins wars.'] },
  { adjectives: ['Instinctive', 'Harmonious', 'Perfect'], nouns: ['Instinct', 'Harmony', 'State'], verbs: ['sense', 'harmonize', 'perfect'], philosophies: ['Trust your instincts.', 'Harmony brings victory.', 'Perfection is a journey.'] }
], {
  CENTER_X: 800, CENTER_Y: 400, ANGLE_START: Math.PI / 2 - (Math.PI / 2.2) / 2, ANGLE_SPREAD: Math.PI / 2.2, BRANCHES: 3, BASE_RADIUS: 160, RADIUS_STEP: 120, MIN_DIST: 90
});

addExtraMinorNodes(mwNodes, mwConnections, mwNodeMap, mindOfWarNodeDataList, { value: 0 }, [
  { adjectives: ['Strategic', 'Inventive', 'Analytical'], nouns: ['Plan', 'Device', 'Scheme'], verbs: ['calculate', 'devise', 'engineer'], philosophies: ['Strategy wins wars.', 'Innovation is power.', 'Analysis is key.'] },
  { adjectives: ['Tactical', 'Networked', 'Insightful'], nouns: ['Move', 'Network', 'Insight'], verbs: ['coordinate', 'gather', 'predict'], philosophies: ['Tactics decide battles.', 'Information is victory.', 'Insight is strength.'] },
  { adjectives: ['Scholarly', 'Wise', 'Curious'], nouns: ['Study', 'Theory', 'Discovery'], verbs: ['research', 'uncover', 'learn'], philosophies: ['Knowledge is power.', 'Wisdom endures.', 'Curiosity drives progress.'] }
], {
  CENTER_X: 800, CENTER_Y: 400, ANGLE_START: Math.PI - (Math.PI / 2.2) / 2, ANGLE_SPREAD: Math.PI / 2.2, BRANCHES: 3, BASE_RADIUS: 160, RADIUS_STEP: 120, MIN_DIST: 90
});

// Apply the prefixing logic to each path (now including minor nodes)
const { prefixedNodes: sbPrefixedNodes, prefixedConnections: sbPrefixedConnections } = prefixPathData(sbNodes, sbConnections, 'sb');
const { prefixedNodes: spPrefixedNodes, prefixedConnections: spPrefixedConnections } = prefixPathData(spNodes, spConnections, 'sp');
const { prefixedNodes: fcPrefixedNodes, prefixedConnections: fcPrefixedConnections } = prefixPathData(fcNodes, fcConnections, 'fc');
const { prefixedNodes: mwPrefixedNodes, prefixedConnections: mwPrefixedConnections } = prefixPathData(mwNodes, mwConnections, 'mw');

/**
 * All Steel talent nodes from all integrated paths.
 */
export const STEEL_TALENT_NODES: TalentNode[] = [
  ...sbPrefixedNodes,
  ...spPrefixedNodes,
  ...fcPrefixedNodes,
  ...mwPrefixedNodes
];

/**
 * Steel constellation metadata, including all available paths.
 */
export const STEEL_CONSTELLATION = {
  name: 'The Forged Steel',
  description: 'The triumph of mortal will over supernatural power, achieved through dedication, training, and ingenuity.',
  background: 'steel',
  paths: [SILENT_BLADE_METADATA, SHIELD_OF_PEOPLE_METADATA, FLOW_OF_COMBAT_METADATA, MIND_OF_WAR_METADATA]
};

/**
 * Root node for the Steel constellation (using the first path's prefixed Genesis as a default).
 */
export const STEEL_ROOT_NODE: TalentNode = sbPrefixedNodes.find(n => n.type === 'Genesis') || sbPrefixedNodes[0];

/**
 * Generate all connections for the Steel constellation by combining prefixed connections.
 */
export function generateSteelConnections(): TalentConnection[] {
  return [
    ...sbPrefixedConnections,
    ...spPrefixedConnections,
    ...fcPrefixedConnections,
    ...mwPrefixedConnections
  ];
} 