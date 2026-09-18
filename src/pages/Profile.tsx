import AdminPageLayout from "../components/common/AdminPageLayout";
import PageHeader from "../components/common/PageHeader";

const Profile = () => {
  return (
    <AdminPageLayout>
      <PageHeader
        title="Profile"
        description="Manage your account information and preferences."
        action={
          <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white">
            Edit Profile
          </button>
        }
      />
    </AdminPageLayout>
  );
};

export default Profile;
