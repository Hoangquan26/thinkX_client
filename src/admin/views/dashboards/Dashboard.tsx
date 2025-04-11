import { Link } from 'react-router';
import BlogCards from '@/admin/components/dashboard/BlogCards';
import DailyActivity from '@/admin/components/dashboard/DailyActivity';
import NewCustomers from '@/admin/components/dashboard/NewCustomers';
import ProductRevenue from '@/admin/components/dashboard/ProductRevenue';
import { RevenueForecast } from '@/admin/components/dashboard/RevenueForecast';
import TotalIncome from '@/admin/components/dashboard/TotalIncome';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      <div className="lg:col-span-8 col-span-12">
        <RevenueForecast />
      </div>
      <div className="lg:col-span-4 col-span-12">
        <div className="grid grid-cols-12 h-full items-stretch">
          <div className="col-span-12 mb-30">
            <NewCustomers />
          </div>
          <div className="col-span-12">
            <TotalIncome />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 col-span-12">
        <ProductRevenue />
      </div>
      <div className="lg:col-span-4 col-span-12 flex">
        <DailyActivity />
      </div>
      <div className="col-span-12">
        <BlogCards />
      </div>
      <div className="flex justify-center align-middle gap-2 flex-wrap col-span-12 text-center">
        <p className="text-base">
          Design and Developed by{' '}
          <Link
            to="https://adminmart.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            adminmart.com
          </Link>
        </p>
        <p className="text-base">
          Distributed by
          <Link
            to="https://themewagon.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            ThemeWagon
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
