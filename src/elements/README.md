# Elements Folder Structure

This folder contains all element constellations for the talent tree system. Each element has its own subfolder with a consistent structure.

## Folder Structure

```
src/elements/
├── index.ts                    # Main export file for all elements
├── air/                        # Air constellation
│   ├── airTalentData.ts        # Main air talent data aggregator
│   ├── air_evasiveFlowPath.ts  # Evasive Flow path implementation
│   ├── air_spiritualHarmonyPath.ts # Spiritual Harmony path implementation
│   ├── air_tempestuousForcePath.ts # Tempestuous Force path implementation
│   └── air_soaringFreedomPath.ts # Soaring Freedom path implementation
├── water/                      # Water constellation (placeholder)
│   └── waterTalentData.ts      # Water talent data placeholder
├── earth/                      # Earth constellation (placeholder)
│   └── earthTalentData.ts      # Earth talent data placeholder
└── fire/                       # Fire constellation (placeholder)
    └── fireTalentData.ts       # Fire talent data placeholder
```

## Naming Conventions

### File Naming
- All path files must be prefixed with the element name: `{element}_{pathName}Path.ts`
- Example: `air_evasiveFlowPath.ts`, `water_flowingPath.ts`

### Export Naming
- All exports should be prefixed with the element name in uppercase: `{ELEMENT}_{EXPORT_NAME}`
- Example: `AIR_TALENT_NODES`, `WATER_CONSTELLATION`

### Path IDs
- All node IDs within a path should be prefixed with the element name: `{element}_{path}_{node}`
- Example: `air_evasive_flow_genesis`, `water_flowing_current_keystone`

## Adding New Elements

1. Create a new subfolder for the element (e.g., `src/elements/water/`)
2. Create the main talent data file: `{element}TalentData.ts`
3. Create individual path files with the `{element}_{pathName}Path.ts` naming convention
4. Update `src/elements/index.ts` to export the new element
5. Update `src/talentTreeManager.ts` if needed to support the new element

## Adding New Paths to Existing Elements

1. Create a new path file: `{element}_{pathName}Path.ts`
2. Follow the existing path structure and conventions
3. Update the main talent data file to import and include the new path
4. Ensure all node IDs are properly prefixed

## Current Status

- **Air**: Fully implemented with 4 paths
- **Water**: Placeholder ready for implementation
- **Earth**: Placeholder ready for implementation  
- **Fire**: Placeholder ready for implementation

## Import Usage

```typescript
// Import specific element
import { AIR_TALENT_NODES, generateAirConnections } from './elements';

// Import all elements
import { 
  AIR_TALENT_NODES, 
  WATER_TALENT_NODES, 
  EARTH_TALENT_NODES, 
  FIRE_TALENT_NODES 
} from './elements';
``` 