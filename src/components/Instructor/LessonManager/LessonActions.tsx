import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LessonActions({ lessonId }: { lessonId: string }) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Edit className="w-4 h-4 mr-1" /> Edit
      </Button>
      <Button variant="destructive" size="sm">
        <Trash className="w-4 h-4 mr-1" /> Delete
      </Button>
    </div>
  )
}
