import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

// AUTH PAGES
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

// USER PAGES
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Performance from "./pages/Performance";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import AssignTask from "./pages/AssignTask";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["User"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute
              allowedRoles={["User"]}
            >
              <MyTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/performance"
          element={
            <ProtectedRoute
              allowedRoles={[
                "User",
                "Admin",
              ]}
            >
              <Performance />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-task"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <AssignTask />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;