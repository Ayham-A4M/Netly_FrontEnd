import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";

const handleInterestingInProcess = async (eventId: string) => {
    try {
        const response = await axiosInstance.post(`/api/event/interesting/${eventId}`);
        if (response.status === 200) {
            toast.success(response?.data?.msg || "event added to upcoming events");
        }
    } catch (err) {
        console.log(err);
    }
}

export default handleInterestingInProcess