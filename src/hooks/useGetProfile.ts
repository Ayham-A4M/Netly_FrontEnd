import axiosInstance from "@/helper/axiosInterceptor"
import { useState, useEffect } from "react"
const useGetProfile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [posts, setPosts] = useState<any>(null)
    useEffect(() => {
        const getProfile = async () => {
            const response = await axiosInstance.get('/api/profile/getUserProfile');
            if (response.status === 200) {
                console.log(response);
                setProfile(response.data.profile);
                setPosts(response.data.posts);
            }
        }
        getProfile();
    }, [])
    return { profile, setProfile,posts,setPosts }
}

export default useGetProfile