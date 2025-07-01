// src/core/stateFactory.ts
import type { AppState, TalentTree } from '../types';
import { ARGENT_CODEX_CONSTANTS } from './constants';
import { AIR_TALENT_NODES, generateAirConnections } from '../elements';

/**
 * Creates the initial state for the application.
 */
export class StateFactory {

  public static createInitialState(): AppState {
    return {
      talentTree: this.createDefaultTalentTree(),
      zoom: 0.8,
      pan: { x: 0, y: 0 },
      isDragging: false,
      selectedNode: null,
      hoveredNode: null,
      isLoading: false,
    };
  }

  /**
   * Creates the default talent tree (Air) for initial load.
   */
  private static createDefaultTalentTree(): TalentTree {
    return {
      nodes: AIR_TALENT_NODES.map(node => ({ ...node })),
      connections: generateAirConnections(),
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: 'The Four Winds',
        description: 'The constellation of balance, freedom, adaptation, and transcendence',
        background: 'air',
      },
    };
  }
} 