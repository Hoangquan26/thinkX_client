import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import uploadService from "@/services/cloudiinary.service"
import courseService from "@/services/course.service"
import categoryService from "@/services/category.service" 
import { ICategory } from "@/interfaces/category.interface"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function CreateCourseDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [thumb, setThumb] = useState("")
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  })

  const initialValues = {
    courseName: "",
    coursePrice: 0,
    category: "",
  }

  const validationSchema = Yup.object({
    courseName: Yup.string().required("Vui lòng nhập tên khóa học"),
    coursePrice: Yup.number().min(0).required("Vui lòng nhập giá"),
    category: Yup.string().required("Vui lòng chọn danh mục"),
  })

  useEffect(() => {
    const fetchCategories = async () => {
      toast.promise(categoryService.getAllPublic(), {
        loading: "Loading categories...",
        success: (res) => {
          console.log(res)
          setCategories(res.metadata || [])
          return res.message || "Loading categories successful"
        },
        error: (err) => {
          toast.error(err.message || "Cant get categories")
          return "fail"
        }
      })

    }
    fetchCategories()
  }, [])

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const result = await uploadService.uploadImage(file)
      setThumb(result.secure_url)
      setFieldValue("courseThumb", result.secure_url)
      toast.success("Tải ảnh thành công")
    } catch (error) {
      toast.error("Upload thất bại")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (values: typeof initialValues) => {
    const courseDescription = editor?.getHTML() || ""

    if (!courseDescription || !thumb) {
      toast.error("Vui lòng nhập mô tả và ảnh đại diện")
      return
    }

    try {
      await courseService.createCourse({
        ...values,
        courseDescription,
        courseThumb: thumb,
      })
      toast.success("Tạo khóa học thành công")
      onClose()
    } catch (error: any) {
      toast.error(error?.message || "Tạo thất bại")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tạo khóa học mới</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Tên khóa học</Label>
                <Field as={Input} name="courseName" />
                {touched.courseName && errors.courseName && (
                  <p className="text-red-500 text-sm">{errors.courseName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Giá</Label>
                <Field as={Input} name="coursePrice" type="number" />
                {touched.coursePrice && errors.coursePrice && (
                  <p className="text-red-500 text-sm">{errors.coursePrice}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Danh mục</Label>
                <Field
                  name="category"
                  as="select"
                  className="border rounded-md p-2 w-full"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                {touched.category && errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Mô tả khóa học</Label>
                <div className="border rounded-md p-2 min-h-[160px]">
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ảnh đại diện</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, setFieldValue)}
                  className="border rounded-md p-2"
                />
                {thumb && <img src={thumb} className="w-40 mt-2 rounded-md" />}
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Hủy
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Đang tải..." : "Tạo"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
