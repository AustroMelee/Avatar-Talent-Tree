/**
 * Core type definitions for the Argent Codex talent tree system
 * Based on the Path of Exile style with metaphysical scarcity laws
 */

/**
 * Argent Codex Constants - The Five Laws encoded as system parameters
 */
export const ARGENT_CODEX_CONSTANTS = {
  /** Law I: The Soul's Finite Resonance - Total PK available */
  TOTAL_PK: 51,
  
  /** Law II: Genesis Cost & Apostasy - Costs for unlocking Genesis nodes */
  GENESIS_COSTS: [5, 8, 13], // First, second, third constellation
  
  /** Law III: Path of Deepening Conviction - Node costs by tier */
  NODE_COSTS: [1, 2, 3, 4, 5], // Nodes 1-5, 6-10, 11-15, 16-20, 21-25
  
  /** Law V: The Heresy of the Schism */
  SCHISM_COST: 10,
  SCHISM_UNLOCK_THRESHOLD: 25, // PK required to reveal Schism
  
  /** Law IV: Covenant requirements */
  COVENANT_MINIMUM_INVESTMENT: 15, // PK required in each path for Covenant
  MAX_COVENANTS: 1
} as const;

/**
 * Represents a single talent node in the talent tree
 */
export type TalentNode = {
  /** Unique identifier for the talent */
  id: string;
  
  /** Display name of the talent */
  name: string;
  
  /** Path this talent belongs to (e.g., 'DriftingLeaf', 'UnseenHurricane') */
  path: string;
  
  /** Constellation this talent belongs to (e.g., 'Air', 'Fire', 'Iron') */
  constellation: string;
  
  /** Type of talent node */
  type: NodeType;
  
  /** Description of what the talent does */
  description: string;
  
  /** Flavor text for the talent */
  flavor: string;
  
  /** Prerequisites required to unlock this talent */
  prerequisites: string[];
  
  /** Nodes that are mutually exclusive with this node (e.g., Rites vs Schisms) */
  exclusiveWith?: string[];
  
  /** Position of the talent in the tree */
  position: {
    x: number;
    y: number;
  };
  
  /** Visual properties for rendering */
  visual: {
    /** Color theme for this talent */
    color: string;
    
    /** Size of the talent node */
    size: number;
    
    /** Icon asset identifier for this talent */
    icon: string;
  };
  
  /** Mechanical effects granted by this talent */
  effects: TalentEffect[];
  
  /** Whether this node is currently allocated */
  isAllocated: boolean;
  
  /** Whether this node is locked due to diametric opposition */
  isLocked: boolean;
  
  /** Whether this node can be allocated */
  isAllocatable: boolean;
  
  /** Whether this node is visible (for Schism nodes) */
  isVisible: boolean;
  
  /** PK cost for this specific node */
  pkCost: number;
  
  /** Whether selecting this node would trigger a penalty (Apostasy, Schism, etc) */
  hasPenalty?: boolean;

  /** Whether this node is permanently locked due to conflicting major decisions */
  isPermanentlyLocked: boolean;
};

/**
 * Types of talent nodes according to the Argent Codex
 */
export type NodeType = 
  | 'Genesis'      // Entry point for a path
  | 'Axiom'        // Passive rule-altering effects
  | 'Manifestation' // Active abilities
  | 'Lens'         // Utility abilities
  | 'Capstone'     // Path finisher
  | 'GnosticRite'  // Trial completion nodes
  | 'Schism'       // Heretical high-cost nodes
  | 'Covenant'     // Hybrid nodes from two paths
  | 'Specialization' // Branching specialization choice
  | 'Phantom'      // Phantom specialization nodes (evasion/stealth)
  | 'Trickster'    // Trickster specialization nodes (control/deflection)
  | 'Guardian'     // Guardian specialization nodes (protection/control)
  | 'Judge'        // Judge specialization nodes (damage/debuffs)
  | 'Executioner'  // Executioner specialization nodes (destruction/force)
  | 'Ascetic'      // Ascetic specialization nodes (personal enlightenment)
  | 'VoidTouched'  // VoidTouched specialization nodes (imposing detachment)
  | 'Minor'        // Small incremental bonuses - connective tissue
  | 'Keystone'     // Milestone nodes with significant power spikes
  | 'Bridge'       // Apocryphal Synthesis bridge nodes (15 PK cost)
  | 'Synthesis';   // Apocryphal Synthesis fusion nodes (unique hybrid abilities)

