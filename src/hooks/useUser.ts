import { useContext } from "react"
import { UserContext } from "@/App"
const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        return false;
    }
    const { isUser, loading } = context
    return { isUser, loading };
}

export default useUser