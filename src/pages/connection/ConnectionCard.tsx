import { AvatarImage, Avatar } from "@/components/ui/avatar"
import AvatarFallBack from "@/components/helperComponent/AvatarFallBack"
import { Link } from "react-router-dom"
import calculateTime from "@/helper/calculateTime"
const ConnectionCard = ({ profileInformation }: { profileInformation: any }) => {
    return (
        <Link to={"/userprofile"} state={{ userId: (profileInformation?.userId || profileInformation.followerId || profileInformation._id) }}>
            <div className="w-full relative flex items-center gap-2 p-4 border-b-2">
                <Avatar className="size-9">
                    <AvatarImage src={`http://localhost:8000${profileInformation?.avatar}`} />
                    <AvatarFallBack name={profileInformation?.userName} backgroundColor={profileInformation?.defaultCoverColor} />
                </Avatar>
                <div className="flex flex-col gap-[2px]">
                    <h1>{profileInformation?.userName}</h1>
                    <span className="text-[12px] line-clamp-2">{profileInformation?.title}</span>
                </div>
                {
                    profileInformation?.createdAt &&
                    <span className="absolute top-1 right-1 text-[11px]">{calculateTime(new Date(profileInformation?.createdAt))}</span>
                }
            </div>

        </Link >
    )
}

export default ConnectionCard