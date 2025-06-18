import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { motion } from "framer-motion";

function Charity() {
  const { user } = useUser();

  return (
    <div className="bg-[url('/src/assets/helpinghands.jpg')] dark:bg-[url('/darkhelpinghands.jpg')] dark:contrast-100 bg-no-repeat bg-fill sm:bg-cover sm:bg-[85%] md:bg-[50%_50%] w-full sm:h-[600px] md:h-[792px] contrast-150 border-t-4 border-black dark:border-jadeGreen flex justify-center items-center">
      <section className="flex flex-col justify-center sm:justify-center sm:items-center md:justify-normal md:mb-10 lg:mb-20 gap-[1rem] text-pretty text-center h-[17rem] w-[31rem] dark:text-darkText ">
        <h2 className="uppercase text-base sm:text-lg md:text-2xl lg:text-3xl   p-1 sm:p-2 md:p-3 lg:p-3 font-bold">
          Stand with gaza - every help matters
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          As the humanitarian crisis in Gaza intensifies, families are in
          desperate need of food, shelter, and medical care. We're supporting
          emergency relief through trusted organizations. Join in extending hope
          and vital aid to those facing unimaginable hardship.
        </p>
        <button className="w-full flex justify-center">
          <a
            href="https://www.justgiving.com/page/sadia-tahsin-1696877775055"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg group relative inline-flex h-10 w-auto px-1 py-2 md:px-4
  md:py-3 lg:px-5 lg:py-6 items-center justify-center overflow-hidden rounded-md 
  border-2 md:border-4 border-black dark:border-jadeGreen 
  bg-transparent font-medium 
  text-jadeGreen dark:text-darkText 
  transition-all duration-150 
  shadow-[5px_5px_rgb(82_82_82)] dark:shadow-[5px_5px_rgb(0_118_77)] 
  active:translate-x-[3px] active:translate-y-[3px] active:shadow-none 
  uppercase 
  hover:bg-jadeGreen hover:text-white dark:hover:bg-darkText dark:hover:text-darkBackground"
          >
            Learn More
          </a>
        </button>
      </section>
    </div>
  );
}

export default Charity;
