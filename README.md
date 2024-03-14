# cloudy (WIP!)

A cloud storage solution for personal use. `cloudy` implements a simple *virtual file system* (VFS) where the actual files are stored in a *resource bucket* while the indexes are stored in a `Postgres` database for efficient **CRUDS** (`S` for search & in this case filter) operations. This project was influenced by *forscht's* work on [ddrive](https://github.com/forscht/ddrive).

### 1. Build

```bash
git clone https://github.com/debarchito/cloudy.git
cd cloudy
pnpm install && pnpm build
```

*Dockerfile* coming soon!

### 2.1 What exactly is a "resource bucket"?

In short term, *anything* that can store content in some form. This includes traditional buckets like `S3` or non-traditional ones like `Telegram`. Well, to maintain the scope of the project under a radar, `v1` of `cloudy` will only make use of `Telegram` as a *resource bucket*. I might follow-up with *a generic resource bucket* in future versions of `cloudy`.

### 2.2 Its an application, not a library!

`cloudy` is being designed from *day 1* as an application, not a library. I have plans to ship `cloudy` as a *single-executable* sometime in the future.

### License

MIT
