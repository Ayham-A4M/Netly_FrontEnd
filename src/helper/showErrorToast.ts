import toast from "react-hot-toast";
const showErrorToast = (err: any) => {
    console.log(err,"errrr");
    const errorMessage = err?.response?.data?.msg || err?.message || "An unexpected error occurred";
    toast.error(errorMessage);
    return 
}

export default showErrorToast