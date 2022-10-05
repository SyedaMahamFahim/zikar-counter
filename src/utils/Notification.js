import { toast } from "react-toastify";

const Notification = (success, error, response) => {
  if (success) {
    return toast.success(response, {
      toastId: "success1",
      autoClose: 2000,
    });
  }
  if (error) {
    
    return toast.error(response, {
      toastId: "error1",
      autoClose: 2000,
    });
  }
};

export default Notification;
