import Banner from "@/components/homepage/Banner/Banner";
import BecomeInstructorSection from "@/components/homepage/BecomeInstructorSection/BecomeInstructorSection";
import Category from "@/components/homepage/Category/Category";
import HomeCourse from "@/components/homepage/HomeCourse/HomeCourse";
import TopRatedCoursesSection from "@/components/homepage/TopRatedCoursesSection/TopRatedCoursesSection";
import TrendingCoursesSection from "@/components/homepage/TrendingCoursesSection/TrendingCoursesSection";



export default function HomePage() {
  return (
    <div>
      <Banner/>
      <Category/>
      <HomeCourse/>
      <TopRatedCoursesSection/>
      <TrendingCoursesSection />
      <BecomeInstructorSection/>
    </div>
  )
}
