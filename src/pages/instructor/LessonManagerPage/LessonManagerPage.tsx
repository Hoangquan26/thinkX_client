import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import lessonService from "@/services/lesson.service"
import { ILesson } from "@/interfaces/lesson.interface"
import LessonCard from "@/components/Instructor/LessonManager/LessonCard"
import SelectCourseFilter from "@/components/Instructor/LessonManager/SelectCourseFilter"
import CreateLessonDialog from "@/components/Instructor/LessonManager/CreateLessonDialog"
import EditLessonDialog from "@/components/Instructor/LessonManager/EditLessonDialog"


export default function LessonManagerPage() {
  const [lessons, setLessons] = useState<ILesson[]>([])
  const [query, setQuery] = useState("")
  const [courseId, setCourseId] = useState("")
  const [loading, setLoading] = useState(false)


  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const handleEditLesson = (lesson: ILesson) => {
    setSelectedLesson(lesson)
    setEditDialogOpen(true)
  }

  const [openCreate, setOpenCreate] = useState(false)

  const fetchLessons = async () => {
    setLoading(true)
    try {
      const res = await lessonService.getAllMyLessons()
      const filtered = res.metadata.filter((lesson : ILesson) =>
        lesson.lessonTitle.toLowerCase().includes(query.toLowerCase()) &&
        (!courseId || lesson.course._id === courseId)
      )
      setLessons(filtered)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLessons()
  }, [query, courseId])

  return (

    <>
    
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <h2 className="text-xl font-semibold">Lesson Manager</h2>
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Search lessons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
          <SelectCourseFilter onChange={setCourseId} />
          <Button onClick={() => setOpenCreate(true)}>
            <PlusCircle className="w-4 h-4 mr-1" /> Add Lesson
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard onEdit={() => handleEditLesson(lesson)} key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </div>

    <CreateLessonDialog
      open={openCreate}
      onClose={() => setOpenCreate(false)}
      onSuccess={() => {
        fetchLessons()
      }}
    />

  {selectedLesson && (
    <EditLessonDialog
      open={editDialogOpen}
      lesson={selectedLesson}
      onClose={() => setEditDialogOpen(false)}
      onRefresh={fetchLessons} // Gọi lại danh sách sau khi cập nhật
    />
  )}
    </>
  )
}
