import AuthNav from "./Components/auth/AuthNav"
import Login from "./Components/auth/Login"
import Reg from "./Components/auth/Reg"
import Friends from "./pages/Friends"
import Home from "./pages/Home"
import People from "./pages/People"
import Post from "./pages/Post"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react"
import RootLayout from "./Layout/RootLayout"
import Authlayout from "./Layout/Authlayout"

function App() {

  const[isAuthenticated, setIsAuthenticate] = useState(true)

  const router = createBrowserRouter([
    {
      path : "/",
      element: <RootLayout/>,
      children: [
        {
          path : "",
        element: <Home/>
        },
        {
          path : "post",
          element: <Post/>
        },
        {
          path : "people",
          element: <People/>
        },
        {
          path : "friends",
          element: <Friends/>
        }
      ]
    },
    {
      path : "auth",
      element: <Authlayout />,
      children:[
        {
          path: "",
          element: <Login/>
        },
        {
          path: "register",
          element: <Reg/>
        }
      ]
    }
  ])

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
