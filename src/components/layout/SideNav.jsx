import { NavLink } from "react-router-dom";

const links = [
  { to: "/app/cockpit", label: "Tableau de bord" },
  { to: "/app/projects", label: "Projets" },
  { to: "/app/portfolio", label: "Portfolio" },
  { to: "/app/documents", label: "Documents" },
  { to: "/app/settings", label: "Paramètres" },
];

export function SideNav() {
  return (
    <aside className="w-56 bg-black/40 border-r border-slate-800 p-4 text-[0.8rem]">
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-slate-900 text-amber-300 border border-slate-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
