import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "react-router-dom"
const ProfileCard = ({ profileCard }: { profileCard: any }) => {
    return (
        <NavLink to='/myprofile' replace>
            <Card className="bg-background rounded-[2px]  gap-2 pt-0">
                <CardHeader className="flex justify-center px-0 items-center flex-col gap-2">
                    <div className="relative w-full mb-5">
                        <div className={`w-full h-24 ${!profileCard && 'bg-zinc-300 dark:bg-zinc-700'}`} style={{ backgroundColor: `${profileCard?.coverImage ? '' : profileCard?.defaultCoverColor}` }}>
                            {
                                profileCard?.coverImage &&
                                <img loading="lazy" src={`${profileCard?.coverImage}`} className="w-full h-full object-cover rounded-t-[2px]" alt="coverImage" />
                            }
                        </div>
                        <Avatar className="size-12 ring-2 ring-primary/20 absolute top-[65%] left-[50%] translate-x-[-50%]">
                            <AvatarImage alt="user-image" src={`${profileCard?.avatar}`} />
                            <AvatarFallback className="bg-gradient-primary text-slate-200" style={{ backgroundColor: `${profileCard?.defaultCoverColor ? profileCard?.defaultCoverColor : ''}` }}>{profileCard?.userName?.slice(0, 2)}</AvatarFallback>
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
                        {
                            typeof profileCard?.followersCount == "number" &&
                            <span>{`followers : ${profileCard?.followersCount || 0}`}</span>
                        }
                        {
                            typeof profileCard?.followingCount == "number" &&
                            <span>{`following : ${profileCard?.followingCount || 0}`}</span>

                        }
                    </div>
                </CardFooter>
            </Card>
        </NavLink>
    )
}

export default ProfileCard