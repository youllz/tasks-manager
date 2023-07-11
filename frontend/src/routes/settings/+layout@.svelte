<script lang="ts">
	import { Sun, Moon, MoveLeft } from 'lucide-svelte';
	import type { LayoutData } from './$types.js';
	import { Button, DarkMode } from 'flowbite-svelte';
	import { page } from '$app/stores';

	// export let data: LayoutData;

	const urlPath = [
		{
			url: `/settings/board`,
			name: 'board',
			disabled: false
		},
		{
			url: `/settings/email`,
			name: 'email',
			disabled: true
		},
		{
			url: `/settings/password`,
			name: 'password',
			disabled: true
		}
	];

	// $: console.log($page)
</script>

<section class="w-[100dvw] h-[100dvh] grid grid-cols-12 grid-rows-6  bg-[#f4ecf1] relative dark:bg-gray-950">
	<header
		class="   col-start-3 col-end-13 border-b-2 dark:border-slate-600 border-slate-100 bg-[#FFFFFF] flex items-center font-bold justify-between px-5 dark:bg-gray-800"
	>
		<Button href="/tasks" outline>
			<MoveLeft class="w-4 h-4" />
		</Button>

		<h2 class="text-2xl dark:text-gray-200 font-bold">Settings</h2>
	</header>
	<aside
		class="col-start-1 col-end-3 row-start-1 row-end-7 border-r-2 dark:border-slate-600 border-slate-100 bg-[#FFFFFF] pl-1 pr-4 relative dark:bg-gray-800"
	>
		<div class="w-full h-[132.50px] flex items-center justify-center border-b-2 dark:border-slate-600 border-slate-100">
			<strong class="text-lg dark:text-gray-200 font-bold"> LOGO </strong>
		</div>
		<div>
			<nav>
				<ul class="flex flex-col gap-1">
					{#each urlPath as item}
						<li>
							<Button
								disabled={item.disabled}
								href={item.url}
								color={item.url === $page.url.pathname ? 'purple' : 'alternative'}
								class="w-full gap-1 justify-start"
							>
								{item.name}
							</Button>
						</li>
					{/each}
				</ul>
			</nav>
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
		</div>
	</aside>
	<section
		class="col-start-3 col-end-13 row-start-2 row-end-7 flex items-start p-6 justify-start overflow-x-hidden relative"
	>
		<slot />
	</section>
</section>
