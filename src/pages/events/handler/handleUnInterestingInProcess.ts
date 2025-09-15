import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";

const handleUnInterestingInProcess = async (eventId: string) => {
    try {
        const response = await axiosInstance.delete(`/api/event/interesting/${eventId}`);
        if (response.status === 200) {
            toast.success(response.data?.msg || "event removed from upcoming")
        }
    } catch (err) {
        console.log(err);
    }
}

export default handleUnInterestingInProcess