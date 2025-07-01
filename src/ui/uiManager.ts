import type { TalentNode, AppState, PresetBuild } from '../types';
import { getConstellation } from '../elements';

// Collect all DOM element lookups in one place
class UIElements {
    // Main Panel
    readonly panel = document.getElementById('ui-panel') as HTMLElement;
    readonly buildSummary = document.getElementById('build-summary') as HTMLElement;
    readonly pkGaugeText = document.getElementById('pk-gauge-text') as HTMLElement;
    
    // Header
    readonly elementalSelector = document.getElementById('elemental-selector') as HTMLElement;
    readonly constellationName = document.getElementById('constellation-name') as HTMLElement;
    readonly constellationDescription = document.getElementById('constellation-description') as HTMLElement;

    // Presets
    readonly presetsContainer = document.getElementById('presets-container') as HTMLElement;
    readonly presetsList = document.getElementById('presets-list') as HTMLElement;
    
    // Active Preset Display
    readonly activePresetInfo = document.getElementById('active-preset-info') as HTMLElement;
    readonly activePresetName = document.getElementById('active-preset-name') as HTMLElement;
    readonly activePresetCost = document.getElementById('active-preset-cost') as HTMLElement;
    readonly clearPresetBtn = document.getElementById('clear-preset-btn') as HTMLElement;

    // Tooltips
    readonly tooltip = document.getElementById('tooltip') as HTMLElement;
    readonly summaryTooltip = document.getElementById('summary-tooltip') as HTMLElement;

    constructor() {
        if (!this.panel || !this.buildSummary || !this.pkGaugeText || !this.elementalSelector) {
            throw new Error("Essential UI elements not found in the DOM.");
        }
    }
}

export class UIManager {
    private elements: UIElements;
    private currentActivePreset: PresetBuild | null = null;
    private state: AppState | null = null;

    constructor() {
        this.elements = new UIElements();
    }

    // Called by the AppController whenever the state changes
    public update(state: AppState): void {
        this.state = state;
        this.updatePKGauge(state.talentTree.spentPK);
        this.updateBuildSummary(state.talentTree.nodes, state.talentTree.allocatedNodes, state.talentTree.philosophicalWounds, state.talentTree.covenant);
        this.updateActivePresetUI();
    }
    
    private updatePKGauge(spentPK: number): void {
        if (this.elements.pkGaugeText) {
            this.elements.pkGaugeText.textContent = `${spentPK}`;
        }
    }

    private updateBuildSummary(nodes: TalentNode[], allocatedNodeIds: Set<string>, wounds: string[], covenant: AppState['talentTree']['covenant']): void {
        const allocatedNodes = nodes.filter(n => allocatedNodeIds.has(n.id));
        
        const allocatedNodesHTML = allocatedNodes.length > 0 
          ? `<ul class="allocated-nodes-list">
              ${allocatedNodes.map(n => `
                <li data-node-id="${n.id}">
                  <span class="node-type-icon" data-node-type="${n.type}"></span>
                  <span>${n.name}</span>
                </li>
              `).join('')}
            </ul>`
          : '<ul><li>None</li></ul>';

        this.elements.buildSummary.innerHTML = `
          <div class="summary-section">
            <strong>Allocated Nodes (${allocatedNodes.length})</strong>
            ${allocatedNodesHTML}
          </div>
          <div class="summary-section wounds ${wounds.length > 0 ? 'is-active' : ''}">
            <strong>Philosophical Wounds</strong>
            <ul>
              ${wounds.length > 0 ? wounds.map(w => `<li>${w}</li>`).join('') : '<li>None</li>'}
            </ul>
          </div>
          <div class="summary-section covenant ${covenant?.isActive ? 'is-active' : ''}">
            <strong>Covenant</strong>
            <ul>
              ${covenant?.isActive ? `<li>${covenant.definition.name}</li>` : '<li>None</li>'}
            </ul>
          </div>
        `;
    }

