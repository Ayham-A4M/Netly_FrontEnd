import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"

const handleSubmitComment = async (content: string, postId: string | null, setSendingReq: React.Dispatch<boolean>,postOwnerId:string) => {
    try {
        if (!!!content || !!!postId) { return; }
        setSendingReq(true)
        const response = await axiosInstance.post('/api/comment/newComment', { postId, content,postOwnerId });
        if (response.status === 200) {
            toast.success('comment posted');
        }
    } catch (err) {
        showErrorToast(err)
    } finally {
        setSendingReq(false);
    }
}

export default handleSubmitComment