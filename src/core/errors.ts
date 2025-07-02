/**
 * Custom error classes for the talent tree system
 * Provides structured error handling with context and debugging information
 */

/**
 * Base error class for all talent tree related errors
 */
export class TalentTreeError extends Error {
    public readonly errorCode: string;
    public readonly context: Record<string, any>;

    constructor(message: string, errorCode: string, context: Record<string, any> = {}) {
        super(message);
        this.name = 'TalentTreeError';
        this.errorCode = errorCode;
        this.context = context;
    }

    /**
     * Creates a formatted error message with context
     * @returns Formatted error string
     */
    public getFormattedMessage(): string {
        const contextStr = Object.keys(this.context).length > 0 
            ? ` Context: ${JSON.stringify(this.context)}`
            : '';
        return `${this.name} [${this.errorCode}]: ${this.message}${contextStr}`;
    }
}

/**
 * Error thrown when rendering operations fail
 */
export class RenderError extends TalentTreeError {
    constructor(message: string, context: Record<string, any> = {}) {
        super(message, 'RENDER_ERROR', context);
        this.name = 'RenderError';
    }
}

/**
 * Error thrown when node operations fail
 */
export class NodeError extends TalentTreeError {
    constructor(message: string, nodeId?: string, context: Record<string, any> = {}) {
        const fullContext = { ...context, nodeId };
        super(message, 'NODE_ERROR', fullContext);
        this.name = 'NodeError';
    }
}

/**
 * Error thrown when connection operations fail
 */
export class ConnectionError extends TalentTreeError {
    constructor(message: string, fromNodeId?: string, toNodeId?: string, context: Record<string, any> = {}) {
        const fullContext = { ...context, fromNodeId, toNodeId };
        super(message, 'CONNECTION_ERROR', fullContext);
        this.name = 'ConnectionError';
    }
}

/**
 * Error thrown when icon operations fail
 */
export class IconError extends TalentTreeError {
    constructor(message: string, iconPath?: string, context: Record<string, any> = {}) {
        const fullContext = { ...context, iconPath };
        super(message, 'ICON_ERROR', fullContext);
        this.name = 'IconError';
    }
}

/**
 * Error thrown when canvas operations fail
 */
export class CanvasError extends TalentTreeError {
    constructor(message: string, context: Record<string, any> = {}) {
        super(message, 'CANVAS_ERROR', context);
        this.name = 'CanvasError';
    }
}

/**
 * Error thrown when state management operations fail
 */
export class StateError extends TalentTreeError {
    constructor(message: string, context: Record<string, any> = {}) {
        super(message, 'STATE_ERROR', context);
        this.name = 'StateError';
    }
}

/**
 * Error thrown when preset operations fail
 */
export class PresetError extends TalentTreeError {
    constructor(message: string, presetName?: string, context: Record<string, any> = {}) {
        const fullContext = { ...context, presetName };
        super(message, 'PRESET_ERROR', fullContext);
        this.name = 'PresetError';
    }
}

/**
 * Error thrown when point allocation operations fail
 */
export class AllocationError extends TalentTreeError {
    constructor(message: string, nodeId?: string, points?: number, context: Record<string, any> = {}) {
        const fullContext = { ...context, nodeId, points };
        super(message, 'ALLOCATION_ERROR', fullContext);
        this.name = 'AllocationError';
    }
}

/**
 * Error thrown when data validation fails
 */
export class ValidationError extends TalentTreeError {
    constructor(message: string, field?: string, value?: any, context: Record<string, any> = {}) {
        const fullContext = { ...context, field, value };
        super(message, 'VALIDATION_ERROR', fullContext);
        this.name = 'ValidationError';
    }
}

/**
 * Error thrown when file operations fail
 */
export class FileError extends TalentTreeError {
    constructor(message: string, filePath?: string, context: Record<string, any> = {}) {
        const fullContext = { ...context, filePath };
        super(message, 'FILE_ERROR', fullContext);
        this.name = 'FileError';
    }
}

/**
 * Error thrown when network operations fail
 */
export class NetworkError extends TalentTreeError {
    constructor(message: string, url?: string, statusCode?: number, context: Record<string, any> = {}) {
        const fullContext = { ...context, url, statusCode };
        super(message, 'NETWORK_ERROR', fullContext);
        this.name = 'NetworkError';
    }
}

/**
 * Utility function to create error messages with template substitution
 * @param template - Error message template with {placeholder} syntax
 * @param values - Object with values to substitute
 * @returns Formatted error message
 */
export function formatErrorMessage(template: string, values: Record<string, any>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return values[key] !== undefined ? String(values[key]) : match;
    });
}

/**
 * Utility function to log errors in a consistent format
 * @param error - The error to log
 * @param level - Log level (error, warn, info, debug)
 * @param additionalContext - Additional context to include
 */
export function logError(
    error: TalentTreeError, 
    level: 'error' | 'warn' | 'info' | 'debug' = 'error',
    additionalContext: Record<string, any> = {}
): void {
    const logData = {
        timestamp: new Date().toISOString(),
        level,
        errorCode: error.errorCode,
        message: error.message,
        context: { ...error.context, ...additionalContext },
        stack: error.stack
    };

    const logMessage = `[${logData.timestamp}] ${logData.level.toUpperCase()}: ${error.getFormattedMessage()}`;

    switch (level) {
        case 'error':
            console.error(logMessage, logData);
            break;
        case 'warn':
            console.warn(logMessage, logData);
            break;
        case 'info':
            console.info(logMessage, logData);
            break;
        case 'debug':
            console.debug(logMessage, logData);
            break;
    }
} 