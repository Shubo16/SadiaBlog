import React, { useState, useTransition, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import { successFullyCreatedBlog } from "../extras/alerts";
import api from "../../services/backendApi";

const CreateBlog = ({ onBlogCreated }) => {
  const { user } = useUser();
  const [newBlog, setNewBlog] = useState(false);
  const [file, setFile] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
  });
  const [isPending, startTransition] = useTransition({ timeoutMs: 3000 });

  useEffect(() => {
    if (newBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [newBlog]);

  const toggleNewBlog = () => setNewBlog(!newBlog);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", `${user.first_name} ${user.last_name}`);
    formData.append("title", blogData.title);
    formData.append("category", blogData.category);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    if (file) formData.append("image", file);

    try {
      await api.post("/api/blog", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      successFullyCreatedBlog();
      toggleNewBlog();
      if (onBlogCreated) onBlogCreated();

      setBlogData({
        title: "",
        category: "",
        description: "",
        content: "",
      });
      setFile(null);
    } catch (error) {
      console.error("There has been an error", error);
      const message =
        error.response?.data?.error || "There was an issue creating the blog.";
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  return (
    <div>
      {user ? (
        <>
          {/* Floating Button (Mobile) */}
          <button
            className="fixed bottom-24 right-4 z-50 rounded-full bg-jadeGreen p-3 text-white shadow-lg hover:bg-blue-700 sm:hidden"
            onClick={toggleNewBlog}
          >
            <FaPlus className="h-6 w-6" />
          </button>

          {/* Desktop Button */}
          <button
            className="hidden sm:block sm:absolute px-5 py-2.5 rounded-lg text-sm font-medium border-jadeGreen border-2 hover:bg-jadeGreen text-green-700 hover:text-white transition-all duration-300 top-72 right-10 mt-6 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-600"
            onClick={toggleNewBlog}
          >
            Add New Blog
          </button>

          <AnimatePresence>
            {newBlog && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-40 z-40"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 flex items-center justify-center"
                >
                  {/* Scrollable Modal Content */}
                  <div className="w-11/12 max-w-3xl h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-5 text-gray-900 dark:text-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-center">
                        Create a New Blog
                      </h2>
                      <motion.button
                        className="text-2xl text-gray-900 dark:text-gray-100"
                        onClick={toggleNewBlog}
                      >
                        &times;
                      </motion.button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div>
                        <h1 className="capitalize">
                          Created by {user.first_name} {user.last_name}
                        </h1>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium"
                        >
                          Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          value={blogData.title}
                          onChange={handleInputChange}
                          placeholder="Enter blog title"
                          className="w-full p-2 mt-1 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium"
                        >
                          Upload Image
                        </label>
                        <input
                          type="file"
                          onChange={handleChange}
                          className="block text-gray-900 dark:text-gray-100"
                        />
                        {file && (
                          <img
                            src={URL.createObjectURL(file)}
                            className="h-48 w-full object-cover rounded-md my-4"
                            alt="Preview"
                          />
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium"
                        >
                          Category
                        </label>
                        <input
                          id="category"
                          name="category"
                          value={blogData.category}
                          onChange={handleInputChange}
                          placeholder="Enter blog category"
                          className="w-full p-2 mt-1 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium"
                        >
                          Description
                        </label>
                        <input
                          id="description"
                          name="description"
                          value={blogData.description}
                          onChange={handleInputChange}
                          placeholder="Enter blog description"
                          className="w-full p-2 mt-1 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium"
                        >
                          Content
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={blogData.content}
                          onChange={handleInputChange}
                          placeholder="Enter blog content"
                          className="w-full p-2 mt-1 border rounded-md h-48 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full p-2 bg-jadeGreen text-white rounded-md disabled:opacity-60"
                        disabled={isPending}
                      >
                        {isPending ? "Submitting..." : "Create Blog"}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      ) : null}
    </div>
  );
};

export default CreateBlog;