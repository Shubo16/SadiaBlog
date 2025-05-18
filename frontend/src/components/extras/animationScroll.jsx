import { motion, useScroll } from "framer-motion";

export default function AnimationScroll() {  // Fix function declaration
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="h-2 bg-jadeGreen fixed top-0 left-0 w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
