import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loader from "@/components/ui/loader";
import useGetActivity from "@/hooks/useGetActivity";
import { useState } from "react";
import A_commentCard from "@/components/activity/comments/A_commentCard";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";
import A_updateComment from "@/components/activity/comments/A_updateComment";


const A_comments = () => {
  const { activity, setActivity, loading, page, setPage, limitOfPages } = useGetActivity('/api/activity/comments');
  useInfiniteScroll(page, limitOfPages, activity, loading, setPage);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);

  const handleDeleteComment = async () => {
    try {
      const response = await axiosInstance.delete(`/api/comment/${deleteCommentId}`);
      if (response.status === 200) {
        setActivity((prev: any) => prev.filter((e: any) => e._id !== deleteCommentId));
        setDeleteCommentId(null);
        toast.success(response?.data?.msg || "comment deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditComment = async (commentContent: string) => {
    try {
      if (!editCommentId) return;
      if (!commentContent) { toast.error("comment content is required"); return; }
      const response = await axiosInstance.put(`/api/comment/${editCommentId}`, { content: commentContent });
      if (response.status === 200) {
        setActivity((prev: any) => prev.map((e: any) => e._id === editCommentId ? { ...e, content: commentContent } : e));
        setEditCommentId(null);
        toast.success(response?.data?.msg || "comment edited successfully");
      }
    } catch (err) {
      console.log(err);
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
              <A_commentCard comment={e} key={e?._id} setDeleteCommentId={setDeleteCommentId} setEditCommentId={setEditCommentId} />
            ))
          }
          {
            activity.length >0 && loading &&
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          }

        </div>

      }
      {
        deleteCommentId &&
        <DeleteDialog open={!!deleteCommentId} onClose={() => { setDeleteCommentId(null) }} onSubmit={() => { handleDeleteComment() }} />
      }
      {
        editCommentId &&
        <A_updateComment open={!!editCommentId}
          onClose={() => { setEditCommentId(null) }}
          onSubmit={(commentContent: string) => { handleEditComment(commentContent) }}
          initialContent={(activity?.find((e: any) => e._id === editCommentId)).content} />
      }


    </>
  )
}

export default A_comments