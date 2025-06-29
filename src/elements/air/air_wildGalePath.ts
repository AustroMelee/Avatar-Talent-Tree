/**
 * Path 3: The Wild Gale - 狂風 (Kuáng Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action."
 * Essence: Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = 0, ANGLE_SPREAD = Math.PI / 2.5; // Pointing RIGHT
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 220, RADIUS_STEP = 160, MIN_DIST = 100;

const nodeDataList = [
    { id: 'genesis', name: 'The Wild Gale Path', type: 'Genesis', cost: 1, branch: 0, depth: 0, description: "You understand that non-violence is not indispensable. You can overwhelm many opponents at once with large and powerful attacks that could prove fatal.", flavor: "Powerful airbenders can kill and even enjoy it, as long as they maintain detachment." },
    { id: 'air_blast', name: 'Air Blast', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "A direct pulse or jet of compressed air shot from the hands, feet, or mouth. The force is generated from your power, not momentum.", flavor: "Aang used this to shatter a Fire Navy rock in mid-air." },
    { id: 'air_cannon', name: 'Air Cannon', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'air_blast', description: "You fire a highly compressed, focused sphere of air that travels at high speed and explodes on impact, creating a powerful shockwave.", flavor: "A true test of raw power." },
    { id: 'suffocation', name: 'Suffocation', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_cannon', description: "A sinister technique. Manipulate the flow of air within a person's respiratory system, extracting it from their lungs and forming a ball of air around their head to prevent new breath.", flavor: "First used lethally by Zaheer to kill the Earth Queen." },
    { id: 'air_blades', name: 'Wind Blades', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "By sharpening the edge of an air current, you create crescent-shaped blades of air that can cut through wood, rope, and unarmored targets.", flavor: "The wind is a blade in the right hands." },
    { id: 'sound_bending', name: 'Sound Bending', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'air_blades', description: "By creating a perfect vacuum and then collapsing it, you can create a deafening sonic boom that disorients and temporarily deafens opponents.", flavor: "The silence before the storm is the loudest sound." },
];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = ANGLE_START + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r*Math.cos(a)), y = d.type==='Genesis' ? CENTER_Y : Math.round(CENTER_Y + r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'wild_gale',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#FFE4E1',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const WILD_GALE_NODES = nodes;
export function generateWildGaleConnections(): TalentConnection[] { return connections; }
export const WILD_GALE_METADATA = { name: 'The Wild Gale', philosophy: 'Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action.', essence: 'Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.', focus: 'Aggressive, overwhelming force and lethal techniques, inspired by Zaheer.', sacredAnimal: 'The Dragon', emoji: '🐉', color: '#ffe4e1', position: { x: 700, y: 550 } }; 