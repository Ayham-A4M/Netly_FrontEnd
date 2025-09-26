import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarFallBack from '../helperComponent/AvatarFallBack'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MessageSquare, Share2 } from 'lucide-react'
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react'
import SelectReaction from '../../pages/home/MainFeed/Reactions'
import calculateTime from '@/helper/calculateTime'
import PostDropMenu from './PostDropMenue'
import { Link } from 'react-router-dom'
import { feelingsObject } from '@/utils/feelings'
import SharedPost from './SharedPost'
interface props { e: any, setSharePostId: React.Dispatch<React.SetStateAction<string | null>>, setImagePath: React.Dispatch<React.SetStateAction<string | null>>, setDeletePostId: React.Dispatch<React.SetStateAction<string | null>>, setPostId: React.Dispatch<React.SetStateAction<string | null>>, setPostOwnerId: React.Dispatch<React.SetStateAction<string | null>>, setEditPostId: React.Dispatch<React.SetStateAction<string | null>> }
const Post = ({ e, setSharePostId, setImagePath, setDeletePostId, setPostId, setPostOwnerId, setEditPostId }: props) => {
    const [showMore, setShowMore] = useState(false);
    const pRef = useRef<HTMLParagraphElement>(null);
    const handleDisplayContent = () => {
        if (!showMore) {
            pRef.current?.classList.remove("line-clamp-5")
        } else {
            pRef.current?.classList.add("line-clamp-5")
        }
        setShowMore(prev => !prev);
    }
    const [isThereReadMore, setIsThereReadMore] = useState<boolean>(false);
    useEffect(() => {
        if (pRef.current?.clientHeight) {
            setIsThereReadMore(pRef.current?.clientHeight >= 120);
        }
    }, [pRef.current?.clientHeight])

    const [currentImageIdx, setCurrentImageIdx] = useState(0);



    const handlePrevImage = () => {
        setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : prev));
    };
    const handleNextImage = () => {
        setCurrentImageIdx((prev) => (e.images && prev < e.images.length - 1 ? prev + 1 : prev));
    };


    return (
        <Card className="bg-gradient-card border-0 shadow-lg gap-y-2">
            <CardHeader className="pb-4 px-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={`/userprofile`} className='cursor-pointer' state={{ userId: e?.userId }}>
                            <Avatar className="size-9">
                                <AvatarImage  src={(e?.avatar && `${e?.avatar}`)} loading='lazy' />
                                <AvatarFallBack name={e?.userName} backgroundColor={e?.defaultCoverColor} />
                            </Avatar>
                        </Link>
                        <div>
                            <div className='flex items-center gap-3'>
                                <p className="font-semibold">{`${e?.userName} `}</p>
                                <span className='font-light'>
                                    {`${e.feeling ? `is feeling ${e.feeling + feelingsObject[e.feeling].emoji}` : ''}`}
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground">{calculateTime(new Date(e.publishedAt))}</p>
                        </div>
                    </div>

                    {
                        e.isEditable &&
                        <PostDropMenu setDeletePostId={setDeletePostId} postId={e._id} setEditPostId={setEditPostId} />
                    }
                </div>
            </CardHeader>

            <CardContent className="space-y-4 px-4">
                {
                    // images slider
                    e?.images && e?.images.length > 0 &&
                    <div className='w-full relative flex flex-col items-center'>
                        <div className="w-full flex items-center justify-center gap-2">


                            <img
                                src={`${e.images[currentImageIdx]}`}
                                alt="postImage"
                                className="rounded-[2px] object-cover w-full aspect-[5/3] cursor-pointer"
                                style={{ maxWidth: '100%', height: 'auto' }}
                                loading='lazy'
                                onClick={() => { setImagePath(e.images[currentImageIdx]) }}
                            />

                        </div>
                        <div className='flex items-center gap-3 pt-2'>
                            {
                                e?.images?.length > 1 &&
                                <>
                                    <button
                                        className='cursor-pointer'
                                        onClick={handlePrevImage}
                                    >
                                        <FaChevronLeft className='text-primary' />
                                    </button>

                                    <span className='text-primary mt-1 text-[.8rem]'>({currentImageIdx + 1}/{e.images.length})</span>


                                    <button
                                        className='cursor-pointer'
                                        onClick={handleNextImage}
                                    >
                                        <FaChevronRight className='text-primary' />
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                }
                {/* post content */}
                <div>
                    <p ref={pRef} id="content" className='whitespace-pre-line line-clamp-5'>
                        {
                            e.content &&
                            e.content

                        }

                    </p>
                    {
                        (!showMore && isThereReadMore) &&
                        <span className="text-primary cursor-pointer" role="button" onClick={() => { handleDisplayContent() }}  >read more</span>

                    }
                    {
                        (showMore && isThereReadMore) &&
                        <span className="text-primary cursor-pointer" role="button" onClick={() => { handleDisplayContent() }}  >show less</span>

                    }


                </div>

                {/* shared post section it will shown if only the post is shared */}
                {
                    e?.sharedPost &&
                    <SharedPost e={e?.sharedPost} setImagePath={setImagePath} />
                }

                {/* reactions with post */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between w-full  md:gap-4 md:justify-start">
                        <SelectReaction userReaction={e.userReaction} postOwnerId={e.userId} postId={e._id} reactionNumber={e?.loveCount} />

                        <Button variant="ghost" size="sm" className="gap-2 cursor-pointer " onClick={() => { setPostId(e?._id); setPostOwnerId(e?.userId) }}>
                            <MessageSquare className="w-4 h-4" />
                            <span className="hidden sm:inline">Comment</span> {e.commentsCount}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 cursor-pointer " onClick={() => { setSharePostId(e?._id) }}>
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span> {e.sharedCount}
                        </Button>
                        {
                            !window.location.href.includes("/post/") &&
                            <Link to={`/post/${e?._id}`}>
                                <Button variant="ghost" size="sm" className="gap-2 cursor-pointer hover:text-primary ">
                                    <AiOutlineFileSearch className='w-4 h-4' />
                                    <span className="hidden sm:inline">View</span>
                                </Button>
                            </Link>
                        }


                    </div>
                </div>

            </CardContent>

        </Card>
    )
}

export default React.memo(Post)



