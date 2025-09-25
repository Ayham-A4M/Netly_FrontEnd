import axiosInstance from "@/helper/axiosInterceptor"
import { useEffect, useState } from "react";
import showErrorToast from "@/helper/showErrorToast"

const useGetEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [filter, setFilter] = useState<boolean | null>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limitofPages, setLimitOfPages] = useState<number>(0);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/event/events/${filter}/?page=${page}`);
                if (response.status === 200) {
                    
                    if (page > 1) {
                        setEvents((prev) => ([...prev, ...response.data?.events]))
                    } else {
                        setEvents(response.data?.events)
                    }
                    if (page === 1) {
                        setLimitOfPages(response.data?.limitOfPages);
                    }
                }
            } catch (err) {
                showErrorToast(err);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [filter, page])

    return { events, setEvents, filter, setFilter, loading, setLoading, page, setPage, limitofPages, setLimitOfPages };
}

export default useGetEvents