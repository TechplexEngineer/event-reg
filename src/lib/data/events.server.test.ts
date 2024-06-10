import { describe, test, expect } from 'vitest';
import { getEventBySlug } from './events.server';

describe('getEventBySlug', async (test) => {
    const event = await getEventBySlug('nerd24');

    test('should return the correct event when the slug exists', () => {
        expect(event).toBeDefined();
        expect(event!.name).toBe('New England Robotics Derby');
        expect(event!.dateStr).toBe('October 12, 2024');
        expect(event!.eventSlug).toBe('nerd24');
        expect(event!.program).toBe('FRC');
    });

    test('should return undefined when the slug does not exist', async () => {
        const nonExistentEvent = await getEventBySlug('nonexistent');
        expect(nonExistentEvent).toBeUndefined();
    });
});

