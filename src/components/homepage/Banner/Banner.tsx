'use client'



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import classNames from "classnames"
import styles from './styles.module.scss'
import { useAuth } from "@/hooks/useAuth"


const slides = [
  {
    title: "Chậm mà chắc",
    description: (
      <>
        Cố gắng học chỉ 5–10 phút mỗi ngày.{" "}
        <a href="#" className="underline text-purple-700">
          Tiếp tục hoàn thành khóa học
        </a>{" "}
        và phát huy tối đa tiềm năng của bạn.
      </>
    ),
    image: '/images/banner1.png',
  },
  {
    title: "Học mỗi ngày",
    description: "Kiên trì là chìa khoá để thành công trong học tập.",
    image: '/images/banner2.png',
  },
]

export default function BannerCarousel() {
    const { user, isLoggedIn } = useAuth()
    const { container } = styles
    return (
        <div className=" w-full flex items-center justify-center">
            <div className={classNames(container,{
                "bg-white pt-6": true
            })}>
            {
                isLoggedIn ? <>
                  {/* Greeting */}
                <div className="flex items-center mb-6">
                    <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                        {user?.email[0].toUpperCase()}
                    </div>
                    <div>
                    <h2 className="font-bold text-lg">Welcome {user?.email}</h2>
                    <a href="#" className="text-sm text-red-700 underline">
                        Join our team
                    </a>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel className="bg-teal-200 rounded-lg p-4 relative">
                    <CarouselContent>
                    {slides.map((slide, i) => (
                        <CarouselItem key={i}>
                        <div className="relative h-full min-h-[250px] md:min-h-[300px] flex items-center justify-between px-4">
                        {/* Content box nổi */}
                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg z-10 relative">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                            <p className="text-gray-800 text-md">{slide.description}</p>
                        </div>
                    
                        {/* Image bên phải */}
                        <div className="hidden md:flex items-center justify-center">
                            <img
                            src={slide.image}
                            alt="Slide image"
                            width={500}
                            height={500}
                            className="object-contain"
                            />
                        </div>
                        </div>
                    </CarouselItem>
                    ))}
                    </CarouselContent>

                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
                </> :
                <div className="bg-gray-200 rounded-lg p-4 relative">
                
                    <div className="relative h-full min-h-[250px] md:min-h-[300px] flex items-center justify-between px-4">
                    {/* Content box nổi */}
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg z-10 relative">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Jump into learning for less</h3>
                        <p className="text-gray-800 text-md">Create account to use out service</p>
                    </div>
                
                    {/* Image bên phải */}
                    <div className=" hidden md:flex items-center justify-center">
                        <img
                        src={'/images/banner.png'}
                        alt="Slide image"
                        width={500}
                        height={500}
                        className="object-contain"
                        />
                    </div>
                    </div>
                </div>
            }


            </div>
        </div>
    )
}
