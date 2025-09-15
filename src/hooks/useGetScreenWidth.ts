import { useEffect, useState } from "react"

const useGetScreenWidth = () => {
    // const [show, setShow] = useState<boolean>(window.innerWidth >= 1024);
    const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            // setShow(window.innerWidth >= 1024);
            setScreenSize(window.innerWidth);
            // console.log('oo', window.innerWidth >= 1024)
        }
        console.log('jj');
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [screenSize])
    return screenSize
}

export default useGetScreenWidth