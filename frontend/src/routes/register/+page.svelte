<script>
	import { Label, Input, Button, A } from "flowbite-svelte";
  import {Mail, KeyRound, User} from "lucide-svelte"

  
</script>


<section class="w-screen h-screen grid grid-cols-2 gap-4 px-[5vw] pt-[5vw] items-center justify-center auto-rows-min  ">
  <div>
    <figure class="w-full h-[600px]">
      <img class="w-full h-full object-cover" src="/register-img.jpg" alt="droids">
    </figure>
  </div>
  <div class="min-w-[500px] flex flex-col gap-4">

    <div class="">
      <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
        Register for an account
      </h2>
      <p class="text-center mt-1">
        Or <A href="/login"  highlight class=" text-purple-700 font-medium hover:cursor-pointer hover:underline"
          >sign in</A
        > if you already have an account.
      </p>
    </div>
  
    <form action="" class="flex flex-col gap-2">
      <div>
        <Label for="Name" class="mb-2">First name</Label>
        <Input type="text" id="first_name" placeholder="John" required autocomplete="off">
          <User slot="left" class="h-4 w-4"/>
        </Input>
      </div>
        <div>
        <Label for="mail" class="mb-2">Mail</Label>
        <Input type="email" id="mail" placeholder="example@.com" required autocomplete="off" >
          <Mail slot="left" class="h-4 w-4" />
        </Input>
      </div>
      <div>
        <Label for="password" class="mb-2">Password</Label>
        <Input type="password" id="password"  required autocomplete="off" >
          <KeyRound slot="left" class="h-4 w-4" />
        </Input>
      </div>
      <div>
        <Label for="confirmPassword" class="mb-2">Confirm Password</Label>
        <Input type="password" id="confirmPassword"  required autocomplete="off" >
          <KeyRound slot="left" class="h-4 w-4" />
        </Input>
       
  
       
      </div>
      <div>
        <Button type="submit" class="w-full">
          Register
        </Button>
      </div>
    </form>
  </div>
</section>

<style>

</style>