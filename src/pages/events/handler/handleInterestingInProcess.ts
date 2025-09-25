import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"

const handleInterestingInProcess = async (eventId: string) => {
    try {
        const response = await axiosInstance.post(`/api/event/interesting/${eventId}`);
        if (response.status === 200) {
            toast.success(response?.data?.msg || "event added to upcoming events");
        }
    } catch (err) {
        showErrorToast(err);
    }
}

export default handleInterestingInProcess