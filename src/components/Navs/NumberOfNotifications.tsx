
import { useContext } from "react";
import { UserContext } from "@/App";
const NumberOfNotifications = () => {
    const context = useContext(UserContext);
    return (
        <>
            {
                (context?.numberOfNotification && context?.numberOfNotification > 0) &&
                <span className="absolute bg-red-500 text-white font-extralight min-w-[18px] min-h-[18px]  pt-0.5 flex justify-center items-center rounded-full text-[10px] top-[-3px] left-[22px]">
                    {context?.numberOfNotification}
                </span>
            }

        </>
    )
}

export default NumberOfNotifications