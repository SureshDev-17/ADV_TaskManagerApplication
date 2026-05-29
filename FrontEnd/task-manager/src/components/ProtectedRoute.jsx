import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {

  // GET TOKEN
  const token =
    localStorage.getItem("token");

  // GET ROLE
  const role =
    localStorage.getItem("authRole");

  // NOT LOGGED IN
  if (!token) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ROLE CHECK
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {

    return (
      <Navigate
        to={
          role === "Admin"
            ? "/admin-dashboard"
            : "/dashboard"
        }
        replace
      />
    );
  }

  // ACCESS GRANTED
  return children;
};

export default ProtectedRoute;