import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoFastFood } from "../assets/icons";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { statuses } from "../utils/styles";
import SliderCard from "./SliderCard";
import { Spinner } from "../components";

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("fruits");
  const products = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    setSelectedCategory("fruits"); // Reset the selected category when the component mounts
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((data) => data.product_category === selectedCategory)
    : products;

  return (
    <motion.div className="w-full flex flex-col items-start justify-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Our Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-orange-500"></div>
        </div>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 focus:outline-none"
          >
            Show All
          </button>
        )}
      </div>

      <div className="w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8">
        {statuses.map((data, index) => (
          <FilterCard
            key={index}
            data={data}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-evenly flex-wrap gap-4 mt-12">
          {[...Array(6)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="w-full flex items-center justify-evenly flex-wrap gap-4 mt-12">
          {filteredProducts.map((data, index) => (
            <SliderCard key={index} data={data} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-primary font-semibold mt-4">No products in this category.</p>
      )}
    </motion.div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-28 h-40 bg-gray-300 animate-pulse rounded-md"></div>
  );
};

const FilterCard = ({ data, selectedCategory, setSelectedCategory }) => {
  const isActive = data.category === selectedCategory;

  return (
    <motion.div
      key={data.id}
      {...staggerFadeInOut(data.id)}
      onClick={() => setSelectedCategory(data.category)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${
        isActive ? "bg-red-500" : "bg-primary"
      } hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          isActive ? "bg-primary" : "bg-red-500"
        }`}
      >
        <IoFastFood
          className={`${
            isActive ? "text-red-500" : "text-primary"
          } group-hover:text-red-500`}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          isActive ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

FilterCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default FilterSection;
