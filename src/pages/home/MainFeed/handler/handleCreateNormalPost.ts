import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"

interface normalPost {
    visibility: "public" | "private",
    content: string | null,
    tags: string[],
    publishedAt: Date,
    feeling:string
}
const handleCreateNormalPost = async (postContent: string | null, setSendingReq: React.Dispatch<React.SetStateAction<boolean>>, postImages: FileList | null,feeling:string):Promise<boolean> => {
    try {
        if (!postContent && !postImages) {
             toast.error("Cannot publish empty post")
             return false;
        }

        const normalPost: normalPost = {
            visibility: 'public',
            content: postContent,
            tags: ['general'],
            publishedAt: new Date(),
            feeling:feeling
        }
       
        setSendingReq(true);
        let post = new FormData();

        if (postImages && postImages.length > 0) {
            post = new FormData();
            for (let i = 0; i < postImages.length; i++) {
                post.append("postImages", postImages[i])
            }
        }
        post.append("postInformation", JSON.stringify(normalPost));

        if (!!post) {
            const response = await axiosInstance.post('/api/post/createPost', post);
            if (response.status == 200) {
                toast.success(response.data?.msg || "post created");
                return true;
            }
        }
        return false;
    } catch (err) {
        showErrorToast(err);
        return false;

    } finally {
        setSendingReq(false)
    }
}

export default handleCreateNormalPost