
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem

} from "@/components/ui/dropdown-menu"
import { MdEmojiEmotions } from "react-icons/md"
import { feelingsData } from "@/utils/feelings"
import React from "react"
// import feelingsData from "@/utils/feelings"
const FeelingSelect = ({ feeling, setFeeling }: { feeling: string, setFeeling: React.Dispatch<string> }) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>

                <button className="px-3.5 py-1 bg-background border-[1px] text-popover-foreground hover:border-primary  cursor-pointer duration-300 rounded-2xl text-md font-extralight text-sm  flex items-center gap-1">
                    Feeling
                    <MdEmojiEmotions className="text-yellow-400" />
                </button>
                {/* <Button variant="outline" size="icon" className="relative">
                    <MdEmojiEmotions className="text-yellow-400 size-3.5" />
                    <span className="absolute top-[50%] left-[50%] translate-x-0.5">+</span>
                </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit px-4" align="start" >
                <DropdownMenuLabel>Your Feeling</DropdownMenuLabel>
                <DropdownMenuRadioGroup className="grid grid-cols-2" value={feeling} onValueChange={(value) => { setFeeling(value) }} >
                    <DropdownMenuRadioItem className="flex justify-between items-center col-span-2" value="" >
                        None
                    </DropdownMenuRadioItem>
                    {
                        feelingsData.map((e: any) => (
                            <DropdownMenuRadioItem className={` ${e.type == feeling ? "bg-slate-300/50 dark:bg-slate-700/50" : ""}  flex justify-between items-center`} value={e.type} key={e.type}  >
                                {
                                    e.type
                                }
                                {e.emoji}
                            </DropdownMenuRadioItem>
                        ))
                    }
                </DropdownMenuRadioGroup>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default React.memo(FeelingSelect)
