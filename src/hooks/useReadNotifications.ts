import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "@/App"
import showErrorToast from "@/helper/showErrorToast"

const useReadNotifications = (notifications: any) => {
    const context = useContext(UserContext);
    useEffect(() => {
        const readNotification = async () => {
            try {
                const response = await axiosInstance.post('/api/notification/read');
                if (response.status === 200) {
                    context?.setNumberOfNotification(null);
                }
            } catch (err) {
                showErrorToast(err);
            }
        }
        if (!!context?.numberOfNotification) {
            readNotification();
        }
    }, [notifications])
}

export default useReadNotifications