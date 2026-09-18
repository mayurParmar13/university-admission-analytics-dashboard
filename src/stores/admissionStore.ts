import { create } from "zustand";
import { persist } from "zustand/middleware";
import { admissionsData } from "../mock/admissionsData";
import type { Admission, AdmissionFormData } from "../types/admission";

interface AdmissionState {
  admissions: Admission[];
  addAdmission: (data: AdmissionFormData) => void;
  updateAdmission: (id: string, data: AdmissionFormData) => void;
  deleteAdmission: (id: string) => void;
}

export const useAdmissionStore = create<AdmissionState>()(
  persist(
    (set) => ({
      admissions: admissionsData,

      addAdmission: (data) =>
        set((state) => ({
          admissions: [
            ...state.admissions,
            {
              id: `ADM-${String(state.admissions.length + 1).padStart(3, "0")}`,
              ...data,
            },
          ],
        })),

      updateAdmission: (id, data) =>
        set((state) => ({
          admissions: state.admissions.map((admission) =>
            admission.id === id
              ? {
                  ...admission,
                  ...data,
                }
              : admission,
          ),
        })),

      deleteAdmission: (id) =>
        set((state) => ({
          admissions: state.admissions.filter(
            (admission) => admission.id !== id,
          ),
        })),
    }),
    {
      name: "university-admissions",
    },
  ),
);
