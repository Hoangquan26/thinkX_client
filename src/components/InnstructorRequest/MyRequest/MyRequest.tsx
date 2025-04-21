import { IInstructorRequest } from "@/interfaces/models/instructor-request.interface"

const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600"
      case "REJECTED":
        return "text-red-600"
      default:
        return "text-yellow-500"
    }
  }

export default function MyRequest(instructor : IInstructorRequest) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow px-6 py-5 space-y-3 text-sm text-gray-700">
    <h3 className="text-lg font-bold">Your instructor Request Status</h3>

    <div>
      <strong>Status:</strong>{" "}
      <span className={`font-semibold ${getStatusColor(instructor?.status || "")}`}>
        {instructor?.status}
      </span>
    </div>

    <div>
      <strong>Description:</strong>
      <p className="mt-1">{instructor?.description || ""}</p>
    </div>

    {instructor?.feedback && (
      <div>
        <strong>Admin Feedback:</strong>
        <p className="mt-1 text-gray-800">{instructor?.feedback || ""}</p>
      </div>
    )}

    <div>
      <strong>Send Request At:</strong>{" "}
      {new Date(instructor?.createdAt || "").toLocaleString()}
    </div>
  </div>
  )
}
