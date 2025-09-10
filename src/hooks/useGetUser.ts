import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect, useState } from "react";
const useGetUser = () => {
    const [isUser, setUser] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [numberOfNotification, setNumberOfNotification] = useState<number | null>(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/api/auth/getUser');
                if (response) {
                    setUser(true);
                    if(response?.data?.numberOfNotification > 0){setNumberOfNotification(response?.data?.numberOfNotification)}
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
        getUser()
    }, [])
    return { isUser, loading, setUser, numberOfNotification,setNumberOfNotification }
}

export default useGetUser