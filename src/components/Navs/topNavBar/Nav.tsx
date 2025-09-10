import { links } from "@/helper/Links"
import { NavLink } from "react-router-dom"
import { Button } from "../../ui/button"
import NumberOfNotifications from "../NumberOfNotifications"
import logo from '../../../assets/svgs/logo.svg'
import ConfigMenu from "../ConfigMenu"
const Nav = () => {


    return (
        <header className="lg:flex hidden lg:sticky relative top-0 z-50 border-b bg-background  px-3 md:px-8 py-3  justify-between">
            {/* Avatar */}
            <div className="flex items-center gap-1">
                <span className="text-ring font-bold" style={{fontFamily:"cursive"}}>Netly</span>
               <img src={logo} alt="Logo" className="size-10" />
            </div>
            <div className="items-center gap-12 hidden lg:flex">
                {/* <ModeToggle /> */}
                {
                    links.map((e, i) => (
                        <NavLink key={i} to={e.to} className={({ isActive }) => `${isActive ? 'text-primary' : 'text-popover-foreground'} `}>
                            <Button variant="ghost" size="icon" className="flex-col gap-1 h-12 cursor-pointer relative ">
                                {
                                    e.name === "Notification" &&
                                    <NumberOfNotifications />
                                }
                                {e.icon}
                                <span className="text-xs ">{e.name}</span>
                            </Button>
                        </NavLink>
                    ))
                }
                <ConfigMenu />

            </div>
        </header>
    )
}

export default Nav