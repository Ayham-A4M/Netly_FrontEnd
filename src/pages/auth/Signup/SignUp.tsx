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
import signupPic from '../../../assets/images/signup.png'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import NextPrevButtons from './NextPrevButtons';
import handleSignUpProcess from './handler/handleSignUpProcess';
const signupSchema = z.object({
    userName: z.string().min(2, { message: 'user name must be at least 3' }).max(20, { message: 'maximum letters 20' }),
    email: z.email(),
    age: z.number().min(18),
    password: z.string().min(8, { message: 'passowrd minimum length is 8' }).max(30, 'password maximum length is 30'),
    confirmPassword: z.string(),
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

const steps = [
    {
        stepNo: 1,
        requireFileds: ['userName', 'email']
    }, {
        stepNo: 2,
        requireFileds: ['age']
    }, {
        stepNo: 3,
        requireFileds: ['password', 'confirmPassword']
    }
] as const;

export type signupSchema = z.infer<typeof signupSchema>;

const SignUp = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const form = useForm<signupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            age: 18,
            userName: '',
            password: '',
            confirmPassword: '',
            email: '',
        }
    })
    const handleNextClick = async (): Promise<void> => {
        {
            if (stepNo < steps.length && await form.trigger(steps[stepNo - 1].requireFileds))
                setStepNo(prev => prev + 1)
        }
    }
    const onSubmit = (values: signupSchema) => {
        handleSignUpProcess(values, setSendingReq);
    }

    const [showPass, setShowPass] = useState<boolean>(false);
    const [stepNo, setStepNo] = useState<number>(1);
    const [sendingReq, setSendingReq] = useState(false);

    return (
        <Card className='w-[98%] max-w-[450px] p-6 gap-4 bg-background rounded-none'>
            <CardHeader className="p-0">
                <div className='w-full flex items-center justify-center'>
                    <div className='flex items-center justify-center'>
                        <img src={Logo} alt="logo" className='size-16' />
                    </div>
                </div>
                <CardTitle className='text-2xl text-ring font-extrabold text-center'>Create New Account</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* step1 */}
                    {
                        stepNo == 1 &&
                        <>
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John44" className='py-6' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John44@gmail.com" type='email' className='py-6' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                        </>
                    }

                    {/* stpe 2 */}
                    {
                        stepNo == 2 &&
                        <>
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your age" type='number' className='py-6' {...field} onChange={(e) => { form.setValue("age", parseInt(e.target.value)) }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    }

                    {/* step 3 */}
                    {
                        stepNo === 3 &&
                        <>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className='relative w-full'>
                                                {
                                                    form.getValues('confirmPassword')?.length > 0 && (
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
                        </>
                    }

                    <NextPrevButtons setStepNo={setStepNo} stepNo={stepNo} onNext={handleNextClick} maximumStep={steps.length} />

                    {
                        stepNo == steps.length &&
                        <Button disabled={sendingReq} type="submit" className='cursor-pointer w-full text-slate-200 rounded-none'>Submit</Button>
                    }

                </form>

            </Form>
            {
                stepNo !== steps.length &&
                <>
                    <div className='text-center'>
                        or
                    </div>
                    <Button className='cursor-pointer w-full rounded-none bg-zinc-600 text-slate-200' onClick={(e) => { e.preventDefault(); setIsLogin(true) }}>
                        already have account
                    </Button>
                </>
            }
        </Card>
    )
}

export default SignUp



