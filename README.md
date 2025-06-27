# The Argent Codex: Theorycrafter's Utopia

An interactive talent tree visualization inspired by Path of Exile and the Argent Codex, featuring a sophisticated point allocation system with philosophical depth across four elemental constellations.

## Features

### 🌪️ Complete Elemental Constellation System
- **Air - The Four Winds**: Balance, freedom, adaptation, and transcendence through 4 distinct philosophical paths
- **🔥 Fire - The Eternal Flame**: The eternal dance between creation and destruction, passion and discipline, life and death
- **🌊 Water - The Depths Eternal**: The eternal dance between creation and destruction, memory and forgetting through 4 profound philosophical currents
- **🏔️ Earth - The Four Pillars of Stone**: The eternal dance between substance and spirit, rooted in four fundamental earthbending philosophies

### 🎯 Interactive Elemental Switching
- Click the elemental emoji buttons in the header to switch between constellations
- Each element has its own unique talent tree with complete node systems
- UI updates dynamically to reflect the current elemental theme
- Constellation information displays the philosophy and paths of each element
- Real-time theme switching with smooth transitions

### 📊 Argent Codex Mechanics
- **51 Points of Knowing (PK)** total allocation across constellation
- **Genesis Nodes**: Entry points for each path (1 PK)
- **Minor Nodes**: Small incremental bonuses (1 PK)
- **Keystone Nodes**: Milestone abilities (2 PK)
- **Manifestation Nodes**: Active abilities (4 PK)
- **Axiom Nodes**: Peak passives (5 PK)
- **GnosticRite Nodes**: Tests of worthiness (1 PK)
- **Capstone Nodes**: Path finishers (15 PK)
- **Schism Nodes**: Heretical high-risk nodes (8-12 PK)
- **Bridge Nodes**: Cross-path connections (10 PK)
- **Synthesis Nodes**: Hybrid abilities (5 PK)

### 🎮 Interactive Features
- **Drag to Pan**: Click and drag to move around the talent tree
- **Mouse Wheel Zoom**: Scroll to zoom in/out with smooth scaling
- **Node Allocation**: Click nodes to allocate/deallocate points with visual feedback
- **Tooltips**: Hover over nodes for detailed information and lore
- **Build Summary**: Real-time tracking of allocated points and nodes with interactive list
- **Reset Button**: Clear all allocations and start fresh
- **Zoom Controls**: Dedicated zoom in/out buttons for precise control
- **Node Focus**: Click on allocated nodes in the build summary to focus the view

### 🎨 Visual Design
- Dark theme optimized for long theorycrafting sessions
- Elemental color coding for each constellation
- Smooth animations and visual feedback for all interactions
- Responsive design that works on different screen sizes
- Custom SVG icons for different node types
- Visual effects for node allocation and state changes

## Elemental Constellations

### 🌪️ Air - The Four Winds
- **The Gentle Breeze (微風)**: Evasion, misdirection, defensive mastery, turning force aside
- **The Sacred Breath (聖息)**: Meditation, spiritual sight, healing, communion with spirits
- **The Wild Gale (狂風)**: Offensive techniques, storm mastery, overwhelming force
- **The Dancing Wind (舞風)**: Mobility, flight, acrobatics, the pure joy of being airborne

### 🔥 Fire - The Eternal Flame
- **The Forge of Wrath**: Destruction Incarnate - Unbridled destruction, consuming rage, the cleansing fire that reduces all to ash
- **The Sacred Hearth**: Life's First Spark - Healing flames, spiritual fire, the life-giving warmth of the sun
- **The Master's Flame**: Discipline Made Manifest - Perfect technique, shaped fire, defensive mastery
- **The Lightning's Edge**: The Void Between Thoughts - Lightning generation, mental discipline, cold fire techniques

### 🌊 Water - The Depths Eternal
- **The Endless Mirror**: Reflections of What Was - Adaptation through wisdom, learning from every encounter, becoming stronger through understanding
- **The Crimson Tide**: Blood Calls to Blood - Life manipulation, healing mastery, forbidden blood arts
- **The Eternal Prison**: What Ice Remembers - Preservation, patience, unstoppable force through immutable will
- **The Hungry Deep**: Pressure of the Abyss - Overwhelming force, pressure mastery, the ocean's consuming nature

