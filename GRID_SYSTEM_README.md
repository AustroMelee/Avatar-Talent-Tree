# Grid-Based Talent Tree System

## Overview

This is a simplified, grid-based talent tree system that replaces the complex canvas-based rendering with a straightforward HTML grid layout. The system is designed to be efficient, easy to understand, and maintainable.

## Architecture

### Core Components

1. **GridRenderer** (`src/gridRenderer.ts`)
   - Simple HTML grid-based rendering
   - CSS Grid for layout
   - Inline styling for visual effects
   - Tooltip system

2. **SimpleTalentManager** (`src/simpleTalentManager.ts`)
   - Core talent tree logic
   - Node allocation/deallocation
   - Prerequisite checking
   - State management

3. **Air Grid Data** (`src/airGridData.ts`)
   - Simplified air talent tree data
   - Grid-based positioning
   - Essential nodes only

### Key Features

- **Simple Grid Layout**: Uses CSS Grid for positioning nodes
- **Click to Allocate**: Click nodes to allocate/deallocate talents
- **Prerequisite System**: Nodes require prerequisites to be allocated
- **PK System**: Points of Knowing (PK) management
- **Visual Feedback**: Different colors and effects for node types
- **Tooltips**: Hover for node information

## Node Types

- **Genesis** (🌟): Starting nodes for each path
- **Keystone** (💎): Major abilities
- **Manifestation** (⚡): Powerful active abilities
- **Axiom** (🔮): Game-changing passives
- **Synthesis** (🔄): Hybrid abilities between paths

## Usage

1. **Allocate Nodes**: Click on available nodes to allocate them
2. **Deallocate Nodes**: Click on allocated nodes to deallocate (if no dependencies)
3. **Adjust PK**: Use the slider to change total available PK
4. **Reset Tree**: Click "Reset Tree" to clear all allocations

## File Structure

```
src/
├── gridRenderer.ts          # Grid-based rendering system
├── simpleTalentManager.ts   # Core talent tree logic
├── airGridData.ts          # Air talent tree data
├── main.ts                 # Application entry point
└── types/
    └── talent.types.ts     # Type definitions

styles/
└── grid.css               # Grid system styles

archive/
└── current-system/        # Archived complex system
```

## Benefits

- **Simplicity**: Much easier to understand and modify
- **Performance**: No complex canvas rendering
- **Maintainability**: Clear separation of concerns
- **Accessibility**: Standard HTML elements
- **Responsive**: Works on different screen sizes

## Migration from Complex System

The complex canvas-based system has been archived in `archive/current-system/` and includes:
- Canvas rendering components
- Force layout algorithms
- Complex animation systems
- Advanced UI components

The new system preserves all the core talent tree logic while simplifying the presentation layer.

## Future Enhancements

- Add more talent trees (Water, Earth, Fire, Steel)
- Implement save/load functionality
- Add preset builds
- Enhance visual effects
- Add sound effects
- Implement undo/redo system 