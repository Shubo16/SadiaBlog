import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { BlogHeaderPic } from "../../services/randomPicGenerator";
import BlogAuthorAvatar from "../extras/BlogAuthor";
import { errorDeletingBlog, successfullyDeletedBlog } from "../extras/alerts";
import { FaComment, FaThumbsUp } from "react-icons/fa";

const BlogComponent = ({ toggleRefresh }) => {
  const { user } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [fallbackImage, setFallBackImage] = useState();
  const [copied, setCopied] = useState(false);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    const fetchFallbackImage = async () => {
      const fallback = await axios.get(BlogHeaderPic);
      setFallBackImage(fallback[0]);
    };

    fetchFallbackImage();
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch("/api/blog/");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError("Cannot load blogs. Please try again later.");
      }
    };

    getBlogs();
  }, [toggleRefresh]);

  const clickOptions = (id) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [id]: !prevOptions[id],
    }));
  };

  const archiveBlog = async (id) => {
    try {
      await axios.post(`/api/blog/archive/${id}`);
      setBlogs((prevBlog) => prevBlog.filter((blog) => blog.id !== id));
      successfullyDeletedBlog();
    } catch (err) {
      console.error("Error archiving blog:", err);
      errorDeletingBlog();
    }
  };

  return (
    <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-auto">
      {error ? (
        <p className="text-red-600 text-center text-lg font-semibold">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {blogs.map((blog) => {
            const formattedDate = new Date(
              blog.date_created
            ).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <article
                key={blog.id}
                className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/blog/${blog.slug}`}>
                  <img
                    className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    src={
                      blog.image_path
                        ? `http://localhost:3000${blog.image_path}`
                        : fallbackImage
                    }
                    alt={blog.title}
                  />
                </Link>

                {/* Content area that grows */}
                <div className="flex-1 grid grid-col">
                  <div>
                    <h2 className="px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-green-600">
                      {blog.category}
                    </h2>

                    <div className="px-6 py-2">
                      <h1 className="sm:text-lg md:text-xl lg:text-2xl capitalize font-bold text-gray-900 mb-1 hover:underline cursor-pointer">
                        {blog.title}
                      </h1>

                      <div className="flex items-center gap-2 mb-2">
                        <BlogAuthorAvatar src={blog.avatar_url} />
                        <p className="text-sm text-gray-600 capitalize">
                          {blog.username}
                        </p>
                      </div>

                      <p className="line-clamp-3 text-gray-600">
                        {blog.description}
                      </p>
                    </div>

                    <span className="block px-6 pb-2 text-sm text-gray-500">
                      {formattedDate}
                    </span>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm border-black border-opacity-80 shadow-sm shadow-black">
                        <FaThumbsUp />
                        <p>{blog.likes}</p>
                      </span>
                      <span className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm border-black border-opacity-80 shadow-sm shadow-black">
                        <FaComment />
                        <p>{blog.comments}</p>
                      </span>
                    </div>

                    {user && user.username === blog.username && (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clickOptions(blog.id);
                          }}
                          className="cursor-pointer p-1"
                          aria-label="Options"
                        >
                          <SlOptionsVertical size={18} className="hover:scale-125 hover:transition-all hover:ease-in-out" />
                        </button>

                        {options[blog.id] && (
                          <div className="absolute right-4 -translate-y-full w-32 bg-white shadow-lg rounded-md z-50">
                            <button
                              type="button"
                              className="block w-full px-4 py-2 text-center text-gray-700 active:bg-gray-100 hover:bg-jadeGreen"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => archiveBlog(blog.id)}
                              className="block w-full px-4 py-2 text-center text-gray-700 active:bg-red-100 hover:bg-jadeGreen"
                            >
                              Archive
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(
                                  window.location.origin + `/blog/${blog.slug}`
                                )
                              }
                              className="block w-full px-4 py-2 text-center text-gray-700 active:bg-gray-100 hover:bg-jadeGreen"
                            >
                              {copied ? "Copied!" : "Share"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogComponent;
