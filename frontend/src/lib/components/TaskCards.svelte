<script lang="ts">
	import { pb } from '$lib/pocketbase.js';
	import {
		Button,
		Modal,
		Card,
		Checkbox,
		Label,
		Select,
		MenuButton,
		DropdownItem,
		Dropdown
	} from 'flowbite-svelte';
	import { Edit, Save, Trash } from 'lucide-svelte';
	import type { Record } from 'pocketbase';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let clickOutsideModal = false;

	export let subtaskId: string[] = [];
	export let taskId: string;


	let selectValue = 'todo';

	let status = [
		{
			value: 'todo',
			name: 'todo'
		},
		{
			value: 'doing',
			name: 'doing'
		},
		{
			value: 'done',
			name: 'done'
		}
	];

	// console.log(subtaskId)

	// const getData = async() => {
	// 	for(let i = 0; i < subTaskData.length; i++) {
	// 			subTaskData[i] = await pb.collection('subtasks').getFullList()

	// 		}

	// 		console.log(subTaskData)
	// }

	// getData()

	let subTaskData = new Array(subtaskId.length);
	onMount(async () => {
		for (let i = 0; i < subTaskData.length; i++) {
			subTaskData[i] = await pb.collection('subtasks').getFirstListItem(`id="${subtaskId[i]}"`);
		}
	});
</script>

<!-- <Button on:click={() => clickOutsideModal = true}>Default modal</Button> -->

<Card on:click={() => (clickOutsideModal = true)} class="w-full cursor-pointer">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		<slot name="title">Lorem ipsum dolor sit amet consectetur adipisicin</slot>
	</h5>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
		<slot name="desc">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. In harum laboriosam laborum
			dignissimos. Recusandae quis cum perspiciatis, facilis quibusdam maiores nulla minus ullam rem
			praesentium voluptatibus laboriosam molestiae pariatur qua
		</slot>
	</p>
</Card>

<Modal size="sm" title="Terms of Service" bind:open={clickOutsideModal} outsideclose>
	<div class="mb-4 flex flex-col gap-2">
		<h3 class="text-2xl font-bold text-gray-900">
			<slot name="title">Lorem ipsum dolor sit amet consectetur adipisicin</slot>
		</h3>

		<p>
			<slot name="desc">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. In harum laboriosam laborum
				dignissimos. Recusandae quis cum perspiciatis, facilis quibusdam maiores nulla minus ullam
				rem praesentium voluptatibus laboriosam molestiae pariatur quaerat!
			</slot>
		</p>
	</div>

	<form use:enhance method="POST">
		<div class="flex flex-col gap-3">
			<small class="text-gray-900"> Subtasks (1 of 3) </small>
			<div class="flex flex-col gap-1">
				{#each subTaskData as data}
					<div class="bg-[#f4ecf1] p-2">
						<Checkbox name={data.id} checked={data.done === 'on'}>{data.title}</Checkbox>
					</div>
				{/each}
			</div>

			<Label class="space-y-2">
				<span>Status</span>
				<Select class="mt-2" name="status" required>
					{#each status as { name, value }}
						<option {value}>{name}</option>
					{/each}
				</Select>
			</Label>
			<input type="hidden" name="taskId" value={taskId} required />
		</div>

		<div class="flex flex-col gap-1">
			<Button type="submit" formaction="?/saveTask" color="alternative" class="w-full">
				<Save class="h-4 w-4 mr-2" /> save</Button
			>
			<Button
				type="button"
				href="/tasks/{$page.params.boardId}/edit/{taskId}"
				color="alternative"
				class="w-full"
			>
				<Edit class="h-4 w-4 mr-2" /> edit</Button
			>
			<Button type="submit" formaction="?/deleteTask" color="red" outline class="w-full">
				<Trash class="h-4 w-4 mr-2" /> delete</Button
			>
		</div>
	</form>
</Modal>
