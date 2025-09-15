import axiosInstance from "@/helper/axiosInterceptor"
import type { eventType } from "../CreateEvent"
import toast from "react-hot-toast";
const handleCreateNewEvent = async (data: eventType, setSendingReq: React.Dispatch<React.SetStateAction<boolean>>):Promise<boolean> => {
    try {
        setSendingReq(true)
        const response = await axiosInstance.post('/api/event/newevent', data);
        if(response.status===200){
            toast.success(response.data?.msg || "event created");
            return true;
        }
        return false
    } catch (err) {
        console.log(err);
        return false
    } finally {
        setSendingReq(false);
    }
}

export default handleCreateNewEvent