import { motion } from "framer-motion";

export const buttonClick = {
  whileTap: { scale: 0.9, rotate: -10, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" },
};

export const fadeInOut = {
  initial: { opacity: 0, rotate: -20 },
  animate: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
  exit: {
    opacity: 0,
    rotate: 20,
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

export const slideTop = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, type: "spring", damping: 15, stiffness: 100 },
  },
};

export const staggerFadeInOut = (i) => {
  return {
    initial: { opacity: 0, y: 50, rotate: -10 },
    animate: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.15 },
    },
    exit: {
      opacity: 0,
      y: 50,
      rotate: 10,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    key: { i },
  };
};

export const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "anticipate" },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.6, ease: "anticipate" },
  },
};



export const fadeIn = ({ children }) => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default fadeIn;
