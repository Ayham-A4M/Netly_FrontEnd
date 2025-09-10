import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "react-router-dom"
const ProfileCard = ({ profileCard }: { profileCard: any }) => {
    return (
        <NavLink to='/myprofile' replace>
            <Card className="bg-background   gap-2 pt-0">
                <CardHeader className="flex justify-center px-0 items-center flex-col gap-2">
                    <div className="relative w-full mb-5">
                        <div className="w-full h-20  rounded-t-xl" style={{ backgroundColor: `${profileCard?.coverImage ? '' : profileCard?.defaultCoverColor}` }}>
                            {
                                profileCard?.coverImage &&
                                <img src={`http://localhost:8000${profileCard?.coverImage}`} className="w-full h-full object-cover rounded-t-xl" alt="coverImage" />
                            }
                        </div>
                        <Avatar className="size-12 ring-2 ring-primary/20 absolute top-[55%] left-[50%] translate-x-[-50%]">
                            <AvatarImage src={`http://localhost:8000${profileCard?.avatar}`} />
                            <AvatarFallback className="bg-gradient-primary text-slate-200" style={{ backgroundColor: `${profileCard?.defaultCoverColor ? profileCard?.defaultCoverColor : ''}` }}>{profileCard?.userName?.slice(0,2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="font-bold text-primary text-xl">{profileCard?.userName}</span>
                </CardHeader>
                <CardContent className="text-center">
                    <span className="font-extralight text-popover-foreground text-pretty text-[12px] line-clamp-5">
                        {profileCard?.bio}
                    </span>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex justify-between text-[12px] text-primary">
                        <span>{`followers : ${profileCard?.followersCount}`}</span>
                        <span>{`following : ${profileCard?.followingCount}`}</span>
                    </div>
                </CardFooter>
            </Card>
        </NavLink>
    )
}

export default ProfileCard