// src/extras/alerts.js
import { toast } from "react-toastify";

export const successFullyCreatedBlog = () => {
  toast.success("Blog successfully created!", {
    position: "top-right",
    autoClose: 5000,
    theme: "light",
  });
};

export const successfullyDeletedBlog = () => {
  toast.success("SuccessFully Deleted Blog:3", {
    position: "top-left",
    autoClose: 3000,
    theme: "light",
    transition: "zoom",
    bodyStyle: {
      backgroundColor: "jadeGreen",
    },
  });
};

export const errorDeletingBlog = () => {
  toast.error("Watch what you're typing:/", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: 10,
    theme: "colored",
    transition: Zoom,
  });
};


// Success notification for newsletter
export const successfulNotifNewsletter = () => {
  toast.success("Check Your Inbox:3", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: "zoom",
    bodyStyle: {
      backgroundColor: "jadeGreen",
    },
  });
};

// Error notification for newsletter
export const errorNotifNewsletter = () => {
  toast.error("Watch what you're typing:/", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: "zoom",
    bodyStyle: {
      backgroundColor: "jadeGreen",
    },
  });
};

//comments

export const successFullyPostedComment = () => {
  toast.success("Blog successfully created!", {
    position: "top-right",
    autoClose: 5000,
    theme: "light",
  });
};


//login sign up

export const errorLogin = () => {
  toast.error("Watch what you're typing:/", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: 10,
    theme: "colored",
    transition: Zoom,
  });
};