    public updateElementalSelector(currentElement: string): void {
        document.querySelectorAll('.element-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-element') === currentElement);
        });

        const constellation = getConstellation(currentElement);
        if (constellation) {
            this.elements.constellationName.textContent = constellation.name;
            this.elements.constellationDescription.textContent = constellation.description;
        }
    }
    
    public populatePresets(presets: PresetBuild[], onPresetClick: (preset: PresetBuild) => void): void {
        this.elements.presetsList.innerHTML = '';
        if (presets.length === 0) {
            this.elements.presetsList.innerHTML = '<p class="no-presets">No presets available for this element.</p>';
            this.elements.presetsContainer.style.display = 'block';
            return;
        }
        presets.forEach(preset => {
            const button = document.createElement('button');
            button.className = 'preset-btn';
            button.dataset.presetId = preset.id;
            button.innerHTML = `
                <div class="preset-header">
                    <span class="preset-icon">${preset.icon}</span>
                    <strong class="preset-name">${preset.name}</strong>
                </div>
                <p class="preset-description">${preset.description}</p>
                <div class="preset-footer">
                    <span class="preset-pinnacles-title">Pinnacle Skills:</span>
                    <ul class="preset-pinnacles">
                        ${preset.pinnacleSkills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            `;
            button.addEventListener('click', () => onPresetClick(preset));
            this.elements.presetsList.appendChild(button);
        });
        this.elements.presetsContainer.style.display = 'block';
    }

    public setActivePreset(preset: PresetBuild | null): void {
        this.currentActivePreset = preset;
        this.updateActivePresetUI();
    }
    
    private updateActivePresetUI(): void {
        if (this.currentActivePreset && this.state) {
            const { nodes, allocatedNodes } = this.state.talentTree;
            const nodeMap = new Map(nodes.map(n => [n.id, n]));
            let totalCost = 0;
            allocatedNodes.forEach(nodeId => {
                const node = nodeMap.get(nodeId);
                if (node) totalCost += node.pkCost;
            });

            this.elements.activePresetName.textContent = this.currentActivePreset.name;
            this.elements.activePresetCost.innerHTML = `Total Cost: <strong>${totalCost} PK</strong>`;
            this.elements.activePresetInfo.classList.remove('hidden');
        } else {
            this.elements.activePresetInfo.classList.add('hidden');
        }
    }
    
    public showTooltip(node: TalentNode, event: MouseEvent): void {
        this.elements.tooltip.innerHTML = this.createTooltipContent(node);
        this.elements.tooltip.style.display = 'block';
        this.elements.tooltip.classList.add('show');
        
        // Position calculation
        const rect = this.elements.tooltip.getBoundingClientRect();
        let left = event.clientX + 20;
        let top = event.clientY + 20;
        
        if (left + rect.width > window.innerWidth - 8) left = Math.max(8, window.innerWidth - rect.width - 8);
        if (top + rect.height > window.innerHeight - 8) top = Math.max(8, window.innerHeight - rect.height - 8);
        if (left < 8) left = 8;
        if (top < 8) top = 8;
        
        this.elements.tooltip.style.left = `${left}px`;
        this.elements.tooltip.style.top = `${top}px`;
    }

    public hideTooltip(): void {
        this.elements.tooltip.classList.remove('show');
        setTimeout(() => { this.elements.tooltip.style.display = 'none'; }, 300);
    }
    
    public showSummaryTooltip(node: TalentNode, targetElement: HTMLElement): void {
        this.elements.summaryTooltip.innerHTML = `<h4>Effect</h4><p>${node.description}</p>`;
        const panelRect = this.elements.panel.getBoundingClientRect();
        const itemRect = targetElement.getBoundingClientRect();
        this.elements.summaryTooltip.style.top = `${itemRect.top}px`;
        this.elements.summaryTooltip.style.left = `${panelRect.right + 10}px`;
        this.elements.summaryTooltip.classList.add('show');
    }

    public hideSummaryTooltip(): void {
        this.elements.summaryTooltip.classList.remove('show');
    }
    
    private formatPathName(pathId: string): string {
        if (!pathId) return 'Unknown Path';
        return pathId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    private createTooltipContent(node: TalentNode): string {
        if (!this.state) return '';
        
        let statusClass = 'node-unallocated';
        let statusText = 'Unallocated';
        
        if (node.isAllocated) {
            statusClass = 'node-allocated';
            statusText = 'Allocated';
        } else if (node.isPermanentlyLocked) {
            statusClass = 'node-locked';
            statusText = 'Locked';
        } else if (node.isAllocatable) {
            statusClass = 'node-allocatable';
            statusText = 'Allocatable';
        } else if (node.isLocked) {
            statusClass = 'node-locked';
            statusText = 'Locked';
        }

        const prereqNodes = node.prerequisites
            .map(prereqId => this.state.talentTree.nodes.find(n => n.id === prereqId))
            .filter((n): n is TalentNode => n !== undefined);
            
        return `
          <div class="tooltip-container">
            <div class="tooltip-header">
              <h3 class="node-name">${node.name}</h3>
              <div class="node-meta">
                <span class="node-type">${node.type}</span>
                <span class="node-path">${this.formatPathName(node.path)}</span>
              </div>
            </div>
            <div class="tooltip-body">
              <div class="node-status-container"><span class="node-status ${statusClass}">${statusText}</span></div>
              <div class="node-description"><h4>Effect</h4><p>${node.description}</p></div>
              <div class="node-flavor"><h4>Philosophy</h4><p class="flavor-text">"${node.flavor}"</p></div>
              ${node.isPermanentlyLocked ? `<div class="node-warning"><h4>🚫 Permanently Locked</h4><p>A conflicting choice has locked this node.</p></div>` : ''}
              ${!node.isAllocatable && !node.isAllocated && !node.isPermanentlyLocked && prereqNodes.some(p => !p.isAllocated) ? `<div class="node-requirement"><h4>🔒 Locked by Prerequisite</h4><p>You must first allocate all prerequisite nodes.</p></div>` : ''}
              ${node.type === 'Schism' ? `<div class="node-warning"><h4>💀 Heretical Choice</h4><p>This will inflict a Philosophical Wound and lock the path's Capstone.</p></div>` : ''}
            </div>
            <div class="tooltip-footer">
              <div class="node-cost"><span class="cost-label">Cost:</span><span class="cost-value">${node.pkCost} PK</span></div>
              ${prereqNodes.length > 0 ? `<div class="node-prerequisites"><span class="prereq-label">Requires:</span><ul class="prereq-list">${prereqNodes.map(prereq => `<li class="${prereq.isAllocated ? 'met' : 'unmet'}">${prereq.name}</li>`).join('')}</ul></div>` : ''}
            </div>
          </div>
        `;
    }
} 