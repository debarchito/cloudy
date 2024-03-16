<script>
  import Search from "$lib/components/Search.svelte";
  import User from "$lib/components/User.svelte";
</script>

<div class="hidden flex-col md:flex">
  <div>
    <div class="flex h-16 items-center px-4">
      <Search />
      <div class="ml-auto flex items-center space-x-4">
        <User username="debarchito" />
      </div>
    </div>
  </div>

  <div class="p-4">
    <slot />
  </div>
</div>
