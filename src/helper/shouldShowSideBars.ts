export const shouldShowLeftBar = (width: number): boolean => {
    if (width < 1024) { return false }
    return true
}
export const shouldShowRightBar = (width: number): boolean => {
    if (width < 1280) { return false }
    return true
}