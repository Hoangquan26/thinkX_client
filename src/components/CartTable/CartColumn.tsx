import { ColumnDef } from '@tanstack/react-table'
import ICartItem from '@/interfaces/cart.interface'
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export const cartColumns: ColumnDef<ICartItem>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Thumbnail',
    cell: ({ row }) => (
      <img src={row.original.thumbnail} alt={row.original.product} className={' object-center object-cover w-[50px] h-[50px]'} />
    ),
  },
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => <span className={' font-medium'}> {row.original.product}</span>,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => row.original.quantity,
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => `$${row.original.unitPrice.toFixed(2)}`,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => `$${(row.original.unitPrice * row.original.quantity).toFixed(2)}`,
  },
  {
    id: 'actions',
    accessorKey: 'action',
    header: 'Action',
    cell: ({row}) => {
        const product = row.original
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(product.id.toString())}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  },
]