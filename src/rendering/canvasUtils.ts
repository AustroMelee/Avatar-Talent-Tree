import type { Point, TalentNode } from '../types';
import type { ConnectionStyle } from './connectionStyler';

/**
 * Draws a straight line connection between two nodes.
 * Used for showing available progression paths.
 * @param ctx - The canvas rendering context.
 * @param fromNode - The starting node.
 * @param toNode - The ending node.
 * @param style - The style object for the connection.
 */
export function drawStraightConnection(ctx: CanvasRenderingContext2D, fromNode: TalentNode, toNode: TalentNode, style: ConnectionStyle): void {
    ctx.save();
    
    // Base line
    ctx.beginPath();
    ctx.moveTo(fromNode.position.x, fromNode.position.y);
    ctx.lineTo(toNode.position.x, toNode.position.y);
    ctx.lineCap = 'round';
    ctx.strokeStyle = style.base;
    ctx.lineWidth = style.baseWidth;
    ctx.shadowColor = style.shadow;
    ctx.shadowBlur = style.shadowBlur;
    ctx.stroke();

    // Highlight line
    ctx.strokeStyle = style.highlight;
    ctx.lineWidth = style.highlightWidth;
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Animated dashes for active or hovered connections
    if (style.dash) {
        ctx.setLineDash(style.dash.pattern);
        ctx.lineDashOffset = -(Date.now() / style.dash.speed) % (style.dash.pattern[0] + style.dash.pattern[1]);
        ctx.strokeStyle = style.dash.color;
        ctx.lineWidth = style.dash.width;
        ctx.shadowColor = style.dash.shadow;
        ctx.shadowBlur = style.dash.shadowBlur;
        ctx.stroke();
    }
    
    ctx.restore();
}

/**
 * Calculates the control point for a quadratic bezier curve between two nodes.
 * Used for "spoke" connections.
 * @param fromNode - The starting node.
 * @param toNode - The ending node.
 * @returns The control point for the curve.
 */
export function getCurveControlPoint(fromNode: TalentNode, toNode: TalentNode): Point {
    const { x: fromX, y: fromY } = fromNode.position;
    const { x: toX, y: toY } = toNode.position;

    const midPoint = { x: (fromX + toX) / 2, y: (fromY + toY) / 2 };
    const dx = toX - fromX;
    const dy = toY - fromY;
    
    // Perpendicular vector
    const perp = { x: -dy, y: dx };
    const perpLength = Math.hypot(perp.x, perp.y);
    // Avoid division by zero for overlapping nodes
    const normPerp = perpLength > 0 ? { x: perp.x / perpLength, y: perp.y / perpLength } : { x: 0, y: 0 };

    // Determine curve amount based on node types and distance
    const dist = Math.hypot(dx, dy);
    const curveFactor = (fromNode.type === 'Minor' && toNode.type === 'Minor') ? 0.05 : 0.1;
    const curveAmount = dist * curveFactor;

    return {
        x: midPoint.x + curveAmount * normPerp.x,
        y: midPoint.y + curveAmount * normPerp.y,
    };
}

/**
 * Validates whether a connection should use arc rendering.
 * Only allows arcs between major nodes on the same ring with adjacent angles.
 * @param fromNode - The starting node.
 * @param toNode - The ending node.
 * @returns True if the connection should use arc rendering.
 */
export function isLegalArc(fromNode: TalentNode, toNode: TalentNode): boolean {
    // Must have ringId and be on the same ring
    if (!fromNode.ringId || !toNode.ringId || fromNode.ringId !== toNode.ringId) {
        return false;
    }
    
    // Must have valid angles
    if (fromNode.angle === undefined || toNode.angle === undefined) {
        return false;
    }
    
    // Only major nodes can form arcs (no minors on rings)
    const majorTypes = new Set(['Genesis', 'Keystone', 'Manifestation', 'Axiom', 'Capstone', 'Schism', 'Synthesis']);
    if (!majorTypes.has(fromNode.type) || !majorTypes.has(toNode.type)) {
        return false;
    }
    
    // Only allow short arcs (not crossing the center)
    const angleDiff = Math.abs(fromNode.angle - toNode.angle);
    const normalizedDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
    
    // Allow arcs up to π radians (180 degrees) for adjacent paths
    // This allows connections between neighboring paths on the same ring
    if (normalizedDiff > Math.PI) {
        return false;
    }
    
    return true;
}

/**
 * Draws a curved arc between two nodes on the same ring.
 * Used for "ring" connections that follow the circumference.
 * @param ctx - The canvas rendering context.
 * @param center - The center of the constellation.
 * @param fromNode - The starting node.
 * @param toNode - The ending node.
 * @param style - The style object for the connection.
 */
export function drawArcConnection(ctx: CanvasRenderingContext2D, center: Point, fromNode: TalentNode, toNode: TalentNode, style: ConnectionStyle): void {
    if (fromNode.radius === undefined || fromNode.angle === undefined || toNode.angle === undefined) return;
    
    // Calculate the shortest arc direction
    let startAngle = fromNode.angle;
    let endAngle = toNode.angle;
    let delta = endAngle - startAngle;
    
    // Normalize angles to ensure we take the shortest path
    if (Math.abs(delta) > Math.PI) {
        if (delta > 0) {
            endAngle -= 2 * Math.PI;
        } else {
            endAngle += 2 * Math.PI;
        }
    }
    
    // Determine if we need to go clockwise or counterclockwise
    const isClockwise = endAngle > startAngle;
    
    ctx.save();
    
    // Base arc line
    ctx.beginPath();
    ctx.arc(center.x, center.y, fromNode.radius, startAngle, endAngle, !isClockwise);
    ctx.strokeStyle = style.base;
    ctx.lineWidth = style.baseWidth;
    ctx.lineCap = 'round';
    ctx.shadowColor = style.shadow;
    ctx.shadowBlur = style.shadowBlur;
    ctx.stroke();

    // Highlight arc line
    ctx.beginPath();
    ctx.arc(center.x, center.y, fromNode.radius, startAngle, endAngle, !isClockwise);
    ctx.strokeStyle = style.highlight;
    ctx.lineWidth = style.highlightWidth;
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Animated dashes for active or hovered connections
    if (style.dash) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, fromNode.radius, startAngle, endAngle, !isClockwise);
        ctx.setLineDash(style.dash.pattern);
        ctx.lineDashOffset = -(Date.now() / style.dash.speed) % (style.dash.pattern[0] + style.dash.pattern[1]);
        ctx.strokeStyle = style.dash.color;
        ctx.lineWidth = style.dash.width;
        ctx.shadowColor = style.dash.shadow;
        ctx.shadowBlur = style.dash.shadowBlur;
        ctx.stroke();
    }
    
    ctx.restore();
} 