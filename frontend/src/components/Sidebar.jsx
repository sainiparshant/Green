import {
  LayoutDashboard,
  Leaf,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <aside className="lg:block hidden h-screen  bg-gray-200/50 flex-col font-medium border-r border-gray-300">
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
                      `flex items-center text-sm gap-2 px-3 py-2 rounded-lg transition text-gray-900
                    ${
                      isActive
                        ? "bg-gray-200 text-gray-700"
                        : "text-gray-900 hover:bg-gray-200/50 hover:text-gray-900"
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
              ${isActive ? "text-emerald-600 font-semibold" : "text-gray-500"}`
                  }
                >
                  <Icon size={22} />
                  <span className="text-[10px]">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
