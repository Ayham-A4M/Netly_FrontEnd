import ShowPosts from "@/components/post/ShowPosts";
import axiosInstance from "@/helper/axiosInterceptor";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
const PostPage = () => {
    const [posts, setPosts] = useState<any[]>([]); // this should just contain one post :)
    const [loading, setLoaidng] = useState<boolean>(false);
    const { postId } = useParams()
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoaidng(true)
                const response = await axiosInstance.get(`/api/post/${postId}`);
                if (response.status === 200) {
                    setPosts(response?.data?.posts);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoaidng(false)
            }
        }
        if (postId)
            fetchPost();
    }, [])
    return (
        <div className="h-screen pt-2 pb-3">
            {
                loading ?
                    <div className="flex justify-center h-screen items-center">
                        <Loader />
                    </div>
                    :
                    <ShowPosts posts={posts} setPosts={setPosts} />

            }
        </div>


    )

}

export default PostPage