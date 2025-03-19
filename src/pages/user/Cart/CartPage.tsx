import { useState } from 'react';
import styles from './styles.module.scss';
import CartItem from '@/interfaces/cart.interface';
import CartTable from '@/components/CartTable/CartTable';
import { cartColumns } from '@/components/CartTable/CartColumn';

const initialCartItems: CartItem[] = [
  { id: 1, thumbnail: 'https://th.bing.com/th/id/OIP.pKHrMrDFDljIqlZLSJG7lgHaD4?rs=1&pid=ImgDetMain', product: 'Product 1', unitPrice: 10, quantity: 2 },
  { id: 2, thumbnail: 'https://th.bing.com/th/id/OIP.pKHrMrDFDljIqlZLSJG7lgHaD4?rs=1&pid=ImgDetMain', product: 'Product 2', unitPrice: 20, quantity: 1 },
  { id: 3, thumbnail: 'https://th.bing.com/th/id/OIP.pKHrMrDFDljIqlZLSJG7lgHaD4?rs=1&pid=ImgDetMain', product: 'Product 3', unitPrice: 15, quantity: 3 },
];

export default function CartPage() {
  const { container, contentWrapper } = styles;
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = (unitPrice: number, quantity: number) => {
    return unitPrice * quantity;
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + calculateTotal(item.unitPrice, item.quantity), 0);
  };



  return (
    <div className={container}>
      <div className={contentWrapper}>
        <CartTable columns={cartColumns} data={cartItems} />
        <div>
          <h3>Grand Total: ${calculateGrandTotal().toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}
