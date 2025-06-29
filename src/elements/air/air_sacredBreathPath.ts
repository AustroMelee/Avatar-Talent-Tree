/**
 * Path 2: The Sacred Breath - 聖息 (Shèng Xī) (Canonically Refactored)
 * 
 * Path Philosophy: "Air connects all life. To master the breath is to feel the chi of the world and to see the unseen."
 * Essence: Spiritual connection, sensing chi, meditation, non-combat support.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';
import { getAirNodeIcon } from './airNodeIcons';

const CENTER_X = 0, CENTER_Y = 0, BRANCHES = 2;
const PATH_MAIN_ANGLE = Math.PI, ANGLE_SPREAD = Math.PI / 2.2; // Pointing LEFT
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 250, RADIUS_STEP = 180, MIN_DIST = 120;

const nodeDataList=[{id:'genesis',name:'The Sacred Breath',type:'Genesis',cost:1,branch:0,depth:0,description:"Path of spiritual connection and sensing chi.",flavor:"Air connects all life."},{id:'hypersensitivity',name:'Hypersensitivity',type:'Keystone',cost:2,branch:0,depth:1,prerequisite:'genesis',description:"Perceive subtle shifts in air currents.",flavor:"Feel the energy behind the wind."},{id:'breath_of_wind',name:'Breath of Wind',type:'Manifestation',cost:4,branch:0,depth:2,prerequisite:'hypersensitivity',description:"Create an air jet directly from your mouth.",flavor:"The breath is the first and final tool."},{id:'spiritual_projection',name:'Spiritual Projection',type:'Axiom',cost:5,branch:0,depth:3,prerequisite:'breath_of_wind',description:"Project your spirit out of your physical body.",flavor:"A technique mastered by Jinora."},{id:'sound_amplification',name:'Sound Amplification',type:'Keystone',cost:2,branch:1,depth:1,prerequisite:'genesis',description:"Magnify sound waves to a massive degree.",flavor:"As used by Aang to call animals."},{id:'B2',name:'Guiding Light',type:'Manifestation',cost:4,branch:1,depth:2,prerequisite:'sound_amplification',description:"Manifest your spiritual energy as a visible light.",flavor:"The light guides and pacifies."},{id:'B3',name:'Breath of Kinship',type:'Axiom',cost:5,branch:1,depth:3,prerequisite:'B2',description:"Synchronize your chi with willing allies.",flavor:"The mind is not bound by the body."}];
const nodes: TalentNode[] = [], connections: TalentConnection[] = [], nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(d => {
  const p = Array.isArray(d.prerequisite) ? d.prerequisite : (d.prerequisite ? [d.prerequisite] : []);
  const a = ANGLE_START + (d.branch * ANGLE_SPREAD) / BRANCHES, r = BASE_RADIUS + RADIUS_STEP * d.depth;
  const x = d.type==='Genesis'?CENTER_X:Math.round(CENTER_X+r*Math.cos(a)), y = d.type==='Genesis'?CENTER_Y:Math.round(CENTER_Y+r*Math.sin(a));
  const n:TalentNode={...d,id:d.id,path:'sacred_breath',constellation:'air',position:{x,y},prerequisites:p,visual:{color:'#E6E6FA',size:50,icon:getAirNodeIcon(d.id)},effects:[],isVisible:true,isAllocatable:!p.length,isAllocated:false,isLocked:!!p.length,isPermanentlyLocked:false,pkCost:d.cost,type:d.type as NodeType};
  nodes.push(n); nodeMap[n.id]=n; p.forEach(prereqId=>connections.push({from:prereqId,to:n.id,isActive:false,isLocked:false}));
});
export const SACRED_BREATH_NODES = nodes;
export function generateSacredBreathConnections(): TalentConnection[] { return connections; }
export const SACRED_BREATH_METADATA = { name: 'The Sacred Breath', philosophy: 'Air connects all life. To master the breath is to feel the chi of the world and to see the unseen.', essence: 'Spiritual connection, sensing chi, meditation, non-combat support.', focus: 'Spiritual awareness and connection to the spirit world, inspired by Jinora and Yangchen.', sacredAnimal: 'The Sky Bison', emoji: '🦬', color: '#e6e6fa', position: { x: 900, y: 550 } }; 