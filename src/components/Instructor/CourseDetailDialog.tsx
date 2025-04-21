import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
  } from "@/components/ui/dialog"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { ICourse } from "@/interfaces/course.interface"
  import { ILesson } from "@/interfaces/lesson.interface"
  
  export default function CourseDetailDialog({
    open,
    onClose,
    data
  }: {
    open: boolean
    onClose: () => void
    data: {
      course: ICourse
      lessons: ILesson[]
      enrolledCount: number
    }
  }) {
    const { course, lessons, enrolledCount } = data
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{course.courseName}</DialogTitle>
          </DialogHeader>
  
          <div className="flex gap-6">
            <img
              src={course.courseThumb}
              alt="Thumb"
              className="w-56 h-36 object-cover rounded"
            />
  
            <div className="flex-1 space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Trạng thái:</span>{" "}
                <Badge variant="outline">{course.status}</Badge>
              </div>
              <div className="text-sm">
                <span className="font-semibold">Giá:</span> ${course.coursePrice}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Thể loại:</span>{" "}
                {typeof course.category === "string"
                  ? course.category
                  : course.category?.name}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Giảng viên:</span>{" "}
                {typeof course.instructor === "string"
                  ? course.instructor
                  : course.instructor?.username}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Lượt đăng ký:</span>{" "}
                {enrolledCount}
              </div>
            </div>
          </div>
  
          <div className="mt-4">
            <h4 className="text-base font-semibold">Mô tả khóa học</h4>
            <div
              className="prose max-w-none bg-gray-50 p-4 rounded-md text-sm"
              dangerouslySetInnerHTML={{ __html: course.courseDescription }}
            />
          </div>
  
          <div className="mt-4 space-y-2">
            <h4 className="text-base font-semibold">Danh sách bài học</h4>
            <ScrollArea className="max-h-40 border rounded-md p-2">
              {lessons.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  Chưa có bài học nào.
                </p>
              ) : (
                <ul className="list-disc pl-6 text-sm space-y-1">
                  {lessons.map((lesson, index) => (
                    <li key={lesson._id}>
                      {index + 1}. {lesson.lessonTitle}
                      {lesson.isPreview && (
                        <Badge className="ml-2 bg-blue-100 text-blue-700">
                          Preview
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </div>
  
          <DialogFooter className="pt-6">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  