/**
 * Path 1: The Endless Mirror - Reflections of What Was (Deterministically Generated)
 *
 * Path Philosophy: Water is memory incarnate. Every drop has touched every shore, carries every story. 
 * Focus: Adaptation through wisdom, learning from every encounter, becoming stronger through understanding.
 *
 * REFACTOR: Added all minor nodes to connect the major path abilities.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 800; const CENTER_Y = 500; const BRANCHES = 3;
const PATH_MAIN_ANGLE = -Math.PI / 2; // Upwards
const ANGLE_SPREAD = Math.PI / 2.2; const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160; const RADIUS_STEP = 120; const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // GENESIS
    { id: 'genesis', name: 'Mirror\'s First Glimpse', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Water shows you echoes of every technique used against you.", flavor: "Memory is the first step to understanding." },

    // SUB-PATH A
    { id: 'A1', name: 'Sage of Reflected Wisdom', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Create water shields that learn from attacks, gaining resistance to damage types that hit them.", flavor: "A still pool reflects the sky, but a wise pool reflects the storm." },
    { id: 'minor_a1_1', name: 'Strengthening Reflection', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Your shield's learned resistances are more potent.", flavor: "Each reflection deepens understanding." },
    { id: 'minor_a1_2', name: 'Rapid Learning', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your shield learns from new damage types more quickly.", flavor: "Wisdom comes to those who listen." },
    { id: 'minor_a1_3', name: 'Memory Retention', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Your shield retains learned resistances longer.", flavor: "The water never forgets." },
    
    { id: 'A2', name: 'Oracle of Flowing Forms', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Your water-based attacks and defenses subtly change their properties to counter your opponent's.", flavor: "Water has no single form; its form is whatever is needed." },
    { id: 'minor_a2_1', name: 'Swift Adaptation', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your forms adapt more quickly to changing circumstances.", flavor: "Adaptation is the heart of survival." },
    { id: 'minor_a2_2', name: 'Perfect Counter', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your adapted forms are more effective against their intended targets.", flavor: "The perfect counter is born from understanding." },
    { id: 'minor_a2_3', name: 'Fluid Transition', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "You can change your water forms more smoothly without losing momentum.", flavor: "The river flows without interruption." },
    
    { id: 'A3', name: 'Invoke the Endless Library', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "For a brief period, perfectly replicate the last non-Capstone ability used against you.", flavor: "All knowledge flows through water. One need only learn to read the currents." },
    { id: 'minor_a3_1', name: 'Longer Replication', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "You can maintain replicated abilities longer.", flavor: "The memory endures." },
    { id: 'minor_a3_2', name: 'Stronger Replication', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "Your replicated abilities are more powerful than the original.", flavor: "The student surpasses the master." },
    { id: 'minor_a3_3', name: 'Multiple Memories', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "You can replicate multiple abilities simultaneously.", flavor: "The library holds many books." },
    
    { id: 'APEX_A', name: 'Truth: All Waters are One Water', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "You are perfectly adapted to any environment containing moisture, moving and fighting as if in your home element.", flavor: "The drop of rain remembers being the ocean." },
    { id: 'minor_apex_a_1', name: 'Deeper Adaptation', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your environmental adaptation is even more perfect.", flavor: "The water becomes you." },
    { id: 'minor_apex_a_2', name: 'Wider Range', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "You can adapt to environments with even less moisture.", flavor: "Even the desert holds water." },
    { id: 'minor_apex_a_3', name: 'Instant Adaptation', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "Your adaptation to new environments is instantaneous.", flavor: "The water knows no delay." },
    
    // SUB-PATH B
    { id: 'B1', name: 'Keeper of Environmental Truths', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Sense the history of water in an area, revealing hidden paths or recent events.", flavor: "The land changes, but water's memory remains." },
    { id: 'minor_b1_1', name: 'Clearer Echoes', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Visions of the past are more detailed.", flavor: "The past speaks in whispers." },
    { id: 'minor_b1_2', name: 'Deeper Resonance', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "You can sense events from further in the past.", flavor: "Some memories are buried deep." },
    { id: 'minor_b1_3', name: 'Wider Sensing', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "You can sense water history in a larger area.", flavor: "The water's memory spans far." },
    
    { id: 'B2', name: 'Channel the Ancestral Current', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Draw on the memories within the water to temporarily use techniques of ancient waterbenders.", flavor: "The masters of old still speak through the rivers." },
    { id: 'minor_b2_1', name: 'Stronger Manifestations', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "The ancient techniques you channel are more powerful.", flavor: "Their strength becomes yours." },
    { id: 'minor_b2_2', name: 'Longer Channeling', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "You can channel ancient techniques longer.", flavor: "The ancestral current flows strong." },
    { id: 'minor_b2_3', name: 'Multiple Ancestors', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "You can channel techniques from multiple ancient masters simultaneously.", flavor: "Many voices speak as one." },
    
    { id: 'B3', name: 'Manifest the Perfect Counter', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "After being struck, your waterbending automatically forms the perfect defense against that specific attack for a short time.", flavor: "The mirror does not think. It only reflects, perfectly." },
    { id: 'minor_b3_1', name: 'Faster Counter', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "Your perfect counter forms more quickly.", flavor: "The mirror reflects instantly." },
    { id: 'minor_b3_2', name: 'Longer Counter', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "Your perfect counter lasts longer.", flavor: "The mirror's reflection endures." },
    { id: 'minor_b3_3', name: 'Counter Mastery', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your perfect counter can also counter similar attacks.", flavor: "The mirror learns patterns." },
    
    { id: 'APEX_B', name: 'Law: The Mirror Never Lies', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Gain preternatural insight into an opponent's next move, granting you a brief window of opportunity to counter.", flavor: "Look into the water, and see your enemy's intent as clearly as your own reflection." },
    { id: 'minor_apex_b_1', name: 'Longer Insight', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your insight into enemy moves lasts longer.", flavor: "The mirror's truth endures." },
    { id: 'minor_apex_b_2', name: 'Deeper Insight', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "Your insight reveals more details about enemy intentions.", flavor: "The mirror shows all." },
    { id: 'minor_apex_b_3', name: 'Multiple Insights', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "You can gain insight into multiple enemies simultaneously.", flavor: "The mirror reflects many faces." },

    // SUB-PATH C
    { id: 'C1', name: 'Ripples of Recognition', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "After an enemy uses an ability, you gain a brief moment of insight, increasing your dodge chance against it.", flavor: "Every action creates a ripple. Learn to read them." },
    { id: 'minor_c1_1', name: 'Predictive Ripples', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "The dodge chance bonus is increased.", flavor: "Anticipate the wave before it forms." },
    { id: 'minor_c1_2', name: 'Lasting Insight', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "The insight window lasts longer.", flavor: "Hold the memory of the moment." },
    { id: 'minor_c1_3', name: 'Ripple Awareness', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "You can sense ripples from abilities used further away.", flavor: "The ripples travel far." },
    
    { id: 'C2', name: 'Currents of Ancient Wisdom', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Passively draw knowledge from your surroundings, slowly revealing the map and points of interest.", flavor: "The very air is thick with stories for those who can listen." },
    { id: 'minor_c2_1', name: 'Flowing Knowledge', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your map reveals itself more quickly.", flavor: "Wisdom seeks the prepared mind." },
    { id: 'minor_c2_2', name: 'Deeper Knowledge', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Your map reveals more detailed information about locations.", flavor: "The currents carry deep secrets." },
    { id: 'minor_c2_3', name: 'Wider Knowledge', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Your knowledge extends to a larger area.", flavor: "The wisdom flows far and wide." },
    
    { id: 'C3', name: 'Shifting Currents of Understanding', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Instantly adapt your resistances, gaining a massive defense boost against the last type of elemental damage you took.", flavor: "To bend is to adapt. To adapt is to survive." },
    { id: 'minor_c3_1', name: 'Faster Adaptation', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "Your resistance adaptation happens more quickly.", flavor: "The currents shift instantly." },
    { id: 'minor_c3_2', name: 'Stronger Resistance', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "Your adapted resistances are more effective.", flavor: "The understanding grows deeper." },
    { id: 'minor_c3_3', name: 'Multiple Resistances', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "You can adapt to multiple damage types simultaneously.", flavor: "The currents flow in many directions." },
    
    { id: 'APEX_C', name: 'Certainty: Memory is Eternal', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "After defeating a powerful foe, permanently learn one of their abilities at a reduced effectiveness.", flavor: "Memory is the only true form of immortality." },
    { id: 'minor_apex_c_1', name: 'Stronger Memory', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your learned abilities are more effective.", flavor: "The memory grows stronger." },
    { id: 'minor_apex_c_2', name: 'Multiple Memories', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "You can learn multiple abilities from a single foe.", flavor: "Many memories become one." },
    { id: 'minor_apex_c_3', name: 'Eternal Memory', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "Your learned abilities never fade or weaken over time.", flavor: "The memory is truly eternal." },

    // ENDGAME
    { id: 'rite_reflection', name: 'Ordeal of Perfect Reflection', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Face an echo of yourself and overcome it by not fighting, but by understanding.", flavor: "To defeat the mirror, one must first accept what it shows." },
    { id: 'rite_adaptation', name: 'Trial of Infinite Adaptation', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Survive an onslaught of ever-changing elemental attacks.", flavor: "The reed that bends is stronger than the oak that resists." },
    { id: 'rite_memory', name: 'Vigil of the Eternal Current', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Connect to the entire planet's water memory at once without losing your sense of self.", flavor: "To hear every story at once is to understand the song of the world." },
    { id: 'cap_all_seeing', name: 'The All-Seeing Current', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_reflection', description: "Become a living conduit to water's memory. You know the history of everything you see and can predict actions with near-perfect accuracy.", flavor: "I have seen the beginning. I know the end." },
    { id: 'cap_eternal_adaptor', name: 'The Eternal Adaptor', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_adaptation', description: "Your body and bending become perfectly fluid, instantly and passively adapting to nullify any threat.", flavor: "I have no form, for I am all forms." },
    { id: 'cap_mirror_truth', name: 'The Mirror of Truth', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_memory', description: "You don't just mimic abilities, you reflect them back perfectly and with greater force, powered by the collective memory of water.", flavor: "What you are, I am. What you do, I do better." },
    { id: 'schism_fractured', name: 'The Fractured Mirror', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Your reflections become warped and chaotic, mimicking abilities with unpredictable and dangerous side effects.", flavor: "A broken mirror shows a thousand truths, all of them sharp." },
    { id: 'schism_consuming', name: 'The Consuming Reflection', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_fractured', description: "Instead of reflecting abilities, you consume them, stealing the knowledge from your opponent but inflicting a spiritual wound on yourself.", flavor: "To steal a memory is to steal a piece of a soul." },

    // --- Synthesis & Bridge ---
    { id: 'SYNTHESIS_A_B', name: 'Confluence of Memory', type: 'Synthesis', cost: 5, branch: 0.5, depth: 4, prerequisite: ['APEX_A', 'APEX_B'], description: "Fuse perfect adaptation with preternatural insight, allowing you to instantly learn and counter any ability used against you for a short time.", flavor: "All rivers meet in the sea; all memories meet in the mind." },
    { id: 'BRIDGE_B', name: 'Cross-Current Bridge', type: 'Bridge', cost: 10, branch: 1.5, depth: 4.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Unlock the ability to combine insight and memory, granting access to Synthesis.", flavor: "Where currents meet, new possibilities are born." },
];

// --- Generation Code ---
const nodes: TalentNode[] = []; const connections: TalentConnection[] = []; const nodeMap: Record<string, TalentNode> = {};
nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES); const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle)); const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));
  const node: TalentNode = { id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'endless_mirror', constellation: 'water', position: { x, y }, prerequisites, visual: { color: '#74c7ec', size: 50, icon: getEndlessMirrorNodeIcon(type) }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost };
  nodes.push(node); nodeMap[id] = node;
  prerequisites.forEach(prereqId => { connections.push({ from: prereqId, to: id, isActive: false, isLocked: false }); });
});
for (let iter = 0; iter < 100; iter++) { for (let i = 0; i < nodes.length; i++) { if (nodes[i].type === 'Genesis') continue; for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i]; const b = nodes[j]; const dx = a.position.x - b.position.x; const dy = a.position.y - b.position.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < MIN_DIST && dist > 0) { const moveFactor = (MIN_DIST - dist) / dist * 0.5; const moveX = dx * moveFactor; const moveY = dy * moveFactor; a.position.x += moveX; a.position.y += moveY; if (b.type !== 'Genesis') { b.position.x -= moveX; b.position.y -= moveY; } } } } }

// --- Exports ---
export const ENDLESS_MIRROR_NODES = nodes;
export const ENDLESS_MIRROR_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateEndlessMirrorConnections(): TalentConnection[] { return connections; }
export const ENDLESS_MIRROR_METADATA = { name: 'The Endless Mirror', philosophy: "Water is memory incarnate. Every drop has touched every shore, carries every story.", essence: "Adaptation, wisdom, and reflection.", focus: "Defensive mimicry, adaptive combat, environmental awareness.", sacredAnimal: "The Koi Fish", emoji: '🎏', color: '#74c7ec', position: { x: 800, y: 500 } };
function getEndlessMirrorNodeIcon(type: string): string {
  switch (type) { case 'Genesis': return '💧'; case 'Keystone': return '🌊'; case 'Manifestation': return '🔍'; case 'Axiom': return '📜'; case 'Capstone': return '🌀'; case 'GnosticRite': return '🙏'; case 'Schism': return '🔮'; case 'Minor': return '💧'; case 'Synthesis': return '⚛️'; case 'Bridge': return '🌉'; default: return '🌊'; }
} 