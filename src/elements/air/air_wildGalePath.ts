/**
 * Path 3: The Wild Gale - 狂風 (Kuáng Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action."
 * Essence: Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI; // Pointing LEFT (Previously 0)
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 250, RADIUS_STEP = 180, MIN_DIST = 120;

const nodeDataList = [
    { id: 'genesis', name: 'The Wild Gale', type: 'Genesis', cost: 1, branch: 0, depth: 0, description: "Path of overwhelming force.", flavor: "Sometimes, the mountain must be moved." },
    { id: 'air_blast', name: 'Air Blast', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "A direct pulse of compressed air.", flavor: "A basic, powerful offensive move." },
    { id: 'air_cannon', name: 'Air Cannon', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'air_blast', description: "Fire a sphere of air that explodes on impact.", flavor: "A true test of raw power." },
    { id: 'suffocation', name: 'Suffocation', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_cannon', description: "A sinister technique to extract air from lungs.", flavor: "First used lethally by Zaheer." },
    { id: 'air_blades', name: 'Wind Blades', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Create crescent-shaped blades of cutting air.", flavor: "The wind is a blade in the right hands." },
    { id: 'sound_bending', name: 'Sound Bending', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'air_blades', description: "Create a deafening sonic boom.", flavor: "The silence before the storm is the loudest sound." },
];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = ANGLE_START + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type==='Genesis'?CENTER_X:Math.round(CENTER_X+r*Math.cos(a)), y = d.type==='Genesis'?CENTER_Y:Math.round(CENTER_Y+r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'wild_gale',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#FFE4E1',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const WILD_GALE_NODES = nodes;
export function generateWildGaleConnections(): TalentConnection[] { return connections; }
export const WILD_GALE_METADATA = { name: 'The Wild Gale', philosophy: 'Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action.', essence: 'Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.', focus: 'Aggressive, overwhelming force and lethal techniques, inspired by Zaheer.', sacredAnimal: 'The Dragon', emoji: '🐉', color: '#ffe4e1', position: { x: 700, y: 550 } }; 