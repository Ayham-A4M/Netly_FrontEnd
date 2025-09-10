import { useTheme } from "@/components/theme-provider"
import { Switch } from "./ui/switch"
export function ModeToggle() {
    const { setTheme,theme } = useTheme()

    return (

        <Switch checked={(theme=="dark")} onCheckedChange={()=>{
            if(theme=="dark"){
                setTheme("light")
            }else{
                setTheme("dark");
            }
        }}/>
    )
}