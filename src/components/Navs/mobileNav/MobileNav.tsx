import { NavLink } from "react-router-dom";
import { Button } from "../../ui/button"
import { links } from "@/helper/Links";
import NumberOfNotifications from "../NumberOfNotifications";
const MobileNav = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0  border-t bg-background z-50">
            <div className="flex items-center justify-around py-2">
                {
                    links.map((e, i) => (
                        <NavLink key={i} to={e.to} className={({ isActive }) => `${isActive ? 'text-primary ' : 'text-popover-foreground '}`}>
                            <Button variant="ghost" size="icon" className="flex-col gap-1 h-12 relative">
                                {e.name === "Notification" && <NumberOfNotifications />}
                                {e.icon}
                                <span className="text-xs ">{e.name}</span>
                            </Button>
                        </NavLink>
                    ))
                }

            </div>
        </nav>
    )
}

export default MobileNav