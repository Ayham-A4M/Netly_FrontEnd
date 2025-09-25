import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loader from "@/components/ui/loader";
import useGetActivity from "@/hooks/useGetActivity";
import { useState } from "react";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";
import showErrorToast from "@/helper/showErrorToast"
import A_commentReactionsCard from "@/components/activity/commentReactions/A_commentReactionsCard";
const A_commentReactions = () => {
  const { activity, setActivity, loading, page, setPage, limitOfPages } = useGetActivity('/api/activity/commentsReactions');
  useInfiniteScroll(page, limitOfPages, activity, loading, setPage);
  const [commentId, setCommentId] = useState<string | null>(null);
  const handleRemoveCommentReaction = async () => {
    try {
      const response = await axiosInstance.delete(`/api/comment/react/${commentId}`);
      if (response.status === 200) {
        setActivity((prev: any) => prev.filter((e: any) => e.commentId !== commentId));
        setCommentId(null);
        toast.success(response?.data?.msg || "comment deleted successfully");
      }
    } catch (err) {
      showErrorToast(err);
    }
  }

  return (
    <>

      {
        (loading && activity?.length == 0) &&
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
      {
        (activity?.length != 0) &&
        <div className="space-y-1">
          {
            activity?.map((e: any) => (
              <A_commentReactionsCard reaction={e} key={e?._id} setCommentId={setCommentId} />
            ))
          }
          {
            (activity.length > 0 && loading) &&
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          }

        </div>

      }
      {
        commentId &&
        <DeleteDialog open={!!commentId} onClose={() => { setCommentId(null) }} onSubmit={() => { handleRemoveCommentReaction() }} />
      }



    </>
  )
}

export default A_commentReactions