<script lang="ts">
	import { Edit, Plus, X, MoveLeft } from 'lucide-svelte';
	import type { PageData } from './$types.js';
	import { Card, Button, Label, Input, Checkbox, Textarea, Modal, Toast } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	type Satus = 'error' | 'success' | undefined;

	let editForm: Satus;

	$: ({ task, subtask } = data.editData);
	let newSubTask = false;

	let formSubmit: SubmitFunction = () => {
		return async ({ result, update }) => {
			console.log(result.type);
			switch (result.type) {
				case 'success':
					toast.success('the task has been updated');
					await update({ reset: false });
					break;
				case 'failure':
					toast.error('an error its produced the task has not been updated');

				default:
					break;
			}
		};
	};

	$: currentBoardName = $page.url.searchParams.get('boardName')
	let boardName:string = ''
	$:if(currentBoardName) {
		boardName = currentBoardName
	}
</script>

<Toaster />
<div class="w-full flex flex-col items-center justify-center relative">
	<Card class="min-w-[40vw]">
		<form use:enhance={formSubmit} class="flex flex-col space-y-6" method="POST">
			<div class="flex items-center justify-between mb-2">
				<a
					href="/tasks/{$page.params.boardId}?boardName={boardName}"
					class="text-xl font-medium text-gray-900 dark:text-white"><MoveLeft /></a
				>
				<h1 class="font-bold">Edit Task</h1>
			</div>
			<Label class="space-y-2">
				<span>Title</span>
				<Input
					type="text"
					name="title"
					placeholder="e.g Marketing Plan"
					value={task.title}
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Description</span>
				<Textarea name="description" value={task.description} />
			</Label>
			<Label class="space-y-2">
				<span> Subtasks </span>
				{#each subtask as item, idx}
					<div class="flex items-center gap-1">
						<Input name={item.id} value={item.title} />
						<Button type="submit" formaction="?/deleteSubtask&id={item.id}" outline
							><X class="h-4 w-4" /></Button
						>
					</div>
				{/each}
			</Label>

			<!-- modal -->
			<Button outline on:click={() => (newSubTask = true)}>Add new Subtask</Button>

			<Modal bind:open={newSubTask} size="xs" autoclose={false} class="w-full">
				<form use:enhance class="flex flex-col space-y-6" method="POST">
					<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
						Sign in to our platform
					</h3>
					<Label class="space-y-2">
						<span>Title</span>
						<Input type="text" name="subtask" autocomplete="off" required />
					</Label>
					<input type="hidden" name="taskId" value={$page.params.taskId} />
					<Button type="submit" formaction="?/createSubtask" class="w-full1">create</Button>
				</form>
			</Modal>
			<!-- end modal -->
			<Button type="submit" formaction="?/editTask" class="w-full"
				><Edit class="w-4 h-4 mr-1" /> Edit</Button
			>
		</form>
	</Card>
</div>
