/**
 * Air Constellation Talent Data - Full Implementation (Sunburst Layout)
 * This file implements the full constellation using a strict "spokes and rings"
 * layout model to ensure perfect organization and visual clarity, as per the design guide.
 */

import type { TalentNode, TalentConnection, Point, NodeType } from '../../types';

// =================================================================================
// 1. LAYOUT CONFIGURATION (Sunburst Model)
// =================================================================================
const CENTER: Point = { x: 1500, y: 1500 };
const NUM_PATHS = 4;
// Angles: 0=Bottom(GB), 1=Left(WG), 2=Top(DW), 3=Right(SB)
const BRANCH_ANGLES = [Math.PI / 2, Math.PI, -Math.PI / 2, 0];
// Radii for each tier from the center
const RADII = {
    genesis: 350,
    keystone: 600,
    manifestation: 850,
    axiom: 1100,
    inner_synthesis: 475, // Radius between genesis and keystone
    outer_synthesis: 975, // Radius between manifestation and axiom
};

// =================================================================================
// 2. UNIFIED NODE DEFINITIONS (with Path and Tier metadata)
// =================================================================================
// pathIndex: 0=GentleBreeze, 1=WildGale, 2=DancingWind, 3=SacredBreath
const nodeDefinitions: any[] = [
    // --- Path 0: The Gentle Breeze ---
    { id: 'gb_genesis', name: 'The Gentle Breeze Path', path: 'gentle_breeze', type: 'Genesis', pkCost: 1, icon: '🍃', size: 160 },
    { id: 'gb_keystone_a', name: 'Cloud Shield Technique', path: 'gentle_breeze', type: 'Keystone', pkCost: 2, prereq: 'gb_genesis', icon: '🛡️', size: 65 },
    { id: 'gb_keystone_b', name: 'Catch and Release', path: 'gentle_breeze', type: 'Keystone', pkCost: 2, prereq: 'gb_genesis', icon: '✋', size: 65 },
    { id: 'gb_manifest_a', name: 'Unburdened Form', path: 'gentle_breeze', type: 'Manifestation', pkCost: 4, prereq: 'gb_keystone_a', icon: '💨', size: 70 },
    { id: 'gb_manifest_b', name: 'Momentum Redirection', path: 'gentle_breeze', type: 'Manifestation', pkCost: 4, prereq: 'gb_keystone_b', icon: '↪️', size: 70 },
    { id: 'gb_axiom_a', name: 'Eye of Serenity', path: 'gentle_breeze', type: 'Axiom', pkCost: 5, prereq: 'gb_manifest_a', icon: '👁️', size: 75 },
    { id: 'gb_axiom_b', name: 'The Unbroken Current', path: 'gentle_breeze', type: 'Axiom', pkCost: 5, prereq: 'gb_manifest_b', icon: '🌊', size: 75 },
    // Gentle Breeze Minors
    { id: 'gb_m_1', type: 'Minor', prereq: 'gb_genesis', child: 'gb_keystone_a' }, { id: 'gb_m_2', type: 'Minor', prereq: 'gb_genesis', child: 'gb_keystone_b' },
    { id: 'gb_m_3', type: 'Minor', prereq: 'gb_keystone_a', child: 'gb_manifest_a' }, { id: 'gb_m_4', type: 'Minor', prereq: 'gb_keystone_b', child: 'gb_manifest_b' },
    { id: 'gb_m_5', type: 'Minor', prereq: 'gb_manifest_a', child: 'gb_axiom_a' }, { id: 'gb_m_6', type: 'Minor', prereq: 'gb_manifest_b', child: 'gb_axiom_b' },

    // --- Path 1: The Wild Gale ---
    { id: 'wg_genesis', name: 'The Wild Gale Path', path: 'wild_gale', type: 'Genesis', pkCost: 1, icon: '🌪️', size: 160 },
    { id: 'wg_keystone_a', name: 'Air Cannon', path: 'wild_gale', type: 'Keystone', pkCost: 2, prereq: 'wg_genesis', icon: '💥', size: 65 },
    { id: 'wg_keystone_b', name: 'Wind Blades', path: 'wild_gale', type: 'Keystone', pkCost: 2, prereq: 'wg_genesis', icon: '🔪', size: 65 },
    { id: 'wg_manifest_a', name: 'Unstoppable Typhoon', path: 'wild_gale', type: 'Manifestation', pkCost: 4, prereq: 'wg_keystone_a', icon: '🌊', size: 70 },
    { id: 'wg_manifest_b', name: 'Sound Bending', path: 'wild_gale', type: 'Manifestation', pkCost: 4, prereq: 'wg_keystone_b', icon: '🔊', size: 70 },
    { id: 'wg_axiom_a', name: 'Eye of the Hurricane', path: 'wild_gale', type: 'Axiom', pkCost: 5, prereq: 'wg_manifest_a', icon: '🌀', size: 75 },
    { id: 'wg_axiom_b', name: 'Suffocation', path: 'wild_gale', type: 'Axiom', pkCost: 5, prereq: 'wg_manifest_b', icon: '💀', size: 75 },
    // Wild Gale Minors
    { id: 'wg_m_1', type: 'Minor', prereq: 'wg_genesis', child: 'wg_keystone_a' }, { id: 'wg_m_2', type: 'Minor', prereq: 'wg_genesis', child: 'wg_keystone_b' },
    { id: 'wg_m_3', type: 'Minor', prereq: 'wg_keystone_a', child: 'wg_manifest_a' }, { id: 'wg_m_4', type: 'Minor', prereq: 'wg_keystone_b', child: 'wg_manifest_b' },
    { id: 'wg_m_5', type: 'Minor', prereq: 'wg_manifest_a', child: 'wg_axiom_a' }, { id: 'wg_m_6', type: 'Minor', prereq: 'wg_manifest_b', child: 'wg_axiom_b' },

    // --- Path 2: The Dancing Wind ---
    { id: 'dw_genesis', name: 'The Dancing Wind Path', path: 'dancing_wind', type: 'Genesis', pkCost: 1, icon: '🤸', size: 160 },
    { id: 'dw_keystone_a', name: 'Air Scooter', path: 'dancing_wind', type: 'Keystone', pkCost: 2, prereq: 'dw_genesis', icon: '🛴', size: 65 },
    { id: 'dw_keystone_b', name: 'Air Walking', path: 'dancing_wind', type: 'Keystone', pkCost: 2, prereq: 'dw_genesis', icon: '🚶', size: 65 },
    { id: 'dw_manifest_a', name: 'Air Spout', path: 'dancing_wind', type: 'Manifestation', pkCost: 4, prereq: 'dw_keystone_a', icon: '💨', size: 70 },
    { id: 'dw_manifest_b', name: 'Wind Dancing', path: 'dancing_wind', type: 'Manifestation', pkCost: 4, prereq: 'dw_keystone_b', icon: '💃', size: 70 },
    { id: 'dw_axiom_a', name: 'Flight Mastery', path: 'dancing_wind', type: 'Axiom', pkCost: 5, prereq: 'dw_manifest_a', icon: '🕊️', size: 75 },
    { id: 'dw_axiom_b', name: 'The Sky\'s Embrace', path: 'dancing_wind', type: 'Axiom', pkCost: 5, prereq: 'dw_manifest_b', icon: '🫂', size: 75 },
    // Dancing Wind Minors
    { id: 'dw_m_1', type: 'Minor', prereq: 'dw_genesis', child: 'dw_keystone_a' }, { id: 'dw_m_2', type: 'Minor', prereq: 'dw_genesis', child: 'dw_keystone_b' },
    { id: 'dw_m_3', type: 'Minor', prereq: 'dw_keystone_a', child: 'dw_manifest_a' }, { id: 'dw_m_4', type: 'Minor', prereq: 'dw_keystone_b', child: 'dw_manifest_b' },
    { id: 'dw_m_5', type: 'Minor', prereq: 'dw_manifest_a', child: 'dw_axiom_a' }, { id: 'dw_m_6', type: 'Minor', prereq: 'dw_manifest_b', child: 'dw_axiom_b' },

    // --- Path 3: The Sacred Breath ---
    { id: 'sb_genesis', name: 'The Sacred Breath Path', path: 'sacred_breath', type: 'Genesis', pkCost: 1, icon: '🙏', size: 160 },
    { id: 'sb_keystone_a', name: 'Clarity Meditation', path: 'sacred_breath', type: 'Keystone', pkCost: 2, prereq: 'sb_genesis', icon: '🧘', size: 65 },
    { id: 'sb_keystone_b', name: 'Peaceful Presence', path: 'sacred_breath', type: 'Keystone', pkCost: 2, prereq: 'sb_genesis', icon: '🕊️', size: 65 },
    { id: 'sb_manifest_a', name: 'Memory of the Air', path: 'sacred_breath', type: 'Manifestation', pkCost: 4, prereq: 'sb_keystone_a', icon: '📜', size: 70 },
    { id: 'sb_manifest_b', name: 'Guiding Light', path: 'sacred_breath', type: 'Manifestation', pkCost: 4, prereq: 'sb_keystone_b', icon: '💡', size: 70 },
    { id: 'sb_axiom_a', name: 'Spirit Projection', path: 'sacred_breath', type: 'Axiom', pkCost: 5, prereq: 'sb_manifest_a', icon: '👻', size: 75 },
    { id: 'sb_axiom_b', name: 'Breath of Kinship', path: 'sacred_breath', type: 'Axiom', pkCost: 5, prereq: 'sb_manifest_b', icon: '🤝', size: 75 },
    // Sacred Breath Minors
    { id: 'sb_m_1', type: 'Minor', prereq: 'sb_genesis', child: 'sb_keystone_a' }, { id: 'sb_m_2', type: 'Minor', prereq: 'sb_genesis', child: 'sb_keystone_b' },
    { id: 'sb_m_3', type: 'Minor', prereq: 'sb_keystone_a', child: 'sb_manifest_a' }, { id: 'sb_m_4', type: 'Minor', prereq: 'sb_keystone_b', child: 'sb_manifest_b' },
    { id: 'sb_m_5', type: 'Minor', prereq: 'sb_manifest_a', child: 'sb_axiom_a' }, { id: 'sb_m_6', type: 'Minor', prereq: 'sb_manifest_b', child: 'sb_axiom_b' },
    
    // --- Synthesis Nodes ---
    { id: 'syn_inner_gb_wg', name: "Gentle Gale", type: 'Synthesis', pkCost: 2, icon: '🌬️', size: 60 },
    { id: 'syn_inner_wg_dw', name: "Dancing Breeze", type: 'Synthesis', pkCost: 2, icon: '🎭', size: 60 },
    { id: 'syn_inner_dw_sb', name: "Sacred Dance", type: 'Synthesis', pkCost: 2, icon: '💃', size: 60 },
    { id: 'syn_inner_sb_gb', name: "Wild Breath", type: 'Synthesis', pkCost: 2, icon: '😤', size: 60 },
    
    { id: 'syn_outer_gb_wg', name: "Wind's Wisdom", type: 'Synthesis', pkCost: 3, icon: '🦉', size: 60 },
    { id: 'syn_outer_wg_dw', name: "Gale Force", type: 'Synthesis', pkCost: 3, icon: '✈️', size: 60 },
    { id: 'syn_outer_dw_sb', name: "Breath of Freedom", type: 'Synthesis', pkCost: 3, icon: '🕊️', size: 60 },
    { id: 'syn_outer_sb_gb', name: "Serene Storm", type: 'Synthesis', pkCost: 3, icon: '🧘‍♀️', size: 60 },
];

