/**
 * Asset Manager for Talent Tree
 * Handles loading and caching of image assets for Path of Exile style visuals
 */

export type AssetType = 
  | 'nodeFrame'
  | 'background'
  | 'uiFrame';

export type NodeFrameType = 
  | 'unallocated'
  | 'allocatable' 
  | 'allocated'
  | 'locked'
  | 'capstone'
  | 'schism'
  | 'covenant';

/**
 * Asset configuration for different node types and states
 */
export const ASSET_CONFIG = {
  nodeFrames: {
    unallocated: '/assets/images/node_frame_unallocated.svg',
    allocatable: '/assets/images/node_frame_allocatable.svg', 
    allocated: '/assets/images/node_frame_allocated.svg',
    locked: '/assets/images/node_frame_unallocated.svg', // Reuse unallocated for locked
    capstone: '/assets/images/node_frame_allocated.svg', // Reuse allocated for capstone
    schism: '/assets/images/node_frame_unallocated.svg', // Reuse unallocated for schism
    covenant: '/assets/images/node_frame_allocatable.svg' // Reuse allocatable for covenant
  },
  backgrounds: {
    main: '/assets/images/background_dark_texture.jpg',
    ui: '/assets/images/ui_background_texture.png'
  },
  uiFrames: {
    panel: '/assets/images/ui_frame_border.png'
  }
} as const;

/**
 * Manages loading and caching of image assets
 */
export class AssetManager {
  private loadedAssets = new Map<string, HTMLImageElement>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();
  private isInitialized = false;

  /**
   * Initializes the asset manager and loads all required assets
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const loadPromises: Promise<void>[] = [];

    // Load node frames
    Object.entries(ASSET_CONFIG.nodeFrames).forEach(([key, path]) => {
      loadPromises.push(this.loadAsset(`frame_${key}`, path));
    });

    // Load backgrounds
    Object.entries(ASSET_CONFIG.backgrounds).forEach(([key, path]) => {
      loadPromises.push(this.loadAsset(`bg_${key}`, path));
    });

    // Load UI frames
    Object.entries(ASSET_CONFIG.uiFrames).forEach(([key, path]) => {
      loadPromises.push(this.loadAsset(`ui_${key}`, path));
    });

    await Promise.all(loadPromises);
    this.isInitialized = true;
  }

  /**
   * Loads a single asset and caches it
   */
  private async loadAsset(key: string, path: string): Promise<void> {
    if (this.loadedAssets.has(key)) return;

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.warn(`Failed to load asset: ${path}`);
        // Create a fallback colored rectangle
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        
        // Create a fallback pattern based on the asset type
        if (key.startsWith('frame_')) {
          ctx.fillStyle = '#2a2a3a';
          ctx.fillRect(0, 0, 64, 64);
          ctx.strokeStyle = '#555';
          ctx.lineWidth = 2;
          ctx.strokeRect(4, 4, 56, 56);
        } else if (key.startsWith('bg_')) {
          ctx.fillStyle = '#0a0e1a';
          ctx.fillRect(0, 0, 64, 64);
          // Add some texture
          for (let i = 0; i < 10; i++) {
            ctx.fillStyle = `rgba(30, 30, 46, ${Math.random() * 0.3})`;
            ctx.fillRect(
              Math.random() * 64, 
              Math.random() * 64, 
              Math.random() * 20, 
              Math.random() * 20
            );
          }
        }
        
        const fallbackImg = new Image();
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.src = canvas.toDataURL();
      };
      img.src = path;
    });

    this.loadingPromises.set(key, promise);
    const img = await promise;
    this.loadedAssets.set(key, img);
  }

  /**
   * Gets a loaded asset by key
   */
  getAsset(key: string): HTMLImageElement | null {
    return this.loadedAssets.get(key) || null;
  }

  /**
   * Gets a node frame asset
   */
  getNodeFrame(type: NodeFrameType): HTMLImageElement | null {
    return this.getAsset(`frame_${type}`);
  }

  /**
   * Gets a background asset
   */
  getBackground(type: keyof typeof ASSET_CONFIG.backgrounds): HTMLImageElement | null {
    return this.getAsset(`bg_${type}`);
  }

  /**
   * Gets a UI frame asset
   */
  getUIFrame(type: keyof typeof ASSET_CONFIG.uiFrames): HTMLImageElement | null {
    return this.getAsset(`ui_${type}`);
  }

  /**
   * Checks if all assets are loaded
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Gets loading progress (0-1)
   */
  getLoadingProgress(): number {
    const total = this.loadingPromises.size;
    const loaded = this.loadedAssets.size;
    return total > 0 ? loaded / total : 1;
  }
}

/**
 * Global asset manager instance
 */
export const assetManager = new AssetManager(); 