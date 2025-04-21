import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import enrollmentService from "@/services/enrollment.service";
import courseService from "@/services/course.service";
import { ILesson } from "@/interfaces/lesson.interface";
import { toast } from "sonner";

export default function LearningPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const check = await enrollmentService.checkEnrolled(courseId as string);
        if (!check.metadata?.enrolled) {
          toast.error("Bạn chưa đăng ký khóa học này.");
          return navigate(`/courses/${courseId}`);
        }

        const lessonRes = await courseService.getLearningLessonsByCourseId(courseId as string);
        console.log(lessonRes)
        const allLessons = lessonRes.metadata;

        setLessons(allLessons);
        setCurrentLesson(allLessons[0] || null);
      } catch (err) {
        toast.error("Không thể tải khóa học.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [courseId]);

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (!currentLesson) return <div className="p-4">Không có bài học nào.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
      <div className="lg:col-span-3 p-6 bg-black text-white">
        <div className="aspect-video mb-4">
          <iframe
            src={currentLesson.videoUrl}
            title={currentLesson.lessonTitle}
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
        <h2 className="text-xl font-semibold">{currentLesson.lessonTitle}</h2>
      </div>
      {/* Danh sách bài học */}
      <div className="border-l p-6 bg-white overflow-y-auto">
        <h3 className="font-semibold mb-4 text-lg">Danh sách bài học</h3>
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li
              key={lesson._id}
              onClick={() => setCurrentLesson(lesson)}
              className={`cursor-pointer p-3 rounded-md border hover:bg-gray-100 transition ${
                currentLesson._id === lesson._id ? "bg-gray-100 border-black" : ""
              }`}
            >
              {lesson.lessonTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
