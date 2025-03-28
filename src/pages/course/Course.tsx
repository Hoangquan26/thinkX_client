import styles from './styles.module.scss'



//initial constant
import { AllCourses, CourseFilter } from './constant/courseConstant'

//import component
import { IoFilterOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import classNames from 'classnames';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import HorizontalCourse from '@/components/HorizontalCourse/HorizontalCourse';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
export default function Course() {
    //styles
    const { container, contentWrapper, filterWrapper, courseContainer,filterTitle, isOpenFilter, functionContent, mainContent } = styles
    //use Hook
    const [openFilter, setOpenFilter] = useState(true)
    const [filters, setFilters] = useState([])

    //handle event function
    const handleToggleFilter = () => {
        setOpenFilter(prev => !prev)
    }

    const handleFilterSelection = () => {

    }

    console.log(openFilter)
    return (
    <div className={container}> 
        <div className={contentWrapper}>
            <div className={functionContent}>
                <Button onClick={handleToggleFilter} className=' w-full cursor-pointer' variant={'outline'}>
                    <span>Filter</span>
                    <IoFilterOutline/>
                </Button>
            </div>
            <div className={mainContent}>
                <div className={classNames(filterWrapper, {
                    [isOpenFilter]: openFilter
                })}>
                   
                    {
                        CourseFilter && CourseFilter.map((item, key) => {
                            const itemData = item.value
                            
                            const dataElement = itemData.map((dataItem, dataKey) => (
                                <div key={dataKey} className="flex items-center space-x-2 mb-4 w-full">
                                    <RadioGroupItem value={dataItem.value} id={dataItem.name} />
                                    <Label className=' font-normal' htmlFor={dataItem.name}>{dataItem.name}</Label>
                                </div>
                            )) 

                            return <div key={key}>
                                <Separator/>
                                <Collapsible defaultOpen={true} className=' w-full pt-2 pb-2'>
                                    <RadioGroup defaultValue="comfortable">
                                        <CollapsibleTrigger className={classNames(filterTitle, ' flex items-center justify-between')}>
                                            <h3>{item.name}</h3>
                                            <MdKeyboardArrowDown/>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {dataElement}
                                        </CollapsibleContent>
                                    </RadioGroup>
                                </Collapsible>
                            </div>
                        })
                    }
                
                </div>
                <div className={courseContainer}>
                    {
                        AllCourses && AllCourses.map((item, index) => (
                            <>
                                {index >= 1 && <Separator/>}
                                <HorizontalCourse key={item._id} course={item}/>           
                            </>
                        ))
                    }
                </div>
            </div>           
        </div>
    </div>
  )
}
