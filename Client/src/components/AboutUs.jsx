import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { slideTop, fadeIn, staggerFadeInOut, fadeInOut } from '../animations';
import { Avatar } from '../assets';

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, FilterSection, Header, HomeSlider } from "../components";
import { setAllProducts } from "../context/actions/productActions";

// Sample data for team members with their roles and images
const teamMembers = [
  {
    name: "Ayush Katiya",
    role: "CEO",
    image: Avatar, // Correct image path for Ayush
  },
  {
    name: "Aakash Rathod",
    role: "CTO",
    image: Avatar, // Correct image path for Aakash
  },
  {
    name: "John Doe",
    role: "Lead Developer",
    image: Avatar, // Correct image path for John
  },
];
const AboutUs = () => {

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
    <main className="w-screen top-80 flex items-center justify-start flex-col bg-primary">
      <div className="main-container">
      <Header />
      <motion.section className="content-container" variants={slideTop} initial="initial" animate="animate" exit="exit">
        <motion.div className="inner-container" variants={fadeInOut}>
          <h2 className="heading">About Us</h2>
          <p className="paragraph">
            Welcome to our website! We are a dedicated team of professionals
            working together to provide the best user experience for our visitors.
          </p>
          <p className="paragraph">
            Our mission is to deliver valuable and relevant content that caters
            to the needs of our audience. We aim to inspire, educate, and
            entertain through our platform.
          </p>
          <h3 className="sub-heading">Our Team</h3>
          <p className="paragraph">
            Meet the faces behind this project:
          </p>
          <ul className="team-list flex flex-row justify-evenly">
          {teamMembers.map((member, index) => (
  <motion.li key={index} className="team-member" variants={staggerFadeInOut(member.name)}>
                <div className="team-member-info">
                  <div className="team-member-image-container w-20 h-20">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="team-member-image"
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} // Responsive image size
                      onLoad={(e) => e.target.style.opacity = 1} // Fade in the image after loading
                    />
                  </div>
                  <div className="team-member-details">
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.section>
    </div>
      {isCart && <Cart />}
    </main>
  );
};


export default AboutUs;
