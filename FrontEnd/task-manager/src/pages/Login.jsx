import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";

import api from "../services/api";
import { AUTH_ENDPOINTS } from "../api/endpoints";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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
      const user = response.data.token;

      // STORE TOKEN
      localStorage.setItem(
        "token",
        user.token
      );

      // STORE ROLE
      localStorage.setItem(
        "authRole",
        user.role
      );

      // STORE USER NAME
      localStorage.setItem(
        "userName",
        user.name
      );

      // REDIRECT
      navigate("/dashboard");
      

    } catch (err) {

      console.log(err);

      setError(
        "Invalid Email or Password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-body flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-md bg-card rounded-3xl p-4 md:p-4 shadow-card">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-accent text-white p-4 rounded-2xl">
            <User size={40} />
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-5">

          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            User Login
          </h1>

          <p className="text-muted mt-2 text-sm md:text-base">
            Welcome back to Task Manager
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
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"

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
              placeholder="Enter your password"

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

            className="w-full rounded-2xl py-3 font-semibold text-sm md:text-base bg-button text-buttonText hover:bg-buttonHover shadow-sm transition-all duration-300 mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>

        {/* ADMIN LOGIN */}
        <div className="text-center">

          <p className="text-muted text-xs md:text-sm">
            Are you admin?
          </p>

          <Link
            to="/admin-login"
            className="text-accent font-semibold hover:text-primary transition duration-300 text-sm md:text-base"
          >
            Login as Admin
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Login;