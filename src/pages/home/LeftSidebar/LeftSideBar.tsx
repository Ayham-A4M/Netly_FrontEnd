
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


            {/* <div className="bg-gradient-card rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-foreground">Groups</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-orange-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-orange text-white">DL</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Dog Lovers</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-green-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-green text-white">GZ</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">GamerZzZz</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-purple-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-purple text-white">TG</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Travel Girls</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-pink-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-pink text-white">CM</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">cat memez</span>
                    </div>
                </div>
            </div> */}
        </aside>
    )
}

export default LeftSideBar