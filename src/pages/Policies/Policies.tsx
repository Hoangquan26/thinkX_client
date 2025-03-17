import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import styles from './styles.module.scss'
import { AccordionHeader } from '@radix-ui/react-accordion'
export default function Policies() {
    const { container, containerWrapper, title, mainContent } = styles
    return (
        <div className={container}>
        <div className={containerWrapper}>
          <h2 className={title}>Privacy Policy</h2>
          <div className={mainContent}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Data Usage</AccordionTrigger>
                <AccordionContent>
                    We collect your personal data such as names, emails, and payments solely to deliver and improve services.
                </AccordionContent>
              </AccordionItem>
  
              <AccordionItem value="item-2">
                <AccordionTrigger>Data Protection</AccordionTrigger>
                <AccordionContent>
                    All user data is encrypted to ensure confidentiality and security.
                </AccordionContent>
              </AccordionItem>
  
              <AccordionItem value="item-3">
                <AccordionTrigger>User Rights</AccordionTrigger>
                <AccordionContent>
                    You can request access or deletion of your data by contacting [support email].
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
       
        </div>

        <div className={containerWrapper}>
          <h2 className={title}>Refund Policy</h2>
          <div className={mainContent}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Eligibility</AccordionTrigger>
                <AccordionContent>
                    Refund requests must be submitted within [X days] after purchase.
                </AccordionContent>
              </AccordionItem>
  
              <AccordionItem value="item-2">
                <AccordionTrigger>Process</AccordionTrigger>
                <AccordionContent>
                    Approved refunds will be processed within [X days].
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
       
        </div>

        <div className={containerWrapper}>
          <h2 className={title}>Community Guidelines</h2>
          <div className={mainContent}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionHeader>
                    Be respectful to all users and instructors.
                </AccordionHeader>
              </AccordionItem>
  
              <AccordionItem value="item-2">
                <AccordionHeader>
                    ollow all course rules and refrain from sharing unauthorized content.
                </AccordionHeader>
              </AccordionItem>
            </Accordion>
          </div>
       
        </div>
      </div>
    )
}
