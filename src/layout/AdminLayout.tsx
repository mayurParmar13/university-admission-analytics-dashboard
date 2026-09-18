import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface IAdminLayout {
  children: ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-[1600px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
