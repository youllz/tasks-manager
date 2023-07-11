import { redirect } from '@sveltejs/kit';
import type { Actions, LayoutServerLoad } from './$types.js';

export const load = (async ({ locals }) => {
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}
	const getAllBoard = async () => {
		try {
			const records = await locals.pb.collection('boards').getFullList({
				sort: '-created'
			});

			return records;
		} catch (err) {
			console.log('Error', err);
		}
	};

	return {
		recordData: structuredClone(await getAllBoard())
	};
}) satisfies LayoutServerLoad;
