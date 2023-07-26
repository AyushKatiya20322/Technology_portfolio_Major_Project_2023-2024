import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick } from "../animations";
import { addNewItemToCart, getAllCartItems } from "../api";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    addNewItemToCart(user?.user_id, data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertSuccess("Added to the cart"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });
    });
  };

  return (
    <motion.div
      {...buttonClick}
      onClick={sendToCart}
      className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl p-4 w-full md:w-340 md:min-w-350 gap-3 cursor-pointer"
    >
      <img
        src={data.imageURL}
        className="w-40 h-40 object-contain"
        alt={data.product_name}
      />
      <div className="pt-4">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center gap-1">
          <HiCurrencyRupee className="text-red-500" />{" "}
          {parseFloat(data.product_price).toFixed(2)}
        </p>
      </div>
      <motion.div
        className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <IoBasket className="text-2xl text-primary" />
      </motion.div>
    </motion.div>
  );
};

export default SliderCard;
