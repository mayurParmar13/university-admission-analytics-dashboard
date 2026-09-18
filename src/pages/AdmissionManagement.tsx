import AdminPageLayout from "../components/common/AdminPageLayout";
import PageHeader from "../components/common/PageHeader";

const AdmissionManagement = () => {
  return (
    <AdminPageLayout>
      <PageHeader
        title="Admission Analytics"
        description="Monitor university application performance and trends."
      />
    </AdminPageLayout>
  );
};

export default AdmissionManagement;
