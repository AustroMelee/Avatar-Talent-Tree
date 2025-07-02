/**
 * Main entry point for the simplified grid-based talent tree system.
 * Initializes the application and sets up the user interface controls.
 */

import { SimpleTalentManager } from './simpleTalentManager';
import { createAirGridTalentTree } from './airGridData';
import { GRID_CONFIG, UI_STYLES, DEFAULT_PK_CONFIG, ANIMATION_TIMING } from './core/constants';
import type { TalentTree } from './types/talent.types';

/**
 * Initialize the talent tree application with proper error handling.
 * Sets up the main container, creates the initial talent tree, and initializes the talent manager.
 */
function initializeTalentTree(): void {
  const container = document.getElementById('talent-tree-container');
  if (!container) {
    console.error('Talent tree container not found - ensure element with id "talent-tree-container" exists in HTML');
    return;
  }

  // Create initial talent tree with air grid data
  const initialTalentTree = createAirGridTalentTree();

  // Initialize talent manager
  const talentManager = new SimpleTalentManager(container, initialTalentTree);

  // Add UI controls
  setupUIControls(talentManager);
}

/**
 * Set up user interface controls for the talent tree.
 * Creates PK display, reset button, PK slider, and value display with proper styling.
 * 
 * @param talentManager - The talent manager instance to control
 */
function setupUIControls(talentManager: SimpleTalentManager): void {
  const controlsContainer = document.getElementById('controls-container');
  if (!controlsContainer) {
    console.warn('Controls container not found - UI controls will not be available');
    return;
  }

  // Create PK display
  const pkDisplay = createPKDisplay();
  controlsContainer.appendChild(pkDisplay);

  // Create reset button
  const resetButton = createResetButton(talentManager);
  controlsContainer.appendChild(resetButton);

  // Create PK slider
  const pkSlider = createPKSlider(talentManager);
  controlsContainer.appendChild(pkSlider);

  // Create PK value display
  const pkValueDisplay = createPKValueDisplay();
  controlsContainer.appendChild(pkValueDisplay);

  // Update PK display initially
  updatePKDisplay(talentManager);

  // Listen for allocation events
  setupAllocationEventListener(talentManager);
}

/**
 * Create the PK (Points of Knowing) display element with proper styling.
 * 
 * @returns The configured PK display element
 */
function createPKDisplay(): HTMLElement {
  const pkDisplay = document.createElement('div');
  pkDisplay.id = 'pk-display';
  pkDisplay.style.cssText = `
    background: #2a2a2a;
    color: #fff;
    padding: ${UI_STYLES.CONTAINER_PADDING}px;
    border-radius: 4px;
    margin-bottom: ${UI_STYLES.CONTAINER_PADDING}px;
    font-family: Arial, sans-serif;
  `;
  return pkDisplay;
}

/**
 * Create the reset button with proper styling and event handling.
 * 
 * @param talentManager - The talent manager to reset
 * @returns The configured reset button element
 */
function createResetButton(talentManager: SimpleTalentManager): HTMLElement {
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Tree';
  resetButton.style.cssText = `
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: ${UI_STYLES.CONTAINER_PADDING}px;
    font-family: Arial, sans-serif;
  `;
  resetButton.addEventListener('click', () => {
    talentManager.resetTalentTree();
    updatePKDisplay(talentManager);
  });
  return resetButton;
}

/**
 * Create the PK slider with proper configuration and event handling.
 * 
 * @param talentManager - The talent manager to control
 * @returns The configured PK slider element
 */
function createPKSlider(talentManager: SimpleTalentManager): HTMLElement {
  const pkSlider = document.createElement('input');
  pkSlider.type = 'range';
  pkSlider.min = '1';
  pkSlider.max = DEFAULT_PK_CONFIG.MAX_SLIDER_VALUE.toString();
  pkSlider.value = DEFAULT_PK_CONFIG.DEFAULT_TOTAL.toString();
  pkSlider.style.cssText = `
    width: 200px;
    margin-right: ${UI_STYLES.CONTAINER_PADDING}px;
  `;
  pkSlider.addEventListener('input', (e) => {
    const value = parseInt((e.target as HTMLInputElement).value);
    talentManager.setTotalPK(value);
    updatePKDisplay(talentManager);
  });
  return pkSlider;
}

/**
 * Create the PK value display element with proper styling.
 * 
 * @returns The configured PK value display element
 */
function createPKValueDisplay(): HTMLElement {
  const pkValueDisplay = document.createElement('span');
  pkValueDisplay.id = 'pk-value';
  pkValueDisplay.textContent = `${DEFAULT_PK_CONFIG.DEFAULT_TOTAL} PK`;
  pkValueDisplay.style.cssText = `
    color: #fff;
    font-family: Arial, sans-serif;
  `;
  return pkValueDisplay;
}

/**
 * Set up event listener for talent allocation events to update the PK display.
 * 
 * @param talentManager - The talent manager to monitor
 */
function setupAllocationEventListener(talentManager: SimpleTalentManager): void {
  const talentTreeContainer = document.getElementById('talent-tree-container');
  if (talentTreeContainer) {
    talentTreeContainer.addEventListener('talentAllocation', () => {
      updatePKDisplay(talentManager);
    });
  }
}

/**
 * Update the PK display with current allocation information.
 * Shows spent PK, total PK, and available PK in a user-friendly format.
 * 
 * @param talentManager - The talent manager to get allocation data from
 */
function updatePKDisplay(talentManager: SimpleTalentManager): void {
  const pkDisplay = document.getElementById('pk-display');
  const pkValueDisplay = document.getElementById('pk-value');
  
  if (!pkDisplay || !pkValueDisplay) {
    console.warn('PK display elements not found - cannot update display');
    return;
  }

  const summary = talentManager.getAllocationSummary();
  
  pkDisplay.innerHTML = `
    <strong>Points of Knowing</strong><br>
    Spent: ${summary.spentPK} / Total: ${summary.totalPK}<br>
    Available: ${summary.totalPK - summary.spentPK}
  `;
  
  pkValueDisplay.textContent = `${summary.totalPK} PK`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTalentTree);