import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

const Testimonial = ({ name, message }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Testimonial;