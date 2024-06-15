import type { D1Database } from "@miniflare/d1";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			rawDb: D1Database;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				D1_DB?: D1Database;
			}
		}
	}
}

export { };
