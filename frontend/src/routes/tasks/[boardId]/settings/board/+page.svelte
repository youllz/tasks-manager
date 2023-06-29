<script lang="ts">
	import type { PageData } from './$types.js';
	import { Card, Button, Label, Input, Checkbox, Modal } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast, { Toaster } from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let popupModal = false;
	$: editBtnLoading = false;
	$: deleteBtnLoadding = false;

	$: ({ boardName } = data);

	const editForm: SubmitFunction = () => {
		editBtnLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('the task has been updated');
					await update({ reset: false });
					editBtnLoading = false;
					break;
				case 'failure':
					toast.error('an error its produced the task has not been updated');
					await update({ reset: false });
					break;
			}
		};
	};

	const deletForm: SubmitFunction = () => {
		deleteBtnLoadding = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'redirect':
					await goto('/tasks?message=the sheet has been deleted successfully', {
						replaceState: true
					});

					deleteBtnLoadding = false;
					break;
				case 'failure':
					toast.error('an error its produced the task has not been deleted');

					break;
			}
		};
	};
</script>

<Toaster />
<div class="flex max-w-[30rem] w-[500px] flex-col space-y-6">
	<form use:enhance={editForm} class="space-y-6" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">Board Settings</h3>
		<Label class="space-y-2">
			<span>Title</span>
			<Input
				type="text"
				name="boardName"
				placeholder="e.g Marketing plan"
				value={boardName}
				autocomplete="off"
				required
			/>
			<input type="hidden" name="boardId" value={$page.params.boardId} />
		</Label>

		<div class="flex flex-col gap-1">
			<Button formaction="?/rename" disabled={editBtnLoading} outline type="submit" class="w-full"
				>Rename the board</Button
			>
			<Button on:click={() => (popupModal = true)} type="button" color="red" class="w-full"
				>Delete the board</Button
			>
		</div>
	</form>
	<Modal bind:open={popupModal} size="xs" autoclose={false}>
		<div class="text-center">
			<svg
				aria-hidden="true"
				class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this board
			</h3>
			<form use:enhance={deletForm} action="?/delete" method="POST">
				<input type="hidden" name="boardId" value={$page.params.boardId} />
				<Button type="submit" color="red" class="mr-2">Yes, I'm sure</Button>
				<Button on:click={() => (popupModal = false)} type="button" color="alternative"
					>No, cancel</Button
				>
			</form>
		</div>
	</Modal>
</div>
