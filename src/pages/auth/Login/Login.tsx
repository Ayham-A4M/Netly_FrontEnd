import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import socailMediaPic from '../../../assets/images/socialmedia.png'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import handleLoginProcess from './handler/handleLoginProcess';
import { useContext } from 'react';
import { UserContext } from '@/App';
import toast from 'react-hot-toast';
const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: 'passowrd minimum length is 8' }).max(30, 'password maximum length is 30'),
})
import { useNavigate } from 'react-router-dom';
export type loginType = z.infer<typeof loginSchema>;
const Login = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const form = useForm<loginType>({
        resolver: zodResolver(loginSchema),

    })
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const onSubmit = async (values: loginType) => {
        const result = await handleLoginProcess(values, setSendingReq, context?.setNumberOfNotification);
        if (result) {
            context?.setUser(true);
            toast.success('logged in');
            navigate('/', { replace: true })
        }
    }
    const [showPass, setShowPass] = useState<boolean>(false);
    const [sendingReq, setSendingReq] = useState(false);


    return (
        <Card className='w-[98%] max-w-[450px] p-6 gap-4 '>
            <CardHeader className="p-0">

                <div className='w-full flex items-center justify-center'>
                    <div className='w-fit h-fit'>
                        <img src={socailMediaPic} className='size-48' alt="social media photo" />
                    </div>
                </div>
                <CardTitle className='text-2xl text-ring font-extrabold italic text-center'>Welcome Back !</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="John44@gmail.com" className='py-6' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className='relative w-full'>
                                        {
                                            form.getValues('password')?.length > 0 && (
                                                showPass ?
                                                    <Button variant="outline" size="icon" className='cursor-pointer absolute top-[50%] translate-y-[-50%] right-[10px]' onClick={(e) => { e.preventDefault(); setShowPass(prev => !prev) }}>
                                                        <Eye className='w-4' />
                                                    </Button>

                                                    :
                                                    <Button variant="outline" size="icon" className='cursor-pointer absolute top-[50%] translate-y-[-50%] right-[10px]' onClick={(e) => { e.preventDefault(); setShowPass(prev => !prev) }}>
                                                        <EyeOff className='w-4' />
                                                    </Button>
                                            )
                                        }

                                        <Input placeholder="••••••••••••" className='py-6 w-full' type={showPass ? 'text' : 'password'} {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <Button disabled={sendingReq} type="submit" className='cursor-pointer w-full'>Submit</Button>
                    <div className='flex items-center justify-end ' >
                        <span className='underline pb-[2px] text-popover-foreground cursor-pointer' role='button' onClick={() => { setIsLogin(false) }}>
                            dont have account
                        </span>
                    </div>
                </form>
            </Form>
        </Card>
    )
}

export default Login



