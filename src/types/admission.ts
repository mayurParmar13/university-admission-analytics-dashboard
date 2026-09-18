export type AdmissionStatus = "Pending" | "Verified" | "Rejected";

export interface Admission {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  program: string;
  status: AdmissionStatus;
  applicationDate: string;
}

export interface AdmissionFormData {
  applicantName: string;
  email: string;
  phone: string;
  program: string;
  status: AdmissionStatus;
  applicationDate: string;
}
