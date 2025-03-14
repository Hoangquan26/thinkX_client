import { ReactNode } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface CommonInputProps {
    isPrimary?: boolean,
    isDisabled?: boolean,
    content: string, 
    url?: string, 
    icon?: ReactNode, 
    [key: string]: any
}

const RoundedButton: React.FC<CommonInputProps> = ({isPrimary = false, isDisabled = false, content, url, icon, ...props}) => {
    const { container, contentWrapper, disabled, primary } = styles;
    return (
      <button disabled={isDisabled} className={classNames(container, {
        [disabled]: isDisabled,
        [primary]: isPrimary
      })} {...props}>
        {icon}
        <span className={contentWrapper}>
          {
            url ? <a href={url}>{content}</a> : content
          }
        </span>
      </button>
    );
}

export default RoundedButton;