import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, TextField, Button, Snackbar, Grid, Paper } from "@mui/material";
import { Alert } from "@mui/material";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { fadeInOut, slideTop } from "../animations";





const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    queries: "",
    
  });

  const [reviews, setReviews] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const reviewsCollection = collection(db, "queries");
    e.preventDefault();

    // Form validation: Check if required fields are filled
    if (!formData.name || !formData.email || !formData.queries) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } else {
      setIsSubmitting(true);

      try {
        // Make API call to add the review
        await addDoc(reviewsCollection, { ...formData });

        // Form submission success
        setSnackbarMessage("Form submitted successfully!");
        setSnackbarSeverity("success");
        setShowSnackbar(true);
        resetForm();
      } catch (error) {
        console.log("Error submitting form:", error);
        setSnackbarMessage("Something went wrong. Please try again later.");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      }

      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      queries: "",
    
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
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Please fill out the form below to Contact Us:
        </Typography>
        <form onSubmit={handleSubmit} className="queries-form">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!formData.name}
                helperText={!formData.name ? "Name is required." : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!formData.email}
                helperText={!formData.email ? "Email is required." : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Queries"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                name="queries"
                value={formData.queries}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <hr className="my-10 border-t-2 bg-white" />
        {/* Display the review table or "No reviews found" */}
        
        
        <Snackbar
          open={showSnackbar}
          autoHideDuration={4000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
