import { addNsData, getNamespace, getNamespaces, getNsData } from '../eav.server';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const ns = getNamespace(params.nsName);
    return {
        nsName: params.nsName,
        ns: ns,
        data: getNsData(params.nsName),
    };
}) satisfies PageServerLoad;

export const actions = {
    addData: async ({ request }) => {
        const fd = await request.formData();

        const data = Object.fromEntries(fd) as Record<string, string>;
        for (const k in data) {
            data[k] = data[k].toString();
        }
        const ns = data.namespace;
        delete data.namespace;

        addNsData(ns, data);
    },


} satisfies Actions;