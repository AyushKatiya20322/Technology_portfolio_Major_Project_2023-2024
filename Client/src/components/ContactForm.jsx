import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { slideTop, fadeInOut } from "../animations";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation: Check if required fields are filled
    if (!formData.name || !formData.email) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } else {
      setIsSubmitting(true);
      // Simulate API call delay with setTimeout (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Form submission success
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
      resetForm();
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!formData.name} // Show error state if name is not filled
            helperText={!formData.name ? "Name is required." : ""}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!formData.email} // Show error state if email is not filled
            helperText={!formData.email ? "Email is required." : ""}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={4000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjust snackbar position
        >
          <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
