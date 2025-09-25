import axiosInstance from "@/helper/axiosInterceptor"
import { useState, useEffect } from "react"
import showErrorToast from "@/helper/showErrorToast"

const useGetProfile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [posts, setPosts] = useState<any>(null)
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axiosInstance.get('/api/profile/getUserProfile');
                if (response.status === 200) {
                    setProfile(response.data.profile);
                    setPosts(response.data.posts);
                }
            } catch (err) {
                showErrorToast(err)
            }
        }
        getProfile();
    }, [])
    return { profile, setProfile, posts, setPosts }
}

export default useGetProfile