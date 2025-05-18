import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SlOptionsVertical } from "react-icons/sl";

export default function CommentSection({ id }) {
  const { slug } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [options, setOptions] = useState({});
  const optionsRef = useRef(null);


  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await axios.get("/api/user", { withCredentials: true });
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Not logged in:", err);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      try {
        const results = await axios.get(`/api/comments/${slug}`);
        const commentsArray = Array.isArray(results.data)
          ? results.data
          : results.data.comments || [];
        setAllComments(commentsArray);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setAllComments([]); // fallback to empty array on error
      }
    };

    getComments();
  }, [slug]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/comments/${slug}`, {
        comment: newComment,
      });
      const newCommentPosted = response.data.comment;

      setAllComments((prevComments) => [newCommentPosted, ...prevComments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setAllComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptions({}); // close all dropdowns
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section id={id} className="">
      <div className="mb-24 w-full b-y-4 border-black-solid">
        <h1 className="text-4xl text-left w-auto font-serif capitalize">
          comments
        </h1>
        <form onSubmit={postComment} className="mt-5">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>

          {newComment.trim() !== "" && (
            <div className="w-full flex justify-end mt-5">
              <button
                type="submit"
                className="rounded-full border-2 border-black text-jadeGreen p-3 uppercase font-bold"
              >
                Post comment
              </button>
            </div>
          )}
        </form>

        {allComments.map((comment) => {
          console.log("Current User:", currentUser);
          console.log("Comment User ID:", comment.user_id);

          return (
            <section
              key={comment.id}
              className="w-full border-black border-2 rounded-lg mt-4 p-4 relative"
            >
              <div className="flex justify-between items-center mb-2 text-xl text-gray-500">
                <h2 className="font-semibold text-black">
                  {comment.name || "Anonymous"}
                </h2>
                <span>
                  {new Date(comment.created_at).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-lg text-gray-800">{comment.comment}</p>

              {/* Options button for owner */}
              {currentUser && (
                <div className="relative flex justify-end">
                  <SlOptionsVertical
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOptions(prev => ({
                        [comment.id]: !prev[comment.id]
                      }));
                    }}
                    
                  />
                  {options[comment.id] && (
                    <div className="absolute w-28 bg-white border rounded shadow-lg z-10  -translate-x-4 -translate-y-5">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="w-full px-2 py-2 text-center text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
