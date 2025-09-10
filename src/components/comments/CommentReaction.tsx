import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import handleReactOnComment from "./handler/handleReactOnComment";
const CommentReaction = ({ commentId, postId, commentOwnerId, userReaction, reactionNumber }: { commentId: string, postId: string, commentOwnerId: string, userReaction: boolean, reactionNumber: number }) => {
    const [reaction, setReaction] = useState<boolean>(!!userReaction);

    return (
        <div className='relative w-fit'>
            <Button
                variant="ghost"
                size="sm"
                className={`gap-2 transition-all ${reaction ? 'bg-red-400/10 rounded-xl' : ''} duration-150 select-none flex items-center`}
                onClick={() => { setReaction(prev => !prev); handleReactOnComment(!reaction, setReaction, commentId, commentOwnerId,postId) }} // note handleREactionProcess is about choose wich route should hit delete reaction or submit reaction
            >
                {
                    reaction
                        ? <IoMdHeart className="size-5 text-red-500" />
                        : <IoMdHeartEmpty className="size-5 text-red-500" />}
                <span className="hidden sm:inline">
                    Love
                </span>
                {reaction && userReaction ? reactionNumber : !userReaction && reaction ? reactionNumber + 1 : userReaction && !reaction ? reactionNumber - 1 : reactionNumber}
            </Button>
        </div>
    );
};

export default CommentReaction;
