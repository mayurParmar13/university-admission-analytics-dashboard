import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
}

interface ProfileState {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  resetProfile: () => void;
}

const defaultProfile: Profile = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@university.edu",
  phone: "+91 98765 43210",
  role: "Administrator",
  department: "University Administration",
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,

      updateProfile: (data) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...data,
          },
        })),

      resetProfile: () =>
        set({
          profile: defaultProfile,
        }),
    }),
    {
      name: "university-profile",
    },
  ),
);
