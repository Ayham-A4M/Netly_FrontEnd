import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { FcPlanner, FcVideoCall, FcOrganization, FcConferenceCall } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { HiStatusOnline } from "react-icons/hi";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarFallBack from "@/components/helperComponent/AvatarFallBack";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import handleInterestingInProcess from "./handler/handleInterestingInProcess";
import { Link } from "react-router-dom";
import handleUnInterestingInProcess from "./handler/handleUnInterestingInProcess";
import { isBefore } from "date-fns";
const EventCard = ({ eventInfo, eventType, interest }: { eventInfo: any, eventType: boolean | null, interest: boolean }) => {
    const [interestingIn, setInterestingIn] = useState<boolean>(interest);

    return (
        <Card className="p-3 bg-background">
            <CardHeader className="p-0 gap-1 border-b-[1px] border-zinc-300 pb-1 dark:border-zinc-800">
                <h1 className="text-primary font-bold text-[1rem]">{eventInfo?.title}</h1>
                <div className=" items-center justify-between text-[.8rem] grid md:grid-cols-3 grid-cols-2">
                    <span className="flex items-center gap-1 ">
                        <FcPlanner />
                        {`${format(new Date(eventInfo?.date), "PPP")}`}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                        {
                            eventInfo?.eventType === "online"
                                ?
                                <>
                                    <HiStatusOnline className="text-primary" />
                                    online
                                </>
                                :
                                <>
                                    <FcOrganization className="text-primary" />
                                    onsite
                                </>
                        }
                    </span>
                    <span className="flex items-center gap-1 ">
                        <FcConferenceCall />
                        interested in {eventInfo?.interestedCount || 0}
                    </span>
                    <span className="flex items-center gap-1 ">
                        {
                            eventInfo?.meetingApplication
                                ?
                                <>
                                    <FcVideoCall />
                                    {eventInfo?.meetingApplication}
                                </>
                                :
                                <>
                                    <FaLocationDot className="text-orange-500" />
                                    {eventInfo?.location}
                                </>
                        }
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-0 text-[.8rem] border-b-[1px] border-zinc-300 pb-1 dark:border-zinc-800 ">
                {eventInfo?.description}
            </CardContent>
            <CardFooter className="p-0 flex justify-between items-center">
                <Link to="/userProfile" state={{ userId: eventInfo?.userId }} className="flex items-center gap-2 text-[.8rem]">
                    <span>Create By : </span>
                    <Avatar className="size-6">
                        <AvatarImage src={(eventInfo?.avatar && `http://localhost:8000${eventInfo?.avatar}`)} />
                        <AvatarFallBack name={eventInfo?.userName} backgroundColor={eventInfo?.defaultCoverColor} />
                    </Avatar>
                    <span>{eventInfo?.userName}</span>
                </Link>
                {
                    isBefore(new Date(eventInfo?.date), new Date()) && 
                    <span className="text-primary text-[.8rem] font-extrabold">event ended</span>
                }

                {

                    (!eventType && !isBefore(new Date(eventInfo?.date), new Date())) &&

                    <>
                        {
                            interestingIn
                                ?
                                <FaStar className="text-primary cursor-pointer size-5" role="button" onClick={() => { setInterestingIn(prev => !prev); handleUnInterestingInProcess(eventInfo?._id) }} />
                                :
                                <FaRegStar className="text-primary cursor-pointer size-5" role="button" onClick={() => { setInterestingIn(prev => !prev); handleInterestingInProcess(eventInfo?._id) }} />
                        }

                    </>



                }

            </CardFooter>


        </Card>
    )
}

export default EventCard