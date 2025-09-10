import { useEffect, useState } from "react"

const useScrollTracker = () => {
  const [userPosition,setUserPosition]=useState<number>(0);
  useEffect(()=>{
    console.log(window.scrollY);
  },[window.scrollY])
}

export default useScrollTracker