// src/types/talent.types.ts

import type { ElementId } from './element.types';

// =================================================================
// Core Talent Node & Connection Definitions
// =================================================================

/**
 * The fundamental building block of the talent tree.
 */
export type TalentNode = {
  /** Unique identifier for the talent (e.g., 'dw_a1_air_scooter'). */
  id: string;
  /** Display name of the talent (e.g., "Air Scooter"). */
  name: string;
  /** Thematic path this talent belongs to (e.g., 'dancing_wind'). */
  path: string;
  /** The elemental constellation this talent is part of. */
  constellation: ElementId;
  /** The category of the node, which determines its size, shape, and importance. */
  type: NodeType;
  /** In-game effect description. */
  description: string;
  /** Thematic or philosophical flavor text. */
  flavor: string;
  /** List of node IDs required to unlock this talent. */
  prerequisites: string[];
  /** List of node IDs that become permanently locked if this node is allocated. */
  exclusiveWith?: string[];
  /** The a wound inflicted by choosing this Schism node. */
  wound?: string;
  /** The cost in Points of Knowing to allocate this talent. */
  pkCost: number;

  // --- Rendering & State ---
  /** The (x, y) coordinates of the node in the world space. */
  position: { x: number; y: number };
  /** The angle (in radians) of the node relative to the constellation center. */
  angle?: number;
  /** The distance (radius) of the node from the constellation center. */
  radius?: number;
  /** The ring/tier identifier this node belongs to (e.g., 'keystone', 'manifestation', 'inner_synthesis'). */
  ringId?: string;
  /** Visual properties for rendering, including a unique icon identifier. */
  visual: {
    color: string;
    size: number;
    icon: string;
  };
  
  /** Mechanical effects granted by this talent. */
  effects: TalentEffect[];
  
  // --- Dynamic State (Calculated at runtime) ---
  isAllocated: boolean;
  isAllocatable: boolean;
  isLocked: boolean;
  isPermanentlyLocked: boolean;
  isVisible: boolean;
};

/**
 * Represents an effect granted by a talent.
 */
export type TalentEffect = {
  /** Description of the effect */
  description: string;
  
  /** Value of the effect (can be a number or string) */
  value: number | string;
  
  /** Type of effect */
  type: EffectType;
  
  /** Trigger condition for the effect */
  trigger?: string;
  
  /** Additional parameters for complex effects */
  parameters?: Record<string, any>;
};

/**
 * Types of effects.
 */
export type EffectType = 
  | 'stat_boost'
  | 'ability_unlock'
  | 'modifier'
  | 'special'
  | 'philosophical_wound';

/**
 * Defines a connection line between two talent nodes.
 */
export type TalentConnection = {
  from: string;
  to: string;
  isActive: boolean;
  isLocked: boolean;
};

/**
 * Represents the entire state of a single talent tree constellation.
 */
export type TalentTree = {
  nodes: TalentNode[];
  connections: TalentConnection[];
  totalPK: number;
  spentPK: number;
  allocatedNodes: Set<string>;
  philosophicalWounds: string[];
  covenant: Covenant | null;
  metadata: {
    name: string;
    description: string;
    background: string;
  };
};

// =================================================================
// Type Enumerations
// =================================================================

/**
 * The category of a talent node, influencing its role and appearance.
 */
export type NodeType = 
  // Core Types
  | 'Genesis'         // The starting point of a path.
  | 'Minor'           // A small, incremental bonus node.
  | 'Keystone'        // A significant, build-defining passive or active ability.
  | 'Manifestation'   // A major active ability.
  | 'Axiom'           // A major passive that fundamentally changes rules.
  | 'Capstone'        // The final, ultimate talent of a path.
  // Special/Quest Types
  | 'GnosticRite'     // A trial completion node.
  | 'Schism'          // A powerful, heretical choice with a penalty.
  // Inter-Path Types
  | 'Bridge'          // Connects two distinct paths.
  | 'Synthesis'       // A fusion of two paths' themes into a unique ability.
  // Legacy/Unused Types
  | 'Lens'
  | 'Covenant'
  | 'Specialization'
  | 'Phantom' | 'Trickster' | 'Guardian' | 'Judge' | 'Executioner' | 'Ascetic' | 'VoidTouched';

// =================================================================
// Metadata Types
// =================================================================

/**
 * Represents the static, unchangeable metadata for a single Path.
 */
export type PathMetadata = {
  id: string;
  name: string;
  description: string;
  flavor: string;
};

/**
 * Represents the static, unchangeable metadata for the entire Constellation.
 * This is pure data, free of any dynamic state.
 */
export type ConstellationMetadata = {
  id: string;
  name: string;
  description: string;
  color: string;
  paths: PathMetadata[];
};

// =================================================================
// Covenant System Types (Kept for potential future use)
// =================================================================

export type CovenantDefinition = {
  id: string;
  name: string;
  description: string;
  flavor: string;
  path1: { constellation: string; path: string };
  path2: { constellation: string; path: string };
};

export type Covenant = {
  definition: CovenantDefinition;
  allocatedNodes: Set<string>;
  isActive: boolean;
}; 