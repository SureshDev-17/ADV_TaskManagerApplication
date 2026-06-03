import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import TaskTable from "../components/TaskTable";

import api from "../services/api";
import { TASK_ENDPOINTS } from "../api/endpoints";

import {
  ClipboardList,
  CheckCircle,
  Clock3,
  Lock,
} from "lucide-react";

const Dashboard = () => {

  const userName =
    localStorage.getItem("userName");

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            TASK_ENDPOINTS.getMyTasks
          );

        setTasks(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const total = tasks.length;

  const completed =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pending =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  const locked =
    tasks.filter(
      (task) =>
        task.isUpdated
    ).length;

  const updateTaskStatus =
    async (taskId) => {

      try {

        const task =
          tasks.find(
            (t) => t.id === taskId
          );

        if (!task) return;

        const updatedTask = {
          title: task.title,
          description:
            task.description,
          priority:
            task.priority,
          status: "Completed",
          dueDate:
            task.dueDate,
        };

        await api.put(
          TASK_ENDPOINTS.updateTask(taskId),
          updatedTask
        );

        alert(
          "Task Updated Successfully"
        );

        fetchMyTasks();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Update Task"
        );

      }
    };

  return (
    <UserLayout>

      <Navbar title="Dashboard" />

      <div className="mb-6">

        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Welcome, {userName}
        </h1>

        <p className="text-muted mt-2">
          Manage your assigned tasks
        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">

        <DashboardCard
          title="Total Tasks"
          value={total}
          icon={
            <ClipboardList
              className="text-accent"
              size={24}
            />
          }
        />

        <DashboardCard
          title="Completed"
          value={completed}
          icon={
            <CheckCircle
              className="text-accent"
              size={24}
            />
          }
        />

        <DashboardCard
          title="Pending"
          value={pending}
          icon={
            <Clock3
              className="text-accent"
              size={24}
            />
          }
        />

        <DashboardCard
          title="Locked Tasks"
          value={locked}
          icon={
            <Lock
              className="text-accent"
              size={24}
            />
          }
        />

      </div>

      {/* TABLE */}
      {loading ? (

        <div className="text-center py-10 text-muted">
          Loading Tasks...
        </div>

      ) : (

        <TaskTable
          tasks={tasks}
          userView={true}
          onUpdateTask={
            updateTaskStatus
          }
        />

      )}

    </UserLayout>
  );
};

export default Dashboard;