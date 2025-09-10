import type { loginType } from "../Login"
import axiosInstance from "@/helper/axiosInterceptor"
const handleLoginProcess = async (data: loginType, setSendingReq: React.Dispatch<React.SetStateAction<boolean>>, setNotification: React.Dispatch<React.SetStateAction<number | null>> | undefined) => {

    try {
        setSendingReq(true);
        const response = await axiosInstance.post('/api/auth/login', data);
        if (response) {
            if (response.data?.numberOfNotification > 0) {
                if (setNotification)
                    setNotification(response.data?.numberOfNotification);
            }
            return true;
        }
    } catch (err) {
        return false;
    } finally {
        setSendingReq(false)
    }

}

export default handleLoginProcess