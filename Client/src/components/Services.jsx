import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { slideTop, fadeInOut } from "../animations";

const servicesData = [
  {
    title: "Web Development",
    description: "We offer cutting-edge web development services to build beautiful and functional websites.",
  },
  {
    title: "Mobile App Development",
    description: "Our team specializes in developing mobile applications for various platforms.",
  },
  {
    title: "UI/UX Design",
    description: "We provide intuitive and visually appealing UI/UX design solutions.",
  },
];

const Services = () => {
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
          {servicesData.map((service, index) => (
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

export default Services;
