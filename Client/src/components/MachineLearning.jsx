import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, FilterSection, Header, HomeSlider } from "../components";
import { setAllProducts } from "../context/actions/productActions";
import { Box, Container, Typography, TextField, Button, Rating, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { Footer } from "../components";

const MachineLearning = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      dispatch(setAllProducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    // Form validation: Check if required fields are filled
    if (!name || !email || !phone || !review || rating === 0) {
      setShowSnackbar(true);
      return;
    }

    // Implement logic to submit review and other details
    // You can use the 'name', 'email', 'phone', 'review', and 'rating' states here
    // For demonstration purposes, let's just console.log the data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Review:", review);
    console.log("Rating:", rating);

    // Clear form fields and rating after successful submission
    setName("");
    setEmail("");
    setPhone("");
    setReview("");
    setRating(0);

    // Show success message
    setShowSnackbar(true);
  };

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col pt-32 bg-primary">
      <Header />
      <Container maxWidth="lg">
        <Box className="my-8">
          <Typography variant="h4" gutterBottom>
            Submit Your Review
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Review"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Typography variant="body1" gutterBottom>
            Rating:
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            size="large"
            className="mb-4"
            precision={0.5}
            emptyIcon={<span className="MuiRating-iconEmpty" />} // Custom CSS for empty stars
            icon={<span className="MuiRating-iconFilled" />} // Custom CSS for filled stars
          />
          <Button variant="contained" color="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Box>
      </Container>
      <hr className="my-6 border-t-2 border-gray-300" />
      <Footer />
      <hr className="my-6 border-t-2 border-gray-300" />
      {isCart && <Cart />}

      {/* Snackbar for success message */}
      <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={() => setShowSnackbar(false)}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          Review submitted successfully!
        </Alert>
      </Snackbar>
    </main>
  );
};

export default MachineLearning;
