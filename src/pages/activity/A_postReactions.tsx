
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loader from "@/components/ui/loader";
import useGetActivity from "@/hooks/useGetActivity";
import { useState } from "react";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";
import A_postReactionCard from "@/components/activity/postReactions/A_postReactionCard";
import showErrorToast from "@/helper/showErrorToast"

const A_postReactions = () => {
  const { activity, setActivity, loading, page, setPage, limitOfPages } = useGetActivity('/api/activity/postReactions');
  useInfiniteScroll(page, limitOfPages, activity, loading, setPage);
  const [postId, setPostId] = useState<string | null>(null)
  const handleRemoveReaction = async () => {
    try {
      const response = await axiosInstance.delete(`/api/post/react/${postId}`);
      if (response.status === 200) {
        setActivity((prev: any) => prev.filter((e: any) => e.postId !== postId));
        setPostId(null);
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
              <A_postReactionCard reaction={e} key={e?._id} setPostId={setPostId} />
            ))
          }
          {
            (activity.length >0 && loading) &&
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          }

        </div>

      }
      {
        postId &&
        <DeleteDialog open={!!postId} onClose={() => { setPostId(null) }} onSubmit={() => { handleRemoveReaction() }} />
      }



    </>
  )
}

export default A_postReactions