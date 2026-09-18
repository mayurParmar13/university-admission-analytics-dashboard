import { RefreshCw, UserCheck, Users, UserX } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAdmissionAnalytics } from "../api/analytics";
import StatCard from "../components/common/StatCard";
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

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-64 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-96 rounded bg-slate-200" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-32 rounded-2xl bg-slate-200" />
              ))}
            </div>
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
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Admission Analytics
            </h1>

            <p className="mt-1 text-sm text-secondary">
              Monitor university application performance and trends.
            </p>
          </div>

          <button
            type="button"
            onClick={loadAnalytics}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </header>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
