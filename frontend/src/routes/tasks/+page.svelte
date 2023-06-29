<script>
	import { page } from "$app/stores";


	import { Heading } from "flowbite-svelte";
  import toast, { Toaster } from 'svelte-french-toast';

  $: redirectmessage = $page.url.searchParams.get('message')
  $: console.log(redirectmessage)

  $: if(redirectmessage) {
    toast.success(redirectmessage)
  }
  
</script>
<Toaster/>
<section class="flex items-center justify-center h-full">
  <div>
    <Heading tag="h3" class="mb-4" customSize="text-2xl font-extrabold  md:text-3xl lg:text-4xl">
      Select a board to add a new task
    </Heading>
  </div>
</section>