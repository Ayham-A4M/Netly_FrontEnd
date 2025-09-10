import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
const DeleteDialog = ({ open, onClose, onSubmit }: { open: boolean, onClose: () => void, onSubmit: () => void }) => {
    return (
        <Dialog open={open} onOpenChange={() => { onClose() }} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-500">Delete Record</DialogTitle>
                    <DialogDescription className="border-l-yellow-300 border-l-4 py-7 pl-3 rounded-[6px]">
                        <div className="space-y-3">
                            <h1 className="text-red-500 font-bold text-start">Warning</h1>
                            <div className="text-popover-foreground text-pretty text-start">
                                This action cannot be undone. Deleting this record will permanently remove
                                their information and some related data will affected by this action
                                By accept to delete this record <span className="text-red-500 font-bold">you cant restoration</span>
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer" onClick={() => { onClose }}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-red-500 text-slate-200 cursor-pointer" onClick={() => { onSubmit() }}>Delete</Button>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}

export default DeleteDialog