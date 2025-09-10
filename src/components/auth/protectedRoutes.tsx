import { Navigate } from "react-router-dom"
import useUser from "@/hooks/useUser"
import { Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
    const USER = useUser(); // USER here has two properties isUser and loading
    if (!USER) { return <Navigate to={'/login_signup'} replace /> }
    if (USER.isUser) {
        return <Outlet />
    }
    if (USER.loading) {
        return <div className="w-full h-screen flex justify-center items-center">Loading</div>
    }
    if (!USER.loading && !USER.isUser) {
        return <Navigate to={'/login_signup'} replace />
    }

}

export default ProtectedRoutes