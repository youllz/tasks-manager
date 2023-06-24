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

export const actions: Actions = {
	saveTask: async({request, locals}) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string,string>

		function extratData() {
			let data = structuredClone(formData)
			delete data['status']
			delete data['taskId']
			let dataKeys = Object.keys(data)
			let dataValue = Object.values(data) as string[]


			return {
				dataKeys,
				dataValue
			}
			
		}

		
		const data = extratData()

		try {
			await locals.pb.collection('tasks').update(formData.taskId,{status: formData.status})
			for(let i = 0; i < data.dataKeys.length; i++) {
				await locals.pb.collection('subtasks').update(data.dataKeys[i], {done: data.dataValue[i]})
			}
		} catch (err) {
			console.log('Error: ', err)
			 
		}

	},

	deleteTask: async({request, locals}) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string,string>

		try {
			await locals.pb.collection('tasks').delete(formData.taskId)
		} catch (err) {
			console.log('Error: ',err)

		}
	}
};
