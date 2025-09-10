import ShowPosts from "@/components/post/ShowPosts";
import ProfileHeader from "./ProfileHeader"
import type React from "react";
interface props {
    profile: any,
    setProfile?: React.Dispatch<any>
    posts: any,
    setPosts?: React.Dispatch<any>
    isEditable: boolean
}
const Profile = ({ profile, setProfile, posts, setPosts, isEditable }: props) => {
    return (
        <div className="min-h-screen bg-background  ">
            <div className="w-full mx-auto  space-y-6">
                <ProfileHeader profile={profile} setProfile={setProfile} isEditable={isEditable} />
                
                
                
                {
                    (isEditable && setPosts && posts) ?
                        <ShowPosts posts={posts} setPosts={setPosts} />
                        :
                        <ShowPosts posts={posts}/>
                    
                }

            </div>
        </div>
    )
}

export default Profile