import { useEffect, useState } from "react";

import type { Admission, AdmissionFormData } from "../../types/admission";

import {
  admissionSchema,
  type AdmissionFormValues,
} from "../../schemas/admissionSchema";

import Button from "../common/Button";
import Input from "../common/Input";

interface AdmissionFormProps {
  admission?: Admission | null;
  onSubmit: (data: AdmissionFormData) => void;
  onCancel: () => void;
  saving?: boolean;
}

const defaultFormData: AdmissionFormValues = {
  applicantName: "",
  email: "",
  phone: "",
  program: "",
  status: "Pending",
  applicationDate: "",
};

const AdmissionForm = ({
  admission,
  onSubmit,
  onCancel,
  saving = false,
}: AdmissionFormProps) => {
  const [formData, setFormData] =
    useState<AdmissionFormValues>(defaultFormData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof AdmissionFormValues, string>>
  >({});

  useEffect(() => {
    if (admission) {
      setFormData({
        applicantName: admission.applicantName,
        email: admission.email,
        phone: admission.phone,
        program: admission.program,
        status: admission.status,
        applicationDate: admission.applicationDate,
      });
    } else {
      setFormData(defaultFormData);
    }

    setErrors({});
  }, [admission]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name as keyof AdmissionFormValues]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = admissionSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AdmissionFormValues, string>> =
        {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AdmissionFormValues;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="applicantName"
          name="applicantName"
          label="Applicant Name"
          value={formData.applicantName}
          onChange={handleChange}
          placeholder="Enter applicant name"
          error={errors.applicantName}
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          error={errors.email}
          required
        />

        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          error={errors.phone}
          required
        />

        <div>
          <label
            htmlFor="program"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Program
          </label>

          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
              errors.program ? "border-danger" : "border-slate-200"
            }`}
          >
            <option value="">Select program</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business Administration">
              Business Administration
            </option>
            <option value="Arts">Arts</option>
            <option value="Medicine">Medicine</option>
          </select>

          {errors.program && (
            <p className="mt-1 text-xs text-danger">{errors.program}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <Input
          id="applicationDate"
          name="applicationDate"
          type="date"
          label="Application Date"
          value={formData.applicationDate}
          onChange={handleChange}
          error={errors.applicationDate}
          required
        />
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
        <Button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={saving}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {admission ? "Update Application" : "Add Application"}
        </Button>
      </div>
    </form>
  );
};

export default AdmissionForm;
