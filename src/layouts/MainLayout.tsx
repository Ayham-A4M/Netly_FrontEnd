import { Outlet } from "react-router-dom"
import Nav from "@/components/Navs/topNavBar/Nav"
import MobileNav from "@/components/Navs/mobileNav/MobileNav"
import LeftSideBar from "@/pages/home/LeftSidebar/LeftSideBar"
import RightSideBar from "@/pages/home/RightSidebar/RightSideBar"
import useGetScreenWidth from "@/hooks/useGetScreenWidth"

const MainLayout = () => {
    // const shouldShowLeftCol = useShouldShowLeftCol();
    const screenWidth = useGetScreenWidth();
    return (
        <div className="min-h-screen bg-background pb-20">
            <Nav />
            <div className="flex w-full mb-20 md:px-1 mx-auto lg:gap-4">
                {
                    screenWidth >= 1024 &&
                    <LeftSideBar />
                }
                <div className="w-full flex-1">
                    <Outlet />
                </div>
                {
                    screenWidth >= 1280 &&
                    <RightSideBar />
                }
            </div>
            <MobileNav />
        </div>
    )
}

export default MainLayout