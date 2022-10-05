import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Title = () => {
  return (
    <>
      <Box p={4}>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          fontWeight="bold"
        >
          Zikar Counter
        </Typography>
        <Divider />
      </Box>
    </>
  );
};

export default Title;
