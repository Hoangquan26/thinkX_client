import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard/CourseCard";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { routerConfig } from "@/configs/router.config";
import courseService from "@/services/course.service";
import { ICourse } from "@/interfaces/course.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function HomeCourse() {
  const { container, contentWrapper, titleWrapper, mainWrapper } = styles;

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await courseService.getAllPublicCourses({
        page: 1,
        limit: 8,
        query: "",
      });
      
      if (Array.isArray(res.metadata.data)) {
        setCourses(res.metadata.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className={container}>
      <div className={contentWrapper}>
        <div className={titleWrapper}>
          <h2 className="text-xl font-semibold">Top khóa học nổi bật</h2>
          <Link
            className="text-sm text-blue-600 hover:underline"
            to={routerConfig.course}
          >
            Xem tất cả
          </Link>
        </div>

        <div className={`${mainWrapper} flex flex-wrap gap-4`}>
          {loading ? (
            [...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-full sm:w-[48%] md:w-[32%] xl:w-[260px] h-[240px] rounded-md"
              />
            ))
          ) : courses.length > 0 ? (
            courses.map((item) => (
              <CourseCard key={item._id} data={item} />
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              Không có khóa học nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
