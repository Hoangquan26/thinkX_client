// src/pages/MyLearningPage.tsx

import { useEffect, useState } from "react";
import enrollmentService from "@/services/enrollment.service";
import { ICourse } from "@/interfaces/course.interface";
import HorizontalCourse from "@/components/HorizontalCourse/HorizontalCourse";
import { toast } from "sonner";

export default function MyLearningPage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await enrollmentService.getMyEnrollments();
        setCourses(res.metadata || []);
      } catch (err) {
        toast.error("Failed to load your enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) return <div className="p-6">Loading your courses...</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Learning</h1>

        {courses.length === 0 ? (
          <p className="text-gray-500">You haven't enrolled in any course yet.</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <HorizontalCourse key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
