import { Navigate } from "react-router-dom"
import useUser from "@/hooks/useUser"
import { Outlet } from "react-router-dom";
import LoadingPage from "../ui/loading_page";
const ProtectedRoutes = () => {
    const USER = useUser(); // USER here has two properties isUser and loading
    console.log(USER,"    ","user")
    if (!USER) { return <Navigate to={'/login_signup'} replace /> }
    if (USER?.loading) {
        return <LoadingPage/>
    }
    if (USER.isUser) {
        return <Outlet />
    }

    else if (!USER.loading && !USER.isUser) {
        return <Navigate to={'/login_signup'} replace />
    }

}

export default ProtectedRoutes