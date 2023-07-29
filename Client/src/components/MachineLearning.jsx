import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

import { Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { slideTop, fadeInOut, staggerFadeInOut } from "../animations";

import { Cart, Header, Services, ContactForm, Footer, ReviewForm, DataTable} from "../components";
import { FiMail, FiPhone } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";

const customStyles = {
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  textLarge: {
    fontSize: "1.125rem",
  },
  contactItem: {
    fontSize: "1.125rem",
    marginBottom: "0.75rem",
  },
  contactIcon: {
    marginRight: "0.5rem",
    height: "1.5rem",
    width: "1.5rem",
  },
};





const MachineLearning = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      dispatch(setAllProducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products]);

  return (
    <motion.main className="w-full pt-20 bg-primary">
      <Header />
      <Container maxWidth="lg">
      
        <ReviewForm />
        <hr className="my-6 border-t-2 border-gray-300" />
       
       
       
       
       
        <Footer />
        <hr className="my-6 border-t-2 border-gray-300" />
      </Container>
      {isCart && <Cart />}
    </motion.main>
  );
};

export default MachineLearning;
