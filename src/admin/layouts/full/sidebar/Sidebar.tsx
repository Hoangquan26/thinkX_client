import SimpleBar from 'simplebar-react';
import FullLogo from '../shared/logo/FullLogo';
import NavItems from './NavItems';
import SidebarContent from './Sidebaritems';
import { Sidebar } from 'flowbite-react';

const SidebarLayout = () => {
  return (
    <>
      <div className="xl:block hidden">
        <Sidebar
          className="fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 "
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="px-6 py-4 flex items-center">
            <FullLogo />
          </div>
          <Sidebar aria-label="Sidebar navigation">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {SidebarContent &&
                  SidebarContent.map((item) => (
                    <div className="mb-4" key={item.heading}>
                      <h5 className="text-link dark:text-white/70 font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                        {item.heading}
                      </h5>
                      {item.children?.map((child) => (
                        <Sidebar.Item key={child.id} href={child.href}>
                          {child.label}
                        </Sidebar.Item>
                      ))}
                    </div>
                  ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarLayout;
