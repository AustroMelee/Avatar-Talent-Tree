/**
 * Path 1: The Gentle Breeze - 微風 (Wēi Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "Do not meet force with force; flow around it, and let the aggressor's strength become their own undoing."
 * Essence: Evasion, redirection of momentum, defensive mastery.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

// --- Layout Configuration (Branches point DOWN from center) ---
const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 3; // Use 3 main branches
const PATH_MAIN_ANGLE = Math.PI / 2; // Downwards
const ANGLE_SPREAD = Math.PI * 1.8; // Spread very wide
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 200, RADIUS_STEP = 150, MIN_DIST = 100;

const nodeDataList = [
  { id: 'genesis', name: 'The Gentle Breeze Path', type: 'Genesis', cost: 1, branch: 1.5, depth: 0, description: "You learn to find and follow the path of least resistance. Your movements are fluid and evasive, making you a difficult target.", flavor: "Air is the element of freedom." },
  { id: 'air_shield', name: 'Air Shield', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Throw up a gust of air close to your body as a shield, deflecting attacks by pushing them aside rather than stopping them directly.", flavor: "A wall can be broken, but how does one break the air?" },
  { id: 'air_swipe', name: 'Air Swipe', type: 'Manifestation', cost: 4, branch: 0.5, depth: 2, prerequisite: 'air_shield', description: "Conjure a crescent-shaped wave of compressed air capable of deflecting colossal projectiles, like catapulted flaming rocks.", flavor: "Use the opponent's strength against them." },
  { id: 'enhanced_agility', name: 'Enhanced Agility', type: 'Axiom', cost: 5, branch: 0.2, depth: 3, prerequisite: 'air_swipe', description: "You appear to flow around your opponents without expending any energy at all, letting them tire themselves out and creating exploitable openings.", flavor: "The constant movement required by this art makes masters difficult to hit." },
  { id: 'air_cushion', name: 'Air Cushion', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Instinctively create a cushion of air to break anyone's fall, including your own, from great heights.", flavor: "To fall with grace is to fly." },
  { id: 'air_vortex', name: 'Air Vortex', type: 'Manifestation', cost: 4, branch: 2.5, depth: 2, prerequisite: 'air_cushion', description: "Create a spinning funnel of air that can trap and disorient opponents, deflecting any objects thrown at it.", flavor: "In the center of the storm, there is only calm." },
];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = ANGLE_START + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r*Math.cos(a)), y = d.type==='Genesis' ? CENTER_Y : Math.round(CENTER_Y + r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'gentle_breeze',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#B0E0E6',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const GENTLE_BREEZE_NODES = nodes;
export function generateGentleBreezeConnections(): TalentConnection[] { return connections; }
export const GENTLE_BREEZE_METADATA = { name: 'The Gentle Breeze', philosophy: 'Do not meet force with force; flow around it, and let the aggressor\'s strength become their own undoing.', essence: 'Evasion, redirection of momentum, defensive mastery.', focus: 'Traditional defensive Airbending, using an opponent\'s energy against them.', sacredAnimal: 'The Flying Lemur', emoji: '🦋', color: '#b3e6ff', position: { x: 800, y: 500 } }; 