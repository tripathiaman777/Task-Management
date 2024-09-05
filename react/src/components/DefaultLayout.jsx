import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  const navLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#a09291cc" : "transparent", // or any other style you want
    color: isActive ? "white" : "black", // optional: change text color if needed
    padding: "10px", // optional: add some padding
    textDecoration: "none", // optional: remove underline
  });
  return (
    <div id="defaultLayout" style={{ minWidth: "100vw" }}>
      <aside>
        {/* <Link to="/dashboard">Dashboard</Link> */}
        <NavLink style={navLinkStyle} to="/users">
          Users
        </NavLink>
        <NavLink style={navLinkStyle} to="/tasks">
          Tasks
        </NavLink>
      </aside>
      <div className="content">
        <header>
          <div>Task Mangement System</div>

          <div>
            <Link className=" btn-edit" to={"/users/" + user.id}>
              Edit
            </Link>
            &nbsp; &nbsp;{user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}
