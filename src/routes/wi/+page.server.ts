import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        title: 'Common Conveyor',
        tools: [],
        parts: [],
        fixtures: [],
        steps: [
            {
                stepNumber: 1,
                description: "todo",
                images: ""
            }
        ]
    };
}) satisfies PageServerLoad;