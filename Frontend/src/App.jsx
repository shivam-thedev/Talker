import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from 'lucide-react';
import { Homepage, LoginPage, ProfilePage, SettingsPage, SignUpPage } from "./pages";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";


export const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-14 animate-spin"/>
      </div>
    )
  }
  
  console.log({authUser})
  return (
    <div data-theme={theme}> 
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <Homepage/> : <Navigate to = "/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to = "/login"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

