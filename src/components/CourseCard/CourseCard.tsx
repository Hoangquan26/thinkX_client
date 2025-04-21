import { useEffect, useState } from "react";
import { ICourse } from "@/interfaces/course.interface";
import { getStarString } from "@/interfaces/models/rating.interface";
import styles from "./styles.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/configs/router.config";
import { useAuth } from "@/hooks/useAuth";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";

export default function CourseCard({ data }: { data: ICourse }) {
  const { container } = styles;
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // tránh navigate khi click vào nút
    if (!isLoggedIn) {
      toast.warning("Pls login to use cart");
      return navigate("/login");
    }

    toast.promise(cartService.addToCart(data._id), {
      loading: 'Adding to cart process...'  ,
      success: (res) => {
        return "Add to cart succesfully!";
      },
      finally: () => {
        setAdding(false);
      }
    })
  };

  const cardContent = (
    <div className="cursor-pointer group">
      <img
        src={data.courseThumb || "/images/banner.png"}
        alt={data.courseName}
        className="w-full h-[140px] sm:h-[160px] md:h-[180px] object-cover rounded-lg"
      />
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2">{data.courseName}</h3>
        <p className="text-xs text-gray-500">{data.instructor?.username}</p>
        <div className="flex items-center gap-1 text-xs mt-1">
          <span className="text-yellow-500 text-base">
            {getStarString(data.courseRating)}
          </span>
          <span className="text-gray-400">
            {data.courseStudentCount.toLocaleString()} students
          </span>
        </div>
        <p className="font-semibold text-sm mt-1">
          {data.coursePrice.toLocaleString("en-US", {
            currency: "USD",
            style: "currency",
          })}
        </p>
        {data.slug && (
          <Badge className="mt-1 bg-cyan-100 text-cyan-700">{data.slug}</Badge>
        )}
      </div>
    </div>
  );

  return (
    <div
      onClick={() => navigate(routerConfig.getcourseDetail(data.slug))}
      className={`${container} cursor-pointer w-full sm:w-[48%] md:w-[32%] xl:w-[260px] max-w-full mx-auto`}
    >
      {isMobile ? (
        <div>{cardContent}</div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <PopoverTrigger asChild>{cardContent}</PopoverTrigger>

            <PopoverContent className="w-[340px] shadow-2xl z-50 bg-white p-6">
              <div className="text-sm font-semibold">{data.courseName}</div>
              <div className="flex flex-wrap gap-2 mt-1 text-xs">
                {data.slug && (
                  <Badge variant="secondary">{data.slug}</Badge>
                )}
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700 mb-4 mt-2">
                <li>{`Time length: ${data.courseLength}`}</li>
                <li>{`Lessons: ${data.courseLessonCount}`}</li>
                <li>{`Students: ${data.courseStudentCount}`}</li>
              </ul>
              <Button
                className="bg-red-500 hover:bg-red-700 cursor-pointer mt-4 w-full flex justify-center"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? "Đang thêm..." : "Add to cart"}
              </Button>
            </PopoverContent>
          </div>
        </Popover>
      )}
    </div>
  );
}
