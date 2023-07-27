import React from "react";
import { Box, Typography, Link, Container, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    textAlign: "center",
    padding: "16px 0", // Padding on the y-axis (top and bottom)
    backgroundColor: "#1976d2", // Use your desired background color here
    color: "#fff", // Use your desired text color here
  };

  const linkStyle = {
    color: "inherit", // Inherit the color from the parent Typography component
    textDecoration: "underline",
  };

  const footerLinksStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "16px",
  };

  const socialMediaLinks = [
    {
      icon: <Facebook />,
      href: "https://www.facebook.com/",
      label: "Facebook",
    },
    {
      icon: <Twitter />,
      href: "https://www.twitter.com/",
      label: "Twitter",
    },
    {
      icon: <LinkedIn />,
      href: "https://www.linkedin.com/in/aakashrathod03",
      label: "LinkedIn",
    },
  ];

  return (
    <footer>
      <Box style={footerStyle}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Technology Portfolio
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                © {currentYear} Technology Portfolio. All rights reserved.
              </Typography>
              <Typography variant="body1">
                Powered by{" "}
                <Link
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  aria-label="Technology Portfolio website"
                >
                  Technology Portfolio
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box component="nav" style={footerLinksStyle} aria-label="Footer Navigation">
                <Link href="#" style={linkStyle}>
                  Home
                </Link>
                <Link href="#" style={linkStyle}>
                  About
                </Link>
                <Link href="#" style={linkStyle}>
                  Services
                </Link>
                <Link href="#" style={linkStyle}>
                  Contact
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box style={footerLinksStyle}>
                {socialMediaLinks.map((link) => (
                  <IconButton key={link.label} component="a" href={link.href} target="_blank" rel="noopener noreferrer" color="inherit">
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
