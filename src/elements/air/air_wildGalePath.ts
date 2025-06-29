/**
 * Path 3: The Wild Gale - 狂風 (Kuáng Fēng) (Canonically Refactored)
 * 
 * Path Philosophy: "Sometimes, the mountain must be moved. This is not anger, but decisive, overwhelming action."
 * Essence: Large-scale, powerful airbending techniques meant to control the battlefield and shatter obstacles.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI / 2, ANGLE_SPREAD = Math.PI / 2.5;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 220, RADIUS_STEP = 160, MIN_DIST = 110;

const nodeDataList = [
    { id: 'genesis', name: 'The Wild Gale Path', type: 'Genesis', cost: 1, branch: 0, depth: 0, description: "You understand that non-violence is not indispensable. You can overwhelm many opponents at once with large and powerful attacks that could prove fatal.", flavor: "Powerful airbenders can kill and even enjoy it, as long as they maintain detachment." },
    { id: 'air_blast', name: 'Air Blast', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "A direct pulse or jet of compressed air shot from the hands, feet, or mouth. The force is generated from your power, not momentum.", flavor: "Aang used this to shatter a Fire Navy rock in mid-air." },
    { id: 'minor_ab_1', name: 'Air Punch/Kick', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'air_blast', description: "Fire small, compressed formations of air from your fists or feet, similar to a firebender's jabs.", flavor: "As demonstrated by Aang and Korra." },
    { id: 'minor_ab_2', name: 'Piercing Shot', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'air_blast', description: "You narrow the sphere into a lance-like shape, reducing its area-of-effect but drastically increasing its range.", flavor: "A focused strike can pierce any defense." },
    { id: 'minor_ab_3', name: 'Vacuum Burst', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'air_blast', description: "Upon impact, the cannon's explosion briefly creates a vacuum, pulling nearby enemies toward the point of impact.", flavor: "The void draws all things inward." },
    { id: 'minor_ab_4', name: 'Rapid Fire', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'air_blast', description: "You learn to form and fire smaller, less powerful versions of the Air Cannon in quick succession.", flavor: "Speed can be as deadly as power." },
    { id: 'air_cannon', name: 'Air Cannon', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'air_blast', description: "You fire a highly compressed, focused sphere of air that travels at high speed and explodes on impact, creating a powerful shockwave.", flavor: "A true test of raw power." },
    { id: 'minor_ac_1', name: 'Rending Edge', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'air_cannon', description: "The leading edge of the typhoon is laced with sharp, shearing currents that can shred earth and metal defenses.", flavor: "The wind's edge is sharp." },
    { id: 'minor_ac_2', name: 'Extended Front', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'air_cannon', description: "You can widen the wall of wind to cover a larger area, sacrificing some of its forward momentum.", flavor: "A wider front, a greater impact." },
    { id: 'suffocation', name: 'Suffocation', type: 'Axiom', cost: 5, branch: 0, depth: 3, prerequisite: 'air_cannon', description: "A sinister technique. Manipulate the flow of air within a person's respiratory system, extracting it from their lungs and forming a ball of air around their head to prevent new breath.", flavor: "First used lethally by Zaheer to kill the Earth Queen." },
    { id: 'minor_suff_1', name: 'Vacuum', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'suffocation', description: "A violent version that instantly removes all air from an area, creating a short-lived hard vacuum that causes severe internal injuries.", flavor: "Invented by Yangchen to counter combustionbending." },
    { id: 'air_blades', name: 'Wind Blades', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "By sharpening the edge of an air current, you create crescent-shaped blades of air that can cut through wood, rope, and unarmored targets.", flavor: "The wind is a blade in the right hands." },
    { id: 'minor_ablade_1', name: 'Gale Slice', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'air_blades', description: "Cast forth a thin, cutting edge of wind that can pierce wood or stone.", flavor: "The wind's edge is sharp." },
    { id: 'minor_ablade_2', name: 'Arcing Blades', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'air_blades', description: "You can launch blades that curve in mid-air, allowing you to strike targets behind cover.", flavor: "The wind bends to your will." },
    { id: 'minor_ablade_3', name: 'Blade Vortex', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'air_blades', description: "You can create a small, defensive whirlwind of wind blades that orbits your body.", flavor: "A shield of blades, ever moving." },
    { id: 'minor_ablade_4', name: 'Ricochet Shot', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'air_blades', description: "Your blades are solid enough to bounce off one hard surface to strike a secondary target.", flavor: "The wind finds a way." },
    { id: 'sound_bending', name: 'Sound Bending', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'air_blades', description: "By creating a perfect vacuum and then collapsing it, you can create a deafening sonic boom that disorients and temporarily deafens opponents.", flavor: "The silence before the storm is the loudest sound." },
    { id: 'minor_sb_1', name: 'Amplifying Cone', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'sound_bending', description: "You can focus the sonic boom into a cone, increasing its intensity and range in one direction.", flavor: "The wind's voice is a weapon." },
    { id: 'wg_minor_1', name: 'Concussive Force', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Your air attacks have a greater chance to stagger opponents.", flavor: "The wind strikes with the force of thunder." },
    { id: 'wg_minor_2', name: 'Shattering Gust', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'air_blast', description: "Your air blasts are more effective at breaking brittle objects.", flavor: "What cannot bend, breaks." },
    { id: 'wg_minor_3', name: 'Razor\'s Edge', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'air_blades', description: "Your Air Blades are slightly sharper and can cut deeper.", flavor: "The air itself is a weapon." },
    { id: 'wg_minor_4', name: 'Storm\'s Heart', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'air_cannon', description: "Your stamina recovers faster in windy or stormy conditions.", flavor: "The storm feeds the storm." },
    { id: 'wg_minor_5', name: 'Sinister Whisper', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'suffocation', description: "Your presence becomes unsettling to those you focus on, subtly disrupting their breathing.", flavor: "The first step on a dark path." },
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