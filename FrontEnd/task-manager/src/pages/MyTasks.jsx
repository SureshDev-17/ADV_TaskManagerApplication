import { useEffect, useState } from "react";

import api from "../api/api";
import { TASK_ENDPOINTS } from "../api/endpoints";

import UserLayout from "../layouts/UserLayout";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";

const MyTasks = () => {

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
        console.log(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

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

      <Navbar title="My Tasks" />

      <div className="mb-6">

        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Assigned Tasks
        </h2>

        <p className="text-muted text-sm md:text-base mt-2">
          Update your tasks only one time
        </p>

      </div>

      {loading ? (

        <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted">
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

      <div className="bg-card border border-border rounded-2xl p-6 mt-8">

        <h3 className="text-primary text-xl font-bold mb-4">
          Task Rules
        </h3>

        <ul className="space-y-3 text-muted list-disc list-inside">

          <li>
            User can update task only one time
          </li>

          <li>
            After updating, task becomes locked
          </li>

          <li>
            Admin can monitor all task statuses
          </li>

        </ul>

      </div>

    </UserLayout>
  );
};

export default MyTasks;