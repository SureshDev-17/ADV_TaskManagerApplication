import { ShieldCheck } from "lucide-react";

import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../services/api";

import {
  AUTH_ENDPOINTS
} from "../api/endpoints";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.post(
        AUTH_ENDPOINTS.login,
        {
          email,
          password,
        }
      );

      // Store JWT Token
      localStorage.setItem(
        "token",
        response.data.token.token
      );
      localStorage.setItem(
        "userName",
          email
);

      localStorage.setItem(
        "authRole",
        "Admin"
      );

      // Redirect Admin Dashboard
      navigate("/admin-dashboard");

    } catch (err) {

      console.log(err);

      setError(
        "Invalid Admin Credentials"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-body flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-md bg-card rounded-3xl p-6 md:p-8 shadow-card">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-accent text-white p-4 rounded-2xl">
            <ShieldCheck size={40} />
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Admin Login
          </h1>

          <p className="text-muted mt-2 text-sm md:text-base">
            Access Admin Dashboard
          </p>

        </div>

        {/* ERROR */}
        {
          error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )
        }

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >

          {/* EMAIL */}
          <div className="mb-5">

            <label className="block text-muted mb-2 text-sm">
              Admin Email
            </label>

            <input
              type="email"

              placeholder="Enter admin email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }

              className="w-full rounded-xl p-3 md:p-4 border border-border text-primary placeholder:text-muted outline-none bg-input transition duration-300 text-sm"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="block text-muted mb-2 text-sm">
              Password
            </label>

            <input
              type="password"

              placeholder="Enter password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }

              className="w-full rounded-xl p-3 md:p-4 border border-border text-primary placeholder:text-muted outline-none bg-input transition duration-300 text-sm"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"

            disabled={loading}

            className="w-full rounded-2xl py-3 font-semibold text-sm md:text-base bg-button text-buttonText hover:bg-buttonHover shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>

        {/* USER LOGIN */}
        <div className="text-center mt-4">

          <p className="text-muted text-xs md:text-sm">
            Are you a user?
          </p>

          <Link
            to="/"

            className="text-accent font-semibold hover:text-primary transition duration-300 text-sm md:text-base"
          >
            Login as User
          </Link>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;