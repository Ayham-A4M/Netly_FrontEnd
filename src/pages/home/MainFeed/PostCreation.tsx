import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { BadgeQuestionMarkIcon } from "lucide-react"
import { useEffect, useState } from "react"
import handleCreateNormalPost from "./handler/handleCreateNormalPost"
import { BsImages } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import FeelingSelect from "@/components/post/FeelingSelect"
import { feelingsObject } from "@/utils/feelings"
import ConfigMenu from "@/components/Navs/ConfigMenu"
const PostCreation = () => {
    const [postContent, setPostContent] = useState<string | null>(null);
    const [sendingReq, setSendingReq] = useState(false);
    const [postImages, setPostImages] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [feeling, setFeeling] = useState<string>("");
    useEffect(() => {
        console.log(feeling);
    }, [feeling])
    const handleChangeImages = (eve: React.ChangeEvent<HTMLInputElement>) => {
        if (eve.target.files) {
            const files = eve.target.files;
            if (files.length > 0) {
                console.log(files);
                setPostImages(files);
                let previewImages: string[] = [];
                Array.from(files).forEach((e) => {
                    previewImages.push(URL.createObjectURL(e))
                })
                setPreviewImages(previewImages);
            }
        }
    }
    const createPost = async () => {
        const response = await handleCreateNormalPost(postContent, setSendingReq, postImages, feeling)
        if (response) {
            setFeeling("");
            setPostContent("");
            setPreviewImages([]);
            setPostImages(null);
        }
    }


    return (
        <Card className="bg-gradient-card border-0 relative shadow-lg gap-y-2 ">
            <CardHeader>
                <div className="flex items-center gap-2 justify-between ">
                    <div className="flex items-center gap-1 text-primary">
                        <span className="italic font-extralight text-[14px]">What's on your mind</span>
                        <BadgeQuestionMarkIcon className="size-3.5" />
                    </div>
                    <div className="md:hidden">
                        <ConfigMenu />
                    </div>

                </div>
            </CardHeader>
            <CardContent className="">
                <div className="flex gap-3">

                    <Textarea placeholder="What's on your mind?" value={postContent || ""} className="bg-muted/50" onChange={(e) => {
                        setPostContent(e.target.value);
                    }} />
                </div>

            </CardContent>
            <CardFooter className="flex flex-col gap-2  items-start">
                <div className="flex justify-between w-full">
                    <label htmlFor="imagesSelect" className="px-3.5 py-1 bg-background border-[1px] text-popover-foreground hover:border-primary  cursor-pointer duration-300 rounded-2xl text-md font-extralight text-sm  flex items-center gap-1">
                        Photo
                        <BsImages className="text-green-500 " />
                    </label>
                    <input type="file" className="hidden" id="imagesSelect" multiple onChange={handleChangeImages} />

                    <div className="flex items-center gap-3">
                        {
                            feeling &&
                            <span className="font-extralight text-[14px]">{feeling + feelingsObject[feeling].emoji}</span>
                        }
                        <FeelingSelect setFeeling={setFeeling} feeling={feeling} />
                    </div>



                </div>
                <div className="flex justify-end w-full">
                    {
                        <Button disabled={sendingReq} className="cursor-pointer text-primary hover:text-white hover:bg-primary duration-300 transition-colors" size="icon" variant="outline"
                            onClick={() => {
                                createPost()
                            }}

                        >
                            <RiSendPlaneFill className="size-4 " />
                        </Button>
                    }
                </div>
                {
                    previewImages.length > 0 &&
                    <>
                        <div className="flex items-center w-full justify-start gap-3">
                            {
                                previewImages?.map((e) => (
                                    <img src={e} className="size-16 rounded-[2px]" />
                                ))
                            }

                        </div>
                        <div >
                            <Button className="text-[9px] bg-red-400 dark:bg-red-400 text-slate-100" variant="outline" size="icon" onClick={() => { setPostImages(null); setPreviewImages([]) }}>
                                Discard
                            </Button>
                        </div>
                    </>

                }

            </CardFooter>
        </Card>

    )
}

export default PostCreation