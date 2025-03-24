import classNames from 'classnames'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Separator } from '../ui/separator'
import styles from './styles.module.scss'
import { FaLock } from "react-icons/fa"
import { Button } from '../ui/button'
export default function CheckoutBill() {
  const { 
    contentWrapper, detailSide, checkoutSide, paymentWrapper, paymentWrapper__headear, checkoutRow, 
    accordion, accordion_content, accordion_trigger, defaultRow, marginItem } = styles
  return (
    <div className={contentWrapper}>
        <div className={detailSide}>
            <h2>Checkout</h2>
            <div className={paymentWrapper}>
                <div className={paymentWrapper__headear}>
                    <h3>Payment method</h3>
                    <span className={checkoutRow}>Secure and encrypted <FaLock/></span>
                </div>
                <RadioGroup defaultValue="comfortable">
                    <Accordion className={accordion} type="single" collapsible>
                        <AccordionItem value="card">
                            <AccordionTrigger className={accordion_trigger}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">Card</Label>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className={accordion_content}>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion className={accordion} type="single" collapsible>
                        <AccordionItem value="momo">
                            <AccordionTrigger className={accordion_trigger}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Momo</Label>
                            </div>
                            </AccordionTrigger>
                            <AccordionContent className={accordion_content}>
                            Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                
                </RadioGroup>
            </div>
        </div>

        <div className={checkoutSide}>
            <h2>Order summary</h2>

            <div className={checkoutRow}>
                <span>Original price: </span>
                <span>₫1,499,000</span>
            </div>
            <div className={checkoutRow}>
                <span>Discounts (80% Off): </span>
                <span>₫1,499,000</span>
            </div> 

            <Separator/>

            <div className={classNames(checkoutRow, defaultRow)}>
                <h4>Total (1 course): </h4>
                <h4>₫299,000</h4>
            </div> 

            <div className={marginItem}></div>
            <Button className='w-full cursor-pointer' variant={'default'}>Pay ₫299,000</Button>
        </div>

    </div>
  )
}
