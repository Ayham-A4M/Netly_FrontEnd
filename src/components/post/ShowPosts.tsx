import { useEffect, useState } from "react";
import CommentSections from "../comments/commentSections";
import DeleteDialog from "../dialog/DeleteDialog";
import Post from "./Post";
import onSubmitDeletePost from "@/pages/profile/handler/onSubmitDeletePost";
import useEditScroll from "@/hooks/useEditScroll";
import EditPostDialog from "../dialog/EditPostDialog";
import ShowImageDialog from "../dialog/ShowImageDialog";
import ShareDialog from "../dialog/ShareDialog";
import { useMemo } from "react";
interface props { posts: any[], setPosts?: React.Dispatch<any> }




const ShowPosts = ({ posts, setPosts }: props) => {
    const [deletePostId, setDeletePostId] = useState<string | null>(null)
    const [postId, setPostId] = useState<string | null>(null); // this is used for comments for example
    const [postOwnerId, setPostOwnerId] = useState<string | null>(null);
    const [editPostId, setEditPostId] = useState<string | null>(null)
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [sharePostId, setSharePostId] = useState<string | null>(null);
    const handleDeletePost = () => {
        if (setPosts)
            onSubmitDeletePost(deletePostId, setDeletePostId, setPosts);
    }
    useEditScroll(postId);
    return (
        <>
            {
                ((posts?.length === 0 || !posts) && window.location.href.includes("/post/")) ?
                    <div className="flex w-full h-full items-center justify-center md:text-xl text-primary">
                        <span className="">This post is no longer avaliable </span>

                    </div>
                    :
                    posts?.map((e: any) => (

                        <Post
                            e={e}
                            setSharePostId={setSharePostId}
                            setImagePath={setImagePath}
                            setDeletePostId={setDeletePostId}
                            setPostId={setPostId}
                            setEditPostId={setEditPostId}
                            setPostOwnerId={setPostOwnerId}
                            key={e?._id}
                        />

                    ))

            }
            {
                !!postId &&
                <CommentSections postId={postId} setPostId={setPostId} postOwnerId={postOwnerId} />


            }
            <ShowImageDialog onClose={() => { setTimeout(() => { setImagePath(null) }, 300) }} imagePath={imagePath} />
            <DeleteDialog open={!!deletePostId} onClose={() => { setDeletePostId(null) }} onSubmit={handleDeletePost} />
            <EditPostDialog open={!!editPostId} onClose={() => { setEditPostId(null) }} editPostId={editPostId} />
            <ShareDialog open={!!sharePostId} onClose={() => { setSharePostId(null) }} postId={sharePostId} />


        </>
    )
}

export default ShowPosts