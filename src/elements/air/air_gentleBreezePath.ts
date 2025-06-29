/**
 * Path 1: The Gentle Breeze - 微風 (Wēi Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "Do not meet force with force; flow around it, and let the aggressor's strength become their own undoing."
 * Essence: Evasion, redirection of momentum, defensive mastery.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Pointing UP (Previously Math.PI / 2)
const ANGLE_SPREAD = Math.PI / 2.2, BASE_RADIUS = 250, RADIUS_STEP = 180, MIN_DIST = 120;

const nodeDataList = [
  { id: 'genesis', name: 'The Gentle Breeze', type: 'Genesis', cost: 1, branch: 0, depth: 0, description: "Path of evasion and redirection.", flavor: "Flow like the wind." },
  { id: 'air_shield', name: 'Air Shield', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Deflect attacks with a shield of air.", flavor: "A wall can be broken, but not the air." },
  { id: 'air_swipe', name: 'Air Swipe', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'air_shield', description: "Deflect even colossal projectiles.", flavor: "Use their strength against them." },
  { id: 'enhanced_agility', name: 'Enhanced Agility', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_swipe', description: "Flow around opponents effortlessly.", flavor: "Stillness in motion." },
  { id: 'air_cushion', name: 'Air Cushion', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Create a cushion of air to break any fall.", flavor: "To fall with grace is to fly." },
  { id: 'air_vortex', name: 'Air Vortex', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'air_cushion', description: "Trap and disorient opponents in a funnel of air.", flavor: "The center of the storm is calm." },
];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = PATH_MAIN_ANGLE - (ANGLE_SPREAD/2) + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type==='Genesis'?CENTER_X:Math.round(CENTER_X+r*Math.cos(a)), y = d.type==='Genesis'?CENTER_Y:Math.round(CENTER_Y+r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'gentle_breeze',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#B0E0E6',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const GENTLE_BREEZE_NODES = nodes;
export function generateGentleBreezeConnections(): TalentConnection[] { return connections; }
export const GENTLE_BREEZE_METADATA = { name: 'The Gentle Breeze', philosophy: 'Do not meet force with force; flow around it, and let the aggressor\'s strength become their own undoing.', essence: 'Evasion, redirection of momentum, defensive mastery.', focus: 'Traditional defensive Airbending, using an opponent\'s energy against them.', sacredAnimal: 'The Flying Lemur', emoji: '🦋', color: '#b3e6ff', position: { x: 800, y: 500 } }; 