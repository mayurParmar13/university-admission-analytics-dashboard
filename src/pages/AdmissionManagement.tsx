import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import AdminPageLayout from "../components/common/AdminPageLayout";
import Button from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

import AdmissionFilters from "../components/admission/AdmissionFilters";
import AdmissionForm from "../components/admission/AdmissionForm";
import AdmissionTable from "../components/admission/AdmissionTable";

import { useAdmissionStore } from "../stores/admissionStore";

import type {
  Admission,
  AdmissionFormData,
  AdmissionStatus,
} from "../types/admission";

const AdmissionManagement = () => {
  const { admissions, addAdmission, updateAdmission, deleteAdmission } =
    useAdmissionStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdmissionStatus | "All">("All");
  const [program, setProgram] = useState("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState<Admission | null>(
    null,
  );

  const [saving, setSaving] = useState(false);

  const filteredAdmissions = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return admissions.filter((admission) => {
      const matchesSearch =
        !searchValue ||
        admission.id.toLowerCase().includes(searchValue) ||
        admission.applicantName.toLowerCase().includes(searchValue) ||
        admission.email.toLowerCase().includes(searchValue);

      const matchesStatus = status === "All" || admission.status === status;

      const matchesProgram = program === "All" || admission.program === program;

      return matchesSearch && matchesStatus && matchesProgram;
    });
  }, [admissions, search, status, program]);

  const handleAdd = () => {
    setEditingAdmission(null);
    setFormOpen(true);
  };

  const handleEdit = (admission: Admission) => {
    setEditingAdmission(admission);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    deleteAdmission(id);
  };

  const handleFormSubmit = (data: AdmissionFormData) => {
    setSaving(true);

    try {
      if (editingAdmission) {
        updateAdmission(editingAdmission.id, data);
      } else {
        addAdmission(data);
      }

      setFormOpen(false);
      setEditingAdmission(null);
    } finally {
      setSaving(false);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
    setProgram("All");
  };

  return (
    <AdminPageLayout>
      <PageHeader
        title="Admission Management"
        description="Manage and review university admission applications."
        action={
          <Button
            type="button"
            onClick={handleAdd}
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Plus size={17} />
            Add Application
          </Button>
        }
      />

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AdmissionFilters
          search={search}
          status={status}
          program={program}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onProgramChange={setProgram}
          onClear={handleClearFilters}
        />

        <AdmissionTable
          admissions={filteredAdmissions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      {/* Add / Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingAdmission
                  ? "Edit Admission Application"
                  : "Add Admission Application"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {editingAdmission
                  ? "Update the applicant information below."
                  : "Enter the applicant information below."}
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <AdmissionForm
                admission={editingAdmission}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setFormOpen(false);
                  setEditingAdmission(null);
                }}
                saving={saving}
              />
            </div>
          </div>
        </div>
      )}
    </AdminPageLayout>
  );
};

export default AdmissionManagement;
