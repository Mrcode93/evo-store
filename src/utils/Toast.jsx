// src/utils/toastUtils.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'success') => {
  const options = {
    style: {
      direction: 'rtl',
      fontFamily: 'Cairo',
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
  }
};