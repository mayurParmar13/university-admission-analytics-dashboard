import { Pencil, Trash2 } from "lucide-react";

import type { Admission } from "../../types/admission";
import NoDataComponent from "../common/NoDataComponent";
import AdmissionStatusBadge from "./AdmissionStatusBadge";

interface AdmissionTableProps {
  admissions: Admission[];
  onEdit: (admission: Admission) => void;
  onDelete: (id: string) => void;
}

const AdmissionTable = ({
  admissions,
  onEdit,
  onDelete,
}: AdmissionTableProps) => {
  if (admissions.length === 0) {
    return (
      <NoDataComponent
        title="No applications found"
        subtitle="Try changing your search or filter criteria."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Application ID
            </th>

            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Applicant
            </th>

            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Program
            </th>

            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Application Date
            </th>

            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {admissions.map((admission) => (
            <tr
              key={admission.id}
              className="transition-colors hover:bg-slate-50"
            >
              <td className="px-5 py-4 text-sm font-medium text-slate-900">
                {admission.id}
              </td>

              <td className="px-5 py-4">
                <p className="text-sm font-medium text-slate-900">
                  {admission.applicantName}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {admission.email}
                </p>
              </td>

              <td className="px-5 py-4 text-sm text-slate-600">
                {admission.program}
              </td>

              <td className="px-5 py-4">
                <AdmissionStatusBadge status={admission.status} />
              </td>

              <td className="px-5 py-4 text-sm text-slate-600">
                {admission.applicationDate}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(admission)}
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-primary"
                    aria-label={`Edit ${admission.applicantName}`}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(admission.id)}
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${admission.applicantName}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdmissionTable;
