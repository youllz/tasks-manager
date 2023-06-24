<script lang="ts">
	import { Edit, X } from 'lucide-svelte';
    import type { PageData } from './$types.js';
    import { Card, Button, Label, Input, Checkbox, Textarea } from "flowbite-svelte";
	import { enhance } from '$app/forms';
    
    export let data: PageData;
//    $: console.log(data.editData)

    $: ({task, subtask} = data.editData)
</script>




<div class="w-[calc(100dvw-240px)] flex flex-col items-center justify-center">

    <Card class="min-w-[40vw]">
        <form use:enhance class="flex flex-col space-y-6" method="POST">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <Label class="space-y-2">
                <span>Title</span>
                <Input type="text" name="title" placeholder="e.g Marketing Plan" value={task.title} required />
            </Label>
            <Label class="space-y-2">
                <span>Description</span>
                <Textarea name="description" value={task.description}/>
            </Label>
            <Label class="space-y-2">
                <span> Subtasks </span>
                {#each subtask as item, idx }
                    <div class="flex items-center gap-1">
                        <Input  name={item.id} value={item.title} />
                        <Button 
                           type="submit"
                           formaction="?/deleteSubtask&id={item.id}"
                            outline><X class="h-4 w-4" /></Button
                        >
                    </div>
                {/each}
            </Label>
            <Button type="submit" class="w-full"> <Edit class="w-4 h-4 mr-1" /> Edit</Button>
               
        </form>
    </Card>
</div>