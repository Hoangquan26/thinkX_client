import { ICourse } from "@/interfaces/course.interface";
import { getStarString } from "@/interfaces/models/rating.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { routerConfig } from "@/configs/router.config";

interface CourseOverviewProps {
  course: ICourse;
}

export default function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="w-full bg-white mt-2 mb-12 mr-6 rounded-lg space-y-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={routerConfig.homePage}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={routerConfig.course}>Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {course.category?.slug && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`${routerConfig.course}?category=${course.category.slug}`}>
                    {course.category.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}

          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold text-gray-900" asChild>
              <span>{course.courseName}</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {course.courseName}
      </h1>

      {/* Description */}
      <div
        className="text-gray-700 text-sm md:text-base leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: course.courseDescription || "<p>Không có mô tả</p>",
        }}
      ></div>

      {/* Instructor & Category */}
      <div className="text-sm text-muted-foreground flex flex-wrap gap-3 items-center">
        <p>
          Giảng viên:{" "}
          <span className="text-black font-medium">
            {course.instructor?.username || "-"}
          </span>
        </p>
        <Badge variant="outline">{course.category?.name}</Badge>
      </div>

      {/* Rating + Students */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500" />
          <span className="text-black font-semibold">
            {course.courseRating.toFixed(1)}
          </span>
          <span className="ml-1 text-xs text-gray-500">
            ({course.courseStudentCount.toLocaleString()} học viên)
          </span>
        </div>
      </div>

      {/* Duration + Lessons */}
      <div className="text-sm text-gray-700">
        <p>
          Thời lượng: <strong>{course.courseLength}</strong> •{" "}
          {course.courseLessonCount} bài học
        </p>
      </div>

      <Separator />
    </div>
  );
}
