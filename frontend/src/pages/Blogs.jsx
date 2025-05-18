import React, { useState } from "react";

import BlogsHeader from "../components/blogs/BlogsHeader";
import CreateBlog from "../components/blogs/CreateBlog";
import BlogComponent from "../components/blogs/BlogComponent";

const Blogs = () => {
  const [toggleRefresh, setRefresh] = useState();
  const handleBlogCreated = () => {
    setRefresh((prev) => !prev); // Toggle the refresh state
  };  return (
    <div className="">
      <BlogsHeader />
      <CreateBlog onBlogCreated={handleBlogCreated}/>
      <BlogComponent toggleRefresh={toggleRefresh} />
    </div>
  );
};

export default Blogs;
