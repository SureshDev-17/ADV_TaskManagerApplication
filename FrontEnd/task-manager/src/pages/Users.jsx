import { useState,useEffect } from "react";
import { UserPlus } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import Navbar from "../components/Navbar";
import { theme } from "../theme/colors";
import api from "../api/api";
import { AUTH_ENDPOINTS } from "../api/endpoints";

const Users = () => {
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    department:"",
  });
  const [loading,setLoading]= useState(false);
  const [editingUser,setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {

  try {

    const response =
      await api.get(
        AUTH_ENDPOINTS.getusers
      );

    setUsers(response.data);

  } catch (error) {

    console.log(error);

  }
};
 const handleEdit = (user) => {
    setForm({
      ...form,
      name: user.name,
      email: user.email,
      password: "",
      department: user.department
    });
    setEditingUser(user);
   
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        AUTH_ENDPOINTS.register,form)

     console.log("user created")

      // clear form
      setForm({
        name: "",
        email: "",
        password: "",
        department: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Navbar title="Users Management" />

      <div className={`${theme.card} rounded-3xl p-6 md:p-8 mb-8 shadow-card`}>
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="text-accent flex-shrink-0" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Create New User</h2>
        </div>

        <div className="bg-input border border-border rounded-2xl p-4 mb-4 text-sm text-primary">
          <p className="font-semibold text-muted">Static UI Only</p>
          <p className="mt-1 text-muted">User creation form is displayed without backend interaction.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl p-3 md:p-4 outline-none bg-input border border-border text-primary placeholder:text-muted transition duration-300 text-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
           value={form.email}
           onChange={handleChange}
            className="w-full rounded-xl p-3 md:p-4 outline-none bg-input border border-border text-primary placeholder:text-muted transition duration-300 text-sm"
          />
            <input
            type="password"
            name="password"
            placeholder="Pasword"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl p-3 md:p-4 outline-none bg-input border border-border text-primary placeholder:text-muted transition duration-300 text-sm"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full rounded-xl p-3 md:p-4 outline-none bg-input border border-border text-primary placeholder:text-muted transition duration-300 text-sm"
          />

          <button
  type="submit"
  disabled={loading}
  className="w-full rounded-2xl font-semibold text-sm bg-button text-buttonText hover:bg-buttonHover shadow-sm transition-all duration-300 px-5 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading
    ? editingUser
      ? "Updating..."
      : "Creating..."
    : editingUser
      ? "Update User"
      : "Add User"}
</button>
        </form>
      </div>

      <div className={`${theme.card} rounded-3xl overflow-hidden shadow-card`}>
        <div className="p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-bold text-primary">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-primary text-sm">
            <thead className="bg-surface border-b border-border sticky top-0">
              <tr>
                <th className="p-3 md:p-4 text-left text-xs md:text-sm font-semibold">Name</th>
                <th className="p-3 md:p-4 text-left text-xs md:text-sm font-semibold">Email</th>
                <th className="p-3 md:p-4 text-left text-xs md:text-sm font-semibold">Department</th>
                <th className="p-3 md:p-4 text-left text-xs md:text-sm font-semibold">Role</th>
                <th className="p-3 md:p-4 text-left text-xs md:text-sm font-semibold">Action</th>
              </tr>
            </thead>

           <tbody>

  {users.length > 0 ? (

    users.map((user) => (

      <tr
        key={user.id}
        className="border-b border-border hover:bg-input transition-colors duration-300"
      >

        <td className="p-3 md:p-4 text-xs md:text-sm">
          {user.name}
        </td>

        <td className="p-3 md:p-4 text-xs md:text-sm">
          {user.email}
        </td>

        <td className="p-3 md:p-4 text-xs md:text-sm">
          {user.department}
        </td>

        <td className="p-3 md:p-4 text-xs md:text-sm">
          {user.role}
        </td>

        <td className="p-3 md:p-4">
          <button onClick={() => handleEdit(user)}
            className="px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs"
          >
            Edit
          </button>
          <button
            className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs"
          >
            Delete
          </button>

        </td>

      </tr>

    ))

  ) : (

    <tr className="border-b border-border hover:bg-input transition-colors duration-300">

      <td
        className="p-3 md:p-4 text-muted text-xs md:text-sm"
        colSpan="5"
      >
        No users available
      </td>

    </tr>

  )}

</tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;
