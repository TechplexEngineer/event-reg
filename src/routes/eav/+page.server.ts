import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        namespaces: [
            {
                name: "Event",

            }
        ],
    };
}) satisfies PageServerLoad;

