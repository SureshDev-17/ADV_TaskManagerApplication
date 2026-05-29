import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-body min-h-screen">
      <Sidebar />
      <div className="w-full md:ml-64 p-4 md:p-6 transition-all duration-300">{children}</div>
    </div>
  );
};

export default AdminLayout;
