import { BiSolidCommentDots } from "react-icons/bi";
const NoComments = () => {
    return (
        <div className='flex flex-col items-center gap-1'>
            <BiSolidCommentDots className="text-primary size-48"/>
            <span>No Comments</span>
        </div>
    )
}

export default NoComments