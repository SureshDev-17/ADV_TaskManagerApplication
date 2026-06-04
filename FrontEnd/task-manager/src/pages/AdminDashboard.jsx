import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import Navbar from "../components/Navbar";

import DashboardCard from "../components/DashboardCard";

import TaskTable from "../components/TaskTable";

import {
  ClipboardList,
  CheckCircle,
  Clock3,
  Lock,
} from "lucide-react";

// API
import api from "../services/api";

import {
  TASK_ENDPOINTS,
} from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  

const navigate = useNavigate();

  // STATES
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const response =
        await api.get(
          TASK_ENDPOINTS.getAllTasks
        );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchTasks();

  }, []);


  const handleEdit =(task)=>{
    navigate('/assign-task', {state: {task}});
  }


  const handleDelete = async (taskId) => {
  try {
    await api.delete(
      TASK_ENDPOINTS.deleteTask(taskId)
    );
    // console.log(taskId);
    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );

    alert("Task deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
};

  // STATS
  const total =
    tasks.length;

  const completed =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pending =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  const locked =
    tasks.filter(
      (task) =>
        task.updated
    ).length;

  return (

    <AdminLayout>

      {/* NAVBAR */}
      <Navbar title="Admin Dashboard" />

      {/* LOADING */}
      {
        loading ? (

          <div className="text-center text-primary py-10 text-lg font-semibold">

            Loading Dashboard...

          </div>

        ) : (

          <>
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

            {/* TASK TABLE */}
            <div>

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold text-primary">
                  All Users Tasks
                </h2>

                <button className="rounded-xl bg-button text-buttonText px-5 py-2 font-semibold hover:bg-buttonHover transition duration-300">

                  Export Report

                </button>

              </div>

              <TaskTable
                  tasks={tasks}
                  adminView={true}
                  onUpdateTask={handleEdit}
                  onDeleteTask={handleDelete}
                  
/>


            </div>
          </>
        )
      }

    </AdminLayout>
  );
};

export default AdminDashboard;