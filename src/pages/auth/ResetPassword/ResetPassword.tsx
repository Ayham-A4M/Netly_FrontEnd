import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RiKey2Fill } from "react-icons/ri";
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import handleResetPassword from "./handler/handleResetPassword";
import { Eye,EyeOff } from "lucide-react";
const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: 'passowrd minimum length is 8' }).max(30, 'password maximum length is 30'),
    confirmPassword: z.string()
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})
export type resetType = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
    const [sendingReq, setSendingReq] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const form = useForm<resetType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = async (data: resetType) => {
        const response = await handleResetPassword(data.password, setSendingReq)
        if (response) {
            form.reset();
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[95%] max-w-[500px]">
                <CardHeader className="flex justify-center items-center flex-col gap-2">
                    <div className="size-24 rounded-full dark:bg-violet-500/20 bg-violet-500/50 flex justify-center items-center">
                        <div className="size-12 rounded-full dark:bg-violet-400/35 bg-violet-500/60  flex justify-center items-center">
                            <RiKey2Fill className="size-8 text-ring" />
                        </div>
                    </div>
                    <h1 className="font-bold text-2xl">Forget Password ?</h1>
                    <span className="font-extralight text-primary">No Problem it is happend lets reset it </span>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end">
                        <Button variant="outline" size="icon" className="cursor-pointer" onClick={()=>{setIsHidden(prev => !prev)}}>
                            {
                                isHidden ?
                                    <Eye />
                                    :
                                    <EyeOff />
                            }
                        </Button>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••••••" type={isHidden ? "password" : "text"} className='py-6' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••••••" type={isHidden ? "password" : "text"} className='py-6' {...field} />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <Button type="submit" disabled={sendingReq} className='cursor-pointer w-full text-slate-100'>Submit</Button>

                        </form>
                    </Form>

                </CardContent>
                <CardFooter>
                    {
                        isSuccess &&
                        <span className="text-center text-sm font-light text-ring text-pretty w-[95%]">password reset successfully , now you can login to you`r account using this password 🔐</span>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default ResetPassword