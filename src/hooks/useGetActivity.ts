import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect, useState } from "react"
import showErrorToast from "@/helper/showErrorToast"

const useGetActivity = (api: string) => {
    const [activity, setActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [limitOfPages, setLimitOfPages] = useState(1);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`${api}/?page=${page}`);
                console.log(response);
                if (response.status === 200) {
                    if (page > 1) {
                        setActivity((prev) => ([...prev, ...response.data?.activity]))
                    }
                    else if (page <= 1) {
                        setActivity(response.data.activity);
                        setLimitOfPages(response.data?.limitOfPages);
                    }

                }
            } catch (err) {
                showErrorToast(err);
            } finally {
                setLoading(false)
            }
        }
        fetchActivity();
    }, [page, api])
    return { activity, setActivity, loading, page, setPage, limitOfPages }
}

export default useGetActivity