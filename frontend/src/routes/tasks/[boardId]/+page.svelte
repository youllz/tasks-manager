<script lang="ts">
	import TaskCards from '$lib/components/TaskCards.svelte';
	import { page } from '$app/stores';
	import type { Record } from 'pocketbase';
	import toast, { Toaster } from 'svelte-french-toast';
	import {currentBoard} from '$lib/store.js'
	export let data;
	$: console.log(data.recordData);

	$: ({ allTasks } = data);
	$: ({recordData} = data)

	$currentBoard = data.recordData?.find((item) => item.id === $page.params.boardId)

	// let pageTasks = allTasks.filter((item:any) => item.boards === $page.params.task)
	// console.log(pageTasks)

	$: todoData = allTasks?.filter((item) => item.status === 'todo');
	$: doingData = allTasks?.filter((item) => item.status === 'doing');
	$: doneData = allTasks?.filter((item) => item.status === 'done');

	let todo: Record[] = [];
	let doing: Record[] = [];
	let done: Record[] = [];

	function setData() {
		if (typeof todoData != 'undefined') todo = todoData;
		if (typeof doingData != 'undefined') doing = doingData;
		if (typeof doneData != 'undefined') done = doneData;

		// console.log(todo)
	}

	$: if (allTasks) {
		setData();
	}

	$: redirectMessage = $page.url.searchParams.get('message');
	let toastMessage: string;

	$: if (redirectMessage) {
		toastMessage = redirectMessage;
	}

	$: if (redirectMessage) {
		toast.success(toastMessage);
	}
</script>

<Toaster />
<div class="col-start-3 col-end-13 row-start-2 row-end-7 grid grid-cols-3 w-full">
	<div class="p-5 overflow-y-auto overflow-x-hidden">
		<header class="flex items-center gap-1">
			<span class="h-4 w-4 rounded-full bg-purple-600" />
			<span class="dark:text-gray-400">TODO</span>
		</header>
		<div class="flex flex-col gap-2  py-3">
			{#if todo.length === 0}
				<div class="w-full h-[300px] flex items-center justify-center">
					<span class="text-2xl font-extrabold opacity-20"> EMPTY </span>
				</div>
			{:else}
				{#each todo as items}
					<TaskCards  subtaskId={items.subtasks} taskId={items.id}>
						<span slot="card-title">
							{items.title}
						</span>
						<span slot="card-desc">
							{items.description}
						</span>
						<span slot="modal-title">
							{items.title}
						</span>
						<span slot="modal-desc">
							{items.description}
						</span>
					</TaskCards>
				{/each}
			{/if}

			<!-- <TaskCards /> -->
		</div>
	</div>
	<div class="p-5 overflow-y-auto overflow-x-hidden">
		<header class="flex items-center gap-1">
			<span class="h-4 w-4 rounded-full bg-blue-600" />
			<span class="dark:text-gray-400"> DOING </span>
		</header>
		<div class="flex flex-col gap-2 h-max  py-3">
			{#if doing.length === 0}
				<div class="w-full h-[300px] flex items-center justify-center">
					<span class="text-2xl font-extrabold opacity-20"> EMPTY </span>
				</div>
			{:else}
				{#each doing as items}
					<TaskCards subtaskId={items.subtasks} taskId={items.id}>
						<span slot="card-title">
							{items.title}
						</span>
						<span slot="card-desc">
							{items.description}
						</span>
						<span slot="modal-title">
							{items.title}
						</span>
						<span slot="modal-desc">
							{items.description}
						</span>
					</TaskCards>
				{/each}
			{/if}
		</div>
	</div>
	<div class="p-5 overflow-y-auto overflow-x-hidden">
		<header class="flex items-center gap-1">
			<span class="h-4 w-4 rounded-full bg-green-600" />
			<span class="dark:text-gray-400"> DONE </span>
		</header>
		<div class="flex flex-col gap-2 py-3">
			{#if done.length === 0}
				<div class="w-full h-[300px] flex items-center justify-center">
					<span class="text-2xl font-extrabold opacity-20"> EMPTY </span>
				</div>
			{:else}
				{#each done as items}
					<TaskCards subtaskId={items.subtasks} taskId={items.id}>
						<span slot="card-title">
							{items.title}
						</span>
						<span slot="card-desc">
							{items.description}
						</span>
						<span slot="modal-title">
							{items.title}
						</span>
						<span slot="modal-desc">
							{items.description}
						</span>
					</TaskCards>
				{/each}
			{/if}
		</div>
	</div>
</div>
