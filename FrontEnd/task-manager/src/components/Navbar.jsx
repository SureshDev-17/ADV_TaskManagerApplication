import { Bell, Search } from "lucide-react";

const Navbar = ({ title }) => {

  // GET DATA FROM LOCAL STORAGE
  const userName =
    localStorage.getItem("userName");
    

  const role =
    localStorage.getItem("authRole");

  return (

    <div className="bg-navbar border border-sidebarBorder/70 rounded-3xl px-4 md:px-6 py-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-card">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl md:text-3xl font-bold text-navbarText">
          {title}
        </h1>

        <p className="text-navbarText/70 text-xs md:text-sm mt-1">

          Welcome back, {

            role === "Admin"
              ? "Admin"
              : userName || "User"
          }

        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 w-full md:w-auto">

        {/* SEARCH */}
        <div className="hidden lg:flex items-center bg-surface border border-border/70 rounded-2xl px-3 py-2 flex-1 md:flex-none shadow-sm">

          <Search
            size={18}
            className="text-navbarText/50 flex-shrink-0"
          />

          <input
            type="text"

            placeholder="Search..."

            className="bg-transparent outline-none text-navbarText/90 ml-2 text-sm placeholder:text-navbarText/60"
          />

        </div>

        {/* NOTIFICATION */}
        <button className="bg-surface border border-border/70 p-3 rounded-2xl hover:bg-input transition-all duration-300 flex-shrink-0 shadow-sm">

          <Bell
            size={20}
            className="text-primary"
          />

        </button>

        {/* USER CARD */}
        <div className="flex items-center gap-3 bg-surface border border-border/70 px-3 py-2 rounded-2xl flex-shrink-0 shadow-sm">

          {/* AVATAR */}
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">

            {
              role === "Admin"
                ? "A"
                : userName?.charAt(0).toUpperCase() || "U"
            }

          </div>

          {/* USER INFO */}
          <div className="hidden md:block">

            <h3 className="text-navbarText font-semibold text-sm">

              {
                role === "Admin"
                  ? "Admin"
                  : userName || "User"
              }

            </h3>

            <p className="text-navbarText/70 text-xs">

              {
                role === "Admin"
                  ? "Administrator"
                  : "Employee"
              }

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;