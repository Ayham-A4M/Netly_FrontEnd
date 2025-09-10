import { useEffect } from "react";

const useInfiniteScroll = (page: number, limitOfPages: number, data: any[], loading: boolean, setPage:React.Dispatch<React.SetStateAction<number>>
) => {
    const onScroll = () => {
        console.log("page : ", page, "   ", "limit  : ", limitOfPages);

        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            console.log("(page < limitOfPages)", " = ", `(${page} < ${limitOfPages})`)
            if ((page < limitOfPages) && (data.length > 0) && !loading) {
                console.log("done");
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