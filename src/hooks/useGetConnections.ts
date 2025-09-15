// connections means following and followers user can choose which side would show 
import { useState, useEffect } from "react"
import axiosInstance from "@/helper/axiosInterceptor"
import { useDebounce } from 'use-debounce';
const useGetConnections = () => {
    const [connection, setConnection] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limitOfPages, setLimitOfPages] = useState<number>(1);
    const [getFollowers, setGetFollowers] = useState<boolean | null>(true);
    const [searchByName, setSearchByName] = useState("");
    const [searchDebounce] = useDebounce(searchByName, 1500);
    useEffect(() => {
        const fetchConnection = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/api/profile/connections/${getFollowers}/?page=${page}&seachByName=${searchDebounce}`);
                if (response.status === 200) {
                    console.log(response)
                    if (response.data?.followers) {
                        setConnection(response.data?.followers)
                    } else if (response.data?.following) {
                        setConnection(response.data?.following);
                    } else if (response.data?.suggestions) {
                        setConnection(response.data?.suggestions);
                    }
                    if (page === 1 && response.data?.limit) {
                        setLimitOfPages(response.data?.limit);
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchConnection();
    }, [getFollowers, page, searchDebounce])
    return { loading, connection, setConnection, getFollowers, setGetFollowers, page, setPage, limitOfPages, searchByName, setSearchByName }
}

export default useGetConnections