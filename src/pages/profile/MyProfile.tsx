import useGetProfile from "@/hooks/useGetProfile";
import Profile from "./Profile"

const MyProfile = () => {
    const { profile, setProfile, posts, setPosts } = useGetProfile();
  return (
    <Profile profile={profile} setProfile={setProfile} posts={posts} setPosts={setPosts} isEditable={true}/>
  )
}

export default MyProfile