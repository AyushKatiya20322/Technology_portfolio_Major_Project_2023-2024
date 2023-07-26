import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { IoFastFood, IoSearch } from "../assets/icons";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { statuses } from "../utils/styles";
import SliderCard from "./SliderCard";
import { Spinner, Pagination } from "../components";

// Rest of the code remains the same


const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("fruits");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const productsPerPage = 6;

  const products = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.isLoading);
  useEffect(() => {
    setSelectedCategory("fruits");
    setCurrentPage(1);
    setShowAll(false);
  }, []);

  useEffect(() => {
    if (showAll) {
      setSelectedCategory(null);
    }
  }, [showAll]);
  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (isLoading || products === null) {
    return <Spinner />;
  }

  const filteredProducts = products.filter(
    (data) =>
      ((showAll && !selectedCategory) || data.product_category === selectedCategory) &&
      data.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    const priceA = parseFloat(a.product_price);
    const priceB = parseFloat(b.product_price);
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });
  const totalProducts = sortedProducts.length;
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstProductIndex, lastProductIndex);
  const handleShowAll = () => {
    setShowAll(!showAll);
    setCurrentPage(1);
  }
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <motion.div className="w-full flex flex-col items-start justify-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Our Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-orange-500"></div>
        </div>
        {selectedCategory && (
          <button
            onClick={handleShowAll}
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
            index={index}
          />
        ))}
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full flex items-center justify-evenly flex-wrap gap-4 mt-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data, index) => (
              <SliderCard key={index} data={data} index={index} />
            ))
          ) : (
            <p className="text-primary font-semibold">No products in this category.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export const FilterCard = ({ data, index, selectedCategory, setSelectedCategory }) => {
  const isActive = data.category === selectedCategory;

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
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

export default FilterSection;
