import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addAttribute, addNamespace, getNamespaces } from '$lib/data/eav.server';



export const load = (async () => {
    return {
        namespaces: getNamespaces(),
    };
}) satisfies PageServerLoad;

export const actions = {
    // default: async ({ request }) => {
    //     console.log("default action", request.formData())
    // },
    addNamespace: async ({ request }) => {
        const fd = await request.formData();

        let name = fd.get('name')?.toString();
        //@todo validate name
        if (name) {
            addNamespace(name);
        }
    },

    addAttribute: async ({ request }) => {
        const fd = await request.formData();

        //@todo validate inputs
        let namespace = fd.get('namespace')?.toString();
        if (!namespace) {
            return fail(400, { message: "namespace is required" });
        }
        let name = fd.get('name')?.toString();
        if (!name) {
            return fail(400, { message: "name is required" });
        }
        let comment = fd.get('comment')?.toString() || "";
        let cardinality = JSON.parse(fd.get('cardinality')?.toString() || "").value;
        let type = JSON.parse(fd.get('type')?.toString() || "").value;

        addAttribute(namespace, name, {
            comment,
            cardinality,
            type
        });
    }
} satisfies Actions;