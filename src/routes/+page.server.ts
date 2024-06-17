import { getEvents } from '$lib/data/events.server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        events: getEvents(),
    };
}) satisfies PageServerLoad;