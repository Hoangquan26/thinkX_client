import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import styles from './styles.module.scss'
export default function CheckoutBill() {
  const { container, title, contentWrapper } = styles
  return (
    <div className={container}>
        <h3 className={title}>Your order</h3>
        <div className={contentWrapper}>
            <Table className={' border p-6 rounded-md'}>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* start render product from cart */}
                    <TableRow>
                        <TableCell>Vestibulum suscipit × 1</TableCell>
                        <TableCell>$165.00</TableCell>
                    </TableRow>
                    {/* end render product from cart */}
                    <TableRow>
                        <TableCell>Sub total</TableCell>
                        <TableCell>$165.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell><h4>$165.00</h4></TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
