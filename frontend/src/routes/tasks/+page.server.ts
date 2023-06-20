import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { pb } from '$lib/pocketbase.js';


export const load = (async ({locals}) => {

   
    
    
    return {
     
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    createBoard: async ({request, locals}) => {
        const data = Object.fromEntries(await request.formData()) as Record<string,string>
        // console.log(data)

        let boardData

        try {
             boardData =  await locals.pb.collection('boards').create(data)
            console.log(boardData)
        } catch (err:any) {
            console.log("Error", err)
            throw error(err.status, err.message)

        }

        let allboard = await pb.collection('boards').getList()
        let id = allboard.items.at(-1)?.id

        throw redirect(303, `/tasks/${boardData.id}`)

    },

    createTask: async ({request, locals}) => {
        const data = Object.fromEntries(await request.formData()) as Record<string,string>
        console.log(data)

        let values = Object.values(data)
        let keyLenght = values.length

        const statusIdx = values.indexOf('status')
        const el =  values.splice(statusIdx, keyLenght)[0]
        values.splice(2, 0, el)
        let subTasks = values.slice(3)

        try {
            await locals.pb.collection('tasks').create({title: data.title, description: data.description, status: data.status, boards: 'dpj856vukz8b7ai'})
            for(let i = 0; i < subTasks.length; i++) {
                await locals.pb.collection('subtasks').create({title: subTasks[i], done: false})
            }
        } catch (err:any) {
            console.log('Error', err)
            throw error(err.status, err.message)
        }
       
        
        
    }
        
};