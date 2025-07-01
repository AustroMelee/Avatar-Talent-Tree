// src/types/app.types.ts

// Note: We avoid importing from talent.types to prevent circular dependencies
// TalentTree is re-exported from the main index.ts file

import type { TalentTree } from './talent.types';
import type { ElementId } from './element.types';
import type { PresetBuild } from './presetBuild.types';

// =================================================================
// Application-Level State & Config
// =================================================================

/**
 * The complete state of the application at any given moment.
 */
export type AppState = {
  talentTree: TalentTree;
  zoom: number;
  pan: Point;
  isDragging: boolean;
  selectedNode: string | null;
  hoveredNode: string | null;
  isLoading: boolean;
};

/**
 * Defines the configuration for the Canvas renderer.
 */
export type RenderConfig = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  debug: boolean;
};

/**
 * Represents visual events for enhanced UI feedback (e.g., flashes).
 */
export type VisualEvent = {
  type: 'deallocate_denied';
  nodeId: string;
  timestamp: number;
};

// =================================================================
// Generic & Utility Types
// =================================================================

/**
 * Represents a 2D coordinate.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Represents a 2D rectangle.
 */
export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Represents user input events for the application.
 */
export type InputEvent = {
  /** Position of the input */
  position: Point;
  
  /** Whether the primary button is pressed */
  isPressed: boolean;
  
  /** Type of input event */
  type: 'mousedown' | 'mousemove' | 'mouseup' | 'click' | 'wheel';
  
  /** Additional event data */
  data?: {
    deltaY?: number;
    deltaX?: number;
  };
}; 