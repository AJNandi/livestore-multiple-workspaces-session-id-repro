# Subset Monorepo

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `apps/web`: Main web client
- `packages/livestore`: Livestore packages



###  To run the app

First install node mods. Run tsc. Then start vite.


```
pnpm i
pnpm tsc
pnpm run web
```

App will be hosted at http://localhost:5173/


### Repro instructions

- Create new workspace
- Switch between workspaces
- Eventually, but not always on the first switch, a query will fail 

```
hook.js:608 Error parsing SQL query result.

Query: SELECT * FROM 'filter_state' WHERE id = ?
Bind values: ["v0n4K"]

Expected schema: (ReadonlyArray<({ readonly value: (parseJson <-> { readonly orderBy: "name" | "created" | "modified"; readonly orderDirection: "asc" | "desc"; readonly query?: string | undefined }) } <-> { readonly orderBy: "name" | "created" | "modified"; readonly orderDirection: "asc" | "desc"; readonly query?: string | undefined })> <-> { readonly orderBy: "name" | "created" | "modified"; readonly orderDirection: "asc" | "desc"; readonly query?: string | undefined })

```

