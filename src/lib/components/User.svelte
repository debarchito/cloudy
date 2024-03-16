<script lang="ts">
  import { goto } from "$app/navigation";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { LogOut, Palette, Settings } from "lucide-svelte";

  export let username: string;
  const avatarName = username[0].toUpperCase();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
      <Avatar.Root class="h-8 w-8">
        <Avatar.Fallback>{avatarName}</Avatar.Fallback>
      </Avatar.Root>
    </Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content class="w-56" align="end">
    <DropdownMenu.Label class="font-normal">
      <div class="flex flex-col space-y-1">
        <p class="text-sm font-medium leading-none">@{username}</p>
      </div>
    </DropdownMenu.Label>

    <DropdownMenu.Separator />

    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <Settings class="mr-2 h-4 w-4" />
        Settings
      </DropdownMenu.Item>

      <DropdownMenu.Item on:click={toggleMode}>
        <Palette class="mr-2 h-4 w-4" />
        Switch theme
      </DropdownMenu.Item>

      <DropdownMenu.Item on:click={() => goto("/logout")}>
        <LogOut class="mr-2 h-4 w-4" />
        Log out
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
