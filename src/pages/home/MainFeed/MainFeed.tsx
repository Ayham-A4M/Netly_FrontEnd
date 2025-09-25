import PostCreation from './PostCreation'
import useGetPosts from '@/hooks/useGetPosts'
import Skeleton from './Skeleton'
import ShowPosts from '@/components/post/ShowPosts'
import Loader from '@/components/ui/loader'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
const MainFeed = () => {

    const { loading, posts, setPosts, page, setPage, limitOfPages } = useGetPosts();

    useInfiniteScroll(page,limitOfPages,posts,loading,setPage);
    return (
        <main className="p-1 md:p-4 space-y-4 md:space-y-6 relative">
            {/* Post Creation */}
            {
                (loading && posts.length == 0) ?
                    <Skeleton />

                    :
                    <>
                        <PostCreation />
                        
                        {
                            <ShowPosts posts={posts} setPosts={setPosts} />
                        }
                        {
                            (posts.length > 0 && loading) &&
                            <div className='flex justify-center items-center'>
                                <Loader />
                            </div>
                        }
                    </>
            }





        </main>
    )
}

export default MainFeed