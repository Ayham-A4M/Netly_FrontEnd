
import { FaLink,FaTrash } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";

const A_commentReactionsCard = ({ reaction,setCommentId }: { reaction: any,setCommentId:React.Dispatch<React.SetStateAction<string | null>> }) => {

    return (
        <div className="border-b-2 flex flex-col gap-0.5 py-3 pl-1 pr-6 relative" key={reaction?._id}>
            <button className="absolute top-1 right-2 cursor-pointer" onClick={()=>{setCommentId(reaction?.commentId)}}>
                <FaTrash className="text-red-500 text-[.9rem]"/>
            </button>
            <Link to={`/post/${reaction?.postId}`} className="absolute bottom-0 right-2">
                <FaLink className="text-blue-500" />
            </Link>
            <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                    <span className="flex items-center">you reaction with <IoMdHeart className="text-red-500" /> on  </span>
                    <span className="text-primary font-bold">{reaction?.ownerUserName}</span>
                    comment
                </div>
                <div>
                    <span>{reaction?.commentContent}....</span>
                </div>

            </div>

        </div>
    )
}

export default A_commentReactionsCard