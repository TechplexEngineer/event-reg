import { sequence } from "@sveltejs/kit/hooks";
import { handle as handleAuth } from "./auth"
import type { Handle } from "@sveltejs/kit";
import { getdb } from "$lib/data/getdb.server";


const injectDb = (async ({ event, resolve }) => {
    if (event.request.url === "http://sveltekit-prerender/[fallback]") {
        // Don't inject for fallback pre-rendering
        return resolve(event);
    }

    // Inject the database into all requests
    event.locals.rawDb = await getdb("D1_DB", event.platform);

    return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth, injectDb);