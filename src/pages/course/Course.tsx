import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IoFilterOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import classNames from 'classnames';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import HorizontalCourse from '@/components/HorizontalCourse/HorizontalCourse';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import courseService from '@/services/course.service';
import { ICourse } from '@/interfaces/course.interface';
import { toast } from 'sonner';
import { CourseFilter } from './constant/courseConstant';

export default function CoursePage() {
  const {
    container, contentWrapper, filterWrapper, courseContainer,
    filterTitle, isOpenFilter, functionContent, mainContent
  } = styles;

  const [openFilter, setOpenFilter] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const limit = 6;

  const fetchCourses = async () => {
    try {
      const res = await courseService.getAllPublicCourses({ page, limit, query });
      setCourses(res.metadata.data);
      setTotalPages(res.metadata.pagination.totalPages);
    } catch (err) {
      toast.error('Failed to load courses');
    }
  };

  const handleToggleFilter = () => setOpenFilter(prev => !prev);

  useEffect(() => {
    fetchCourses();
  }, [query, page]);

  return (
    <div className={container}>
      <div className={contentWrapper}>
        <div className={functionContent}>
          <Input
            placeholder="Search courses..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Button onClick={handleToggleFilter} className="w-full cursor-pointer mt-2" variant="outline">
            <span>Filter</span>
            <IoFilterOutline />
          </Button>
        </div>

        <div className={mainContent}>
          <div className={classNames(filterWrapper, { [isOpenFilter]: openFilter })}>
            {CourseFilter.map((item, key) => (
              <div key={key}>
                <Separator />
                <Collapsible defaultOpen className="w-full pt-2 pb-2">
                  <RadioGroup defaultValue="comingsoon">
                    <CollapsibleTrigger className={classNames(filterTitle, 'flex justify-between items-center')}>
                      <h3>{item.name}</h3>
                      <MdKeyboardArrowDown />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-sm text-gray-500 italic mt-2">Coming soon...</p>
                    </CollapsibleContent>
                  </RadioGroup>
                </Collapsible>
              </div>
            ))}
          </div>

          <div className={courseContainer}>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <div className=' w-full' key={course._id}>
                  {index >= 1 && <Separator className="my-4" />}
                  <HorizontalCourse course={course} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No courses found.</p>
            )}
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
