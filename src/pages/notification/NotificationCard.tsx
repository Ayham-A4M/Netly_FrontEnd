import { Avatar, AvatarImage } from "@/components/ui/avatar"
import AvatarFallBack from "@/components/helperComponent/AvatarFallBack";
import calculateTime from "@/helper/calculateTime";
import { Link } from "react-router-dom";
const NotificationCard = ({ notification }: { notification: any }) => {
    return (
        <>
            {
                notification?.postId ?
                    <Link to={`/post/${notification?.postId}`}>
                        <div className="w-full relative flex items-center gap-2 p-4 border-b-2">
                            {
                                !notification?.isRead &&
                                <>
                                    <span className="rounded-full size-2 bg-blue-500 shrink-0"></span>
                                    <div className="absolute inset-full top-0 left-0 w-full h-full bg-blue-500/25 border-b-[1px] border-popover-foreground"></div>
                                </>
                            }
                            <Avatar className="size-9">
                                <AvatarImage src={`${notification?.avatar}`} />
                                <AvatarFallBack name={notification?.userName} backgroundColor={notification?.defaultCoverColor} />
                            </Avatar>
                            <p className="md:text-md text-md text-popover-foreground leading-4">
                                <span className="text-stone-950 dark:text-white">{notification?.userName} </span>
                                {notification?.message}
                            </p>
                            <span className="absolute top-1 right-1 text-[11px]">{calculateTime(new Date(notification?.date))}</span>

                        </div>

                    </Link >
                    :
                    <div className="w-full relative flex items-center gap-2 p-4 border-b-2">
                        {
                            !notification?.isRead &&
                            <>
                                <span className="rounded-full size-2 bg-blue-500 shrink-0"></span>
                                <div className="absolute inset-full top-0 left-0 w-full h-full bg-blue-500/25 border-b-[1px] border-popover-foreground"></div>
                            </>
                        }
                        <Avatar className="size-9">
                            <AvatarImage src={`${notification?.avatar}`} />
                            <AvatarFallBack name={notification?.userName} backgroundColor={notification?.defaultCoverColor} />
                        </Avatar>
                        <p className="md:text-md text-md text-popover-foreground leading-4">
                            <span className="text-stone-950 dark:text-white">{notification?.userName} </span>
                            {notification?.message}
                        </p>
                        <span className="absolute top-1 right-1 text-[11px]">{calculateTime(new Date(notification?.date))}</span>

                    </div>
            }
        </>
    )
}

export default NotificationCard