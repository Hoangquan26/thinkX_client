import Sidebar from "@/components/Admin/Layout/Sidebar/Sidebar";
import Topbar from "@/components/Admin/Layout/Topbar/Topbar";
import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="p-6 overflow-y-auto"><Outlet/></main>
        </div>
      </div>
    );
  }
  