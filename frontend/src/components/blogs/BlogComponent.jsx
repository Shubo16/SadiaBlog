import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { BlogHeaderPic } from "../../services/randomPicGenerator";
import BlogAuthorAvatar from "../extras/BlogAuthor";
import { errorDeletingBlog, successfullyDeletedBlog } from "../extras/alerts";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import api, { BASE_URL } from "../../services/backendApi";

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
      const fallback = await api.get(BlogHeaderPic);
      setFallBackImage(fallback[0]);
    };

    fetchFallbackImage();
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get("/api/blog/");
        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Cannot load blogs. Please try again later.");
      }
    };

    getBlogs();
  }, [toggleRefresh]);

  //options
  const clickOptions = (id) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [id]: !prevOptions[id],
    }));
  };
  //archiving or deleting blogs from blogpage

  const handleArchiveBlog = async (id) => {
    try {
      await api.post(`/api/blog/archive/${id}`);
      setBlogs((prevBlog) => prevBlog.filter((blog) => blog.id !== id));
      successfullyDeletedBlog();
    } catch (err) {
      console.error("Error archiving blog:", err);
      errorDeletingBlog();
    }
  };

  return (
    <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-auto bg-white dark:bg-darkBackground">
      {error ? (
        <p className="text-red-600 text-center text-lg font-semibold dark:text-red-400">
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
                className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 shadow-md 
                           hover:shadow-lg transition-shadow duration-300
                           bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={`/blog/${blog.slug}`}>
                  <img
                    className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    src={
                      blog.image_path
                        ? `${BASE_URL}${blog.image_path}`
                        : fallbackImage
                    }
                    alt={blog.title}
                  />
                </Link>

                {/* Content area that grows */}
                <div className="flex-1 grid grid-col">
                  <div>
                    <h2 className="px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                      {blog.category}
                    </h2>

                    <div className="px-6 py-2">
                      <Link to={`/blog/${blog.slug}`}>
                        <h1 className="sm:text-lg md:text-xl lg:text-2xl capitalize font-bold text-gray-900 dark:text-gray-100 mb-1 hover:underline cursor-pointer">
                          {blog.title}
                        </h1>
                      </Link>

                      <div className="flex items-center gap-2 mb-2">
                        <BlogAuthorAvatar src={blog.avatar_url} />
                        <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                          {blog.username}
                        </p>
                      </div>

                      <p className="line-clamp-3 text-gray-600 dark:text-gray-300">
                        {blog.description}
                      </p>
                    </div>

                    <span className="block px-6 pb-2 text-sm text-gray-500 dark:text-gray-400">
                      {formattedDate}
                    </span>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-4 dark:text-white">
                      <span className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm border-black border-opacity-80 shadow-sm shadow-black dark:border-gray-600 dark:shadow-none">
                        <FaThumbsUp className=""/>
                        <p>{blog.likes}</p>
                      </span>
                      <span className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm border-black border-opacity-80 shadow-sm shadow-black dark:border-gray-600 dark:shadow-none">
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
                          className="cursor-pointer p-1 text-gray-700 dark:text-gray-300"
                          aria-label="Options"
                        >
                          <SlOptionsVertical
                            size={18}
                            className="hover:scale-125 hover:transition-all hover:ease-in-out"
                          />
                        </button>

                        {options[blog.id] && (
                          <div className="absolute right-4 -translate-y-full w-32 bg-white shadow-lg rounded-md z-50 dark:bg-gray-800 dark:shadow-gray-900">
                            <Link to={`/edit-blog/${blog.id}`}>
                              <button
                                type="button"
                                className="block w-full px-4 py-2 text-center text-gray-700 dark:text-gray-200 active:bg-gray-100 dark:active:bg-gray-700 hover:bg-jadeGreen dark:hover:bg-jadeGreen"
                              >
                                Edit
                              </button>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleArchiveBlog(blog.id)}
                              className="block w-full px-4 py-2 text-center text-gray-700 dark:text-gray-200 active:bg-red-100 dark:active:bg-red-700 hover:bg-jadeGreen dark:hover:bg-jadeGreen"
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
                              className="block w-full px-4 py-2 text-center text-gray-700 dark:text-gray-200 active:bg-gray-100 dark:active:bg- hover:bg-jadeGreen dark:hover:bg-jadeGreen"
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