import React, { useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import { successFullyCreatedBlog } from "../extras/alerts";

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
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const jsonResponse = await response.json();
      console.log("Server response:", jsonResponse);

      if (!response.ok) {
        throw new Error(jsonResponse.error || "Something went wrong");
      }

      successFullyCreatedBlog();
      toggleNewBlog(); // Close the modal

      // ✅ Tell the parent to refresh the blog list:
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
      toast.error("There was an issue creating the blog. Please try again.", {
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
          {/* Add New Blog Button */}
          <button
            className="fixed bottom-24 right-4 z-50 rounded-full bg-jadeGreen p-3 text-white shadow-lg hover:bg-blue-700 sm:hidden"
            onClick={toggleNewBlog}
          >
            <FaPlus className="h-6 w-6" />
          </button>
          <button
            className="hidden sm:block sm:absolute px-5 py-2.5 rounded-lg text-sm font-medium border-jadeGreen border-2 hover:bg-jadeGreen text-green-700 hover:text-white transition-all duration-300 top-72 right-10 mt-6"
            onClick={toggleNewBlog}
          >
            Add New Blog
          </button>

          {newBlog && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-[80%] bg-white shadow-lg rounded-lg p-5 z-50 overflow-scroll">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create a New Blog</h2>
                <motion.button className="text-2xl" onClick={toggleNewBlog}>
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
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={blogData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    placeholder="Enter blog title"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="block text-sm font-medium">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={handleChange}
                    className="block"
                  />
                  {file && (
                    <img
                      src={URL.createObjectURL(file)}
                      className="h-26 w-full object-cover rounded-md my-4"
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
                    className="w-full p-2 mt-1 border rounded-md"
                    placeholder="Enter blog category"
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
                    className="w-full p-2 mt-1 border rounded-md"
                    placeholder="Enter blog description"
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
                    className="w-full p-2 mt-1 border rounded-md"
                    placeholder="Enter blog content"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full p-2 bg-jadeGreen text-white rounded-md"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Create Blog"}
                </button>
              </form>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default CreateBlog;
