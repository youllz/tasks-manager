<script lang="ts">
	import TaskCards from '$lib/components/TaskCards.svelte';
	import { page } from '$app/stores';

	export let data;
	$: console.log(data);


	$: ({allTasks} = data)

	// let pageTasks = allTasks.filter((item:any) => item.boards === $page.params.task)
	// console.log(pageTasks)

	$: todo = allTasks.filter((item:any) => item.status === 'todo')
	$: doing = allTasks.filter((item:any) => item.status === 'doing')
	$: done = allTasks.filter((item:any) => item.status === 'done')

	

</script>

<div class="p-5 overflow-scroll overflow-x-hidden">
	
	
	<header class="flex items-center gap-1">
		<span class="h-4 w-4 rounded-full bg-purple-600" />
		<span>TODO</span>
	</header>
	<div class="flex flex-col gap-2">
		{#if todo.length === 0}

		<div class="w-full h-[300px]  flex items-center justify-center ">

			<span class="text-2xl font-extrabold opacity-20 ">
				EMPTY
			</span>
		</div>
			{:else}
			{#each todo as items}
				
			<TaskCards >
				<span slot="title">
					{items.title}
				</span>
				<span slot="desc">
					{items.description}
				</span>


			</TaskCards>
			{/each}
		{/if}
		
		<!-- <TaskCards /> -->
	</div>
</div>
<div class="p-5 overflow-scroll overflow-x-hidden">
	<header class="flex items-center gap-1">
		<span class="h-4 w-4 rounded-full bg-blue-600" />
		<span> DOING </span>
	</header>
	<div class="flex flex-col gap-2 h-max  ">


		{#if doing.length === 0}

		<div class="w-full h-[300px]  flex items-center justify-center ">

			<span class="text-2xl font-extrabold opacity-20 ">
				EMPTY
			</span>
		</div>

		{:else}
		{#each doing as items}
			
		<TaskCards />
		{/each}
	{/if}
		
	</div>
</div>
<div class="p-5 overflow-scroll overflow-x-hidden">
	<header class="flex items-center gap-1">
		<span class="h-4 w-4 rounded-full bg-green-600" />
		<span> DONE </span>
	</header>
	<div class="flex flex-col gap-2">
		{#if done.length === 0}

	<div class="w-full h-[300px]  flex items-center justify-center ">

			<span class="text-2xl font-extrabold opacity-20 ">
				EMPTY
			</span>
		</div>
		{:else}
		{#each done as items}
			
		<TaskCards />
		{/each}
	{/if}
		
	</div>
</div>
