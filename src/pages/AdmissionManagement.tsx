import AdminPageLayout from "../components/common/AdminPageLayout";
import PageHeader from "../components/common/PageHeader";
import usePageMeta from "../hooks/usePageMeta";

const AdmissionManagement = () => {
  usePageMeta({
    title: "Admission Management",
    description:
      "Monitor university admission applications, applicant statistics, program-wise applications, and application trends.",
  });
  return (
    <AdminPageLayout>
      <PageHeader
        title="Admission Management"
        description="Monitor university application performance and trends."
      />
    </AdminPageLayout>
  );
};

export default AdmissionManagement;
