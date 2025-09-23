import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog"
import { Textarea } from '../ui/textarea';
import FeelingSelect from '../post/FeelingSelect';
import { Share2 } from 'lucide-react';
import { feelingsObject } from '@/utils/feelings';
import { Button } from '../ui/button';
import axiosInstance from '@/helper/axiosInterceptor';
import toast from 'react-hot-toast';
const ShareDialog = ({ open, onClose, postId }: { open: boolean, onClose: () => void, postId: string | null }) => {
    const [content, setContent] = useState<string>("check this !");
    const [feeling, setFeeling] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const handleSharePost = async () => {
        try {
            if (!postId) {
                toast.error("no specific post");
                return;
            }
            setLoading(true);
            const response = await axiosInstance.post(`/api/post/sharePost/${postId}`, { content, feeling,publishedAt:new Date() });
            console.log(response);
            if(response.status===200){
                toast.success(response.data?.msg || "post shared")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={() => { onClose() }}>

            <DialogContent className='max-h-[80%] overflow-auto'>
                <DialogHeader>
                    <div className='flex items-center gap-1.5'>
                        Sharing Post <Share2 className='text-green-500' />
                    </div>
                </DialogHeader>
                <Textarea placeholder='content' className='border-2' value={content} onChange={(e) => { setContent(e.target.value) }} />
                <div className='flex items-center gap-3'>
                    <FeelingSelect feeling={feeling} setFeeling={setFeeling} />
                    {
                        feeling &&
                        <span className='font-extralight text-[.9rem]'>
                            {feeling}{feelingsObject[feeling].emoji}
                        </span>
                    }
                </div>
                <Button disabled={loading} className='rounded-none text-slate-200 cursor-pointer' onClick={()=>{handleSharePost()}}>
                    share
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default ShareDialog