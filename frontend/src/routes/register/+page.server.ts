import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types.js';

const registerShema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
	passwordConfirm: z.string().min(8)
});

export const load = (async (event) => {
	const form = superValidate(registerShema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// const formData = Object.fromEntries(await request.formData())
		// console.log(formData)

		const form = await superValidate(request, registerShema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await locals.pb.collection('users').create(form.data);
		} catch (err: any) {
			console.log('Err: ', err);
			fail(412);
		}

		throw redirect(303, '/login');
	}
};
