/**
 * Path 4: The Dancing Wind - 舞風 (Wǔ Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "True freedom is not the absence of restraint, but perfect harmony with movement."
 * Essence: Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = -Math.PI / 2, ANGLE_SPREAD = Math.PI / 2.2; // Pointing UP
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 250, RADIUS_STEP = 180, MIN_DIST = 120;

const nodeDataList = [
    { id: 'genesis', name: 'The Dancing Wind', type: 'Genesis', cost: 1, branch: 0, depth: 0, description: "Path of unparalleled mobility and flight.", flavor: "Perfect harmony with movement." },
    { id: 'enhanced_speed', name: 'Enhanced Speed', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Run swiftly and even up vertical surfaces.", flavor: "Too swift for the naked eye." },
    { id: 'air_scooter', name: 'Air Scooter', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'enhanced_speed', description: "Ride a spherical 'ball' of air for high-speed travel.", flavor: "Aang's signature invention." },
    { id: 'flight', name: 'Flight', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_scooter', description: "Achieve true, unaided flight.", flavor: "Unlocked by Guru Laghima and Zaheer." },
    { id: 'air_spout', name: 'Air Spout', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Create an upward current for sustained flight.", flavor: "The wind lifts you above all." },
];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = ANGLE_START + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r*Math.cos(a)), y = d.type==='Genesis' ? CENTER_Y : Math.round(CENTER_Y+r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'dancing_wind',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#F0F8FF',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const DANCING_WIND_NODES = nodes;
export function generateDancingWindConnections(): TalentConnection[] { return connections; }
export const DANCING_WIND_METADATA = { name: 'The Dancing Wind', philosophy: 'True freedom is not the absence of restraint, but perfect harmony with movement.', essence: 'Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.', focus: 'Pure mobility and freedom, culminating in the ultimate achievement of flight.', sacredAnimal: 'The Flying Lemur', emoji: '🦋', color: '#f0f8ff', position: { x: 800, y: 600 } }; 