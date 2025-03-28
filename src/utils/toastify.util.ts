import { toast } from "react-toastify";

const TOAST_POSITION = 'bottom-right'
const TOAST_THEME = 'dark'
const TOAST_AUTOCLOSE = 3000

export const SuccessToast = (message: string) => {
  toast.success(message ?? 'Thành công', {
      position: TOAST_POSITION, 
      autoClose: TOAST_AUTOCLOSE,       
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: TOAST_THEME,        
    });
}

export const ErrorToast = (message: string) => {
  toast.error(message ?? 'Thất bại', {
    position: TOAST_POSITION, 
    autoClose: TOAST_AUTOCLOSE,       
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: TOAST_THEME,        
  });
}