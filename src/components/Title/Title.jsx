import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import {Link} from "react-router-dom";
const Title = () => {
  return (
    <>
      <Box p={4}>
        <Link to="/" >
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
