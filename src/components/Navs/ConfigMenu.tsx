
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoGear } from "react-icons/go"
import { ModeToggle } from "../mode-toggle"
import { TbLockPassword } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import axiosInstance from "@/helper/axiosInterceptor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ConfigMenu = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/api/auth/logout');
            if (response.status === 200) {
                toast.success(response?.data?.msg || "logged out successfully")
                navigate("/login_signup", { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <div className="pl-3 border-l-2 border-popover-foreground">
                    <GoGear role="button" className="cursor-pointer" onClick={() => { }} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-100 dark:bg-stone-800">

                <DropdownMenuItem className="flex items-center gap-1 justify-between">

                    <span className="text-[13px] font-light">Dark Mode</span> <ModeToggle />

                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Link to="/resetPassword" className="flex justify-between items-center">
                        <span className="text-[13px] font-light">Reset password</span>  <TbLockPassword className="text-blue-500" />
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="">
                    <Link to="/activity" className="flex justify-between w-full">
                        <span className="text-[13px] font-light">Activity</span>  <CiMenuKebab className="text-green-500" />
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={() => { handleLogout() }}>
                    <span className="text-[13px] font-light">Logout</span>  <IoLogOutOutline className="text-red-500" />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default ConfigMenu