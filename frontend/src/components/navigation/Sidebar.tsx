import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "@context/AuthContext";

const links = [
  { to: "/dashboard", label: "Student Dashboard", roles: ["student"] },
  { to: "/mentor", label: "Mentor", roles: ["mentor"] },
  { to: "/employer", label: "Employer", roles: ["employer"] },
  { to: "/placement", label: "Placement Cell", roles: ["placement_cell", "admin"] }
];

const Sidebar = () => {
  const { profile } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
      <div className="text-xl font-bold mb-6">Campus Portal</div>
      <nav className="space-y-2">
        {links
          .filter((link) => !profile || link.roles.includes(profile.role))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "block px-3 py-2 rounded hover:bg-primary/10",
                  isActive ? "bg-primary/20 text-primary-dark" : "text-gray-700"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
