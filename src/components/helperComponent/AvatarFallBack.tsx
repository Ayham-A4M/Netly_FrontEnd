import { AvatarFallback } from '../ui/avatar'

const AvatarFallBack = ({name,backgroundColor}:{name:string,backgroundColor:string}) => {
    return (
        <AvatarFallback  className={` text-white ${backgroundColor}`} style={{backgroundColor:backgroundColor,color:""}}>{name?.slice(0, 1)}</AvatarFallback>
    )
}

export default AvatarFallBack