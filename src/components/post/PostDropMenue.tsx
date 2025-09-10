
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaGear } from 'react-icons/fa6'
import { MoreHorizontal } from "lucide-react"
import { FaTrash } from "react-icons/fa"
const PostDropMenu = ({ setDeletePostId, postId }: { setDeletePostId: React.Dispatch<React.SetStateAction<string | null>>, postId: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer shadow-none">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit px-4" align="start">
                <DropdownMenuLabel>Post config</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-between items-center">
                        Edit
                        <FaGear className="size-3" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-between items-center" onClick={()=>{setDeletePostId(postId)}}>
                        Delete
                        <FaTrash className="size-3 text-red-500" />
                    </DropdownMenuItem>
                    {/* <DeleteDialog /> */}

                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default PostDropMenu
