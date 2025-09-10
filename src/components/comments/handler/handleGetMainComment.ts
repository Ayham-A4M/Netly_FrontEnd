const handleGetMainComment = (commentId: string, comments: any) => {
    const Maincomment = comments?.filter((e: any) => {return  e._id === commentId });
    console.log(Maincomment);
    return Maincomment[0];
}
export default handleGetMainComment