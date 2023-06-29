import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types.js';

export const load = (async ({locals, params}) => {

    const getBoard = async () => {
        try {
           const boardName = await locals.pb.collection('boards').getOne(params.boardId)
           return boardName.name
        } catch (err:any) {
            console.log('Error: ', err)
            throw error(err.status, err.message)
        }
    }
    
    return {
        boardName: structuredClone(await getBoard()) as {name: string}
    };
}) satisfies PageServerLoad;



export const actions: Actions = {
    delete: async ({request, locals}) => {
        const formData = Object.fromEntries(await request.formData()) as {boardId:string}
        console.log(formData)

        try {
            await locals.pb.collection('boards').delete(formData.boardId)
        } catch (err) {
            console.log('Error: ', err)
            fail(4133)
        }
        throw redirect(303, `/tasks?message=the sheet has been deleted successfully`)
    },

    rename: async ({request, locals}) => {
        const formData = Object.fromEntries(await request.formData()) as {boardId:string, boardName:string}
        console.log(formData)

        try {
            await locals.pb.collection('boards').update(formData.boardId,{name: formData.boardName})
        } catch (err) {
            console.log('Error: ', err)
            fail(4133)
        }
    }


}; 