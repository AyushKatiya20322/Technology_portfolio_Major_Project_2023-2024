import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, FilterSection, Header, Home, HomeSlider } from "../components";
import { setAllProducts } from "../context/actions/productActions";
import { Footer } from "../components";
import { Box, Container, Typography } from "@mui/material";


const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

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

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-start bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-32 px-6 md:px-2 2xl:px-20 gap-12 pb-24">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>
      <Container maxWidth="lg">
      <hr className="my-6 border-t-2 border-gray-300" />
        <Footer/>
        <hr className="my-6 border-t-2 border-gray-300" />
        </Container>
      {isCart && <Cart />}
    </main>
  );
};

export default Main;
