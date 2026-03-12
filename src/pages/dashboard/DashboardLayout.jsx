import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd, HiOutlineCollection, HiOutlineClipboardList, HiOutlineLogout, HiOutlineBell } from "react-icons/hi";
import { MdOutlineManageHistory, MdOutlineDashboard } from "react-icons/md";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="flex bg-gray-50 min-h-screen overflow-hidden font-primary">
      <aside className="hidden sm:flex sm:flex-col w-20 md:w-64 bg-gray-900 transition-all duration-300">
        <div className="flex items-center justify-center h-20 bg-purple-700">
           <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-2">
              <img src="/fav-icon.png" alt="" className="w-10 h-10" />
              <span className="hidden md:inline">BookStore</span>
           </Link>
        </div>
        <div className="flex-grow flex flex-col justify-between text-gray-400">
          <nav className="flex flex-col p-4 space-y-2">
            <SidebarLink to="/dashboard" icon={<MdOutlineDashboard size={24} />} label="Dashboard" active />
            <SidebarLink to="/dashboard/add-new-book" icon={<HiViewGridAdd size={24} />} label="Add Book" />
            <SidebarLink to="/dashboard/manage-books" icon={<MdOutlineManageHistory size={24} />} label="Manage Books" />
            <SidebarLink to="/dashboard/order-books" icon={<HiOutlineClipboardList size={24} />} label="Orders" />
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <HiOutlineLogout size={24} />
              <span className="ml-3 hidden md:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button className="block sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-4">
              <MdOutlineDashboard size={24} />
            </button>
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search analytics..."
                className="py-2 pl-10 pr-4 bg-gray-100 border-none focus:ring-2 focus:ring-purple-500 rounded-lg w-64 text-sm"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <HiOutlineBell size={24} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Store Manager</p>
              </div>
              <img
                src="https://randomuser.me/api/portraits/men/8.jpg"
                alt="profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-purple-500"
              />
            </div>
          </div>
        </header>

        <main className="flex-grow p-6 md:p-10 overflow-y-auto bg-gray-50">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Detailed real-time statistics for your bookstore.</p>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

const SidebarLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
      active 
        ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`}
  >
    {icon}
    <span className="ml-3 hidden md:inline font-medium">{label}</span>
  </Link>
);

export default DashboardLayout;
