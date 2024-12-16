import Login from "./Components/auth/Login";
import Reg from "./Components/auth/Reg";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import People from "./pages/People";
import Post from "./pages/Post";
import FollowReq from "./Components/FollowReq";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Authlayout from "./Layout/Authlayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuth } from "./context/Context";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "post",
          element: (
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "friends",
          element: (
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          ),
        },
        {
          path: "followers",
          element: (
            <ProtectedRoute>
              <FollowReq />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: !isAuthenticated ? <Authlayout /> : <Navigate to="/" />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Reg />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
