import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate } from "react-router-dom"
import { Eye, Pencil, PlusCircle } from "lucide-react"
import courseService from "@/services/course.service"
import { CourseStatus } from "@/common/constants/courseStatus"
import CreateCourseDialog from "@/components/Instructor/CreateCourseDialog" 
import CourseDetailDialog from "@/components/Instructor/CourseDetailDialog"
import { ICourse } from "@/interfaces/course.interface"
import { ILesson } from "@/interfaces/lesson.interface"
import EditCourseDialog from "@/components/Instructor/EditCourseDialog"


export default function InstructorCourseManagerPage() {
    const [courses, setCourses] = useState<any[]>([])
    const [query, setQuery] = useState("")
    const [status, setStatus] = useState("ALL")
    const [loading, setLoading] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const navigate = useNavigate()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedCourseToEdit, setSelectedCourseToEdit] = useState<ICourse | null>(null)
    const handleOpenEdit = (course: ICourse) => {
        setSelectedCourseToEdit(course)
        setEditDialogOpen(true)
    }


    const [detailDialogOpen, setDetailDialogOpen] = useState(false)
        const [selectedDetail, setSelectedDetail] = useState<{
        course: ICourse
        lessons: ILesson[]
        enrolledCount: number
    } | null>(null)

    const handleOpenDetail = async (id: string) => {
        const res = await courseService.getCourseDetailByInstructor(id)
        setSelectedDetail(res.metadata)
        setDetailDialogOpen(true)
    }

    const fetchCourses = async () => {
        setLoading(true)
        try {
        const res = await courseService.getMyCourses()
        setCourses(res.metadata || res.metadata.data || [])
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [status, query])

    return (
        <div className="space-y-6 p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-between flex-wrap gap-4">
            <h2 className="text-xl font-semibold">Your Courses</h2>

            <div className="flex flex-wrap gap-2">
            <Input
                placeholder="Search by course name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64"
            />
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value={CourseStatus.DRAFT}>Draft</SelectItem>
                <SelectItem value={CourseStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={CourseStatus.PUBLISHED}>Published</SelectItem>
                <SelectItem value={CourseStatus.REJECTED}>Rejected</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={fetchCourses}>Search</Button>
            <Button variant="default" onClick={() => setOpenCreate(true)}>
                <PlusCircle className="w-4 h-4 mr-1" /> New Course
            </Button>
            </div>
        </div>

        <div className="border rounded-md overflow-auto">
            <Table>
            <TableHeader className="bg-gray-100">
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                        {[...Array(5)].map((_, j) => (
                        <TableCell key={j}>
                            <Skeleton className="h-5 w-full" />
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                : courses.map((course) => (
                    <TableRow key={course._id}>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>
                        <Badge variant="outline">{course.status}</Badge>
                        </TableCell>
                        <TableCell>${course.coursePrice}</TableCell>
                        <TableCell>{course.category?.name}</TableCell>
                        <TableCell className="text-right space-x-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDetail(course._id)}
                            >
                            <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenEdit(course)}
                            >
                            <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
            </TableBody>
            </Table>
        </div>

        <CreateCourseDialog open={openCreate} onClose={() => {
            setOpenCreate(false)
            fetchCourses()
        }} />

        {selectedDetail && (
        <CourseDetailDialog
            open={detailDialogOpen}
            onClose={() => setDetailDialogOpen(false)}
            data={selectedDetail}
        />
        )}

        {selectedCourseToEdit && (
        <EditCourseDialog
            open={editDialogOpen}
            onClose={() => {
                setEditDialogOpen(false)
                fetchCourses()
            }}
            data={selectedCourseToEdit}
            onRefresh={fetchCourses}
        />
        )}
        </div>
    )
}
