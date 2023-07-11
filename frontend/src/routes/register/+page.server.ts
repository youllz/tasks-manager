import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    register: async({request,locals}) => {
        const formData = Object.fromEntries(await request.formData()) as {
            name:string,
            email:string,
            password:string,
            passwordConfirm:string
        } 

        console.log(formData)

        try {
            await locals.pb.collection('users').create(formData)
        } catch (err:any) {
            console.log('Err: ',err)
            fail(412)
        }

        throw redirect(303, '/login')
    }
};
