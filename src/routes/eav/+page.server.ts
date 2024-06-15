import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const namespaces: Record<string, Record<string, {
    comment?: string,
    cardinality: string,
    type: string
}>> = {
    "Event": {
        "name": { type: "string", cardinality: "1" },
        "date": { type: "string", cardinality: "1" }
    }
}

export const load = (async () => {
    return {
        namespaces: namespaces,
    };
}) satisfies PageServerLoad;

export const actions = {
    // default: async ({ request }) => {
    //     console.log("default action", request.formData())
    // },
    addNamespace: async ({ request }) => {
        const fd = await request.formData();
        console.log("addNamespace action", fd);
        let name = fd.get('name')?.toString();
        //@todo validate name
        if (name) {
            namespaces[name] = {};
        }
    },

    addAttribute: async ({ request }) => {
        const fd = await request.formData();
        console.log("addAttribute action", fd);
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
        namespaces[namespace][name] = {
            comment,
            cardinality,
            type,
        }
        // //@todo validate inputs
        // if (name) {
        //     namespaces.push({ name: name });
        // }
    }
} satisfies Actions;