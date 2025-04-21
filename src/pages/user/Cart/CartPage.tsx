import { useEffect, useState } from "react";
import { ICourse } from "@/interfaces/course.interface";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";
import styles from "./styles.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import classNames from "classnames";
import { routerConfig } from "@/configs/router.config";
import { useNavigate } from "react-router";

export default function CartPage() {
  const { container, contentWrapper, tableWrapper, checkoutWrapper, totalWrapper } = styles;
  const navigate = useNavigate(); 
  const [cartItems, setCartItems] = useState<ICourse[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCartDetail = async () => {
    try {
      const res = await cartService.getCartAmount();
      setCartItems(res.metadata?.cartItems || []);
      setTotalPrice(res.metadata?.totalPrice || 0);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartDetail();
  }, []);

  return (
    <div className={container}>
      <div className={contentWrapper}>
        {/* CART LIST */}
        <div className={tableWrapper}>
          <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

          {loading ? (
            <p className="text-gray-500">Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is currently empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center gap-4 border border-gray-200 p-4 rounded-md shadow-sm"
                >
                  <img
                    src={course.courseThumb}
                    className="w-20 h-14 object-cover rounded-md"
                    alt={course.courseName}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{course.courseName}</h3>
                    <p className="text-sm text-muted-foreground">{course.slug}</p>
                  </div>
                  <div className="text-right font-semibold text-red-600 text-base">
                    {course.coursePrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CHECKOUT */}
        <div className={checkoutWrapper}>
          <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
            {/* Coupon Input (Disabled) */}
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                className="pt-4 pb-4"
                type="text"
                placeholder="Enter coupon code (Coming soon)"
                disabled
              />
              <Button variant="outline" className="cursor-not-allowed" disabled>
                Apply
              </Button>
            </div>

            {/* Summary */}
            <div
              className={classNames(totalWrapper, {
                "w-full sm:w-1/2": true,
              })}
            >
              <Table className="border rounded-md mb-4">
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell className="text-right">
                      {totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="default"
                className="w-full h-10 bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => navigate(routerConfig.authenticate.user.checkout)} 
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
