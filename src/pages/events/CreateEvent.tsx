import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import handleCreateNewEvent from "./handler/handleCreateNewEvent"
const eventSchema = z.object({
    title: z.string().nonempty({ message: "title can not be empty" }).max(100, { message: "title maximum length is 100 char" }),
    description: z.string().min(100, { message: 'description minimum length is 100 char' }).max(1024, { message: 'description maximum length is 1024 char' }),
    eventType: z.string(),
    date: z.date(),
    location: z.string().optional(),
    meetingApplication: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.eventType === "onsite" && !data.location) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "location is required for onsite events",
            path: ["location"],
        });
    }
    else if (data.eventType === 'online' && !data.meetingApplication) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "meeting application is required for online events",
            path: ["meetingApplication"],
        });
    }
})

export type eventType = z.infer<typeof eventSchema>;

const CreateEvent = () => {
    const [open, setOpen] = useState(false);
    const [sendingReq, setSendingReq] = useState<boolean>(false);
    const form = useForm<eventType>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventType: "onsite",
            title: "",
            description: "",
            location: undefined,
            meetingApplication: undefined,
            date: undefined,
        }

    })
    form.watch("eventType");
    const onSubmit = async (data: eventType) => {
        const response = await handleCreateNewEvent(data, setSendingReq);
        if (response) {
            form.reset()
        }
    }

    return (
        <Card className="bg-background px-4 gap-y-0">
            <CardHeader className="px-0">
                <h2 className="text-2xl font-bold mb-4 text-primary">Create a New Event</h2>

            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Event Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Event Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex justify-between  flex-wrap-reverse gap-y-2 items-center">
                        <div className="w-full flex items-center gap-2.5">
                            <div className="flex items-center gap-1 w-fit">
                                <FormField
                                    control={form.control}
                                    name="eventType"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2">
                                            <FormLabel>onsite</FormLabel>
                                            <FormControl>
                                                <input type="radio" onChange={(e) => { field.onChange(e.target.value) }} name="eventType" checked={field.value === "onsite"} value="onsite" className="accent-primary" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-1 w-fit">

                                <FormField
                                    control={form.control}
                                    name="eventType"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2">
                                            <FormLabel>online</FormLabel>
                                            <FormControl>
                                                <input type="radio" onChange={(e) => { field.onChange(e.target.value) }} checked={field.value === "online"} id="online" name="eventType" value="online" className="accent-primary" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>

                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className=" justify-between font-normal"
                                                >
                                                    {field.value ? format(field.value, "PPP") : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout="dropdown"

                                            />
                                        </PopoverContent>
                                    </Popover>



                                    <FormMessage />
                                </FormItem>
                            )}
                        />





                    </div>
                    {
                        form.getValues("eventType") === "onsite" ?
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            :
                            <FormField
                                control={form.control}
                                name="meetingApplication"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="meeting application" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                    }

                    <Button type="submit" disabled={sendingReq} className="w-full text-slate-200 rounded-xl">
                        Add Event
                    </Button>
                </form>
            </Form>


        </Card>
    )
}

export default CreateEvent