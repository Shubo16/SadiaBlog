import React from "react";
import headerImg from "/57.jpg";

const BlogsHeader = () => {
  return (
    <section className="h-auto w-screen bg-white dark:bg-darkBackground">
      <img
        src={headerImg}
        alt="Header image"
        className="w-full h-44 object-cover object-[34%] rounded-b-xl shadow-amber-600 shadow-lg"
      />
      <div className="w-screen h-auto flex flex-col items-center capitalize mt-10 pb-0 gap-2 border-b-2 border-black dark:border-darkBorder justify-content">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
          Sadia's Blog
        </h2>
        <p className="font-light text-md md:text-lg text-gray-700 dark:text-gray-300">
          The coolest blog in the land
        </p>
      </div>
    </section>
  );
};

export default BlogsHeader;