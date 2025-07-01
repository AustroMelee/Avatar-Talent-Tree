import type { TalentNode } from '../types';
import { getPulseFactor } from './animationUtils';

export type NodeDrawState = 'allocated' | 'allocatable' | 'locked' | 'permanently_locked';

export interface NodeStyle {
    size: number;
    fill: string;
    outline: string;
    outlineWidth: number;
    shadow: string;
    shadowBlur: number;
    iconOpacity: number;
    innerRingColor?: string;
}

class NodeStyler {
    public getSize(node: TalentNode): number {
        switch (node.type) {
            case 'Axiom': return 80;
            case 'Genesis': return 150;
            case 'Manifestation': return 65;
            case 'Synthesis': return 60;
            case 'Keystone': return 55;
            case 'Minor': return 35;
            default: return 40;
        }
    }

    public getStyle(node: TalentNode, state: NodeDrawState, isHovered: boolean, animationTime: number): NodeStyle {
        let size = this.getSize(node);
        const isMajorNode = ['Genesis', 'Capstone', 'Axiom', 'Schism', 'Manifestation'].includes(node.type);
        const style: NodeStyle = {
            size,
            fill: '#181825',
            outline: '#45475a',
            outlineWidth: 2,
            shadow: 'black',
            shadowBlur: 0,
            iconOpacity: 0.2,
            innerRingColor: isMajorNode ? 'rgba(108, 112, 134, 0.4)' : undefined
        };

        switch (state) {
            case 'allocated': {
                const pulse = getPulseFactor(animationTime);
                style.size += (pulse * 4);
                style.fill = '#1e1e2e';
                style.outline = '#a6e3a1';
                style.outlineWidth = 3.5;
                style.shadow = '#a6e3a1';
                style.shadowBlur = 15 + (pulse * 10);
                style.iconOpacity = 1.0;
                style.innerRingColor = 'rgba(249, 226, 175, 0.5)';
                break;
            }
            case 'allocatable':
                style.outline = '#f9e2af';
                style.shadow = '#f9e2af';
                style.shadowBlur = 15;
                style.iconOpacity = 0.9;
                break;

            case 'permanently_locked':
                style.outline = '#e64553';
                style.shadow = '#e64553';
                style.shadowBlur = 10;
                style.iconOpacity = 0.4;
                break;
        }

        if (isHovered) {
            if (state === 'locked' || state === 'allocatable') {
                style.outline = `rgba(249, 226, 175, ${0.7 + (Math.sin(animationTime * 0.01) * 0.3)})`;
                style.shadow = '#f9e2af';
                style.shadowBlur = state === 'allocatable' ? 30 : 15;
                style.iconOpacity = state === 'locked' ? 0.8 : 1.0;
            }
        }
        
        return style;
    }
}

export const nodeStyler = new NodeStyler(); 