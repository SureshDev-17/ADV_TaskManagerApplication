import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X, LayoutDashboard, ClipboardList, BarChart3, Users, PlusCircle } from "lucide-react";

const Navbar = ({ title }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // GET DATA FROM LOCAL STORAGE
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("authRole");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const menus = role === "Admin" ? [
    { name: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Assign Task", path: "/assign-task", icon: <PlusCircle size={20} /> },
    { name: "Performance", path: "/performance", icon: <BarChart3 size={20} /> },
  ] : [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Tasks", path: "/my-tasks", icon: <ClipboardList size={20} /> },
    { name: "Performance", path: "/performance", icon: <BarChart3 size={20} /> },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="bg-navbar border border-sidebarBorder/70 rounded-3xl px-4 md:px-6 py-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-card">
        <div className="flex items-center justify-between w-full gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navbarText">{title}</h1>
            <p className="text-navbarText/70 text-xs md:text-sm mt-1">
              Welcome back, {role === "Admin" ? "Admin" : userName || "User"}
            </p>
          </div>
          <button
            type="button"
            className="md:hidden bg-surface border border-border/70 p-3 rounded-2xl hover:bg-input transition-all duration-300 shadow-sm"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="hidden lg:flex items-center bg-surface border border-border/70 rounded-2xl px-3 py-2 flex-1 md:flex-none shadow-sm">
            <Search size={18} className="text-navbarText/50 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-navbarText/90 ml-2 text-sm placeholder:text-navbarText/60"
            />
          </div>

          <button className="bg-surface border border-border/70 p-3 rounded-2xl hover:bg-input transition-all duration-300 flex-shrink-0 shadow-sm">
            <Bell size={20} className="text-primary" />
          </button>
                    <div className="block md:hidden">
                      <h3 className="text-navbarText font-semibold text-sm">
                        {role === "Admin" ? "Admin" : userName || "User"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 bg-surface border border-border/70 px-3 py-2 rounded-2xl flex-shrink-0 shadow-sm">
                          <div className="hidden md:block">
                            <h3 className="text-navbarText font-semibold text-sm">
                              {role === "Admin" ? "Admin" : userName || "User"}
                            </h3>
                            <p className="text-navbarText/70 text-xs">
                              {role === "Admin" ? "Administrator" : "Employee"}
                            </p>
                          </div>
                    </div>
                    //above code is for mobile view user info, below code is for desktop view user info, both are kept to ensure user info is visible in all screen sizes without needing to open the menu on mobile
          {/* <div className="flex items-center gap-3 bg-surface border border-border/70 px-3 py-2 rounded-2xl flex-shrink-0 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
              {role === "Admin" ? "A" : userName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden md:block">
              <h3 className="text-navbarText font-semibold text-sm">{role === "Admin" ? "Admin" : userName || "User"}</h3>
              <p className="text-navbarText/70 text-xs">{role === "Admin" ? "Administrator" : "Employee"}</p>
            </div>
          </div> */}
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebarBorder/70 text-sidebarText shadow-card p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-lg font-bold">Navigation</p>
                <p className="text-sm text-sidebarText/70">Quick access</p>
              </div>
              <button type="button" onClick={closeMenu} className="bg-surface border border-border/70 p-2 rounded-2xl">
                <X size={18} className="text-primary" />
              </button>
            </div>
            <nav className="space-y-2">
              {menus.map((menu) => (
                <Link
                  key={menu.name}
                  to={menu.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${location.pathname === menu.path ? "bg-sidebarActive text-sidebarText font-semibold" : "text-sidebarText/80 hover:bg-sidebarHover hover:text-sidebarText"}`}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-3 mt-8 bg-button text-buttonText py-3 rounded-2xl font-semibold shadow-sm hover:bg-buttonHover transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;