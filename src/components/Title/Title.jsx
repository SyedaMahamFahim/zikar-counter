import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
const Title = () => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="/assests/logo.jpg"
          alt="image"
          border="0"
          width="200"
          height="200"
        />
      </Box>
      <Box p={4}>
        <Link
          to="/"
          style={{
            color: "black",
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            align="center"
            fontWeight="bold"
          >
            Durood & Zikr Counter
          </Typography>
        </Link>
        <Divider />
      </Box>
    </>
  );
};

export default Title;
