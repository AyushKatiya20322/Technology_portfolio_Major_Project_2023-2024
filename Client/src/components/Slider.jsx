import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredFruits = products.filter(
        (data) => data.product_category === "fruits"
      );
      setFruits(filteredFruits);
    }
  }, [products]);

  return (
    <div className="w-full pt-4">
      {fruits.length > 0 ? (
        <Swiper
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={30}
          grabCursor={true}
          className="mySwiper"
        >
          {fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-textColor">
          No fruits available at the moment.
        </p>
      )}
    </div>
  );
};

export default Slider;
