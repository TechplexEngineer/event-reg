import type { LayoutServerLoad } from "./$types"

console.log('layout.server.ts');


export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth()

    return {
        session,
    }
}