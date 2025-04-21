import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryTable from "@/components/Admin/CategoryManager/CategoryTable";
import EditCategoryDialog from "@/components/Admin/CategoryManager/EditCategoryDialog";
import CreateCategoryDialog from "@/components/Admin/CategoryManager/CreateCategoryDialog";
import categoryService from "@/services/category.service";
import { toast } from "sonner";
import { ICategory } from "@/interfaces/category.interface";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const promise = categoryService.getAdminPaginated(page, limit, search, status);
    await toast.promise(promise, {
      loading: "Loading category list...",
      success: (res) => {
        setCategories(res.metadata.data);
        setTotalPages(res.metadata.pagination.totalPages);
        return "Category list loaded successfully";
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [page, status, search]);

  const handleUpdateCategory = async (values: Partial<ICategory>) => {
    if (!selectedCategory) return;

    const promise = categoryService.update(selectedCategory._id, values);
    await toast.promise(promise, {
      loading: "Updating category...",
      success: () => {
        fetchCategories();
        return "Category updated successfully";
      },
    });
  };

  const handleCreateCategory = async (values: {
    name: string;
    description?: string;
    status: string;
  }) => {
    const promise = categoryService.create(values);
    await toast.promise(promise, {
      loading: "Creating category...",
      success: () => {
        fetchCategories();
        return "Category created successfully";
      },
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-xl font-semibold">Category Manager</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-64"
          />
          <Select
            value={status}
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setOpenCreate(true)}>+ Create</Button>
        </div>
      </div>

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={(cat) => {
          setSelectedCategory(cat);
          setOpenEdit(true);
        }}
      />

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {selectedCategory && (
        <EditCategoryDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          category={selectedCategory}
          onSubmit={handleUpdateCategory}
        />
      )}

      <CreateCategoryDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
}
