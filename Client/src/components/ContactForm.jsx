// components/ContactForm.js
import React from "react";
import { motion } from "framer-motion";
import { Typography, TextField, Button } from "@mui/material";
import { slideTop, fadeInOut } from "../animations";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the form submission logic here
    // You can use form data and send it to a backend server using API calls
  };

  return (
    <motion.div
      className="content-container mt-10"
      variants={slideTop}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="inner-container" variants={fadeInOut}>
        <Typography variant="h2" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" paragraph>
          Please fill out the form below to contact us:
        </Typography>
        <form onSubmit={handleSubmit} className="contact-form">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            // Add appropriate state and event handlers to capture user input
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            // Add appropriate state and event handlers to capture user input
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
            // Add appropriate state and event handlers to capture user input
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
