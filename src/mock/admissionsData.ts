import type { Admission } from "../types/admission";

export const admissionsData: Admission[] = [
  {
    id: "ADM-001",
    applicantName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    program: "Computer Science",
    status: "Verified",
    applicationDate: "2026-09-10",
  },
  {
    id: "ADM-002",
    applicantName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 98765 43211",
    program: "Engineering",
    status: "Pending",
    applicationDate: "2026-09-12",
  },
  {
    id: "ADM-003",
    applicantName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 98765 43212",
    program: "Business Administration",
    status: "Rejected",
    applicationDate: "2026-09-14",
  },
  {
    id: "ADM-004",
    applicantName: "Emily Brown",
    email: "emily.brown@example.com",
    phone: "+91 98765 43213",
    program: "Arts",
    status: "Pending",
    applicationDate: "2026-09-16",
  },
  {
    id: "ADM-005",
    applicantName: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+91 98765 43214",
    program: "Medicine",
    status: "Verified",
    applicationDate: "2026-09-17",
  },
];
