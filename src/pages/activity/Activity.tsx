import { useEffect, useState } from "react"
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { IoMdShare } from "react-icons/io";
import { FaComments } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { LuMessageCircleHeart } from "react-icons/lu";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Activity = () => {

    const [activityType, setActivityType] = useState<("comments" | "postReactions" | "C_Reactions" | "sharing") | null>(null);
    const location = useLocation()
    useEffect(() => {
        const path = window.location.pathname.split('/');
        if (path.length === 3) {
            const type = path[2];
            if (type === "comments" || type === "postReactions" || type === "sharing") {
                setActivityType(type);
            } else if (type === "commentReactions") {
                setActivityType("C_Reactions")
            }
            else {
                setActivityType(null);
            }
        } else {
            setActivityType(null);
        }
    }, [location.pathname])
    return (
        <div className="">
            {/* header */}
            <div className="py-3 px-2 border-b-2 flex items-center justify-between">
                <h1 className="text-[1.3rem] font-bold  flex items-center gap-2 capitalize">
                    {`${!activityType ? 'Activity' : `Activity - ${activityType}`}`}
                    {
                        !activityType ?
                            <HiMiniWrenchScrewdriver />
                            : activityType === "comments" ? <FaComments className="text-blue-500" />
                                : activityType === "postReactions" ? <IoMdHeart className="text-red-500" />
                                    : activityType === "C_Reactions" ? <LuMessageCircleHeart className="text-red-400" />
                                        : <HiMiniWrenchScrewdriver />
                    }
                </h1>

                {
                    activityType &&
                    <button className="cursor-pointer" onClick={() => { setActivityType(null); window.history.back() }}>
                        <IoChevronBackCircleSharp className="text-2xl" />
                    </button>
                }

            </div>
            {
                // links
                activityType === null &&
                <div className="">
                    <ul className="py-2 space-y-2 list-none">
                        <li className="py-2 border-b-2 px-4">
                            <Link to={'comments'} className="cursor-pointer hover:text-primary"
                            >Comments {`>`}</Link>
                        </li>
                        <li className="py-2 border-b-2 px-4">
                            <Link to={'postReactions'} className="cursor-pointer hover:text-primary"
                            >Post Reactions {`>`}</Link>
                        </li>
                        <li className="py-2 border-b-2 px-4">
                            <Link to={'commentReactions'} className="cursor-pointer hover:text-primary"
                            >Comment Reactions {`>`}</Link>
                        </li>
                    </ul>
                </div>
            }

            {
                <Outlet />
            }



        </div>
    )
}

export default Activity