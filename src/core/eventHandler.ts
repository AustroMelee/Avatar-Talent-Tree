import type { Point, TalentNode } from '../types';
import type { TalentTreeRenderer } from '../talentTreeRenderer';
import type { TalentTreeManager } from '../talentTreeManager';
import type { UIManager } from '../ui/uiManager';
import type { AppController } from './appController';

export class EventHandler {
    private canvas: HTMLCanvasElement;
    private renderer: TalentTreeRenderer;
    private manager: TalentTreeManager;
    private uiManager: UIManager;
    private app: AppController;
    
    private isDragging = false;
    private lastMousePos: Point = { x: 0, y: 0 };

    constructor(
        canvas: HTMLCanvasElement, 
        renderer: TalentTreeRenderer, 
        manager: TalentTreeManager, 
        uiManager: UIManager,
        app: AppController
    ) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.manager = manager;
        this.uiManager = uiManager;
        this.app = app;
    }

    public initialize(): void {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        this.canvas.addEventListener('contextmenu', this.handleContextMenu.bind(this));
        this.canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        
        window.addEventListener('resize', this.handleResize.bind(this));

        // UI Panel Listeners
        document.getElementById('elemental-selector')?.addEventListener('click', (event) => {
            const elementBtn = (event.target as HTMLElement).closest('.element-btn');
            if (elementBtn) {
                const elementId = elementBtn.getAttribute('data-element');
                if (elementId && elementId !== this.app.getCurrentElement()) {
                    this.app.switchToElement(elementId);
                }
            }
        });

        document.getElementById('reset-btn')?.addEventListener('click', () => this.app.resetTree());
        document.getElementById('clear-preset-btn')?.addEventListener('click', () => this.app.clearPreset());

        document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
            const center = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
            this.manager.setZoomAtPosition(this.manager.getState().zoom * 1.2, center);
        });
        document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
            const center = { x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2 };
            this.manager.setZoomAtPosition(this.manager.getState().zoom * 0.8, center);
        });
        
        // Build Summary Listeners
        const buildSummary = document.getElementById('build-summary');
        buildSummary?.addEventListener('click', (event) => {
            const listItem = (event.target as HTMLElement).closest('li[data-node-id]');
            if (listItem) {
                const nodeId = listItem.getAttribute('data-node-id');
                if (nodeId) this.app.focusOnNode(nodeId);
            }
        });

        buildSummary?.addEventListener('mouseover', (event) => {
            const listItem = (event.target as HTMLElement).closest('li[data-node-id]');
            const node = this.getNodeFromEventTarget(listItem);
            if (node && listItem) this.uiManager.showSummaryTooltip(node, listItem as HTMLElement);
        });

        buildSummary?.addEventListener('mouseout', () => this.uiManager.hideSummaryTooltip());
    }
    
    private getMouseWorldPosition(event: MouseEvent): Point {
        const state = this.manager.getState();
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const worldX = (mouseX - state.pan.x) / state.zoom;
        const worldY = (mouseY - state.pan.y) / state.zoom;
        return { x: worldX, y: worldY };
    }

    private getNodeFromEventTarget(target: EventTarget | null): TalentNode | null {
        if (!target) return null;
        const nodeId = (target as HTMLElement)?.getAttribute('data-node-id');
        return nodeId ? this.manager.getState().talentTree.nodes.find(n => n.id === nodeId) ?? null : null;
    }

    private handleMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.lastMousePos = { x: event.clientX, y: event.clientY };
        this.canvas.style.cursor = 'grabbing';
    }

    private handleMouseMove(event: MouseEvent): void {
        const state = this.manager.getState();
        if (this.isDragging) {
            const deltaX = event.clientX - this.lastMousePos.x;
            const deltaY = event.clientY - this.lastMousePos.y;
            this.manager.panBy({ x: deltaX, y: deltaY });
            this.lastMousePos = { x: event.clientX, y: event.clientY };
        } else {
            const worldPos = this.getMouseWorldPosition(event);
            const hoveredNode = this.renderer.findNodeAtPosition(worldPos, state.talentTree.nodes);
            this.manager.setHoveredNode(hoveredNode ? hoveredNode.id : null);
            this.canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
            if (hoveredNode) this.uiManager.showTooltip(hoveredNode, event);
            else this.uiManager.hideTooltip();
        }
    }

    private handleMouseUp(): void {
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }

    private handleMouseLeave(): void {
        if (this.isDragging) this.isDragging = false;
        this.canvas.style.cursor = 'grab';
        this.manager.setHoveredNode(null);
        this.uiManager.hideTooltip();
    }

    private handleClick(event: MouseEvent): void {
        if (event.button !== 0) return;
        const state = this.manager.getState();
        const worldPos = this.getMouseWorldPosition(event);
        const clickedNode = this.renderer.findNodeAtPosition(worldPos, state.talentTree.nodes);
        if (clickedNode) {
            this.app.handleNodeClick(clickedNode.id);
        }
    }

    private handleContextMenu(event: MouseEvent): void {
        event.preventDefault();
        const state = this.manager.getState();
        const worldPos = this.getMouseWorldPosition(event);
        const node = this.renderer.findNodeAtPosition(worldPos, state.talentTree.nodes);
        if (node && node.isAllocated) {
            this.manager.removePoint(node.id);
        }
    }

    private handleWheel(event: WheelEvent): void {
        event.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        this.manager.setZoomAtPosition(this.manager.getState().zoom * zoomFactor, mousePos);
    }

    private handleResize(): void {
        this.app.resizeCanvas();
    }
} 