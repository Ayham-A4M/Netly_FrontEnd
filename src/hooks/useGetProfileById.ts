// its use to get others profile 
import axiosInstance from "@/helper/axiosInterceptor";
import { useEffect, useState } from "react";
import showErrorToast from "@/helper/showErrorToast"

const useGetProfileById = (userId: string) => {
    const [posts, setPosts] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [isEditableProfile, setIsEditableProfile] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const getProfileById = async () => {
            try {
                const response = await axiosInstance.get(`/api/profile/getProfileById/?userId=${userId}`)
                if (response.status === 200) {
                    setPosts(response.data?.posts);
                    setProfile(response.data?.profile);
                    setIsFollowing(response.data?.isFollowing || false);
                    setIsEditableProfile(response.data?.isEditableProfile)
                }
            } catch (err) {
                showErrorToast(err);

            }
        }
        if (userId) {
            getProfileById()
        }
    }, [userId])
    return { posts, setPosts, profile: { ...profile, isFollowing }, setProfile, isEditableProfile }
}
export default useGetProfileById