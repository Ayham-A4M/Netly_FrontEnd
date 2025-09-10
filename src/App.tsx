import './App.css'
import { Route, Routes } from "react-router-dom"
import { createContext } from 'react'
import ProtectedRoutes from './components/auth/protectedRoutes'
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
// Pages
import Index from './pages/home/index' // for posts ....
import MyProfile from './pages/profile/MyProfile';
import useGetUser from './hooks/useGetUser'
import Login_Signup from './pages/auth/Login_Signup'
import UserProfile from './pages/profile/UserProfile';
import Notification from './pages/notification/Notification';
import { ThemeProvider } from '@/components/theme-provider';
import ResetPassword from './pages/auth/ResetPassword/ResetPassword';
import PostPage from './pages/PostPage/PostPage';
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
            style: { borderRadius: '6px', backgroundColor: '#6c6fec', color: 'oklch(0.9232 0.0026 48.7171)' }
          }}
        />

        <Routes>
          <Route element={<MainLayout />}>
            {/* <Route element={<ProtectedRoutes />}> */}
            <Route path='/' element={<Index />} />
            <Route path='/myprofile' element={<MyProfile />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/post/:postId' element={<PostPage/>} />
            {/* </Route> */}
          </Route>
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/login_signup' element={<Login_Signup />} />
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
