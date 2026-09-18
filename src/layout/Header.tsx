import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            AU
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">Admin User</p>

            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
