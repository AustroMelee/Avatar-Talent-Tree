/**
 * Main application entry point
 * Initializes the talent tree application and sets up the UI
 */

import { TalentTreeManager } from './talentTreeManager';
import { TalentTreeRenderer } from './talentTreeRenderer';
import { AssetManager } from './assetManager';

// Initialize managers
const talentTreeManager = new TalentTreeManager();
const canvas = document.getElementById('talentCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const renderConfig = {
  canvas,
  ctx,
  viewport: { x: 0, y: 0, width: canvas.width, height: canvas.height },
  debug: false
};
const talentTreeRenderer = new TalentTreeRenderer(renderConfig);
const assetManager = new AssetManager();

// Get DOM elements
const constellationButtons = document.querySelectorAll('.constellation-button');
const pkDisplay = document.getElementById('pkDisplay') as HTMLElement;
const nodeInfoPanel = document.getElementById('nodeInfoPanel') as HTMLElement;

// Initialize canvas
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Set canvas style
  canvas.style.display = 'block';
  canvas.style.background = '#1a1a1a';
}

// Update PK display
function updatePKDisplay() {
  const tree = talentTreeManager.getCurrentTree();
  const spent = tree.spentPK;
  const total = tree.totalPK;
  const available = total - spent;
  
  pkDisplay.textContent = `${available}PK`;
  pkDisplay.className = available === 0 ? 'pk-display empty' : 'pk-display';
}

// Update node info panel
function updateNodeInfo(nodeId: string | null) {
  if (!nodeId) {
    nodeInfoPanel.innerHTML = '<h3>Select a node to view details</h3>';
    return;
  }
  
  const tree = talentTreeManager.getCurrentTree();
  const node = tree.nodes.find(n => n.id === nodeId);
  
  if (!node) {
    nodeInfoPanel.innerHTML = '<h3>Node not found</h3>';
    return;
  }
  
  nodeInfoPanel.innerHTML = `
    <h3>${node.name}</h3>
    <p><strong>Type:</strong> ${node.type}</p>
    <p><strong>Cost:</strong> ${node.pkCost} PK</p>
    <p><strong>Description:</strong> ${node.description}</p>
    ${node.flavor ? `<p><em>"${node.flavor}"</em></p>` : ''}
    <p><strong>Status:</strong> ${node.isAllocated ? 'Allocated' : node.isAllocatable ? 'Available' : 'Locked'}</p>
  `;
}

// Handle constellation switching
function setupConstellationButtons() {
  constellationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const constellation = target.dataset.constellation;
      
      if (constellation) {
        // Remove active class from all buttons
        constellationButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        target.classList.add('active');
        
        // Switch constellation
        talentTreeManager.switchConstellation(constellation);
        
        // Update display
        updatePKDisplay();
        updateNodeInfo(null);
        
        // Re-render
        render();
      }
    });
  });
}

// Handle canvas interactions
function setupCanvasInteractions() {
  let isDragging = false;
  let lastMousePos = { x: 0, y: 0 };
  
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMousePos = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      const state = talentTreeManager.getState();
      const viewport = talentTreeManager.getViewport();
      const newViewport = {
        ...viewport,
        x: viewport.x + deltaX,
        y: viewport.y + deltaY
      };
      
      talentTreeManager.updateViewport(newViewport);
      lastMousePos = { x: e.clientX, y: e.clientY };
      
      render();
    }
  });
  
  canvas.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });
  
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const state = talentTreeManager.getState();
    const viewport = talentTreeManager.getViewport();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.2, Math.min(2.0, viewport.zoom * zoomFactor));
    const newViewport = {
      ...viewport,
      zoom: newZoom
    };
    
    talentTreeManager.updateViewport(newViewport);
    render();
  });
  
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const viewport = talentTreeManager.getViewport();
    const x = (e.clientX - rect.left - viewport.x) / viewport.zoom;
    const y = (e.clientY - rect.top - viewport.y) / viewport.zoom;
    
    const tree = talentTreeManager.getCurrentTree();
    const clickedNode = tree.nodes.find(node => {
      const nodeX = node.position.x;
      const nodeY = node.position.y;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      return distance <= 25; // Node radius
    });
    
    if (clickedNode) {
      if (clickedNode.isAllocated) {
        talentTreeManager.deallocateNode(clickedNode.id);
      } else if (clickedNode.isAllocatable) {
        talentTreeManager.allocateNode(clickedNode.id);
      }
      
      updatePKDisplay();
      updateNodeInfo(clickedNode.id);
      render();
    }
  });
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const viewport = talentTreeManager.getViewport();
    const x = (e.clientX - rect.left - viewport.x) / viewport.zoom;
    const y = (e.clientY - rect.top - viewport.y) / viewport.zoom;
    
    const tree = talentTreeManager.getCurrentTree();
    const hoveredNode = tree.nodes.find(node => {
      const nodeX = node.position.x;
      const nodeY = node.position.y;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      return distance <= 25; // Node radius
    });
    
    talentTreeManager.setHoveredNode(hoveredNode?.id || null);
    
    if (hoveredNode) {
      updateNodeInfo(hoveredNode.id);
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
    
    render();
  });
}

// Main render function
function render() {
  const tree = talentTreeManager.getCurrentTree();
  const state = talentTreeManager.getState();
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Apply viewport transformation
  const viewport = talentTreeManager.getViewport();
  ctx.save();
  ctx.translate(viewport.x, viewport.y);
  ctx.scale(viewport.zoom, viewport.zoom);
  
  // Render the talent tree
  talentTreeRenderer.render(tree, viewport.zoom, { x: viewport.x, y: viewport.y }, state.hoveredNode);
  
  ctx.restore();
}

// Initialize application
function init() {
  initCanvas();
  setupConstellationButtons();
  setupCanvasInteractions();
  
  // Set initial active constellation
  const airButton = document.querySelector('[data-constellation="air"]') as HTMLElement;
  if (airButton) {
    airButton.classList.add('active');
  }
  
  updatePKDisplay();
  render();
}

// Handle window resize
window.addEventListener('resize', () => {
  initCanvas();
  render();
});

// Start the application
init();