import { FaComment } from "react-icons/fa6"
import A_dropMenu from "../A_dropMenu"

const A_commentCard = ({ comment, setDeleteCommentId, setEditCommentId }: { comment: any, setEditCommentId: React.Dispatch<React.SetStateAction<string | null>>, setDeleteCommentId: React.Dispatch<React.SetStateAction<string | null>> }) => {
    return (
        <div className="border-b-2 flex flex-col gap-0.5 py-2 px-1 relative" key={comment?._id}>
            <A_dropMenu postId={comment?.postId} setEditId={setEditCommentId} setDeleteId={setDeleteCommentId} activityId={comment?._id} />
            <div className="flex items-center gap-1.5">
                <FaComment className="" />
                <span className="flex-1 pr-6">
                    {comment?.content}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <span>love:{comment?.loveCount}</span>
                <span>replies:{comment?.replyCount}</span>

            </div>
        </div>
    )
}

export default A_commentCard