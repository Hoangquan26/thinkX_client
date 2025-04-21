import { useEffect, useState } from "react";
import { ICourse } from "@/interfaces/course.interface";
import courseService from "@/services/course.service";
import { toast } from "sonner";
import CourseCard from "@/components/CourseCard/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import styles from "./styles.module.scss";
import classNames from "classnames";

export default function TopRatedCoursesSection() {
  const { container } = styles;
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRated = async () => {
    try {
      const res = await courseService.getAllPublicCourses({
        page: 1,
        limit: 8,
        query: "",
        sortField: "courseRating",
        sortOrder: -1,
      });
      setCourses(res.metadata.data);
    } catch (err) {
      toast.error("Không thể tải khóa học top đánh giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <section className={classNames("mt-10", container)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Top Rated Courses
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[240px] w-full rounded-md"
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">Không có khóa học nào.</p>
        ) : (
          <Carousel className="relative">
            <CarouselContent>
              {courses.map((course) => (
                <CarouselItem
                  key={course._id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                >
                  <CourseCard data={course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        )}
      </section>
    </div>
  );
}
