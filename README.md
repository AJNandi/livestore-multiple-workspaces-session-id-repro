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

# LiveStore Build Error Reproduction 

## Steps to Reproduce

Install deps

```
pnpm i
```

Build the app

```
pnpm build
```

Host preview

```
pnpm preview
```

Open the app at http://localhost:4173/


## Actual Behavior

The app fails to build with the following error:

``` 
hook.js:608 Error: useStore can only be used inside StoreContext.Provider
    at Iv (LiveStoreContext.js:10:15)
    at Ov (useQuery.js:24:23)
    at zv (useQuery.js:20:48)
```







