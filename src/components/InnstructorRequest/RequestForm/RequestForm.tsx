import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "sonner"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import MyRequest from "../MyRequest/MyRequest"
import InstructorService from "@/services/instructor.service"
import ISuccessResponse from "@/interfaces/ISuccessResponse"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router"
import { routerConfig } from "@/configs/router.config"
import { UserRole } from "@/common/constants/userRole"

const validationSchema = yup.object({
  description: yup.string().required("Please enter a description."),
})

export default function InstructorRequest() {
  const {user} = useAuth()
  const navigate = useNavigate()
  if(user.role !== UserRole.STUDENT) {
    navigate(routerConfig.instructor)
  }
  const [existingRequest, setExistingRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
        InstructorService.createRequest(values.description)
        .then((res) => {
            toast('Send instructor request successful!')
            console.log(res)
            setExistingRequest(res.metadata)
        })
        .finally(( ) => {
            setSubmitting(false)    
        })
    },
  })

  useEffect(() => {
    const checkRequest = async () => {
        InstructorService.getMyRequest()
        .then((res : ISuccessResponse) => {
            setExistingRequest(res.metadata)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    checkRequest()
  }, [])

  if (loading) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-xl space-y-8">
        {/* TRẠNG THÁI */}
        {existingRequest && (
         <MyRequest createdAt={existingRequest?.createdAt} description={existingRequest?.description}
            status={existingRequest?.status} feedback={existingRequest?.feedback}
         />
        )}
        {/* FORM */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full bg-white border border-gray-200 shadow-lg rounded-lg p-8 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Become an Instructor
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Submit your profile and credentials for instructor verification.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium text-sm text-gray-700">
              Tell us about your teaching experience
            </label>
            <Textarea
              id="description"
              rows={5}
              placeholder="E.g. I have 5 years of experience teaching web development..."
              {...formik.getFieldProps("description")}
              className="resize-none"
              disabled={!!existingRequest}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting || !!existingRequest}
            className="w-full text-base cursor-pointer"
          >
            {formik.isSubmitting
              ? "Submitting..."
              : existingRequest
              ? "Request already submitted"
              : "Submit Request"}
          </Button>
        </form>

        <>
        <div className="mt-6 p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-md text-sm text-gray-700 space-y-2 shadow-lg">
            <p className="font-semibold text-base">📌 Please Note Before Submitting:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Review Time:</strong> Your request will be reviewed within 1–3 working days.
              </li>
              <li>
                <strong>Required:</strong> A detailed teaching background is mandatory.
              </li>
              <li>
                <strong>Credentials:</strong> Make sure you can provide proof of your teaching expertise upon request.
              </li>
              <li>
                <strong>Benefits:</strong> As a ThinkX instructor, you can:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Publish courses and earn revenue.</li>
                  <li>Manage your students and course content.</li>
                  <li>Join a growing community of developers and educators in Vietnam.</li>
                </ul>
              </li>
            </ul>
          </div>
        </>

      </div>
    </div>
  )
}
