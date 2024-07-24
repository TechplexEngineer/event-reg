import { getUpcommingEvents } from '$lib/data/events.server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        events: getUpcommingEvents(25),
    };
}) satisfies PageServerLoad;