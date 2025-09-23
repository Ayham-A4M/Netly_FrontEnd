import { FaComments } from "react-icons/fa6";
const NoComments = () => {
    return (
        <div className='flex flex-col items-center gap-1'>
            <FaComments className="text-primary size-48"/>
            <span>No Comments</span>
        </div>
    )
}

export default NoComments