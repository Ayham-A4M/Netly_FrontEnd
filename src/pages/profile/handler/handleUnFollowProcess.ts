import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"

const handleUnFollowProcess = async (id: string) => {
    try {
        if (!id) { toast.error("no specific user"); return false; }
        const response = await axiosInstance.delete(`/api/profile/unfollow/${id}`)
        if(response.status===200){return true}
        return false
    } catch (err) {
        showErrorToast(err);
        return false;
    }
}
export default handleUnFollowProcess