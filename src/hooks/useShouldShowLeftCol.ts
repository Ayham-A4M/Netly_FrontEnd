import { useEffect, useState } from "react"

const useShouldShowLeftCol = () => {
    const [show, setShow] = useState<boolean>(window.innerWidth >= 1024);
    useEffect(() => {
        const handleResize = () => {
            setShow(window.innerWidth >= 1024);
            console.log('oo', window.innerWidth >= 1024)
        }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [show])
    return show
}

export default useShouldShowLeftCol