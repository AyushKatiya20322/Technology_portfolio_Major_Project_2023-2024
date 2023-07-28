import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { slideTop, fadeInOut } from "../animations";


const testimonialData = [
  {
    title: "Vetrival Ravi",
    description: "I've been using this website for a while now, and I'm impressed with the quality of content they provide. It's a great platform for learning and staying updated.",
  },
  {
    title: "Vinod Bahadur Thapa",
    description: "I stumbled upon this website while searching for resources, and it's been a game-changer for me. The content is well-structured and easy to understand. Highly recommended!",       
  },
  
];

const Testimonial = () => {
  return (
    <motion.div
      className="content-container mt-10"
      variants={slideTop}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="inner-container" variants={fadeInOut}>
        
        <div className="services-container">
          {testimonialData.map((service, index) => (
            <motion.div
              key={index}
              className="service-item p-4 rounded-lg border border-gray-300 shadow-md"
              variants={fadeInOut}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            >
              <Typography variant="h4" gutterBottom style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {service.title}
              </Typography>
              <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                {service.description}
              </Typography>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Testimonial;
