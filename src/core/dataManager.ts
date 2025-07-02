import type { TalentNode, ConstellationMetadata, TalentConnection } from '../types';
import type { PresetBuild } from '../types';
import { 
    getConstellation,
    AIR_TALENT_NODES, generateAirConnections,
    WATER_TALENT_NODES, generateWaterConnections,
    EARTH_TALENT_NODES, generateAllEarthConnections,
    FIRE_TALENT_NODES, generateFireConnections,
    STEEL_TALENT_NODES, generateAllSteelConnections
} from '../elements';
import { AIR_PRESETS } from '../elements/air/airPresets';
import { WATER_PRESETS } from '../elements/water/waterPresets';
import { EARTH_PRESETS } from '../elements/earth/earthPresets';
import { FIRE_PRESETS } from '../elements/fire/firePresets';
import { STEEL_PRESETS } from '../elements/steel/steelPresets';

/**
 * Complete data structure for an elemental constellation including nodes, connections, presets, and metadata.
 * Used by the data manager to provide unified access to all element-specific talent tree data.
 */
export type ElementalData = {
    /** All talent nodes for this element */
    nodes: TalentNode[];
    /** All connections between talent nodes */
    connections: TalentConnection[];
    /** Pre-built talent tree configurations */
    presets: PresetBuild[];
    /** Static metadata describing the constellation */
    constellation: ConstellationMetadata;
};

/**
 * Manages loading and providing access to elemental talent tree data.
 * Centralizes data access patterns and provides error handling for missing elements.
 */
export class DataManager {
    /**
     * Loads complete talent tree data for a specific element.
     * Returns null if the element is not supported or data is missing.
     * 
     * @param elementId - The elemental constellation identifier (e.g., 'air', 'fire')
     * @returns Complete elemental data or null if not found
     */
    public loadElementalData(elementId: string): ElementalData | null {
        let talentNodes: TalentNode[] = [];
        let connections: TalentConnection[] = [];
        let presets: PresetBuild[] = [];

        switch (elementId) {
            case 'air':
                talentNodes = AIR_TALENT_NODES;
                connections = generateAirConnections();
                presets = AIR_PRESETS;
                break;
            case 'water':
                talentNodes = WATER_TALENT_NODES;
                connections = generateWaterConnections();
                presets = WATER_PRESETS;
                break;
            case 'earth':
                talentNodes = EARTH_TALENT_NODES;
                connections = generateAllEarthConnections();
                presets = EARTH_PRESETS;
                break;
            case 'fire':
                talentNodes = FIRE_TALENT_NODES;
                connections = generateFireConnections();
                presets = FIRE_PRESETS;
                break;
            case 'steel':
                talentNodes = STEEL_TALENT_NODES;
                connections = generateAllSteelConnections();
                presets = STEEL_PRESETS;
                break;
            default:
                console.error(`Unknown element: ${elementId}`);
                return null;
        }

        const constellation = getConstellation(elementId);
        if (!constellation) {
            console.error(`Constellation metadata not found for element: ${elementId}`);
            return null;
        }

        return { nodes: talentNodes, connections, presets, constellation };
    }
} 