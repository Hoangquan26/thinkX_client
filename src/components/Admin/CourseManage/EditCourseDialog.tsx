import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICourse } from "@/interfaces/course.interface";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Badge } from "@/components/ui/badge";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import uploadService from "@/services/cloudiinary.service";
import { toast } from "sonner";

interface EditCourseDialogProps {
  open: boolean;
  onClose: () => void;
  course: ICourse;
  onSubmit: (data: any) => Promise<void>;
  onDelete: () => void;
}

const EditSchema = Yup.object().shape({
  courseName: Yup.string().required("Tên không được để trống"),
  coursePrice: Yup.number().min(0).required("Giá bắt buộc"),
  courseThumb: Yup.string().url("Phải là URL hợp lệ"),
});

export default function EditCourseDialog({
  open,
  onClose,
  course,
  onSubmit,
  onDelete,
}: EditCourseDialogProps) {
  const [selectedCourse, setSelectedCourse] = useState<ICourse>(course);
  const [thumbPreview, setThumbPreview] = useState(course.courseThumb);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: course.courseDescription || "",
  });

  // Mỗi lần mở hoặc course thay đổi → reset content & state
  useEffect(() => {
    if (open && course) {
      setSelectedCourse(course);
      setThumbPreview(course.courseThumb);
      if (editor) {
        editor.commands.setContent(course.courseDescription || "");
      }
    }
  }, [course, open, editor]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const res = await uploadService.uploadImage(file);
        setFieldValue("courseThumb", res.secure_url);
        setThumbPreview(res.secure_url);
      } catch (err) {
        console.error("Upload error", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Chỉnh sửa khóa học
          </DialogTitle>
        </DialogHeader>

        <div className="aspect-video rounded overflow-hidden border mb-4">
          <img
            src={
              thumbPreview || "https://via.placeholder.com/800x450?text=No+Image"
            }
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        <Formik
          initialValues={{
            courseName: selectedCourse.courseName || "",
            coursePrice: selectedCourse.coursePrice || 0,
            courseThumb: selectedCourse.courseThumb || "",
          }}
          validationSchema={EditSchema}
          enableReinitialize
          onSubmit={async (values) => {
            try {
              setIsSubmitting(true);
              await onSubmit({
                ...values,
                courseDescription: editor?.getHTML() || "",
              });
              onClose();
            } catch (error) {
              toast.error("Cập nhật thất bại");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên khóa học</label>
                <Field name="courseName" as={Input} />
                {errors.courseName && touched.courseName && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.courseName}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Giá</label>
                <Field name="coursePrice" type="number" as={Input} />
                {errors.coursePrice && touched.coursePrice && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.coursePrice}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Ảnh thumbnail</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mô tả</label>
                <div className="border rounded-md p-2 bg-white">
                  <EditorContent
                    editor={editor}
                    className="prose max-w-none min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-muted-foreground text-xs mb-1">
                    Trạng thái
                  </h4>
                  <Badge className="capitalize">{selectedCourse.status}</Badge>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-xs mb-1">
                    Giảng viên
                  </h4>
                  <p className="text-sm font-medium">
                    {selectedCourse.instructor?.username || "-"}
                  </p>
                </div>
              </div>

              <DialogFooter className="pt-4 justify-between">
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Đang xóa..." : "Xóa khóa học"}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" type="button" onClick={onClose}>
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploading || isSubmitting}
                  >
                    {isUploading
                      ? "Đang tải ảnh..."
                      : isSubmitting
                      ? "Đang lưu..."
                      : "Lưu thay đổi"}
                  </Button>
                </div>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
