import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ locals }) => {
	locals.pb.authStore.clear();
	throw redirect(308, '/login');
}) satisfies PageServerLoad;
