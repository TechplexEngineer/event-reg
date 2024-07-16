import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from "@sveltejs/kit";
// import { eventInsertSchema } from "$lib/data/events.schema";
import { zod } from 'sveltekit-superforms/adapters'
import { getNamespace } from '$lib/data/eav.server';

export const load = (async () => {
    return {
        namespace: getNamespace('Event')
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
    }
} satisfies Actions;

// export const actions = {
//     default: async ({ request }) => {
//         const form = await superValidate(request, zod(eventInsertSchema));

//         // Convenient validation check:
//         if (!form.valid) {
//             // Again, always return { form } and things will just work.
//             return fail(400, { form });
//         }

//         // TODO: Do something with the validated data
//         console.log('POST', request.url, form.data);

//         // return message(form, "Form Submitted"); // use this for forms to make changes without redirecting

//         // add a large delay to demonstrate the loading indicator
//         await new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve("")
//             }, 5000)
//         })

//         throw redirect(302, request.url)

//         // Yep, return { form } here too
//         return { form };
//     }
// } satisfies Actions;