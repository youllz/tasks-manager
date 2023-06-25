<script lang="ts">
	import { Edit, Plus, X, MoveLeft } from 'lucide-svelte';
	import type { PageData } from './$types.js';
	import { Card, Button, Label, Input, Checkbox, Textarea, Modal } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data: PageData;
	//    $: console.log(data.editData)

	$: ({ task, subtask } = data.editData);
	let newSubTask = false;
</script>

<div class="w-full flex flex-col items-center justify-center">
	<Card class="min-w-[40vw]">
		<form use:enhance class="flex flex-col space-y-6" method="POST">
			<div class="flex items-center justify-between mb-2">
				<a
					href="/tasks/{$page.params.boardId}"
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
					<!-- <Label class="space-y-2">
							<span>Your password</span>
							<Input type="password" name="password" placeholder="•••••" required />
						</Label>
						<div class="flex items-start">
						<Checkbox>Remember me</Checkbox>
						<a
							href="/"
							class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
							>Lost password?</a
							>
						</div>
						<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
							Not registered? <a
							href="/"
							class="text-primary-700 hover:underline dark:text-primary-500">Create account</a
							>
						</div> -->
				</form>
			</Modal>
			<!-- end modal -->
			<Button type="submit" formaction="?/editTask" class="w-full"
				><Edit class="w-4 h-4 mr-1" /> Edit</Button
			>
		</form>
	</Card>
</div>
