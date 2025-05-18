import React, { useState, useEffect } from "react";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserInteractivity({id}) {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `/api/likes/${slug}`
        );
        setLikeCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    };

    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    try {
      console.log("liking blog with slug:", slug);
      const response = await axios.post(
        `/api/likes/${encodeURIComponent(slug)}`
      );
      setLikeCount(response.data.count);
      setIsLiked(true);
    } catch (error) {
      console.error("Failed to like the post", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.delete(
        `/api/likes/${encodeURIComponent(slug)}`
      );
      setLikeCount(response.data.count);
      setIsLiked(false);
    } catch (error) {
      console.error("Failed to unlike the post", error);
    }
  };

  return (
    <div className="flex w-full justify-between border-y-2 border-slate-900 py-2 my-10 items-center font-mono">
      <section className="flex gap-3 items-center">
        <button
        key={isLiked.id}
          onClick={isLiked ? handleUnlike : handleLike}
          className="rounded-full border-2 border-jadeGreen p-3 outline-none"
        >
          {isLiked ? (
            <FaHeart className="md:h-8 md:w-8 text-red-500 transition duration-300 ease-in-out" />
          ) : (
            <FaRegHeart className="md:h-8 md:w-8 text-black transition duration-300 ease-in-out" />
          )}
        </button>
        <span>{likeCount} likes</span>

        <a
          href="#comments"
          className="rounded-full border-2 border-jadeGreen p-3 outline-none"
        >
          <FaRegComment className="md:h-8 md:w-8" />
        </a>
      </section>
      <section>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="rounded-full border-2 border-jadeGreen p-3 outline-none uppercase font-poppins"
        >
          Share
        </button>
      </section>
    </div>
  );
}
