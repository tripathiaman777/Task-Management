import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "./TasksContext";
import { useStateContext } from "../context/ContextProvider";
import Swal from "sweetalert2";
import axiosClient from "../axios-client.js"; // Ensure axiosClient is imported

export default function Tasks() {
  const navigate = useNavigate();
  const { allTasks, filter, filterTask, loading, handleFilter, getTasks } =
    useTasks();
  const { user } = useStateContext();

  const onDeleteClick = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/tasks/${task.task_id}`)
          .then(() => {
            getTasks();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            if (error.response.status === 401) {
              navigate("/login");
            }
          });
      }
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Tasks</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <select value={filter} onChange={(e) => handleFilter(e.target.value)}>
            <option value="">Select status</option>
            {[
              { value: "pending", label: "Pending" },
              { value: "in_progress", label: "In Progress" },
              { value: "completed", label: "Completed" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Link style={{ width: "120px" }} className="btn-add" to="/tasks/new">
            Add new
          </Link>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Create Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {loading && (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {filterTask.map((u) => (
                <tr key={u.id}>
                  <td>{u.task_id}</td>
                  <td>{u.title}</td>
                  <td>{u.created_by_name}</td>
                  <td>{u.created_at}</td>
                  <td>{u.status}</td>
                  <td>
                    <Link className="btn-view" to={"/tasks/view/" + u.task_id}>
                      View
                    </Link>&nbsp;
                    {user.id === u.created_by && (
                      <>
                        <Link className="btn-edit" to={"/tasks/" + u.task_id}>
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          className="btn-delete"
                          onClick={() => onDeleteClick(u)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
