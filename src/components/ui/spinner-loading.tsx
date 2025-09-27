
import { FiLoader } from "react-icons/fi";
const SpinnerLoading = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col items-center">
                <FiLoader className="animate-spin" />
                <span>loading....</span>
            </div>
        </div>
    )
}

export default SpinnerLoading