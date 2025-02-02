import { DialogTitle } from "@repo/editor/src/components/ui/dialog"
import { Dialog, DialogContent, FileUploadInput, FileUploadList, useImportModal } from "@repo/file-explorer"
import { useNavigate } from "@tanstack/react-router"

export function WebImportModal({ folderId }: { folderId: string }) {
  const navigate = useNavigate()
  const { open, setOpen, setFiles } = useImportModal()
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setFiles([])
        }
      }}
    >
      <DialogContent className="" aria-describedby={undefined}>
        <DialogTitle>Import</DialogTitle>
        <FileUploadInput />
        <FileUploadList
          onOpenFile={(id: string) => {
            navigate({ to: `/file/${id}` })
          }}
          folderId={folderId}
        />
      </DialogContent>
    </Dialog>
  )
}
