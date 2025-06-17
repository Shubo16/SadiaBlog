import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import api from "../../../services/backendApi";

function HomeBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get("/api/blog");
        const data = response.data;
        setBlogs(data.slice(0, 3));
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  return (
    <section className="py-16 px-4 md:px-12 bg-white dark:bg-darkBackground transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Link to="/blogs">
          <h1 className="text-4xl font-tinos text-center mb-12 text-gray-900 dark:text-darkText hover:text-jadeGreen dark:hover:text-jadeGreen transition-colors duration-200 underline-offset-4 hover:underline decoration-jadeGreen">
            Latest Blog Posts
          </h1>
        </Link>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-darkText">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-600 dark:text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 dark:text-darkMutedText">
                No blog posts available.
              </p>
            ) : (
              blogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeBlog;