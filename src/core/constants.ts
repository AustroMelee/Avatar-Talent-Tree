/**
 * Core constants that define the rules of the Argent Codex talent system.
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