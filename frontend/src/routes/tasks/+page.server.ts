import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	// return {
	// };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createBoard: async ({ request, locals, url }) => {
		const data = Object.fromEntries(await request.formData()) as Record<string, string>;
		const fromUrl = url.pathname + url.search;

		let boardData;

		try {
			boardData = await locals.pb.collection('boards').create(data);
		} catch (err: any) {
			console.log('Error', err);
			throw error(err.status, err.message);
		}

		

		throw redirect(303, `/tasks/${boardData.id}?redirecTo=${fromUrl}`);

		// return fail(402, {
		//     message: "board create"
		// })
	},

	createTask: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData()) as Record<string, string>;
		// console.log(data)

		let values = Object.values(data);
		let keyLenght = values.length;

		const statusIdx = values.indexOf('status');
		const el = values.splice(statusIdx, keyLenght)[0];
		values.splice(3, 0, el);
		let subTasks = values.slice(4);
		// console.log(subTasks)
		const subTasksId = Array(subTasks.length);
		
		let taskRecord

		try {
			 taskRecord = await locals.pb
				.collection('tasks')
				.create({
					title: data.title,
					description: data.description,
					status: data.status,
					boards: data.boardId
				});

			
		} catch (err: any) {
			console.log('Error', err);
			throw error(err.status, err.message);
		}

		try {
			for (let i = 0; i < subTasks.length; i++) {
				subTasksId[i] = await locals.pb
				.collection('subtasks')
				.create({ title: subTasks[i], done: 'off', tasks: taskRecord.id });
			}
			
		
		 locals.pb
			.collection('tasks')
			.update(taskRecord.id, { subtasks: subTasksId.map((item) => item.id) });
		} catch(err) {
			console.log('Error', err)
		}
	}
};
