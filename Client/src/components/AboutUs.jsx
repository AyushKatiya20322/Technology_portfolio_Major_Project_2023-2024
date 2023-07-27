import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import Avatar from "../assets/img/avatar.png";
import { Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { slideTop, fadeInOut, staggerFadeInOut } from "../animations";
import Testimonial from "../components/Testimonial";
import { Cart, Header, Services, ContactForm } from "../components";
import { FiMail, FiPhone } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";

const customStyles = {
  sectionTitle: "text-4xl font-bold mb-6",
  textLarge: "text-lg",
  contactItem: "text-lg mb-2",
  contactIcon: "mr-2 h-6 w-6",
};



const fadeOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const testimonials = [
  {
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Smith",
    message: "Nullam eu lectus at augue tempor rhoncus non eu magna.",
  },
  // Add more testimonials as needed
];

const teamMembers = [
  {
    name: "Ayush Katiya",
    role: "CEO",
    image: Avatar,
  },
  {
    name: "Aakash Rathod",
    role: "CTO",
    image: Avatar,
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
    <main className="w-full pt-20">
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
            <Typography variant="h2" gutterBottom className={customStyles.sectionTitle}>
              About Us
            </Typography>
            <Typography variant="body1" paragraph className={customStyles.textLarge}>
              Welcome to our website! We are a dedicated team of professionals
              working together to provide the best user experience for our
              visitors.
            </Typography>
            <Typography variant="body1" paragraph className={customStyles.textLarge}>
              Our mission is to deliver valuable and relevant content that
              caters to the needs of our audience. We aim to inspire, educate,
              and entertain through our platform.
            </Typography>
            <hr className="my-6 border-t-2 border-gray-300" />
            <Typography variant="h3" gutterBottom className={customStyles.sectionTitle}>
              Our Team <AiOutlineTeam className="inline-block h-6 w-6 ml-2" />
            </Typography>
            <Typography variant="body1" paragraph className={customStyles.textLarge}>
              Meet the faces behind this project:
            </Typography>
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <motion.div
                    className="team-member flex flex-col items-center justify-center p-4"
                    variants={staggerFadeInOut(member.name)}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="w-full h-full object-cover"
                      />
                    </Box>
                    <div className="team-member-details text-center">
                      <Typography variant="h4" gutterBottom className="text-xl font-bold">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="text-sm">
                        {member.role}
                      </Typography>
                    </div>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.section>
        <hr className="my-6 border-t-2 border-gray-300" />
        <Services />
        <hr className="my-6 border-t-2 border-gray-300" />
        <motion.section
          className="content-container mt-10"
          variants={slideTop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="inner-container" variants={fadeInOut}>
            <Typography variant="h2" gutterBottom className={customStyles.sectionTitle}>
              Testimonials
            </Typography>
            <div className="testimonials-container">
              {testimonials.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  name={testimonial.name}
                  message={testimonial.message}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>
        {/* Contact Us Section */}
        <motion.section
          className="content-container mt-10"
          variants={slideTop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="inner-container" variants={fadeInOut}>
            <Typography variant="h2" gutterBottom className={customStyles.sectionTitle}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph className={customStyles.textLarge}>
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
      </Container>
      {isCart && <Cart />}
    </main>
  );
};

export default AboutUs;
