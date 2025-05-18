import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogAuthorAvatar from "../../extras/BlogAuthor";
import { FaArrowLeft, FaParagraph } from "react-icons/fa";
import UserInteractivity from "../../extras/UserInteractivity";
import { Link } from "react-router-dom";
import HomeBlog from "../../homePage/blog/HomeBlog";
import CommentSection from "./CommentSection";

function BlogContentsPage() {
  const { slug } = useParams();
  const [currentBlog, setCurrentBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${slug}`);
        const data = response.data;
        setCurrentBlog(data);
        console.log(currentBlog);
      } catch (err) {
        console.error(err);
        setError("Cannot load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [slug]);

  if (loading) {
    return <div className="spinner">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!currentBlog) {
    return <div>Blog not found.</div>;
  }

  const formattedDate = new Date(currentBlog.date_created).toLocaleDateString(
    "en-GB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this blog!",
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Always fallback
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="h-auto w-auto flex flex-col items-center">
      <Link to="/Blogs">
        <span className="absolute hover:text-jadeGreen left-5 mt-3 w-auto flex items-center gap-1 xs:border-0 ss:border-b-2 border-black capitalize">
          <FaArrowLeft className="" />
          <h3 className="hidden ss:inline">Back to all blogs</h3>
        </span>
      </Link>
      {/* article image */}
      <img
        src={`http://localhost:3000${currentBlog.image_path}`}
        alt={currentBlog.title}
        className="w-auto h-96 my-10 rounded-lg shadow-lg"
      />
      <main className="px-10 md:px-[10%] lg:px-[15%] xl:px-[25%]">
        <div className="">
          {/* Article title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 break-words capitalize">
            {currentBlog.title}
          </h1>

          {/* Article description */}
          <h3 className="text-xl md:text-xl  mb-4 text-gray-700">
            {currentBlog.description}
          </h3>

          {/* Author section */}
          <div className="flex items-center gap-4">
            <BlogAuthorAvatar
              src={currentBlog.avatar_url}
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="capitalize text-lg md:text-xl font-semibold">
                {currentBlog.first_name} {currentBlog.last_name}
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

        {/* USER INTERACTIVE FEATURES, LIKE COMMENT, SHARE  */}

        <UserInteractivity slug={slug} />

        {/* Article content */}
        {currentBlog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="prose text-xl/9 lg:text-2xl/9 max-w-none mb-10">
            {paragraph}
          </p>
        ))}
        {/* COMMENTS SHARE BUTTON USE */}

        <span className="  justify-center flex flex-col my-5 gap-5 text-sm font-poppins font-extralight ">
          <button
            onClick={handleShare}
            className="rounded-full  self-center border-2 border-black text-jadeGreen p-3 outline-none uppercase font-bold"
          >
            Share
          </button>
          <a
            href="#comments"
            className="rounded-full  self-center border-2 border-black text-jadeGreen p-3 outline-none uppercase font-bold"
          >
            Leave a comment
          </a>
        </span>
        <p className="text-xl text-center px-28  break-words mb-10">
          Thanks for reading my blog! Like, leave a comment and share, let me
          know how you feel and check out some of my other blogs that i've
          posted down below.
        </p>
        <CommentSection id="comments" />
      </main>

      <HomeBlog></HomeBlog>
    </div>
  );
}

export default BlogContentsPage;
