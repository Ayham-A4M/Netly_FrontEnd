import PostCreation from './PostCreation'
import useGetPosts from '@/hooks/useGetPosts'
import Skeleton from './Skeleton'
// const obj = {

//     commentsCount
//         :
//         0,
//     content
//         :
//         "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis magnam eligendi dolor nam aperiam ex natus? Aliquid sit, eius nihil assumenda ad, cumque magni eum voluptas possimus ab dicta quasi!\n Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis magnam eligendi dolor nam aperiam ex natus? Aliquid sit, eius nihil assumenda ad, cumque magni eum voluptas possimus ab dicta quasi!\n\n"
//     ,
//     happyCount

//         :
//         0
//     , images
//         :
//         []
//     , likesCount
//         :
//         0
//     , loveCount
//         :
//         0
//     , publishedAt
//         :
//         "2025-08-08T14:26:18.698Z"
//     , sadCount
//         :
//         0
//     , sharedCount
//         :
//         0
//     , tags
//         :
//         ['general']
//     , userId
//         :
//         "689375ae6c0e236cad951213"
//     , userName
//         :
//         "A00M"
//     , wowCount
//         :
//         1
//     , _id
//         :
//         "6896090ab594c3d0fd745c74"
// }
import ShowPosts from '@/components/post/ShowPosts'
import Loader from '@/components/ui/loader'
import { useEffect } from 'react'
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