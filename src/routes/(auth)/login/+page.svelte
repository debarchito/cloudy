<script>
  import { LogIn } from "lucide-svelte";
  import { superForm } from "sveltekit-superforms";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import * as Alert from "$lib/components/ui/alert";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
  } from "$lib/components/ui/card";

  export let data;
  const { form, errors, constraints, enhance } = superForm(data.form);

  let checked = false;
</script>

<svelte:head>
  <title>Login - Cloudy</title>
</svelte:head>

<Card class="mx-auto mt-[25vh] max-w-sm">
  <CardHeader class="space-y-1">
    <CardTitle class="text-2xl font-bold">Login</CardTitle>
    <CardDescription>Enter your username and password to login.</CardDescription>
  </CardHeader>

  <CardContent>
    <form method="POST" class="space-y-4" use:enhance>
      <div class="space-y-2">
        <Label for="username">Username</Label>

        <Input
          name="username"
          id="username"
          placeholder="dr_ratio"
          type="text"
          aria-invalid={$errors.username ? "true" : undefined}
          spellcheck="false"
          bind:value={$form.username}
          {...$constraints.username}
        />
      </div>

      <div class="space-y-2">
        <Label for="password">Password</Label>

        <Input
          name="password"
          id="password"
          placeholder={checked ? "password" : "*&%#@!-;"}
          type={checked ? "text" : "password"}
          aria-invalid={$errors.username ? "true" : undefined}
          spellcheck="false"
          bind:value={$form.password}
          {...$constraints.password}
        />
      </div>

      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <Checkbox id="terms" bind:checked aria-labelledby="terms-label" />
          <Label
            id="terms-label"
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show password
          </Label>
        </div>

        {#if $errors.username}
          <Alert.Root variant="destructive">
            <Alert.Title>{$errors.username}</Alert.Title>
          </Alert.Root>
        {/if}
      </div>

      <Button class="w-full" type="submit">
        <LogIn class="mr-2 w-5" />
        Login
      </Button>
    </form>
  </CardContent>
</Card>
