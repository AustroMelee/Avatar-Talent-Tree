import type { TalentNode } from '../types';

// The massive icon map is now cleanly separated from rendering logic.
const NODE_ICON_MAP: Record<string, string> = {
    // Gentle Breeze
    'gentle_breeze_genesis': '🦋', 'gentle_breeze_keystone': '🛡️', 'gentle_breeze_manifestation': '💨', 'gentle_breeze_axiom': '✨', 'gentle_breeze_capstone': '🌟', 'gentle_breeze_gnosticrite': '☯️', 'gentle_breeze_schism': '💥', 'gentle_breeze_minor': '🦋',
    // Sacred Breath
    'sacred_breath_genesis': '🦬', 'sacred_breath_keystone': '⚜️', 'sacred_breath_manifestation': '🕯️', 'sacred_breath_axiom': '🕊️', 'sacred_breath_capstone': '💙💫', 'sacred_breath_gnosticrite': '☯️', 'sacred_breath_schism': '💔', 'sacred_breath_minor': '🦋',
    // Wild Gale
    'wild_gale_genesis': '🐉', 'wild_gale_keystone': '💥', 'wild_gale_manifestation': '⚡', 'wild_gale_axiom': '⚔️', 'wild_gale_capstone': '💀', 'wild_gale_gnosticrite': '☯️', 'wild_gale_schism': '🌪️', 'wild_gale_minor': '💨',
    // Dancing Wind
    'dancing_wind_genesis': '🦋', 'dancing_wind_keystone': '🏃', 'dancing_wind_manifestation': '🛴', 'dancing_wind_axiom': '🦅', 'dancing_wind_capstone': '🦅', 'dancing_wind_gnosticrite': '☯️', 'dancing_wind_schism': '☁️', 'dancing_wind_minor': '🦋',
    // Hun Yuan (Neutral Jing)
    'hun_yuan_genesis': '👂', 'hun_yuan_keystone': '🛡️', 'hun_yuan_manifestation': '🧱', 'hun_yuan_axiom': '⛰️', 'hun_yuan_capstone': '🧘', 'hun_yuan_gnosticrite': '🙏', 'hun_yuan_schism': '💥', 'hun_yuan_minor': '🪨',
    // Bian Hua (Transformation)
    'bian_hua_genesis': '↔️', 'bian_hua_keystone': '🔥', 'bian_hua_manifestation': '⛓️', 'bian_hua_axiom': '⏳', 'bian_hua_capstone': '🌋', 'bian_hua_gnosticrite': '🙏', 'bian_hua_schism': '☣️', 'bian_hua_minor': '🪨',
    // Gang Qiang (Unyielding Strength)
    'gang_qiang_genesis': '👊', 'gang_qiang_keystone': '💪', 'gang_qiang_manifestation': '🌋', 'gang_qiang_axiom': '🏋️', 'gang_qiang_capstone': '🗿', 'gang_qiang_gnosticrite': '🙏', 'gang_qiang_schism': '💔', 'gang_qiang_minor': '🪨',
    // Jing Que (Precision Control)
    'jing_que_genesis': '🤌', 'jing_que_keystone': '👌', 'jing_que_manifestation': '🏗️', 'jing_que_axiom': '✍️', 'jing_que_capstone': '🏛️', 'jing_que_gnosticrite': '🙏', 'jing_que_schism': '🥀', 'jing_que_minor': '🪨',
    // Raging Inferno (Fire)
    'raging_inferno_genesis': '🔥', 'raging_inferno_keystone': '💥', 'raging_inferno_manifestation': '☄️', 'raging_inferno_axiom': '☢️', 'raging_inferno_capstone': '👑', 'raging_inferno_gnosticrite': '🙏', 'raging_inferno_schism': '☠️', 'raging_inferno_minor': '🔥',
    // Inner Sun (Fire)
    'inner_sun_genesis': '☀️', 'inner_sun_keystone': '🔥', 'inner_sun_manifestation': '🕉️', 'inner_sun_axiom': '✨', 'inner_sun_capstone': '👑', 'inner_sun_gnosticrite': '🙏', 'inner_sun_schism': '☠️', 'inner_sun_minor': '🔥',
    // Focused Flame (Fire)
    'focused_flame_genesis': '🔥', 'focused_flame_keystone': '⚔️', 'focused_flame_manifestation': '🛡️', 'focused_flame_axiom': '💎', 'focused_flame_capstone': '👑', 'focused_flame_gnosticrite': '🙏', 'focused_flame_schism': '☠️', 'focused_flame_minor': '🔥',
    // Cold Tempest (Fire)
    'cold_tempest_genesis': '⚡', 'cold_tempest_keystone': '🌩️', 'cold_tempest_manifestation': '💫', 'cold_tempest_axiom': '🌀', 'cold_tempest_capstone': '👑', 'cold_tempest_gnosticrite': '🙏', 'cold_tempest_schism': '☠️', 'cold_tempest_minor': '⚡',
    // Mastermind (Steel)
    'mastermind_genesis': '🧠', 'mastermind_keystone': '⚙️', 'mastermind_manifestation': '🤖', 'mastermind_axiom': '🏗️', 'mastermind_capstone': '👑', 'mastermind_gnosticrite': '🙏', 'mastermind_schism': '💔', 'mastermind_minor': '🧠',
    // Innovator (Steel)
    'innovator_genesis': '⚙️', 'innovator_keystone': '🔧', 'innovator_manifestation': '🛠️', 'innovator_axiom': '🤖', 'innovator_capstone': '👑', 'innovator_gnosticrite': '🙏', 'innovator_schism': '💔', 'innovator_minor': '⚙️',
    // Paragon (Steel)
    'paragon_genesis': '🏃', 'paragon_keystone': '🤸', 'paragon_manifestation': '🧘', 'paragon_axiom': '⚡', 'paragon_capstone': '👑', 'paragon_gnosticrite': '🙏', 'paragon_schism': '💔', 'paragon_minor': '🏃',
    // Arsenal (Steel)
    'arsenal_genesis': '⚔️', 'arsenal_keystone': '🏹', 'arsenal_manifestation': '🗡️', 'arsenal_axiom': '🎯', 'arsenal_capstone': '👑', 'arsenal_gnosticrite': '🙏', 'arsenal_schism': '💔', 'arsenal_minor': '⚔️',
    // Generic Fallbacks
    'bridge': '🌉', 'synthesis': '⚛️', 'default': '●'
};

