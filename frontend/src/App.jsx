import Login from "./Components/auth/Login"
import Reg from "./Components/auth/Reg"
import Friends from "./Components/Friends"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import People from "./Components/People"
import Post from "./Components/Post"
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const pageroutes = createBrowserRouter([
  {
    path:"/",
    element: <> <Navbar/> <Home/> </>
  },
  {
    path:"/post",
    element: <> <Navbar/> <Post/> </>
  },
  {
    path: "/friends",
    element: <> <Navbar/> <Friends/> </>
  },
  {
    path: "/people",
    element: <> <Navbar/> <People/> </>
  }
])

const authenticationRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Reg/>
  }
])

function App() {
  return(
    <>
      <RouterProvider router={pageroutes} />
      <RouterProvider router={authenticationRoutes} />
    </>
  )
}

export default App
