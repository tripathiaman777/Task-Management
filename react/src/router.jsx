import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Tasks from "./views/Tasks";
import TaskForm from "./views/TaskForm.jsx";
import TaskView from "./views/TaskView.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      // {
      //   path: '/users/new',
      //   element: <UserForm key="userCreate" />
      // },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "/tasks/new",
        element: <TaskForm key="taskCreate" />,
      },
      {
        path: "/tasks/view/:id",
        element: <TaskView key="taskView" />,
      },
      {
        path: "/tasks/:id",
        element: <TaskForm key="taskUpdate" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
