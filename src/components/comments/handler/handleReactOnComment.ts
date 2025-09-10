
import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
const handleReactOnComment = (reaction: boolean, setReaction: React.Dispatch<boolean>, commentId: string, commentOwnerId: string,postId:string) => {

    const submitReaction = async () => {
        const response = await axiosInstance.post('/api/comment/react', {
            commentId,
            commentOwnerId,
            postId // we need the post id for notification
        });
        if (response.status !== 200) {
            setReaction(false);
            toast.error('Something went wrong');
        }
    };

    const deleteReaction = async () => {
        const response = await axiosInstance.delete(`/api/comment/react/${commentId}`);
        if (response.status === 200) {
            setReaction(false);
        }
        if (response.status !== 200) {
            toast.error('Something went wrong');
        }
    }
    if (!reaction) {
        deleteReaction();
    } else {
        submitReaction();
    }


}

export default handleReactOnComment