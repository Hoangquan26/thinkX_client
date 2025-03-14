import React, { useState } from 'react';
import styles from './styles.module.scss';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import classNames from 'classnames';

interface CommonInputProps {
  label: string;
  canHide?: boolean;
  isError?: boolean,
  [key: string]: any; // Allow any additional props
}

const CommonInput: React.FC<CommonInputProps> = ({ label, canHide, isError, ...props }) => {
    const { container, mainInput, placeHolder, desContainer, hideBtn, error } = styles;
    const [isVisible, setIsVisible] = useState(!canHide)
    const toggleVisible = () => {
        setIsVisible(prev => !prev)
    }

    !isVisible ? props.type = "password" : props.type = "text" 
    return (
        <div className={classNames(
            container, {
                error: isError
            }
        )}>
        <input className={mainInput} {...props} />
        <div className={desContainer}>
            <label className={placeHolder}>{label}</label>
            {canHide && 
            <div className={hideBtn} onClick={toggleVisible}>
                { !isVisible ? <FaEye/> : <FaEyeSlash/> }
                <span>{!isVisible ? 'Show' : 'Hide'}</span>
            </div>
            }
        </div>
        </div>
    );
};

export default CommonInput;
