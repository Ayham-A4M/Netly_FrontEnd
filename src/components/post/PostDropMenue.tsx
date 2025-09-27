
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
const PostDropMenu = ({ setDeletePostId, postId,setEditPostId }: { setDeletePostId: React.Dispatch<React.SetStateAction<string | null>>, postId: string,setEditPostId:React.Dispatch<React.SetStateAction<string | null>> }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button name="post-settings" variant="outline" size="icon" className="cursor-pointer rounded-full shadow-none">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit px-4" align="start">
                <DropdownMenuLabel>Post config</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-between items-center" onClick={()=>{setEditPostId(postId)}}>
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
