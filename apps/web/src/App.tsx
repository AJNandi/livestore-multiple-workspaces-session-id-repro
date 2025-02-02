import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: false,
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultErrorComponent: (e) => <div>Error: {e.error.message}</div>,
})

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <div className="h-full w-full bg-slate-200">
      <RouterProvider router={router} />
    </div>
  )
}
