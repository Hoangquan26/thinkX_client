import { Outlet, useLocation } from 'react-router';
import styles from './styles.module.scss';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';

export default function LayoutUser() {
  const { container, layoutHead, title } = styles;
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log(pathnames)
  return (
    <>
      <div className={container}>
        <div className={layoutHead}>
          <h2 className={title}>{pathnames[pathnames.length - 1].toUpperCase()}</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                  <React.Fragment key={to}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={to}>{value}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Outlet />
    </>
  );
}
