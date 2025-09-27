import { useEffect } from "react";

const useInfiniteScroll = (page: number, limitOfPages: number, data: any[], loading: boolean, setPage:React.Dispatch<React.SetStateAction<number>>
) => {
    const onScroll = () => {
        
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight - 100) {
            if ((page < limitOfPages) && (data.length > 0) && !loading) {
                setPage((prev:number) => prev + 1)
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [loading, data, limitOfPages, page]);
}

export default useInfiniteScroll