/**
 * Represents an effect granted by a talent
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
 * Types of effects
 */
export type EffectType = 
  | 'stat_boost'
  | 'ability_unlock'
  | 'modifier'
  | 'special'
  | 'philosophical_wound';

/**
 * Represents a connection between talent nodes
 */
export type TalentConnection = {
  /** ID of the source talent */
  from: string;
  
  /** ID of the target talent */
  to: string;
  
  /** Whether this connection is active (both talents have points) */
  isActive: boolean;
  
  /** Whether this connection is locked */
  isLocked: boolean;
};

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

/**
 * Types of nodes in a Covenant tree
 */
export type CovenantNodeType =
  | 'CovenantGenesis'   // Entry node, forms the Covenant
  | 'CovenantManifestation' // Major active/passive hybrid ability
  | 'CovenantLesser';   // Minor synergistic passive

/**
 * Represents a node in a Covenant tree
 */
export type CovenantNode = {
  id: string;
  name: string;
  type: CovenantNodeType;
  description: string;
  flavor: string;
  prerequisites: string[];
  cost: number;
  effects: TalentEffect[];
  visual: {
    color: string;
    size: number;
    icon: string;
  };
};

/**
 * Represents a modular Covenant definition between two paths
 */
export type CovenantDefinition = {
  id: string; // e.g. 'air_driftingleaf__air_unseenhurricane' or 'air_driftingleaf__fire_eternalforge'
  name: string;
  description: string;
  flavor: string;
  path1: { constellation: string; path: string; };
  path2: { constellation: string; path: string; };
  nodes: CovenantNode[];
  connections: { from: string; to: string; }[];
  visual: {
    color1: string;
    color2: string;
    bridgeStyle: string;
  };
};

/**
 * Represents the current Covenant state in the talent tree
 */
export type Covenant = {
  definition: CovenantDefinition;
  allocatedNodes: Set<string>;
  isActive: boolean;
};

/**
 * Represents the entire talent tree state according to the Argent Codex
 */
export type TalentTree = {
  /** All talent nodes in the tree */
  nodes: TalentNode[];
  
  /** Connections between talent nodes */
  connections: TalentConnection[];
  
  /** Total Points of Knowing available */
  totalPK: number;
  
  /** Points of Knowing currently spent */
  spentPK: number;
  
  /** Chosen paths for each constellation */
  chosenPaths: Map<string, string>;
  
  /** Allocated node IDs */
  allocatedNodes: Set<string>;
  
  /** Active covenant (if any) */
  covenant: Covenant | null;
  
  /** Philosophical wounds from Schisms */
  philosophicalWounds: string[];
  
  /** Tree metadata */
  metadata: {
    name: string;
    description: string;
    background: string;
  };
};

/**
 * Represents the application state
 */
export type AppState = {
  /** Current talent tree */
  talentTree: TalentTree;
  
  /** Current zoom level */
  zoom: number;
  
  /** Current pan offset */
  pan: {
    x: number;
    y: number;
  };
  
  /** Whether the user is currently dragging */
  isDragging: boolean;
  
  /** Currently selected talent node */
  selectedNode: string | null;
  
  /** Currently hovered talent node */
  hoveredNode: string | null;
  
  /** Whether the loading screen is visible */
  isLoading: boolean;
};

/**
 * Represents a point in 2D space
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Represents a rectangle in 2D space
 */
export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Represents mouse/touch input events
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

/**
 * Configuration for rendering the talent tree
 */
export type RenderConfig = {
  /** Canvas element to render on */
  canvas: HTMLCanvasElement;
  
  /** Context for drawing */
  ctx: CanvasRenderingContext2D;
  
  /** Current viewport */
  viewport: Rectangle;
  
  /** Whether to show debug information */
  debug: boolean;
}; 