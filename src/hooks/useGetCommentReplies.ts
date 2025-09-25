import axiosInstance from "@/helper/axiosInterceptor";
import { useEffect, useState } from "react";
import showErrorToast from "@/helper/showErrorToast"
const useGetCommentReplies = (commentId: string | null) => {
    const [commentReplies, setCommentReplies] = useState<any | null>(null);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [pageOfReplies, setPageOfReplies] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState<null | number>(null)
    useEffect(() => {
        const fetchingCommentReplies = async () => {
            try {
                setLoadingReplies(true);
                const response = await axiosInstance.get(`/api/comment/getCommentReplies/?commentId=${commentId}&page=${pageOfReplies}`);
                if (response.status === 200) {
                    setCommentReplies(response?.data?.replies);
                    setNumberOfPages(response?.data?.limit);
                }
            } catch (err) {
                showErrorToast(err)
            } finally {
                setLoadingReplies(false)
            }
        }
        if (!!commentId) {
            console.log(commentId);
            fetchingCommentReplies();
        }
    }, [pageOfReplies,commentId])
    return { commentReplies, setCommentReplies, setPageOfReplies, loadingReplies };
}

export default useGetCommentReplies