import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { Slider } from "../components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { buttonClick } from "../animations";

const HomeSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderData = [
    // Replace this array with your slider data
    // Example: { image: "image_url", title: "Slider Title", description: "Slider Description" }
  ];

  useEffect(() => {
    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  const handleNextSlide = () => {
    const newIndex = (slideIndex + 1) % sliderData.length;
    setSlideIndex(newIndex);
  };

  const handlePrevSlide = () => {
    const newIndex = (slideIndex - 1 + sliderData.length) % sliderData.length;
    setSlideIndex(newIndex);
  };

  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">
            Our Fresh & Healthy Fruits
          </p>
          <div className="w-40 h-1 rounded-md bg-orange-500"></div>
        </div>
      </div>

      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Slider ref={sliderRef} slideData={sliderData} activeSlide={slideIndex} />
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex items-center justify-center mt-4"
        initial="hidden"
        animate="visible"
        variants={buttonClick}
      >
        <motion.button
          className="rounded-full p-2 mr-2 bg-primary text-white hover:bg-orange-500 transition-colors duration-300"
          onClick={handlePrevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosArrowBack className="text-2xl" />
        </motion.button>
        <motion.button
          className="rounded-full p-2 bg-primary text-white hover:bg-orange-500 transition-colors duration-300"
          onClick={handleNextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosArrowForward className="text-2xl" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomeSlider;
