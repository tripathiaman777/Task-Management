import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";
import {TasksProvider} from "./views/TasksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ContextProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </ContextProvider>
  // </React.StrictMode>
);
