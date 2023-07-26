import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick, fadeInOut, slideIn, staggerFadeInOut } from "../animations";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import {
  BiChevronsRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import { setCartOff } from "../context/actions/displayCartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + data.product_price * data.quantity;
        return setTotal(tot);
      });
    }
  }, [cart]);

  const handleCheckOut = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        console.log(res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        // Handle the error here
        console.error("Checkout error:", err);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        {...slideIn}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen overflow-y-auto"
      >
        <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
          <motion.i
            {...buttonClick}
            className="cursor-pointer"
            onClick={() => dispatch(setCartOff())}
          >
            <BiChevronsRight className="text-[50px] text-textColor" />
          </motion.i>
          <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
          <motion.i {...buttonClick} className="cursor-pointer">
            <FcClearFilters className="text-[30px] text-textColor" />
          </motion.i>
        </div>

        <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6 gap-3 relative">
          {cart && cart?.length > 0 ? (
            <>
              <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
                {cart &&
                  cart?.length > 0 &&
                  cart?.map((item, i) => (
                    <CartItemCard key={i} index={i} data={item} />
                  ))}
              </div>
              <div className="bg-zinc-800 rounded-t-[60px] w-full h-[35%] flex flex-col items-center justify-center px-4 py-6 gap-24">
                <div className="w-full flex items-center justify-evenly">
                  <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                  <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                    <HiCurrencyRupee className="text-primary" />
                    {total}
                  </p>
                </div>

                <motion.button
                  {...buttonClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-400 w-[70%] px-4 py-3 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl"
                  onClick={handleCheckOut}
                >
                  Check Out
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <h1 className="px-4 text-3xl text-primary font-bold">Empty Cart</h1>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cart Item"));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart, data.product_price, data.quantity]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
    >
      <motion.img
        src={data?.imageURL}
        className="w-24 min-w-[94px] h-24 object-contain"
        alt=""
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />

      <motion.div
        className="flex items-center justify-start gap-1 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
      </motion.div>

      <motion.div
        className="ml-auto flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          {...buttonClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
