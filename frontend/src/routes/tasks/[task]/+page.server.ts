import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ params, locals }) => {
	const boardId = params.task;

	const getData = async () => {
		try {
			const taskRecord = await locals.pb.collection('tasks').getFullList({
				expand: boardId
			});
			// console.log('taskREcird:',taskRecord)
			return taskRecord.filter((item) => item.boards === boardId)
		} catch (err) {
			console.log('Error', err);
		}
	};

	return {
		allTasks: structuredClone(await getData())
	};
}) satisfies PageServerLoad;

export const actions: Actions = {};
