export interface ProgramApplication {
  program: string;
  applications: number;
}

export interface ApplicationTrend {
  date: string;
  applications: number;
}

export interface AdmissionAnalytics {
  totalApplicants: number;
  verifiedApplicants: number;
  rejectedApplicants: number;
}
