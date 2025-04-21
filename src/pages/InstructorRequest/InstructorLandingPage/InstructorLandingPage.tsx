import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function InstructorLandingPage() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-[#fdf5f5] px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Empowering Vietnamese Developers
            <br />
            With World-Class Programming Courses
          </h1>
          <p className="text-gray-700 text-lg">
            ThinkX is a Vietnamese-first platform built for passionate programmers. We bring industry-ready coding skills to everyone, from beginners to pros – all in Vietnamese, all in one place.
          </p>

          <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
            <li>Learn from top Vietnamese instructors</li>
            <li>Master full-stack web, mobile, and AI</li>
            <li>100% Vietnamese content for easy access</li>
            <li>Join thousands of learners nationwide</li>
          </ul>

          <div className="pt-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-base font-semibold cursor-pointer"
              onClick={() => navigate("/instructor-request")}
            >
              Become an Instructor
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/images/banner3.png"
            alt="ThinkX Banner"
            className="w-2/3 max-w-md md:max-w-lg rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
