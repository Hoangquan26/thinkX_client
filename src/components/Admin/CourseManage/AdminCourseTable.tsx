import { ICourse } from "@/interfaces/course.interface";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import EditCourseDialog from "./EditCourseDialog";

interface AdminCourseTableProps {
  courses: ICourse[];
  loading: boolean;
  onUpdate: (id: string, values: Partial<ICourse>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function AdminCourseTable({ courses, loading, onUpdate, onDelete }: AdminCourseTableProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const handleView = (course: ICourse) => {
    setSelectedCourse(course);
    setOpenDetail(true);
  };

  const handleEdit = (course: ICourse) => {
    setSelectedCourse(course);
    setOpenEdit(true);
  };

  const handleSaveEdit = async (values: Partial<ICourse>) => {
    if (selectedCourse) {
      try {
        await onUpdate(selectedCourse._id, values);
        setOpenEdit(false);
      } catch {
        // Không đóng nếu lỗi
      }
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}><Skeleton className="h-6 w-full" /></TableCell>
              </TableRow>
            ))
          ) : courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                No courses found.
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.instructor?.username || "-"}</TableCell>
                <TableCell>{course.category?.name || "-"}</TableCell>
                <TableCell className="capitalize text-xs font-semibold">{course.status}</TableCell>
                <TableCell>{format(new Date(course.createdAt || ""), "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleView(course)}>View</Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Course Detail</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4 text-sm">
              <div className="aspect-video rounded overflow-hidden border">
                <img
                  src={selectedCourse.courseThumb || "https://via.placeholder.com/800x450?text=No+Image"}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div><h4 className="text-xs mb-1">Tên khóa học</h4><p>{selectedCourse.courseName}</p></div>
              <div>
                <h4 className="text-xs mb-1">Mô tả</h4>
                <div className="prose" dangerouslySetInnerHTML={{ __html: selectedCourse.courseDescription || "<p>-</p>" }} />
              </div>
              <div className="flex flex-wrap gap-4">
                <div><h4 className="text-xs mb-1">Giảng viên</h4><p>{selectedCourse.instructor?.username || "-"}</p></div>
                <div><h4 className="text-xs mb-1">Thể loại</h4><p>{selectedCourse.category?.name || "-"}</p></div>
                <div><h4 className="text-xs mb-1">Trạng thái</h4><Badge>{selectedCourse.status}</Badge></div>
              </div>
              <div><h4 className="text-xs mb-1">Ngày tạo</h4><p>{format(new Date(selectedCourse.createdAt || ""), "dd/MM/yyyy")}</p></div>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenDetail(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedCourse && (
        <EditCourseDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          course={selectedCourse}
          onSubmit={handleSaveEdit}
          onDelete={async () => {
            await onDelete(selectedCourse._id);
            setOpenEdit(false);
          }}
        />
      )}
    </div>
  );
}
