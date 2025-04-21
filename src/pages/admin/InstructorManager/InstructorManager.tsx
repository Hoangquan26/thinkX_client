import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Input
} from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import instructorService from "@/services/instructor.service"
import { IInstructorRequest } from "@/interfaces/instructor-request.interface"
import { Check, X } from "lucide-react"

export default function InstructorRequestManager() {
  const [requests, setRequests] = useState<IInstructorRequest[]>([])
  const [status, setStatus] = useState("ALL")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchRequests = async () => {
    setLoading(true)
    toast.promise(instructorService.getAll({ status, query }), {
      loading: 'Loading instructor requests...',
      success: (res) => {
        const data = Array.isArray(res.metadata) ? res.metadata : []
        setRequests(data)
        return "Loaded successfully"
      },
      error: () => "Failed to get requests",
      finally: () => setLoading(false)
    })
  }

  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        await instructorService.approve(id)
        toast.success("Approved successfully!")
      } else {
        await instructorService.reject(id)
        toast.success("Rejected successfully!")
      }
      fetchRequests()
    } catch (err: any) {
      toast.error("Action failed!")
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [status, query])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Instructor Requests</h2>

        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Search by email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-60"
          />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchRequests} className="bg-red-600 hover:bg-red-700 text-white">
            Search
          </Button>
        </div>
      </div>

      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="min-w-[120px]">Username</TableHead>
              <TableHead className="min-w-[200px]">Email</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  {[...Array(5)].map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                  No requests found.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>{req.userId?.username}</TableCell>
                  <TableCell>{req.userId?.email}</TableCell>
                  <TableCell className="text-sm text-gray-700">{req.description}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        req.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : req.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  {
                    req.status === 'pending' && 
                    <TableCell className="text-center space-x-2">
                      <Button
                        variant="outline"
                        disabled={req.status !== "pending"}
                        className="text-green-600 border-green-600 hover:bg-green-50 cursor-pointer"
                        onClick={() => handleAction(req._id, "approve")}
                      >
                        <Check className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        disabled={req.status !== "pending"}
                        className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
                        onClick={() => handleAction(req._id, "reject")}
                      >
                        <X className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </TableCell>
                  }
                  
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
