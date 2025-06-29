/**
 * Path 4: The Crushing Abyss - 深渊 (Shēn Yuān) (Canonically Refactored)
 * 
 * Path Philosophy: "The truth lies in the deep. The weight of the world creates a pressure that can bend steel. True power is not seen; it is felt."
 * Essence: High-pressure techniques, overwhelming force, battlefield control through massive water manipulation.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const CENTER_X = 800; const CENTER_Y = 600; const BRANCHES = 2; const PATH_MAIN_ANGLE = Math.PI / 2;
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

const nodeDataList = [
  { id: 'genesis', name: 'The Crushing Abyss Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "You feel the weight and pressure of water, allowing you to exert more force with your bending than others. Your water whips strike with the force of a physical blow.", flavor: "The abyss holds tight." },
  
  { id: 'deep_pressure', name: 'Deep Pressure', type: 'Minor', cost: 1, branch: 0.7, depth: 0.5, prerequisite: 'genesis', description: "You can create water with immense pressure, making your attacks more devastating.", flavor: "The deep crushes all." },
  { id: 'abyssal_sight', name: 'Abyssal Sight', type: 'Minor', cost: 1, branch: 1.3, depth: 0.5, prerequisite: 'genesis', description: "You can see clearly underwater and sense the depths of any body of water.", flavor: "See through the darkness." },
  { id: 'crushing_force', name: 'Crushing Force', type: 'Minor', cost: 1, branch: 0.5, depth: 0.7, prerequisite: 'genesis', description: "Your waterbending attacks have greater impact and can break through solid defenses.", flavor: "Break the unbreakable." },
  { id: 'dark_waters', name: 'Dark Waters', type: 'Minor', cost: 1, branch: 1.5, depth: 0.7, prerequisite: 'genesis', description: "You can create areas of darkness underwater, concealing your movements and confusing enemies.", flavor: "The abyss hides all." },
  { id: 'oceans_heart', name: "Ocean's Heart", type: 'Minor', cost: 1, branch: 1, depth: 0.9, prerequisite: 'genesis', description: "You have a deep connection to the ocean, allowing you to draw power from its vast depths.", flavor: "The ocean empowers you." },
  
  { id: 'high_pressure_jet', name: 'High-Pressure Jet', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "You create a thin, highly-pressurized stream of water capable of slicing through wood, rock, and even thin metal with sustained focus.", flavor: "Cut with water." },
  { id: 'sweeping_blade', name: 'Sweeping Blade', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'high_pressure_jet', description: "You can widen the jet into a flat, blade-like sheet of water for wider, sweeping cuts.", flavor: "Sweep the field." },
  { id: 'riptide_burst', name: 'Riptide Burst', type: 'Minor', cost: 1, branch: 0.2, depth: 1.7, prerequisite: 'high_pressure_jet', description: "You can release the pressure in a concussive, shotgun-like blast of water for a close-range knockout blow.", flavor: "Burst with force." },
  
  { id: 'water_sphere', name: 'Water Sphere', type: 'Manifestation', cost: 4, branch: 0, depth: 2, prerequisite: 'high_pressure_jet', description: "You can trap an opponent inside a sphere of water, lifting them off the ground and rendering them helpless. This is a powerful non-lethal incapacitation technique.", flavor: "The abyss squeezes tight." },
  { id: 'compressing_sphere', name: 'Compressing Sphere', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'water_sphere', description: "You can slowly increase the pressure inside the sphere, creating a crushing force to force a surrender or render an opponent unconscious.", flavor: "Crush the will." },
  { id: 'drowning_sphere', name: 'Drowning Sphere', type: 'Minor', cost: 1, branch: 0.2, depth: 2.7, prerequisite: 'water_sphere', description: "You can force the water from the sphere into an opponent's lungs. This is a lethal application and a dark path to walk.", flavor: "Drown the hope." },
  
  { id: 'depth_charge', name: 'Depth Charge', type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'water_sphere', description: "You form a sphere of water and use your bending to create an area of immense pressure within it. When launched, the sphere implodes with catastrophic force.", flavor: "Explode the deep." },
  { id: 'underwater_detonation', name: 'Underwater Detonation', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'depth_charge', description: "When used underwater, the effect is magnified, creating a truly devastating concussive blast.", flavor: "The deep explodes." },
  { id: 'vacuum_implosion', name: 'Vacuum Implosion', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'depth_charge', description: "The implosion briefly creates a vacuum, violently pulling all nearby objects and enemies toward the center.", flavor: "The abyss pulls all." },
  
  { id: 'whirlpool', name: 'Whirlpool', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "In a body of water, you can create a powerful vortex to trap and disorient opponents or small boats.", flavor: "Spin the sea." },
  { id: 'sinking_core', name: 'Sinking Core', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'whirlpool', description: "The center of your whirlpool pulls objects and people downward with much greater force.", flavor: "Sink the enemy." },
  { id: 'tidal_surge', name: 'Tidal Surge', type: 'Minor', cost: 1, branch: 1.2, depth: 1.7, prerequisite: 'whirlpool', description: "You can create massive waves that can sweep away enemies and reshape the battlefield.", flavor: "Surge the tide." },
  
  { id: 'the_abyss_calls', name: 'The Abyss Calls', type: 'Manifestation', cost: 4, branch: 1, depth: 2, prerequisite: 'whirlpool', description: "You can create a massive whirlpool that can swallow entire ships and large groups of enemies, pulling them into the depths.", flavor: "The abyss calls." },
  { id: 'abyssal_maw', name: 'Abyssal Maw', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'the_abyss_calls', description: "Your whirlpool can be made to appear as a massive mouth, creating a terrifying display of power.", flavor: "The sea devours." },
  { id: 'depths_embrace', name: "Depth's Embrace", type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'the_abyss_calls', description: "Those caught in your whirlpool are pulled deeper and deeper, making escape nearly impossible.", flavor: "Embrace the deep." },
  
  { id: 'oceans_wrath', name: "The Ocean's Wrath", type: 'Axiom', cost: 5, branch: 1, depth: 2, prerequisite: 'the_abyss_calls', description: "You can call upon the full power of the ocean, creating massive tidal waves, whirlpools, and storms that can devastate entire coastlines.", flavor: "Wrath of the sea." },
  { id: 'storm_caller', name: 'Storm Caller', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'oceans_wrath', description: "Your ocean mastery can create storms and hurricanes, bringing rain, wind, and lightning to your aid.", flavor: "Call the storm." },
  { id: 'tsunami_master', name: 'Tsunami Master', type: 'Minor', cost: 1, branch: 1.2, depth: 2.7, prerequisite: 'oceans_wrath', description: "You can create massive waves that can reach far inland, reshaping the landscape and destroying everything in their path.", flavor: "Master the wave." },
  
  { id: 'minor_wj_1', name: 'Water Lashing', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'high_pressure_jet', description: "Shape water into a super-sharp edge for a split-second, enabling you to cut through metal, wood, and stone.", flavor: "As demonstrated by Katara against the Fire Nation drill." },
  { id: 'minor_wave_1', name: 'Tsunami (Avatar Level)', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'the_abyss_calls', description: "As an Avatar, your control is great enough to create massive tsunamis, capable of moving landmasses.", flavor: "As used by Avatar Kyoshi to create Kyoshi Island." },
  { id: 'minor_ws_1', name: 'Bubble', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'water_sphere', description: "A defensive variation where you create a bubble of air around yourself and others to travel underwater.", flavor: "As used by Katara to cross the Serpent's Pass." },
  
  { id: 'ca_minor_1', name: 'Pressure Acclimation', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "You are naturally resistant to the effects of deep-water pressure.", flavor: "The abyss welcomes its own." },
  { id: 'ca_minor_2', name: 'Undertow', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'high_pressure_jet', description: "The water currents you create have a strong undertow, pulling opponents off-balance.", flavor: "The deep pulls all things down." },
  { id: 'ca_minor_3', name: 'Riptide Burst', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'high_pressure_jet', description: "You can release the pressure of a wave in a concussive, shotgun-like blast of water.", flavor: "The abyss explodes outward." },
  { id: 'ca_minor_4', name: 'Crushing Grip', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'water_sphere', description: "The pressure inside your Water Sphere is increased, making it harder to escape.", flavor: "The abyss squeezes tighter." },
  { id: 'ca_minor_5', name: 'Water Ball', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'minor_ws_1', description: "You can trap small objects or create distractions with a small, contained ball of water.", flavor: "Control in a small package." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'crushing_abyss', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#89b4fa', size: 50, icon: getCrushingAbyssNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const CRUSHING_ABYSS_NODES = nodes;
export const CRUSHING_ABYSS_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateCrushingAbyssConnections(): TalentConnection[] { return connections; }
export const CRUSHING_ABYSS_METADATA = { 
  name: 'The Crushing Abyss', 
  philosophy: "The truth lies in the deep. The weight of the world creates a pressure that can bend steel. True power is not seen; it is felt.", 
  essence: "High-pressure techniques, overwhelming force, battlefield control through massive water manipulation.", 
  focus: "High-pressure water techniques and massive force, inspired by Korra's aggressive style.", 
  sacredAnimal: "The Sea Serpent", 
  emoji: '🌊', 
  color: '#89b4fa', 
  position: { x: 800, y: 600 } 
};

function getCrushingAbyssNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '💧'; case 'Keystone': return '🌊'; case 'Manifestation': return '🔍'; case 'Axiom': return '📜'; case 'Capstone': return '🌀'; case 'GnosticRite': return '🙏'; case 'Schism': return '🔮'; case 'Minor': return '💧'; case 'Synthesis': return '⚛️'; case 'Bridge': return '🌉'; default: return '🌊'; }
} 