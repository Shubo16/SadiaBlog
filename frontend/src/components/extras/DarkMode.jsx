import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkMode() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div className="">
      <button onClick={() => darkModeHandler()}>
        {dark && <FaMoon className=" h-5 w-5 items-center dark:text-white"/>}
        {!dark && <FaSun  className=" h-5 w-5 items-center text-black "/>}
      </button>
    </div>
  );
}
