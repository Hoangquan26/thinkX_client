import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import styles from './styles.module.scss'
export default function Terms() {
  const { container,containerWrapper, title, mainContent } = styles
  return (
    <div className={container}>
      <div className={containerWrapper}>
        <h2 className={title}>Terms and Conditions</h2>
        <div className={mainContent}>
          <Accordion type="multiple" >
            <AccordionItem value="item-1">
              <AccordionTrigger>Acceptance of Terms</AccordionTrigger>
              <AccordionContent>
                By using our platform, you agree to adhere to these terms and conditions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Eligibility</AccordionTrigger>
              <AccordionContent>
                Users must be [minimum age] or older to register and access our courses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Account Security</AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>Maintain the confidentiality of your account credentials.</li>
                  <li>You are responsible for all activities under your account.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Intellectual Property</AccordionTrigger>
              <AccordionContent>
                All course materials are the intellectual property of [Your Website Name]. Duplication or sharing is prohibited.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Payments and Fees</AccordionTrigger>
              <AccordionContent>
                <ul>
                    <li> All payments must be completed before accessing courses.</li>
                    <li>No partial payments unless otherwise stated.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Disclaimer</AccordionTrigger>
              <AccordionContent>
                We are not responsible for any technical issues or interruptions experienced while using the platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Amendments</AccordionTrigger>
              <AccordionContent>
                These terms may be updated. Continuing to use the site implies acceptance of changes.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
     
      </div>
    </div>
  )
}
