import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect, useState } from "react"
import showErrorToast from "@/helper/showErrorToast"

const useGetComments = (postId: string) => {
    const [comments, setComments] = useState<any>(null)
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [limitOfPages, setLimitOfPages] = useState<number>(1);
    useEffect(() => {
        const getCommentsOnPost = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/api/comment/getComments/?postId=${postId}&page=${page}`);
                if (response.status === 200) {
                    if (page === 1) {
                        setComments(response.data?.comments);
                    } else {
                        setComments((prev: any) => ([...prev, ...response.data?.comments]));
                    }
                    if (response.data?.limitOfPages) {
                        setLimitOfPages(response.data?.limitOfPages)
                    }
                }
            } catch (err) {
                showErrorToast(err)
            } finally {
                setLoading(false);
            }
        }
        if (!!postId) {
            getCommentsOnPost();
        }
    }, [postId, page])

    return { comments, setComments, setPage, loading, page, limitOfPages };


}

export default useGetComments