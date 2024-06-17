import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        events: {
            future: getUpcommingEvents(10),
            past: getPastEvents(10),
        },
        actions: []
    };
}) satisfies PageServerLoad;