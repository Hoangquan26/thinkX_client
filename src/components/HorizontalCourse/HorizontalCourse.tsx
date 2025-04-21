import { ICourse } from "@/interfaces/course.interface";
import { getStarString } from "@/interfaces/models/rating.interface";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/configs/router.config";
import { toast } from "sonner";
import { cartService } from "@/services/cart.service";
import { useAuth } from "@/hooks/useAuth";

export default function HorizontalCourse({ course }: { course: ICourse }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      navigate(routerConfig.login);
      return;
    }
    try {
      await cartService.addToCart(course._id);
      toast.success("Added to cart!");
    } catch {
      toast.error("Already in cart or error occurred.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center bg-white border rounded-md p-4 gap-4 hover:shadow-md transition">
      <img
        src={course.courseThumb || "/images/banner.png"}
        className="w-full md:w-48 h-32 object-cover rounded"
        alt={course.courseName}
        onClick={() => navigate(routerConfig.getcourseDetail(course.slug))}
      />
      <div className="flex-1 space-y-1">
        <h3 onClick={() => navigate(routerConfig.getcourseDetail(course.slug))} className="font-bold text-lg cursor-pointer">{course.courseName}</h3>
        <p className="text-sm text-gray-500">{course.instructor?.username} • {course.category?.name}</p>
        <div className="text-yellow-500">{getStarString(course.courseRating)}</div>
        <p className="text-sm text-muted-foreground">{course.courseLength} • {course.courseLessonCount} lessons</p>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-40">
        <Button variant="secondary" onClick={handleAddToCart}>Add to cart</Button>
        <Button onClick={() => navigate(routerConfig.getcourseDetail(course.slug))} variant="default">View Detail</Button>
      </div>
    </div>
  );
}
