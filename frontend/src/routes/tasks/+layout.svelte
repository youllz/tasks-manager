<script lang="ts">
	import {
		Button,
		Input,
		Label,
		Modal,
		Textarea,
		Select,
		MenuButton,
		Dropdown,
		DropdownItem,
		Tooltip,
		DarkMode
	} from 'flowbite-svelte';
	import {
		LayoutGrid,
		Plus,
		X,
		Settings,
		LogOut,
		Eye,
		EyeOff,
		Sun,
		Moon,

		Trash

	} from 'lucide-svelte';
	import '../../app.postcss';
	import '../../app.css';
	import type { SubmitFunction } from './$types.js';
	import type { Record } from 'pocketbase';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data;

	$: ({ recordData } = data);
	let addTaskModal = false;
	let boardModal = false;
	let dropdownOpen = false;
	let boardValue = '';
	let id = 1;
	let headerMenuPlacemant = 'bottom';
	let sidebar = true;
	let allSubtasks: string[];
	let record: Record[] = [];
	let headerTitle: string = ''
	let numberOfSubtask = [
		{
			id: id++
		}
	];

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

	function addSubTask() {
		numberOfSubtask = [...numberOfSubtask, { id: id++ }];
	}

	function deleteSubTask(id: number) {
		numberOfSubtask = numberOfSubtask.filter((item) => item.id !== id);
		id = 1;

		for (let i = 0; i < numberOfSubtask.length; i++) {
			numberOfSubtask[i].id = i + 1;
		}
	}

	function setRecordData() {
		if (typeof recordData != 'undefined') {
			record = recordData;
		}
	}

	$: if (recordData) {
		setRecordData();
	}

	$: if (record?.length) {
		setTimeout(() => {
			boardModal = false;
		}, 500);
	}

	const formSubmit:SubmitFunction = () => {


		return async ({result, update}) => {
			switch (result.type) {
				case "success":
					toast.success('the task was successfully created')
					await update({reset: true})
					break;
					case "failure" :
						toast.error('error the task was not created')
						await update({reset: false})
				default:
					break;
			}
		}
	}

	function getHeaderTitle(e:MouseEvent) {
		const el = e.target as HTMLAnchorElement
		headerTitle = el.innerText
	}
</script>

