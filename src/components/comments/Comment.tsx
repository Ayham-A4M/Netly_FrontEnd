import { Avatar, AvatarImage } from "../ui/avatar"
import { Link } from "react-router-dom"
import AvatarFallBack from "../helperComponent/AvatarFallBack";
import { FaRepeat } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useContext } from "react";
import { CommentReplyContext } from "./commentSections";
import { addScroll } from "@/helper/editScroll"; // for delete noscroll class from body
import CommentReaction from "./CommentReaction";
const Comment = ({ e, isReply }: { e: any, isReply: boolean }) => {

    const commentContext = useContext(CommentReplyContext);
    return (
        <div className="space-y-2.5 p-2 pb-4 border-b-[1px] border-gray-300 dark:border-gray-700" key={e._id}>
            <div className="flex items-center gap-2 mb-3">
                <Link to='/userprofile' className='cursor-pointer' state={{ userId: e?.userId }} onClick={() => { addScroll() }}>
                    <Avatar className="size-8">
                        <AvatarImage src={`${e?.avatar}`} />
                        <AvatarFallBack name={e?.userName} backgroundColor={e?.defaultCoverColor} />
                    </Avatar>
                </Link>
                <span className="text-popover-foreground text-md font-light">
                    {e?.userName}
                </span>
            </div>
            <p className="md:text-xl text-lg font-extralight">
                {e?.content}
            </p>
            {
                !isReply &&
                <div className="flex justify-between md:justify-start md:gap-15 items-center">
                    <CommentReaction commentId={e?._id} postId={e?.postId} commentOwnerId={e?.userId} reactionNumber={e?.loveCount} userReaction={e?.userReaction} />
                    <Button variant="ghost" className="flex items-center gap-2 px-0 bg-transparent text-popover-foreground" onClick={() => { commentContext?.setCommentId(e?._id); commentContext?.setCommentOwnerId(e?.userId) }}>
                        <FaRepeat className="size-4 text-popover-foreground" />
                        <span>reply</span>
                        <span>({e?.replyCount})</span>
                    </Button>
                </div>

            }

        </div>
    )
}

export default Comment