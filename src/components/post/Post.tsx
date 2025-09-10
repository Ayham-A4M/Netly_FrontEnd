import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarFallBack from '../helperComponent/AvatarFallBack'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MessageSquare, Share2 } from 'lucide-react'
import { AiOutlineFileSearch } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react'
import SelectReaction from '../../pages/home/MainFeed/Reactions'
import calculateTime from '@/helper/calculateTime'
import PostDropMenu from './PostDropMenue'
import { Link } from 'react-router-dom'
import { feelingsObject } from '@/utils/feelings'
interface props { e: any, setDeletePostId: React.Dispatch<React.SetStateAction<string | null>>, setPostId: React.Dispatch<React.SetStateAction<string | null>>, setPostOwnerId: React.Dispatch<React.SetStateAction<string | null>> }
const Post = ({ e, setDeletePostId, setPostId, setPostOwnerId }: props) => {
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
        console.log(pRef.current?.clientHeight, e?._id)
        if (pRef.current?.clientHeight) {
            setIsThereReadMore(pRef.current?.clientHeight >= 120);
        }
    }, [pRef.current?.clientHeight])


    return (
        // <div className='flex flex-col gap-3'>
        <Card className="bg-gradient-card border-0 shadow-lg gap-y-2">
            <CardHeader className="pb-4 px-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={`/userprofile`} className='cursor-pointer' state={{ userId: e?.userId }}>
                            <Avatar className="size-9">
                                <AvatarImage src={(e?.avatar && `http://localhost:8000${e?.avatar}`)} />
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
                        <PostDropMenu setDeletePostId={setDeletePostId} postId={e._id} />
                    }
                </div>
            </CardHeader>
            {/* <Link to={`/post/${e?._id}`}> */}
            <CardContent className="space-y-4 px-4">
                {
                    e?.images && e?.images.length > 0 &&
                    < div className='w-full '>
                        {
                            e.images.map((ele: string) => (
                                <img
                                    src={`http://localhost:8000${ele}`}
                                    alt="postImage"
                                    className="w-full h-auto rounded-[2px] object-cover"
                                />
                            ))
                        }
                    </div>

                }
                <div>
                    <p ref={pRef} id="content" className='whitespace-pre-line line-clamp-5'>
                        {
                            e.content &&
                            // isValidText(e.content) ? e.content : e.content.slice(0, 497) + '...'
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
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between w-full  md:gap-4 md:justify-start">
                        <SelectReaction userReaction={e.userReaction} postOwnerId={e.userId} postId={e._id} reactionNumber={e?.loveCount} />

                        <Button variant="ghost" size="sm" className="gap-2 text-blue-500" onClick={() => { setPostId(e?._id); setPostOwnerId(e?.userId) }}>
                            <MessageSquare className="w-4 h-4" />
                            <span className="hidden sm:inline">Comment</span> {e.commentsCount}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 text-green-500">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span> {e.sharedCount}
                        </Button>
                        {
                            !window.location.href.includes("/post/") &&
                            <Link to={`/post/${e?._id}`}>
                                <Button variant="ghost" size="sm" className="gap-2 cursor-pointer text-primary ">
                                    <AiOutlineFileSearch className='w-4 h-4' />
                                    <span className="hidden sm:inline">View</span>
                                </Button>
                            </Link>
                        }


                    </div>
                </div>
            </CardContent>
            {/* </Link> */}
        </Card>

        // </div >
    )
}

export default Post



