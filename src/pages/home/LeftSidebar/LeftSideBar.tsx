
import ProfileCard from "./ProfileCard"
import { useEffect, useState } from "react"
import axiosInstance from "@/helper/axiosInterceptor"
const LeftSideBar = () => {
     const [profileCard, setProfileCard] = useState<any>(null);
    useEffect(() => {
        const test = async () => {
            try {
                const response = await axiosInstance.get('/api/profile/profileCard');
                if (response.status === 200) {
                    setProfileCard(response.data?.profileCard);
                }
            } catch (err) {
                console.log(err);
            }
        }
        test();
    }, [])

    return (
        <aside className="hidden lg:block w-72 p-4 space-y-4 sticky top-20 h-fit">
            <ProfileCard profileCard={profileCard} />
        </aside>
    )
}

export default LeftSideBar