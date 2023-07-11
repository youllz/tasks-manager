import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types.js';

export const load = (async ({ locals }) => {
	const getBoard = async () => {
		try {
			const boardName = await locals.pb.collection('boards').getFullList();
			return boardName;
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		boardName: structuredClone(await getBoard())
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as { boardId: string };
		console.log(formData);

		try {
			await locals.pb.collection('boards').delete(formData.boardId);
		} catch (err) {
			console.log('Error: ', err);
			fail(4133);
		}
	},

	rename: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			boardId: string;
			boardName: string;
		};
		console.log(formData);

		try {
			await locals.pb.collection('boards').update(formData.boardId, { name: formData.boardName });
		} catch (err) {
			console.log('Error: ', err);
			fail(4133);
		}
	}
};
