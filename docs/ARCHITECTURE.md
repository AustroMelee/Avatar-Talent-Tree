# Talent Tree System Architecture

## Overview

The talent tree system has been refactored into a modular, maintainable architecture following the single responsibility principle and dependency injection patterns. This document outlines the new structure and design principles.

## Architecture Layers

### 1. Data Layer (`src/types/`, `src/elements/`)
**Purpose**: Pure data structures, types, and element definitions
**Responsibilities**:
- Type definitions and interfaces
- Element metadata and node data
- Preset configurations
- No business logic or rendering code

**Key Files**:
- `types/` - All TypeScript interfaces and types
- `elements/elementRegistry.ts` - Centralized element exports
- `elements/*/` - Element-specific data files

### 2. Core Logic Layer (`src/core/`)
**Purpose**: Business logic, state management, and data processing
**Responsibilities**:
- State management and updates
- Point allocation rules
- Preset management
- Data validation and processing

**Key Files**:
- `constants.ts` - Centralized configuration constants
- `errors.ts` - Custom error classes and error handling
- `appController.ts` - Main application controller
- `dataManager.ts` - Data loading and management
- `stateFactory.ts` - State creation and management

### 3. Rendering Layer (`src/rendering/`)
**Purpose**: Canvas rendering and visual effects
**Responsibilities**:
- Canvas setup and management
- Node and connection drawing
- Animation and visual effects
- Icon management

**Key Files**:
- `CanvasManager.ts` - Canvas operations and transforms
- `NodeRenderer.ts` - Node drawing and styling
- `ConnectionRenderer.ts` - Connection drawing
- `AnimationManager.ts` - Visual effects and animations
- `iconManager.ts` - Icon rendering and caching
- `nodeStyler.ts` - Node visual styling
- `connectionStyler.ts` - Connection visual styling

### 4. UI Layer (`src/ui/`)
**Purpose**: User interactions and interface management
**Responsibilities**:
- Event handling
- User input processing
- UI state management
- Display coordination

**Key Files**:
- `uiManager.ts` - UI state and interaction management

## Dependency Flow

```
Data Layer → Core Logic Layer → Rendering Layer → UI Layer
     ↑              ↑              ↑              ↑
   Types        State Mgmt     Canvas Ops    User Input
   Elements     Business       Drawing       Events
   Presets      Logic          Effects       Display
```

**Rules**:
- Higher layers can import from lower layers
- Lower layers cannot import from higher layers
- No circular dependencies allowed
- Each layer has a single, well-defined responsibility

## Key Design Principles

### 1. Single Responsibility Principle
Each class and module has one clear purpose:
- `CanvasManager` - Only handles canvas operations
- `NodeRenderer` - Only draws nodes
- `ConnectionRenderer` - Only draws connections
- `AnimationManager` - Only manages visual effects

### 2. Dependency Injection
Components receive their dependencies through constructors:
```typescript
class TalentTreeRenderer {
  constructor(
    private canvasManager: CanvasManager,
    private nodeRenderer: NodeRenderer,
    private connectionRenderer: ConnectionRenderer,
    private animationManager: AnimationManager
  ) {}
}
```

### 3. Error Handling
Structured error handling with custom error classes:
- `TalentTreeError` - Base error class
- `RenderError` - Rendering-specific errors
- `NodeError` - Node operation errors
- `ConnectionError` - Connection errors
- Consistent logging and error reporting

### 4. Constants Management
All magic numbers and configuration values centralized in `constants.ts`:
- Rendering constants (sizes, colors, timing)
- UI constants (zoom limits, interaction settings)
- Game constants (point costs, node types)
- Error message templates

## File Organization

### Rendering Components
```
src/rendering/
├── CanvasManager.ts      # Canvas setup and transforms
├── NodeRenderer.ts       # Node drawing
├── ConnectionRenderer.ts # Connection drawing
├── AnimationManager.ts   # Visual effects
├── iconManager.ts        # Icon management
├── nodeStyler.ts         # Node styling
├── connectionStyler.ts   # Connection styling
├── canvasUtils.ts        # Canvas utility functions
└── animationUtils.ts     # Animation utility functions
```

### Core Components
```
src/core/
├── constants.ts          # Centralized constants
├── errors.ts            # Error classes and handling
├── appController.ts     # Main application controller
├── dataManager.ts       # Data management
├── eventHandler.ts      # Event processing
├── nodeStateCalculator.ts # Node state logic
└── stateFactory.ts      # State creation
```

### Element Organization
```
src/elements/
├── elementRegistry.ts   # Centralized exports
├── index.ts            # Legacy exports (deprecated)
├── air/                # Air element data
├── earth/              # Earth element data
├── fire/               # Fire element data
├── water/              # Water element data
└── steel/              # Steel element data
```

## Error Handling Strategy

### Error Classes
- **TalentTreeError**: Base class with error codes and context
- **RenderError**: Canvas and rendering failures
- **NodeError**: Node operations and state issues
- **ConnectionError**: Connection validation and drawing
- **IconError**: Icon loading and rendering
- **CanvasError**: Canvas setup and operations
- **StateError**: State management issues
- **ValidationError**: Data validation failures

### Error Logging
```typescript
import { logError } from './core/errors';

try {
  // Operation that might fail
} catch (error) {
  if (error instanceof TalentTreeError) {
    logError(error, 'error', { additionalContext: 'value' });
  }
}
```

## Performance Considerations

### Rendering Optimizations
- Only re-render dirty regions when possible
- Batch draw calls for better performance
- Cache frequently used values
- Use requestAnimationFrame for smooth animations

### Memory Management
- Clear image caches when not needed
- Dispose of event listeners properly
- Use weak references where appropriate
- Monitor for memory leaks in long-running sessions

## Testing Strategy

### Unit Testing
- Test each manager class independently
- Mock dependencies for isolated testing
- Test error conditions and edge cases
- Validate state transitions

### Integration Testing
- Test component interactions
- Validate data flow between layers
- Test error propagation
- Performance testing for rendering

## Future Enhancements

### Plugin System
- Allow custom node types
- Support for custom renderers
- Extensible visual effects
- Custom element types

### Theming Support
- CSS custom properties for styling
- Theme configuration files
- Runtime theme switching
- Accessibility themes

### Performance Optimizations
- WebGL rendering for complex trees
- Virtual scrolling for large trees
- Lazy loading of element data
- Progressive rendering

## Migration Guide

### From Old Architecture
1. Replace direct canvas operations with `CanvasManager`
2. Use `NodeRenderer` instead of inline node drawing
3. Use `ConnectionRenderer` for connection drawing
4. Replace magic numbers with constants from `constants.ts`
5. Use structured error handling instead of console.log

### Breaking Changes
- `talentTreeRenderer.ts` API has changed
- Icon management is now centralized
- Error handling requires custom error classes
- Constants must be imported from `constants.ts`

## Contributing Guidelines

### Code Standards
- Follow verbNoun naming convention for functions
- Use comprehensive JSDoc comments
- Extract magic values to constants
- Implement proper error handling
- Write unit tests for new features

### Architecture Rules
- Maintain layer boundaries
- Use dependency injection
- Follow single responsibility principle
- Document complex algorithms
- Add error handling for external calls 