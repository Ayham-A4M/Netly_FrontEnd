import { FaLink,FaTrash } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";

const A_postReactionCard = ({ reaction,setPostId }: { reaction: any,setPostId:React.Dispatch<React.SetStateAction<string | null>> }) => {

    return (
        <div className="border-b-2 flex flex-col gap-0.5 py-3 pl-1 pr-6 relative" key={reaction?._id}>
            <button className="absolute top-1 right-2 cursor-pointer" onClick={()=>{setPostId(reaction?.postId)}}>
                <FaTrash className="text-red-500 text-[.9rem]"/>
            </button>
            <Link to={`/post/${reaction?.postId}`} className="absolute bottom-0 right-2">
                <FaLink className="text-blue-500" />
            </Link>
            <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                    <span className="flex items-center">you reaction with <IoMdHeart className="text-red-500" /> on  </span>
                    <span className="text-primary font-bold">{reaction?.postOwnerName}</span>
                    post
                </div>
                <div>
                    <span>{reaction?.postContent}....</span>
                </div>

            </div>

        </div>
    )
}

export default A_postReactionCard