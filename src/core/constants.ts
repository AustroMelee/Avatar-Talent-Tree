/**
 * Core constants that define the rules of the Argent Codex talent system.
 * All magic numbers and configuration values are centralized here for maintainability.
 */

/** Default development server port for Vite */
export const DEFAULT_DEV_PORT = 5173;

/** Default grid configuration values for the talent tree renderer */
export const GRID_CONFIG = {
  /** Number of columns in the grid layout */
  DEFAULT_COLUMNS: 10,
  /** Number of rows in the grid layout */
  DEFAULT_ROWS: 10,
  /** Size of each grid cell in pixels */
  DEFAULT_CELL_SIZE: 70,
  /** Gap between grid cells in pixels */
  DEFAULT_GAP: 8,
  /** Padding around the grid container in pixels */
  CONTAINER_PADDING: 20,
} as const;

/** UI styling constants for consistent visual appearance */
export const UI_STYLES = {
  /** Default border radius for circular elements */
  BORDER_RADIUS_CIRCULAR: '50%',
  /** Default border width for nodes */
  NODE_BORDER_WIDTH: '2px',
  /** Default border color for nodes */
  NODE_BORDER_COLOR: '#333',
  /** Default icon font size */
  ICON_FONT_SIZE: '24px',
  /** Default tooltip z-index */
  TOOLTIP_Z_INDEX: '10000',
  /** Default tooltip offset from cursor */
  TOOLTIP_OFFSET: 12,
  /** Default tooltip margin from viewport edge */
  TOOLTIP_MARGIN: 16,
  /** Default container padding */
  CONTAINER_PADDING: 10,
} as const;

/** Color constants for different node types */
export const NODE_COLORS = {
  /** Genesis node border color */
  GENESIS_BORDER: '#fff',
  /** Keystone node border color */
  KEYSTONE_BORDER: '#ffd700',
  /** Manifestation node border color */
  MANIFESTATION_BORDER: '#ff6b6b',
  /** Axiom node border color */
  AXIOM_BORDER: '#4ecdc4',
  /** Capstone node border color */
  CAPSTONE_BORDER: '#a855f7',
  /** Synthesis node border color */
  SYNTHESIS_BORDER: '#f59e0b',
  /** Default node border color */
  DEFAULT_BORDER: '#666',
} as const;

/** Shadow effects for different node types */
export const NODE_SHADOWS = {
  /** Genesis node shadow */
  GENESIS: '0 0 10px rgba(255, 255, 255, 0.3)',
  /** Keystone node shadow */
  KEYSTONE: '0 0 15px rgba(255, 215, 0, 0.4)',
  /** Manifestation node shadow */
  MANIFESTATION: '0 0 15px rgba(255, 107, 107, 0.4)',
  /** Axiom node shadow */
  AXIOM: '0 0 15px rgba(78, 205, 196, 0.4)',
  /** Capstone node shadow */
  CAPSTONE: '0 0 20px rgba(168, 85, 247, 0.5)',
  /** Synthesis node shadow */
  SYNTHESIS: '0 0 15px rgba(245, 158, 11, 0.4)',
  /** Hover effect shadow */
  HOVER: '0 0 5px rgba(0, 255, 0, 0.3)',
} as const;

/** Animation timing constants */
export const ANIMATION_TIMING = {
  /** Tooltip show delay in milliseconds */
  TOOLTIP_SHOW_DELAY: 150,
  /** Visual event cleanup threshold in milliseconds */
  VISUAL_EVENT_CLEANUP: 5000,
} as const;

/** Default PK (Points of Knowing) configuration */
export const DEFAULT_PK_CONFIG = {
  /** Default total PK available */
  DEFAULT_TOTAL: 24,
  /** Maximum PK slider value */
  MAX_SLIDER_VALUE: 50,
} as const;

/**
 * Core Argent Codex system constants that define the rules of the talent system.
 * These values represent the fundamental laws that govern talent allocation and progression.
 */
export const ARGENT_CODEX_CONSTANTS = {
  /** 
   * Law I: The Soul's Finite Resonance. 
   * Set to a high number for the theorycrafter to allow unlimited point allocation.
   */
  TOTAL_PK: 999,
  
  /** Law II: Genesis Cost & Apostasy - Costs for unlocking Genesis nodes. */
  GENESIS_COSTS: [5, 8, 13],
  
  /** Law III: Path of Deepening Conviction - Node costs by tier. */
  NODE_COSTS: [1, 2, 3, 4, 5],
  
  /** Law V: The Heresy of the Schism. */
  SCHISM_COST: 10,
  SCHISM_UNLOCK_THRESHOLD: 25,
  
  /** Law IV: Covenant requirements. */
  COVENANT_MINIMUM_INVESTMENT: 15,
  MAX_COVENANTS: 1,
} as const; 