import useGetComments from "@/hooks/useGetComments"
import NoComments from "./noComments";
import { IoMdClose, IoIosArrowRoundBack } from "react-icons/io";
import WriteComment from "./WriteComment";
import ShowComments from "./showComments";
import Loader from "../ui/loader";
import React, { useState } from "react";
import { createContext } from "react";
import useGetCommentReplies from "@/hooks/useGetCommentReplies";
import ShowReplies from "./ShowReplies";
import handleGetMainComment from "./handler/handleGetMainComment";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
interface CommentReplyContext {
    commentId: string | null,
    setCommentId: React.Dispatch<React.SetStateAction<string | null>>,
    setCommentOwnerId: React.Dispatch<React.SetStateAction<string | null>>,
}
export const CommentReplyContext = createContext<CommentReplyContext | null>(null);


const CommentSections = ({ postId, setPostId, postOwnerId }: { postId: string, setPostId: React.Dispatch<React.SetStateAction<string | null>>, postOwnerId: string | null }) => {
    const { comments, setPage, loading, page, limitOfPages } = useGetComments(postId);
    const [commentId, setCommentId] = useState<string | null>(null);
    const { commentReplies, loadingReplies, numberOfPages, pageOfReplies, setPageOfReplies } = useGetCommentReplies(commentId);
    const [commentOwnerId, setCommentOwnerId] = useState<null | string>(null);
    useInfiniteScroll(page, limitOfPages, comments, loading, setPage);
    useInfiniteScroll(pageOfReplies, numberOfPages, commentReplies, loadingReplies, setPageOfReplies)
    return (
        <div className='h-[90vh]  shadow-2xl rounded-t-2xl w-full overflow-y-scroll bg-background z-[100] fixed bottom-0 right-0'>
            <div className="flex justify-between flex-col gap-3 w-full h-full">
                <div className="flex flex-col gap-2">
                    <div className={`flex w-full ${commentId ? 'justify-between' : 'justify-end'} px-3 pt-3 sticky top-0`}>
                        {
                            commentId &&
                            <IoIosArrowRoundBack className='text-popover-foreground size-7' role="button" onClick={() => { setCommentId(null) }} />
                        }
                        <IoMdClose className='text-popover-foreground size-7' role='button' onClick={() => { setPostId(null) }} />

                    </div>
                    <CommentReplyContext.Provider value={{ commentId, setCommentId, setCommentOwnerId }}>
                        {
                            (loading && (!comments || comments?.length === 0)) ?
                                <div className="flex h-screen w-full py-16 justify-center items-center">
                                    <Loader />
                                </div>
                                :
                                (loadingReplies && (!commentReplies || commentReplies?.length === 0))
                                    ?
                                    <div className="flex h-screen w-full py-16 justify-center items-center">
                                        <Loader />
                                    </div>
                                    :
                                    (commentReplies?.length == 0 && commentId) ?
                                        <NoComments />
                                        :
                                        (commentReplies && commentId) ?
                                            <div className="">
                                                <ShowReplies commentReplies={commentReplies} mainComment={handleGetMainComment(commentId, comments)} />
                                                {
                                                    (commentReplies && loadingReplies) &&
                                                    <div className="py-2 flex justify-center items-center">
                                                        <Loader />
                                                    </div>
                                                }
                                            </div>
                                            :
                                            comments || commentReplies ?
                                                <div>
                                                    <ShowComments comments={comments} />
                                                    {
                                                        (comments && loading) &&
                                                        <div className="py-2 flex justify-center items-center">
                                                            <Loader />
                                                        </div>
                                                    }
                                                </div>
                                                :
                                                <NoComments />
                        }
                    </CommentReplyContext.Provider>

                </div>
                <WriteComment postId={postId} commentId={commentId} postOwnerId={postOwnerId} commentOwnerId={commentOwnerId} />
            </div>

        </div>
    )
}

export default React.memo(CommentSections)