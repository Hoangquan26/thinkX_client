import { ICourse } from "@/interfaces/course.interface";
import { Button } from "@/components/ui/button";
import { ShoppingCart, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";

interface CourseSidebarProps {
  course: ICourse;
  isEnrolled: boolean;
}

export default function CourseSidebar({ course, isEnrolled }: CourseSidebarProps) {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(course._id);
      toast.success("Đã thêm vào giỏ hàng");
    } catch (err) {
      toast.error("Không thể thêm vào giỏ hàng");
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white sticky top-24 space-y-4 w-full md:w-[320px]">
      {/* Thumbnail */}
      <div className="aspect-video rounded overflow-hidden border">
        <img
          src={course.courseThumb || "/images/banner.png"}
          alt={course.courseName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Giá + số học viên */}
      <div>
        <p className="text-2xl font-semibold text-red-600">
          {course.coursePrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="text-xs text-muted-foreground">
          Đã có {course.courseStudentCount} học viên
        </p>
      </div>

      {/* Nút hành động */}
      {isEnrolled ? (
        <Button variant={"destructive"} className="w-full" onClick={() => navigate(`/learning/${course._id}`)}>
          <PlayCircle className="w-4 h-4 mr-2" />
          Vào học ngay
        </Button>
      ) : (
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Thêm vào giỏ hàng
        </Button>
      )}

      {/* Thông tin khóa học */}
      <ul className="text-sm mt-4 space-y-2">
        <li><strong>Thời lượng:</strong> {course.courseLength || "0h"}</li>
        <li><strong>Số bài học:</strong> {course.courseLessonCount}</li>
        <li><strong>Trình độ:</strong> Tất cả cấp độ</li>
        <li><strong>Thể loại:</strong> {course.category?.name}</li>
        <li><strong>Giảng viên:</strong> {course.instructor?.username}</li>
      </ul>
    </div>
  );
}
