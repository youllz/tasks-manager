<script lang="ts">
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
	let clickOutsideModal = false;

	interface Subtask {
		id: string;
		collectionId: string;
		collectionName: string;
		created: string;
		updated: string;
		title: string;
		done: boolean;
		tasks: string;
	}

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

	let placement = 'right';
</script>

<!-- <Button on:click={() => clickOutsideModal = true}>Default modal</Button> -->

<Card on:click={() => (clickOutsideModal = true)} class="w-full cursor-pointer">
	<h5  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		<slot name="title">
			Lorem ipsum dolor sit amet consectetur adipisicin
		</slot>
	</h5>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
		<slot name="desc">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. In harum laboriosam laborum
			dignissimos. Recusandae quis cum perspiciatis, facilis quibusdam maiores nulla minus ullam
			rem praesentium voluptatibus laboriosam molestiae pariatur qua
		</slot>
	</p>
</Card>

<Modal size="sm" title="Terms of Service" bind:open={clickOutsideModal} autoclose outsideclose>
	<div class="mb-4 flex flex-col gap-2">
		<h3 class="text-2xl font-bold text-gray-900">
		<slot name="title">
				Lorem ipsum dolor sit amet consectetur adipisicin
			</slot>
		</h3>

		<p>
		<slot name="desc">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. In harum laboriosam laborum
				dignissimos. Recusandae quis cum perspiciatis, facilis quibusdam maiores nulla minus ullam
				rem praesentium voluptatibus laboriosam molestiae pariatur quaerat!
			</slot>
		</p>
	</div>

	<div class="flex flex-col gap-3">
		<small class="text-gray-900"> Subtasks (1 of 3) </small>
		<div class="flex flex-col gap-1">
			{#each Array(3) as _, idx}
				<div class="bg-[#f4ecf1] p-2">
					<Checkbox>items {idx}</Checkbox>
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
	</div>

	<div class="flex justify-end">
		<MenuButton class="dots-menu dark:text-white" vertical />
		<Dropdown {placement} class="w-36">
			<DropdownItem class=" hover:bg-gray-300">Edit</DropdownItem>
			<DropdownItem class=" hover:bg-gray-300">Export data</DropdownItem>
			<DropdownItem class=" hover:bg-gray-300">Delete</DropdownItem>
		</Dropdown>
	</div>
</Modal>
