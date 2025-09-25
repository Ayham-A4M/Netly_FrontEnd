import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast"
import showErrorToast from "@/helper/showErrorToast"

const handleUpdateAvatar = async(avatarImage: File | null):Promise<boolean> => {
    try {
        if (!avatarImage) { toast.error("no specific image"); return false; }
        const formData = new FormData();
        formData.append('image', avatarImage);
        const response=await axiosInstance.post('/api/profile/updateAvatar',formData);
        if(response.status===200){
            toast.success(response.data?.msg || "avatar updated");
            return true;
        }
        return false;
    } catch (err) {
        showErrorToast(err);
        return false;
    }
}

export default handleUpdateAvatar