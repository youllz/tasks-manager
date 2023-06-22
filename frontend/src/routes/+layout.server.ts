import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		// throw redirect(303, '/login')
	}
};
