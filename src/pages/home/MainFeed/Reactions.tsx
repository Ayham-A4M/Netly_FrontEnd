import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import handleReactionProcess from "./handler/handleReactionProcess";
const Reactions = ({ postId, postOwnerId, userReaction, reactionNumber }: { postId: string, postOwnerId: string, userReaction: boolean, reactionNumber: number }) => {
    const [reaction, setReaction] = useState<boolean>(!!userReaction);

    return (
        <div className='relative w-fit'>
            <Button
                name="reaction-post"
                variant="ghost"
                size="sm"
                className={`gap-2 cursor-pointer  transition-all ${reaction ? 'bg-red-400/10 rounded-xl' : ''} duration-150 select-none flex items-center`}
                onClick={() => { setReaction(prev => !prev); handleReactionProcess(!reaction, setReaction, postId, postOwnerId) }} // note handleREactionProcess is about choose wich route should hit delete reaction or submit reaction
            >
                {
                    reaction
                        ? <IoMdHeart className="size-5 text-red-500" />
                        : <IoMdHeartEmpty className="size-5 text-red-500" />}
                <span className="hidden sm:inline">
                    Love
                </span>
                {reaction && userReaction ? reactionNumber : !userReaction && reaction ? reactionNumber + 1 : !reaction && userReaction ? reactionNumber - 1 : reactionNumber}
            </Button>
        </div>
    );
};

export default Reactions;
