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
    header: () => <div className="text-center font-medium">Thumbnail</div>,
    cell: ({ row }) => (
      <div className=' flex justify-center'>
        <img src={row.original.thumbnail} alt={row.original.product} className={' object-center object-cover w-[50px] h-[50px]'} />
      </div>
    ),
  },
  {
    accessorKey: 'product',
    header: () => <div className="text-center font-medium">Product</div>,
    cell: ({ row }) => <p className={'text-center font-medium'}> {row.original.product}</p>,
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-center font-medium">Quantity</div>,
    cell: ({ row }) =>  {
      return <div className="text-center font-medium">{row.original.quantity}</div>
    },
  },
  {
    accessorKey: 'unitPrice',
    header: () => <div className="text-center font-medium">Price</div>,
    cell: ({ row }) => <p className=' text-center font-medium'>{`$${row.original.unitPrice.toFixed(2)}`}</p>,
  },
  {
    accessorKey: 'total',
    header: () => <div className="text-center font-medium">Total</div>,
    cell: ({ row }) => <p className=' text-center font-medium'>{`$${(row.original.unitPrice * row.original.quantity).toFixed(2)}`}</p>,
  },
  {
    id: 'actions',
    accessorKey: 'action',
    header: () => <div className="text-center font-medium">Action</div>,
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
                    onClick={() => navigator.clipboard.writeText(product.id.toString())}>
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