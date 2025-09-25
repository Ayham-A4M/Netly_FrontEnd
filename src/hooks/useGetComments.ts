import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect, useState } from "react"
import showErrorToast from "@/helper/showErrorToast"

const useGetComments = (postId: string) => {
    const [comments, setComments] = useState<any>(null)
    const [page, setPage] = useState<number>(1);
    const [loading,setLoading]=useState<boolean>(false);
  
    useEffect(() => {
        const getCommentsOnPost = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/api/comment/getComments/?postId=${postId}&page=${page}`);
                if (response.status === 200) {
                    
                    setComments(response.data?.comments);
                }
            } catch (err) {
                showErrorToast(err)
            }finally{
                setLoading(false);
            }
        }
        if (!!postId) {
            getCommentsOnPost();
        }
    }, [postId,page])

    return { comments, setComments,setPage,loading };


}

export default useGetComments