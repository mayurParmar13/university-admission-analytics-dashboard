import type { AdmissionStatus } from "../../types/admission";

interface AdmissionStatusBadgeProps {
  status: AdmissionStatus;
}

const statusStyles: Record<AdmissionStatus, string> = {
  Pending: "bg-orange-50 text-orange-700",
  Verified: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

const AdmissionStatusBadge = ({ status }: AdmissionStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default AdmissionStatusBadge;