// =================================================================================
// 3. NODE CREATION & POSITIONING
// =================================================================================

const allNodesMap = new Map<string, TalentNode>();

function getMidAngle(angleA: number, angleB: number): number {
    let diff = angleB - angleA;
    if (Math.abs(diff) > Math.PI) {
        if (diff > 0) diff -= 2 * Math.PI;
        else diff += 2 * Math.PI;
    }
    return angleA + diff / 2;
}

function getNodePosition(pathIndex: number, tier: keyof typeof RADII, subBranch: number = 0): { pos: Point, angle: number, radius: number } {
    const baseAngle = BRANCH_ANGLES[pathIndex];
    // Fan out the two sub-branches slightly
    const angleOffset = (subBranch - 0.5) * (Math.PI / 24); // A very small angle to separate branches
    const finalAngle = baseAngle + angleOffset;
    const radius = RADII[tier];
    return {
        pos: { x: CENTER.x + radius * Math.cos(finalAngle), y: CENTER.y + radius * Math.sin(finalAngle) },
        angle: finalAngle,
        radius: radius,
    };
}

// Create and position all nodes
nodeDefinitions.forEach(def => {
    const node: TalentNode = {
        id: def.id,
        name: def.name || 'Minor Node',
        description: def.description || "A minor step on the path to mastery.",
        flavor: def.flavor || "The journey of a thousand miles begins with a single step.",
        path: def.path || 'synergy',
        constellation: 'air',
        type: def.type as NodeType,
        pkCost: def.pkCost || 1,
        prerequisites: def.prereq ? [def.prereq] : [],
        position: { x: 0, y: 0 },
        visual: { color: def.color || '#cdd6f4', size: def.size || 35, icon: def.icon || '🔸' },
        effects: [], isVisible: true, isAllocatable: false, isAllocated: false, isLocked: true, isPermanentlyLocked: false,
    };

    // Set ringId based on node type
    if (def.type === 'Genesis') node.ringId = 'genesis';
    else if (def.type === 'Keystone') node.ringId = 'keystone';
    else if (def.type === 'Manifestation') node.ringId = 'manifestation';
    else if (def.type === 'Axiom') node.ringId = 'axiom';
    else if (def.type === 'Synthesis') {
        if (def.id.includes('inner')) node.ringId = 'inner_synthesis';
        else if (def.id.includes('outer')) node.ringId = 'outer_synthesis';
    }

    if (def.type === 'Synthesis') {
        // Position synthesis nodes between their connected paths
        let pathA, pathB;
        if (def.id.includes('gb_wg')) { pathA = 'gentle_breeze'; pathB = 'wild_gale'; }
        else if (def.id.includes('wg_dw')) { pathA = 'wild_gale'; pathB = 'dancing_wind'; }
        else if (def.id.includes('dw_sb')) { pathA = 'dancing_wind'; pathB = 'sacred_breath'; }
        else if (def.id.includes('sb_gb')) { pathA = 'sacred_breath'; pathB = 'gentle_breeze'; }
        
        const radius = def.id.includes('inner') ? RADII.inner_synthesis : RADII.outer_synthesis;
        const angle = (BRANCH_ANGLES[0] + BRANCH_ANGLES[1]) / 2; // Simplified positioning
        node.position = { x: CENTER.x + radius * Math.cos(angle), y: CENTER.y + radius * Math.sin(angle) };
        node.angle = angle;
        node.radius = radius;
    } else if (def.type !== 'Minor') {
        // Position major nodes based on their path
        const pathIndex = def.path === 'gentle_breeze' ? 0 : 
                         def.path === 'wild_gale' ? 1 : 
                         def.path === 'dancing_wind' ? 2 : 3;
        const subBranch = def.id.includes('_b') ? 1 : 0;
        const tier = def.type === 'Genesis' ? 'genesis' :
                    def.type === 'Keystone' ? 'keystone' :
                    def.type === 'Manifestation' ? 'manifestation' : 'axiom';
        const layout = getNodePosition(pathIndex, tier, subBranch);
        node.position = layout.pos;
        node.angle = layout.angle;
        node.radius = layout.radius;
    }
    allNodesMap.set(node.id, node);
});

