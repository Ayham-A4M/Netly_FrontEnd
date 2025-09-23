import AvatarFallBack from "@/components/helperComponent/AvatarFallBack";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { FcVideoCall } from "react-icons/fc";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import axiosInstance from "@/helper/axiosInterceptor";
import { format } from "date-fns";
import { useEffect, useState } from "react"
import { FcBinoculars } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { FcClapperboard } from "react-icons/fc";


const RightSideBar = () => {
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]); // just 3 events as maximum
    const [followers, setFollowers] = useState<any[]>([]); // just 3 followers as maximum
    useEffect(() => {
        const getLeftSideBarInformation = async () => {
            try {
                const response = await axiosInstance.get('/api/profile/rightSidebarInfo');
                if (response.status === 200) {
                    setUpcomingEvents(response.data?.upcomingEvents || []);
                    setFollowers(response.data?.followers || []);
                }
            } catch (err) {
                console.log(err)
            }
        }
        getLeftSideBarInformation()
    }, [])
    return (
        <aside className="hidden xl:block w-72 p-4 space-y-4 sticky top-20 h-fit">
            <Card className="bg-gradient-card border-0 shadow-lg gap-0">
                <CardHeader className="pb-3">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">Upcoming events <FcClapperboard className="size-5" /> </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                    {
                        upcomingEvents.length === 0 ? (
                            <p className="text-sm text-muted-foreground">You have no upcoming events</p>
                        ) : (
                            upcomingEvents.map((event) => (

                                <div key={event?._id} className="flex flex-col border-b-2 gap-1 p-x-2 ">
                                    <span className="text-primary text-[.6rem] font-bold">{event?.title}</span>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[.7rem]">{format(new Date(event?.date), "PPP")}</span>
                                        <span className="text-[.7rem] flex items-center gap-0.5">{event?.eventType} {event?.eventType === "onsite" ? <FaLocationDot className="text-orange-500" /> : <FcVideoCall />}</span>
                                    </div>
                                </div>



                            ))


                        )
                    }
                </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg gap-y-0">
                <CardHeader className="pb-3">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">Followers <FcBinoculars className="size-5" /></h3>
                </CardHeader>
                <CardContent className="space-y-2">
                    {
                        followers.length === 0 ? (
                            <p className="text-sm text-muted-foreground">You have no followers</p>
                        ) : (
                            followers.map((follower) => (
                                <div key={follower?._id} className="flex items-center gap-3 p-2 rounded-md hover:bg-social-blue-light transition-colors">
                                    <Avatar className="size-8">
                                        <AvatarImage src={`http://localhost:8000${follower?.avatar}`} />
                                        <AvatarFallBack backgroundColor={follower?.defaultCoverColor} name={follower?.userName} />
                                    </Avatar>
                                    <div className="flex flex-col leading-[18px]">
                                        <span>{follower?.userName}</span>
                                        <span className="text-[.7rem] line-clamp-1">{follower?.title}</span>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </CardContent>
            </Card>


        </aside>
    )
}

export default RightSideBar