### 🏔️ Earth - The Four Pillars of Stone
- **The Pillar of Hun Yuan (Neutral Jing)**: The Waiting Stone - Defensive mastery, seismic awareness, perfect timing, counter-attacks
- **The Pillar of Bian Hua (Transformation)**: The Changing Earth - Sub-bending mastery, material transformation, elemental fusion
- **The Pillar of Gang Qiang (Unyielding Strength)**: The Eternal Mountain - Raw power, overwhelming force, immovable defense, brutal offense
- **The Pillar of Jing Que (Precision Control)**: The Sculptor's Mind - Fine control, enemy manipulation, architectural bending, artistic mastery

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd talent-tree-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Verify setup**
   ```bash
   npm run verify
   ```

## Project Structure

```
talent-tree-project/
├── src/
│   ├── elements/               # Elemental constellation data
│   │   ├── air/               # Air constellation (fully implemented)
│   │   ├── fire/              # Fire constellation (fully implemented)
│   │   ├── water/             # Water constellation (fully implemented)
│   │   ├── earth/             # Earth constellation (fully implemented)
│   │   └── index.ts           # Central export for all elements
│   ├── main.ts                # Main application entry point
│   ├── talentTreeManager.ts   # State management and logic
│   ├── talentTreeRenderer.ts  # Canvas rendering system
│   ├── assetManager.ts        # Asset loading and management
│   ├── types.ts               # TypeScript type definitions
│   └── talentPathLayoutHelpers.ts # Layout calculation utilities
├── assets/
│   └── images/                # SVG icons and visual assets
├── docs/                      # Comprehensive build guides for each element
├── scripts/                   # Development and testing utilities
└── style.css                  # Main stylesheet
```

## Development Status

### ✅ Completed
- **Complete Air Constellation**: All 4 paths fully implemented with comprehensive node systems
- **Complete Fire Constellation**: All 4 paths fully implemented with detailed talent trees
- **Complete Water Constellation**: All 4 paths fully implemented with philosophical depth
- **Complete Earth Constellation**: All 4 paths fully implemented with traditional earthbending concepts
- **Interactive UI**: Full elemental switching with dynamic theme updates
- **Canvas Rendering**: Smooth, responsive talent tree visualization
- **State Management**: Robust point allocation and tree state tracking
- **Asset System**: SVG icon management and loading
- **Build Summary**: Interactive list of allocated nodes with tooltips
- **Documentation**: Comprehensive build guides for all four elements

### 🚧 In Progress
- Advanced connection logic optimizations
- Performance improvements for large talent trees
- Enhanced visual effects and animations

### 📋 Planned
- Cross-elemental covenants and synergies
- Advanced build sharing and export features
- Mobile optimization and touch controls
- Build import/export functionality
- Advanced filtering and search capabilities

## Documentation

Each elemental constellation has a comprehensive build guide in the `docs/` folder:

- [Air Constellation Build Guide](docs/AIR_CONSTELLATION_BUILD_GUIDE.md)
- [Fire Constellation Build Guide](docs/FIRE_CONSTELLATION_BUILD_GUIDE.md)
- [Water Constellation Build Guide](docs/WATER_CONSTELLATION_BUILD_GUIDE.md)
- [Earth Constellation Build Guide](docs/EARTH_CONSTELLATION_BUILD_GUIDE.md)

## Contributing

This project follows the AI-Agentic Cursor Context guidelines for LLM-friendly code:

- **File Structure**: No file exceeds 500 lines, each represents one clear concept
- **TypeScript Practices**: Prefer `type` aliases, avoid complex generics
- **Function Design**: Use `verbNoun` naming, explicit return types
- **Naming & Semantics**: Human-readable names, extract magic values
- **Comments & Documentation**: Comprehensive doc comments for all exports
- **Error Handling**: Contextual error messages, no empty catch blocks

## Technical Stack

- **Frontend**: TypeScript, Vite, Canvas API
- **Styling**: CSS Custom Properties, responsive design
- **Build Tools**: Vite, TypeScript compiler
- **Development**: ESLint, Prettier, PostCSS
- **Testing**: Vitest (configured but not yet implemented)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
