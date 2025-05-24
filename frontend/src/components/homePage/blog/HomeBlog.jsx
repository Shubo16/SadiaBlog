import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import LandingBlog from "./LandingBlog";
import { Link } from "react-router-dom";
import api from "../../../services/backendApi";

function HomeBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get("/api/blog");
        const data = response.data;

        // Only keep the latest 3 blogs
        setBlogs(data.slice(0, 3));
        console.log("Fetched blogs:", data.slice(0, 3));
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  return (
    <section className="p-23 my-20">
      <Link to='/blogs'>
        <h1 className="text-3xl font-bold text-center mb-8 font-poppins border-b-4 pb-2 border-b-jadeGreen hover:text-red-700 hover:underline-offset-0">
          Latest Blog Posts
        </h1>
      </Link>

      {loading ? (
        <div className="text-center">Loading blogs...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20">
          {blogs.length === 0 ? (
            <div className="text-center col-span-full">
              No blog posts available.
            </div>
          ) : (
            blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default HomeBlog;
