import { TalentTreeRenderer } from '../talentTreeRenderer';
import { TalentTreeManager } from '../talentTreeManager';
import { assetManager } from '../assetManager';
import { UIManager } from '../ui/uiManager';
import { DataManager } from './dataManager';
import { EventHandler } from './eventHandler';
import type { RenderConfig } from '../types';
import type { PresetBuild } from '../types';

export class AppController {
    private canvas: HTMLCanvasElement;
    private renderer: TalentTreeRenderer;
    private manager: TalentTreeManager;
    private uiManager: UIManager;
    private dataManager: DataManager;
    private eventHandler: EventHandler;

    private animationFrameId: number | null = null;
    private visualEffects = new Map<string, { type: string; startTime: number; duration: number }>();
    private currentElement: string = 'air';

    constructor() {
        this.canvas = document.getElementById('talent-tree-canvas') as HTMLCanvasElement;
        
        this.initializeComponents().then(() => {
            this.startRenderLoop();
            requestAnimationFrame(() => this.centerViewOnLoad());
        }).catch(console.error);
    }

    private async initializeComponents(): Promise<void> {
        await assetManager.initialize();
        
        const renderConfig: RenderConfig = {
            canvas: this.canvas,
            ctx: this.canvas.getContext('2d')!,
            debug: false
        };
        
        this.renderer = new TalentTreeRenderer(renderConfig);
        this.resizeCanvas();

        this.manager = new TalentTreeManager();
        this.uiManager = new UIManager();
        this.dataManager = new DataManager();
        this.eventHandler = new EventHandler(this.canvas, this.renderer, this.manager, this.uiManager, this);

        this.manager.subscribe((state) => this.uiManager.update(state));
        this.eventHandler.initialize();
        
        this.switchToElement(this.currentElement);
    }
    
    public switchToElement(elementId: string): void {
        this.currentElement = elementId;
        
        const elementalData = this.dataManager.loadElementalData(elementId);
        if (!elementalData) return;

        const { nodes, connections, presets, constellation } = elementalData;

        this.manager.loadTalentTree({
            nodes: nodes,
            connections: connections,
            totalPK: 999, // From types.ts
            spentPK: 0,
            allocatedNodes: new Set(),
            covenant: null,
            philosophicalWounds: [],
            metadata: {
                name: constellation.name,
                description: constellation.description,
                background: elementId,
            }
        });
        
        this.uiManager.updateElementalSelector(elementId);
        this.uiManager.populatePresets(presets, (preset) => this.applyPreset(preset));
        this.uiManager.setActivePreset(null);
        
        this.centerViewOnLoad();
    }
    
    public resetTree(): void {
        this.manager.resetPoints();
        this.uiManager.setActivePreset(null);
        this.centerViewOnLoad();
    }
    
    public clearPreset(): void {
        this.manager.resetPoints();
        this.uiManager.setActivePreset(null);
    }
    
    public applyPreset(preset: PresetBuild): void {
        this.uiManager.setActivePreset(preset);
        this.manager.applyPresetBuild(preset.nodeIds);
        this.centerViewOnLoad();
    }

    public handleNodeClick(nodeId: string): void {
        const node = this.manager.getState().talentTree.nodes.find(n => n.id === nodeId);
        if (!node) return;

        const wasAllocatable = node.isAllocatable && !node.isAllocated;
        this.manager.handleNodeClick(nodeId);
        
        const updatedNode = this.manager.getState().talentTree.nodes.find(n => n.id === nodeId);
        if (wasAllocatable && updatedNode?.isAllocated) {
            this.visualEffects.set(nodeId, {
                type: 'allocate_flash',
                startTime: Date.now(),
                duration: 600
            });
        }
        
        // If a node was manually allocated, clear any active preset
        if (this.manager.getState().talentTree.allocatedNodes.size > 0) {
            this.uiManager.setActivePreset(null);
        }
    }

    public focusOnNode(nodeId: string): void {
        const node = this.manager.getState().talentTree.nodes.find(n => n.id === nodeId);
        if (!node) return;
        const targetZoom = 1.2;
        const canvasCenter = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
        this.manager.setZoom(targetZoom);
        const newPan = {
            x: canvasCenter.x - (node.position.x * targetZoom),
            y: canvasCenter.y - (node.position.y * targetZoom),
        };
        this.manager.setPan(newPan);
    }
    
    public resizeCanvas(): void {
        const dpr = window.devicePixelRatio || 1;
        const container = this.canvas.parentElement!;
        const rect = container.getBoundingClientRect();
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
        const newWidth = Math.round(rect.width * dpr);
        const newHeight = Math.round(rect.height * dpr);
        if (this.canvas.width !== newWidth || this.canvas.height !== newHeight) {
            this.canvas.width = newWidth;
            this.canvas.height = newHeight;
            this.renderer.updateViewport(newWidth, newHeight, dpr);
        }
    }
    
    public getCurrentElement(): string {
        return this.currentElement;
    }

    private centerViewOnLoad(): void {
        const { nodes } = this.manager.getState().talentTree;
        const visibleNodes = nodes.filter(node => node.isVisible);
        if (visibleNodes.length === 0) return;

        const minX = Math.min(...visibleNodes.map(n => n.position.x));
        const maxX = Math.max(...visibleNodes.map(n => n.position.x));
        const minY = Math.min(...visibleNodes.map(n => n.position.y));
        const maxY = Math.max(...visibleNodes.map(n => n.position.y));
        
        const treeCenter = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
        const canvasCenter = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
        const initialZoom = 0.35;
        this.manager.setZoom(initialZoom);
        this.manager.setPan({
            x: canvasCenter.x - treeCenter.x * initialZoom,
            y: canvasCenter.y - treeCenter.y * initialZoom
        });
    }

    private startRenderLoop(): void {
        const loop = () => {
            const state = this.manager.getState();
            
            const visualEffectsMap = new Map<string, { type: string; progress: number }>();
            const now = Date.now();
            this.visualEffects.forEach((effect, nodeId) => {
                const elapsed = now - effect.startTime;
                const progress = Math.min(elapsed / effect.duration, 1);
                if (progress < 1) {
                    visualEffectsMap.set(nodeId, { type: effect.type, progress });
                } else {
                    this.visualEffects.delete(nodeId);
                }
            });

            this.renderer.render(state.talentTree, state.zoom, state.pan, state.hoveredNode, visualEffectsMap);
            
            this.animationFrameId = requestAnimationFrame(loop);
        };
        loop();
    }
} 