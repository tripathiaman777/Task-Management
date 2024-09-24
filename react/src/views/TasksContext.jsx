import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../axios-client.js";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, handleFilter] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setFilterTask(filter === "" ? allTasks : allTasks.filter((task) => task.status === filter));
  }, [filter, allTasks]);

  const getTasks = () => {
    setLoading(true);
    axiosClient
      .get("/tasks")
      .then(({ data }) => {
        setLoading(false);
        setAllTasks(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const contextValue = {
    allTasks,
    filterTask,
    loading,
    handleFilter,
    getTasks,
  };

  return <TasksContext.Provider value={contextValue}>{children}</TasksContext.Provider>;
};

export const useTasks = () => React.useContext(TasksContext);
