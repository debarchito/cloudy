<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Toggle } from "$lib/components/ui/toggle";
  import { Search, Regex, CaseSensitive } from "lucide-svelte";
</script>

<div
  class="flex w-full max-w-sm items-center space-x-2 rounded-lg border border-input px-3 pr-0 ring-1 ring-primary"
>
  <Search class="h-7 w-7 pr-1 text-primary" />
  <Input
    type="search"
    class="h-11 border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[100px] lg:w-[300px]"
  />
  <Toggle>
    <Regex class="h-4 w-4" />
  </Toggle>
  <Toggle>
    <CaseSensitive class="h-5 w-5" />
  </Toggle>
</div>
