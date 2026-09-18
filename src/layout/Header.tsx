import { Bell, Menu } from "lucide-react";
import Button from "../components/common/Button";
import ProfileDropdown from "../components/header/ProfileDropdown";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-16 border-b border-slate-200 bg-white lg:left-72">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <Button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </Button>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-3">
          {/* Notifications */}
          <Button
            type="button"
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </Button>
          {/* Profile */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