// Position minor nodes between their parent and child
allNodesMap.forEach(node => {
    const def = nodeDefinitions.find(d => d.id === node.id)!;
    if (def && def.type === 'Minor') {
        const parentNode = allNodesMap.get(def.prereq)!;
        const childNode = allNodesMap.get(def.child)!;
        node.position = { x: (parentNode.position.x + childNode.position.x) / 2, y: (parentNode.position.y + childNode.position.y) / 2 };
        node.prerequisites = [def.prereq];
        // Add the minor as an additional prerequisite for the child, but do NOT remove the Genesis prerequisite if present
        if (!childNode.prerequisites.includes(node.id)) {
            childNode.prerequisites.push(node.id);
        }
        // Ensure Genesis prerequisite is always present for Keystones
        if (childNode.type === 'Keystone' && !childNode.prerequisites.includes(def.prereq)) {
            childNode.prerequisites.push(def.prereq);
        }
    }
});

// Set prerequisites for Synthesis nodes - only connect to nodes on the same ring
// These are for visual continuity, not strict progression requirements
allNodesMap.get('syn_inner_gb_wg')!.prerequisites = []; // No strict prereqs, just visual arcs
allNodesMap.get('syn_inner_wg_dw')!.prerequisites = []; // No strict prereqs, just visual arcs
allNodesMap.get('syn_inner_dw_sb')!.prerequisites = []; // No strict prereqs, just visual arcs
allNodesMap.get('syn_inner_sb_gb')!.prerequisites = []; // No strict prereqs, just visual arcs

