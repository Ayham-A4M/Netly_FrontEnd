import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "@/App"
const useReadNotifications = (notifications:any) => {
    const context=useContext(UserContext);
    useEffect(() => {
        const readNotification = async () => {
            const response=await axiosInstance.post('/api/notification/read');
            if(response.status===200){
                context?.setNumberOfNotification(null);
            }
        }
        if(!!context?.numberOfNotification){
            console.log('hh')
            readNotification();
        }
    }, [notifications])
}

export default useReadNotifications