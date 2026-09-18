import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface IAdminLayout {
  children: ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  return (
    <div>
      <Sidebar />
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;
