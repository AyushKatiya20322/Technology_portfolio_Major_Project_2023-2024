import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import Aakash from "../assets/img/aakash.png";
import ayush from "../assets/img/ayush.png";
import { Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { slideTop, fadeInOut, staggerFadeInOut } from "../animations";
import Testimonial from "../components/Testimonial";
import { Cart, Header, Services, ContactForm, Footer } from "../components";
import { FiMail, FiPhone } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";

const customStyles = {
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  textLarge: {
    fontSize: "1.125rem",
  },
  contactItem: {
    fontSize: "1.125rem",
    marginBottom: "0.75rem",
  },
  contactIcon: {
    marginRight: "0.5rem",
    height: "1.5rem",
    width: "1.5rem",
  },
};


const teamMembers = [
  {
    name: "Ayush Katiya",
    role: "CEO",
    image: ayush,
  },
  {
    name: "Aakash Rathod",
    role: "CTO",
    image: Aakash,
  },
];

const contactUsData = {
  address: "Vijay Nagar, Indore",
  email: "ayushkatiya@gmail.com",
  phone: "91-88177-75932",
};

const AboutUs = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      dispatch(setAllProducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products]);

  return (
    <motion.main className="w-full pt-20 bg-primary">
      <Header />
      <Container maxWidth="lg">
        {/* About Us Section */}
        <motion.section
          className="content-container mt-10"
          variants={slideTop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="inner-container" variants={fadeInOut}>
            <motion.div variants={staggerFadeInOut(0.1)}>
              <Typography variant="h2" gutterBottom style={customStyles.sectionTitle}>
                About Us
              </Typography>
              <Typography variant="body1" paragraph style={customStyles.textLarge}>
                Welcome to our website! We are a dedicated team of professionals
                working together to provide the best user experience for our
                visitors.
              </Typography>
              <Typography variant="body1" paragraph style={customStyles.textLarge}>
                Our mission is to deliver valuable and relevant content that
                caters to the needs of our audience. We aim to inspire, educate,
                and entertain through our platform.
              </Typography>
              <hr className="my-6 border-t-2 border-gray-300" />
            </motion.div>

            <motion.div variants={staggerFadeInOut(0.2)}>
              <Typography variant="h3" gutterBottom style={customStyles.sectionTitle}>
                Our Team <AiOutlineTeam style={{ display: "inline-block", height: "1.5rem", width: "1.5rem", marginLeft: "0.5rem" }} />
              </Typography>
              <Typography variant="body1" paragraph style={customStyles.textLarge}>
                Meet the faces behind this project:
              </Typography>
              <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <motion.div
                      className="team-member flex flex-col items-center justify-center p-4"
                      variants={staggerFadeInOut(0.3)}
                    >
                      <Box
                        sx={{
                          width: 128,
                          height: 128,
                          overflow: "hidden",
                          borderRadius: "50%",
                          marginBottom: 4,
                        }}
                        className="w-32 h-32 overflow-hidden rounded-full mb-4"
                      >
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          whileHover={{ scale: 1.5 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="w-full h-full object-cover"
                        />
                      </Box>
                      <motion.div
                        className="team-member-details text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Typography variant="h4" gutterBottom style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: "0.875rem" }}>
                          {member.role}
                        </Typography>
                      </motion.div>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </motion.div>
        </motion.section>
        <hr className="my-6 border-t-2 border-gray-300" />
        {/* Services Section */}
        <motion.section
          className="content-container mt-10"
          variants={slideTop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="inner-container" variants={fadeInOut}>
            <Typography variant="h2" gutterBottom style={customStyles.sectionTitle}>
              Our Services
            </Typography>
            {/* Render the Services component directly */}
            <Services />
          </motion.div>
        </motion.section>
        <hr className="my-6 border-t-2 border-gray-300" />
        {/* Testimonials Section */}
        <motion.section
          className="content-container mt-10"
          variants={slideTop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="inner-container" variants={fadeInOut}>
            <Typography variant="h2" gutterBottom style={customStyles.TestimonialTitle}>
              Testimonial
            </Typography>
            {/* Render the Services component directly */}
            <Testimonial />
          </motion.div>
        </motion.section>
        <hr className="my-6 border-t-2 border-gray-300" />
        {/* Contact Us Section */}
        <motion.section
          className="content-container mt-10"
          variants={slideTop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="inner-container" variants={fadeInOut}>
            <Typography variant="h2" gutterBottom style={customStyles.sectionTitle}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph style={customStyles.textLarge}>
              If you have any questions or inquiries, feel free to contact us
              using the information below:
            </Typography>
            <ul className="contact-list mb-6">
              <li className={customStyles.contactItem}>
                <span className={customStyles.contactIcon}><FiMail /></span>
                {contactUsData.email}
              </li>
              <li className={customStyles.contactItem}>
                <span className={customStyles.contactIcon}><FiPhone /></span>
                {contactUsData.phone}
              </li>
            </ul>
          </motion.div>
        </motion.section>
        <hr className="my-6 border-t-2 border-gray-300" />
        <ContactForm />
        <hr className="my-6 border-t-2 border-gray-300" />
        <Footer />
        <hr className="my-6 border-t-2 border-gray-300" />
      </Container>
      {isCart && <Cart />}
    </motion.main>
  );
};

export default AboutUs;
