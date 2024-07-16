import { getNamespaces } from '$lib/data/eav.server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        stats: [
            { name: "Total Users", value: 100 },
            { name: "Total Events", value: 100 }
        ],
        namespaces: Object.entries(getNamespaces()).map(([name, ns]) => (
            { name, attributes: Object.keys(ns) }))
    };
}) satisfies PageServerLoad;