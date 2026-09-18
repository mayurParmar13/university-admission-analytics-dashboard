import { RefreshCw, UserCheck, Users, UserX } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAdmissionAnalytics } from "../api/analytics";
import AdminPageLayout from "../components/common/AdminPageLayout";
import NoDataComponent from "../components/common/NoDataComponent";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import ApplicationBarChart from "../components/dashboard/ApplicationBarChart";
import ApplicationTrendChart from "../components/dashboard/ApplicationTrendChart";
import DashboardSection from "../components/dashboard/DashboardSection";
import type { AdmissionAnalytics } from "../types/analytics";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AdmissionAnalytics | null>(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchAdmissionAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch admission analytics:", error);

      setError("Unable to load admission analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const stats = useMemo(() => {
    if (!analytics) {
      return [];
    }

    return [
      {
        title: "Total Applicants",
        value: analytics.totalApplicants,
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Verified Applicants",
        value: analytics.verifiedApplicants,
        icon: <UserCheck className="h-5 w-5" />,
      },
      {
        title: "Rejected Applicants",
        value: analytics.rejectedApplicants,
        icon: <UserX className="h-5 w-5" />,
      },
    ];
  }, [analytics]);

  /*
   * Initial loading state
   * Only show the full skeleton when no analytics data exists yet.
   */
  if (loading && !analytics) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-64 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-96 max-w-full rounded bg-slate-200" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-32 rounded-2xl bg-slate-200" />
              ))}
            </div>
            <div className="mt-6 h-96 rounded-2xl bg-slate-200" />
            <div className="mt-6 h-96 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-secondary">{error}</p>
          <button
            type="button"
            onClick={loadAnalytics}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <AdminPageLayout>
      <PageHeader
        title="Admission Analytics"
        description="Monitor university application performance and trends."
        action={
          <button
            type="button"
            onClick={loadAnalytics}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        }
      />

      {/* Stats */}
      <section className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </section>

      <DashboardSection
        title="Applications per Program"
        description="Application distribution across university programs."
      >
        {analytics?.applicationsPerProgram?.length ? (
          <ApplicationBarChart data={analytics.applicationsPerProgram} />
        ) : (
          <NoDataComponent
            title="No program data available"
            subtitle="There are no applications to display."
          />
        )}
      </DashboardSection>

      <DashboardSection
        title="Application Trends"
        description="Daily application activity over the selected period."
        className="mt-6"
      >
        {analytics?.applicationTrends?.length ? (
          <ApplicationTrendChart data={analytics.applicationTrends} />
        ) : (
          <NoDataComponent
            title="No application trends available"
            subtitle="There is no application activity to display."
          />
        )}
      </DashboardSection>

      {/* Refresh Error */}
      {error && analytics && (
        <div className="mt-4 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}
    </AdminPageLayout>
  );
};

export default Dashboard;
