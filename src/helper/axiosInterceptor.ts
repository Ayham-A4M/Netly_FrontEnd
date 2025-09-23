import axios from "axios";
const url: string = import.meta.env.VITE_BACK_END_URL;
// Create axios instance
const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
});
let isRefreshing: boolean = false;
let failedRequests: any[] = [];
axiosInstance.interceptors.response.use(
    response => response, // if response ok return the response 
    async error => {      // if the response is not ok mean has error do this methode
        const originalRequest = error.config; // get original request that causes this error

        // check if error is 401 and not a refresh request
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue the request
                return new Promise((resolve, reject) => {
                    failedRequests.push({ resolve, reject });
                }).then(() => {
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true; // make it true 
            isRefreshing = true; // make the flag to refresh true

            try {
                // Call your refresh token endpoint
                const refreshResponse = await axiosInstance.post(`/api/auth/refreshtoken`);

                // Retry queued requests
                failedRequests.forEach(pending => pending.resolve());
                failedRequests = [];

                // Retry original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh Token failed thats mean in refresh request user didn`t has refresh token or refresh token expired then  redirect user to login
                if (window.location.pathname !== '/login_signup') {
                    window.location.href = '/login_signup';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
export default axiosInstance
