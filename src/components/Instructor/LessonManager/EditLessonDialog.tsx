// components/Instructor/EditLessonDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ILesson } from "@/interfaces/lesson.interface"
import lessonService from "@/services/lesson.service"
import uploadService from "@/services/cloudiinary.service"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Trash } from "lucide-react"

export default function EditLessonDialog({
    open,
    onClose,
    lesson,
    onRefresh
    }: {
    open: boolean
    lesson: ILesson
    onClose: () => void
    onRefresh: () => void
}) {
    const [title, setTitle] = useState(lesson.lessonTitle)
    const [description, setDescription] = useState(lesson.description)
    const [videoUrl, setVideoUrl] = useState(lesson.videoUrl)
    const [isPreview, setIsPreview] = useState(lesson.isPreview)
    const [order, setOrder] = useState(lesson.order)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTitle(lesson.lessonTitle)
        setDescription(lesson.description)
        setVideoUrl(lesson.videoUrl)
        setIsPreview(lesson.isPreview)
        setOrder(lesson.order)
    }, [lesson])

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {
        setLoading(true)
        const result = await uploadService.uploadVideo(file)
        setVideoUrl(result.secure_url)
        toast.success("Tải video thành công")
        } catch (err) {
        toast.error("Tải video thất bại")
        } finally {
        setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!title || !videoUrl) {
        toast.error("Vui lòng nhập đủ tiêu đề và video")
        return
        }

        toast.promise(lessonService.updateLesson(lesson._id, {
            lessonTitle: title,
            description,
            videoUrl,
            isPreview,
            order
        }), {
            loading: "Đang cập nhật bài học...",
            success: () => {
                onClose()
                onRefresh()
                return "Cập nhật bài học thành công"
            },
        })      
    }

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc chắn muốn xóa bài học này không?")) return
        try {
        await lessonService.deleteLesson(lesson._id)
        toast.success("Đã xóa bài học")
        onClose()
        onRefresh()
        } catch (err) {
        toast.error("Xóa bài học thất bại")
        }
    }

return (
    <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-3xl">
        <DialogHeader>
        <DialogTitle>✏️ Chỉnh sửa bài học</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
        <div className="space-y-2">
            <Label>Tiêu đề</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề bài học..." />
        </div>

        <div className="space-y-2">
            <Label>Mô tả</Label>
            <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Thêm mô tả chi tiết..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label>Thứ tự (Order)</Label>
            <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>

            <div className="flex items-center gap-3 mt-6">
            <Switch id="preview" checked={isPreview} onCheckedChange={setIsPreview} />
            <Label htmlFor="preview">Cho phép xem trước</Label>
            </div>
        </div>

        <div className="space-y-2">
            <Label>Video bài học</Label>
            <Input type="file" onChange={handleVideoUpload} accept="video/*" />
            {videoUrl && (
            <video src={videoUrl} className="w-full max-h-[300px] mt-2 rounded-md border shadow-sm" controls />
            )}
        </div>
        </div>

        <DialogFooter className="pt-6 flex justify-between">
        <Button variant="destructive" onClick={handleDelete}>
            <Trash className="w-4 h-4 mr-1" /> Xóa
        </Button>
        <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>Hủy</Button>
            <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
            </Button>
        </div>
        </DialogFooter>
    </DialogContent>
    </Dialog>
)
}
  