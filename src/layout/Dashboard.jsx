import { Outlet } from "react-router-dom";
import SideBar from "../componets/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <SideBar />
      <div className="flex-1  md:ml-80">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
