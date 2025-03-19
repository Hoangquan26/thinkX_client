import { useState } from 'react';
import styles from './styles.module.scss';
import CartItem from '@/interfaces/cart.interface';
import CartTable from '@/components/CartTable/CartTable';
import { cartColumns } from '@/components/CartTable/CartColumn';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RoundedButton from '@/components/buttons/RoundedButton/RoundedButton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import classNames from 'classnames';

const initialCartItems: CartItem[] = [
  { id: 1, thumbnail: 'https://th.bing.com/th/id/OIP.pKHrMrDFDljIqlZLSJG7lgHaD4?rs=1&pid=ImgDetMain', product: 'Product 1', unitPrice: 10, quantity: 2 },
  { id: 2, thumbnail: 'https://th.bing.com/th/id/OIP.pKHrMrDFDljIqlZLSJG7lgHaD4?rs=1&pid=ImgDetMain', product: 'Product 2', unitPrice: 20, quantity: 1 },
  { id: 3, thumbnail: 'https://th.bing.com/th/id/OIP.pKHrMrDFDljIqlZLSJG7lgHaD4?rs=1&pid=ImgDetMain', product: 'Product 3', unitPrice: 15, quantity: 3 },
];

export default function CartPage() {
  const { container, contentWrapper, tableWrapper, checkoutWrapper, totalWrapper } = styles;
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const calculateTotal = (unitPrice: number, quantity: number) => {
    return unitPrice * quantity;
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + calculateTotal(item.unitPrice, item.quantity), 0);
  };



  return (
    <div className={container}>
      <div className={contentWrapper}>
        <div className={tableWrapper}>
          <CartTable columns={cartColumns} data={cartItems} />
        </div>
        <div className={checkoutWrapper}>
          <div className=' flex justify-between items-start'>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input className=' pt-4 pb-4' type="text" placeholder="Email" />
              <Button variant={'default'} className=' cursor-pointer'>APPLY COUPON</Button>
            </div>
            <div className={
              classNames(totalWrapper, {
                ' w-1/2 ml-auto': true
              })
            }>
              <Table className=' border rounded-md'>
                <TableBody>
                  <TableRow>
                      <TableCell>SubTotal</TableCell>
                      <TableCell></TableCell>
                  </TableRow>

                  <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button variant={'default'} className='w-full h-10 cursor-pointer'>CHECK OUT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
