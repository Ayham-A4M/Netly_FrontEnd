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
                console.log(`effect read runs`,"   ",notifications)
                const response = await axiosInstance.post('/api/notification/read');
                if (response.status === 200) {
                    context?.setNumberOfNotification(null);
                }
            } catch (err) {
                showErrorToast(err);
            }
        }
        if (!!context?.numberOfNotification && notifications !== null) {
            readNotification();
        }
    }, [notifications])
}

export default useReadNotifications