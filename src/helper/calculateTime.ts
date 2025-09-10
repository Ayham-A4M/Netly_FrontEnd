
const showTime = (diffSs: number) => {
    if (diffSs < 59) {
        return `now!`
    }
    const diffHs = Math.floor(diffSs / (60 * 60))
    if (diffHs == 0) {
        return `${Math.floor(diffSs / 60)} miniutes ago`
    } else if (diffHs > 0 && diffHs < 24) {
        return `${diffHs} hours ago`
    } else if (Math.floor(diffHs / 24) < 7) {
        return `${Math.floor(diffHs / 24)} days ago`
    } else {
        return `${Math.floor(diffHs / (24 * 7))} weeks ago`
    }
}
const calculateTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime()
    // const diffHs=Math.floor(diffMs / (1000 * 60 * 60));
    const diffSs = Math.floor(diffMs / (1000)); //in seconds
    return showTime(diffSs);
}

export default calculateTime