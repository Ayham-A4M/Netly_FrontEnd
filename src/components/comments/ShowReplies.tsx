import Comment from "./Comment"

const ShowReplies = ({ commentReplies, mainComment }: { commentReplies: any, mainComment: any }) => {
    return (
        <div className="space-y-3">
            <Comment isReply={true} key={mainComment._id} e={mainComment} />
            {
                (commentReplies?.length > 0) &&
                commentReplies?.map((e: any) => (
                    <div className="px-3">
                        <Comment isReply={true} key={e._id} e={e} />
                    </div>
                ))
            }
        </div>
    )
}

export default ShowReplies