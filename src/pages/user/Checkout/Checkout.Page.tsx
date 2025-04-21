import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CheckoutBill from "@/components/CheckoutBill/CheckoutBill";
import { ICourse } from "@/interfaces/course.interface";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { container, contentWrapper } = styles;

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await cartService.getCartAmount();
      setCourses(res.metadata.cartItems);
      setTotalPrice(res.metadata.totalPrice);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (courses.length === 0) return <div className="p-6 text-center">Your cart is empty.</div>;

  return (
    <div className={container}>
      <div className={contentWrapper}>
        <CheckoutBill courses={courses} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
