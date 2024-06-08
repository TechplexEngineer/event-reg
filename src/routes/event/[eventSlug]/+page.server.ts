import { getEventBySlug, getTeamsByEventSlug } from "$lib/data";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {
    // const session = await event.locals.auth()

    // return {
    //     session,
    // }

    return {
        event: await getEventBySlug(event.params.eventSlug),
        teams: await getTeamsByEventSlug(event.params.eventSlug)
    };
}