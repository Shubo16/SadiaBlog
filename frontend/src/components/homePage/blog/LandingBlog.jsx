import React, { useEffect, useState } from "react";
import BlogAuthorAvatar from "../../extras/BlogAuthor";
import { Link } from "react-router-dom";
import api, { BASE_URL } from "../../../services/backendApi";

export default function LandingBlog() {
  const [blogs, setBlogs] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get("/api/blog");
        const data = response.data;
        setBlogs(data);
        if (data.length > 0) setLatestBlog(data[0]);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    getBlogs();
  }, []);

  let formattedDate = "";
  if (latestBlog) {
    formattedDate = new Date(latestBlog.date_created).toLocaleDateString(
      "en-UK",
      { year: "numeric", month: "long", day: "numeric" }
    );
  }

  return (
    <div className="flex justify-center px-4 bg-white dark:bg-darkBackground transition-colors duration-300">
      <section className="w-full max-w-screen-lg h-auto grid gap-12 pt-10 lg:grid-cols-2 md:px-16 lg:px-0">
        {latestBlog ? (
          <>
            <div className="md:flex md:justify-center">
              <img
                src={`${BASE_URL}${latestBlog.image_path}`}
                alt="Blog Cover"
                className="w-full h-[23rem] md:h-[22rem] md:w-2/3 lg:w-full rounded-2xl border object-cover shadow-lg border-gray-300 dark:border-slate-700"
              />
            </div>

            <div className="flex flex-col gap-6">
              <ul className="flex flex-wrap justify-between text-sm font-medium text-gray-600 dark:text-darkMutedText uppercase tracking-wide">
                <li>{formattedDate}</li>
                <li>{latestBlog.category}</li>
                <li className="flex items-center gap-2">
                  <BlogAuthorAvatar src={latestBlog.avatar_url} />
                  <span>By {latestBlog.username}</span>
                </li>
              </ul>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-darkText capitalize">
                {latestBlog.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
                {latestBlog.description}...
              </p>

              <div className="flex justify-center md:justify-end">
                <Link to={`/blog/${latestBlog.slug}`}>
                  <button className="px-6 py-3 border-2 border-jadeGreen text-jadeGreen dark:text-jadeGreen dark:border-jadeGreen rounded-md text-sm font-semibold uppercase hover:bg-jadeGreen hover:text-white dark:hover:text-white transition-all duration-200 shadow-md dark:shadow-[0_0_10px_rgba(0,168,107,0.3)]">
                    Continue Reading
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-700 dark:text-darkMutedText">Loading latest blog...</p>
        )}
      </section>
    </div>
  );
}