import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
const handleReactionProcess = (reaction: boolean, setReaction: React.Dispatch<boolean>, postId: string, postOwnerId: string) => {

    const submitReaction = async () => {
        const response = await axiosInstance.post('/api/post/react', {
            postId,
            postOwnerId,
        });
        if (response.status !== 200) {
            setReaction(false);
            toast.error('Something went wrong');
        }
    };

    const deleteReaction = async () => {
        const response = await axiosInstance.delete(`/api/post/react/${postId}`);
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

export default handleReactionProcess