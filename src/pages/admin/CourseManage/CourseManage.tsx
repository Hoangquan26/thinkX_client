import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import courseService from "@/services/course.service";
import { toast } from "sonner";
import { AdminCourseTable } from "@/components/Admin/CourseManage/AdminCourseTable";
import { ICourse } from "@/interfaces/course.interface";

export default function CourseManage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await courseService.getAllCoursesByAdmin({ query, status });
      setCourses(res.metadata.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [query, status]);

  const handleUpdateCourse = async (id: string, values: Partial<ICourse>) => {
    await toast.promise(courseService.updateCourse(id, values), {
      loading: "Đang cập nhật khóa học...",
      success: () => {
        fetchCourses();
        return "Cập nhật thành công!";
      },
      error: "Cập nhật thất bại!",
    });
  };

  const handleDeleteCourse = async (id: string) => {
    await toast.promise(courseService.deleteCourse(id), {
      loading: "Đang xóa khóa học...",
      success: () => {
        fetchCourses();
        return "Xóa khóa học thành công!";
      },
      error: "Xóa khóa học thất bại!",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-xl font-semibold">All Courses</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="DELETED">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AdminCourseTable
        courses={courses}
        loading={loading}
        onUpdate={handleUpdateCourse}
        onDelete={handleDeleteCourse}
      />
    </div>
  );
}
