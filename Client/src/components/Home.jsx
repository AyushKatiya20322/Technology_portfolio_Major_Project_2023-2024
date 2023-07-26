import { motion } from "framer-motion";
import React from "react";
import { buttonClick, staggerFadeInOut } from "../animations";
import { Delivery, HeroBg } from "../assets";
import { randomData } from "../utils/styles";

const Home = () => {
  const products = randomData || []; // If randomData is undefined, use an empty array

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6 p-4 md:p-8">
        <div className="flex items-center justify-center gap-2 bg-orange-100 rounded-full px-4 py-1">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img src={Delivery} alt="Delivery" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-3xl md:text-5xl text-headingColor font-sans font-extrabold tracking-wider">
          The Fastest Delivery in <span className="text-orange-600">Your City</span>
        </p>

        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsam doloribus et similique
          distinctio, rem deleniti ipsa, nesciunt vitae labore voluptates sunt ducimus mollitia id
          libero! Nostrum expedita libero recusandae?
        </p>
        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-6 py-3 rounded-xl text-black text-base md:text-lg font-semibold"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650"
          src={HeroBg}
          alt="Hero Background"
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {products.map(({ id, imageURL, product_name, product_category, product_price }) => (
            <motion.div
              key={id}
              {...staggerFadeInOut(id)}
              className="w-32 h-36 md:h-auto md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
            >
              <img
                src={imageURL}
                className="w-16 h-16 md:w-32 md:h-32 md:-mt-10 object-contain"
                alt={product_name}
              />
              <p className="text-base lg:text-xl font-semibold text-textColor">
                {product_name.slice(0, 18)}
              </p>

              <p className="text-sm md:text-base text-lighttextGray font-semibold capitalize">
                {product_category}
              </p>

              <p className="text-base font-semibold text-headingColor">
                <span className="text-xs text-red-600">$</span> {product_price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
