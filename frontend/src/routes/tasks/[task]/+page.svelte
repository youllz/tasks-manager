<script lang="ts">
    import TaskCards from '$lib/components/TaskCards.svelte'
    
</script>


	<div class="p-5">
			<header class="flex items-center gap-1">
				<span class="h-4 w-4 rounded-full bg-purple-600" />
				<span>TODO</span>
			</header>
			<div class="flex flex-col gap-2">
				<TaskCards />
				<TaskCards />
			</div>
		</div>
		<div class="p-5 overflow-scroll overflow-x-hidden">
			<header class="flex items-center gap-1">
				<span class="h-4 w-4 rounded-full bg-blue-600" />
				<span> DOING </span>
			</header>
			<div class="flex flex-col gap-2">
				<TaskCards />
				<TaskCards />
				<TaskCards />
				<TaskCards />
				<TaskCards />
			</div>
		</div>
		<div class="p-5">
			<header class="flex items-center gap-1">
				<span class="h-4 w-4 rounded-full bg-green-600" />
				<span> DONE </span>
			</header>
			<div class="flex flex-col gap-2">
				<TaskCards />
			</div>
		</div>