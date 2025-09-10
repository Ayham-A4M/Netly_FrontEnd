import { Outlet } from "react-router-dom"
import Nav from "@/components/Navs/topNavBar/Nav"
import MobileNav from "@/components/Navs/mobileNav/MobileNav"
import LeftSideBar from "@/pages/home/LeftSidebar/LeftSideBar"
import RightSideBar from "@/pages/home/RightSidebar/RightSideBar"
import useShouldShowLeftCol from "@/hooks/useShouldShowLeftCol"

const MainLayout = () => {
    const shouldShowLeftCol = useShouldShowLeftCol();
    return (
        <div className="min-h-screen bg-background pb-20">
            <Nav />
            <div className="flex w-full mb-20 mx-auto lg:gap-4">
                {
                    shouldShowLeftCol &&
                    <LeftSideBar />
                }
                <div className="w-full flex-1">
                    <Outlet />
                </div>
                <RightSideBar />
            </div>
            <MobileNav />
        </div>
    )
}

export default MainLayout