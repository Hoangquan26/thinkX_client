import CheckoutBill from '@/components/CheckoutBill/CheckoutBill'
import styles from './styles.module.scss'
export default function CheckoutPage() {
  const { container, contentWrapper } = styles
  return (
    <div className={container}>
      <div className= {contentWrapper}>
          <CheckoutBill/>
      </div>
    </div>
  )
}
