import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import type { Record } from 'pocketbase';

export const load = (async ({ params, locals }) => {
	let data: Record;
	const getData = async () => {
		try {
			data = await locals.pb.collection('tasks').getOne(params.taskId);

			return data;
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const getSubtask = async () => {
		const subtasksData: Record[] = new Array(data.subtasks.length);

		try {
			if (subtasksData) {
				for (let i = 0; i < subtasksData.length; i++) {
					subtasksData[i] = await locals.pb.collection('subtasks').getOne(data.subtasks[i]);
				}
			}
		} catch (err) {
			console.log('Error: ', err);
		}

		return subtasksData;
	};

	return {
		editData: {
			task: structuredClone(await getData()) as Record,
			subtask: structuredClone(await getSubtask()) as Record[]
		}
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	deleteSubtask: async ({ locals, url }) => {
		const id = url.searchParams.get('id');

		if (id) {
			try {
				await locals.pb.collection('subtasks').delete(id);
			} catch (err) {
				console.log('Error: ', err);
			}
		}
	},
	createSubtask: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			subtask: string;
			taskId: string;
		};
		console.log(formData);
		const { subtask, taskId } = formData;

		try {
			const subtaskRecord = await locals.pb
				.collection('subtasks')
				.create({ title: subtask, done: 'off' });
			const taskRecord = await locals.pb.collection('tasks').getOne(taskId);
			let subtasksId = taskRecord.subtasks as string[];
			subtasksId.push(subtaskRecord.id);

			await locals.pb.collection('tasks').update(taskId, { subtasks: subtasksId });
		} catch (err) {
			console.log('Error: ', err);
		}
	},

	editTask: async ({ locals, request, params }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
		};
		try {
			await locals.pb
				.collection('tasks')
				.update(params.taskId, { title: formData.title, description: formData.description });
		} catch (err) {
			console.log('Error', err);
			return fail(413);
		}
	}
};
