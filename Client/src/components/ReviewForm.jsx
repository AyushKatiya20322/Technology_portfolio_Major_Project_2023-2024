import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { slideTop, fadeInOut } from "../animations";
import  {collection,getDocs,addDoc} from "firebase/firestore"
import {db} from "../config/firebase.config"
import { DataTable } from "../components";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";




const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating:"",

  });

  const [reviews, setReviews] = useState([])

useEffect(( )=> {
getReviews()
},[])

useEffect(()=> {
console.log(reviews)
},[reviews])


  function getReviews() {
    const reviewsCollectionRef =  collection(db, "reviews")
    getDocs(reviewsCollectionRef).then (response => {
    console.log(response.docs)
    const revs= response.docs.map(doc => ({data: doc.data(), id: doc.id}))
  setReviews(revs) 
  
  }).catch(error => {
      console.log(error.Alert.Message);
    })
    
    
    }





  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
  };

  const handleSubmit = async (e) => {
    const reviewsCollection =  collection(db, "reviews")
    e.preventDefault();

    // Form validation: Check if required fields are filled
    if (!formData.name || !formData.email|| !formData.review|| !formData.rating) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);

    } else {
      setIsSubmitting(true);
      // Simulate API call delay with setTimeout (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      addDoc(reviewsCollection,{...formData})
     
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
      review: "",
      rating:"",
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
            label="Review"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
             <TextField
            label="Rating"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            error={!formData.rating} // Show error state if name is not filled
            helperText={!formData.rating ? "rating is required." : ""}
          />
         <Button
  type="submit"
  variant="contained"
  color="primary"
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</Button>
<hr className="my-6 border-t-2 border-gray-300" />
<hr className="my-6 border-t-2 border-gray-300" />
{
  reviews.length > 0 ? (
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
  ) : (
    <Typography variant="body1">No reviews found.</Typography>
  )
}
<button onClick={()=> {
getReviews()

}}>
  Refresh
</button>
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

export default ReviewForm;