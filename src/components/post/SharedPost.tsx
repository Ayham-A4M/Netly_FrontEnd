import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarFallBack from '../helperComponent/AvatarFallBack'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react'
import calculateTime from '@/helper/calculateTime'
import { Link } from 'react-router-dom'

import { feelingsObject } from '@/utils/feelings'
interface props { e: any, setImagePath: React.Dispatch<React.SetStateAction<string | null>> }
const SharedPost = ({ e, setImagePath }: props) => {
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
        <Card className="bg-gradient-card border-0 shadow-none border-y-2 gap-y-0">
            <CardHeader className="pb-4 px-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={`/userprofile`} className='cursor-pointer' state={{ userId: e?.userId }}>
                            <Avatar className="size-9">
                                <AvatarImage src={(e?.avatar && `http://localhost:8000${e?.avatar}`)} loading='lazy' />
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
                </div>
            </CardHeader>
            <CardContent className="space-y-0 px-4">
                {
                    e?.images && e?.images.length > 0 &&
                    <div className='w-full relative flex flex-col items-center'>
                        <div className="w-full flex items-center justify-center gap-2">


                            <img
                                src={`http://localhost:8000${e.images[currentImageIdx]}`}
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
                <div className='flex items-center justify-end'>
                   
                        <Link to={`/post/${e?._id}`}>
                            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer text-primary ">
                                <AiOutlineFileSearch className='w-4 h-4' />
                                <span className="hidden sm:inline">View</span>
                            </Button>
                        </Link>
        
                </div>

            </CardContent>

        </Card>
    )
}

export default SharedPost



