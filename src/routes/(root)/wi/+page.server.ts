import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        title: 'Common Conveyor',
        image: 'img.jpg',
        tools: [],
        parts: [],
        fixtures: [],
        steps: [
            {
                stepNumber: 1,
                description: "todo",
                images: "img.jpg"
            },
            {
                stepNumber: 1,
                description: "todo",
                images: "img.jpg"
            },
        ]
    };
}) satisfies PageServerLoad;