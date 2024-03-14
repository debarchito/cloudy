### Scripts

This directory contains scripts that emulate server actions that can't be exposed to the outer world (like `account registration`). Files inside the `deps` directory are not meant to be run directly, but used by other scripts. On another note, scripts are isolated from the entire project, so they can't import anything from the `src` directory. Reason being many of the setup files use SvelteKit's aliases (`$env`, `$lib` etc.) which are not available in Node plus they are all written in TypeScript anyway (the scripts are all in JavaScript to avoid a build step). So, while duplication may occur, it is confined to the `deps` directory. Runnable scripts have shebangs but its better to run them using their respective `pnpm` tasks.

### Exhaustive documentation of scripts

- `createUser.js`: Creates a user in the database and a unique root directory exclusive to the user.

```bash
pnpm db:createUser
```
