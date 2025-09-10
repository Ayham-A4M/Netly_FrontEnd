import { AvatarFallback } from '../ui/avatar'

const AvatarFallBack = ({name,backgroundColor}:{name:string,backgroundColor:string}) => {
    return (
        <AvatarFallback className={` text-white ${backgroundColor}`} style={{backgroundColor:backgroundColor}}>{name?.slice(0, 2)}</AvatarFallback>
    )
}

export default AvatarFallBack