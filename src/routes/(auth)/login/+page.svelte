<script>
  import { LogIn } from "lucide-svelte";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
  } from "$lib/components/ui/card";

  let checked = false;
</script>

<svelte:head>
  <title>Login - Cloudy</title>
</svelte:head>

<Card class="mt-[25vh] mx-auto max-w-sm">
  <CardHeader class="space-y-1">
    <CardTitle class="text-2xl font-bold">Login</CardTitle>
    <CardDescription>
      Enter your username and password to login.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div class="space-y-4">
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input id="username" placeholder="dr_ratio" required type="text" />
      </div>

      <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input id="password" placeholder={checked ? "password" : "*&%#@!-;"} required type={checked ? "text" : "password"} />
      </div>

      <div class="space-y-2">
        <Checkbox id="terms" bind:checked aria-labelledby="terms-label" />
        <Label
          id="terms-label"
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show password
        </Label>
      </div>

      <Button class="w-full" type="submit">
        <LogIn class="mr-2 w-5" />
        Login
      </Button>
    </div>
  </CardContent>
</Card>
