import toast from "react-hot-toast"
import axiosInstance from "@/helper/axiosInterceptor"
const handleUpdateAboutSection = async (data: any, setProfile: React.Dispatch<any>, setSendingReq: React.Dispatch<boolean>) => {
    interface UpdateObject {
        [key: string]: any; // Or a more specific type than 'any'
    }
    const updateObject:UpdateObject = {};
    Object.entries(data).forEach((e:any)=>{
    
        if(e[0]?.includes('link') && e[1]){
            if(updateObject.links){
                updateObject.links.push(e[1])
            }else {
                updateObject.links=[e[1]];
            }
        }
        else if(e[0]&&e[1]){
            updateObject[e[0]]=e[1]
        }
    })
    
  
    try {

        setSendingReq(true)
        const response = await axiosInstance.post('/api/profile/updateAboutInformation',updateObject);
        if (response.status === 200) {
            toast.success(response.data?.msg || 'profile updated');
            setProfile((prev: any) => ({ ...prev, ...updateObject }))
          
            return
        }
    } catch (err) {
        console.log(err)

    } finally {
        setSendingReq(false);
    }
}
export default handleUpdateAboutSection