import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog"

import { feelingsObject } from "@/utils/feelings"
import { Textarea } from "../ui/textarea"

import FeelingSelect from "../post/FeelingSelect"
import { useEffect, useState } from "react"
import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast"
import showErrorToast from "@/helper/showErrorToast"


interface props {
    open: boolean,
    onClose: () => void,
    editPostId: string | null
}

const EditPostDialog = ({ open, onClose, editPostId }: props) => {
    const [content, setContent] = useState<string>("");
    const [feeling, setFeeling] = useState<string>("");
    const [loading,setLaoding]=useState<boolean>(false);
    useEffect(() => {
        const getPostContent = async () => {
            setLaoding(true);
            try {
                const response = await axiosInstance.get(`/api/post/${editPostId}`);
                console.log(response)
                if (response?.status === 200) {
                    console.log(response.data[0]);
                    setContent(response.data?.posts[0]?.content)
                    setFeeling(response.data?.posts[0]?.feeling)
                }

            } catch (err) {
                showErrorToast(err);
            }finally{
                setLaoding(false);
            }
        }
        if (editPostId)
            getPostContent()

    }, [editPostId])
    const handleEditPost = async () => {
        try {
            setLaoding(true);
            const response = await axiosInstance.put(`/api/post/${editPostId}`, { content, feeling });
            if (response.status === 200) {
                toast.success(response.data?.msg || "Post updated successfully");
                onClose();
            }
        } catch (err) {
            showErrorToast(err);
        }finally{
            setLaoding(false);
        }
    }
    return (

        <Dialog open={open} onOpenChange={() => { onClose() }} >

            <DialogContent className="overflow-auto max-h-[500px]">
                <DialogHeader>
                    Update Post
                </DialogHeader>
                <DialogDescription className="space-y-2">
                    <Textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="max-h-96 overflow-auto text-popover-foreground" />
                    <div className="flex items-center gap-2">
                        <FeelingSelect feeling={feeling} setFeeling={setFeeling} />
                        {
                            feeling &&
                            <span className="text-[.9rem] text-popover-foreground">{`${feeling} ${feelingsObject[feeling]?.emoji}` || ""}</span>

                        }
                    </div>
                    <Button disabled={loading} className="w-full rounded-xl cursor-pointer text-slate-200" onClick={(e) => { e.preventDefault(); handleEditPost() }}>
                        Edit
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>

    )

}

export default EditPostDialog