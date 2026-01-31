import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "../api/axios";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/customers", label: "Customers", icon: User },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async() => {
   try {
    await API.post("/auth/admin/logout");
    dispatch(logout());
    navigate("/admin/login");
    toast.success("Logged out successfully");
   } catch (error) {
    console.log(error);
   }
  };

  return (
    <>
      <aside className="lg:flex hidden h-screen bg-gray-200/50 flex-col font-medium border-r border-gray-300">
        <div className="text-sm sm:text-lg font-bold p-5 border-b border-gray-300 text-emerald-800">
          GreenLand
        </div>

        <nav className="flex-1 p-2 mt-2">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center text-sm gap-2 px-3 py-2 rounded-lg transition
                      ${
                        isActive
                          ? "bg-gray-200 text-gray-700"
                          : "text-gray-900 hover:bg-gray-200/50"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-300">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md z-50">
        <ul className="flex justify-around items-center h-14">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center text-xs
                    ${
                      isActive
                        ? "text-emerald-600 font-semibold"
                        : "text-gray-500"
                    }`
                  }
                >
                  <Icon size={22} />
                  <span className="text-[10px]">{item.label}</span>
                </NavLink>
              </li>
            );
          })}

            <button
              onClick={()=> handleLogout()}
              className="flex flex-col items-center justify-center text-xs text-red-500"
            >
              <LogOut size={22} />
              <span className="text-[10px]">Logout</span>
            </button>
          
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
