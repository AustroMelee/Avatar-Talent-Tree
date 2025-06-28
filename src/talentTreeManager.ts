/**
 * Talent Tree Manager
 * Handles application state, talent interactions, and business logic according to the Argent Codex
 */

import type { 
  TalentTree, 
  TalentNode, 
  AppState, 
  Point
} from './types';
import { ARGENT_CODEX_CONSTANTS } from './types';
import { 
  AIR_TALENT_NODES, 
  FIRE_TALENT_NODES, 
  WATER_TALENT_NODES, 
  generateAirConnections,
  generateFireConnections,
  generateWaterConnections,
  generateAllEarthNodes,
  generateAllEarthConnections,
  generateAllSteelNodes,
  generateAllSteelConnections,
  CONSTELLATIONS,
  getConstellation
} from './elements';

/**
 * Manages the talent tree state and interactions
 */
export class TalentTreeManager {
  private state: AppState;
  private currentTree: TalentTree;
  private selectedConstellation: string;
  private selectedPath: string | null;
  private viewport: { x: number; y: number; zoom: number };
  private isDragging: boolean;
  private dragStart: Point | null;

  constructor() {
    this.selectedConstellation = 'air';
    this.selectedPath = null;
    this.viewport = { x: 0, y: 0, zoom: 1 };
    this.isDragging = false;
    this.dragStart = null;
    this.currentTree = this.createAirTalentTree();
    this.state = {
      talentTree: this.currentTree,
      zoom: this.viewport.zoom,
      pan: { x: this.viewport.x, y: this.viewport.y },
      isDragging: this.isDragging,
      selectedNode: null,
      hoveredNode: null,
      isLoading: false
    };
  }

  /**
   * Get the current application state
   */
  getState(): AppState {
    // Update state with current values
    return {
      ...this.state,
      talentTree: this.currentTree,
      zoom: this.viewport.zoom,
      pan: { x: this.viewport.x, y: this.viewport.y },
      isDragging: this.isDragging
    };
  }

  /**
   * Get the current talent tree
   */
  getCurrentTree(): TalentTree {
    return this.currentTree;
  }

  /**
   * Switch to a different constellation
   */
  switchConstellation(constellationName: string): void {
    this.selectedConstellation = constellationName;
    this.selectedPath = null;
    switch (constellationName) {
      case 'air':
        this.currentTree = this.createAirTalentTree();
        break;
      case 'earth':
        this.currentTree = this.createEarthTalentTree();
        break;
      case 'fire':
        this.currentTree = this.createFireTalentTree();
        break;
      case 'water':
        this.currentTree = this.createWaterTalentTree();
        break;
      case 'steel':
        this.currentTree = this.createSteelTalentTree();
        break;
      default:
        throw new Error(`Unknown constellation: ${constellationName}`);
    }
    // Reset viewport and dragging state
    this.viewport = { x: 0, y: 0, zoom: 1 };
    this.isDragging = false;
    this.dragStart = null;
  }

