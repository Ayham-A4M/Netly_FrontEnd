import { IoMdSend } from "react-icons/io"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import handleSubmitComment from "./handler/handleSubmitComment"
import handleSubmitReply from "./handler/handleSubmitReply"
const WriteComment = ({ postId, commentId, postOwnerId, commentOwnerId }: { postId: string | null, commentId?: string | null, postOwnerId: string | null, commentOwnerId: string | null }) => {
    const [content, setConetent] = useState<string>('')
    const [sendingReq, setSendingReq] = useState<boolean>(false)
    const onSubmit = () => {
        setConetent('');
        if (!!commentId) {
            handleSubmitReply(content, commentId, setSendingReq, postId, commentOwnerId);
            console.log(content);
        }
        else if (!!postId && !!postOwnerId) {
            handleSubmitComment(content, postId, setSendingReq, postOwnerId);
        }

    }
    return (
        <div className="sticky  bottom-0 p-3 bg-background border-top border-t-[1px] border-primary justify-center flex items-center gap-2">
            <Textarea className="w-full max-w-[950px] min-h-5 border-ring" placeholder="write comment ..." value={content} onChange={(e) => { setConetent(e.target.value) }} />
            <button disabled={sendingReq} onClick={(e) => { e.preventDefault(); onSubmit() }}>
                <IoMdSend className="text-primary size-7" />
            </button>
        </div>
    )
}

export default WriteComment