import { ILesson } from "@/interfaces/lesson.interface"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

interface LessonPreviewProps {
  lessons: ILesson[]
}

export default function LessonPreview({ lessons }: LessonPreviewProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handlePreviewClick = (url: string) => {
    setSelectedVideo(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Nội dung khóa học</h3>
        <p className="text-sm text-muted-foreground">
          Gồm {lessons.length} bài học, có {lessons.filter(l => l.isPreview).length} bài học có thể xem trước.
        </p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <div
            key={lesson._id}
            className="border rounded-md p-3 flex items-center justify-between bg-white hover:shadow"
          >
            <div>
              <p className="font-medium text-sm">
                {index + 1}. {lesson.lessonTitle}
              </p>
              {lesson.duration && (
                <p className="text-xs text-muted-foreground mt-1">
                  Thời lượng: {lesson.duration}
                </p>
              )}
            </div>
            {lesson.isPreview && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewClick(lesson.videoUrl)}
              >
                <PlayCircle className="w-4 h-4 mr-1" />
                Xem thử
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Xem video */}
      {selectedVideo && (
        <div className="mt-6 space-y-2">
          <h4 className="text-base font-semibold">Xem trước bài học</h4>
          <div className="aspect-video rounded overflow-hidden border">
            <iframe
              src={selectedVideo}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
