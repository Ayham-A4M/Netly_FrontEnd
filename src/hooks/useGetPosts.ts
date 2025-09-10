import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect, useState } from "react"


const useGetPosts = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limitOfPages, setLimitOfPages] = useState(1);
    useEffect(() => {
        const getPosts = async () => {
            try {
                console.log("sending request")
                setLoading(true);
                const response = await axiosInstance.get(`/api/post/getPosts/?page=${page}`);
                if (response.status == 200) {
                    if (posts.length > 0) {
                        setPosts(prev => [...prev,...response.data?.posts]);
                    }else{
                        setPosts(response.data?.posts)
                    }
                    setLimitOfPages(response.data?.limitOfPages);
                    console.log(response);
                }

            } catch (err) {

            } finally {
                setLoading(false);
            }
        }
        getPosts()
    }, [page])
    
    return { loading, posts, setPosts, page, setPage, limitOfPages };
}

export default useGetPosts