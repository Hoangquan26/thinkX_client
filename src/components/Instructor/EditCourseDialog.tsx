import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { ICourse } from "@/interfaces/course.interface"
import courseService from "@/services/course.service"
import uploadService from "@/services/cloudiinary.service"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { toast } from "sonner"
import { CourseStatus } from "@/common/constants/courseStatus"

export default function EditCourseDialog({
  open,
  onClose,
  data,
  onRefresh
}: {
  open: boolean
  onClose: () => void
  data: ICourse
  onRefresh: () => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data.courseDescription,
  })

  const [thumb, setThumb] = useState(data.courseThumb)
  const [uploading, setUploading] = useState(false)

  const initialValues = {
    courseName: data.courseName,
    coursePrice: data.coursePrice,
  }

  const validationSchema = Yup.object({
    courseName: Yup.string().required("Required"),
    coursePrice: Yup.number().min(0).required("Required"),
  })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const result = await uploadService.uploadImage(file)
      setThumb(result.secure_url)
      setFieldValue("courseThumb", result.secure_url)
      toast.success("Tải ảnh thành công")
    } catch {
      toast.error("Upload thất bại")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (values: typeof initialValues) => {
    const courseDescription = editor?.getHTML() || ""
    try {
      await courseService.updateCourse(data._id, {
        ...values,
        courseDescription,
        courseThumb: thumb,
      })
      toast.success("Cập nhật khóa học thành công")
      onClose()
      onRefresh()
    } catch (error: any) {
      toast.error(error?.message || "Cập nhật thất bại")
    }
  }

  const handlePublish = async () => {
    try {
      await courseService.publishCourse(data._id)
      toast.success("Đã gửi yêu cầu duyệt")
      onClose()
      onRefresh()
    } catch (error: any) {
      toast.error(error?.message || "Không thể gửi yêu cầu")
    }
  }

  const handleHide = async () => {
    try {
      await courseService.deleteCourse(data._id)
      toast.success("Đã ẩn khóa học")
      onClose()
      onRefresh()
    } catch (error: any) {
      toast.error(error?.message || "Không thể ẩn khóa học")
    }
  }

  const handleShow = async () => {
    try {
      await courseService.draftCourse(data._id)
      toast.success("Đã hiện khóa học")
      onClose()
      onRefresh()
    } catch (error: any) {
      toast.error(error?.message || "Không thể hiện khóa học")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa khóa học</DialogTitle>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Tên khóa học</Label>
                <Field as={Input} name="courseName" />
                {touched.courseName && errors.courseName && (
                  <p className="text-sm text-red-500">{errors.courseName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Giá</Label>
                <Field as={Input} name="coursePrice" type="number" />
                {touched.coursePrice && errors.coursePrice && (
                  <p className="text-sm text-red-500">{errors.coursePrice}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Mô tả</Label>
                <EditorContent editor={editor} className="border rounded-md p-3 min-h-[200px]" />
              </div>

              <div className="space-y-2">
                <Label>Ảnh đại diện</Label>
                <input type="file" onChange={(e) => handleUpload(e, setFieldValue)} />
                {thumb && <img src={thumb} className="w-40 mt-2 rounded-md" />}
              </div>

              <DialogFooter className="pt-4 flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Hủy
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Đang tải..." : "Cập nhật"}
                </Button>

                {data.status === CourseStatus.DRAFT && (
                  <Button className=" bg-green-500" type="button" variant="default" onClick={handlePublish}>
                    Gửi duyệt
                  </Button>
                )}
                {data.status !== CourseStatus.DELETED && (
                  <Button type="button" variant="destructive" onClick={handleHide}>
                    Ẩn khóa học
                  </Button>
                )}

                {data.status === CourseStatus.DELETED && (
                  <Button type="button" variant="destructive" onClick={handleShow}>
                    Hiện khóa học
                  </Button>
                )}
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
