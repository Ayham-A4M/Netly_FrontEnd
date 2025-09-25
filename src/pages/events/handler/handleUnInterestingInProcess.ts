import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"

const handleUnInterestingInProcess = async (eventId: string) => {
    try {
        const response = await axiosInstance.delete(`/api/event/interesting/${eventId}`);
        if (response.status === 200) {
            toast.success(response.data?.msg || "event removed from upcoming")
        }
    } catch (err) {
        showErrorToast(err);
    }
}

export default handleUnInterestingInProcess