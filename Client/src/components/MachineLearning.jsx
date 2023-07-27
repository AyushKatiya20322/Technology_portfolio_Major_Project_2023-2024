import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, FilterSection, Header, HomeSlider } from "../components";
import { setAllProducts } from "../context/actions/productActions";

const MachineLearning = () => {
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
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <p className="text-9xl items-center justify-center pt-80">
        hello
        </p>
      {isCart && <Cart />}
    </main>
  );
};

export default MachineLearning;
