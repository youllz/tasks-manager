
<script lang="ts">
	import type { PageData } from './$types.js';
	import { Label, Input, Button } from 'flowbite-svelte';

	// export let data: PageData;
</script>


<section class="flex max-w-[30rem] w-[500px] flex-col space-y-6" >
	<h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">Email Settings</h3>
	<form action="?/update" method="POST" class="flex flex-col gap-2" >
		<Label class="space-y-2">
			<span> password</span>
			<Input
			disabled
				type="password"
				name="oldPassword"
				autocomplete="off"
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span> new password</span>
			<Input
			disabled
				type="password"
				name="password"
				autocomplete="off"
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span> confirm new password</span>
			<Input
			disabled
				type="password"
				name="passwordConfirm"
				autocomplete="off"
				required
			/>
		</Label>
		<Button disabled type="submit">
			update
		</Button>
	</form>
</section>