import { makeWorker } from "@livestore/web/worker"
import { makeWsSync } from '@livestore/sync-cf'
import { schema } from "@repo/livestore"

makeWorker({ schema, sync: { makeBackend: ({ storeId }) => makeWsSync({ url: import.meta.env.VITE_LIVESTORE_SYNC_URL!, storeId }) } })
