import { getEventBySlug, getTeamsByEventSlug } from "$lib/data/events.server"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"
import redir from '$lib/redir'

export const load: PageServerLoad = async (evt) => {

    const event = await getEventBySlug(evt.params.eventSlug);

    if (!event) {
        return redirect(redir.temp, '/404');
    }

    return {
        event: event,
        teams: await getTeamsByEventSlug(evt.params.eventSlug)
    };
}