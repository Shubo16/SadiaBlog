import React from "react";
import { Link } from "react-router-dom";
import BlogAuthorAvatar from "../../extras/BlogAuthor";

function BlogCard({
  id,
  slug, // Directly destructure slug from props
  title,
  category,
  description,
  image_path,
  date_created,
  avatar_url,
  username,
}) {
  
  const formattedDate = date_created
    ? new Date(date_created).toLocaleDateString()
    : "Unknown date";

  return (
    <article
      key={id}
      className="group overflow-hidden rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 capitalize"
    >
      <Link to={`/blog/${slug}`}> {/* Use slug directly */}
        <img
          className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          src={`http://localhost:3000${image_path}`}
          alt={title}
        />
      </Link>
      <h2 className="px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-green-600">
        {category}
      </h2>
      <div className="px-6 py-2">
        <h1 className="text-lg font-bold text-gray-900 mb-2 hover:underline cursor-pointer capitalize">
          {title}
        </h1>
        <p className="line-clamp-3 text-gray-600">{description}</p>
      </div>
      <span className="block px-6 pb-2 text-sm text-gray-500">
        {formattedDate}
      </span>
      {username && (
        <div className="flex items-center px-6 pb-4 gap-4">
          <BlogAuthorAvatar src={avatar_url}/>
          <p className="text-md font-semibold capitalize text-gray-700">
            {username}
          </p>
        </div>
      )}
    </article>
  );
}

export default BlogCard;
