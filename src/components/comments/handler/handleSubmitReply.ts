import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"

const handleSubmitReply = async (content: string, commentId: string, setSendingReq: React.Dispatch<boolean>, postId: string | null, commentOwnerId: string | null) => {
    try {
        if (!!!content || !!!postId || !!!commentOwnerId) { return; }
        setSendingReq(true);
        const response = await axiosInstance.post('/api/comment/reply', { content, commentId, postId, commentOwnerId });
        if (response.status === 200) {
            toast.success(response?.data?.msg || 'reply published');
        }
    } catch (err) {
        showErrorToast(err);
    } finally {
        setSendingReq(false)
    }
}

export default handleSubmitReply