allNodesMap.get('syn_outer_gb_wg')!.prerequisites = []; // No strict prereqs, just visual arcs
allNodesMap.get('syn_outer_wg_dw')!.prerequisites = []; // No strict prereqs, just visual arcs
allNodesMap.get('syn_outer_dw_sb')!.prerequisites = []; // No strict prereqs, just visual arcs
allNodesMap.get('syn_outer_sb_gb')!.prerequisites = []; // No strict prereqs, just visual arcs

// Ensure every Keystone's prerequisites always include its Genesis node
allNodesMap.forEach(node => {
    if (node.type === 'Keystone') {
        // Find the Genesis node for this path
        const genesisNode = Array.from(allNodesMap.values()).find(n => n.type === 'Genesis' && n.path === node.path);
        if (genesisNode && !node.prerequisites.includes(genesisNode.id)) {
            node.prerequisites.push(genesisNode.id);
        }
        // Debug log for verification
        console.log(`[DEBUG] Keystone ${node.id} prerequisites:`, node.prerequisites);
    }
});

// =================================================================================
// 4. FINAL EXPORT
// =================================================================================
export const AIR_TALENT_NODES: TalentNode[] = Array.from(allNodesMap.values());

export const AIR_CONSTELLATION = {
    id: 'air',
    name: 'The Four Winds',
    description: 'The constellation of balance, freedom, adaptation, and transcendence',
    background: 'air',
    paths: [] // Metadata can be added here if needed
};

