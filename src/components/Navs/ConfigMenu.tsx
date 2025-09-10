
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
const ConfigMenu = () => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <div className="pl-3 border-l-2 border-popover-foreground">
                    <GoGear role="button" onClick={() => { }} />
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

                <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={()=>{console.log("logout")}}>
                    <span className="text-[13px] font-light">Logout</span>  <IoLogOutOutline className="text-red-500" />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default ConfigMenu