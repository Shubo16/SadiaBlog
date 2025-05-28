import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function ArchivedBlogs() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArchivedBlogs = async () => {
      try {
        const response = await api.get("/api/recover-blog");
        console.log("API response:", response.data);
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
        setError("There was an error loading your archived blogs.");
      } finally {
        setLoading(false);
      }
    };
    getArchivedBlogs();
  }, []);

  return (
    <section className="flex flex-wrap gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : blogs.length === 0 ? (
        <p>No archived blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div className="w-full flex">
            {blog.username}
            
            {blog.title}
          </div>
        ))
      )}
    </section>
  );
}
