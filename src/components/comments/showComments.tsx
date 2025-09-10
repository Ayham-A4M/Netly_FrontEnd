import Comment from "./Comment";
const ShowComments = ({ comments }: { comments: any }) => {
    return (
        <div className="space-y-3">
            {
                    comments?.length > 0 &&
                    comments?.map((e: any) => (
                        <Comment e={e} key={e._id} isReply={false} />
                    ))
            }
        </div>

    )
}

export default ShowComments