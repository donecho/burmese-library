import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBook,
  FaChartBar,
  FaUser,
  FaUserShield,
  FaChevronDown,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "user";

  const [adminOpen, setAdminOpen] = useState(false);
  const [open, setOpen] = useState(false); // mobile toggle

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menu = [
    { name: "Books", path: "/books", icon: <FaBook /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 shadow">
        <button onClick={() => setOpen(true)} className="text-xl">
          <FaBars />
        </button>
        <span className="font-bold text-indigo-600">📚 Library</span>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed z-100 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg border-r flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* CLOSE BTN MOBILE */}
        <div className="lg:hidden flex justify-end p-4">
          <FaTimes
            className="cursor-pointer text-xl"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* LOGO */}
        <div className="px-6 pb-4 text-xl font-bold text-indigo-600">
          📚 Library
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 px-4 flex-1">

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}

          <Link
            to="/saved"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${
              location.pathname === "/saved"
                ? "bg-indigo-100 text-indigo-600 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            ⭐ Saved Books
          </Link>



          {/* ADMIN PANEL */}
          {role === "admin" && (
            <>
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <FaUserShield className="text-lg" />
                  Admin Panel
                </div>

                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    adminOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`flex flex-col ml-8 overflow-hidden transition-all duration-300 ${
                  adminOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm transition
                  ${
                    location.pathname === "/admin/dashboard"
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/books"
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm transition
                  ${
                    location.pathname === "/admin/books"
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  Manage Books
                </Link>
                <Link
                  to="/admin/users"
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm transition
                  ${
                    location.pathname === "/admin/users"
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  Manage Users
                </Link>

              </div>
            </>
          )}
        </nav>

        {/* LOGOUT */}
        <div className="px-4 mb-4 mt-auto">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition mt-3"
          >
            Logout
          </button>
        </div>

        <div className="p-4 text-xs text-gray-400">
          © 2025 Library System
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
