import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useTasks } from "./TasksContext.jsx";
import Swal from "sweetalert2";

export default function TaskForm() {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const { allTasks, getTasks } = useTasks();
  const { id } = useParams(); // Get task id from URL params

  const [task, setTask] = useState({
    task_id: null,
    description: "",
    status: "",
    title: "",
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  useEffect(() => {
    if (id) {
      const existingTask = allTasks.find((task) => task.task_id === parseInt(id));

      if (existingTask) {
        setTask(existingTask);
      } else {
        setLoading(true);
        axiosClient
          .get(`/tasks/${id}`)
          .then(({ data }) => {
            setTask(data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            if (err.response?.status === 401) {
              navigate("/login");
            }
          });
      }
    }
  }, [id, allTasks, navigate]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (task.task_id) {
      if (task.created_by === user.id) {
        axiosClient
          .put(`/tasks/${task.task_id}`, task)
          .then(() => {
            setNotification("Task was successfully updated");
            getTasks();
            navigate("/tasks");
          })
          .catch(handleErrors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not allowed to edit this task!",
        });
      }
    } else {
      axiosClient
        .post("/tasks", task)
        .then(() => {
          setNotification("Task was successfully created");
          getTasks();
          navigate("/tasks");
        })
        .catch(handleErrors);
    }
  };

  const handleErrors = (err) => {
    const response = err.response;
    if (response?.status === 422) {
      setErrors(response.data.errors);
    }
    if (response?.status === 401) {
      navigate("/login");
    }
  };

  return (
    <>
      <h1>{task.task_id ? `Update Task: ${task.title}` : "New Task"}</h1>
      <div className="card animated fadeInDown" style={{ width: "100%", display: "flex", justifyContent: "center", height: "100%" }}>
        {loading ? <div className="text-center">Loading...</div> : (
          <>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <form onSubmit={onSubmit}>
              <input
                value={task.title}
                onChange={(ev) => setTask({ ...task, title: ev.target.value })}
                placeholder="Title"
              />
              <input
                value={task.description}
                onChange={(ev) => setTask({ ...task, description: ev.target.value })}
                placeholder="Description"
              />
              <select
                value={task.status}
                onChange={(ev) => setTask({ ...task, status: ev.target.value })}
              >
                <option value="">Select status</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="btn">Save</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
