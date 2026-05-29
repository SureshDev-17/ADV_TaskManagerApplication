import Sidebar from "../components/Sidebar";

const UserLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-body">
      <Sidebar />
      <main className="w-full md:ml-64 flex-1 p-4 md:p-6 overflow-x-hidden transition-all duration-300">{children}</main>
    </div>
  );
};

export default UserLayout;
