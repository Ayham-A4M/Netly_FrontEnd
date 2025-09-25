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
import Logo from '../../../assets/svgs/logo.svg'
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
        <Card className='w-[98%] max-w-[450px] p-6 gap-4 bg-background shadow-md rounded-none  '>
            <CardHeader className="p-0">
                <div className='flex justify-center items-center'>
                    <img src={Logo} alt="Logo" className='size-16' />
                </div>
                <CardTitle className='text-2xl text-ring font-extrabold text-center' >Welcome Back !</CardTitle>
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



                    <Button disabled={sendingReq} type="submit" className='cursor-pointer w-full rounded-none text-slate-200'>Submit</Button>
                    <div className='text-center'>
                        or
                    </div>
                    <Button className='cursor-pointer w-full rounded-none bg-zinc-600 text-slate-200' onClick={(e) => { e.preventDefault(); setIsLogin(false) }}>
                        dont have account
                    </Button>

                </form>
            </Form>
        </Card>
    )
}

export default Login



