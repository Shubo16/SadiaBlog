import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

const BlogsHeader = () => {
  const [buttonLoggedOut, buttonLoggedIn] = useState();

  return (
    <section className="h-auto w-screen">
      <img
        src="src/assets/57.jpg"
        alt="Header image"
        className="w-full h-44 object-cover object-[34%] rounded-b-xl shadow-amber-600 shadow-lg"
      />
      <div className="w-screen h-auto flex flex-col items-center capitalize mt-10 pb-0 gap-2 border-b-2 border-black justify-content">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl">
          Sadia's Blog
        </h2>
        <p className="font-light text-md md:text-lg">
          The coolest blog in the land
        </p>
        
      </div>
    </section>
  );
};

export default BlogsHeader;
