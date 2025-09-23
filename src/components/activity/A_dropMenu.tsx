
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaGear } from 'react-icons/fa6'
import { CgOptions } from "react-icons/cg"
import { FaLink, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
interface props {
    postId: string,
    setDeleteId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditId: React.Dispatch<React.SetStateAction<string | null>>,
    activityId:string
}
const A_dropMenu = ({ postId, setDeleteId, setEditId,activityId }: props) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild className="absolute top-0 right-1">
                <button>
                    <CgOptions className="text-xl cursor-pointer hover:text-primary" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit px-4" align="start">
                <DropdownMenuLabel>settings</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-between items-center" onClick={() => { setEditId(activityId) }}>
                        Edit
                        <FaGear className="size-3" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-between items-center" onClick={() => { setDeleteId(activityId) }}>
                        Delete
                        <FaTrash className="size-3 text-red-500" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to={`/post/${postId}`} className="flex justify-between items-center w-full">
                            Show
                            <FaLink className="size-3 text-blue-500" />
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default React.memo(A_dropMenu);
