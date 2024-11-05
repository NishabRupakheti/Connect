import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import Post from "./Components/Post.jsx";
import Friends from "./Components/Friends.jsx";
import People from "./Components/People.jsx";


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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={pageroutes} />
  </StrictMode>
);
