import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
const onSubmitDeletePost = async (postId: string | null, setDeletePostId: React.Dispatch<React.SetStateAction<string | null>>, setPosts: React.Dispatch<any>) => {
    try {
        if (!postId) { toast.error('not specific post'); return; }
        const response = await axiosInstance.delete(`/api/post/${postId}`);
        if (response.status === 200) {
            toast.success(response?.data?.msg || 'post deleted')
            setPosts((prev: any) => (prev.filter((e: any) => (e._id != response.data?.postId))))
            setDeletePostId(null);
        }
    } catch (err) {
        console.log(err);
    }
}

export default onSubmitDeletePost