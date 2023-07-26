import React from "react";
import { FaArrowLeft } from "../assets/icons";
import { NavLink } from "react-router-dom";
import { Bill } from "../assets";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClick, fadeInOut, slideTop } from "../animations";

const CheckOutSuccess = () => {
  return (
    <motion.main
      {...fadeInOut}
      className="w-screen min-h-screen flex items-center justify-start flex-col"
    >
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <motion.img
          src={Bill}
          className="w-full md:w-656"
          alt=""
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        />

        <motion.h1
          className="text-[50px] text-headingColor font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Amount paid Successfully
        </motion.h1>

        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="text-3xl text-textColor " /> Get back to
            Home
          </NavLink>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default CheckOutSuccess;
