import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, Button, Snackbar, Grid, Paper } from "@mui/material";
import { Alert } from "@mui/material";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../config/firebase.config";
import { fadeInOut, slideTop } from "../animations";
import { Header, Cart , Footer} from "../components";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const QueriesTable = ({ queries }) => {
  if (queries.length === 0) {
    return <Typography variant="body1">No reviews found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Queries</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queries.map((querie) => (
            <TableRow key={querie.id}>
              <TableCell>{querie.data.name}</TableCell>
              <TableCell>{querie.data.email}</TableCell>
              <TableCell>{querie.data.queries}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const QueriesForm = () => {
  const isCart = useSelector((state) => state.isCart);
  const [queries, setQueries] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQueries();
  }, []);

  function getQueries() {
    setIsLoading(true);
    const queriesCollectionRef = collection(db, "queries");
    getDocs(queriesCollectionRef)
      .then((response) => {
        const revs = response.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
        setQueries(revs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const handleRefresh = () => {
    getQueries();
  };

  return (
    <motion.div 
      className="content-container mt-10 pt-24 "
      variants={slideTop}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      {isCart && <Cart />}
      {/* Display the review table or "No reviews found" */}
      <QueriesTable queries={queries} />
      <hr className="my-10 border-t-2 bg-white" />
      <Button onClick={handleRefresh} fullWidth disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>
      <hr className="my-10 border-t-2 bg-white" />
      <Footer/>

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
  );
};

export default QueriesForm;
