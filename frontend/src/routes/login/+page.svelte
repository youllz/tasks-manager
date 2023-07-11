<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Label, Input, Button, Alert, Spinner } from 'flowbite-svelte';
	import toast, {Toaster} from 'svelte-french-toast'

	import { Mail, KeyRound } from 'lucide-svelte';

	$: urlMessage = $page.url.searchParams.get('message')
	
	$: loading = false
	
	$: error = false

	

	const loginForm:SubmitFunction = () => {
		loading = true

		return async ({result}) => {
			switch(result.type) {
				case "redirect": 
					goto('/tasks', {replaceState: true})
					loading = false
					break
				case "failure":
				toast.error('Failed to authenticate')
					loading = false
					error = true
					break
						
			}
		}
	}
	
</script>


<Toaster />
<section
	class="w-screen h-screen grid grid-cols-2 gap-4 px-[5vw] pt-[5vw] items-center justify-center auto-rows-min"
>
	<div>
		<figure class="w-full h-[600px]">
			<img class="w-full h-full object-cover" src="/login-img.jpg" alt="droids" />
		</figure>
	</div>
	<div class="min-w-[500px] flex flex-col gap-4">
		<div>
			<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
				Login to your account
			</h2>
			<p class="text-center mt-1">
				Or <a
					href="/register"
					class="text-purple-700 font-medium hover:cursor-pointer hover:underline">register</a
				> if you don't already have an account.
			</p>
		</div>

		<form use:enhance={loginForm} action="?/login" method="POST" class="flex flex-col gap-2">
			<div>
				<Label for="mail" class="mb-2">Mail</Label>
				<Input color={error? 'red' : undefined}  type="email" name="mail" id="mail" placeholder="example@.com" required autocomplete="off">
					<Mail slot="left" class="h-4 w-4" />
				</Input>
			</div>
			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input  color={error? 'red' : undefined} type="password" name="password" id="password" required autocomplete="off">
					<KeyRound slot="left" class="h-4 w-4" />
				</Input>
			</div>

			<div class="flex flex-col gap-3">
				<Button disabled={loading} type="submit" class="w-full">
					{#if loading}
					<Spinner class="mr-1"/>
					{/if}
					Login
				</Button>
				<p class="text-center">OR CONTINUE WITH</p>

				<Button disabled outline class="w-full    ">
					<svg
						class="mr-1"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						><g fill="none"
							><g clip-path="url(#akarIconsGoogleContainedFill0)"
								><path
									fill="currentColor"
									fill-rule="evenodd"
									d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86Z"
									clip-rule="evenodd"
								/></g
							><defs
								><clipPath id="akarIconsGoogleContainedFill0"
									><path fill="#fff" d="M0 0h24v24H0z" /></clipPath
								></defs
							></g
						></svg
					>
					Google
				</Button>
			</div>
		</form>
		{#if urlMessage}
		<Alert border color="red">
			<svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
			<span class="font-medium"> Alert!</span> you don’t have access
		</Alert>
		{/if}
	</div>
</section>

<style>
</style>
