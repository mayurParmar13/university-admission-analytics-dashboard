import { GraduationCap, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../const/navigation";

interface SidebarProps {
  mobile?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({
  mobile = false,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) => {
  if (mobile) {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity lg:hidden ${
            mobileOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={onMobileClose}
          aria-hidden="true"
        />

        {/* Mobile Drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent onClose={onMobileClose} />
        </aside>
      </>
    );
  }

  return <SidebarContent />;
};

interface SidebarContentProps {
  onClose?: () => void;
}

const SidebarContent = ({ onClose }: SidebarContentProps) => {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap size={22} />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              University Admin
            </h1>

            <p className="text-xs text-slate-500">Admission Portal</p>
          </div>
        </div>

        {/* Mobile Close */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")
              }
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-700">Admin Portal</p>

          <p className="mt-1 text-xs text-slate-500">
            University Administration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
