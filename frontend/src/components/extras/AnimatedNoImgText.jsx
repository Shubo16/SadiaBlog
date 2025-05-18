import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimatedNoImgText() {
  const text = 'No image to load:(';
  const ctrls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    ctrls.start(inView ? "visible" : "hidden");
  }, [ctrls, inView]);

  const wordAnimation = { hidden: {}, visible: {} };
  const characterAnimation = {
    hidden: { opacity: 0, y: "0.25em" },
    visible: {
      opacity: 1,
      y: "0em",
      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <h2
      ref={ref}
      className="text-3xl font-semibold text-center"
      aria-label={text}
      role="heading"
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          initial="hidden"
          animate={ctrls}
          variants={wordAnimation}
          transition={{ delayChildren: index * 0.25, staggerChildren: 0.05 }}
        >
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[-0.05em]"
              variants={characterAnimation}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </h2>
  );
}
