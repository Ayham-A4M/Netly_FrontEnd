import useGetConnections from '@/hooks/useGetConnections'
import Loader from '@/components/ui/loader'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { Input } from '@/components/ui/input'
import ConnectionCard from './ConnectionCard';
import { Search } from 'lucide-react'
const Connection = () => {
    const { loading, connection, setConnection, getFollowers, setGetFollowers, page, setPage, limitOfPages, searchByName, setSearchByName } = useGetConnections()
    useInfiniteScroll(page, limitOfPages, connection, loading, setPage);
    return (

        <div className="space-y-2">
           
            <div className='flex md:flex-row justify-between flex-col-reverse border-b-[1px] py-3 px-0.5  bg-background gap-y-2'>
                <div className='flex items-center gap-2'>
                    <button className={`px-2 py-1 text-[12px] rounded-full cursor-pointer ${getFollowers ? "bg-green-700 text-slate-200" : "border-2 border-green-700 text-green-700"}  `}
                        onClick={(e) => { e.preventDefault(); setGetFollowers(true) }}
                    >
                        followers
                    </button>

                    <button className={`px-2 py-1 text-[12px] rounded-full cursor-pointer ${(!getFollowers && getFollowers != null) ? "bg-blue-700 text-slate-200" : "border-2 border-blue-700 text-blue-700"} `}
                        onClick={(e) => { e.preventDefault(); setGetFollowers(false) }}
                    >
                        following
                    </button>

                    <button className={`px-2 py-1 text-[12px] rounded-full cursor-pointer ${getFollowers == null ? "bg-orange-600 text-slate-200" : "border-2 border-orange-600 text-orange-600"} `}
                        onClick={(e) => { e.preventDefault(); setGetFollowers(null) }}
                    >
                        Discover People
                    </button>

                </div>

                <div className='w-[99%] md:w-[70%] m-auto'>
                    <div className='relative w-full'>
                        <Search className='absolute top-[50%] right-3 translate-y-[-50%] size-3' />
                        <Input className='border-[1px] w-full pr-6 rounded-xl' placeholder='search by name' value={searchByName} onChange={(e) => {
                            setSearchByName(e.target.value);
                        }} />
                    </div>
                </div>
            </div>
            <div className="w-full">

                {
                    (connection && connection?.length > 0) ?
                        connection?.map((e: any) => (
                            <ConnectionCard profileInformation={e} />
                        ))
                        :

                        <div className="h-screen flex justify-center items-center">
                            {
                                ((!loading) && connection?.length == 0 && searchByName) ?
                                    <span className="text-primary md:text-xl mb-4">{`no ${getFollowers ? "followers" : "following"} with this name`}</span>
                                    :
                                    <span className="text-primary md:text-xl mb-4">
                                        {`no ${getFollowers ? "followers" : "following"}`}
                                    </span>
                            }

                        </div>

                }


            </div>
            {
                (loading && connection?.length > 0) ?
                    <div className="flex justify-center items-center pt-2">
                        <Loader />
                    </div>
                    :
                    loading &&
                    <div className="flex justify-center items-center h-screen">
                        <Loader />
                    </div>
            }
        </div >









    )
}

export default Connection