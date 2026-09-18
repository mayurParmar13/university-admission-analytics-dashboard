import type { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const DashboardSection = ({
  title,
  description,
  children,
  className = "",
}: DashboardSectionProps) => {
  return (
    <section
      className={`rounded-2xl border border-border bg-surface p-5 shadow-sm ${className}`}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-secondary">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
};

export default DashboardSection;
