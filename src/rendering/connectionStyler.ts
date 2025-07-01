import type { TalentNode, TalentConnection } from '../types';

interface DashStyle {
    pattern: [number, number];
    speed: number;
    color: string;
    width: number;
    shadow: string;
    shadowBlur: number;
}

export interface ConnectionStyle {
    base: string;
    highlight: string;
    baseWidth: number;
    highlightWidth: number;
    shadow: string;
    shadowBlur: number;
    dash?: DashStyle;
}

class ConnectionStyler {
    public getStyle(connection: TalentConnection, toNode: TalentNode, isHovered: boolean): ConnectionStyle {
        const style: ConnectionStyle = {
            base: 'rgba(49, 50, 68, 0.5)',
            highlight: '#6c7086',
            baseWidth: 4,
            highlightWidth: 1.5,
            shadow: '#313244',
            shadowBlur: 0,
        };

        if (connection.isActive) {
            style.base = 'rgba(137, 180, 250, 0.4)';
            style.highlight = '#cdd6f4';
            style.baseWidth = 8;
            style.highlightWidth = 3;
            style.shadow = '#89b4fa';
            style.shadowBlur = isHovered ? 20 : 12;
            style.dash = {
                pattern: [32, 24], speed: 40, color: 'rgba(249, 226, 175, 0.85)',
                width: style.highlightWidth + 2, shadow: '#f9e2af', shadowBlur: 12,
            };
        } else if (toNode.isAllocatable || isHovered) {
            style.base = 'rgba(108, 112, 134, 0.4)';
            style.highlight = '#a6adc8';
            style.baseWidth = 6;
            style.highlightWidth = 2;
            style.shadow = '#a6adc8';
            style.shadowBlur = isHovered ? 12 : 6;
        }
        
        if (isHovered && !connection.isActive) {
             style.dash = {
                pattern: [20, 15], speed: 30, color: 'rgba(203, 166, 247, 0.9)',
                width: 4, shadow: '#cba6f7', shadowBlur: 15,
            };
        }

        return style;
    }
}

export const connectionStyler = new ConnectionStyler(); 