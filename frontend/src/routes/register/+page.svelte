<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Label, Input, Button, A, Helper } from 'flowbite-svelte';
	import { Mail, KeyRound, User } from 'lucide-svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	$: passwordMatch = true;
	const { form, enhance, errors } = superForm(data.form, {
		onSubmit: ({ formData, cancel }) => {
			const data = Object.fromEntries(formData) as Record<string, string>;
			if (data.password !== data.passwordConfirm) {
				passwordMatch = false;
				cancel();
			}
		},

		onResult: ({ result }) => {
			switch (result.type) {
				case 'failure':
					toast.error('we encountered a problem when recording');
					break;
				case 'redirect':
					toast.success('successful');
					goto('/login');
			}
		}
	});

	const registerForm: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					goto('/login', { replaceState: true });
				case 'failure':
					toast.error('we encountered a problem when recording');
			}
		};
	};
</script>

<Toaster />

<section
	class="w-screen h-screen grid grid-cols-2 gap-4 px-[5vw] pt-[5vw] items-center justify-center auto-rows-min dark:bg-gray-950"
>
	<div>
		<figure class="w-full h-[600px]">
			<img class="w-full h-full object-cover" src="/register-img.jpg" alt="droids" />
		</figure>
	</div>
	<div class="min-w-[500px] flex flex-col gap-4">
		<div class="">
			<h2
				class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content dark:text-gray-200"
			>
				Register for an account
			</h2>
			<p class="text-center mt-1 dark:text-gray-200">
				Or <A
					href="/login"
					highlight
					class=" text-purple-700 font-medium hover:cursor-pointer hover:underline">sign in</A
				> if you already have an account.
			</p>
		</div>

		<form use:enhance method="POST" class="flex flex-col gap-2">
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input
					type="text"
					name="name"
					id="first_name"
					placeholder="John"
					autocomplete="off"
					color={$errors.name ? 'red' : undefined}
					bind:value={$form.name}
				>
					<User slot="left" class="h-4 w-4" />
				</Input>
				{#if $errors.name}
					<Helper color="red">{$errors.name}</Helper>
				{/if}
			</div>
			<div>
				<Label for="mail" class="mb-2">Mail</Label>
				<Input
					type="email"
					id="mail"
					name="email"
					placeholder="example@.com"
					autocomplete="off"
					color={$errors.email ? 'red' : undefined}
					bind:value={$form.email}
				>
					<Mail slot="left" class="h-4 w-4" />
				</Input>
				{#if $errors.email}
					<Helper color="red">{$errors.email}</Helper>
				{/if}
			</div>
			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input
					color={$errors.password ? 'red' : undefined}
					type="password"
					id="password"
					name="password"
					bind:value={$form.password}
					autocomplete="off"
				>
					<KeyRound slot="left" class="h-4 w-4" />
				</Input>
				{#if $errors.password}
					<Helper color="red">{$errors.password}</Helper>
				{/if}
				{#if !passwordMatch}
					<Helper color="red">the passwords don't match</Helper>
				{/if}
			</div>
			<div>
				<Label for="confirmPassword" class="mb-2">Confirm Password</Label>
				<Input
					type="password"
					name="passwordConfirm"
					id="confirmPassword"
					autocomplete="off"
					color={$errors.passwordConfirm ? 'red' : undefined}
					bind:value={$form.passwordConfirm}
				>
					<KeyRound slot="left" class="h-4 w-4" />
				</Input>
				{#if $errors.passwordConfirm}
					<Helper color="red">{$errors.passwordConfirm}</Helper>
				{/if}
				{#if !passwordMatch}
					<Helper color="red">the passwords don't match</Helper>
				{/if}
			</div>
			<div>
				<Button type="submit" class="w-full">Register</Button>
			</div>
		</form>
	</div>
</section>

<style>
</style>
