import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import courseService from "@/services/course.service";
import enrollmentService from "@/services/enrollment.service";
import { ICourse } from "@/interfaces/course.interface";
import { ILesson } from "@/interfaces/lesson.interface";
import { toast } from "sonner";
import Overview from "@/components/CourseDetail/Overview";
import LessonPreviewList from "@/components/CourseDetail/LessonPreviewList";
import Sidebar from "@/components/CourseDetail/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import styles from './styles.module.scss'
import classNames from "classnames";

export default function CourseDetailPage() {
  const { container }  = styles
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<ICourse | null>(null);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false); 
  useEffect(() => {
    if (!slug) return;
  
    const fetchData = async () => {
      try {
        const courseRes = await courseService.getCourseDetailBySlug(slug);
        const courseData = courseRes.metadata;
        setCourse(courseData);
  
        if (user) {
          const enrollRes = await enrollmentService.checkEnrolled(courseData._id);
          setIsEnrolled(enrollRes.metadata?.enrolled || false); // 👈 lưu trạng thái
        }
  
        const lessonRes = await courseService.getPublicLessonsByCourseId(courseData._id);
        setLessons(
          lessonRes.metadata?.filter((lesson: ILesson) => lesson.isPreview) || []
        );
      } catch (err) {
        toast.error("Không thể tải khóa học");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [slug, user]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!course) return <div className="p-6">Không tìm thấy khóa học</div>;

  return (
    <div className="w-full flex items-center justify-center pt-10 pb-40">
      <div className={classNames("grid grid-cols-1 lg:grid-cols-3 gap-6 p-6", container)}>
        <div className="lg:col-span-2 space-y-6">
          <Overview course={course} />
          <LessonPreviewList lessons={lessons} />
        </div>
        <Sidebar course={course} isEnrolled={isEnrolled} />
      </div>
    </div>
  );
}
