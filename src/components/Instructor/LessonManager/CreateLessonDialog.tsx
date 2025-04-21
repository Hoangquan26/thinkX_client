import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import uploadService from "@/services/cloudiinary.service"
import lessonService from "@/services/lesson.service"
import { toast } from "sonner"
import { ICourse } from "@/interfaces/course.interface"
import courseService from "@/services/course.service"
import { formatDuration } from "@/utils/format"

export default function CreateLessonDialog({ open, onClose, onSuccess }: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [videoUrl, setVideoUrl] = useState("")
  const [duration, setDuration] = useState("0m")
  const [uploading, setUploading] = useState(false)
  const [courses, setCourses] = useState<ICourse[]>([])

  useEffect(() => {
    const fetch = async () => {
      const res = await courseService.getMyCourses()
      setCourses(res.metadata)
    }
    fetch()
  }, [])

  const initialValues = {
    lessonTitle: "",
    courseId: "",
    description: "",
    order: 0,
    isPreview: false,
    
  }

  const validationSchema = Yup.object({
    lessonTitle: Yup.string().required("Required"),
    courseId: Yup.string().required("Required"),
    order: Yup.number().min(1).default(1).required("Required")
  })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const res = await uploadService.uploadVideo(file)
      setVideoUrl(res.secure_url)
      setDuration(formatDuration(res.duration))
      toast.success("Upload video success")
    } catch {
      toast.error("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (values: typeof initialValues) => {
    if (!videoUrl) {
      toast.error("Please upload a video")
      return
    }

    
    toast.promise(lessonService.createLesson({ ...values, videoUrl, duration }) , {
        loading: 'Creating new lesson...',
        success: () => {
            onClose()
            onSuccess()
            return 'Create new lesson successful'
        }
    })

    
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Lesson Title</Label>
                <Field as={Input} name="lessonTitle" />
                {touched.lessonTitle && errors.lessonTitle && (
                  <p className="text-red-500 text-sm">{errors.lessonTitle}</p>
                )}
              </div>

              <div>
                <Label>Course</Label>
                <Field as="select" name="courseId" className="w-full border rounded px-3 py-2">
                  <option value="">-- Choose course --</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.courseName}
                    </option>
                  ))}
                </Field>
                {touched.courseId && errors.courseId && (
                  <p className="text-red-500 text-sm">{errors.courseId}</p>
                )}
              </div>

              <div>
                <Label>Order</Label>
                <Field type="number" as={Input} name="order" />
              </div>

              <div>
                <Label>Description</Label>
                <Field as="textarea" name="description" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <Label>Video</Label>
                <Input type="file" accept="video/*" onChange={handleUpload} />
                {videoUrl && (
                  <video src={videoUrl} controls className="mt-2 rounded w-full h-48 object-cover" />
                )}
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Uploading..." : "Create"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
