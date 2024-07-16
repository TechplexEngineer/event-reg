import { getActions } from '$lib/data/actions.server';
import { getPastEvents, getUpcommingEvents } from '$lib/data/events.server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        events: {
            future: getUpcommingEvents(10),
            past: getPastEvents(10),
        },
        actions: getActions()
    };
}) satisfies PageServerLoad;