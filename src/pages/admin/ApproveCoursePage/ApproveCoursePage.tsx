import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import courseService from "@/services/course.service";
import { toast } from "sonner";
import { CourseTable } from "@/components/Admin/ApproveCoursePage/CourseTable"; 
import { ICourse } from "@/interfaces/course.interface";

export default function ApproveCoursesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("PENDING");
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-xl font-semibold">Course Approval Requests</h2>
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
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="ALL">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CourseTable
        courses={courses}
        loading={loading}
        onApprove={async (id) => {
          await courseService.approveCourse(id);
          toast.success("Approved");
          fetchCourses();
        }}
        onReject={async (id, feedback) => {
          await courseService.rejectCourse(id, feedback);
          toast("Rejected");
          fetchCourses();
        }}
      />
    </div>
  );
}