import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      Sidebar
      <div className="flex flex-col gap-4 mt-4">
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/admissions"}>Admissions</Link>
        <Link to={"/profile"}>Profile</Link>
      </div>
    </div>
  );
};

export default Sidebar;
