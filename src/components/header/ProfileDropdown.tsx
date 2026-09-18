import { ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../stores/profileStore";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfileStore();
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  const handleProfileClick = () => {
    setIsOpen(false);
    // Navigate to profile page
    navigate("/profile");
  };

  return (
    <div className="relative border-l border-slate-200 pl-3">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex max-w-60 items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {/* Avatar */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {initials}
        </div>

        {/* Profile Information */}
        <div className="hidden min-w-0 sm:block">
          <p
            title={fullName}
            className="max-w-37.5 truncate text-sm font-medium text-slate-900"
          >
            {fullName}
          </p>

          <p
            title={profile.role}
            className="max-w-37.5 truncate text-xs text-secondary"
          >
            {profile.role}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {/* Profile */}
          <button
            type="button"
            role="menuitem"
            onClick={handleProfileClick}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <User size={17} className="shrink-0 text-slate-500" />
            <span>My Profile</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
