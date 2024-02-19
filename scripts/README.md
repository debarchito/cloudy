### Scripts

This directory contains scripts that emulate server actions that can't be exposed to the outer world (like sign-up). Files inside the `deps` directory are not meant to be run directly, but used by other scripts. On another note, scripts are isolated from the entire project, so they can't import anything from the `src` directory. Reason being many of the setup files use SvelteKit's aliases (`$env`, `$lib` etc.) which are not available in Node plus they are all written in TypeScript anyway (the scripts are all in JavaScript to avoid a build step). So, duplication may occur, but confine it to `deps`. Runnable scripts have shebangs - just `chmod` them and run.

### Exhaustive documentation of scripts

- `createUser.js`: Creates a user in the database.

```bash
cd scripts

chmod +x createUser.js
./createUser.js

# or

node createUser.js
```
