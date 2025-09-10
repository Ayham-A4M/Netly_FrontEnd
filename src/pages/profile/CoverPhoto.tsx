import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";
import handleUpdateProfileImage from './handler/handleUpdateProfileImage';

const CoverPhoto = ({ isEditable, coverImage }: { isEditable: boolean, coverImage: string | null }) => {
    const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log('kk');
            setNewCoverImage(e.target.files[0]);
            const imagePreview = URL.createObjectURL(e.target.files[0]);
            setImagePreview(imagePreview)
        }

    }
    const updateProcess = async() => {
        // here handleUpdateProfileImage will return boolean if ture then will change the 
        // newImageCover to null just for clear the discard or update buttons
        const response = await handleUpdateProfileImage(newCoverImage, setSendingReq)
        if(response){
            setNewCoverImage(null);
        }
    }
    const [imagePreview, setImagePreview] = useState<string>("");
    const [newCoverImage, setNewCoverImage] = useState<null | File>(null);
    const [sendingReq, setSendingReq] = useState(false);
    return (
        <div className="relative h-48 md:h-64">
            {
                (imagePreview) ?
                    <img
                        src={imagePreview}
                        alt="Profile cover"
                        className="w-full h-full object-cover"
                    />
                    :
                    (coverImage) ?
                        <img
                            src={`http://localhost:8000${coverImage}`}
                            alt="Profile cover"
                            className="w-full h-full object-cover"
                        />
                        :
                        <div className="bg-gray-300 dark:bg-stone-800 w-full h-full">

                        </div>
            }

            {
                isEditable &&
                <>

                    {
                        (!newCoverImage || !imagePreview) ?
                            <label htmlFor="selectImage" className="absolute flex items-center flex-row px-3 py-1 rounded-md bg-background dark:bg-slate-800 cursor-pointer top-4 right-1 md:right-4  hover:bg-background">
                                <Camera className="h-4 w-4 mr-2" />
                                Edit Cover
                            </label>
                            :
                            <div className='absolute flex flex-row top-4 right-1 gap-3 items-center'>
                                <Button disabled={sendingReq} className='bg-red-400 dark:bg-red-400 text-slate-100  cursor-pointer' variant="outline" size="icon" onClick={() => {
                                    setImagePreview("");
                                    setNewCoverImage(null)
                                }}>
                                    <IoIosCloseCircleOutline />
                                </Button>
                                <Button disabled={sendingReq} className='bg-primary dark:bg-primary text-slate-100 cursor-pointer' variant="outline" size="icon" onClick={() => { updateProcess() }}>
                                    <IoIosCheckmarkCircleOutline />
                                </Button>
                            </div>
                    }
                    <input type="file" accept='image/*' className='hidden' id='selectImage' onChange={selectImage} />

                </>
            }
        </div>
    )
}

export default CoverPhoto