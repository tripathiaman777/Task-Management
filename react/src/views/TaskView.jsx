import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "./TasksContext";
import "../TaskView.css"; // Import a CSS file for styles

function TaskView() {
  console.log("Hello there");
  const { allTasks } = useTasks();
  const { id } = useParams();
  const [thisTask, setThisTask] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTask = () => {
      const task = allTasks.filter((el) => el.task_id == id);
      if (task) {
        setThisTask(task);
      } else {
        navigate("/tasks");
      }
    };
    getTask();
  }, [id, allTasks, navigate]);

  return (
    <div className="task-view-container">
      {thisTask.length > 0 ? (
        thisTask.map((el) => (
          <div className="task-view-card" key={el.task_id}>
            <h1 className="task-view-title">Title: {el.title}</h1>
            <p className="task-view-description">
              Description: {el.description}
            </p>
            <p className="task-view-status">Status: {el.status}</p>
          </div>
        ))
      ) : (
        <div className="task-view-loading">Loading...</div>
      )}
    </div>
  );
}

export default TaskView;
