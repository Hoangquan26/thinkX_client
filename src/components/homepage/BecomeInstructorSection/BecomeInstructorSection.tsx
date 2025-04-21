import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { routerConfig } from "@/configs/router.config"
import styles from './styles.module.scss'
import classNames from "classnames"
export default function BecomeInstructorSection() {
  const navigate = useNavigate()
  const { container } = styles
  const handleClick = () => {
    navigate(routerConfig.authenticate.user.instructorRequest)
  }

  return (
    <div className={classNames("w-full flex items-center justify-center")}>
      <section className={classNames(container, "bg-white py-12 border-t mt-16")}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left: Text content */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Teach the world online
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              Join our global instructor community and start sharing what you know.
              ThinkX gives you the tools to create engaging, interactive courses
              and reach thousands of learners worldwide. Whether you're a professional,
              educator, or passionate about a topic — there's a place for you here.
            </p>

            <Button
              onClick={handleClick}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm"
            >
              Become an instructor
            </Button>
          </div>

          {/* Right: Image */}
          <div className="flex-1 max-w-md">
            <img
              src="/images/banner1.png"
              alt="Teaching online"
              
              className="w-full rounded-lg object-cover h-[200px]"
            />
          </div>
        </div>
      </section>
    </div>
    
  )
}
