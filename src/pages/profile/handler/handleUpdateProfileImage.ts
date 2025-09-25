import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast"
import showErrorToast from "@/helper/showErrorToast"

// this is for cover image
const handleUpdateProfileImage = async (newCoverImage: File | null, setSendingReq: React.Dispatch<boolean>) => {
    try {
        if (!newCoverImage) { return toast.error("no specific image!!") }
        setSendingReq(true);
        const formData = new FormData();
        formData.append('image', newCoverImage);
        const response = await axiosInstance.post('/api/profile/updateCoverImage', formData);
        if (response.status === 200) {
            toast.success(response?.data?.msg || "cover image updated");
            return true;
        }
    } catch (err) {
        showErrorToast(err);
    } finally {
        setSendingReq(false);
    }
}

export default handleUpdateProfileImage