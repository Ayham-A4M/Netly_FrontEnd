import { addScroll, removeScroll } from "@/helper/editScroll"
import { useEffect } from "react"

const useEditScroll = (postId: string | null) => {
    useEffect(() => {
        if (!!postId) { removeScroll() }
        else {
            addScroll()
        }
    }, [postId])
}

export default useEditScroll