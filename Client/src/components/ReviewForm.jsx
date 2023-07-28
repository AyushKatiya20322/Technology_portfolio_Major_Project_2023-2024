import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, TextField, Button, Snackbar, Grid, Paper } from "@mui/material";
import { Alert } from "@mui/material";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { fadeInOut, slideTop } from "../animations";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ReviewTable = ({ reviews }) => {
  if (reviews.length === 0) {
    return <Typography variant="body1">No reviews found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.data.name}</TableCell>
              <TableCell>{review.data.email}</TableCell>
              <TableCell>{review.data.review}</TableCell>
              <TableCell>{review.data.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: "",
  });

  const [reviews, setReviews] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReviews();
  }, []);

  function getReviews() {
    setIsLoading(true);
    const reviewsCollectionRef = collection(db, "reviews");
    getDocs(reviewsCollectionRef)
      .then((response) => {
        const revs = response.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
        setReviews(revs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const reviewsCollection = collection(db, "reviews");
    e.preventDefault();

    // Form validation: Check if required fields are filled
    if (!formData.name || !formData.email || !formData.review || !formData.rating) {
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
      review: "",
      rating: "",
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
          Submit Review
        </Typography>
        <Typography variant="body1" paragraph>
          Please fill out the form below to give reviews:
        </Typography>
        <form onSubmit={handleSubmit} className="review-form">
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
                label="Review"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                name="review"
                value={formData.review}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Rating"
                variant="outlined"
                fullWidth
                required
                type="number" // Change to numeric input field
                inputProps={{ min: 1, max: 5 }} // Set minimum and maximum ratings
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                error={!formData.rating}
                helperText={!formData.rating ? "Rating is required." : ""}
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
        <ReviewTable reviews={reviews} />
        <hr className="my-10 border-t-2 bg-white" />
        <Button onClick={() => getReviews()} fullWidth disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
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

export default ReviewForm;
