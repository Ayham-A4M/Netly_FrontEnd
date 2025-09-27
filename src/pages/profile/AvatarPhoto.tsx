import AvatarFallBack from "@/components/helperComponent/AvatarFallBack"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { TbPhotoEdit } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import handleUpdateAvatar from "./handler/handleUpdateAvatar";
interface props {
    avatar: string,
    userName: string,
    defaultCoverColor: string,
    isEditable: boolean
}
const AvatarPhoto = ({ isEditable, avatar, userName, defaultCoverColor }: props) => {
    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>("");
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file);
            setNewAvatar(file);
            const urlPreview = URL.createObjectURL(file);
            setAvatarPreview(urlPreview);
        }
    }
    const updateAvatar = async () => {
        const response = await handleUpdateAvatar(newAvatar);
        if (response) {
            setNewAvatar(null);
        }
    }
    return (

        <div className="relative w-fit">
            <Avatar className="mb-4  text-3xl sm:mb-0 size-32 sm:size-40 border-4 border-background overflow-hidden shadow-xl">
                <AvatarImage alt="user-image" src={avatarPreview || (avatar && `${avatar}`)} />
                <AvatarFallBack name={userName} backgroundColor={defaultCoverColor} />
            </Avatar>
            {
                isEditable &&
                <input type="file" className="hidden" accept="image/*" id="selectAvatarPhoto" onChange={handleAvatarChange} />
            }
            {
                isEditable &&
                (
                    (!!!newAvatar) ?
                        <label htmlFor="selectAvatarPhoto" className="absolute bottom-3 right-[-4px] z-50 cursor-pointer"><TbPhotoEdit className="size-6  " /></label>
                        :
                        <div className="flex  items-center gap-3.5  absolute bottom-3 right-[-50px] z-50 cursor-pointer ">
                            <FaCircleCheck name="confirm-edit-avatar" className="size-6 text-green-400" role="button" onClick={() => { updateAvatar() }} />
                            <FaCircleXmark name="cancel-edit-avatar" className="size-6 text-red-300" role="button" onClick={() => { setAvatarPreview(""); setNewAvatar(null) }} />
                        </div>
                )
            }
        </div>

    )
}

export default AvatarPhoto