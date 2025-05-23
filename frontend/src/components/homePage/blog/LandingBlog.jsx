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

        if (data.length > 0) {
          setLatestBlog(data[0]); // Set the latest blog
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    getBlogs();
  }, []);

  // ✅ Only format if latestBlog exists
  let formattedDate = "";
  if (latestBlog) {
    formattedDate = new Date(latestBlog.date_created).toLocaleDateString(
      "en-UK",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  return (
    <div className="flex justify-center px-4 mb-10">
      <section className="w-full max-w-screen-lg h-auto grid gap-10 pt-8 lg:grid-cols-2">
        {latestBlog ? (
          <>
            <img
              src={`${BASE_URL}${latestBlog.image_path}`}
              alt="Blog Cover"
              className="w-full h-[28rem] md:h-[31rem] rounded-2xl border-2 object-cover shadow-lg"
            />

            <div className="flex flex-col">
              <ul className="flex w-full flex-col-reverse  md:gap-9 text-xl font-semibold text-gray-600 mb-2 capitalize md:flex-row lg:justify-between md:items-center">
                <li className="text-nowrap">{formattedDate}</li>
                <li className="">{latestBlog.category}</li>
                <li className="flex gap-2 md:w-full flex-row-reverse justify-between md:ml-0 md:items-center">
                  <BlogAuthorAvatar src={latestBlog.avatar_url} />
                  <span className="l">By {latestBlog.username}</span>
                </li>
              </ul>

              <div className="flex flex-col gap-8">
                <h1 className="text-2xl md:text-3xl font-extrabold capitalize">
                  {latestBlog.title}
                </h1>
                <h3 className="text-xl md:text-2xl">
                  {latestBlog.description}...
                </h3>

                <div className="flex justify-center md:justify-end">
                  <Link to={`/blog/${latestBlog.slug}`}> {/* Updated Link */}
                    <button className="text-lg group relative inline-flex h-12 w-60 items-center justify-center overflow-hidden rounded-md border-4 border-black bg-transparent font-medium text-jadeGreen transition-all duration-150 shadow-[5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none uppercase hover:bg-jadeGreen hover:text-white">
                      continue reading
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading latest blog...</p>
        )}
      </section>
    </div>
  );
}
