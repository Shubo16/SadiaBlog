import { motion } from "framer-motion";
import headerImg from "/57.jpg";

// Variants for parent container (controls stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

// Variants for each child (image and paragraphs)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1} },
};

function About() {
  return (
    <motion.section
      className="min-h-screen w-full bg-navajoWhite flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-stretch px-6 py-12 gap-8">
        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 h-64 md:h-auto"
          variants={itemVariants}
        >
          <img
            src={headerImg}
            alt="Sadia's portrait"
            className="w-full object-[60%_20%] h-full object-cover rounded-md shadow-md"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-jadeGreen text-[1.05rem] leading-relaxed font-light"
          variants={itemVariants}
        >
          <motion.p variants={itemVariants}>
            Hi I'm Sadia and welcome to my Blog Page. I'm currently a uni student, hustling and aspiring to become the best academic student I can. Born and raised in London, I feel so grateful to have grown up in a culture enriched with so much love and diversity.
          </motion.p>
          <motion.p variants={itemVariants}>
            As a woman of color, as someone so proud of my culture and background, I want to express those feelings to readers alike and those that are indifferent to me.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;