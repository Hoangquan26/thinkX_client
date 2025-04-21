import { Link, useLocation } from "react-router-dom";
import { routerConfig } from "@/configs/router.config";
import {
  Users, MailCheck, BookOpen, LayoutGrid, Bell, ClipboardList, FileText
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const adminRoutes = routerConfig.admin.childrens.fullLayout;
  const { pathname } = useLocation();

  const links = [
    { to: adminRoutes.userManager, label: "User Manager", icon: Users },
    { to: adminRoutes.instructorRequest, label: "Instructor Requests", icon: MailCheck },
    { to: adminRoutes.courseManager, label: "Courses", icon: BookOpen },
    { to: adminRoutes.categoryManager, label: "Categories", icon: LayoutGrid },
    { to: adminRoutes.notificationManager, label: "Notifications", icon: Bell },
    { to: adminRoutes.courseRequestManager, label: "Course Requests", icon: ClipboardList },
    { to: adminRoutes.lessonRequestManager, label: "Lesson Requests", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-md hidden md:flex flex-col h-screen">
      <div className="px-6 py-5 font-semibold text-xl text-primary tracking-tight border-b">
        ThinkX Admin
      </div>

      <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-medium">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
              pathname.startsWith(to)
                ? "bg-red-100 text-red-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
