import { LiveStoreProvider } from "@livestore/react"
import { makeAdapter } from "@livestore/web"
import LiveStoreSharedWorker from "@livestore/web/shared-worker?sharedworker"
import { BootStatus, schema, seed, Store } from "@repo/livestore"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useState } from "react"
import { unstable_batchedUpdates as batchUpdates } from "react-dom"
import LiveStoreWorker from "../livestore.worker?worker"

const resetPersistence = import.meta.env.DEV && new URLSearchParams(window.location.search).get("reset") !== null

const renderBootStatus = (bootStatus: BootStatus) => {
  console.log("bootStatus:", bootStatus)
  switch (bootStatus.stage) {
    case "loading":
      return <div>Loading LiveStore...</div>
    case "migrating":
      return (
        <div>
          Migrating tables ({bootStatus.progress.done}/{bootStatus.progress.total})
        </div>
      )
    case "rehydrating":
      return (
        <div>
          Rehydrating state ({bootStatus.progress.done}/{bootStatus.progress.total})
        </div>
      )
    case "syncing":
      return (
        <div>
          Syncing state ({bootStatus.progress.done}/{bootStatus.progress.total})
        </div>
      )
    case "done":
      return <div>LiveStore ready</div>
  }
}

if (resetPersistence) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.delete("reset")
  window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`)
}

export const Route = createFileRoute("/_livestore")({
  component: LiveStoreLayout,
})

const makeAdapterForWorkspace = (activeWorkspaceId: string) =>
  makeAdapter({
    worker: LiveStoreWorker,
    sharedWorker: LiveStoreSharedWorker,
    storage: { type: "opfs" },
    // syncing,
    // NOTE this should only be used for convenience when developing (i.e. via `?reset` in the URL) and is disabled in production
    resetPersistence,
    // @ts-expect-error TODO fix typing
    syncBackend: import.meta.env.VITE_LIVESTORE_SYNC_URL
      ? {
          type: "cf",
          url: import.meta.env.VITE_LIVESTORE_SYNC_URL,
          // --> THIS IS WHAT WE NEED TO CHANGE TO GET THE WORKER TO SYNC TO THE CORRECT WORKSPACE
          roomId: activeWorkspaceId,
        }
      : undefined,
  })

function LiveStoreLayout() {
  const [workspaces, setWorkspaces] = useState<{ id: string }[]>([{ id: `livestore-repro-1` }])

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(workspaces[0].id)

  if (!activeWorkspaceId) {
    return <div>No active workspace</div>
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium">Workspaces</div>
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="text-sm">
            <button className="bg-slate-400 p-2 rounded-md" onClick={() => setActiveWorkspaceId(workspace.id)}>
              Set {workspace.id} as active
            </button>
          </div>
        ))}
      </div>
      <div>Active Workspace: {activeWorkspaceId}</div>
      <div>
        <button
          className="bg-slate-400 p-2 rounded-md"
          onClick={() => {
            const newWorkspaceId = `livestore-repro-${workspaces.length + 1}`
            setWorkspaces([
              ...workspaces,
              {
                id: newWorkspaceId,
              },
            ])
            setActiveWorkspaceId(newWorkspaceId)
          }}
        >
          create new workspace
        </button>
      </div>
      <div className="bg-white">
        <LiveStoreProvider
          schema={schema}
          storeId={activeWorkspaceId}
          adapter={makeAdapterForWorkspace(activeWorkspaceId)}
          renderLoading={renderBootStatus}
          batchUpdates={batchUpdates}
          boot={(store: Store) => seed(store)}
        >
          <Outlet />
        </LiveStoreProvider>
      </div>
    </div>
  )
}
