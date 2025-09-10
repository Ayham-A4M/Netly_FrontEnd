import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast";

const handleFollowProcess = async(followingUserId:string) => {
    try{
        if(!followingUserId){toast.error('no specific user');return false}
        const response=await axiosInstance.post('/api/profile/follow',{followingUserId});
        if(response.status===200){
            return true
        }
    }catch(err){
        console.log(err);
        // toast.error()
    }
}

export default handleFollowProcess