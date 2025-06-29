/**
 * Path 4: The Dancing Wind - 舞風 (Wǔ Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "True freedom is not the absence of restraint, but perfect harmony with movement."
 * Essence: Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI / 2, ANGLE_SPREAD = Math.PI / 2.5;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 220, RADIUS_STEP = 160, MIN_DIST = 110;

const nodeDataList = [
    { id: 'genesis', name: 'The Dancing Wind Path', type: 'Genesis', cost: 1, branch: 0, depth: 0, description: "You learn that the key to airbending is flexibility and finding and following the path of least resistance. You embrace dynamic, constant movement.", flavor: "Let the wind lift your spirit." },
    { id: 'enhanced_speed', name: 'Enhanced Speed', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Enhance your movement by decreasing air resistance around you, allowing you to run swiftly and even sprint up vertical surfaces.", flavor: "This technique can make an airbender almost too swift for the naked eye to see properly." },
    { id: 'minor_es_1', name: 'Smooth Stride', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'enhanced_speed', description: "Cut the air around you to limit wind resistance, allowing you to move even faster.", flavor: "The wind parts for you." },
    { id: 'minor_es_2', name: 'Gliding', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'enhanced_speed', description: "You master the use of a glider, which can be used in conjunction with your bending to fly as long as you can maintain the air currents.", flavor: "The sky is your playground." },
    { id: 'minor_es_3', name: 'Aerial Combat', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'enhanced_speed', description: "You can fight effectively while using the air spout, maintaining control and accuracy in flight.", flavor: "Battle is a dance in the sky." },
    { id: 'air_scooter', name: 'Air Scooter', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'enhanced_speed', description: "Form and ride a spherical 'ball' of air, allowing for high-speed travel across most surfaces and vertical walls.", flavor: "The invention of this technique by Aang earned him his master tattoos at a young age." },
    { id: 'minor_as_1', name: 'Wind Surfing', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'air_scooter', description: "You can ride air currents horizontally, allowing for high-speed travel across open areas.", flavor: "The wind is your highway." },
    { id: 'minor_as_2', name: 'Storm Flying', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'air_scooter', description: "You can fly safely through storms and adverse weather conditions.", flavor: "The storm is your ally, not your enemy." },
    { id: 'minor_as_3', name: 'High Altitude', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'air_scooter', description: "You can reach incredible heights and maintain flight at high altitudes.", flavor: "The sky is not the limit." },
    { id: 'flight', name: 'Flight', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_scooter', description: "The highest level of airbending. By releasing yourself of all earthly tethers, you achieve true and complete freedom, able to fly without any aid.", flavor: "A technique unlocked by Guru Laghima and, thousands of years later, by Zaheer." },
    { id: 'air_spout', name: 'Air Spout', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "You create a powerful upward current of air that can lift you high into the sky, allowing for sustained flight and aerial combat.", flavor: "The wind lifts you above all obstacles." },
    { id: 'minor_asp_1', name: 'Air Stairs', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'air_spout', description: "You can create a series of air platforms to climb to great heights or cross large gaps.", flavor: "The sky is your staircase." },
    { id: 'dw_minor_1', name: 'Graceful Descent', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You can use minor air currents to slow any fall, preventing damage from all but the most extreme heights.", flavor: "Falling is just flying, for a moment." },
    { id: 'dw_minor_2', name: 'Uplifting Spirit', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'enhanced_speed', description: "Moving at high speeds grants you a small boost of morale and confidence.", flavor: "Let the wind lift your spirit." },
    { id: 'dw_minor_3', name: 'Vertical Rider', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'air_spout', description: "Your Air Spout can ascend vertical surfaces more easily.", flavor: "The sky is a road without limits." },
    { id: 'dw_minor_4', name: 'Enduring Ride', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'air_scooter', description: "Your Air Scooter lasts longer before dissipating.", flavor: "The dance never has to end." },
    { id: 'dw_minor_5', name: 'Weightless Soul', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'flight', description: "When you have truly let go of your earthly tethers, worldly concerns have less of a hold on you.", flavor: "Enter the void. Empty, and become wind." },
    { id: 'minor_ast_2', name: 'Floating Combat', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'air_spout', description: "You can fight effectively while walking on air, using the platforms for both mobility and tactical advantage.", flavor: "Battle is a dance on the wind." },
];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = ANGLE_START + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r*Math.cos(a)), y = d.type==='Genesis' ? CENTER_Y : Math.round(CENTER_Y + r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'dancing_wind',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#F0F8FF',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const DANCING_WIND_NODES = nodes;
export function generateDancingWindConnections(): TalentConnection[] { return connections; }
export const DANCING_WIND_METADATA = { name: 'The Dancing Wind', philosophy: 'True freedom is not the absence of restraint, but perfect harmony with movement.', essence: 'Unparalleled mobility, acrobatic grace, and the ultimate pursuit of flight.', focus: 'Pure mobility and freedom, culminating in the ultimate achievement of flight.', sacredAnimal: 'The Flying Lemur', emoji: '🦋', color: '#f0f8ff', position: { x: 800, y: 600 } }; 