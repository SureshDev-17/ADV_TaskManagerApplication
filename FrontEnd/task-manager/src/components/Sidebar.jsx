import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Users,
  PlusCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {

  const location = useLocation();

  const navigate = useNavigate();

  // GET ROLE FROM LOCAL STORAGE
  const role =
    localStorage.getItem("authRole");

  // USER MENUS
  const userMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "My Tasks",
      path: "/my-tasks",
      icon: <ClipboardList size={20} />,
    },

    {
      name: "Performance",
      path: "/performance",
      icon: <BarChart3 size={20} />,
    },
  ];

  // ADMIN MENUS
  const adminMenus = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Users",
      path: "/users",
      icon: <Users size={20} />,
    },

    {
      name: "Assign Task",
      path: "/assign-task",
      icon: <PlusCircle size={20} />,
    },

    {
      name: "Performance",
      path: "/performance",
      icon: <BarChart3 size={20} />,
    },
  ];

  // SELECT MENUS
  const menus =
    role === "Admin"
      ? adminMenus
      : userMenus;

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("authRole");

    localStorage.removeItem("userName");

    navigate("/");
  };

  return (

    <div className="w-64 h-screen bg-sidebar border-r border-sidebarBorder/70 text-sidebarText flex flex-col justify-between fixed left-0 top-0 z-40 shadow-card hidden md:flex">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="p-6 border-b border-sidebarBorder/70">

          <h1 className="text-3xl font-bold tracking-wider text-sidebarText">
            TaskFlow
          </h1>

          <p className="text-sidebarText text-sm mt-2">
            Task Management System
          </p>

        </div>

        {/* MENUS */}
        <div className="p-4 space-y-3">

          {
            menus.map((menu) => (

              <Link
                key={menu.name}

                to={menu.path}

                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === menu.path
                    ? "bg-sidebarActive text-sidebarText font-semibold shadow-lg"
                    : "text-sidebarText/80 hover:bg-sidebarHover hover:text-sidebarText"
                }`}
              >

                {menu.icon}

                <span className="text-sm md:text-base">
                  {menu.name}
                </span>

              </Link>
            ))
          }

        </div>
      </div>

      {/* LOGOUT */}
      <div className="p-4">

        <button
          onClick={handleLogout}

          className="w-full flex items-center justify-center gap-3 bg-button text-buttonText py-3 rounded-2xl font-semibold shadow-sm hover:bg-buttonHover transition duration-300"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>
    </div>
  );
};

export default Sidebar;