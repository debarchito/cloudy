# cloudy (WIP!)

A cloud storage solution for personal use. `cloudy` implements a simple _virtual file system_ (VFS) where the actual files are stored in a _resource bucket_ while the indexes are stored in a `Postgres` database for efficient **CRUDS** (`S` for search & in this case filter) operations. This project was influenced by _forscht's_ work on [ddrive](https://github.com/forscht/ddrive).

### 1. Build

```bash
git clone https://github.com/debarchito/cloudy.git
cd cloudy
pnpm install && pnpm build
```

_Dockerfile_ coming soon!

### 2.1 What exactly is a "resource bucket"?

In short term, _anything_ that can store content in some form. This includes traditional buckets like `S3` or non-traditional ones like `Telegram`. Well, to maintain the scope of the project under a radar, `v1` of `cloudy` will only make use of `Telegram` as a _resource bucket_. I might follow-up with _a generic resource bucket_ in future versions of `cloudy`.

### 2.2 Its an application, not a library!

`cloudy` is being designed from _day 1_ as an application, not a library. I have plans to ship `cloudy` as a _single-executable_ sometime in the future.

### License

MIT
