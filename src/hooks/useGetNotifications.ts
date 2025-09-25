import axiosInstance from "@/helper/axiosInterceptor";
import { useEffect, useState } from "react"
import showErrorToast from "@/helper/showErrorToast"

const useGetNotifications = () => {
    const [notifications, setNotifications] = useState<any>(null)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limitOfPages, setLimitOfPages] = useState<number>(1);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/notification/getNotification?page=${page}`);
                if (response.status === 200) {
                    if (notifications) {
                        setNotifications((prev: any) => ([...prev, ...response?.data?.notifications]))
                    } else {
                        setNotifications(response?.data?.notifications);
                    }
                    if (response?.data?.limit)
                        setLimitOfPages(response?.data?.limit);

                }
            } catch (err) {
                showErrorToast(err);
            } finally {
                setLoading(false);
            }

        }
        fetchNotifications();
    }, [page])
    return { notifications, loading, page, setPage, limitOfPages };
}

export default useGetNotifications