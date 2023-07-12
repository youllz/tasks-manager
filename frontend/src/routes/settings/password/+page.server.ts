import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	update: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			password: string;
			oldPassword: string;
			passwordConfirm: string;
		};

		if (formData.password !== formData.passwordConfirm) {
			return fail(412, { message: '' });
		}

		if (locals.user!.id) {
			try {
				await locals.pb.collection('users').update(locals.user!.id, formData);
			} catch (err: any) {
				console.log(err.status, err.message);
			}
		}
	}
};
