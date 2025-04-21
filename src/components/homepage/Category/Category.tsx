import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import classNames from 'classnames';
import styles from './styles.module.scss';
import categoryService from '@/services/category.service';

interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export default function CategoryCard() {
  const { container } = styles;
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryService.getAllPublic();
      setCategories(res.metadata || []);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className={classNames('pt-6', container)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular topics</h2>

        <div className="relative">
          <Carousel className="relative">
            <CarouselContent className="flex w-full">
              {categories.map((cat) => (
                <CarouselItem
                  key={cat._id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2"
                >
                  <div className="min-h-[80px] h-full w-full border px-6 py-4 rounded-xl shadow-sm hover:bg-red-600 hover:text-white transition-all text-base font-semibold text-center flex justify-center items-center">
                    {cat.name}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
