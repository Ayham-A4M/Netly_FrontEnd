import { useState } from "react";
import CommentSections from "../comments/commentSections";
import DeleteDialog from "../dialog/DeleteDialog";
import Post from "./Post";
import onSubmitDeletePost from "@/pages/profile/handler/onSubmitDeletePost";
import useEditScroll from "@/hooks/useEditScroll";
interface props { posts: any[], setPosts?: React.Dispatch<any> }

// const obj = {
//     commentsCount: 2,
//     content: `Why Less Is More: Embracing a Minimalist Lifestyle
// Minimalism is about more than just decluttering—it's a mindset. By removing excess, we create space for what truly matters. A minimalist lifestyle can reduce stress, increase focus, and save time and money. Start small: clean out your closet, unsubscribe from unnecessary emails, or limit your digital screen time. Ask yourself: “Does this add value to my life?” Minimalism isn't about having nothing—it's about having only what you need and love. In a world of constant noise and consumption, simplicity can be a powerful form of freedom.
//     `,
//     defaultCoverColor: "#448aff",
//     images: [],
//     isEditable: false,
//     loveCount: 3,
//     publishedAt: "2025-08-26T14:44:14.735Z",
//     sharedCount: 0,
//     tags: ['general'],
//     userId: "68adc57383cc48d19bb389a4",
//     userName: "Ayham",
//     userReaction: false,
//     _id: "68adc83ee8aaed333a9ea9ac"
// }


const ShowPosts = ({ posts, setPosts }: props) => {
    const [deletePostId, setDeletePostId] = useState<string | null>(null)
    const [postId, setPostId] = useState<string | null>(null); // this is used for comments for example
    const [postOwnerId, setPostOwnerId] = useState<string | null>(null);
    const handleDeletePost = () => {
        if (setPosts)
            onSubmitDeletePost(deletePostId, setDeletePostId, setPosts);
    }
    useEditScroll(postId);
    return (
        <>
            {/* <Post e={obj} setDeletePostId={setDeletePostId} setPostId={setPostId} setPostOwnerId={setPostOwnerId} /> */}
            {
                ((posts?.length === 0 || !posts) && window.location.href.includes("/post/")) ?
                    <div className="flex w-full h-full items-center justify-center md:text-xl text-primary">
                        <span className="">This post is no longer avaliable </span>

                    </div>
                    :
                    posts?.map((e: any) => (

                        <Post e={e} setDeletePostId={setDeletePostId} setPostId={setPostId} setPostOwnerId={setPostOwnerId} />

                    ))

            }
            {
                !!postId &&
                <CommentSections postId={postId} setPostId={setPostId} postOwnerId={postOwnerId} />


            }
            <DeleteDialog open={!!deletePostId} onClose={() => { setDeletePostId(null) }} onSubmit={handleDeletePost} />



        </>
    )
}

export default ShowPosts