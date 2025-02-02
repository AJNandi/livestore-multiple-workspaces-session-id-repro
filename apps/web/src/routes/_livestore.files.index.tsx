import { useFiles } from "@repo/livestore"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_livestore/files/")({
  component: FilesIndexRoute,
})

function FilesIndexRoute() {
  const files = useFiles()
  console.log("files:", files)

  return (
    <div className="p-4">
      <div>Files</div>
      {files.map((fileId) => (
        <div key={fileId}>File id: {fileId}</div>
      ))}
    </div>
  )
}
