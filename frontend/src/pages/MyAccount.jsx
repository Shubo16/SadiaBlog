import React from "react";
import AvatarUploader from "../components/extras/AvatarUploader";
import ArchivedBlogs from "../components/myAccount/RecoverBlogs";
import BlogCard from "../components/homePage/blog/BlogCard";

export default function MyAccount() {
  return (
    <div className="w-full h-auto">
      <div className="flex justify-center p-10 text-5xl h-10">MyAccount</div>
      <ArchivedBlogs/>
    </div>
  );
}
