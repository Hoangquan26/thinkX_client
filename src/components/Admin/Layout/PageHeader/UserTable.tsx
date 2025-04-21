import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/features/user/user.slice";
import { RootState, AppDispatch } from "@/store/store";
import { IUser } from "@/interfaces/user.interface";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";

import { MoreHorizontal } from "lucide-react";
import EditUserDialog from "../UserManager/EditUserDialog";
import ConfirmBanDialog from "../UserManager/ConfirmBanDialog";

const limit = 10;

export default function UserTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, total, loading } = useSelector((state: RootState) => state.user);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [banOpen, setBanOpen] = useState(false);

  const users = data[page] || [];

  useEffect(() => {
    dispatch(fetchUsers({ page, limit, query, role, status }));
  }, [page, query, role, status]);

  const handleSearch = () => {
    setPage(1);
    dispatch(fetchUsers({ page: 1, limit, query, role, status }));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by email or username..."
          value={query}
          onChange={(e) => setQuery(e.target.value.toString())}
          className="w-full md:w-1/3"
        />
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL_ROLES">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL_ROLES">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Filter</Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>No users found</TableCell>
            </TableRow>
          ) : (
            users.map((user: IUser) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                <Badge className="capitalize px-2 py-1 text-xs bg-blue-50 text-blue-600 border border-blue-300">
                  {user.role}
                </Badge>

                </TableCell>
                <TableCell>
                  <Badge className={`text-xs ${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.isActive ? (
                    <span className="bg-green-500 px-4 py-1 rounded-2xl text-white font-semibold">Yes</span>
                  ) : (
                    <span className="px-4 py-1 rounded-2xl text-red-500 font-semibold">No</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setSelectedUser(user);
                        setEditOpen(true);
                      }}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedUser(user);
                        setBanOpen(true);
                      }}>Ban</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
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
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)))
              }
              className={page >= Math.ceil(total / limit) ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Dialogs */}
      {selectedUser && (
        <>
          <EditUserDialog open={editOpen} onClose={() => {
            setEditOpen(false)
            setSelectedUser(null);
          }} user={selectedUser} />
          <ConfirmBanDialog
            open={banOpen}
            onClose={() => {
              setSelectedUser(null);
              setBanOpen(false)
            }}
            user={selectedUser}
            onConfirm={() => {
              console.log("Banning user:", selectedUser);
              setBanOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}
