import { ILesson } from "@/interfaces/lesson.interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, Clock, Calendar, Eye, Pencil } from "lucide-react"
import moment from "moment"
import { Button } from "@/components/ui/button"

export default function LessonCard({ lesson, onEdit }: { lesson: ILesson, onEdit: () => void }) {
  return (
    <Card className="overflow-hidden shadow-md border hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{lesson.lessonTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="relative rounded-md overflow-hidden aspect-video">
          <video
            src={lesson.videoUrl}
            controls
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {lesson.description}
        </p>

        <div className="grid grid-cols-2 text-xs text-gray-600 gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{lesson?.duration || "0m"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{moment(lesson.createdAt).format("DD/MM/YYYY HH:mm")}</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <Eye className="w-4 h-4" />
            <span>
              Preview:{" "}
              <span className={lesson.isPreview ? "text-green-600 font-medium" : "text-gray-500"}>
                {lesson.isPreview ? "Yes" : "No"}
              </span>
            </span>
          </div>
          <div className="col-span-2 text-sm text-gray-500">
            <strong>Course:</strong> {lesson.course.courseName}
          </div>
        </div>
        {onEdit && (
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
      )}
      </CardContent>
    </Card>
  )
}
