import axiosInstance from "@/helper/axiosInterceptor";
import type { signupSchema } from "../SignUp"
import toast from "react-hot-toast";
const handleSignUpProcess = async (data: signupSchema,setSendingReq:React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        setSendingReq(true)
        const response = await axiosInstance.post('/api/auth/signup', data);
        if (response.status === 200){
            toast.success(response.data?.msg || 'user saved please login now')
        }
    } catch (err) {
        console.log(err)
    }finally{
        setSendingReq(false);
    }
}

export default handleSignUpProcess