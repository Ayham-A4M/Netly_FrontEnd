import axiosInstance from "@/helper/axiosInterceptor"
import toast from "react-hot-toast"
const handleResetPassword = async (newPassword: string, setSendingReq: React.Dispatch<boolean>): Promise<boolean> => {
    try {
        setSendingReq(true);
        const response = await axiosInstance.post('/api/auth/resetPassword', { newPassword });
        if (response.status === 200) {
            toast.success(response.data?.msg || "password reset");
            return true;
        }
        return false;
    } catch (err) {
        return false;
    } finally {
        setSendingReq(false)
    }

}

export default handleResetPassword