<Toaster/>
<main class="grid grid-cols-12 grid-rows-6 h-screen w-screen bg-[#f4ecf1] relative">
	<!-- HEADER -->
	<header
		class:h-sidebar={!sidebar}
		class="col-start-3 col-end-13 border-b-2 border-slate-100 bg-[#FFFFFF] flex items-center font-bold justify-between px-5"
	>
		<div>
			<span class="text-2xl">{$page.url.searchParams.get('name') || ''}</span>
		</div>

		<ul class="flex items-center gap-2">
			<li>
				<Button disabled={$page.params.boardId? false : true} on:click={() => (addTaskModal = true)} class="gap-1 "
					><Plus class="h-4 w-4" /> Add New Task</Button
				>

				<Modal bind:open={addTaskModal} size="xs" autoclose={false} outsideclose class="w-full">
					<form
						use:enhance={formSubmit}
						class="flex flex-col space-y-6"
						action="/tasks?/createTask"
						method="POST"
					>
						<input type="hidden" name="boardId" value={$page.params.boardId} />
						<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Task</h3>
						<Label class="space-y-2">
							<span>Title</span>
							<Input type="text" name="title" placeholder="e.g drink coffee" required />
						</Label>
						<Label class="space-y-2">
							<span> Description</span>
							<Textarea placeholder="task description" rows="4" name="description" />
						</Label>
						<Label class="space-y-2">
							<span> Subtasks </span>
							{#each numberOfSubtask as item, idx (item.id)}
								<div class="flex items-center gap-1">
									<Input bind:group={allSubtasks} name={'subtask' + (idx + 1)} />
									<Button
										on:click={() => {
											deleteSubTask(item.id);
										}}
										outline><X class="h-4 w-4" /></Button
									>
								</div>
							{/each}
						</Label>

						<Button on:click={addSubTask} type="button" outline class="w-full1"
							><Plus class="h-4 w-4" /> Add New Subtask</Button
						>

						<Label>
							<span>Status</span>
							<Select class="mt-2" name="status" required>
								{#each status as { name, value }}
									<option {value}>{name}</option>
								{/each}
							</Select>
						</Label>
						<div>
							<Button type="submit" class="w-full">ADD TASK</Button>
						</div>
					</form>
				</Modal>
			</li>
			<li>
				<Button href="/tasks/{$page.params.boardId}/settings/board?name={$page.url.searchParams.get('name')}" color="alternative"><Settings class="h-4 w-4 mr-1"/>Settings</Button>
			</li>
			<li>
				<form action=""><Button type="submit" color="alternative"><LogOut class="h-4 w-4 mr-1"/>Logout</Button></form>
			</li>
		</ul>
	</header>

	<!-- END HEADER -->

	<!-- ASIDE -->

	{#if sidebar}
		<aside
			class="col-start-1 col-end-3 row-start-1 row-end-7 border-r-2 border-slate-100 bg-[#FFFFFF] pl-1 pr-4 relative"
		>
			<div class="w-full h-[132.50px] flex items-center justify-center border-b-2 border-slate-100">
				<strong class="text-lg font-bold"> LOGO </strong>
			</div>
			<div class="text-center">
				<small> ALL BOARD ({record.length })</small>
			</div>
			<nav class="mt-2 h-[400px] overflow-y-scroll" >
				<ul class="flex flex-col gap-1">
				
					{#each record as item, idx}
						<li>
							<Button
								on:click={getHeaderTitle}
								href="/tasks/{item.id}?name={item.name}"
								color={$page.params.boardId === item.id ? 'purple' : 'alternative'}
								class="w-full gap-1 justify-start"
							>
								<LayoutGrid class="text-inherit h-4 w-4" />
								{item.name}
							</Button>
						</li>
						{/each}
					</ul>
				</nav>

				<Button
					type="button"
					on:click={() => {
						boardModal = true;
					}}
					class="w-full mt-4"
					outline
				>
					<Plus class="h-4 w-4 mr-1" /> Add New Board
				</Button>

				<Modal bind:open={boardModal} size="xs" autoclose={false} outsideclose class="w-full">
					<form
						use:enhance
						class="flex flex-col space-y-6"
						action="/tasks?/createBoard"
						method="POST"
					>
						<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create New Board</h3>
						<Label class="space-y-2">
							<span>Title</span>
							<Input
								type="text"
								name="name"
								placeholder="e.g Marketing Plan"
								bind:value={boardValue}
								required
							/>
						</Label>
					
						<Button type="submit" class="w-full1">Create</Button>
					
					</form>
				</Modal>
			<div class="w-full mx-1 flex items-center justify-center absolute bottom-4">
				<DarkMode class="text-md  ">
					<svelte:fragment slot="lightIcon">
						<div class="flex items-center gap-1">
							<Sun class="h-4 w-4 " /> Light
						</div>
					</svelte:fragment>
					<svelte:fragment slot="darkIcon">
						<div class="flex items-center gap-1">
							<Moon class="h-4 w-4" /> Dark
						</div>
					</svelte:fragment>
				</DarkMode>
			</div>
		</aside>
	{/if}

	<!-- END ASIDE -->

	<section
		class:h-sidebar={!sidebar}
		class="col-start-3 col-end-13 row-start-2 row-end-7 overflow-x-hidden relative"
	>
		
		<slot />
	</section>

	<div class="absolute right-2 bottom-2">
		<Button
			on:click={() => {
				sidebar = !sidebar;
			}}
			id="sidebar"
			class="rounded-full absolute right-2 bottom-2"
		>
			
			{#if sidebar}
				<EyeOff class="h-4 w-4" />
			{:else}
				<Eye class="h-4 w-4" />
			{/if}
		</Button>
		<Tooltip arrow={false} triggeredBy="#sidebar"
			>{sidebar ? 'Hiden Sidebar' : 'Display Sidebar'}</Tooltip
		>
	</div>
</main>

<style>
	.h-sidebar {
		grid-column-start: 1;
	}
</style>
