import type { ReactNode } from "react";

interface AdminPageLayoutProps {
  children: ReactNode;
  className?: string;
}

const AdminPageLayout = ({
  children,
  className = "",
}: AdminPageLayoutProps) => {
  return (
    <main className={`min-h-screen bg-background ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
};

export default AdminPageLayout;
