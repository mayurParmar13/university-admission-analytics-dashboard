import type { Admission, AdmissionFormData } from "../types/admission";
import apiClient from "./client";

export const fetchAdmissions = async (): Promise<Admission[]> => {
  const response = await apiClient.get<Admission[]>("/admissions");

  return response.data;
};

export const createAdmission = async (
  data: AdmissionFormData,
): Promise<Admission> => {
  const response = await apiClient.post<Admission>("/admissions", data);

  return response.data;
};

export const updateAdmission = async (
  id: string,
  data: AdmissionFormData,
): Promise<Admission> => {
  const response = await apiClient.put<Admission>(`/admissions/${id}`, data);

  return response.data;
};

export const deleteAdmission = async (id: string): Promise<void> => {
  await apiClient.delete(`/admissions/${id}`);
};
