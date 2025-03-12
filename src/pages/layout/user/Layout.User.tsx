import { Outlet, useLocation } from 'react-router'
import styles from './styles.module.scss'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'

export default function LayoutUser() {
  const { container, layoutHead, title } = styles  
  const location = useLocation()
  console.log(location)
  return (
   <>
      <div className={container}>
          <div className={layoutHead}>
            <h2 className={title}>{location.pathname}</h2>
            <Breadcrumb>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            </Breadcrumb>
          </div>

      </div>
      <Outlet></Outlet>
    </>
  )
}
