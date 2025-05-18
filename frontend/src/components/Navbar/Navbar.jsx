import React from "react";
import { useCycle, motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // adjust path if needed
import AvatarUploader from "../extras/AvatarUploader";

function MobileHeader() {
  const navigate = useNavigate();

  const [mobileNav, toggleMobileNav] = useCycle(false, true);
  const { user, setUser, loading } = useUser();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null); // Clear user data
        navigate("/"); // Redirect to homepage
        window.location.reload(); // Optional, but you might not need this
      } else {
        console.error("Logout error:", res.statusText);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinks = [
    { key: 1, title: "Home", href: "/" },
    { key: 2, title: "Blogs", href: "/blogs" },
    { key: 3, title: "Travels", href: "/" },
    { key: 4, title: "About Me", href: "/about" },

    {
      key: 5,
      title: user ? "my account" : null,
      href: user ? "/myAccountPage" : null,
    },
    {
      key: 6,
      title: user ? "Sign Out" : "Login",
      href: user ? "/" : "/login",
      onClick: user ? handleLogout : null,
    },
  ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.5, ease: [0.12, 0, 0.36, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVars = {
    initial: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
    open: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className="h-[10svh] w-full flex items-center justify-between px-5 z-50 sticky border-b-4 border-black mb-0 bg-slate-50">
      <ul className="flex items-center">
        <Link to="/">
          <h1 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase font-poppins hover:text-jadeGreen ">
            Sadia's Blog
          </h1>
        </Link>
        {/* <img src={user.avatar} className="border-black border-solid b-4 h-2 w-4"/> */}
        <div className="absolute right-24 capitalize text-lg flex justify-evenly w-auto gap-6 items-center">
          {loading ? (
            <li>Loading...</li>
          ) : user ? (
            <li className="text-neutral-950 hidden sm:inline font-poppins">Welcome back, {user.username}</li>
          ) : (
            <div />
          )}
          {user ? <AvatarUploader /> : <div />}
        </div>
      </ul>

      <div className="relative z-50">
        <motion.button
          animate={mobileNav ? "open" : "closed"}
          onClick={() => toggleMobileNav()}
          className="flex flex-col space-y-2"
        >
          <motion.span
            variants={{
              closed: {
                rotate: 0,
                backgroundColor: "#000000",
                transition: {
                  duration: 0.8,
                },
              },
              open: { rotate: 45, y: 12, backgroundColor: "#00A86B" },
            }}
            whileHover={{ backgroundColor: "jadeGreen" }}
            className="w-8 h-1 rounded-xl block z-50 hover:bg-jadeGreen"
          />
          <motion.span
            variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
            className="w-8 h-1 rounded-xl bg-black block z-50 hover:bg-jadeGreen"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, backgroundColor: "#000000" },
              open: { rotate: -45, y: -12, backgroundColor: "#00A86B" },
            }}
            className="w-8 h-1 rounded-xl block z-50 hover:bg-jadeGreen"
          />
        </motion.button>
      </div>
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-[7.5rem] w-full bg-black h-full origin-top flex flex-col p-10 z-0"
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center justify-center gap-5 z-0 w-full h-[50%] relative top-40"
            >
              {navLinks.map((link) => (
                <div key={link.key} className="overflow-hidden hover:scale-110">
                  <MobileNavLink
                    title={link.title}
                    href={link.href}
                    toggleMobileNav={toggleMobileNav}
                    onClick={link.onClick}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const MobileNavLink = ({ title, href, toggleMobileNav, onClick }) => {
  const linkVar = {
    initial: {
      y: "-30svh",
      transition: {
        duration: 0.2,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0, 0.5, 0.45, 1],
      },
    },
  };

  return (
    <motion.div
      variants={linkVar}
      className="text-5xl uppercase text-jadeGreen scroll-smooth hover:text-lm-dark-green hover:scale-150"
    >
      <Link
        to={href}
        onClick={() => {
          toggleMobileNav();
          if (onClick) onClick(); // Call the onClick function for sign out if provided
        }}
      >
        {title}
      </Link>
    </motion.div>
  );
};

export default MobileHeader;
