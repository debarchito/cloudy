<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Toggle } from "$lib/components/ui/toggle";
  import { Search, Regex, CaseSensitive } from "lucide-svelte";
</script>

<div class="flex w-full max-w-sm items-center space-x-2 rounded-lg border border-input px-3 pr-0">
  <Search class="h-10 w-10 pr-3 text-primary" />
  <Input type="search" class="h-11 border-none md:w-[100px] lg:w-[300px]" />
  <Toggle>
    <Regex class="h-4 w-4" />
  </Toggle>
  <Toggle>
    <CaseSensitive class="h-5 w-5" />
  </Toggle>
</div>
