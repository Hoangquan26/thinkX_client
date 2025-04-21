import { ICategory } from "@/interfaces/category.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface CategoryTableProps {
  categories: ICategory[];
  loading: boolean;
  onEdit: (category: ICategory) => void;
}

export default function CategoryTable({ categories, loading, onEdit }: CategoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{category.slug}</TableCell>
                <TableCell className="truncate max-w-[300px] text-sm">
                  {category.description || "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize text-xs ${
                      category.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {category.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(category.createdAt || ""), "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => onEdit(category)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
