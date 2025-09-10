import Profile from "./Profile"
import useGetProfileById from "@/hooks/useGetProfileById"
import { useLocation } from "react-router-dom"
const UserProfile = () => {
    const location = useLocation();
    const { userId } = location.state
    const { posts, profile, setPosts, setProfile, isEditableProfile } = useGetProfileById(userId)
    return (
        <Profile posts={posts} setPosts={setPosts} setProfile={setProfile} profile={profile} isEditable={isEditableProfile} />
    )
}

export default UserProfile