import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserRoundPen } from 'lucide-react'
import { FaLink } from "react-icons/fa"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import handleUpdateAboutSection from "./handler/handleUpdateAboutSection"
import { useState } from "react"
const updateSchema = z.object({
    bio: z.string().max(1024).optional(),
    title: z.string().max(500).optional(),
    location: z.string().max(100).optional(),
    link1: z.string().max(250).optional(),
    link2: z.string().max(250).optional(),
    link3: z.string().max(250).optional(),
}).refine((data: updateType) => (
    !data.location || /^[A-Z][a-zA-Z]+-[A-Z][a-zA-Z]+$/.test(data.location)
), {
    message: "Must be in Country-City format (e.g., 'Canada-Toronto')",
    path: ["location"],
})
export type updateType = z.infer<typeof updateSchema>;

const UpdateDialog = ({ setProfile, profile }: { setProfile: React.Dispatch<any>, profile: any }) => {
    const form = useForm<updateType>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            bio: profile?.bio || '',
            link1: profile?.links[0] || '',
            link2: profile?.links[1] || '',
            link3: profile?.links[2] || '',
            title: profile?.title || '',
            location: profile?.location || '',
        }
    })
    const [sendingReq, setSendingReq] = useState(false);
    const onSubmit = (data: any) => {
        console.log(data);
        handleUpdateAboutSection(data, setProfile, setSendingReq);
    }


    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" size="icon" className="cursor-pointer" >
                    <UserRoundPen />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] overflow-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary italic">{`Bio  ${form.getValues('bio')?.length}/1024`}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="write about you"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary italic">{`Title  ${form.getValues('title')?.length}/500`}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Who are you"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <div className="flex items-center gap-1 text-primary">
                                <h1 className="italic">Important Links</h1>
                                <FaLink />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="link1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary italic">Link1</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://...."   {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /><FormField
                                    control={form.control}
                                    name="link2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary italic">Link2</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://...."  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /><FormField
                                    control={form.control}
                                    name="link3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary italic">Link3</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://...."   {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary italic">
                                        Location
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Country-City"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button name="submit" disabled={sendingReq} type="submit" className='cursor-pointer text-slate-200 w-full'>Submit</Button>

                    </form>
                </Form>




            </DialogContent>
        </Dialog>

    )
}

export default UpdateDialog