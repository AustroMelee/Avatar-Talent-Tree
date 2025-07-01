/**
 * Path 2: The Sacred Breath - 聖息 (Shèng Xī)
 * Philosophy: "Air connects all life. To master the breath is to feel the chi of the world, to see the unseen, and to understand the bond between the physical and the spiritual."
 * Essence: Spiritual connection, sensing chi, meditation, non-combat support, and communion.
 */
import type { TalentNode, TalentConnection, NodeType } from '../../types';

const nodeDataList = [
    { id: 'genesis', name: 'The Sacred Breath Path', type: 'Genesis', cost: 1, description: "You can sense the presence of strong spiritual energy or discern if an area is in harmony or turmoil.", flavor: "To master the breath is to feel the chi of the world." },
    
    // Minors after Genesis
    { id: 'minor_gen_1', name: 'Deeper Calm', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your meditative breathing strengthens your inner chi, granting resistance to negative emotional influences.", flavor: "The still pond reflects the sky." },
    { id: 'minor_gen_2', name: 'Focused Hearing', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You can focus your hearing with the wind, picking up distant conversations.", flavor: "The wind carries whispers." },
    { id: 'minor_gen_3', name: 'Spiritual Resonance', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "You are more easily able to sense the presence of spirits nearby.", flavor: "A ripple in the unseen world." },
    { id: 'minor_gen_4', name: 'Echoes of the Past', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "When using Memory of the Air on an old object, you gain a faint impression of its previous owner.", flavor: "History lingers." },
    { id: 'minor_gen_5', name: 'Harmonious Aura', type: 'Minor', cost: 1, prerequisite: 'genesis', description: "Your presence naturally calms and soothes those around you, reducing tension and conflict.", flavor: "Aura of peace." },

    // Sub-Path A - Aspect of Inner Peace
    { id: 'a1_clarity_meditation', name: 'Clarity Meditation', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_1', description: "By attuning to air vibrations, you can pinpoint the location of any moving thing within a large radius.", flavor: "Listen to the world's breath." },
    { id: 'a1_minor_1', name: 'Resonant Echoes', type: 'Minor', cost: 1, prerequisite: 'a1_clarity_meditation', description: "You not only sense location, but also gain a vague impression of numbers and size.", flavor: "The echoes tell a story." },
    { id: 'a1_minor_2', name: 'Lingering Imprint', type: 'Minor', cost: 1, prerequisite: 'a1_clarity_meditation', description: "The sense of where things were remains in your mind for a few moments after you stop meditating.", flavor: "The air holds a memory." },

    { id: 'a2_memory_of_air', name: 'Memory of the Air', type: 'Manifestation', cost: 4, prerequisite: 'a1_clarity_meditation', description: "By breathing on an object, you can perceive psychic impressions and faint visions of significant events.", flavor: "The air remembers." },
    { id: 'a2_minor_1', name: 'Emotional Echo', type: 'Minor', cost: 1, prerequisite: 'a2_memory_of_air', description: "You gain a much clearer sense of the emotions tied to the memory.", flavor: "Feelings linger like perfume." },
    { id: 'a2_minor_2', name: 'Hallowed Ground', type: 'Minor', cost: 1, prerequisite: 'a2_memory_of_air', description: "When used in a place of strong spiritual power, your visions become clearer and can show events from much further in the past.", flavor: "The veil is thin here." },

    { id: 'a3_spirit_projection', name: 'Spirit Projection', type: 'Axiom', cost: 5, prerequisite: 'a2_memory_of_air', description: "Project your spirit out of your physical body. Your spirit is invisible and can travel freely.", flavor: "The spirit is not bound by flesh." },
    { id: 'a3_minor_1', name: 'Ethereal Cloak', type: 'Minor', cost: 1, prerequisite: 'a3_spirit_projection', description: "You learn to mask your spiritual presence, making you harder to detect by hostile or wary spirits.", flavor: "Become a whisper in the spirit world." },
    { id: 'a3_minor_2', name: 'Spirit Anchor', type: 'Minor', cost: 1, prerequisite: 'a3_spirit_projection', description: "You can create a spiritual 'beacon' on your physical body, making it easier to find your way back from distant spiritual locations.", flavor: "A light to guide you home." },

    // Sub-Path B - Aspect of Spirit Communion
    { id: 'b1_peaceful_presence', name: 'Peaceful Presence', type: 'Keystone', cost: 2, prerequisite: 'minor_gen_2', description: "You passively exude an aura of tranquility. Wild animals are not frightened by you, and neutral spirits are curious.", flavor: "A calm heart invites companionship." },
    { id: 'b1_minor_1', name: 'Voice of Calm', type: 'Minor', cost: 1, prerequisite: 'b1_peaceful_presence', description: "By speaking in a low, resonant tone, you can soothe panicked animals or de-escalate tensions.", flavor: "Words carried on a gentle breeze." },
    { id: 'b1_minor_2', name: 'Nature\'s Bond', type: 'Minor', cost: 1, prerequisite: 'b1_peaceful_presence', description: "This calming influence is particularly effective on creatures naturally attuned to the air, like Sky Bison or Flying Lemurs.", flavor: "A kinship with the sky-kin." },
    
    { id: 'b2_guiding_light', name: 'Guiding Light', type: 'Manifestation', cost: 4, prerequisite: 'b1_peaceful_presence', description: "Manifest your spiritual energy as a visible, gentle light that guides others and reveals corrupting influences.", flavor: "A light in the dark." },
    { id: 'b2_minor_1', name: 'Purifying Breath', type: 'Minor', cost: 1, prerequisite: 'b2_guiding_light', description: "By gently blowing your guiding light onto a person or small area, you can help cleanse them of negative spiritual energy.", flavor: "Exhale the darkness." },
    { id: 'b2_minor_2', name: 'Spirit Bridge', type: 'Minor', cost: 1, prerequisite: 'b2_guiding_light', description: "Spirits are more willing and able to communicate with you when you manifest your light.", flavor: "A beacon for the lost." },

    { id: 'b3_breath_of_kinship', name: 'Breath of Kinship', type: 'Axiom', cost: 5, prerequisite: 'b2_guiding_light', description: "Synchronize your breathing and chi with willing allies, creating a bond to feel their state and share stamina.", flavor: "We breathe as one." },
    { id: 'b3_minor_1', name: 'Unity of Purpose', type: 'Minor', cost: 1, prerequisite: 'b3_breath_of_kinship', description: "When bonded, you and your allies move with greater coordination, as if anticipating each other's actions.", flavor: "One mind, many bodies." },
    { id: 'b3_minor_2', name: 'Shared Sight', type: 'Minor', cost: 1, prerequisite: 'b3_breath_of_kinship', description: "For a brief moment, you can share what one bonded member sees with the others.", flavor: "See through another's eyes." },
];

const nodes: TalentNode[] = nodeDataList.map(d => {
    const prerequisites = d.prerequisite ? [d.prerequisite] : [];
    const getIcon = (name: string): string => {
        if (name.includes('Projection')) return '👻';
        if (name.includes('Kinship')) return '🤝';
        if (name.includes('Meditation')) return '🧘';
        if (name.includes('Light')) return '💡';
        if (name.includes('Memory')) return '📜';
        if (name.includes('Presence')) return '🕊️';
        if (d.type === 'Genesis') return '🙏';
        return '✨';
    };
    return {
        ...d,
        id: d.id,
        path: 'sacred_breath',
        constellation: 'air',
        position: { x: 0, y: 0 },
        prerequisites,
        visual: { color: '#E6E6FA', size: 50, icon: getIcon(d.name) },
        effects: [],
        isVisible: true,
        isAllocatable: !prerequisites.length,
        isAllocated: false,
        isLocked: !!prerequisites.length,
        isPermanentlyLocked: false,
        pkCost: d.cost,
        type: d.type as NodeType
    };
});

const connections: TalentConnection[] = [];
nodes.forEach(node => node.prerequisites.forEach(prereqId => {
    connections.push({ from: prereqId, to: node.id, isActive: false, isLocked: false });
}));

export const SACRED_BREATH_NODES = nodes;
export function generateSacredBreathConnections(): TalentConnection[] { return connections; }
export const SACRED_BREATH_METADATA = {
    name: 'The Sacred Breath',
    philosophy: 'Air connects all life. To master the breath is to feel the chi of the world and to see the unseen.',
    essence: 'Spiritual connection, sensing chi, meditation, non-combat support.',
    focus: 'Spiritual awareness and connection to the spirit world, inspired by Jinora and Yangchen.',
    sacredAnimal: 'The Sky Bison',
    emoji: '🐃',
    color: '#e6e6fa',
    position: { x: 900, y: 550 }
}; 