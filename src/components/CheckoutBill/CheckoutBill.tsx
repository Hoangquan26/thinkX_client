import classNames from "classnames";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { FaLock } from "react-icons/fa";
import { Button } from "../ui/button";
import styles from "./styles.module.scss";
import { ICourse } from "@/interfaces/course.interface";
import { toast } from "sonner";
import checkoutService from "@/services/checkout.service";
import { useNavigate } from "react-router";
import { routerConfig } from "@/configs/router.config";

interface Props {
  courses: ICourse[];
  totalPrice: number;
}

export default function CheckoutBill({ courses, totalPrice }: Props) {
    const navigate = useNavigate()
    const {
        contentWrapper,
        detailSide,
        checkoutSide,
        paymentWrapper,
        paymentWrapper__headear,
        checkoutRow,
        accordion,
        accordion_content,
        accordion_trigger,
        defaultRow,
        marginItem,
    } = styles;

  const handleDevCheckout = async () => {
    const res = await checkoutService.confirmCheckout();
    toast.success("Checkout successful!");
    navigate(routerConfig.authenticate.user.thanks);
   
  };

  return (
    <div className={contentWrapper}>
      <div className={detailSide}>
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* List of courses */}
        <div className="space-y-4 mb-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex items-center gap-4 border p-3 rounded-md bg-white"
            >
              <img
                src={course.courseThumb}
                className="w-20 h-14 object-cover rounded-md"
                alt={course.courseName}
              />
              <div className="flex-1">
                <h3 className="font-medium">{course.courseName}</h3>
                <p className="text-sm text-muted-foreground">{course.slug}</p>
              </div>
              <div className="text-right font-semibold text-red-600">
                {course.coursePrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Payment method */}
        <div className={paymentWrapper}>
          <div className={paymentWrapper__headear}>
            <h3 className="text-lg font-semibold">Payment method</h3>
            <span className={checkoutRow}>
              Secure and encrypted <FaLock />
            </span>
          </div>

          <RadioGroup defaultValue="card">
            <Accordion className={accordion} type="single" collapsible>
              <AccordionItem value="card">
                <AccordionTrigger className={accordion_trigger}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="r1" />
                    <Label htmlFor="r1">Card</Label>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={accordion_content}>
                  Payment with Visa/MasterCard is currently under development.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion className={accordion} type="single" collapsible>
              <AccordionItem value="momo">
                <AccordionTrigger className={accordion_trigger}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="momo" id="r2" />
                    <Label htmlFor="r2">Momo</Label>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={accordion_content}>
                  Payment via Momo is coming soon.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </RadioGroup>
        </div>
      </div>

      {/* Order summary */}
      <div className={checkoutSide}>
        <h2 className="text-xl font-bold mb-4">Order summary</h2>

        <div className={checkoutRow}>
          <span>Original price: </span>
          <span>
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>

        <div className={checkoutRow}>
          <span>Discounts: </span>
          <span>$0</span>
        </div>

        <Separator className="my-4" />

        <div className={classNames(checkoutRow, defaultRow)}>
          <h4>
            Total ({courses.length} course{courses.length > 1 ? "s" : ""}):
          </h4>
          <h4 className="text-red-600">
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h4>
        </div>

        <div className={marginItem}></div>

        <Button
          className="w-full bg-gray-400 text-white font-semibold cursor-not-allowed"
          disabled
        >
          Pay {totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Button>

        <p className="text-xs text-center mt-2 text-muted-foreground">
          *Payment integration coming soon.
        </p>

        {/* Dev Checkout */}
        <Button
          onClick={handleDevCheckout}
          variant="outline"
          className="w-full mt-4 border-dashed"
        >
          Dev Checkout (No Payment)
        </Button>
      </div>
    </div>
  );
}
