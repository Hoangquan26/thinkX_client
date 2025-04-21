import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICourse } from "@/interfaces/course.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface CourseTableProps {
  courses: ICourse[];
  loading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string, feedback: string) => void;
}

export function CourseTable({ courses, loading, onApprove, onReject }: CourseTableProps) {
  const [openReject, setOpenReject] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleOpenReject = (id: string) => {
    setRejectId(id);
    setOpenReject(true);
  };

  const handleConfirmReject = () => {
    if (rejectId) {
      onReject(rejectId, feedback);
      setOpenReject(false);
      setFeedback("");
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                No courses found.
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.instructor?.username || "-"}</TableCell>
                <TableCell>{course.category?.name || "-"}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onApprove(course._id)}>
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleOpenReject(course._id)}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Course</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason for rejection"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReject(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmReject}>Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