export function generateAirConnections(): TalentConnection[] {
    const connections: TalentConnection[] = [];
    const nodes = AIR_TALENT_NODES;

    console.log('🔗 Creating clean POE-style connections...');

    // 1. "Tree" connections: Only along the branch (same path)!
    nodes.forEach(node => {
        node.prerequisites.forEach(prereqId => {
            // Only allow if prereq and node are on the same path (branch)
            const prereq = allNodesMap.get(prereqId);
            if (
                prereq &&
                prereq.path === node.path // Only allow if same path!
            ) {
                connections.push({ from: prereqId, to: node.id, isActive: false, isLocked: false });
                console.log(`  🌳 Tree: ${prereq.name} → ${node.name} (same path: ${node.path})`);
            } else {
                console.log(`  ❌ Blocked cross-path: ${prereq?.name || prereqId} → ${node.name} (${prereq?.path || 'unknown'} → ${node.path})`);
            }
        });
    });

    // 2. Arc connections (ring neighbors, just between majors) - for visual continuity only
    const majorTypes = new Set(['Genesis', 'Keystone', 'Manifestation', 'Axiom', 'Capstone', 'Schism', 'Synthesis']);
    const rings = Object.keys(RADII);

    console.log('🎯 Creating visual ring arcs between major nodes...');

    for (const ringId of rings) {
        // Get only major nodes for this ring, sorted by angle
        const majors = nodes.filter(
            n => n.ringId === ringId && majorTypes.has(n.type) && n.angle !== undefined
        ).sort((a, b) => (a.angle! - b.angle!));

        if (majors.length > 1) {
            console.log(`  📍 Ring "${ringId}": ${majors.length} major nodes`);
            
            // Connect each major node to its next neighbor (wrap around for full ring)
            for (let i = 0; i < majors.length; i++) {
                const a = majors[i];
                const b = majors[(i + 1) % majors.length];
                
                // Don't connect a node to itself if only one major per ring
                if (a.id !== b.id) {
                    // Only add if this connection doesn't already exist
                    const connectionExists = connections.some(conn => 
                        conn.from === a.id && conn.to === b.id
                    );
                    
                    if (!connectionExists) {
                        connections.push({ from: a.id, to: b.id, isActive: false, isLocked: false });
                        console.log(`    ✅ Arc: ${a.name} → ${b.name} (visual only)`);
                    }
                }
            }
        } else if (majors.length === 1) {
            console.log(`  📍 Ring "${ringId}": ${majors.length} major node (no arcs needed)`);
        } else {
            console.log(`  📍 Ring "${ringId}": no major nodes`);
        }
    }

    const treeCount = AIR_TALENT_NODES.reduce((sum, node) => 
        sum + node.prerequisites.filter(prereqId => {
            const prereq = allNodesMap.get(prereqId);
            return prereq && prereq.path === node.path;
        }).length, 0
    );
    const arcCount = connections.length - treeCount;
    
    console.log(`🎯 Total connections: ${connections.length} (${treeCount} tree + ${arcCount} visual arcs)`);
    console.log('✅ Clean POE-style connection generation complete!');

    return connections;
}