import AdminLayout from "../layouts/AdminLayout";
import Navbar from "../components/Navbar";
import { useState,useEffect } from "react";
import { theme } from "../theme/colors";
import api from "../services/api";
import { TASK_ENDPOINTS , AUTH_ENDPOINTS} from "../api/endpoints";

const AssignTask = () => {
  const [users, setUsers] = useState([]);

const [form, setForm] = useState({
  title: "",
  description: "",
  priority: "Low",
  dueDate: "",
  assignedToUserId: "",
});
useEffect(() => {
  fetchUsers();
}, []);
const fetchUsers = async () => {
  try {
    const response = await api.get(AUTH_ENDPOINTS.getusers);
    setUsers(response.data);
  }
  catch (error) {
    console.error("Failed to fetch users:", error);
  }
}
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post(TASK_ENDPOINTS.createTask, form);
    console.log("Task created successfully");
    // Clear form after submission
    setForm({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedToUserId: "",
    });
  } catch (error) {
    console.error("Failed to create task:", error);
    alert("Failed to create task");
  }
};
  return (
    <AdminLayout>
      <Navbar title="Assign Task" />

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-4xl shadow-card">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Create New Task</h2>
          <p className="text-muted text-sm md:text-base mt-2">Assign tasks to users and track progress</p>
        </div>

        <div className="bg-input border border-border rounded-2xl p-4 mb-6 text-sm text-primary">
          <p className="font-semibold text-muted">Static UI Only</p>
          <p className="mt-1 text-muted">Task assignment controls are displayed without submission or data updates.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-muted mb-2 text-sm">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={form.title}
              onChange={handleChange}
                name="title"
              className="w-full rounded-xl p-3 md:p-4 border border-border text-primary placeholder:text-muted outline-none bg-input transition duration-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-muted mb-2 text-sm">Assign User</label>
            <select
              value={form.assignedToUserId}
              onChange={handleChange}
              name="assignedToUserId"
              className="w-full rounded-xl p-3 md:p-4 border border-border text-primary outline-none bg-input transition duration-300 text-sm"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-muted mb-2 text-sm">Priority</label>
              <select
                value={form.priority}
                onChange={handleChange}
                name="priority"
                className="w-full rounded-xl p-3 md:p-4 border border-border text-primary outline-none bg-input transition duration-300 text-sm"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block text-muted mb-2 text-sm">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                name="dueDate"
                className="w-full rounded-xl p-3 md:p-4 border border-border text-primary outline-none bg-input transition duration-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted mb-2 text-sm">Task Description</label>
            <textarea
              rows="6"
              placeholder="Enter task description..."
              value={form.description}
              onChange={handleChange}
              name="description"
              className="w-full rounded-xl p-3 md:p-4 border border-border text-primary placeholder:text-muted outline-none bg-input transition duration-300 resize-none text-sm"
            ></textarea>
          </div>

          <div className="bg-input border border-border rounded-2xl p-4 md:p-5">
            <h3 className="text-primary font-bold mb-3 text-sm md:text-base">Task Rules</h3>
            <ul className="text-muted space-y-2 text-xs md:text-sm list-disc list-inside">
              <li>User can update task only one time</li>
              <li>After update task becomes locked</li>
              <li>Admin can track all task statuses</li>
            </ul>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full md:w-auto rounded-2xl bg-button text-buttonText px-6 md:px-8 py-3 font-semibold text-sm md:text-base hover:bg-buttonHover shadow-sm transition-all duration-300"
          >
            Assign Task
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignTask;
