import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import courseService from "@/services/course.service"
import { ICourse } from "@/interfaces/course.interface"

export default function SelectCourseFilter({ onChange }: { onChange: (courseId: string) => void }) {
  const [courses, setCourses] = useState<ICourse[]>([])

  useEffect(() => {
    const fetch = async () => {
      const res = await courseService.getMyCourses()
      console.log(res)
      setCourses(res.metadata)
    }
    fetch()
  }, [])

  return (
    <Select onValueChange={(val) => onChange(val === "ALL" ? "" : val)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filter by Course" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All Courses</SelectItem>
        {courses.map((course) => (
          <SelectItem key={course._id} value={course._id}>
            {course.courseName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
