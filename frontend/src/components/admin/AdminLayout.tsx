import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FiSettings,
  FiCloud,
  FiDatabase,
  FiMonitor,
  FiBarChart2,
  FiFileText, // <-- add this import
} from "react-icons/fi";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="h-screen bg-gray-50 -m-4 ">
      {/* Admin Header */}
      <header className="w-full border-b border-gray-200 bg-white px-4 py-4">
        <h1 className="text-lg font-semibold mb-2">Admin Panel</h1>
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === "dashboard"
                ? "bg-white shadow border border-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === "settings"
                ? "bg-white shadow border border-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Settings
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100%-64px)]">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <nav className="p-4 space-y-2">
            {/* New "Report" menu bullet */}
            <NavLink
              to="/admin/report"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              <FiFileText className="mr-3" />
              Report
            </NavLink>

            <NavLink
              to="/admin/analysis"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              <FiBarChart2 className="mr-3" />
              Analysis
            </NavLink>
            <NavLink
              to="/admin/language-models"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              <FiSettings className="mr-3" />
              Language Models
            </NavLink>
            <NavLink
              to="/admin/interface"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              <FiMonitor className="mr-3" />
              Interface
            </NavLink>
            <NavLink
              to="/admin/connections"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              <FiCloud className="mr-3" />
              Connections
            </NavLink>
            <NavLink
              to="/admin/database"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              <FiDatabase className="mr-3" />
              Database
            </NavLink>
          </nav>
        </aside>

        {/* Admin Content */}
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
