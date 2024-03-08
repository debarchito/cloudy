<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Search from "$lib/components/Search.svelte";
  import User from "$lib/components/User.svelte";
</script>

<div class="hidden flex-col md:flex">
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <Navbar class="mx-6" />
      <div class="ml-auto flex items-center space-x-4">
        <Search />
        <User username="debarchito" />
      </div>
    </div>
  </div>
</div>

<slot />
