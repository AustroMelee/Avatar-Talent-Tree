/**
 * Creates a smoothly oscillating value between 0 and 1 using a sine wave.
 * @param time - The current time, e.g., Date.now().
 * @param speed - The speed of the oscillation.
 * @returns A number between 0 and 1.
 */
export function getPulseFactor(time: number, speed: number = 0.002): number {
    return (Math.sin(time * speed) + 1) / 2;
} 