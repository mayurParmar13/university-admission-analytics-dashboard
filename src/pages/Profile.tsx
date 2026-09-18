import { useMemo, useState } from "react";

import AdminPageLayout from "../components/common/AdminPageLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import PageHeader from "../components/common/PageHeader";

import { profileSchema, type ProfileFormData } from "../schemas/profileSchema";
import { useProfileStore } from "../stores/profileStore";

const Profile = () => {
  const { profile, updateProfile } = useProfileStore();

  const [formData, setFormData] = useState<ProfileFormData>(profile);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});

  const [saving, setSaving] = useState(false);

  // Check whether form data has changed
  const isDirty = useMemo(() => {
    return (
      formData.firstName !== profile.firstName ||
      formData.lastName !== profile.lastName ||
      formData.phone !== profile.phone
    );
  }, [formData, profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear field error while typing
    if (errors[name as keyof ProfileFormData]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isDirty) {
      return;
    }

    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProfileFormData, string>> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ProfileFormData;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});
    setSaving(true);

    try {
      updateProfile(result.data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPageLayout>
      <PageHeader
        title="My Profile"
        description="Manage your profile information."
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            error={errors.firstName}
            required
          />

          <Input
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            error={errors.lastName}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            disabled
            error={errors.email}
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

          <Input
            id="role"
            name="role"
            label="Role"
            value={formData.role}
            disabled
            error={errors.role}
          />

          <Input
            id="department"
            name="department"
            label="Department"
            value={formData.department}
            disabled
            error={errors.department}
          />
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
          <Button
            type="submit"
            loading={saving}
            disabled={!isDirty}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default Profile;
