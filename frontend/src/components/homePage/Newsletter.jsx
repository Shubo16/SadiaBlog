import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  errorNotifNewsletter,
  successfulNotifNewsletter,
} from "../extras/alerts";

export const NewsLetter = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [isEmailValid, setIsEmailValid] = useState();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || !/\S+@\S+\.\S+/.test(formData.email)) {
      console.log("error triggered");
      setIsEmailValid(false);
      errorNotifNewsletter();
    } else {
      setIsEmailValid(true);
      successfulNotifNewsletter();
    }
    console.log("Form Data Submitted:", formData);
    // Add API call or further processing logic here
  };

  return (
    <main className="w-full px-4 py-8 flex flex-col items-center bg-white border-t-4 border-black">
      <div className="text-center mb-4 text-sm font-bold font-poppins">
        <h2 className="capitalize">Be the first to access new blogs</h2>
        <h3 className="italic font-tinos">Sign up for our newsletter!</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <label className="flex flex-col items-start gap-1 text-sm">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-md p-2 border-b-4 border-jadeGreen placeholder-black outline-none"
            placeholder="Enter your full name"
          />
        </label>

        <label className="flex flex-col items-start gap-1 text-sm">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md p-2 border-b-4 border-jadeGreen placeholder-black outline-none"
            placeholder="Enter your email"
          />
        </label>

        <button
          type="submit"
          className="bg-jadeGreen text-white rounded-md py-2 px-6 hover:bg-green-700 transition"
        >
          Subscribe :)
        </button>
      </form>
    </main>
  );
};
