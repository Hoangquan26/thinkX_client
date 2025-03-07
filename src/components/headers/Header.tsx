import styles from './styles.module.scss'
import { menuActions, menuItems } from './constants/menuItem.constant'
export default function Header() {
  const { container, menuSide, logoSide, menuItem, contentWrapper, actionSide, actionItem} = styles
  return (
    <div className={container}>
      <div className={ contentWrapper }>
        {/* logo section */}
        <div className={logoSide}>Logo</div>

        {/* menu section */}
        <div className={menuSide}>
          {
            menuItems.length && menuItems.map((item, key) => (
              <div key={key} className={menuItem}>{item.logo ?? item.content.eng}</div>
            ))
          }
        </div>

        {/* action section */}
        <div className={actionSide}>
            {
              menuActions.length && menuActions.map((item, key) => (
                <div key={key} className={actionItem} onClick={item.action}>{item.logo}</div>
              ))
            }
        </div>
      </div>
    </div>
  )
}
