import {createBrowserRouter} from "react-router-dom"
import {App} from "../App"
import { Homepage, LoginPage, ProfilePage, SettingsPage, SignUpPage } from "../pages"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Homepage/>
            },
            {
                path:"/login",
                element:<LoginPage/>
            },
            {
                path:"/signup",
                element:<SignUpPage/>
            },
            {
                path:"/profile",
                element:<ProfilePage/>
            },
            {
                path:"/setting",
                element:<SettingsPage/>
            },
            {
                path:"/login",
                element:<LoginPage/>
            },
        ]
    }
])