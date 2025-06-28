/**
 * Path 2: The Sacred Breath - 聖息 (Shèng Xī) (Deterministically Generated)
 * 
 * Path Philosophy: "Air connects all life; to master breath is to understand the unity of existence."
 * Essence: Spiritual connection, life force, the breath that binds all living things.
 * Focus: Meditation, spiritual sight, healing, communion with spirits.
 * Sacred Animal: The Sky Bison - wise, spiritual, bridge between worlds.
 *
 * REFACTOR: Updated to match the "Four Winds Constellation" design document.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

// --- Layout Configuration ---
const CENTER_X = 900;
const CENTER_Y = 550;
const BRANCHES = 3;
const PATH_MAIN_ANGLE = 0; // Rightwards
const ANGLE_SPREAD = Math.PI / 2.2;
const ANGLE_START = PATH_MAIN_ANGLE - (ANGLE_SPREAD / 2);
const BASE_RADIUS = 160;
const RADIUS_STEP = 120;
const MIN_DIST = 90;

// --- Node Definitions (from Design Doc) ---
const nodeDataList = [
    // Genesis
    { id: 'genesis', name: 'The Sacred Breath Path', type: 'Genesis', cost: 1, branch: 1, depth: 0, description: "Immune to mental effects, perceive spiritual energy and life force.", flavor: "Air connects all life; to master breath is to understand the unity of existence." },

    // Minors after Genesis
    { id: 'minor_genesis_1', name: 'Deeper Calm', type: 'Minor', cost: 1, branch: 0.8, depth: 0.5, prerequisite: 'genesis', description: "Minor ailments and curses cannot take hold.", flavor: "A tranquil mind is a strong fortress." },
    { id: 'minor_genesis_2', name: 'Expanded Sight', type: 'Minor', cost: 1, branch: 1.2, depth: 0.5, prerequisite: 'genesis', description: "Perceive spiritual energy at greater distances.", flavor: "The spirit sees what the eyes cannot." },

    // --- Sub-Path A: Aspect of Inner Peace ---
    { id: 'A1', name: 'Clarity Meditation', type: 'Keystone', cost: 2, branch: 0, depth: 1, prerequisite: 'genesis', description: "Meditative stance reveals invisible enemies, traps, and secrets.", flavor: "Still the water to see the reflection." },
    { id: 'minor_a1_1', name: 'Swift Clarity', type: 'Minor', cost: 1, branch: 0, depth: 1.5, prerequisite: 'A1', description: "Achieve the meditative state more quickly.", flavor: "The spirit answers when called." },
    { id: 'minor_a1_2', name: 'Lingering Vision', type: 'Minor', cost: 1, branch: -0.2, depth: 1.5, prerequisite: 'A1', description: "Revealed secrets remain visible briefly after meditation ends.", flavor: "The spirit's sight lingers like morning mist." },
    { id: 'minor_a1_3', name: 'Deeper Insight', type: 'Minor', cost: 1, branch: 0.2, depth: 1.5, prerequisite: 'A1', description: "Your meditative vision reveals more detailed information about hidden things.", flavor: "The spirit sees what the eyes cannot." },
    
    { id: 'A2', name: 'Spirit Barrier', type: 'Keystone', cost: 2, branch: 0, depth: 2, prerequisite: 'A1', description: "Create a barrier of life energy that absorbs damage to your physical form.", flavor: "The spirit is the ultimate shield." },
    { id: 'minor_a2_1', name: 'Stronger Barrier', type: 'Minor', cost: 1, branch: 0, depth: 2.5, prerequisite: 'A2', description: "The spiritual protection is more resilient.", flavor: "The spirit's shield grows stronger." },
    { id: 'minor_a2_2', name: 'Swift Recovery', type: 'Minor', cost: 1, branch: -0.2, depth: 2.5, prerequisite: 'A2', description: "Your barrier begins regenerating sooner.", flavor: "The spirit heals swiftly." },
    { id: 'minor_a2_3', name: 'Larger Barrier', type: 'Minor', cost: 1, branch: 0.2, depth: 2.5, prerequisite: 'A2', description: "Your spirit barrier covers a larger area and can protect allies.", flavor: "The spirit's protection spreads wide." },
    
    { id: 'A3', name: 'Trance of Renewal', type: 'Manifestation', cost: 4, branch: 0, depth: 3, prerequisite: 'A2', description: "Enter a trance where your spirit barrier rapidly regenerates.", flavor: "In stillness, find restoration." },
    { id: 'minor_a3_1', name: 'Deeper Trance', type: 'Minor', cost: 1, branch: 0, depth: 3.5, prerequisite: 'A3', description: "Regeneration occurs even faster.", flavor: "The spirit's rest grows deeper." },
    { id: 'minor_a3_2', name: 'Protected Mind', type: 'Minor', cost: 1, branch: -0.2, depth: 3.5, prerequisite: 'A3', description: "Complete immunity to mental effects while in trance.", flavor: "The mind is safe within the spirit." },
    { id: 'minor_a3_3', name: 'Longer Trance', type: 'Minor', cost: 1, branch: 0.2, depth: 3.5, prerequisite: 'A3', description: "You can maintain the trance state longer.", flavor: "The spirit's rest endures." },
    
    { id: 'APEX_A', name: 'Transcendent Sight', type: 'Axiom', cost: 5, branch: 0, depth: 4, prerequisite: 'A3', description: "Perceive and manipulate the connections between all living things.", flavor: "The web of life is visible to those who look." },
    { id: 'minor_apex_a_1', name: 'Wider Sight', type: 'Minor', cost: 1, branch: -0.2, depth: 4.5, prerequisite: 'APEX_A', description: "Your transcendent sight covers a larger area.", flavor: "The web of life spreads far." },
    { id: 'minor_apex_a_2', name: 'Deeper Understanding', type: 'Minor', cost: 1, branch: 0.2, depth: 4.5, prerequisite: 'APEX_A', description: "You can understand and manipulate more complex life connections.", flavor: "The spirit's understanding grows deeper." },
    { id: 'minor_apex_a_3', name: 'Shared Sight', type: 'Minor', cost: 1, branch: 0, depth: 4.5, prerequisite: 'APEX_A', description: "You can share your transcendent sight with nearby allies.", flavor: "The spirit's vision is for all." },

    // --- Sub-Path B: Aspect of Spirit Communion ---
    { id: 'B1', name: 'Peaceful Presence', type: 'Keystone', cost: 2, branch: 1, depth: 1, prerequisite: 'genesis', description: "Pacify hostile animals and minor spirits through your spiritual presence.", flavor: "Peace is a language all creatures understand." },
    { id: 'minor_b1_1', name: 'Wider Peace', type: 'Minor', cost: 1, branch: 1, depth: 1.5, prerequisite: 'B1', description: "Your calming presence extends further.", flavor: "Peace spreads like ripples on water." },
    { id: 'minor_b1_2', name: 'Deeper Connection', type: 'Minor', cost: 1, branch: 0.8, depth: 1.5, prerequisite: 'B1', description: "Affect more powerful creatures.", flavor: "The spirit's touch reaches deep." },
    { id: 'minor_b1_3', name: 'Longer Calm', type: 'Minor', cost: 1, branch: 1.2, depth: 1.5, prerequisite: 'B1', description: "The pacifying effect lasts longer on affected creatures.", flavor: "Peace endures in the heart." },
    
    { id: 'B2', name: 'Memory of Air', type: 'Keystone', cost: 2, branch: 1, depth: 2, prerequisite: 'B1', description: "Touch objects to see spectral replays of their recent history.", flavor: "The air remembers all it has touched." },
    { id: 'minor_b2_1', name: 'Clearer Visions', type: 'Minor', cost: 1, branch: 1, depth: 2.5, prerequisite: 'B2', description: "The replays are more detailed and last longer.", flavor: "The past speaks clearly to those who listen." },
    { id: 'minor_b2_2', name: 'Emotional Echo', type: 'Minor', cost: 1, branch: 0.8, depth: 2.5, prerequisite: 'B2', description: "Sense the emotions of those who handled the object.", flavor: "Feel what the object has felt." },
    { id: 'minor_b2_3', name: 'Deeper Memory', type: 'Minor', cost: 1, branch: 1.2, depth: 2.5, prerequisite: 'B2', description: "You can see further back in the object's history.", flavor: "The air's memory is long." },
    
    { id: 'B3', name: 'Spirit Projection', type: 'Manifestation', cost: 4, branch: 1, depth: 3, prerequisite: 'B2', description: "Project your spirit to scout ahead while your body remains in meditation.", flavor: "The mind is not bound by the body." },
    { id: 'minor_b3_1', name: 'Extended Range', type: 'Minor', cost: 1, branch: 1, depth: 3.5, prerequisite: 'B3', description: "Your spirit can travel much further.", flavor: "The spirit's journey knows no bounds." },
    { id: 'minor_b3_2', name: 'Spirit Sight', type: 'Minor', cost: 1, branch: 0.8, depth: 3.5, prerequisite: 'B3', description: "See through solid barriers while projecting.", flavor: "The spirit sees through all barriers." },
    { id: 'minor_b3_3', name: 'Longer Projection', type: 'Minor', cost: 1, branch: 1.2, depth: 3.5, prerequisite: 'B3', description: "You can maintain your spirit projection longer.", flavor: "The spirit's journey is long." },
    
    { id: 'APEX_B', name: 'Speaker with Spirits', type: 'Axiom', cost: 5, branch: 1, depth: 4, prerequisite: 'B3', description: "Communicate with and gain aid from deceased spirits.", flavor: "Death is not an end, but a transition to a different kind of life." },
    { id: 'minor_apex_b_1', name: 'Stronger Communication', type: 'Minor', cost: 1, branch: 0.8, depth: 4.5, prerequisite: 'APEX_B', description: "Your communication with spirits is clearer and more effective.", flavor: "The spirit's voice is clear." },
    { id: 'minor_apex_b_2', name: 'More Spirits', type: 'Minor', cost: 1, branch: 1.2, depth: 4.5, prerequisite: 'APEX_B', description: "You can communicate with multiple spirits simultaneously.", flavor: "Many voices speak as one." },
    { id: 'minor_apex_b_3', name: 'Spirit Aid', type: 'Minor', cost: 1, branch: 1, depth: 4.5, prerequisite: 'APEX_B', description: "Spirits are more willing to aid you and provide stronger assistance.", flavor: "The spirits favor the kind." },

    // --- Sub-Path C: Aspect of Universal Harmony ---
    { id: 'C1', name: 'Bonds of Breath', type: 'Keystone', cost: 2, branch: 2, depth: 1, prerequisite: 'genesis', description: "Create spiritual links with allies, sharing damage among the group.", flavor: "We all breathe the same air. We are all connected." },
    { id: 'minor_c1_1', name: 'Stronger Bonds', type: 'Minor', cost: 1, branch: 2, depth: 1.5, prerequisite: 'C1', description: "Redirect more damage from allies to yourself.", flavor: "The bond grows stronger with sacrifice." },
    { id: 'minor_c1_2', name: 'Extended Bonds', type: 'Minor', cost: 1, branch: 2.2, depth: 1.5, prerequisite: 'C1', description: "Link with allies at greater distances.", flavor: "The breath connects across great distances." },
    { id: 'minor_c1_3', name: 'More Bonds', type: 'Minor', cost: 1, branch: 1.8, depth: 1.5, prerequisite: 'C1', description: "You can create bonds with more allies simultaneously.", flavor: "The breath connects all." },
    
    { id: 'C2', name: 'Cosmic Awareness', type: 'Keystone', cost: 2, branch: 2, depth: 2, prerequisite: 'C1', description: "Meditation reveals the layout and energy flows of large areas.", flavor: "The universe is a symphony, and every being is a note." },
    { id: 'minor_c2_1', name: 'Swift Attunement', type: 'Minor', cost: 1, branch: 2, depth: 2.5, prerequisite: 'C2', description: "Map areas more quickly through meditation.", flavor: "The universe reveals itself to the prepared mind." },
    { id: 'minor_c2_2', name: 'Energy Sight', type: 'Minor', cost: 1, branch: 2.2, depth: 2.5, prerequisite: 'C2', description: "Detect sources of spiritual or elemental power.", flavor: "See the currents of power that flow through all things." },
    { id: 'minor_c2_3', name: 'Larger Awareness', type: 'Minor', cost: 1, branch: 1.8, depth: 2.5, prerequisite: 'C2', description: "Your cosmic awareness covers larger areas.", flavor: "The universe's song is vast." },
    
    { id: 'C3', name: 'Universal Calm', type: 'Manifestation', cost: 4, branch: 2, depth: 3, prerequisite: 'C2', description: "Release a wave of tranquility that pacifies all hostile creatures in a wide area.", flavor: "One deep breath can calm a thousand raging hearts." },
    { id: 'minor_c3_1', name: 'Greater Calm', type: 'Minor', cost: 1, branch: 2, depth: 3.5, prerequisite: 'C3', description: "Affect a much larger area with your peace.", flavor: "The peace spreads like morning light." },
    { id: 'minor_c3_2', name: 'Lasting Serenity', type: 'Minor', cost: 1, branch: 2.2, depth: 3.5, prerequisite: 'C3', description: "The calming effect endures much longer.", flavor: "The peace lingers like evening mist." },
    { id: 'minor_c3_3', name: 'Deeper Peace', type: 'Minor', cost: 1, branch: 1.8, depth: 3.5, prerequisite: 'C3', description: "The pacifying effect is stronger and affects more powerful creatures.", flavor: "The peace touches the soul." },
    
    { id: 'APEX_C', name: 'One With All Life', type: 'Axiom', cost: 5, branch: 2, depth: 4, prerequisite: 'C3', description: "Achieve perfect empathy and understanding of all creatures.", flavor: "To know a creature is to love it." },
    { id: 'minor_apex_c_1', name: 'Wider Empathy', type: 'Minor', cost: 1, branch: 1.8, depth: 4.5, prerequisite: 'APEX_C', description: "Your empathy extends to creatures at greater distances.", flavor: "The heart reaches far." },
    { id: 'minor_apex_c_2', name: 'Deeper Understanding', type: 'Minor', cost: 1, branch: 2.2, depth: 4.5, prerequisite: 'APEX_C', description: "Your understanding of creatures is even more profound.", flavor: "The spirit's wisdom grows." },
    { id: 'minor_apex_c_3', name: 'Shared Understanding', type: 'Minor', cost: 1, branch: 2, depth: 4.5, prerequisite: 'APEX_C', description: "You can share your understanding with nearby allies.", flavor: "The wisdom is for all." },

    // --- Synthesis & Bridge ---
    { id: 'SYNTHESIS_A_B', name: 'Spiritual Unity', type: 'Synthesis', cost: 5, branch: 0.5, depth: 4, prerequisite: ['APEX_A', 'APEX_B'], description: "Combine inner peace with spirit communion for ultimate spiritual mastery." },
    { id: 'BRIDGE_B', name: 'Cross-Path Bridge', type: 'Bridge', cost: 10, branch: 1.5, depth: 4.5, prerequisite: ['APEX_B', 'APEX_C'], description: "Gain access to Synthesis Opportunity." },

    // --- Endgame Choices ---
    { id: 'rite_peace', name: 'Trial of Inner Peace', type: 'GnosticRite', cost: 1, branch: 0, depth: 5, prerequisite: 'APEX_A', description: "Maintain perfect calm while under spiritual attack.", flavor: "The storm rages without, but the spirit is still within." },
    { id: 'rite_commune', name: 'Trial of Communion', type: 'GnosticRite', cost: 1, branch: 1, depth: 5, prerequisite: 'APEX_B', description: "Successfully mediate between hostile spirits.", flavor: "A bridge must be strong enough to bear the weight of two worlds." },
    { id: 'rite_unity', name: 'Trial of Unity', type: 'GnosticRite', cost: 1, branch: 2, depth: 5, prerequisite: 'APEX_C', description: "Achieve perfect empathy with a natural enemy.", flavor: "See yourself in the eyes of your enemy, and they are no longer an enemy." },

    { id: 'cap_heart', name: 'Heart of the World', type: 'Capstone', cost: 15, branch: 0, depth: 6, prerequisite: 'rite_peace', description: "Anchor your spirit to create a massive sanctuary where all allies are protected, healed, and empowered.", flavor: "My spirit is an anchor in the storm of the world." },
    { id: 'cap_worlds', name: 'Master of Both Worlds', type: 'Capstone', cost: 15, branch: 1, depth: 6, prerequisite: 'rite_commune', description: "Command spirits of all kinds, summoning them to aid in both spiritual and physical matters.", flavor: "I walk in two worlds, and am master of both." },
    { id: 'cap_unity', name: 'Unity Incarnate', type: 'Capstone', cost: 15, branch: 2, depth: 6, prerequisite: 'rite_unity', description: "Become a living embodiment of harmony, sharing your abilities freely and drawing strength from all living things.", flavor: "I am a part of all, and all is a part of me." },

    { id: 'schism_rend', name: 'Spirit Rending', type: 'Schism', cost: 8, branch: 1.5, depth: 5, prerequisite: 'APEX_B', description: "Forcibly separate a foe's spirit from their body, but suffer spiritual damage in return.", flavor: "To understand unity, one must first understand separation." },
    { id: 'schism_shatter', name: 'Soul Shatter', type: 'Schism', cost: 12, branch: 1.5, depth: 6, prerequisite: 'schism_rend', description: "Master the art of spiritual destruction, but fragment your own soul in the process.", flavor: "To break another's soul is to shatter one's own." },
];

// --- Generation Code (Identical to Gentle Breeze, just feeding it new data) ---

const nodes: TalentNode[] = [];
const connections: TalentConnection[] = [];
const nodeMap: Record<string, TalentNode> = {};

nodeDataList.forEach(nodeData => {
  const { id, branch, depth, prerequisite, type } = nodeData;
  const prerequisites = Array.isArray(prerequisite) ? prerequisite : (prerequisite ? [prerequisite] : []);
  const baseAngle = ANGLE_START + (branch * ANGLE_SPREAD) / (BRANCHES);
  const r = BASE_RADIUS + RADIUS_STEP * depth;
  const x = type === 'Genesis' ? CENTER_X : Math.round(CENTER_X + r * Math.cos(baseAngle));
  const y = type === 'Genesis' ? CENTER_Y : Math.round(CENTER_Y + r * Math.sin(baseAngle));

  const node: TalentNode = {
    id, name: nodeData.name, description: nodeData.description, flavor: nodeData.flavor, type: nodeData.type as NodeType, path: 'sacred_breath', constellation: 'air', position: { x, y }, prerequisites: prerequisites, visual: { 
      color: '#e0f7fa', 
      size: 50,
      icon: getSacredBreathNodeIcon(type) 
    }, effects: [], isVisible: true, isAllocatable: prerequisites.length === 0, isAllocated: false, isLocked: prerequisites.length > 0, isPermanentlyLocked: false, pkCost: nodeData.cost,
  };
  nodes.push(node);
  nodeMap[id] = node;
  prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: id, isActive: false, isLocked: false });
  });
});

// Force-Directed Repulsion
for (let iter = 0; iter < 100; iter++) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].type === 'Genesis') continue;
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.position.x - b.position.x;
      const dy = a.position.y - b.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MIN_DIST && dist > 0) {
        const moveFactor = (MIN_DIST - dist) / dist * 0.5;
        const moveX = dx * moveFactor;
        const moveY = dy * moveFactor;
        a.position.x += moveX;
        a.position.y += moveY;
        if (b.type !== 'Genesis') {
          b.position.x -= moveX;
          b.position.y -= moveY;
        }
      }
    }
  }
}

// --- Exports ---
export const SACRED_BREATH_NODES = nodes;
export const SACRED_BREATH_GENESIS = nodes.find(n => n.type === 'Genesis')!;
export function generateSacredBreathConnections(): TalentConnection[] { return connections; }
export const SACRED_BREATH_METADATA = {
  name: 'The Sacred Breath',
  philosophy: 'Air connects all life; to master breath is to understand the unity of existence.',
  essence: 'Spiritual connection, life force, the breath that binds all living things.',
  focus: 'Meditation, spiritual sight, healing, communion with spirits.',
  sacredAnimal: 'The Sky Bison',
  emoji: '🧘',
  color: '#e0f7fa',
  position: { x: 900, y: 550 }
};

function getSacredBreathNodeIcon(type: string): string {
  switch (type) {
    case 'Genesis': return '🕉️';
    case 'Keystone': return '✨';
    case 'Manifestation': return '👻';
    case 'Axiom': return '🌌';
    case 'Capstone': return '❤️‍🩹';
    case 'GnosticRite': return '🙏';
    case 'Schism': return '💔';
    case 'Minor': return '🕊️';
    default: return '🌬️';
  }
} 