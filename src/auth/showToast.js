import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const showToast = (message, type = 'default') => {
    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    };

    switch (type) {
        case 'success':
            toast.success(message, toastConfig);
            break;
        case 'error':
            toast.error(message, toastConfig);
            break;
        case 'warning':
            toast.warning(message, toastConfig);
            break;
        case 'info':
            toast.info(message, toastConfig);
            break;
        default:
            toast.info(message, toastConfig); // Default toast
    }
};

export default showToast;