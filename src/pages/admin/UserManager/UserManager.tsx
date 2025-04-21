
import PageHeader from "@/components/Admin/Layout/PageHeader/PageHeader";
import UserTable from "@/components/Admin/Layout/PageHeader/UserTable";
import AdminLayout from "@/pages/layout/Admin.layout";

export default function UserManager() {
  return (
    <>
      <PageHeader title="User Manager" />
      <UserTable />
    </>
  );
}