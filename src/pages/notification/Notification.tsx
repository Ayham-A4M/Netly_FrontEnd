import useGetNotifications from "@/hooks/useGetNotifications"
import NotificationCard from "./NotificationCard";
import useReadNotifications from "@/hooks/useReadNotifications";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loader from "@/components/ui/loader";
const Notification = () => {
    const { notifications, loading, page, setPage, limitOfPages } = useGetNotifications();
    useInfiniteScroll(page, limitOfPages, notifications, loading, setPage);
    useReadNotifications(notifications);
    return (
        <div className="min-h-screen">
            <div className="w-full">

                {
                    (notifications && notifications?.length > 0) ?
                        notifications?.map((e: any) => (
                            <NotificationCard notification={e} key={e?._id} />
                        ))
                        :
                        (!loading) &&
                        <div className="h-screen flex justify-center items-center">
                            <span className="text-primary md:text-xl">No Notification</span>
                        </div>
                }


            </div>
            {
                (loading && notifications) ?

                    <div className="flex justify-center items-center pt-2">
                        <Loader />
                    </div>
                    :
                    loading &&
                    <div className="flex justify-center items-center h-screen">
                        <Loader />
                    </div>
            }
        </div>
    )
}

export default Notification