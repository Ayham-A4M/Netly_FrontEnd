import { Dialog, DialogContent } from "../ui/dialog"
import { useEffect, useState } from "react"

const ShowImageDialog = ({ onClose, imagePath }: { onClose: () => void, imagePath: string | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (imagePath) {
            setIsOpen(true)
        }
    }, [imagePath])
    return (
        <Dialog open={isOpen} onOpenChange={() => { onClose();setIsOpen(false) }}>
            <DialogContent className="p-0 shadow-none rounded-none border-0">
                <img src={`http://localhost:8000${imagePath}`} alt="postImage"
                    className="w-auto h-auto rounded-[2px]"
                />
            </DialogContent>
        </Dialog>
    )
}

export default ShowImageDialog