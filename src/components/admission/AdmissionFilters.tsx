import { Search, X } from "lucide-react";
import type { AdmissionStatus } from "../../types/admission";
import Button from "../common/Button";

interface AdmissionFiltersProps {
  search: string;
  status: AdmissionStatus | "All";
  program: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: AdmissionStatus | "All") => void;
  onProgramChange: (value: string) => void;
  onClear: () => void;
}

const programs = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Arts",
  "Medicine",
];

const AdmissionFilters = ({
  search,
  status,
  program,
  onSearchChange,
  onStatusChange,
  onProgramChange,
  onClear,
}: AdmissionFiltersProps) => {
  const hasFilters = search !== "" || status !== "All" || program !== "All";

  return (
    <div className="border-b border-slate-100 p-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label
            htmlFor="admission-search"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Search
          </label>

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="admission-search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search applicant, email or application ID..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="admission-status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="admission-status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as AdmissionStatus | "All")
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Program */}
        <div>
          <label
            htmlFor="admission-program"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Program
          </label>

          <select
            id="admission-program"
            value={program}
            onChange={(event) => onProgramChange(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="All">All Programs</option>

            {programs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={onClear}
            className="border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            <X size={16} />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdmissionFilters;
