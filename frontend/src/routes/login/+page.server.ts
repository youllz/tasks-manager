import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;



export const actions: Actions = {
	login: async({request,locals}) => {
		const formData = Object.fromEntries(await request.formData()) as {mail:string, password:string }

		try {
			await locals.pb.collection('users').authWithPassword(formData.mail,formData.password)
			
		} catch (err) {
			console.log('Error: ', err)
			return fail(413)
		}

		throw redirect(303, '/tasks')
	}
};