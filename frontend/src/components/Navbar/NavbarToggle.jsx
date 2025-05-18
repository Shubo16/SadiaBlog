import React from "react";
import { motion } from "framer-motion";

const NavbarToggle = ({ isToggled }) => {

  const items = ["Home", "My Blogs", "About"];

  const navList = {
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItem = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  return (
    <motion.ul
      className="navList"
      initial="hidden"
      animate={isToggled ? "visible" : "hidden"}
      exit="hidden"
      variants={navList}
    >
      {items.map((item) => (
        <motion.li className="nav-item" variants={navItem} key={item}>
          <p>{item}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavbarToggle;