class IconManager {
    private imageCache: Record<string, HTMLImageElement> = {};

    private getIconString(node: TalentNode): string {
        if (node.visual?.icon) {
            return node.visual.icon;
        }
        return NODE_ICON_MAP[`${node.path}_${node.type.toLowerCase()}`] 
            || NODE_ICON_MAP[`${node.path}_minor`] 
            || NODE_ICON_MAP.default;
    }

    public drawIcon(ctx: CanvasRenderingContext2D, node: TalentNode, opacity: number, nodeSize: number): void {
        const iconString = this.getIconString(node);
        const isImage = iconString.endsWith('.svg') || iconString.endsWith('.png');
        const iconSize = nodeSize * (node.type === 'Minor' ? 0.7 : 0.6);
        
        ctx.globalAlpha = opacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (isImage) {
            this.drawImageIcon(ctx, iconString, node.position.x, node.position.y, iconSize);
        } else {
            this.drawEmojiIcon(ctx, iconString, node.position.x, node.position.y, iconSize);
        }
    }

    private drawEmojiIcon(ctx: CanvasRenderingContext2D, emoji: string, x: number, y: number, size: number): void {
        ctx.font = `${size}px sans-serif`;
        ctx.fillStyle = '#cdd6f4';
        ctx.fillText(emoji, x, y);
    }

    private drawImageIcon(ctx: CanvasRenderingContext2D, path: string, x: number, y: number, size: number): void {
        let img = this.imageCache[path];
        if (!img) {
            img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        }

        if (img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        } else {
            // Fallback while loading
            this.drawEmojiIcon(ctx, '⭐', x, y, size);
            img.onload = () => { /* The render loop will pick it up next frame */ };
        }
    }
}

export const iconManager = new IconManager(); 