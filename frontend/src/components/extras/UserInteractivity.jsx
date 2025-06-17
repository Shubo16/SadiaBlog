import React, { useState, useEffect } from "react";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../services/backendApi";

export default function UserInteractivity({ id }) {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await api.get(`/api/likes/${slug}`);
        setLikeCount(response.data.count);
        // If your API returns whether the current user liked the post:
        if (response.data.userHasLiked !== undefined) {
          setIsLiked(response.data.userHasLiked);
        }
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    };

    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    try {
      console.log("liking blog with slug:", slug);
      const response = await api.post(`/api/likes/${encodeURIComponent(slug)}`);
      setLikeCount(response.data.count);
      setIsLiked(true);
    } catch (error) {
      console.error("Failed to like the post", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await api.delete(`/api/likes/${encodeURIComponent(slug)}`);
      setLikeCount(response.data.count);
      setIsLiked(false);
    } catch (error) {
      console.error("Failed to unlike the post", error);
    }
  };

  return (
    <div className="flex w-full justify-between border-y-2 border-slate-900 dark:border-gray-300 py-2 my-10 items-center font-mono transition-colors duration-300">
      <section className="flex gap-3 items-center">
        <button
          onClick={isLiked ? handleUnlike : handleLike}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Unlike this blog" : "Like this blog"}
          className="rounded-full border-2 border-jadeGreen p-3 outline-none transition-colors duration-300 hover:bg-jadeGreen hover:text-white"
        >
          {isLiked ? (
            <FaHeart className="md:h-8 md:w-8 text-red-500" />
          ) : (
            <FaRegHeart className="md:h-8 md:w-8 text-black dark:text-white" />
          )}
        </button>
        <span>{likeCount} likes</span>

        <a
          href="#comments"
          aria-label="Go to comments section"
          className="rounded-full border-2 border-jadeGreen p-3 outline-none transition-colors duration-300 hover:bg-jadeGreen hover:text-white"
        >
          <FaRegComment className="md:h-8 md:w-8 text-black dark:text-white" />
        </a>
      </section>
      <section>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="rounded-full border-2 border-jadeGreen p-3 outline-none uppercase font-poppins transition-colors duration-300 hover:bg-jadeGreen hover:text-white"
          aria-label="Share this blog"
        >
          Share
        </button>
      </section>
    </div>
  );
}