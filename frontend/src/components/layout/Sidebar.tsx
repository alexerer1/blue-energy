import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiArchive,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
} from "react-icons/fi";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <FiHome size={20} /> },
  {
    label: "Generate Report",
    href: "/generate-report",
    icon: <FiFileText size={20} />,
  },
  {
    label: "Previous Reports",
    href: "/previous-reports",
    icon: <FiArchive size={20} />,
  },
  {
    label: "Admin settings",
    href: "/admin",
    icon: <FiSettings size={20} />,
  },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const storedState = sessionStorage.getItem("sidebar-collapsed");
    return storedState === "true";
  });

  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <div
      className={`flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-200
  ${collapsed ? "w-12" : "w-48"}`}
    >
      {/* Sidebar Header */}
      <div
        className={`flex items-center h-14 px-2 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {/* Logo */}
        {!collapsed && (
          <div className="flex items-center">
            <img
              src="/printlogo.png" // Use "printLogo" if using assets
              alt="Logo"
              className="h-6 w-auto mr-2"
            />
          </div>
        )}

        {/* Collapse/Expand button */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <FiChevronRight size={20} className="text-primary" />
          ) : (
            <FiChevronLeft size={20} className="text-primary" />
          )}
        </button>
      </div>

      <nav className="overflow-auto flex-1">
        <ul className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm transition-colors duration-200 
                hover:bg-gray-100 ${
                  isActive
                    ? "text-[#00847c] font-medium bg-gray-100"
                    : "text-primary"
                }`}
                >
                  <div
                    className={`flex justify-center items-center ${
                      collapsed ? "w-full" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`ml-3 transition-opacity duration-200 ${
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