  /**
   * Create the Air talent tree
   */
  private createAirTalentTree(): TalentTree {
    const nodes = AIR_TALENT_NODES.map(node => ({...node}));
    const connections = generateAirConnections();
    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: 'The Four Winds',
        description: 'The constellation of balance, freedom, adaptation, and transcendence',
        background: 'air'
      }
    };
  }

  /**
   * Create the Earth talent tree
   */
  private createEarthTalentTree(): TalentTree {
    const nodes = generateAllEarthNodes().map(node => ({...node}));
    const connections = generateAllEarthConnections();
    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: CONSTELLATIONS.earth.name,
        description: CONSTELLATIONS.earth.description,
        background: 'earth'
      }
    };
  }

  /**
   * Create the Fire talent tree
   */
  private createFireTalentTree(): TalentTree {
    const nodes = FIRE_TALENT_NODES.map(node => ({...node}));
    const connections = generateFireConnections();
    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: CONSTELLATIONS.fire.name,
        description: CONSTELLATIONS.fire.description,
        background: 'fire'
      }
    };
  }

  /**
   * Create the Water talent tree
   */
  private createWaterTalentTree(): TalentTree {
    const nodes = WATER_TALENT_NODES.map(node => ({...node}));
    const connections = generateWaterConnections();
    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: CONSTELLATIONS.water.name,
        description: CONSTELLATIONS.water.description,
        background: 'water'
      }
    };
  }

  /**
   * Create the Steel talent tree
   */
  private createSteelTalentTree(): TalentTree {
    const nodes = generateAllSteelNodes().map(node => ({...node}));
    const connections = generateAllSteelConnections();
    return {
      nodes,
      connections,
      totalPK: ARGENT_CODEX_CONSTANTS.TOTAL_PK,
      spentPK: 0,
      chosenPaths: new Map(),
      allocatedNodes: new Set(),
      covenant: null,
      philosophicalWounds: [],
      metadata: {
        name: 'The Forged Steel',
        description: 'The triumph of mortal will over supernatural power, achieved through dedication, training, and ingenuity.',
        background: 'steel'
      }
    };
  }

  /**
   * Allocate a talent node
   */
  allocateNode(nodeId: string): boolean {
    const node = this.currentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocatable) {
      return false;
    }
    const availablePK = this.currentTree.totalPK - this.currentTree.spentPK;
    if (availablePK < node.pkCost) {
      return false;
    }

    // Check prerequisites
    const unmetPrerequisites = node.prerequisites.filter(prereqId => {
      const prereqNode = this.currentTree.nodes.find(n => n.id === prereqId);
      return !prereqNode || !prereqNode.isAllocated;
    });

    if (unmetPrerequisites.length > 0) {
      return false;
    }

    // Allocate the node
    node.isAllocated = true;
    node.isAllocatable = false;
    this.currentTree.spentPK += node.pkCost;

    // Update connections
    this.currentTree.connections.forEach(conn => {
      if (conn.to === nodeId) {
        conn.isActive = true;
        conn.isLocked = false;
      }
    });

    // Update allocatable status for dependent nodes
    this.updateAllocatableStatus();

    return true;
  }

  /**
   * Deallocate a talent node
   */
  deallocateNode(nodeId: string): boolean {
    const node = this.currentTree.nodes.find(n => n.id === nodeId);
    if (!node || !node.isAllocated) {
      return false;
    }

    // Check if any allocated nodes depend on this one
    const dependentNodes = this.currentTree.nodes.filter(n => 
      n.isAllocated && n.prerequisites.includes(nodeId)
    );

    if (dependentNodes.length > 0) {
      return false;
    }

    // Deallocate the node
    node.isAllocated = false;
    node.isAllocatable = true;
    this.currentTree.spentPK -= node.pkCost;

    // Update connections
    this.currentTree.connections.forEach(conn => {
      if (conn.to === nodeId) {
        conn.isActive = false;
        conn.isLocked = true;
      }
    });

    // Update allocatable status for dependent nodes
    this.updateAllocatableStatus();

    return true;
  }

  /**
   * Update the allocatable status of all nodes
   */
  private updateAllocatableStatus(): void {
    this.currentTree.nodes.forEach(node => {
      if (node.type === 'Genesis') {
        node.isAllocatable = !node.isAllocated;
        return;
      }

      if (node.isAllocated) {
        node.isAllocatable = false;
        return;
      }

      // Check if all prerequisites are met
      const allPrerequisitesMet = node.prerequisites.every(prereqId => {
        const prereqNode = this.currentTree.nodes.find(n => n.id === prereqId);
        return prereqNode && prereqNode.isAllocated;
      });

      node.isAllocatable = allPrerequisitesMet;
    });
  }

  /**
   * Update viewport state
   */
  updateViewport(viewport: { x: number; y: number; zoom: number }): void {
    this.viewport = viewport;
  }

  /**
   * Set hovered node
   */
  setHoveredNode(nodeId: string | null): void {
    this.state.hoveredNode = nodeId;
  }

  /**
   * Set selected path
   */
  setSelectedPath(pathId: string | null): void {
    this.selectedPath = pathId;
  }

  /**
   * Start dragging
   */
  startDrag(point: Point): void {
    this.isDragging = true;
    this.dragStart = point;
  }

  /**
   * Stop dragging
   */
  stopDrag(): void {
    this.isDragging = false;
    this.dragStart = null;
  }

  getViewport() {
    return { ...this.viewport };
  }
} 