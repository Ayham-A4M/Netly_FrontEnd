import { useState } from "react"
import CreateEvent from "./CreateEvent"
import { Button } from "@/components/ui/button"
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import useGetEvents from "@/hooks/useGetEvents";
import EventCard from "./EventCard";
import Loader from "@/components/ui/loader";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
const obj = {
    title: "The MERN Stack Workshop: Build a Full-Stack App in a Day",
    description: "Ready to bridge the gap between front-end and back-end development? Join our intensive online workshop dedicated to the MERN stack. We'll guide you through building a fully functional application from scratch using MongoDB, Express.js, React, and Node.js.",
    date: new Date(),
    userName: "Ayham Abo Ajeeb",
    defaultCoverColor: "#A22BBB",
    eventType: "online",
    meetingApplication: "Google Meet",
}
const EventsPage = () => {
    const { events, setEvents, filter, setFilter, loading, setLoading, page, setPage, limitofPages, setLimitOfPages } = useGetEvents()
    const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);
    useInfiniteScroll(page, limitofPages, events, loading, setPage)
    return (
        <div className=" px-1 py-2 space-y-6">

            <div className="space-y-1">


                <div className='flex justify-start gap-2 items-center '>
                    <button className={`px-2 py-1 text-[12px] rounded-full cursor-pointer ${filter ? "bg-green-700 text-slate-200" : "border-2 border-green-700 text-green-700"}  `}
                        onClick={(e) => { e.preventDefault(); setPage(1);setFilter(true) }}
                    >
                        my events
                    </button>
                    <button className={`px-2 py-1 text-[12px] rounded-full cursor-pointer ${(filter == false && filter != null) ? "bg-blue-700 text-slate-200" : "border-2 border-blue-700 text-blue-700"}  `}
                        onClick={(e) => { e.preventDefault(); setPage(1);setFilter(false) }}
                    >
                        join events
                    </button>
                    <button className={`px-2 py-1 text-[12px] rounded-full cursor-pointer ${filter == null ? "bg-orange-600 text-slate-200" : "border-2 border-orange-600 text-orange-600"}  `}
                        onClick={(e) => { e.preventDefault(); setPage(1);setFilter(null) }}
                    >
                        upcoming events
                    </button>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <IoIosArrowBack className={`text-primary duration-500 ${showCreateEvent ? '-rotate-90' : ''}`} />
                    <Button size="icon" variant="outline" onClick={() => { setShowCreateEvent(prev => !prev) }}>
                        <IoIosAddCircle className="text-primary" />
                    </Button>
                </div>
            </div>

            {
                (loading && !events) ?
                    <div className="flex justify-center items-center h-[85vh]">
                        <Loader />
                    </div>
                    :
                    <>
                        {
                            showCreateEvent &&
                            <CreateEvent />
                        }

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-primary">{filter ? 'My Events' : filter !== null ? 'Join Events' : 'Upcoming Events'}</h2>
                            {events.length === 0 && (
                                <p className="text-primary">
                                    {`${filter ? 'You dont have events,Create one above!' : filter != null ? 'no events' : 'no upcoming events'}`}
                                </p>
                            )}
                            {
                                events.length > 0 &&
                                events.map((e) => (
                                    <EventCard eventInfo={e} eventType={filter} interest={((!filter && filter != null) ? false : true)} key={e?._id} />
                                ))
                            }
                            {
                                (loading && events) &&
                                <div className="flex justify-center items-center py-2">
                                    <Loader />
                                </div>
                            }
                        </section>

                    </>
            }

        </div>
    )
}

export default EventsPage