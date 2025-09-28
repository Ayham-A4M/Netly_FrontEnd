import './App.css'
import { Route, Routes } from "react-router-dom"
import React, { createContext, Suspense } from 'react'
import ProtectedRoutes from './components/auth/protectedRoutes'
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from '@/components/theme-provider';
import useGetUser from './hooks/useGetUser'
import SpinnerLoading from './components/ui/spinner-loading';
// Pages
import Index from './pages/home/index'
const MyProfile = React.lazy(() => import('./pages/profile/MyProfile'))
const Login_Signup = React.lazy(() => import('./pages/auth/Login_Signup'))
const UserProfile = React.lazy(() => import('./pages/profile/UserProfile'))
const Notification = React.lazy(() => import('./pages/notification/Notification'))
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword/ResetPassword'))
const PostPage = React.lazy(() => import('./pages/PostPage/PostPage'))

const Connection = React.lazy(() => import('./pages/connection/Connection'))
const EventsPage = React.lazy(() => import('./pages/events/Events'))
const Activity = React.lazy(() => import('./pages/activity/Activity'))
const A_commentReactions = React.lazy(() => import('./pages/activity/A_commentReactions'))
const A_postReactions = React.lazy(() => import('./pages/activity/A_postReactions'))
const A_comments = React.lazy(() => import('./pages/activity/A_comments'))

// import MyProfile from './pages/profile/MyProfile';
// import Login_Signup from './pages/auth/Login_Signup'
// import UserProfile from './pages/profile/UserProfile';
// import Notification from './pages/notification/Notification';
// import ResetPassword from './pages/auth/ResetPassword/ResetPassword';
// import PostPage from './pages/PostPage/PostPage';
// import Connection from './pages/connection/Connection';
// import EventsPage from './pages/events/Events';
// import Activity from './pages/activity/Activity';
// import A_commentReactions from './pages/activity/A_commentReactions';
// import A_postReactions from './pages/activity/A_postReactions';
// import A_comments from './pages/activity/A_comments';

import LoadingPage from './components/ui/loading_page';
// Pages
interface userContext {
  isUser: boolean,
  setUser: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  numberOfNotification: number | null;
  setNumberOfNotification: React.Dispatch<React.SetStateAction<number | null>>
}
export const UserContext = createContext<userContext | null>(null);

function App() {
  const { isUser, setUser, loading, numberOfNotification, setNumberOfNotification } = useGetUser();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserContext.Provider value={{ isUser, setUser, loading, numberOfNotification, setNumberOfNotification }} >
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: { borderRadius: '6px', color: '#444444',zIndex:"999" }
          
          }}
        />
        <Suspense fallback={<SpinnerLoading />}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<MainLayout />}>
                <Route path='/' element={<Index />} />
                <Route path='/myprofile' element={<MyProfile />} />
                <Route path='/userprofile' element={<UserProfile />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/post/:postId' element={<PostPage />} />
                <Route path='/myconnection' element={<Connection />} />
                <Route path='/events' element={<EventsPage />} />
                <Route path='/activity' element={<Activity />} >
                  <Route path='comments' element={<A_comments />} />
                  <Route path='postReactions' element={<A_postReactions />} />
                  <Route path='commentReactions' element={<A_commentReactions />} />
                </Route>
              </Route>
            </Route>
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path='/login_signup' element={<Login_Signup />} />
            <Route path="/loading" element={<LoadingPage />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
