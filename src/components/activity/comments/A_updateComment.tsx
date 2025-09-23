import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
const A_updateComment = ({ open, onClose, onSubmit, initialContent }: { open: boolean, onClose: () => void, onSubmit: (commentContent:string) => void, initialContent:string}) => {
    const [commentContent, setCommentContent] = useState(initialContent);
    return (
        <Dialog open={open} onOpenChange={() => { onClose() }} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-zinc-600 dark:text-zinc-300">Edit Comment</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Textarea className="text-popover-foreground" value={commentContent} onChange={(e) => { setCommentContent(e.target.value) }} />
                </DialogDescription>
                <DialogFooter>
                    <Button type="submit" className="bg-zinc-600 text-slate-200 cursor-pointer" onClick={() => { onSubmit(commentContent) }}>Edit</Button>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}

export default A_updateComment