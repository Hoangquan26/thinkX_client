// src/components/Instructor/Sidebar.tsx
import { NavLink } from "react-router-dom"
import { routerConfig } from "@/configs/router.config"
import { Book, Layers } from "lucide-react"

const links = [
  {
    label: "My Courses",
    path: routerConfig.instructorCourses,
    icon: <Book className="w-4 h-4 mr-2" />,
  },
  {
    label: "Lesson Manager",
    path: routerConfig.instructorLessons,
    icon: <Layers className="w-4 h-4 mr-2" />,
  },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-full p-6 shadow-sm">
      <div className="text-2xl font-bold text-gray-800 mb-8 tracking-tight">
        Instructor
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md transition-all font-medium no-underline ${
                isActive
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
